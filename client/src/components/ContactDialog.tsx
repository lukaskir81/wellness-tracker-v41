import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const ContactDialog = ({
  open,
  onOpenChange
}: ContactDialogProps) => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link
    const subject = encodeURIComponent(formData.subject || 'Contact from GPC Performance App');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:info@gpc-performance.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;
    toast({
      title: "Email Client Opened",
      description: "Your default email client should open with the pre-filled message."
    });
    onOpenChange(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Contact Us</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Your Name
            </label>
            <Input value={formData.name} onChange={e => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))} className="bg-white/10 border-white/20 text-white placeholder:text-white/50" placeholder="Enter your name" required />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Your Email
            </label>
            <Input type="email" value={formData.email} onChange={e => setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))} className="bg-white/10 border-white/20 text-white placeholder:text-white/50" placeholder="Enter your email" required />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Subject
            </label>
            <Input value={formData.subject} onChange={e => setFormData(prev => ({
            ...prev,
            subject: e.target.value
          }))} className="bg-white/10 border-white/20 text-white placeholder:text-white/50" placeholder="Enter subject" />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Message
            </label>
            <Textarea value={formData.message} onChange={e => setFormData(prev => ({
            ...prev,
            message: e.target.value
          }))} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]" placeholder="Enter your message" required />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 border-white/20 hover:bg-white/10 text-base font-normal text-zinc-400">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};
export default ContactDialog;