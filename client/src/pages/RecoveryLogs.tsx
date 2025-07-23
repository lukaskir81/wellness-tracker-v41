import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { firestoreService, RecoveryAssessment } from '@/lib/firestoreService';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';

const RecoveryLogs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [logs, setLogs] = useState<RecoveryAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecoveryData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const assessments = await firestoreService.getRecoveryAssessments(user.uid);
        setLogs(assessments);
      } catch (error) {
        console.error('Error loading recovery assessments:', error);
        toast({
          title: "Error",
          description: "Failed to load recovery assessments. Please check your connection.",
          variant: "destructive"
        });
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
              ) : logs.length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  No recovery assessments found. Complete your first assessment to see logs here.
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                    {/* The date is formatted directly from the log data */}
                    <span className="text-white">
                      {format(parseISO(log.date), 'dd/MM/yyyy')}
                    </span>
                    {/* The score is displayed directly from the log data */}
                    <div className={cn(
                        "px-4 py-2 rounded-lg text-white font-bold", 
                        getScoreColor(log.totalPoints)
                    )}>
                      {log.totalPoints}
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