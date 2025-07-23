import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { firestoreService, WellnessEntry } from '@/lib/firestoreService';
import { useToast } from '@/hooks/use-toast';
const WellnessLogs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [logs, setLogs] = useState<WellnessEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWellnessData = async () => {
      if (!user) return;
      
      try {
        const entries = await firestoreService.getWellnessEntries(user.uid);
        // Sort entries by date (most recent first)
        const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLogs(sortedEntries);
      } catch (error: any) {
        console.error('Error loading wellness entries:', error);
        
        // Handle permission errors gracefully - data might still be available
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
            description: "Failed to load wellness entries.",
            variant: "destructive"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadWellnessData();
  }, [user, toast]);

  // Only show actual Firebase data, no fallback data
  const displayLogs = logs;
  const getScoreColor = (score: number, isReverse = false) => {
    if (isReverse) {
      if (score >= 8) return "bg-green-500";
      if (score >= 6) return "bg-yellow-500";
      if (score >= 4) return "bg-orange-500";
      return "bg-red-500";
    } else {
      if (score >= 8) return "bg-red-500";
      if (score >= 6) return "bg-orange-500";
      if (score >= 4) return "bg-yellow-500";
      return "bg-green-500";
    }
  };
  const headerAction = <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/wellness-entry')}>
      Entry Form
    </Button>;
  return <Layout title="Wellness Logs" headerAction={headerAction}>
      <div className="space-y-6">
        <Card className="glass-dark p-6">
          <p className="text-center text-white/60 mb-6">Click on a row to view notes </p>
          
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 mb-4 text-white font-semibold text-sm">
            <div>DATE</div>
            <div>HRS</div>
            <div>QUAL</div>
            <div>NRG</div>
            <div>MOOD</div>
            <div>STR</div>
            <div>LBS</div>
            <div>UBS</div>
          </div>

          {/* Log Entries */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-white/60 py-8">
                Loading wellness entries...
              </div>
            ) : displayLogs.length === 0 ? (
              <div className="text-center text-white/60 py-8">
                <p>No wellness entries found.</p>
                <p className="text-sm mt-2">Start logging your wellness data to see your progress here.</p>
              </div>
            ) : (
              displayLogs.map((log, index) => {
                // Format date to DD/MM/YY
                const formatDate = (dateStr: string) => {
                  try {
                    const date = new Date(dateStr);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = String(date.getFullYear()).slice(-2);
                    return `${day}/${month}/${year}`;
                  } catch (error) {
                    return dateStr; // fallback to original if parsing fails
                  }
                };

                return (
                  <div key={log.id || index} className="space-y-3">
                    <div 
                      className="grid grid-cols-8 gap-2 items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-all"
                      onClick={() => setSelectedRowIndex(selectedRowIndex === index ? null : index)}
                    >
                      <div className="text-white text-xs">{formatDate(log.date)}</div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.sleepHours, true))}>
                        {log.sleepHours}
                      </div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.sleepQuality, true))}>
                        {log.sleepQuality}
                      </div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.energyLevel, true))}>
                        {log.energyLevel}
                      </div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.mood, true))}>
                        {log.mood}
                      </div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.stress))}>
                        {log.stress}
                      </div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.lowerBodySoreness))}>
                        {log.lowerBodySoreness}
                      </div>
                      <div className={cn("text-white text-sm font-bold px-2 py-1 rounded-full text-center", getScoreColor(log.upperBodySoreness))}>
                        {log.upperBodySoreness}
                      </div>
                    </div>
                    
                    {log.notes && selectedRowIndex === index && (
                      <div className="mt-3 p-3 glass rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Notes for {formatDate(log.date)}:</h4>
                        <p className="text-white/80 text-sm">{log.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">‹</Button>
              <div className="bg-white/20 rounded px-2 py-1">
                <div className="w-32 h-1 bg-white/40 rounded"></div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">›</Button>
            </div>
          </div>
        </Card>

        {/* Advertisement Space */}
        <Card className="glass-dark p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Advertisement Space</h3>
          <p className="text-white/60 text-sm">Ad will be displayed here once configured.</p>
        </Card>
      </div>
    </Layout>;
};
export default WellnessLogs;