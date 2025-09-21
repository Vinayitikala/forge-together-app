import { useEffect, useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import { WellBeingScore } from '@/components/dashboard/WellBeingScore';
import FourLeavesGrid from '@/components/dashboard/FourLeavesGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, Target, Trophy, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [todayChallenges, setTodayChallenges] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Fetch today's challenges
        const today = new Date().toISOString().split('T')[0];
        const { data: challenges } = await supabase
          .from('user_challenges')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today)
          .limit(3);

        if (challenges) {
          setTodayChallenges(challenges);
        }

        // Fetch recent mood logs for activity feed
        const { data: moodLogs } = await supabase
          .from('mood_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (moodLogs) {
          setRecentActivity(moodLogs);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {user?.user_metadata?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Welcome to your holistic well-being dashboard. Let's make today amazing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Well-Being Score - Takes full width on mobile, 2 columns on desktop */}
          <div className="lg:col-span-2">
            <WellBeingScore />
          </div>

          {/* Quick Stats & Today's Challenges */}
          <div className="space-y-6">
            {/* Today's Challenges */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Today's Challenges</CardTitle>
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>Complete your daily wellness goals</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
                    ))}
                  </div>
                ) : todayChallenges.length > 0 ? (
                  <div className="space-y-3">
                    {todayChallenges.map((challenge) => (
                      <div key={challenge.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium capitalize">{challenge.challenge_type.replace('_', ' ')}</p>
                          <p className="text-sm text-muted-foreground">
                            {challenge.current_value} / {challenge.target_value}
                          </p>
                        </div>
                        <Badge variant={challenge.completed ? 'default' : 'secondary'}>
                          {challenge.completed ? <Trophy className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No challenges set for today</p>
                    <Button size="sm" className="mt-2">Set Daily Goals</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your latest well-being entries</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-muted animate-pulse rounded"></div>
                    ))}
                  </div>
                ) : recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">Mood Check-in</p>
                          <p className="text-xs text-muted-foreground">
                            Score: {activity.mood_score}/10 • {new Date(activity.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Four Leaves Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Your Four Leaves of Well-Being</h2>
          <FourLeavesGrid />
        </div>

        {/* Emergency Support */}
        <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <h3 className="font-semibold">Need immediate support?</h3>
                <p className="text-sm text-muted-foreground">
                  If you're experiencing a mental health crisis, professional help is available 24/7
                </p>
              </div>
            </div>
            <Button variant="destructive">Get Help Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;