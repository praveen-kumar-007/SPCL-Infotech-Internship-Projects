import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import { Phone, Mail, Award, Star } from 'lucide-react';
import { PROPERTIES } from '../constants';

const Agents: React.FC = () => {
  // Extract unique agents from properties
  const agentsMap = new Map();
  PROPERTIES.forEach(p => {
    if (!agentsMap.has(p.agent.name)) {
        agentsMap.set(p.agent.name, p.agent);
    }
  });
  const agents = Array.from(agentsMap.values());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-cyan-50">
      <Navbar />
      
      <div className="vibrant-gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl font-extrabold text-white mb-4 slide-up neon-glow">Meet Our Real Estate Experts</h1>
            <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto fade-in">
                Our team of dedicated professionals is here to guide you through every step of your real estate journey.
            </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
                <div key={index} className="modern-card glass backdrop-blur-md bg-white/80 rounded-2xl shadow-xl overflow-hidden border border-white/20 slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="aspect-w-16 aspect-h-9 h-48 bg-gradient-to-br from-red-500 to-cyan-600 relative">
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
                          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        </div>
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                             <div className="relative">
                               <img 
                                  src={agent.image} 
                                  alt={agent.name} 
                                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-2xl"
                               />
                               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-cyan-600 opacity-0 hover:opacity-20 transition-opacity"></div>
                             </div>
                        </div>
                    </div>
                    <div className="pt-16 pb-6 px-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                        <p className="text-gradient font-semibold text-sm mb-4">Senior Real Estate Agent</p>
                        
                        <div className="flex justify-center items-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-gray-400 text-sm ml-2">(24 reviews)</span>
                        </div>

                        <div className="space-y-3">
                            <Button fullWidth variant="primary" size="sm" leftIcon={<Phone className="h-4 w-4" />}>
                                {agent.phone}
                            </Button>
                            <Button fullWidth variant="outline" size="sm" leftIcon={<Mail className="h-4 w-4" />}>
                                Contact Agent
                            </Button>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-cyan-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-red-600" />
                            <span className="font-semibold">Top Seller 2024</span>
                        </div>
                        <span className="font-medium">5 Active</span>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Agents;