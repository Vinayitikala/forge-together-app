import Navigation from '@/components/layout/Navigation';
import { Activity } from 'lucide-react';

const Health = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Activity className="mr-3 h-8 w-8 text-primary" />
            Physical Health - Body Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your physical metrics and participate in wellness challenges.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Health tracking features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Health;