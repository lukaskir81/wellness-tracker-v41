import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { ChevronDown } from 'lucide-react';

const Trends = () => {
  const [wellnessView, setWellnessView] = useState('7');
  const [activeComponents, setActiveComponents] = useState({
    sleep: true,
    sleepQuality: true,
    energy: true,
    stress: true
  });

  // Comprehensive fitness test data with 5-6 week intervals from 15/01/2025 to current date
  const fitnessTestData = {
    'SLJ (Standing Long Jump)': [
      { date: '15/01/25', score: 240 },
      { date: '26/02/25', score: 245 },
      { date: '09/04/25', score: 240 },
      { date: '21/05/25', score: 242 },
      { date: '02/07/25', score: 255 },
    ],
    'CMJ (Counter Movement Jump)': [
      { date: '15/01/25', score: 45 },
      { date: '26/02/25', score: 42 },
      { date: '09/04/25', score: 46 },
      { date: '21/05/25', score: 39 },
      { date: '02/07/25', score: 45 },
    ],
    '0-10m Dash': [
      { date: '15/01/25', score: 1.69 },
      { date: '26/02/25', score: 1.68 },
      { date: '09/04/25', score: 1.70 },
      { date: '21/05/25', score: 1.70 },
      { date: '02/07/25', score: 1.67 },
    ],
    '0-20m Dash': [
      { date: '15/01/25', score: 2.85 },
      { date: '26/02/25', score: 2.88 },
      { date: '09/04/25', score: 2.85 },
      { date: '21/05/25', score: 2.82 },
      { date: '02/07/25', score: 2.80 },
    ],
    '0-30m Dash': [
      { date: '15/01/25', score: 4.05 },
      { date: '26/02/25', score: 4.18 },
      { date: '09/04/25', score: 4.22 },
      { date: '21/05/25', score: 4.08 },
      { date: '02/07/25', score: 4.03 },
    ],
    'Flying 10m': [
      { date: '15/01/25', score: 0.95 },
      { date: '26/02/25', score: 0.92 },
      { date: '09/04/25', score: 0.86 },
      { date: '21/05/25', score: 0.87 },
      { date: '02/07/25', score: 0.87 },
    ],
    '1.2K Time Trial': [
      { date: '15/01/25', score: 295 },
      { date: '26/02/25', score: 288 },
      { date: '09/04/25', score: 283 },
      { date: '21/05/25', score: 280 },
      { date: '02/07/25', score: 275 },
    ],
    '1.4K Time Trial': [
      { date: '15/01/25', score: 325 },
      { date: '26/02/25', score: 320 },
      { date: '09/04/25', score: 315 },
      { date: '21/05/25', score: 312 },
      { date: '02/07/25', score: 308 },
    ]
  };

  // Strength tracker data (linked from strength tracker)
  const strengthData = {
    'Romanian Deadlift': [
      { date: '15/01/25', weight: 80, reps: 8 },
      { date: '26/02/25', weight: 85, reps: 6 },
      { date: '09/04/25', weight: 90, reps: 5 },
      { date: '21/05/25', weight: 87, reps: 7 },
      { date: '02/07/25', weight: 92, reps: 5 },
    ],
    'Bench Press': [
      { date: '15/01/25', weight: 70, reps: 8 },
      { date: '26/02/25', weight: 75, reps: 6 },
      { date: '09/04/25', weight: 80, reps: 5 },
      { date: '21/05/25', weight: 77, reps: 7 },
      { date: '02/07/25', weight: 82, reps: 5 },
    ],
    'Squat': [
      { date: '15/01/25', weight: 100, reps: 8 },
      { date: '26/02/25', weight: 105, reps: 6 },
      { date: '09/04/25', weight: 110, reps: 5 },
      { date: '21/05/25', weight: 107, reps: 7 },
      { date: '02/07/25', weight: 115, reps: 5 },
    ]
  };

  // Change to single test selection instead of multiple arrays
  const [selectedTest, setSelectedTest] = useState('1.2K Time Trial');

  // Comprehensive wellness data
  const wellnessData = {
    '7': [
      { date: '01/06/25', sleep: 5, sleepQuality: 4, energy: 4, stress: 8 },
      { date: '02/06/25', sleep: 7.5, sleepQuality: 7, energy: 7, stress: 5 },
      { date: '03/06/25', sleep: 6, sleepQuality: 5, energy: 5, stress: 7 },
      { date: '04/06/25', sleep: 8, sleepQuality: 8, energy: 8, stress: 3 },
      { date: '05/06/25', sleep: 7, sleepQuality: 7, energy: 7, stress: 4 },
      { date: '06/06/25', sleep: 8.5, sleepQuality: 9, energy: 9, stress: 2 },
    ],
    '14': [
      { date: '24/05/25', sleep: 6.2, sleepQuality: 5.5, energy: 5.5, stress: 6.3 },
      { date: '07/06/25', sleep: 7.1, sleepQuality: 6.8, energy: 6.8, stress: 5.2 },
    ],
    '28': [
      { date: '10/05/25', sleep: 6.8, sleepQuality: 6.2, energy: 6.2, stress: 5.8 },
    ]
  };

  const currentWellnessData = wellnessData[wellnessView as keyof typeof wellnessData];

  // Updated recovery data with dates starting from 14/03/2025 with 2-week intervals
  const recoveryData = [
    { date: '14/03/25', score: 125 },
    { date: '28/03/25', score: 80 },
    { date: '11/04/25', score: 105 },
    { date: '25/04/25', score: 115 },
    { date: '09/05/25', score: 85 },
    { date: '23/05/25', score: 120 },
    { date: '06/06/25', score: 105 },
    { date: '20/06/25', score: 120 },
  ];

  // Get current fitness data based on single selected test
  const getCurrentFitnessData = () => {
    console.log('Getting current fitness data for selected test:', selectedTest);
    
    // Check if it's a fitness test
    if (fitnessTestData[selectedTest as keyof typeof fitnessTestData]) {
      return fitnessTestData[selectedTest as keyof typeof fitnessTestData];
    }
    
    // Check if it's a strength exercise
    if (strengthData[selectedTest as keyof typeof strengthData]) {
      const exerciseData = strengthData[selectedTest as keyof typeof strengthData];
      return exerciseData.map(entry => ({
        date: entry.date,
        score: entry.weight
      }));
    }
    
    return [];
  };

  const toggleComponent = (component: string) => {
    setActiveComponents(prev => ({
      ...prev,
      [component]: !prev[component as keyof typeof prev]
    }));
  };

  const selectTest = (testName: string) => {
    console.log('Selecting test:', testName);
    setSelectedTest(testName);
  };

  const testCategories = {
    power: ['SLJ (Standing Long Jump)', 'CMJ (Counter Movement Jump)'],
    fitness: ['1.2K Time Trial', '1.4K Time Trial'],
    speed: ['0-10m Dash', '0-20m Dash', '0-30m Dash', 'Flying 10m'],
    strength: Object.keys(strengthData)
  };

  // Helper function to format seconds to MM:SS
  const formatTimeToMMSS = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if current test is a fitness test (requires time formatting)
  const isFitnessTest = testCategories.fitness.includes(selectedTest);

  return (
    <Layout title="Trends">
      <div className="space-y-6">
        {/* Wellness Trends */}
        <Card className="glass-dark p-6">
          <div className="flex flex-col gap-4 mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[16px]">
              <span className="text-2xl">📈</span>
              Wellness Trends
            </h3>
            
            {/* All buttons in one line */}
            <div className="flex gap-1 flex-wrap justify-start">
              {/* View Toggle Buttons */}
              {['7', '14', '28'].map((days) => (
                <Button
                  key={days}
                  variant={wellnessView === days ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWellnessView(days)}
                  className={`text-xs px-2 py-1 h-7 ${wellnessView === days 
                    ? "bg-teal-600 hover:bg-teal-700 text-white border-0" 
                    : "border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60"
                  }`}
                >
                  {days} Days
                </Button>
              ))}

              {/* Component Toggle Buttons */}
              {Object.entries(activeComponents).map(([component, isActive]) => (
                <Button
                  key={component}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleComponent(component)}
                  className={`text-xs px-2 py-1 h-7 capitalize ${isActive 
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-0" 
                    : "border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60"
                  }`}
                >
                  {component}
                </Button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentWellnessData} margin={{ left: 15, right: 30, top: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                  domain={[0, 10]}
                  width={20}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                {activeComponents.sleep && (
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                )}
                {activeComponents.energy && (
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                )}
                {activeComponents.sleepQuality && (
                  <Line 
                    type="monotone" 
                    dataKey="sleepQuality" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                )}
                {activeComponents.stress && (
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {activeComponents.sleep && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white/80 text-sm">Sleep</span>
              </div>
            )}
            {activeComponents.energy && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-white/80 text-sm">Energy</span>
              </div>
            )}
            {activeComponents.sleepQuality && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-white/80 text-sm">Sleep Qa</span>
              </div>
            )}
            {activeComponents.stress && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-white/80 text-sm">Stress</span>
              </div>
            )}
          </div>
        </Card>

        {/* Recovery Score */}
        <Card className="glass-dark p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-[16px]">
            <span className="text-2xl">📊</span>
            Recovery Score
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recoveryData} margin={{ left: 15, right: 30, top: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                  domain={[0, 150]}
                  width={20}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={4}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fitness Test Results */}
        <Card className="glass-dark p-6">
          <div className="flex flex-col gap-3 mb-4">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              Latest Fitness Test Results - {selectedTest}
            </h3>
            <div className="flex gap-1 flex-wrap justify-start">
              {/* Power Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 text-xs px-2 py-1 h-7"
                  >
                    Power <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                  {testCategories.power.map((test) => (
                    <DropdownMenuCheckboxItem
                      key={test}
                      checked={selectedTest === test}
                      onCheckedChange={() => selectTest(test)}
                      className="text-white hover:bg-gray-700"
                    >
                      {test}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fitness Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 text-xs px-2 py-1 h-7"
                  >
                    Fitness <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                  {testCategories.fitness.map((test) => (
                    <DropdownMenuCheckboxItem
                      key={test}
                      checked={selectedTest === test}
                      onCheckedChange={() => selectTest(test)}
                      className="text-white hover:bg-gray-700"
                    >
                      {test}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Speed Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 text-xs px-2 py-1 h-7"
                  >
                    Speed <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                  {testCategories.speed.map((test) => (
                    <DropdownMenuCheckboxItem
                      key={test}
                      checked={selectedTest === test}
                      onCheckedChange={() => selectTest(test)}
                      className="text-white hover:bg-gray-700"
                    >
                      {test}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Strength Lifts Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 text-xs px-2 py-1 h-7"
                  >
                    Strength Lifts <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                  {testCategories.strength.map((exercise) => (
                    <DropdownMenuCheckboxItem
                      key={exercise}
                      checked={selectedTest === exercise}
                      onCheckedChange={() => selectTest(exercise)}
                      className="text-white hover:bg-gray-700"
                    >
                      {exercise}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getCurrentFitnessData()} margin={{ left: 15, right: 30, top: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                  width={isFitnessTest ? 35 : 20}
                  tickFormatter={isFitnessTest ? formatTimeToMMSS : undefined}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  labelStyle={{ color: '#F3F4F6' }}
                  formatter={isFitnessTest ? (value: any) => [formatTimeToMMSS(value), 'Time'] : undefined}
                />
                <Bar 
                  dataKey="score" 
                  fill="#14B8A6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Weekly Summary */}
        <Card className="glass-dark p-6">
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Weekly Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">7.2</div>
              <div className="text-white/60 text-sm">Avg Sleep Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">6.8</div>
              <div className="text-white/60 text-sm">Avg Energy Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">7.1</div>
              <div className="text-white/60 text-sm">Avg Sleep Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">4.8</div>
              <div className="text-white/60 text-sm">Avg Stress Level</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Trends;
