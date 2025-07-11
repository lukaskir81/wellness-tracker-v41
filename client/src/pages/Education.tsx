import React from 'react';
// Removed imports for Layout, Card, Button, and ExternalLink as they could not be resolved.
// Replaced them with standard HTML elements and Tailwind CSS for styling.

const Education = () => {
  const educationalLinks = [{
    title: "Non Sleep Deep Rest Protocol Audio",
    description: "Use this guided audio to enter a state of deep relaxation and accelerate recovery.",
    url: "https://drive.google.com/file/d/1mqe8GWGJ_UyvbYOvfSLpdyCy3J72gKxj/view?usp=sharing"
  },{
    title: "Competency Document",
    description: "Comprehensive guide to performance competencies and training principles",
    url: "https://drive.google.com/file/d/10OBv77L1htHEbhr7hLKfuCYG743uBn13/view?usp=sharing"
  }, {
    title: "Vitamin D Guide",
    description: "Essential information about vitamin D supplementation and benefits",
    url: "https://drive.google.com/file/d/1Man4a9h1bGtx0l1Q7huun5DFy1RMp6hQ/view?usp=sharing"
  }, {
    title: "Supplement Guide",
    description: "Complete guide to sports nutrition and supplementation strategies",
    url: "https://drive.google.com/file/d/1ZDPs3x6Zf0WMqNatAPrV1v5UTRyelfkZ/view?usp=sharing"
  }, {
    title: "Naps Guide",
    description: "Essential guide to power napping for recovery and performance",
    url: "https://www.gpc-performance.com/naps"
  }, {
    title: "Breathing Drills - Premium ",
    description: "Comprehensive breathing techniques for recovery and relaxation",
    url: "https://www.gpc-performance.com/breathing-drills"
  }];

  // Helper components to replace the missing UI library components
  // This makes the component self-contained and avoids the build error.
  const Card = ({ className, children, onClick }) => (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );

  const Button = ({ className, children, onClick, size }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );

  const ExternalLink = ({ className }) => (
    // Replaced the icon component with an emoji for simplicity and to remove dependency.
    <span className={className}>↗️</span>
  );


  return (
    // Replaced Layout component with a standard div to remove the dependency.
    <div title="Education" className="p-4 bg-[#0d1117] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Education</h1>
      <div className="space-y-4">
        <Card className="glass p-4 cursor-pointer hover:bg-white/10 transition-colors rounded-lg" onClick={() => window.open('https://www.gpc-performance.com/apexinfo', '_blank')}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="https://static.wixstatic.com/media/58fc31_00095fef7fc04600b9031712060a631f~mv2.png/v1/fill/w_128,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GPC%20Logo%20-%20PNG%20Large_edited.png" alt="GPC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#f5f9fc]">GPC</h2>
              <p className="text-xs text-[#c6cbd4]">PERFORMANCE</p>
            </div>
            <div className="ml-auto">
              <span className="text-xl">↗️</span>
            </div>
          </div>
          <h3 className="font-semibold text-base text-[#b0b5c0]">APEX Performance Program Info</h3>
        </Card>

        <Card className="glass p-4 cursor-pointer hover:bg-white/10 transition-colors rounded-lg" onClick={() => window.open('https://www.gpc-performance.com/gpcchat', '_blank')}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="https://static.wixstatic.com/media/58fc31_00095fef7fc04600b9031712060a631f~mv2.png/v1/fill/w_128,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GPC%20Logo%20-%20PNG%20Large_edited.png" alt="GPC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#f5f9fc]">GPC</h2>
              <p className="text-xs text-[#dee3e8]">PERFORMANCE</p>
            </div>
            <div className="ml-auto">
              <span className="text-xl">↗️</span>
            </div>
          </div>
          <h3 className="font-semibold text-base text-[#818898]">GPC Online Coaching Package</h3>
        </Card>

        <Card className="glass p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-4 text-[#f5f9fc]">Resources/ Education</h3>

          <div className="space-y-3">
            {/* The dedicated audio player has been removed. The audio is now a link in the list below. */}
            {educationalLinks.map((link, index) => (
              <Card key={index} className="bg-white/20 backdrop-blur border-white/30 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold text-base mb-1">{link.title}</h4>
                    <p className="text-gray-600 text-xs">{link.description}</p>
                  </div>
                  <Button onClick={() => window.open(link.url, '_blank')} className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1" size="sm">
                    <ExternalLink className="w-3 h-3" />
                    Open
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <p className="leading-relaxed text-center mt-3 mb-1 text-[#c6cbd4] text-sm">Access our comprehensive library of training resources, performance insights, and coaching materials to enhance your athletic performance..</p>
        </Card>

        <Card className="glass-dark p-6 text-center rounded-lg">
          <h3 className="text-white font-semibold mb-2">Advertisement Space</h3>
          <p className="text-white/60 text-sm">Ad will be displayed here once configured.</p>
        </Card>
      </div>
    </div>
  );
};

export default Education;
