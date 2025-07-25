import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, Settings, TrendingUp, Heart, Book, Clock, Dumbbell, Mail, Shield, Edit, LogOut, Share2 } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ContactDialog from '@/components/ContactDialog';
import EditProfileDialog from '@/components/EditProfileDialog';

import regen___track_logo from "@assets/regen & track logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Lukas',
    dateOfBirth: 'Jan 15, 1990',
    bodyWeight: '80 kg',
    profileImage: ''
  });

  const features = [{
    title: "Journaling",
    icon: Settings,
    color: "bg-blue-600",
    path: "/smart-recovery-coach"
  }, {
    title: "Log my wellness",
    icon: Heart,
    color: "bg-green-600",
    path: "/wellness-entry"
  }, {
    title: "Trends",
    icon: TrendingUp,
    color: "bg-teal-600",
    path: "/trends"
  }, {
    title: "Recovery assessment",
    icon: Settings,
    color: "bg-orange-600",
    path: "/recovery-assessment"
  }, {
    title: "Strength Tracker",
    icon: Dumbbell,
    color: "bg-red-600",
    path: "/strength-tracker"
  }, {
    title: "Fitness tests",
    icon: Clock,
    color: "bg-purple-600",
    path: "/fitness-tests"
  }, {
    title: "Resources/ Education",
    icon: Book,
    color: "bg-blue-700",
    path: "/education"
  }];
  const userAge = new Date().getFullYear() - 1990; // Mock calculation

  const handleProfileSave = (newData: typeof profileData) => {
    setProfileData(newData);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Regen & Track - Fitness & Recovery App',
      text: 'Hey check out this great free app to allow you track your recovery and other stats related to your training. App motto: Regen & Track - Your Data. Your Recovery. Your Edge.',
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "App shared successfully!",
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: "Copied to Clipboard",
          description: "Share message copied to clipboard!",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard if share fails
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: "Copied to Clipboard",
          description: "Share message copied to clipboard!",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy to clipboard.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="relative px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-12 bg-transparent rounded-lg flex items-center justify-center">
              <img src={regen___track_logo} alt="GPC Performance Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Regen & Track </h2>
              <p className="text-white/80 text-sm font-semibold">Your Data. Your Recovery. Your Edge.               ver 0.46</p>
            </div>
          </div>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-gray-900 border-gray-700">
              <DrawerHeader>
                <DrawerTitle className="text-white text-left">Profile Settings</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-8 space-y-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.profileImage ? (
                      <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-white/70 text-sm">Full Name</label>
                          <p className="text-white font-medium">{profileData.name}</p>
                        </div>
                        <Button
                          onClick={() => setEditProfileOpen(true)}
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <label className="text-white/70 text-sm">Date of Birth</label>
                          <p className="text-white">{profileData.dateOfBirth}</p>
                        </div>
                        <div>
                          <label className="text-white/70 text-sm">Age</label>
                          <p className="text-white font-medium">{userAge}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Body Weight</label>
                        <p className="text-white">{profileData.bodyWeight}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Us and Privacy Policy */}
                <div className="border-t border-gray-700 pt-6 space-y-3">
                  <Button
                    onClick={() => setContactDialogOpen(true)}
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4 mr-3" />
                    Contact Us
                  </Button>
                  <Button
                    onClick={() => navigate('/privacy-policy')}
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Privacy Policy
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="ghost"
                    className="w-full justify-start text-blue-400 hover:bg-blue-500/10"
                  >
                    <Share2 className="h-4 w-4 mr-3" />
                    Share App
                  </Button>
                </div>

                {/* Settings */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Show Advertisements</p>
                      <p className="text-white/60 text-sm">
                        {adsEnabled ? "Ads are currently enabled" : "Ads are disabled"}
                      </p>
                    </div>
                    <Switch checked={adsEnabled} onCheckedChange={setAdsEnabled} />
                  </div>
                  
                  {!adsEnabled && (
                    <div className="mt-4 p-4 bg-blue-600 rounded-lg">
                      <p className="text-white font-medium mb-2">Premium Subscription</p>
                      <p className="text-white/90 text-sm mb-3">
                        Enjoy an ad-free experience with premium features
                      </p>
                      <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                        Subscribe Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-white text-[26px] mt-[3px] mb-[3px]">Wellness &amp; Fitness Tracker</h1>
          <p className="text-white/80 font-semibold">Track your wellness, recovery habits and more!</p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return <Card key={index} className={cn("p-6 cursor-pointer transition-all duration-200 hover:scale-105 border-0", feature.color, "shadow-lg")} onClick={() => navigate(feature.path)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <IconComponent className="w-6 h-6 text-white" />
                    <span className="text-white font-semibold text-lg">
                      {feature.title}
                    </span>
                  </div>
                  <span className="text-white text-2xl">›</span>
                </div>
              </Card>;
        })}
        </div>

        {/* Advertisement Space */}
        {adsEnabled && (
          <Card className="bg-gray-800/50 backdrop-blur border-gray-700 p-6 text-center">
            <h3 className="text-white font-semibold mb-2">Advertisement Space</h3>
            <p className="text-white/60 text-sm">Ad will be displayed here once configured.</p>
          </Card>
        )}
      </div>
      {/* Dialogs */}
      <ContactDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen} 
      />
      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        profileData={profileData}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default Dashboard;
