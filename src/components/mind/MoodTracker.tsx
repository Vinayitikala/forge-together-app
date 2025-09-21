import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Smile, Meh, Frown, Heart, Zap, Moon, Coffee, Sun, Cloud, CloudRain } from 'lucide-react';

const moodScale = [
  { value: 1, label: 'Terrible', icon: CloudRain, color: 'text-red-600' },
  { value: 2, label: 'Very Bad', icon: Frown, color: 'text-red-500' },
  { value: 3, label: 'Bad', icon: Frown, color: 'text-red-400' },
  { value: 4, label: 'Below Average', icon: Cloud, color: 'text-orange-500' },
  { value: 5, label: 'Average', icon: Meh, color: 'text-yellow-500' },
  { value: 6, label: 'Above Average', icon: Meh, color: 'text-yellow-400' },
  { value: 7, label: 'Good', icon: Smile, color: 'text-green-400' },
  { value: 8, label: 'Very Good', icon: Smile, color: 'text-green-500' },
  { value: 9, label: 'Great', icon: Sun, color: 'text-green-600' },
  { value: 10, label: 'Amazing', icon: Sun, color: 'text-green-700' },
];

const emotionOptions = [
  { name: 'Happy', icon: Smile, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Sad', icon: Frown, color: 'bg-blue-100 text-blue-800' },
  { name: 'Anxious', icon: Zap, color: 'bg-orange-100 text-orange-800' },
  { name: 'Calm', icon: Heart, color: 'bg-green-100 text-green-800' },
  { name: 'Excited', icon: Sun, color: 'bg-purple-100 text-purple-800' },
  { name: 'Tired', icon: Moon, color: 'bg-gray-100 text-gray-800' },
  { name: 'Energetic', icon: Coffee, color: 'bg-red-100 text-red-800' },
  { name: 'Overwhelmed', icon: Cloud, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Grateful', icon: Heart, color: 'bg-pink-100 text-pink-800' },
  { name: 'Frustrated', icon: CloudRain, color: 'bg-red-100 text-red-800' },
];

export const MoodTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [journalEntry, setJournalEntry] = useState('');
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRecentMoods();
    }
  }, [user]);

  const fetchRecentMoods = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(7);

      if (error) throw error;
      if (data) setRecentMoods(data);
    } catch (error) {
      console.error('Error fetching mood history:', error);
    }
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const submitMoodLog = async () => {
    if (!user || !selectedMood) {
      toast({
        title: 'Missing information',
        description: 'Please select a mood level before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('mood_logs').insert({
        user_id: user.id,
        mood_score: selectedMood,
        emotions: selectedEmotions,
        journal_entry: journalEntry || null,
      });

      if (error) throw error;

      toast({
        title: 'Mood logged successfully!',
        description: 'Thank you for checking in with yourself today.',
      });

      // Reset form
      setSelectedMood(null);
      setSelectedEmotions([]);
      setJournalEntry('');

      // Refresh recent moods
      fetchRecentMoods();

    } catch (error) {
      console.error('Error logging mood:', error);
      toast({
        title: 'Failed to log mood',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getAverageMood = () => {
    if (recentMoods.length === 0) return null;
    const sum = recentMoods.reduce((acc, mood) => acc + mood.mood_score, 0);
    return (sum / recentMoods.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Current Mood Entry */}
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling right now?</CardTitle>
          <CardDescription>
            Take a moment to check in with yourself. Your feelings are valid and important.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Scale */}
          <div>
            <h4 className="font-medium mb-3">Rate your overall mood (1-10)</h4>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {moodScale.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => setSelectedMood(value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center hover:scale-105 ${
                    selectedMood === value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-1 ${color}`} />
                  <div className="text-xs font-medium">{value}</div>
                  <div className="text-xs text-muted-foreground hidden sm:block">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Emotion Selection */}
          <div>
            <h4 className="font-medium mb-3">What emotions are you experiencing? (optional)</h4>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map(({ name, icon: Icon, color }) => (
                <Badge
                  key={name}
                  variant={selectedEmotions.includes(name) ? "default" : "outline"}
                  className={`cursor-pointer hover:scale-105 transition-transform ${
                    selectedEmotions.includes(name) ? '' : color
                  }`}
                  onClick={() => toggleEmotion(name)}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Journal Entry */}
          <div>
            <h4 className="font-medium mb-3">What's on your mind? (optional)</h4>
            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Take a moment to reflect on your day, your feelings, or anything that's important to you right now..."
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={submitMoodLog} 
            disabled={!selectedMood || loading}
            className="w-full"
          >
            {loading ? 'Logging Mood...' : 'Log My Mood'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Mood History */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Mood Trends</CardTitle>
          <CardDescription>
            {recentMoods.length > 0 && (
              <>
                Average mood over the last {recentMoods.length} entries: <strong>{getAverageMood()}/10</strong>
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentMoods.length > 0 ? (
            <div className="space-y-3">
              {recentMoods.map((mood) => {
                const moodData = moodScale.find(m => m.value === mood.mood_score);
                const Icon = moodData?.icon || Meh;
                return (
                  <div key={mood.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${moodData?.color || 'text-gray-500'}`} />
                      <div>
                        <div className="font-medium">
                          {mood.mood_score}/10 - {moodData?.label || 'Unknown'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(mood.created_at).toLocaleDateString()} at{' '}
                          {new Date(mood.created_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    {mood.emotions && mood.emotions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {mood.emotions.slice(0, 3).map((emotion: string) => (
                          <Badge key={emotion} variant="outline" className="text-xs">
                            {emotion}
                          </Badge>
                        ))}
                        {mood.emotions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mood.emotions.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-2" />
              <p>No mood entries yet. Start by logging your first mood above!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};