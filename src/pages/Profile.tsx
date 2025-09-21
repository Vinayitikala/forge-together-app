import Navigation from '@/components/layout/Navigation';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <User className="mr-3 h-8 w-8 text-primary" />
            Profile
          </h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Profile management coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;