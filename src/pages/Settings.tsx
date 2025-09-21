import Navigation from '@/components/layout/Navigation';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <SettingsIcon className="mr-3 h-8 w-8 text-primary" />
            Settings
          </h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;