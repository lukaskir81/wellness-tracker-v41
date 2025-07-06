
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const RecoveryLogs = () => {
  const navigate = useNavigate();

  const recoveryLogs = [
    { date: "20/06/2025", score: 115, color: "bg-green-500" },
    { date: "19/06/2025", score: 95, color: "bg-yellow-500" },
    { date: "18/06/2025", score: 80, color: "bg-orange-500" },
    { date: "17/06/2025", score: 55, color: "bg-red-500" },
  ];

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
              {recoveryLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                  <span className="text-white">{log.date}</span>
                  <div className={cn("px-4 py-2 rounded-lg text-white font-bold", log.color)}>
                    {log.score}
                  </div>
                </div>
              ))}
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
