
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileData: {
    name: string;
    dateOfBirth: string;
    bodyWeight: string;
    profileImage: string;
  };
  onSave: (data: { name: string; dateOfBirth: string; bodyWeight: string; profileImage: string }) => void;
}

const EditProfileDialog = ({ open, onOpenChange, profileData, onSave }: EditProfileDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(profileData);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(profileData.dateOfBirth || '1990-01-15'));
  const [age, setAge] = useState<number>(25);

  // Calculate age when date changes
  useEffect(() => {
    const calculateAge = (birthDate: Date) => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    };

    setAge(calculateAge(dateOfBirth));
    setFormData(prev => ({
      ...prev,
      dateOfBirth: format(dateOfBirth, 'yyyy-MM-dd')
    }));
  }, [dateOfBirth]);

  // Update local state when props change
  useEffect(() => {
    setFormData(profileData);
    setDateOfBirth(new Date(profileData.dateOfBirth || '1990-01-15'));
  }, [profileData]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          profileImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.profileImage} />
                <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-2 -right-2 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera className="h-3 w-3" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-white/60 text-sm text-center">Click camera to change picture</p>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Full Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Date of Birth (Age: {age})
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/10",
                    !dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? format(dateOfBirth, "dd/MM/yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={(newDate) => newDate && setDateOfBirth(newDate)}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  className="p-3"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Body Weight
            </label>
            <Input
              value={formData.bodyWeight}
              onChange={(e) => setFormData(prev => ({ ...prev, bodyWeight: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="75 kg"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-white/20 text-white hover:bg-white/10 bg-[#3c445c]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
