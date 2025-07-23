
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { firestoreService, RecoveryAssessment } from '@/lib/firestoreService';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const RecoveryLogs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<RecoveryAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecoveryData = async () => {
      if (!user) return;
      
      try {
        const assessments = await firestoreService.getRecoveryAssessments(user.uid);
        setLogs(assessments);
      } catch (error: any) {
        console.error('Error loading recovery assessments:', error);
        
        // Handle permission errors gracefully - similar to wellness logs
        if (error?.code === 'permission-denied' || error?.code === 'failed-precondition') {
          // For permission/precondition errors, just show a warning but don't block the UI
          toast({
            title: "Firebase Setup Needed",
            description: "Some data might not load properly until Firebase security rules are configured.",
            variant: "default"
          });
        } else {
          // For other errors, show error message
          toast({
            title: "Error",
            description: "Failed to load recovery assessments.",
            variant: "destructive"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecoveryData();
  }, [user, toast]);

  // Helper function to get score color based on points
  const getScoreColor = (score: number) => {
    if (score >= 105) return "bg-green-500";
    if (score >= 80) return "bg-yellow-500";
    if (score >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  // Format the logs for display
  const displayLogs = logs.map(log => ({
    date: format(new Date(log.date), 'dd/MM/yyyy'),
    score: log.totalPoints,
    color: getScoreColor(log.totalPoints)
  }));

  const headerAction = (
    <Button
      variant="ghost"
      className="text-white hover:bg-white/10"
      onClick={() => navigate('/recovery-assessment')}
    >
      Enter Assessment
    </Button>
  );

  return (
    <Layout title="Recovery Logs" headerAction={headerAction}>
      <div className="space-y-6">
        <Card className="glass-dark p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-white font-semibold">
              <span>Date</span>
              <span>Recovery Score</span>
            </div>
            
            <div className="space-y-3">
              {loading ? (
                <div className="text-center text-white/60 py-8">
                  Loading recovery assessments...
                </div>
              ) : displayLogs.length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  No recovery assessments found. Complete your first assessment to see logs here.
                </div>
              ) : (
                displayLogs.map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-white">{log.date}</span>
                    <div className={cn("px-4 py-2 rounded-lg text-white font-bold", log.color)}>
                      {log.score}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Advertisement Space */}
        <Card className="glass-dark p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Advertisement Space</h3>
          <p className="text-white/60 text-sm">Ad will be displayed here once configured.</p>
        </Card>
      </div>
    </Layout>
  );
};

export default RecoveryLogs;
