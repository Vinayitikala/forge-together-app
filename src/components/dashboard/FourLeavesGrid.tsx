import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Apple, TrendingUp, ArrowRight, MessageSquare, Activity, UtensilsCrossed, Target } from 'lucide-react';

const FourLeavesGrid = () => {
  const leaves = [
    {
      title: 'Mind',
      subtitle: 'ChittaAI Companion',
      description: 'AI-powered mental health support, mood tracking, and mindfulness guidance',
      icon: Brain,
      color: 'from-primary/20 to-primary/10',
      borderColor: 'border-primary/20',
      href: '/mind',
      features: [
        { icon: MessageSquare, text: '24/7 AI Chat Support' },
        { icon: Heart, text: 'Mood Tracking' },
        { icon: Brain, text: 'Mindfulness Activities' },
      ],
      quickAction: 'Start Chat',
      badge: 'AI Powered',
    },
    {
      title: 'Physical Health',
      subtitle: 'Body Dashboard',
      description: 'Track your physical metrics, set goals, and participate in wellness challenges',
      icon: Heart,
      color: 'from-secondary/20 to-secondary/10',
      borderColor: 'border-secondary/20',
      href: '/health',
      features: [
        { icon: Activity, text: 'Activity Tracking' },
        { icon: Target, text: 'Daily Challenges' },
        { icon: Heart, text: 'Health Metrics' },
      ],
      quickAction: 'Log Activity',
      badge: 'Gamified',
    },
    {
      title: 'Nutrition',
      subtitle: 'Smart Food Guide',
      description: 'Personalized meal planning, nutrition tracking, and community recipes',
      icon: Apple,
      color: 'from-accent/20 to-accent/10',
      borderColor: 'border-accent/20',
      href: '/nutrition',
      features: [
        { icon: UtensilsCrossed, text: 'Meal Planning' },
        { icon: Apple, text: 'Nutrition Tracking' },
        { icon: Heart, text: 'Community Recipes' },
      ],
      quickAction: 'Log Meal',
      badge: 'Community',
    },
    {
      title: 'Career',
      subtitle: 'Growth Hub',
      description: 'AI career guidance, skill development, and mentor connections',
      icon: TrendingUp,
      color: 'from-success/20 to-success/10',
      borderColor: 'border-success/20',
      href: '/career',
      features: [
        { icon: TrendingUp, text: 'Career Roadmap' },
        { icon: Target, text: 'Skill Assessment' },
        { icon: MessageSquare, text: 'Mentor Connect' },
      ],
      quickAction: 'Explore Career',
      badge: 'Professional',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {leaves.map((leaf) => {
        const Icon = leaf.icon;
        return (
          <Card 
            key={leaf.title} 
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${leaf.borderColor} group cursor-pointer`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${leaf.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{leaf.title}</CardTitle>
                    <CardDescription className="font-medium text-muted-foreground">
                      {leaf.subtitle}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  {leaf.badge}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {leaf.description}
              </p>
              
              {/* Features List */}
              <div className="space-y-2">
                {leaf.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <FeatureIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{feature.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button asChild className="w-full group/btn">
                  <Link to={leaf.href}>
                    {leaf.quickAction}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FourLeavesGrid;