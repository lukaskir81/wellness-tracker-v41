
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { firestoreService, UserProfile } from '@/lib/firestoreService';
import { Timestamp } from 'firebase/firestore';

const ProfileSettings = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [dateOfBirth, setDateOfBirth] = useState<string>('15/01/90');
  const [profileData, setProfileData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    age: '25',
    height: '180',
    weight: '75',
    sport: 'Running',
    profileImage: user?.photoURL || ''
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        const profile = await firestoreService.getUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
          setProfileData({
            name: profile.name,
            email: profile.email,
            age: '25', // Will be calculated from DOB
            height: '180',
            weight: profile.bodyWeight,
            sport: 'Running',
            profileImage: profile.profileImage
          });
          // Convert stored date to DD/MM/YY format
          const date = new Date(profile.dateOfBirth);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = String(date.getFullYear()).slice(-2);
          setDateOfBirth(`${day}/${month}/${year}`);
        } else {
          // Create initial profile if doesn't exist
          const newProfile = {
            uid: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            dateOfBirth: convertToISODate(dateOfBirth),
            bodyWeight: '75',
            profileImage: user.photoURL || ''
          };
          const profileId = await firestoreService.createUserProfile(newProfile);
          setUserProfile({ ...newProfile, id: profileId, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user, toast]);

  // Helper functions for date conversion
  const convertToISODate = (ddmmyy: string): string => {
    try {
      const [day, month, year] = ddmmyy.split('/');
      const fullYear = year.length === 2 ? (parseInt(year) > 30 ? `19${year}` : `20${year}`) : year;
      return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } catch (error) {
      return '1990-01-15'; // fallback
    }
  };

  const parseDateFromString = (ddmmyy: string): Date => {
    try {
      const [day, month, year] = ddmmyy.split('/');
      const fullYear = year.length === 2 ? (parseInt(year) > 30 ? parseInt(`19${year}`) : parseInt(`20${year}`)) : parseInt(year);
      return new Date(fullYear, parseInt(month) - 1, parseInt(day));
    } catch (error) {
      return new Date(1990, 0, 15); // fallback
    }
  };

  // Calculate age when date of birth changes
  useEffect(() => {
    const calculateAge = (birthDateString: string) => {
      try {
        const birthDate = parseDateFromString(birthDateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        return age.toString();
      } catch (error) {
        return '25'; // fallback
      }
    };

    setProfileData(prev => ({
      ...prev,
      age: calculateAge(dateOfBirth)
    }));
  }, [dateOfBirth]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          profileImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user || !userProfile) return;
    
    try {
      const updatedProfile = {
        name: profileData.name,
        email: profileData.email,
        dateOfBirth: convertToISODate(dateOfBirth),
        bodyWeight: profileData.weight,
        profileImage: profileData.profileImage
      };
      
      await firestoreService.updateUserProfile(userProfile.id!, updatedProfile);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile data.",
        variant: "destructive"
      });
    }
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

  if (loading) {
    return (
      <Layout title="Profile Settings">
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-lg">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Profile Settings">
      <div className="space-y-6">
        {/* Profile Picture Section */}
        <Card className="glass-dark p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">👤</span>
            Profile Picture
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profileImage} />
                <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-2 -right-2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-white font-medium">Upload Profile Picture</p>
              <p className="text-white/60 text-sm">Click the camera icon to upload a new photo</p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="glass-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Personal Information
            </h3>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.open('https://static.wixstatic.com/media/9a2559_83c8f7fd946d46d3adc50d49005f1e86~mv2.png/v1/fill/w_336,h_124,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GPC%20Performance%20Logo%20Transparent.png', '_blank')}>
              <span className="text-white/80 text-sm">Contact Us</span>
              <img 
                src="https://static.wixstatic.com/media/9a2559_83c8f7fd946d46d3adc50d49005f1e86~mv2.png/v1/fill/w_336,h_124,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GPC%20Performance%20Logo%20Transparent.png" 
                alt="Contact Us" 
                className="h-6 w-auto"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Date of Birth (DD/MM/YY)
                </label>
                <Input
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="15/01/90"
                  pattern="\d{2}/\d{2}/\d{2}"
                  title="Please enter date in DD/MM/YY format"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Age
                </label>
                <Input
                  type="number"
                  value={profileData.age}
                  readOnly
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 cursor-not-allowed"
                  placeholder="Auto-calculated"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Height (cm)
                </label>
                <Input
                  type="number"
                  value={profileData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Height"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <Input
                  type="number"
                  value={profileData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Weight"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Primary Sport/Activity
                </label>
                <Input
                  value={profileData.sport}
                  onChange={(e) => handleInputChange('sport', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your primary sport or activity"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
          <Button
            onClick={handleSave}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
