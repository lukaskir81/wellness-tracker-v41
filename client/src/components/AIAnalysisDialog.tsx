
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AIAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  analysis: string;
  isLoading: boolean;
  error?: string;
}

const AIAnalysisDialog: React.FC<AIAnalysisDialogProps> = ({
  isOpen,
  onClose,
  title,
  analysis,
  isLoading,
  error
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-white/20 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {isLoading && (
            <Card className="glass-dark p-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="text-white">Analyzing your data...</span>
              </div>
            </Card>
          )}
          
          {error && (
            <Card className="glass-dark p-6 border-red-500/30">
              <div className="text-red-400 text-center">
                <p className="font-semibold mb-2">Analysis Failed</p>
                <p className="text-sm">{error}</p>
              </div>
            </Card>
          )}
          
          {analysis && !isLoading && !error && (
            <Card className="glass-dark p-6">
              <div className="text-white space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🤖</span>
                  <h3 className="font-semibold text-lg">AI Analysis & Recommendations</h3>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {analysis}
                </div>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisDialog;
