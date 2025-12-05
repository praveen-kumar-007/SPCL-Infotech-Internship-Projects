import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AIAssistant from '../components/AIAssistant';
import { PROPERTIES } from '../constants';
import { ArrowLeft, Bed, Bath, Square, MapPin, Phone, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = PROPERTIES.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-cyan-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-red-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to listings
        </Link>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96 md:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <div className="h-full">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            {property.gallery.slice(1).map((img, idx) => (
              <div key={idx} className="h-full overflow-hidden relative">
                 <img src={img} alt={`${property.title} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
              </div>
            ))}
            <div className="h-full bg-gray-900 flex items-center justify-center text-white relative cursor-pointer overflow-hidden group">
                 <img src={property.gallery[0]} alt="View More" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform" />
                 <span className="relative z-10 font-bold text-lg border-2 border-white/30 px-4 py-2 rounded-lg backdrop-blur-sm">+ View Photos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <h1 className="text-3xl font-extrabold text-gray-900">{property.title}</h1>
                             <Badge variant={property.listingType === 'Buy' ? 'blue' : 'green'}>{property.listingType}</Badge>
                        </div>
                        <div className="flex items-center text-gray-500 text-lg">
                            <MapPin className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                            {property.address}
                        </div>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-cyan-600 bg-clip-text text-transparent">₹{property.price.toLocaleString('en-IN')}</p>
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">Est. Monthly: ₹{(property.price * 0.005).toLocaleString('en-IN')}</p>
                    </div>
                </div>

                <div className="flex space-x-8 mt-8 py-8 border-y border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl mr-4">
                            <Bed className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Bedrooms</p>
                            <p className="text-xl font-semibold text-gray-900">{property.beds}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl mr-4">
                            <Bath className="h-6 w-6 text-cyan-600" />
                        </div>
                         <div>
                            <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Bathrooms</p>
                            <p className="text-xl font-semibold text-gray-900">{property.baths}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                         <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl mr-4">
                            <Square className="h-6 w-6 text-yellow-600" />
                        </div>
                         <div>
                            <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Area</p>
                            <p className="text-xl font-semibold text-gray-900">{property.sqft.toLocaleString()} <span className="text-sm font-normal text-gray-400">sqft</span></p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Property Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-3 shadow-sm shadow-red-300"></div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Agent Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-bold text-gray-900">Listing Agent</h3>
                     <Badge variant="outline">Verified</Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                    <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-red-100 shadow-sm" />
                    <div>
                        <p className="font-bold text-gray-900 text-lg leading-tight">{property.agent.name}</p>
                        <p className="text-red-600 text-sm font-medium">Premier Agent</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <Button fullWidth size="lg" leftIcon={<Phone className="h-4 w-4" />}>
                        {property.agent.phone}
                    </Button>
                    <Button fullWidth variant="secondary" size="lg" leftIcon={<MessageSquare className="h-4 w-4" />}>
                        Send Message
                    </Button>
                </div>
            </div>

            {/* AI Assistant */}
            <AIAssistant property={property} />

          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;