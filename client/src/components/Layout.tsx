
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  headerAction?: React.ReactNode;
}

const Layout = ({ children, title, showBack = true, headerAction }: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            )}
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          </div>
          {headerAction}
        </div>
        
        {/* Content */}
        <div className="px-4 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
