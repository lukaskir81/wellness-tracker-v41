import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const FitnessTests = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showLogForm, setShowLogForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [testValue, setTestValue] = useState("");
  const [timeMinutes, setTimeMinutes] = useState("");
  const [timeSeconds, setTimeSeconds] = useState("");

  const categories = ["Power", "Fitness", "Speed"];

  const testOptions = {
    "Power": [
      { name: "SLJ (Standing Long Jump)", unit: "cm", example: "245cm" },
      { name: "CMJ (Counter Movement Jump)", unit: "cm", example: "42cm" },
      { name: "RSI (Hop Test)", unit: "m/s", example: "2.32" }
    ],
    "Fitness": [
      { name: "1.2K Time Trial", unit: "time", example: "4:43" },
      { name: "1.4K Time Trial", unit: "time", example: "5:21" }
    ],
    "Speed": [
      { name: "0-10m Dash", unit: "seconds", example: "1.43" },
      { name: "0-20m Dash", unit: "seconds", example: "2.85" },
      { name: "0-30m Dash", unit: "seconds", example: "4.12" },
      { name: "Flying 10m", unit: "seconds", example: "0.89" }
    ]
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowLogForm(false);
    setSelectedTest("");
    setTestValue("");
    setTimeMinutes("");
    setTimeSeconds("");
  };

  const handleLogClick = () => {
    setShowLogForm(true);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      date,
      category: selectedCategory,
      test: selectedTest,
      value: selectedTest && testOptions[selectedCategory as keyof typeof testOptions]
        .find(t => t.name === selectedTest)?.unit === "time" 
        ? `${timeMinutes}:${timeSeconds}` 
        : testValue
    });
    
    // Reset form
    setShowLogForm(false);
    setSelectedTest("");
    setTestValue("");
    setTimeMinutes("");
    setTimeSeconds("");
  };

  return (
    <Layout title="Fitness Tests">
      <div className="space-y-6">
        <Card className="glass p-6">
          <h2 className="font-bold text-xl mb-6 text-[#989eab]">Log Fitness Tests</h2>
          
          {/* Date Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white",
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

            {/* Category Selection */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white hover:bg-gray-700"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Log Button */}
            {selectedCategory && testOptions[selectedCategory as keyof typeof testOptions].length > 0 && (
              <Button
                onClick={handleLogClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Log {selectedCategory} Test
              </Button>
            )}
          </div>

          {/* Log Form */}
          {showLogForm && selectedCategory && (
            <Card className="mt-6 p-4 bg-gray-50">
              <h3 className="text-gray-800 font-semibold mb-4">Log {selectedCategory} Test</h3>
              
              <div className="space-y-4">
                {/* Test Selection */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Test Type</label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      {testOptions[selectedCategory as keyof typeof testOptions].map((test) => (
                        <SelectItem key={test.name} value={test.name}>
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Value Input */}
                {selectedTest && (
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Result 
                      {testOptions[selectedCategory as keyof typeof testOptions]
                        .find(t => t.name === selectedTest) && (
                        <span className="text-gray-500 ml-1">
                          (e.g., {testOptions[selectedCategory as keyof typeof testOptions]
                            .find(t => t.name === selectedTest)?.example})
                        </span>
                      )}
                    </label>
                    
                    {testOptions[selectedCategory as keyof typeof testOptions]
                      .find(t => t.name === selectedTest)?.unit === "time" ? (
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={timeMinutes}
                          onChange={(e) => setTimeMinutes(e.target.value)}
                          className="flex-1"
                        />
                        <span className="text-gray-600">:</span>
                        <Input
                          type="number"
                          placeholder="Sec"
                          value={timeSeconds}
                          onChange={(e) => setTimeSeconds(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ) : (
                      <Input
                        type="number"
                        step={testOptions[selectedCategory as keyof typeof testOptions]
                          .find(t => t.name === selectedTest)?.unit === "seconds" ? "0.01" : "0.01"}
                        placeholder={`Enter value in ${testOptions[selectedCategory as keyof typeof testOptions]
                          .find(t => t.name === selectedTest)?.unit}`}
                        value={testValue}
                        onChange={(e) => setTestValue(e.target.value)}
                      />
                    )}
                  </div>
                )}

                {/* Submit Button */}
                {selectedTest && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      Save Test Result
                    </Button>
                    <Button
                      onClick={() => setShowLogForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          {selectedCategory && testOptions[selectedCategory as keyof typeof testOptions].length === 0 && (
            <div className="mt-6 text-center text-gray-500 bg-slate-50 p-4 rounded">
              No tests available for {selectedCategory} category yet.
            </div>
          )}

          {!selectedCategory && (
            <div className="mt-6 text-center text-gray-500 bg-slate-50 p-4 rounded">
              Select a category to view available tests.
            </div>
          )}
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

export default FitnessTests;
