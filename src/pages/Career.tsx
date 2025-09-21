import Navigation from '@/components/layout/Navigation';
import { TrendingUp } from 'lucide-react';

const Career = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <TrendingUp className="mr-3 h-8 w-8 text-primary" />
            Career - Growth Hub
          </h1>
          <p className="text-muted-foreground">
            AI career guidance, skill development, and mentor connections.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Career development features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Career;