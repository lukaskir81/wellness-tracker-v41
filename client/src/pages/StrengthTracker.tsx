import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, TrendingUp, BarChart3, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OneRMCalculator from '@/components/OneRMCalculator';
type ViewMode = 'main' | 'categories' | 'exercises' | 'track' | 'viewLogs';
interface WorkoutLog {
  date: string;
  sets: Array<{
    reps: number;
    load: number;
    rir: number;
  }>;
}
const StrengthTracker = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isTrackingMode, setIsTrackingMode] = useState(false);
  const [sets, setSets] = useState([{
    reps: 6,
    load: 80,
    rir: 4
  }]);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorType, setCalculatorType] = useState<'bench' | 'lowerBody' | 'chins'>('bench');
  const [showLowerBodyOptions, setShowLowerBodyOptions] = useState(false);
  const [selectedLowerBodyExercise, setSelectedLowerBodyExercise] = useState<'hexbar' | 'backsquat' | 'frontsquat'>('hexbar');
  const categories = [{
    name: "Push",
    exercises: ["Bench press", "Military press", "DB chest press"]
  }, {
    name: "Pull",
    exercises: ["OH chins", "UH chins", "1 arm row"]
  }, {
    name: "LB Hip dom",
    exercises: ["Deadlift", "Hex Deadlift", "RDL", "Hip thrust", "1 leg RDL"]
  }, {
    name: "LB Knee dom",
    exercises: ["Back Squat", "Front Squat", "Split Squat"]
  }];

  // Updated mock data with more realistic progression (not linear) and oldest entries first
  const mockWorkoutLogs: Record<string, WorkoutLog[]> = {
    "Bench press": [{
      date: "2024-03-01",
      sets: [{
        reps: 8,
        load: 70,
        rir: 4
      }, {
        reps: 8,
        load: 70,
        rir: 3
      }, {
        reps: 6,
        load: 75,
        rir: 2
      }]
    }, {
      date: "2024-03-08",
      sets: [{
        reps: 8,
        load: 72,
        rir: 4
      }, {
        reps: 8,
        load: 75,
        rir: 3
      }, {
        reps: 7,
        load: 78,
        rir: 2
      }]
    }, {
      date: "2024-03-15",
      sets: [{
        reps: 8,
        load: 75,
        rir: 4
      }, {
        reps: 8,
        load: 80,
        rir: 3
      }, {
        reps: 6,
        load: 82,
        rir: 2
      }]
    }, {
      date: "2024-03-22",
      sets: [{
        reps: 8,
        load: 78,
        rir: 4
      }, {
        reps: 8,
        load: 82,
        rir: 3
      }, {
        reps: 6,
        load: 85,
        rir: 2
      }]
    }, {
      date: "2024-03-29",
      sets: [{
        reps: 8,
        load: 80,
        rir: 4
      }, {
        reps: 8,
        load: 85,
        rir: 3
      }, {
        reps: 7,
        load: 88,
        rir: 2
      }]
    }, {
      date: "2024-04-05",
      sets: [{
        reps: 8,
        load: 85,
        rir: 4
      }, {
        reps: 8,
        load: 90,
        rir: 3
      }, {
        reps: 6,
        load: 95,
        rir: 2
      }]
    }, {
      date: "2024-04-12",
      sets: [{
        reps: 8,
        load: 88,
        rir: 4
      }, {
        reps: 8,
        load: 92,
        rir: 3
      }, {
        reps: 7,
        load: 97,
        rir: 2
      }]
    }],
    "Military press": [{
      date: "2024-03-02",
      sets: [{
        reps: 8,
        load: 45,
        rir: 4
      }, {
        reps: 8,
        load: 47,
        rir: 3
      }, {
        reps: 6,
        load: 50,
        rir: 2
      }]
    }, {
      date: "2024-03-09",
      sets: [{
        reps: 8,
        load: 47,
        rir: 4
      }, {
        reps: 8,
        load: 50,
        rir: 3
      }, {
        reps: 6,
        load: 52,
        rir: 2
      }]
    }, {
      date: "2024-03-16",
      sets: [{
        reps: 8,
        load: 50,
        rir: 4
      }, {
        reps: 8,
        load: 53,
        rir: 3
      }, {
        reps: 7,
        load: 55,
        rir: 2
      }]
    }, {
      date: "2024-03-23",
      sets: [{
        reps: 8,
        load: 52,
        rir: 4
      }, {
        reps: 8,
        load: 55,
        rir: 3
      }, {
        reps: 6,
        load: 58,
        rir: 2
      }]
    }, {
      date: "2024-03-30",
      sets: [{
        reps: 8,
        load: 55,
        rir: 4
      }, {
        reps: 8,
        load: 58,
        rir: 3
      }, {
        reps: 7,
        load: 60,
        rir: 2
      }]
    }, {
      date: "2024-04-06",
      sets: [{
        reps: 8,
        load: 58,
        rir: 4
      }, {
        reps: 8,
        load: 62,
        rir: 3
      }, {
        reps: 6,
        load: 65,
        rir: 2
      }]
    }],
    "DB chest press": [{
      date: "2024-03-03",
      sets: [{
        reps: 10,
        load: 35,
        rir: 4
      }, {
        reps: 10,
        load: 37,
        rir: 3
      }, {
        reps: 8,
        load: 40,
        rir: 2
      }]
    }, {
      date: "2024-03-10",
      sets: [{
        reps: 10,
        load: 37,
        rir: 4
      }, {
        reps: 10,
        load: 40,
        rir: 3
      }, {
        reps: 9,
        load: 42,
        rir: 2
      }]
    }, {
      date: "2024-03-17",
      sets: [{
        reps: 10,
        load: 40,
        rir: 4
      }, {
        reps: 10,
        load: 43,
        rir: 3
      }, {
        reps: 8,
        load: 45,
        rir: 2
      }]
    }, {
      date: "2024-03-24",
      sets: [{
        reps: 10,
        load: 42,
        rir: 4
      }, {
        reps: 10,
        load: 45,
        rir: 3
      }, {
        reps: 9,
        load: 48,
        rir: 2
      }]
    }, {
      date: "2024-03-31",
      sets: [{
        reps: 10,
        load: 45,
        rir: 4
      }, {
        reps: 10,
        load: 48,
        rir: 3
      }, {
        reps: 8,
        load: 52,
        rir: 2
      }]
    }, {
      date: "2024-04-07",
      sets: [{
        reps: 10,
        load: 48,
        rir: 4
      }, {
        reps: 10,
        load: 52,
        rir: 3
      }, {
        reps: 9,
        load: 55,
        rir: 2
      }]
    }],
    "OH chins": [{
      date: "2024-03-04",
      sets: [{
        reps: 6,
        load: 70,
        rir: 4
      }, {
        reps: 5,
        load: 70,
        rir: 3
      }, {
        reps: 4,
        load: 80,
        rir: 1
      }]
    }, {
      date: "2024-03-11",
      sets: [{
        reps: 7,
        load: 80,
        rir: 4
      }, {
        reps: 6,
        load: 80,
        rir: 3
      }, {
        reps: 4,
        load: 90,
        rir: 2
      }]
    }, {
      date: "2024-03-18",
      sets: [{
        reps: 7,
        load: 90,
        rir: 4
      }, {
        reps: 7,
        load: 90,
        rir: 3
      }, {
        reps: 6,
        load: 95,
        rir: 1
      }]
    }, {
      date: "2024-03-25",
      sets: [{
        reps: 8,
        load: 80,
        rir: 4
      }, {
        reps: 8,
        load: 80,
        rir: 3
      }, {
        reps: 7,
        load: 90,
        rir: 2
      }]
    }, {
      date: "2024-04-01",
      sets: [{
        reps: 8,
        load: 80,
        rir: 4
      }, {
        reps: 8,
        load: 90,
        rir: 3
      }, {
        reps: 7,
        load: 100,
        rir: 1
      }]
    }, {
      date: "2024-04-08",
      sets: [{
        reps: 10,
        load: 70,
        rir: 3
      }, {
        reps: 9,
        load: 70,
        rir: 3
      }, {
        reps: 8,
        load: 70,
        rir: 2
      }]
    }],
    "UH chins": [{
      date: "2024-03-05",
      sets: [{
        reps: 8,
        load: 80,
        rir: 4
      }, {
        reps: 7,
        load: 80,
        rir: 3
      }, {
        reps: 6,
        load: 85,
        rir: 2
      }]
    }, {
      date: "2024-03-12",
      sets: [{
        reps: 9,
        load: 80,
        rir: 4
      }, {
        reps: 8,
        load: 80,
        rir: 3
      }, {
        reps: 7,
        load: 90,
        rir: 2
      }]
    }, {
      date: "2024-03-19",
      sets: [{
        reps: 9,
        load: 90,
        rir: 4
      }, {
        reps: 9,
        load: 90,
        rir: 3
      }, {
        reps: 8,
        load: 90,
        rir: 2
      }]
    }, {
      date: "2024-03-26",
      sets: [{
        reps: 10,
        load: 80,
        rir: 4
      }, {
        reps: 10,
        load: 80,
        rir: 3
      }, {
        reps: 9,
        load: 80,
        rir: 2
      }]
    }, {
      date: "2024-04-02",
      sets: [{
        reps: 11,
        load: 80,
        rir: 4
      }, {
        reps: 10,
        load: 80,
        rir: 3
      }, {
        reps: 9,
        load: 80,
        rir: 2
      }]
    }, {
      date: "2024-04-09",
      sets: [{
        reps: 12,
        load: 70,
        rir: 4
      }, {
        reps: 11,
        load: 70,
        rir: 3
      }, {
        reps: 10,
        load: 80,
        rir: 2
      }]
    }],
    "1 arm row": [{
      date: "2024-03-06",
      sets: [{
        reps: 12,
        load: 25,
        rir: 4
      }, {
        reps: 12,
        load: 27,
        rir: 3
      }, {
        reps: 10,
        load: 30,
        rir: 2
      }]
    }, {
      date: "2024-03-13",
      sets: [{
        reps: 12,
        load: 27,
        rir: 4
      }, {
        reps: 12,
        load: 30,
        rir: 3
      }, {
        reps: 11,
        load: 32,
        rir: 2
      }]
    }, {
      date: "2024-03-20",
      sets: [{
        reps: 12,
        load: 30,
        rir: 4
      }, {
        reps: 12,
        load: 33,
        rir: 3
      }, {
        reps: 10,
        load: 35,
        rir: 2
      }]
    }, {
      date: "2024-03-27",
      sets: [{
        reps: 12,
        load: 32,
        rir: 4
      }, {
        reps: 12,
        load: 35,
        rir: 3
      }, {
        reps: 11,
        load: 38,
        rir: 2
      }]
    }, {
      date: "2024-04-03",
      sets: [{
        reps: 12,
        load: 35,
        rir: 4
      }, {
        reps: 12,
        load: 38,
        rir: 3
      }, {
        reps: 10,
        load: 42,
        rir: 2
      }]
    }, {
      date: "2024-04-10",
      sets: [{
        reps: 12,
        load: 38,
        rir: 4
      }, {
        reps: 12,
        load: 42,
        rir: 3
      }, {
        reps: 11,
        load: 45,
        rir: 2
      }]
    }],
    "Deadlift": [{
      date: "2024-03-07",
      sets: [{
        reps: 5,
        load: 120,
        rir: 4
      }, {
        reps: 5,
        load: 125,
        rir: 3
      }, {
        reps: 3,
        load: 130,
        rir: 2
      }]
    }, {
      date: "2024-03-14",
      sets: [{
        reps: 5,
        load: 125,
        rir: 4
      }, {
        reps: 5,
        load: 130,
        rir: 3
      }, {
        reps: 4,
        load: 135,
        rir: 2
      }]
    }, {
      date: "2024-03-21",
      sets: [{
        reps: 5,
        load: 130,
        rir: 4
      }, {
        reps: 5,
        load: 135,
        rir: 3
      }, {
        reps: 3,
        load: 142,
        rir: 2
      }]
    }, {
      date: "2024-03-28",
      sets: [{
        reps: 5,
        load: 135,
        rir: 4
      }, {
        reps: 5,
        load: 142,
        rir: 3
      }, {
        reps: 4,
        load: 148,
        rir: 2
      }]
    }, {
      date: "2024-04-04",
      sets: [{
        reps: 5,
        load: 140,
        rir: 4
      }, {
        reps: 5,
        load: 148,
        rir: 3
      }, {
        reps: 3,
        load: 155,
        rir: 2
      }]
    }, {
      date: "2024-04-11",
      sets: [{
        reps: 5,
        load: 145,
        rir: 4
      }, {
        reps: 5,
        load: 152,
        rir: 3
      }, {
        reps: 4,
        load: 160,
        rir: 2
      }]
    }],
    "Back Squat": [{
      date: "2024-03-08",
      sets: [{
        reps: 8,
        load: 80,
        rir: 4
      }, {
        reps: 8,
        load: 85,
        rir: 3
      }, {
        reps: 6,
        load: 90,
        rir: 2
      }]
    }, {
      date: "2024-03-15",
      sets: [{
        reps: 8,
        load: 85,
        rir: 4
      }, {
        reps: 8,
        load: 90,
        rir: 3
      }, {
        reps: 7,
        load: 95,
        rir: 2
      }]
    }, {
      date: "2024-03-22",
      sets: [{
        reps: 8,
        load: 88,
        rir: 4
      }, {
        reps: 8,
        load: 95,
        rir: 3
      }, {
        reps: 6,
        load: 102,
        rir: 2
      }]
    }, {
      date: "2024-03-29",
      sets: [{
        reps: 8,
        load: 92,
        rir: 4
      }, {
        reps: 8,
        load: 100,
        rir: 3
      }, {
        reps: 7,
        load: 108,
        rir: 2
      }]
    }, {
      date: "2024-04-05",
      sets: [{
        reps: 8,
        load: 98,
        rir: 4
      }, {
        reps: 8,
        load: 105,
        rir: 3
      }, {
        reps: 6,
        load: 115,
        rir: 2
      }]
    }, {
      date: "2024-04-12",
      sets: [{
        reps: 8,
        load: 102,
        rir: 4
      }, {
        reps: 8,
        load: 110,
        rir: 3
      }, {
        reps: 7,
        load: 120,
        rir: 2
      }]
    }]
  };

  // Calculate intensity using Epley formula for the set with lowest RIR
  const calculateWorkoutIntensity = (sets: WorkoutLog['sets']) => {
    const lowestRirSet = sets.reduce((prev, current) => current.rir < prev.rir ? current : prev);
    return lowestRirSet.load * (1 + 0.0333 * lowestRirSet.reps);
  };

  // Updated getChartData function to ensure oldest entries are on the left
  const getChartData = (exercise: string) => {
    const logs = mockWorkoutLogs[exercise] || [];
    const intensities = logs.map(log => ({
      date: log.date,
      intensity: Math.round(calculateWorkoutIntensity(log.sets))
    })); // Remove .reverse() to keep chronological order (oldest first)

    return {
      data: intensities,
      minValue: Math.min(...intensities.map(d => d.intensity)) - 10,
      maxValue: Math.max(...intensities.map(d => d.intensity)) + 10
    };
  };
  const addSet = () => {
    setSets([...sets, {
      reps: 6,
      load: 100,
      rir: 4
    }]);
  };
  const updateSet = (index: number, field: string, value: number) => {
    const newSets = [...sets];
    newSets[index] = {
      ...newSets[index],
      [field]: value
    };
    setSets(newSets);
  };
  const goBack = () => {
    if (viewMode === 'track' && selectedExercise) {
      setSelectedExercise(null);
      setViewMode('exercises');
    } else if (viewMode === 'viewLogs' && selectedExercise) {
      setSelectedExercise(null);
      setViewMode('exercises');
    } else if (viewMode === 'exercises' && selectedCategory) {
      setSelectedCategory(null);
      setViewMode('categories');
    } else if (viewMode === 'categories') {
      setViewMode('main');
    } else {
      navigate('/');
    }
  };

  // Exercise logs view with more compact layout and improved graph
  if (viewMode === 'viewLogs' && selectedExercise) {
    const logs = mockWorkoutLogs[selectedExercise] || [];
    const {
      data: chartData,
      minValue,
      maxValue
    } = getChartData(selectedExercise);
    return <Layout title="Strength Tracker" showBack={false}>
        <div className="space-y-6">
          <Card className="bg-gray-800/80 backdrop-blur border-gray-700 p-6">
            <div className="mb-6">
              <Button variant="ghost" onClick={goBack} className="text-white hover:bg-white/10 mb-4">
                ← Back
              </Button>
              <h2 className="text-white font-semibold text-lg">{selectedExercise} - Workout History</h2>
            </div>

            <div className="space-y-2">
              {logs.length === 0 ? <p className="text-white/60 text-center py-8">No workout logs found for this exercise</p> : logs.map((log, logIndex) => <Card key={logIndex} className="bg-gray-700/50 border-gray-600 p-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold text-sm">{log.date}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-xs">
                          Intensity: {Math.round(calculateWorkoutIntensity(log.sets))}
                        </span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-6 w-6">
                              <BarChart3 className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-white">{selectedExercise} - Intensity Progress</DialogTitle>
                            </DialogHeader>
                            <div className="h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[minValue, maxValue]} scale="linear" />
                                  <Tooltip contentStyle={{
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#F3F4F6'
                            }} />
                                  <Line type="monotone" dataKey="intensity" stroke="#3B82F6" strokeWidth={2} dot={{
                              fill: '#3B82F6',
                              strokeWidth: 2,
                              r: 4
                            }} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="text-white/60 text-sm">
                              <p>Intensity estimated using Epley formula</p>
                              <p>Based on the heaviest set (with lowest indicated reps in reserve (RIR) in the workout)</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-600">
                          <TableHead className="text-white/80 py-1 text-xs">Set</TableHead>
                          <TableHead className="text-white/80 py-1 text-xs">Reps</TableHead>
                          <TableHead className="text-white/80 py-1 text-xs">Load (kg)</TableHead>
                          <TableHead className="text-white/80 py-1 text-xs">RIR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {log.sets.map((set, setIndex) => <TableRow key={setIndex} className="border-gray-600">
                            <TableCell className="text-white py-0.5 text-xs">{setIndex + 1}</TableCell>
                            <TableCell className="text-white py-0.5 text-xs">{set.reps}</TableCell>
                            <TableCell className="text-white py-0.5 text-xs">{set.load}</TableCell>
                            <TableCell className="text-white py-0.5 text-xs">{set.rir}</TableCell>
                          </TableRow>)}
                      </TableBody>
                    </Table>
                  </Card>)}
            </div>
          </Card>
        </div>
      </Layout>;
  }
  if (viewMode === 'track' && selectedExercise) {
    return <Layout title="Strength Tracker" showBack={false}>
        <div className="space-y-6">
          <Card className="bg-gray-800/80 backdrop-blur border-gray-700 p-6">
            <div className="mb-6">
              <Button variant="ghost" onClick={goBack} className="text-white hover:bg-white/10 mb-4">
                ← Back
              </Button>
              <h2 className="text-white font-semibold text-lg">{selectedExercise}</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-white font-semibold text-sm">
                <div>Sets</div>
                <div>Reps</div>
                <div>Load</div>
                <div>RIR</div>
              </div>

              {sets.map((set, index) => <div key={index} className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-white font-semibold">{index + 1}</div>
                  <Input type="number" value={set.reps} onChange={e => updateSet(index, 'reps', parseInt(e.target.value))} className="bg-gray-700/50 border-gray-600 text-white" />
                  <div className="flex items-center gap-2">
                    <Input type="number" value={set.load} onChange={e => updateSet(index, 'load', parseInt(e.target.value))} className="bg-gray-700/50 border-gray-600 text-white" />
                    <span className="text-white/60 text-sm">kg</span>
                  </div>
                  <Input type="number" value={set.rir} onChange={e => updateSet(index, 'rir', parseInt(e.target.value))} className="bg-gray-700/50 border-gray-600 text-white" />
                </div>)}

              <Button onClick={addSet} className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center">
                +
              </Button>
              <p className="text-white/60 text-sm">add next set</p>
            </div>
          </Card>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3">
            save
          </Button>
        </div>
      </Layout>;
  }
  if (viewMode === 'exercises' && selectedCategory) {
    const category = categories.find(cat => cat.name === selectedCategory);
    return <Layout title="Strength Tracker" showBack={false}>
        <div className="space-y-6">
          <Card className="bg-gray-800/80 backdrop-blur border-gray-700 p-6">
            <div className="mb-6">
              <Button variant="ghost" onClick={goBack} className="text-white hover:bg-white/10 mb-4">
                ← Back
              </Button>
              <h2 className="text-white font-semibold text-lg">{selectedCategory}</h2>
            </div>

            <div className="space-y-3">
              {category?.exercises.map((exercise, index) => <Button key={index} onClick={() => {
              setSelectedExercise(exercise);
              setViewMode(isTrackingMode ? 'track' : 'viewLogs');
            }} className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-4 rounded-lg border border-gray-600">
                  {exercise}
                </Button>)}
            </div>
          </Card>
        </div>
      </Layout>;
  }
  if (viewMode === 'categories') {
    return <Layout title="Strength Tracker" showBack={false}>
        <div className="space-y-6">
          <Card className="bg-gray-800/80 backdrop-blur border-gray-700 p-6">
            <div className="mb-6">
              <Button variant="ghost" onClick={goBack} className="text-white hover:bg-white/10 mb-4">
                ← Back
              </Button>
              <h2 className="text-white font-semibold text-lg">
                {isTrackingMode ? 'Select Category to Track' : 'Select Category to View'}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => <Button key={index} onClick={() => {
              setSelectedCategory(category.name);
              setViewMode('exercises');
            }} className="bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold py-6 border border-gray-600">
                  {category.name}
                </Button>)}
            </div>
          </Card>
        </div>
      </Layout>;
  }
  return <Layout title="Strength Tracker" showBack={true}>
      <div className="space-y-6">
        {/* Main Lift Buttons */}
        <div className="space-y-4 mb-8">
          <Button 
            onClick={() => {
              setIsTrackingMode(true);
              setViewMode('categories');
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-3"
          >
            <Dumbbell className="w-6 h-6" />
            Track Main Lifts
          </Button>
          
          <Button 
            onClick={() => {
              setIsTrackingMode(false);
              setViewMode('categories');
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-6 h-6" />
            View Main Lifts
          </Button>
        </div>

        {/* 1RM Estimation Buttons */}
        <div className="space-y-4 mb-6">
          <Button 
            onClick={() => {
              setCalculatorType('bench');
              setCalculatorOpen(true);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-3"
          >
            <Calculator className="w-6 h-6" />
            Bench Press 1RM Estimation
          </Button>
          
          <Button 
            onClick={() => {
              setShowLowerBodyOptions(true);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-3"
          >
            <Calculator className="w-6 h-6" />
            Lower Body 1RM Estimation
          </Button>
          
          <Button 
            onClick={() => {
              setCalculatorType('chins');
              setCalculatorOpen(true);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-3"
          >
            <Calculator className="w-6 h-6" />
            Chin ups 1RM Estimation
          </Button>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur border-gray-700 p-6 text-center">
          <div className="text-white/60 font-medium">
            Advertisement Space
          </div>
          <p className="text-white/40 text-sm mt-1">Ad will be displayed here once configured.</p>
        </Card>
        
        {/* Calculator Modal */}
        {/* Lower Body Exercise Selection Dialog */}
        <Dialog open={showLowerBodyOptions} onOpenChange={setShowLowerBodyOptions}>
          <DialogContent className="glass-dark border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Select Lower Body Exercise</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Button
                onClick={() => {
                  setSelectedLowerBodyExercise('hexbar');
                  setCalculatorType('lowerBody');
                  setShowLowerBodyOptions(false);
                  setCalculatorOpen(true);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg rounded-lg"
              >
                Hex Bar Deadlift (HSQ)
              </Button>
              
              <Button
                onClick={() => {
                  setSelectedLowerBodyExercise('backsquat');
                  setCalculatorType('lowerBody');
                  setShowLowerBodyOptions(false);
                  setCalculatorOpen(true);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg rounded-lg"
              >
                Back Squat (BSQ)
              </Button>
              
              <Button
                onClick={() => {
                  setSelectedLowerBodyExercise('frontsquat');
                  setCalculatorType('lowerBody');
                  setShowLowerBodyOptions(false);
                  setCalculatorOpen(true);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 text-lg rounded-lg"
              >
                Front Squat (FSQ)
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <OneRMCalculator 
          isOpen={calculatorOpen} 
          onClose={() => setCalculatorOpen(false)}
          liftType={calculatorType}
          lowerBodyExercise={selectedLowerBodyExercise}
        />
      </div>
    </Layout>;
};
export default StrengthTracker;