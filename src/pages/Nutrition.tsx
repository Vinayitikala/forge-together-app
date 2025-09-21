import Navigation from '@/components/layout/Navigation';
import { Apple } from 'lucide-react';

const Nutrition = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Apple className="mr-3 h-8 w-8 text-primary" />
            Nutrition - Smart Food Guide
          </h1>
          <p className="text-muted-foreground">
            Plan meals, track nutrition, and discover community recipes.
          </p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nutrition tracking features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;