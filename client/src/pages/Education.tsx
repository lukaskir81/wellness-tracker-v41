import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
const Education = () => {
  const educationalLinks = [{
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
  return (
    <Layout title="Education">
      <div className="space-y-4">
        <Card className="glass p-4 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => window.open('https://www.gpc-performance.com/apexinfo', '_blank')}>
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

        <Card className="glass p-4 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => window.open('https://www.gpc-performance.com/gpcchat', '_blank')}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="https://static.wixstatic.com/media/58fc31_00095fef7fc04600b9031712060a631f~mv2.png/v1/fill/w_128,h_144,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GPC%20Logo%20-%20PNG%20Large_edited.png" alt="GPC Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-gray-800 font-bold text-sm">GPC</h2>
              <p className="text-gray-800 text-xs">PERFORMANCE</p>
            </div>
            <div className="ml-auto">
              <span className="text-xl">↗️</span>
            </div>
          </div>
          <h3 className="font-semibold text-base text-[#818898]">GPC Online Coaching Package</h3>
        </Card>

        <Card className="glass p-4">
          <h3 className="text-gray-800 font-bold text-lg mb-4">Educational Resources</h3>
          
          <div className="space-y-3">
            {educationalLinks.map((link, index) => <Card key={index} className="bg-white/20 backdrop-blur border-white/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold text-base mb-1">{link.title}</h4>
                    <p className="text-gray-600 text-xs">{link.description}</p>
                  </div>
                  <Button onClick={() => window.open(link.url, '_blank')} className="ml-3 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                </div>
              </Card>)}
          </div>
          
          <p className="leading-relaxed text-center mt-3 mb-1 text-[#c6cbd4] text-sm">
            Access our comprehensive library of training articles, performance insights, and coaching resources to enhance your athletic development.
          </p>
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
export default Education;