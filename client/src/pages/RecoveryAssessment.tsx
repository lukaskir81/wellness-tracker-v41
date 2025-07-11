
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AIAnalysisDialog from '@/components/AIAnalysisDialog';
import { analyzeRecoveryData } from '@/services/geminiService';

const RecoveryAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [selectedSleepOption, setSelectedSleepOption] = useState<number | null>(null); // For tracking sleep radio selection
  
  // AI Analysis state
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  const assessmentItems = [
    {
      category: "Sleep",
      icon: "😴",
      items: [
        { text: "Get 8 hrs + of good quality sleep", points: 40 },
        { text: "Get 7-8 hrs of good quality sleep", points: 30 },
        { text: "Get less than 7 hrs of good quality sleep", points: 20 },
        { text: "Mid day Nap (20 - 45mins)", points: 10 },
        { text: "Breathing drills (10mins)", points: 10 },
        { text: "NSDR protocol (10mins)", points: 5 },
      ]
    },
    {
      category: "Nutrition/Hydration",
      icon: "😋",
      items: [
        { text: "Hit your daily calories, carb, protein and good fats", points: 15 },
        { text: ">3 Litres of hydrating fluids (water, milk etc)", points: 20 },
      ]
    },
    {
      category: "Active recovery",
      icon: "⚡",
      items: [
        { text: "45-60mins Outdoor walk", points: 15 },
        { text: "30mins Recovery bike session", points: 10 },
        { text: "Cryotherapy", points: 10 },
        { text: "Hot/Cold Water therapy", points: 10 },
        { text: "30 mins massage", points: 15 },
        { text: "Sauna", points: 5 },
        { text: "30 mins Pool session", points: 10 },
        { text: "Gym reset/ flush (bodyweight routine)", points: 10 },
        { text: "An Activity you really enjoy to unwind/ relax have fun", points: 15 },
        { text: "Mobility drills/ prehab routines", points: 10 },
        { text: "Foam rolling", points: 5 },
      ]
    },
    {
      category: "Delay recovery",
      icon: "⚠️",
      items: [
        { text: "phone before <1.5 hrs before bed", points: -25 },
        { text: "Alcohol", points: -80 },
      ]
    }
  ];

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

  const handleSleepSelection = (itemIndex: number, points: number) => {
    // If same option is clicked, deselect it
    if (selectedSleepOption === itemIndex) {
      const previousPoints = assessmentItems[0].items[selectedSleepOption].points;
      setSelectedSleepOption(null);
      setTotalPoints(prev => prev - previousPoints);
      return;
    }
    
    // Remove points from previously selected sleep option
    if (selectedSleepOption !== null) {
      const previousPoints = assessmentItems[0].items[selectedSleepOption].points;
      setTotalPoints(prev => prev - previousPoints);
    }
    
    // Set new selection and add points
    setSelectedSleepOption(itemIndex);
    setTotalPoints(prev => prev + points);
  };

  const toggleItem = (category: string, itemIndex: number, points: number) => {
    // Handle sleep category differently
    if (category === "Sleep") {
      handleSleepSelection(itemIndex, points);
      return;
    }
    
    const key = `${category}-${itemIndex}`;
    const newSelected = { ...selectedItems };
    
    if (newSelected[key]) {
      delete newSelected[key];
      setTotalPoints(prev => prev - points);
    } else {
      newSelected[key] = true;
      setTotalPoints(prev => prev + points);
    }
    
    setSelectedItems(newSelected);
  };

  const handleAnalyzeRecovery = async () => {
    setShowAnalysis(true);
    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult('');

    try {
      // Create a comprehensive data structure including sleep selection
      const recoveryData = {
        totalPoints,
        selectedItems,
        selectedSleepOption: selectedSleepOption !== null ? {
          index: selectedSleepOption,
          text: assessmentItems[0].items[selectedSleepOption].text,
          points: assessmentItems[0].items[selectedSleepOption].points
        } : null,
        assessmentItems
      };

      const analysis = await analyzeRecoveryData(recoveryData);
      setAnalysisResult(analysis);
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const headerAction = (
    <Button
      variant="ghost"
      className="text-white hover:bg-white/10"
      onClick={() => navigate('/recovery-logs')}
    >
      View Logs
    </Button>
  );

  return (
    <Layout title="Recovery Assessment" headerAction={headerAction}>
      <div className="space-y-4">
        {/* Date Selection */}
        <Card className="glass-dark p-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Select Date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal glass border-white/20 text-white",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </Card>

        {/* Target Points */}
        <Card className="glass-dark p-3">
          <p className="text-center text-green-400 text-sm">Accumulate at least 105 points in 24-36 hrs post-match/ heavy session.</p>
        </Card>

        {/* Assessment Categories */}
        {assessmentItems.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="glass-dark p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-white font-semibold text-lg">{category.category}</h3>
            </div>
            
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => {
                const key = `${category.category}-${itemIndex}`;
                const isNegative = item.points < 0;
                
                // For sleep category, use radio button logic
                const isSelected = category.category === "Sleep" 
                  ? selectedSleepOption === itemIndex
                  : selectedItems[key];
                
                return (
                  <div
                    key={itemIndex}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all",
                      isSelected 
                        ? isNegative 
                          ? "bg-red-500/20 border border-red-500/30" 
                          : "bg-green-500/20 border border-green-500/30"
                        : "bg-white/5 hover:bg-white/10"
                    )}
                    onClick={() => toggleItem(category.category, itemIndex, item.points)}
                  >
                    <div className="flex items-center gap-3">
                      {category.category === "Sleep" ? (
                        // Radio button for sleep options
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          isSelected
                            ? "bg-green-500 border-green-500"
                            : "border-white/30"
                        )}>
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      ) : (
                        // Checkbox for other categories
                        <div className={cn(
                          "w-5 h-5 rounded border-2 flex items-center justify-center",
                          isSelected
                            ? isNegative
                              ? "bg-red-500 border-red-500"
                              : "bg-green-500 border-green-500"
                            : "border-white/30"
                        )}>
                          {isSelected && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                      )}
                      <span className="text-white text-sm">{item.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-bold text-sm",
                        isNegative ? "text-red-400" : "text-green-400"
                      )}>
                        {item.points > 0 ? '+' : ''}{item.points}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-white/60 hover:bg-white/10"
                      >
                        👍
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}

        {/* Total Points - Moved to bottom */}
        <Card className="glass-dark p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold text-lg">Recovery Score</span>
            <div className={cn(
              "px-4 py-2 rounded-lg font-bold text-xl",
              totalPoints >= 105 ? "bg-green-500" : "bg-red-500"
            )}>
              {totalPoints}
            </div>
          </div>
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 mb-2"
            onClick={handleAnalyzeRecovery}
          >
            🔍 Analyze My Recovery
          </Button>
        </Card>

        {/* Submit Button */}
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2"
          onClick={() => {
            // Handle submit logic here
            navigate('/recovery-logs');
          }}
        >
          👍 Submit Assessment
        </Button>

        {/* Advertisement Space */}
        <Card className="glass-dark p-4 text-center">
          <h3 className="text-white font-semibold mb-2">Advertisement Space</h3>
          <p className="text-white/60 text-sm">Ad will be displayed here once configured.</p>
        </Card>
      </div>
      <AIAnalysisDialog
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        title="Recovery Analysis"
        analysis={analysisResult}
        isLoading={isAnalyzing}
        error={analysisError}
      />
    </Layout>
  );
};

export default RecoveryAssessment;
