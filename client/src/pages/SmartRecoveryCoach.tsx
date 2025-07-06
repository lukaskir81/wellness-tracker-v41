import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import AIAnalysisDialog from '@/components/AIAnalysisDialog';
import { analyzeJournalEntries } from '@/services/geminiService';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
}

const SmartRecoveryCoach = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [content, setContent] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  // Mock historical entries
  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date('2024-12-28'),
      content: 'Had a really tough training session today. My legs felt heavy from yesterday\'s squats, but I pushed through. Mentally feeling a bit drained lately - work stress is definitely affecting my recovery. Need to focus more on sleep quality and maybe try some meditation before bed.'
    },
    {
      id: '2', 
      date: new Date('2024-12-26'),
      content: 'Great day overall! Woke up feeling refreshed after 8 hours of sleep. Training went smoothly - hit all my deadlift targets. Physically feeling strong, and mentally I\'m in a good place. The holiday break is really helping me reset. Planning to maintain this momentum into the new year.'
    },
    {
      id: '3',
      date: new Date('2024-12-24'),
      content: 'Christmas Eve training was lighter today. Feeling grateful for the progress I\'ve made this year. Physically recovered well from last week\'s intense sessions. Mentally excited for some family time, though a bit anxious about maintaining my routine during the holidays. Need to remember that rest is part of the process.'
    },
    {
      id: '4',
      date: new Date('2024-12-22'),
      content: 'Struggled with motivation today. Physically my shoulder is still a bit sore from Tuesday\'s workout. Mentally feeling overwhelmed with year-end deadlines at work. Did a lighter session focusing on mobility and stretching. Sometimes listening to your body means scaling back, and that\'s okay.'
    }
  ]);

  const handleAnalyzeJournal = async () => {
    if (!content.trim()) {
      setAnalysisError('Please enter your current thoughts before analyzing.');
      return;
    }

    setShowAnalysis(true);
    setIsAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult('');

    try {
      const analysis = await analyzeJournalEntries(content, journalEntries);
      setAnalysisResult(analysis);
    } catch (error) {
      setAnalysisError('Failed to analyze journal entries. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = () => {
    if (content.trim()) {
      // Here you would save the journal entry
      console.log('Saving journal entry:', { date, content });
      setContent('');
      // In a real app, you'd add this to your journal entries and update the display
    }
  };

  return (
    <Layout title="Journaling">
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="glass-dark p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📝</span>
            <h2 className="text-white font-semibold text-lg">Daily Reflection</h2>
          </div>
          
          <div className="space-y-4">
            {/* Date Picker */}
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">Date:</span>
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
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <label className="text-white font-medium block">
                How are you feeling today? (Physical, Mental, Training)
              </label>
              <Textarea
                placeholder="Reflect on your day... How did you feel physically? Mentally? How was your training or recovery? Any insights about your current practice?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] glass border-white/20 text-white placeholder-white/60 resize-none"
                rows={5}
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              disabled={!content.trim()}
            >
              Save Entry
            </Button>
          </div>
        </Card>

        {/* Historical Entries */}
        <Card className="glass-dark p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📚</span>
            <h2 className="text-white font-semibold text-lg">Journal History</h2>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {journalEntries.map((entry) => (
              <div key={entry.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-medium">
                    {format(entry.date, "dd/MM/yyyy")}
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Analyze Button */}
        <Button 
          onClick={handleAnalyzeJournal}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
        >
          🔍 Analyze My Journal Entries
        </Button>
      </div>

      <AIAnalysisDialog
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        title="Journal Analysis"
        analysis={analysisResult}
        isLoading={isAnalyzing}
        error={analysisError}
      />
    </Layout>
  );
};
export default SmartRecoveryCoach;