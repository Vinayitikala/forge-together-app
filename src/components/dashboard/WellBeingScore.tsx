import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Brain, Heart, Apple, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface WellBeingData {
  overall_score: number;
  mind_score: number;
  physical_score: number;
  nutrition_score: number;
  career_score: number;
  last_calculated: string;
}

export const WellBeingScore = () => {
  const { user } = useAuth();
  const [wellBeingData, setWellBeingData] = useState<WellBeingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWellBeingData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('well_being_scores')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching well-being data:', error);
        } else if (data) {
          setWellBeingData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWellBeingData();
  }, [user]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: 'Excellent', variant: 'default' as const, icon: CheckCircle };
    if (score >= 50) return { text: 'Good', variant: 'secondary' as const, icon: Info };
    return { text: 'Needs Attention', variant: 'destructive' as const, icon: AlertTriangle };
  };

  const scoreComponents = [
    { 
      name: 'Mind', 
      score: wellBeingData?.mind_score || 0, 
      icon: Brain, 
      weight: '40%',
      description: 'Mental health and emotional well-being'
    },
    { 
      name: 'Physical', 
      score: wellBeingData?.physical_score || 0, 
      icon: Heart, 
      weight: '25%',
      description: 'Physical health and activity levels'
    },
    { 
      name: 'Nutrition', 
      score: wellBeingData?.nutrition_score || 0, 
      icon: Apple, 
      weight: '20%',
      description: 'Nutritional habits and dietary choices'
    },
    { 
      name: 'Career', 
      score: wellBeingData?.career_score || 0, 
      icon: TrendingUp, 
      weight: '15%',
      description: 'Professional development and growth'
    },
  ];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Well-Being Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-muted rounded"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const overallScore = wellBeingData?.overall_score || 0;
  const status = getScoreStatus(overallScore);
  const StatusIcon = status.icon;

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span>Overall Well-Being Score</span>
              <Badge variant={status.variant} className="ml-2">
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.text}
              </Badge>
            </CardTitle>
            <CardDescription>
              Your comprehensive well-being assessment across all four leaves
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}
            </div>
            <div className="text-sm text-muted-foreground">out of 100</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <Progress value={overallScore} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Critical (0-49)</span>
            <span>Good (50-79)</span>
            <span>Excellent (80-100)</span>
          </div>
        </div>

        {/* Component Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scoreComponents.map(({ name, score, icon: Icon, weight, description }) => (
            <div key={name} className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="flex-shrink-0">
                <Icon className={`h-6 w-6 ${getScoreColor(score)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{weight}</span>
                    <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                      {score}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
                <Progress value={score} className="h-2 mt-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Recommendations */}
        {overallScore < 80 && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              {overallScore < 50 && (
                <div className="flex items-center space-x-2 text-danger">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Consider speaking with a counselor or healthcare provider</span>
                </div>
              )}
              {wellBeingData?.mind_score && wellBeingData.mind_score < 60 && (
                <p>• Try daily mood check-ins with ChittaAI for better mental health support</p>
              )}
              {wellBeingData?.physical_score && wellBeingData.physical_score < 60 && (
                <p>• Increase daily activity and focus on sleep quality improvement</p>
              )}
              {wellBeingData?.nutrition_score && wellBeingData.nutrition_score < 60 && (
                <p>• Log your meals and explore our meal planning suggestions</p>
              )}
              {wellBeingData?.career_score && wellBeingData.career_score < 60 && (
                <p>• Complete your skills assessment and explore career development resources</p>
              )}
            </div>
          </div>
        )}

        {wellBeingData?.last_calculated && (
          <p className="text-xs text-muted-foreground text-center">
            Last updated: {new Date(wellBeingData.last_calculated).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};