import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import AIAnalysisDialog from '@/components/AIAnalysisDialog';
import { analyzeWellnessData } from '@/services/geminiService';
import { useAuth } from '@/contexts/AuthContext';
import { firestoreService } from '@/lib/firestoreService';
import { useToast } from '@/hooks/use-toast';
const WellnessEntry = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [sleepHours, setSleepHours] = useState([8]);
  const [sleepQuality, setSleepQuality] = useState([9]);
  const [energyLevel, setEnergyLevel] = useState([2]);
  const [mood, setMood] = useState([2]);
  const [stress, setStress] = useState([9]);
  const [lowerBodySoreness, setLowerBodySoreness] = useState([2]);
  const [upperBodySoreness, setUpperBodySoreness] = useState([10]);
  const [notes, setNotes] = useState("I felt very tired today for some reason, mood wasn't great");
  const [isSaving, setIsSaving] = useState(false);

  // AI Analysis state
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  
  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save wellness entries.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const wellnessEntry = {
        uid: user.uid,
        date: format(date, 'yyyy-MM-dd'),
        sleepHours: sleepHours[0],
        sleepQuality: sleepQuality[0],
        energyLevel: energyLevel[0],
        mood: mood[0],
        stress: stress[0],
        lowerBodySoreness: lowerBodySoreness[0],
        upperBodySoreness: upperBodySoreness[0],
        notes: notes
      };

      await firestoreService.addWellnessEntry(wellnessEntry);
      
      toast({
        title: "Success",
        description: "Wellness entry saved successfully!",
      });
      
      navigate('/wellness-logs');
    } catch (error) {
      console.error('Error saving wellness entry:', error);
      toast({
        title: "Error",
        description: "Failed to save wellness entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const selectedDate = new Date(newDate);
    selectedDate.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (selectedDate > today) {
      toast({
        title: "Invalid Date",
        description: "Future dates cannot be selected.",
        variant: "destructive"
      });
      return;
    }
    
    setDate(newDate);
  };

  const handleAnalyzeWellness = async () => {
    setShowAnalysis(true);
    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult('');
    try {
      const wellnessData = {
        sleepHours: sleepHours[0],
        sleepQuality: sleepQuality[0],
        energyLevel: energyLevel[0],
        mood: mood[0],
        stress: stress[0],
        lowerBodySoreness: lowerBodySoreness[0],
        upperBodySoreness: upperBodySoreness[0],
        notes: notes
      };
      const analysis = await analyzeWellnessData(wellnessData);
      setAnalysisResult(analysis);
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };
  const headerAction = <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/wellness-logs')}>
      View Logs
    </Button>;
  const getSliderColor = (value: number, isReverse = false) => {
    if (isReverse) {
      if (value >= 8) return "bg-green-500";
      if (value >= 6) return "bg-yellow-500";
      if (value >= 4) return "bg-orange-500";
      return "bg-red-500";
    } else {
      if (value >= 8) return "bg-red-500";
      if (value >= 6) return "bg-orange-500";
      if (value >= 4) return "bg-yellow-500";
      return "bg-green-500";
    }
  };
  const getSleepHoursColor = (value: number) => {
    if (value >= 8) return "bg-green-500";
    if (value >= 6) return "bg-yellow-500";
    if (value >= 4) return "bg-orange-500";
    return "bg-red-500";
  };
  const getSorenessStressColor = (value: number) => {
    if (value >= 8) return "bg-green-500";
    if (value >= 6) return "bg-yellow-500";
    if (value >= 4) return "bg-orange-500";
    return "bg-red-500";
  };
  return <Layout title="Wellness Entry" headerAction={headerAction}>
      <div className="space-y-4">
        {/* Date Selection */}
        <Card className="glass-dark p-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Select Date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal glass border-white/20 text-white", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus className={cn("p-3 pointer-events-auto")} />
              </PopoverContent>
            </Popover>
          </div>
        </Card>

        {/* Sleep Hours */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Sleep Hours</h3>
            <span className="text-2xl">😴</span>
          </div>
          <div className="space-y-3">
            <Slider value={sleepHours} onValueChange={setSleepHours} max={10} min={1} step={0.5} className="w-full" color={getSleepHoursColor(sleepHours[0])} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>1 Hr</span>
              <span className="text-white font-semibold">{sleepHours[0]} hrs</span>
              <span>10+ Hrs</span>
            </div>
          </div>
        </Card>

        {/* Sleep Quality */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Sleep Quality</h3>
            <span className="text-2xl">😴</span>
          </div>
          <div className="space-y-3">
            <Slider value={sleepQuality} onValueChange={setSleepQuality} max={10} min={1} step={1} className="w-full" color={getSliderColor(sleepQuality[0], true)} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>Worst</span>
              <span className="text-white font-semibold">{sleepQuality[0]}/10</span>
              <span>Best</span>
            </div>
          </div>
        </Card>

        {/* Energy Level */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Energy Levels</h3>
            <span className="text-2xl">🔋</span>
          </div>
          <div className="space-y-3">
            <Slider value={energyLevel} onValueChange={setEnergyLevel} max={10} min={1} step={1} className="w-full" color={getSliderColor(energyLevel[0], true)} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>Low</span>
              <span className="text-white font-semibold">{energyLevel[0]}/10</span>
              <span>High</span>
            </div>
          </div>
        </Card>

        {/* Mood */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Mood</h3>
            <span className="text-2xl">😊</span>
          </div>
          <div className="space-y-3">
            <Slider value={mood} onValueChange={setMood} max={10} min={1} step={1} className="w-full" color={getSliderColor(mood[0], true)} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>Worst</span>
              <span className="text-white font-semibold">{mood[0]}/10</span>
              <span>Best</span>
            </div>
          </div>
        </Card>

        {/* Stress */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Stress</h3>
            <span className="text-2xl">😰</span>
          </div>
          <div className="space-y-3">
            <Slider value={stress} onValueChange={setStress} max={10} min={1} step={1} className="w-full" color={getSorenessStressColor(stress[0])} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>High</span>
              <span className="text-white font-semibold">{stress[0]}/10</span>
              <span>Low</span>
            </div>
          </div>
        </Card>

        {/* Lower Body Soreness */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Lower Body Soreness</h3>
            <span className="text-2xl">🦵</span>
          </div>
          <div className="space-y-3">
            <Slider value={lowerBodySoreness} onValueChange={setLowerBodySoreness} max={10} min={1} step={1} className="w-full" color={getSorenessStressColor(lowerBodySoreness[0])} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>Very sore</span>
              <span className="text-white font-semibold">{lowerBodySoreness[0]}/10</span>
              <span>No soreness</span>
            </div>
          </div>
        </Card>

        {/* Upper Body Soreness */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Upper Body Soreness</h3>
            <span className="text-2xl">💪</span>
          </div>
          <div className="space-y-3">
            <Slider value={upperBodySoreness} onValueChange={setUpperBodySoreness} max={10} min={1} step={1} className="w-full" color={getSorenessStressColor(upperBodySoreness[0])} />
            <div className="flex justify-between text-white/60 text-sm">
              <span>Very sore</span>
              <span className="text-white font-semibold">{upperBodySoreness[0]}/10</span>
              <span>No soreness</span>
            </div>
          </div>
        </Card>

        {/* Notes */}
        <Card className="glass-dark p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-white font-semibold">Add Wellness Note</h3>
            <span className="text-2xl">📝</span>
          </div>
          <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add your wellness notes here..." className="glass border-white/20 text-white placeholder:text-white/50 resize-none h-20" />
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2" onClick={handleAnalyzeWellness}>
            ⚙️ Analyze My Note
          </Button>
          <Button 
            className="w-full bg-white text-purple-700 hover:bg-gray-100 font-semibold py-2"
            onClick={handleSave}
            disabled={isSaving}
          >
            💾 {isSaving ? 'Saving...' : 'Save Wellness Entry'}
          </Button>
        </div>
      </div>

      <AIAnalysisDialog isOpen={showAnalysis} onClose={() => setShowAnalysis(false)} title="Wellness Analysis" analysis={analysisResult} isLoading={isAnalyzing} error={analysisError} />
    </Layout>;
};
export default WellnessEntry;