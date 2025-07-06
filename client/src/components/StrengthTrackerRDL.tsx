
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const StrengthTrackerRDL = () => {
  // Mock RDL data
  const rdlData = [
    { date: '01/12', weight: 80, reps: 8 },
    { date: '03/12', weight: 85, reps: 6 },
    { date: '05/12', weight: 90, reps: 5 },
    { date: '08/12', weight: 87, reps: 7 },
    { date: '10/12', weight: 92, reps: 5 },
    { date: '12/12', weight: 95, reps: 4 },
    { date: '15/12', weight: 88, reps: 8 },
  ];

  return (
    <Card className="glass-dark p-6">
      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        <span className="text-2xl">🏋️</span>
        Romanian Deadlift (RDL) Progress
      </h3>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rdlData}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
              domain={[70, 100]}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">95kg</div>
          <div className="text-white/60 text-sm">Max Weight</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">87kg</div>
          <div className="text-white/60 text-sm">Avg Weight</div>
        </div>
      </div>
    </Card>
  );
};

export default StrengthTrackerRDL;
