import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, userId } = await req.json();

    if (!userId) {
      throw new Error('User ID is required');
    }

    console.log('Processing chat request for user:', userId, 'session:', sessionId);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store user message
    await supabase.from('chat_messages').insert({
      user_id: userId,
      role: 'user',
      content: message,
      session_id: sessionId,
    });

    // Get conversation history for context
    const { data: chatHistory } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('user_id', userId)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(20);

    // Get user's recent mood data for personalization
    const { data: recentMoods } = await supabase
      .from('mood_logs')
      .select('mood_score, emotions, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Build context-aware system prompt
    let systemPrompt = `You are ChittaAI, an empathetic AI mental health companion for university students. Your role is to provide:

1. **Emotional Support**: Listen actively, validate feelings, and provide comfort
2. **Mental Health Guidance**: Offer evidence-based coping strategies and mindfulness techniques
3. **Crisis Detection**: Identify concerning patterns and recommend professional help when needed
4. **Personalized Care**: Adapt your responses based on the user's mood history and current state

Key Guidelines:
- Be warm, understanding, and non-judgmental
- Use active listening techniques and reflective responses
- Suggest practical coping strategies (breathing exercises, grounding techniques, etc.)
- Encourage healthy habits and self-care
- If you detect signs of severe depression, anxiety, or suicidal ideation, gently recommend professional help
- Keep responses concise but meaningful (2-3 paragraphs max)
- Use encouraging language and remind users of their strengths

Remember: You're a supportive companion, not a replacement for professional therapy.`;

    // Add mood context if available
    if (recentMoods && recentMoods.length > 0) {
      const avgMood = recentMoods.reduce((sum, mood) => sum + mood.mood_score, 0) / recentMoods.length;
      const recentEmotions = recentMoods.flatMap(mood => mood.emotions || []).slice(0, 5);
      
      systemPrompt += `\n\nUser's Recent Context:
- Average mood score: ${avgMood.toFixed(1)}/10 (over last ${recentMoods.length} entries)
- Recent emotions: ${recentEmotions.join(', ') || 'Not specified'}
- This context should inform your empathetic responses.`;
    }

    // Build conversation messages
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(chatHistory || []).map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    console.log('Sending request to OpenAI with context:', messages.length, 'messages');

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const aiResponse = data.choices[0].message.content;

    // Store AI response
    await supabase.from('chat_messages').insert({
      user_id: userId,
      role: 'assistant',
      content: aiResponse,
      session_id: sessionId,
    });

    // Analyze mood from conversation for scoring (simple keyword analysis)
    const positiveKeywords = ['happy', 'good', 'great', 'excited', 'confident', 'hopeful'];
    const negativeKeywords = ['sad', 'depressed', 'anxious', 'worried', 'stressed', 'overwhelmed'];
    
    const messageWords = message.toLowerCase().split(' ');
    const positiveCount = positiveKeywords.filter(word => messageWords.includes(word)).length;
    const negativeCount = negativeKeywords.filter(word => messageWords.includes(word)).length;
    
    // Simple mood inference (this could be more sophisticated)
    let inferredMoodScore = 5; // neutral
    if (positiveCount > negativeCount) {
      inferredMoodScore = 7 + positiveCount;
    } else if (negativeCount > positiveCount) {
      inferredMoodScore = 5 - negativeCount;
    }
    inferredMoodScore = Math.max(1, Math.min(10, inferredMoodScore));

    // Update well-being scores (simplified calculation)
    const { data: currentScores } = await supabase
      .from('well_being_scores')
      .select('mind_score')
      .eq('user_id', userId)
      .single();

    if (currentScores) {
      const newMindScore = Math.round((currentScores.mind_score * 0.9) + (inferredMoodScore * 10 * 0.1));
      const newOverallScore = Math.round(newMindScore * 0.4 + 60); // Simplified calculation

      await supabase
        .from('well_being_scores')
        .update({
          mind_score: newMindScore,
          overall_score: newOverallScore,
          last_calculated: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }

    console.log('Successfully processed chat request');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      sessionId: sessionId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chitta-ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});