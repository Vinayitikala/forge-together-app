import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import { ChatInterface } from '@/components/mind/ChatInterface';
import { MoodTracker } from '@/components/mind/MoodTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Brain, Play, Clock, CheckCircle } from 'lucide-react';

const Mind = () => {
  const mindfulnessActivities = [
    {
      title: '5-Minute Breathing Exercise',
      description: 'Simple breathing technique to reduce stress and anxiety',
      duration: '5 min',
      type: 'Breathing',
      difficulty: 'Beginner',
      icon: Brain,
    },
    {
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation technique for better sleep',
      duration: '15 min',
      type: 'Meditation',
      difficulty: 'Intermediate',
      icon: Heart,
    },
    {
      title: 'Gratitude Journaling',
      description: 'Reflect on positive aspects of your day',
      duration: '10 min',
      type: 'Journaling',
      difficulty: 'Beginner',
      icon: MessageSquare,
    },
    {
      title: 'Mindful Walking',
      description: 'Connect with your surroundings through mindful movement',
      duration: '20 min',
      type: 'Movement',
      difficulty: 'Beginner',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Brain className="mr-3 h-8 w-8 text-primary" />
            Mind - Your Mental Well-being Hub
          </h1>
          <p className="text-muted-foreground">
            Connect with ChittaAI, track your mood, and practice mindfulness for better mental health.
          </p>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>ChittaAI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Mood Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="mindfulness" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Mindfulness</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="mindfulness" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mindfulness Activities</CardTitle>
                <CardDescription>
                  Take a moment to center yourself with these guided activities. Regular practice can help reduce stress and improve focus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mindfulnessActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Icon className="h-8 w-8 text-primary" />
                            <div className="flex space-x-2">
                              <Badge variant="outline">{activity.type}</Badge>
                              <Badge variant="secondary">{activity.difficulty}</Badge>
                            </div>
                          </div>
                          <h3 className="font-semibold mb-2">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {activity.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {activity.duration}
                            </div>
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stress Relief</CardTitle>
                <CardDescription>
                  Try these techniques when you need immediate stress relief or grounding.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">4-7-8 Breathing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Inhale for 4, hold for 7, exhale for 8. Repeat 3-4 times.
                    </p>
                    <Button size="sm" variant="outline">Try Now</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">5-4-3-2-1 Grounding</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
                    </p>
                    <Button size="sm" variant="outline">Try Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Mind;