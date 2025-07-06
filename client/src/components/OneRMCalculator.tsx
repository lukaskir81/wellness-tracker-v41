import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface OneRMCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  liftType: 'bench' | 'lowerBody' | 'chins';
  lowerBodyExercise?: 'hexbar' | 'backsquat' | 'frontsquat';
}

const OneRMCalculator = ({ isOpen, onClose, liftType, lowerBodyExercise = 'hexbar' }: OneRMCalculatorProps) => {
  const [bodyWeight, setBodyWeight] = useState<number>(95);
  const [reps, setReps] = useState<number>(5);
  const [weight, setWeight] = useState<number>(100);

  // Epley formula: 1RM = weight × (1 + reps/30)
  const calculateOneRM = (weight: number, reps: number) => {
    return weight * (1 + reps / 30);
  };

  const calculateRelativeStrength = (oneRM: number, bodyWeight: number) => {
    return oneRM / bodyWeight;
  };

  const getRelativeStrengthRating = (relativeStrength: number, liftType: string, exercise?: string) => {
    // Handle lower body exercises with specific ratings
    if (liftType === 'lowerBody' && exercise) {
      switch (exercise) {
        case 'hexbar':
          if (relativeStrength >= 2.3) return { level: 'excellent', color: 'bg-green-500' };
          if (relativeStrength >= 1.9) return { level: 'good', color: 'bg-yellow-500' };
          return { level: 'average', color: 'bg-red-500' };
        case 'backsquat':
          if (relativeStrength >= 1.8) return { level: 'excellent', color: 'bg-green-500' };
          if (relativeStrength >= 1.35) return { level: 'good', color: 'bg-yellow-500' };
          return { level: 'average', color: 'bg-red-500' };
        case 'frontsquat':
          if (relativeStrength >= 1.45) return { level: 'excellent', color: 'bg-green-500' };
          if (relativeStrength >= 1.2) return { level: 'good', color: 'bg-yellow-500' };
          return { level: 'average', color: 'bg-red-500' };
      }
    }

    // Handle bench press
    if (liftType === 'bench') {
      if (relativeStrength >= 1.25) return { level: 'excellent', color: 'bg-green-500' };
      if (relativeStrength >= 1.1) return { level: 'good', color: 'bg-yellow-500' };
      return { level: 'average', color: 'bg-red-500' };
    }

    // Handle chins
    if (liftType === 'chins') {
      if (relativeStrength >= 1.45) return { level: 'excellent', color: 'bg-green-500' };
      if (relativeStrength >= 1.2) return { level: 'good', color: 'bg-yellow-500' };
      return { level: 'average', color: 'bg-red-500' };
    }

    return { level: 'average', color: 'bg-red-500' };
  };

  const oneRM = calculateOneRM(weight, reps);
  const relativeStrength = calculateRelativeStrength(oneRM, bodyWeight);
  const rating = getRelativeStrengthRating(relativeStrength, liftType, lowerBodyExercise);

  const getLiftTitle = () => {
    switch (liftType) {
      case 'bench': return 'Bench Press';
      case 'lowerBody': 
        switch (lowerBodyExercise) {
          case 'hexbar': return 'Hex Bar Deadlift (HSQ)';
          case 'backsquat': return 'Back Squat (BSQ)';
          case 'frontsquat': return 'Front Squat (FSQ)';
          default: return 'Lower Body Lift';
        }
      case 'chins': return 'Chins/Pull-ups';
      default: return 'Lift';
    }
  };

  const getReferenceRanges = () => {
    switch (liftType) {
      case 'bench':
        return { average: "< 1.1", good: "1.1 - 1.25", excellent: "> 1.25" };
      case 'lowerBody':
        switch (lowerBodyExercise) {
          case 'hexbar':
            return { average: "< 1.9", good: "1.9 - 2.3", excellent: "> 2.3" };
          case 'backsquat':
            return { average: "< 1.35", good: "1.35 - 1.8", excellent: "> 1.8" };
          case 'frontsquat':
            return { average: "< 1.2", good: "1.2 - 1.45", excellent: "> 1.45" };
          default:
            return { average: "< 1.9", good: "1.9 - 2.3", excellent: "> 2.3" };
        }
      case 'chins':
        return { average: "< 1.2", good: "1.2 - 1.45", excellent: "> 1.45" };
      default:
        return { average: "", good: "", excellent: "" };
    }
  };

  const ranges = getReferenceRanges();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">{getLiftTitle()} - Open Set Calculator</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Input Section */}
          <Card className="bg-gray-800/50 border-gray-600 p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-white text-sm">Body Weight (kg)</Label>
                <Input
                  type="number"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(Number(e.target.value))}
                  className="bg-gray-700/50 border-gray-600 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-white text-sm">Reps</Label>
                <Input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="bg-gray-700/50 border-gray-600 text-white mt-1"
                />
                {reps > 6 && (
                  <p className="text-yellow-400 text-xs mt-1">Formula loses accuracy for reps higher than 6</p>
                )}
              </div>
              <div>
                <Label className="text-white text-sm">
                  {liftType === 'chins' ? 'Weight lifted - bw + external (kg)' : 'Weight Lifted (kg)'}
                </Label>
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="bg-gray-700/50 border-gray-600 text-white mt-1"
                />
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-800/50 border-gray-600 p-4">
              <h3 className="text-white font-semibold mb-2">Estimated 1RM</h3>
              <div className="text-3xl font-bold text-green-500">{oneRM.toFixed(1)}</div>
              <div className="text-white/60 text-sm">kg</div>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-600 p-4">
              <h3 className="text-white font-semibold mb-2">Relative Strength</h3>
              <div className="text-3xl font-bold text-blue-500">{relativeStrength.toFixed(2)}</div>
              <div className="text-white/60 text-sm">1RM / Body Weight</div>
            </Card>
          </div>

          {/* Rating Section */}
          <Card className="bg-gray-800/50 border-gray-600 p-4">
            <h3 className="text-white font-semibold mb-3">Relative Strength Rating</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${rating.color}`}></div>
                <span className="text-white font-semibold capitalize">{rating.level}</span>
                <span className="text-white/60">{relativeStrength.toFixed(2)}</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-white/80">Average</span>
                  <span className="text-white/60">{ranges.average}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span className="text-white/80">Good</span>
                  <span className="text-white/60">{ranges.good}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-white/80">Excellent</span>
                  <span className="text-white/60">{ranges.excellent}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Formula Info */}
          <Card className="bg-gray-800/50 border-gray-600 p-4">
            <div className="text-white/60 text-sm">
              <p><strong>Epley Formula:</strong> 1RM = Weight × (1 + Reps/30)</p>
              <p><strong>Relative Strength:</strong> 1RM ÷ Body Weight</p>
              <p className="mt-2 text-xs">Enter your heaviest set with reps and weight to estimate your 1RM. Please note this is only estimation.</p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OneRMCalculator;