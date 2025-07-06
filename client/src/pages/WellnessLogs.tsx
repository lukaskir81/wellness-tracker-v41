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
        setLogs(entries);
      } catch (error) {
        console.error('Error loading wellness entries:', error);
        toast({
          title: "Error",
          description: "Failed to load wellness entries.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadWellnessData();
  }, [user, toast]);

  const displayLogs = logs.length > 0 ? logs : [
    { date: "2/01/25", sleepHours: 8, sleepQuality: 9, energyLevel: 8, mood: 8, stress: 3, lowerBodySoreness: 2, upperBodySoreness: 2, notes: "Felt great today, hit a new PR in the gym. Ready for the game tomorrow." },
    { date: "1/01/25", hrs: 7.5, qual: 8, nrg: 7, mood: 8, str: 3, lbs: 3, ubs: 2, note: "New Year, new goals! Feeling motivated and recovered from the holidays." },
    { date: "31/12/24", hrs: 6, qual: 6, nrg: 6, mood: 7, str: 5, lbs: 4, ubs: 3, note: "Late night celebrating, but still feeling decent overall." },
    { date: "30/12/24", hrs: 8.5, qual: 9, nrg: 8, mood: 9, str: 2, lbs: 1, ubs: 1, note: "Perfect recovery day. Body feels amazing after good sleep." },
    { date: "29/12/24", hrs: 7, qual: 7, nrg: 7, mood: 7, str: 4, lbs: 3, ubs: 3, note: "" },
    { date: "28/12/24", hrs: 6.5, qual: 6, nrg: 6, mood: 6, str: 5, lbs: 5, ubs: 4, note: "" },
    { date: "27/12/24", hrs: 8, qual: 8, nrg: 8, mood: 8, str: 3, lbs: 2, ubs: 2, note: "Holiday training session went well. Feeling strong and energized." },
    { date: "26/12/24", hrs: 7.5, qual: 7, nrg: 6, mood: 7, str: 4, lbs: 4, ubs: 3, note: "" },
    { date: "25/12/24", hrs: 6, qual: 5, nrg: 5, mood: 8, str: 6, lbs: 5, ubs: 4, note: "Christmas Day - lots of food and family time!" },
    { date: "24/12/24", hrs: 7, qual: 7, nrg: 7, mood: 8, str: 4, lbs: 3, ubs: 3, note: "" },
    { date: "23/12/24", hrs: 8, qual: 8, nrg: 8, mood: 7, str: 3, lbs: 2, ubs: 2, note: "" },
    { date: "22/12/24", hrs: 5, qual: 4, nrg: 4, mood: 4, str: 8, lbs: 8, ubs: 7, note: "Tough night, work stress keeping me up. Body feeling it today." },
    { date: "21/12/24", hrs: 7, qual: 6, nrg: 6, mood: 6, str: 5, lbs: 5, ubs: 4, note: "" },
    { date: "20/12/24", hrs: 8.5, qual: 9, nrg: 9, mood: 8, str: 2, lbs: 1, ubs: 1, note: "Excellent night's sleep. Feel completely recharged and ready." },
    { date: "19/12/24", hrs: 7, qual: 7, nrg: 7, mood: 7, str: 4, lbs: 3, ubs: 3, note: "" },
    { date: "18/12/24", hrs: 6.5, qual: 6, nrg: 5, mood: 6, str: 6, lbs: 6, ubs: 5, note: "" },
    { date: "17/12/24", hrs: 7.5, qual: 8, nrg: 7, mood: 7, str: 3, lbs: 3, ubs: 2, note: "Solid training week, body adapting well to the program." },
    { date: "16/12/24", hrs: 8, qual: 8, nrg: 8, mood: 8, str: 3, lbs: 2, ubs: 2, note: "" },
    { date: "15/12/24", hrs: 6, qual: 5, nrg: 5, mood: 5, str: 7, lbs: 7, ubs: 6, note: "" },
    { date: "14/12/24", hrs: 7, qual: 7, nrg: 6, mood: 6, str: 5, lbs: 4, ubs: 4, note: "" },
    { date: "13/12/24", hrs: 8, qual: 8, nrg: 8, mood: 7, str: 3, lbs: 3, ubs: 2, note: "Weekend recovery going well. Feel refreshed for next week." },
    { date: "12/12/24", hrs: 7.5, qual: 7, nrg: 7, mood: 7, str: 4, lbs: 3, ubs: 3, note: "" },
    { date: "11/12/24", hrs: 6.5, qual: 6, nrg: 6, mood: 6, str: 5, lbs: 5, ubs: 4, note: "" },
    { date: "10/12/24", hrs: 5.5, qual: 4, nrg: 4, mood: 4, str: 8, lbs: 7, ubs: 7, note: "Heavy training this week is catching up. Need to prioritize sleep." },
    { date: "9/12/24", hrs: 7, qual: 6, nrg: 6, mood: 6, str: 5, lbs: 5, ubs: 4, note: "" },
    { date: "8/12/24", hrs: 8, qual: 8, nrg: 7, mood: 7, str: 3, lbs: 3, ubs: 2, note: "" },
    { date: "7/12/24", hrs: 7.5, qual: 7, nrg: 7, mood: 7, str: 4, lbs: 3, ubs: 3, note: "" },
    { date: "6/12/24", hrs: 8.5, qual: 9, nrg: 9, mood: 8, str: 2, lbs: 1, ubs: 1, note: "Perfect start to December! Everything feels dialed in." },
    { date: "5/12/24", hrs: 7, qual: 7, nrg: 6, mood: 7, str: 4, lbs: 4, ubs: 3, note: "" }
  ];
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
            {displayLogs.map((log, index) => <div key={index} className="space-y-3">
                <div 
                  className="grid grid-cols-8 gap-2 items-center cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-all"
                  onClick={() => setSelectedRowIndex(selectedRowIndex === index ? null : index)}
                >
                  <div className="text-white text-xs">{log.date}</div>
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
                
                {log.notes && selectedRowIndex === index && <div className="mt-3 p-3 glass rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Notes for {log.date}:</h4>
                    <p className="text-white/80 text-sm">{log.notes}</p>
                  </div>}
              </div>)}
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