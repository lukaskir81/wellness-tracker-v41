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
  }];
  return <Layout title="Education">
      <div className="space-y-6">
        <Card className="glass p-6 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => window.open('https://www.gpc-performance.com/apexinfo', '_blank')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">📊</span>
            </div>
            <div>
              <h2 className="text-gray-800 font-bold text-lg">GPC</h2>
              <p className="text-gray-800 text-sm">PERFORMANCE</p>
            </div>
            <div className="ml-auto">
              <span className="text-2xl">↗️</span>
            </div>
          </div>
          <h3 className="text-gray-800 font-semibold text-lg">APEX Performance Program Info</h3>
        </Card>

        <Card className="glass p-6 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => window.open('https://www.gpc-performance.com/online-coaching', '_blank')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">📊</span>
            </div>
            <div>
              <h2 className="text-gray-800 font-bold text-lg">GPC</h2>
              <p className="text-gray-800 text-sm">PERFORMANCE</p>
            </div>
            <div className="ml-auto">
              <span className="text-2xl">↗️</span>
            </div>
          </div>
          <h3 className="text-gray-800 font-semibold text-lg">GPC Online Coaching Package</h3>
        </Card>

        <Card className="glass p-6">
          <h3 className="text-gray-800 font-bold text-xl mb-6">Educational Resources</h3>
          
          <div className="space-y-4">
            {educationalLinks.map((link, index) => <Card key={index} className="bg-white/20 backdrop-blur border-white/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold text-lg mb-2">{link.title}</h4>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </div>
                  <Button onClick={() => window.open(link.url, '_blank')} className="ml-4 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open
                  </Button>
                </div>
              </Card>)}
          </div>
          
          <p className="text-gray-600 leading-relaxed mt-6">
            Access our comprehensive library of training articles, performance insights, and coaching resources to enhance your athletic development.
          </p>
        </Card>

        {/* Advertisement Space */}
        <Card className="glass-dark p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Advertisement Space</h3>
          <p className="text-white/60 text-sm">Ad will be displayed here once configured.</p>
        </Card>
      </div>
    </Layout>;
};
export default Education;