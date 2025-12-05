import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from './ui/Badge';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="group block modern-card bg-white rounded-lg sm:rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100">
      <div className="relative h-40 sm:h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20">
          <Badge variant={property.listingType === 'Buy' ? 'blue' : 'green'}>
             For {property.listingType}
          </Badge>
        </div>
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-end text-white drop-shadow-md z-10">
           <div className="glass backdrop-blur-md bg-gradient-to-r from-red-500/90 to-cyan-500/90 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-white/30 hover-glow">
             <h3 className="text-lg sm:text-2xl font-bold truncate">₹{(property.price / 10000000).toFixed(1)}Cr</h3>
           </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/50 via-red-500/20 to-transparent"></div>
      </div>
      
      <div className="p-3 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:vibrant-text-gradient transition-all line-clamp-1">{property.title}</h3>
        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0 text-red-500" />
          <span className="truncate">{property.address}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 sm:py-4 border-t border-gray-100 gap-1">
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700 group/item hover:text-red-600 transition-colors min-w-0">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-50 to-red-100 rounded-lg group-hover/item:from-red-100 group-hover/item:to-red-200 transition-colors flex-shrink-0">
              <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold">{property.beds}</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700 group/item hover:text-cyan-600 transition-colors min-w-0">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg group-hover/item:from-cyan-100 group-hover/item:to-cyan-200 transition-colors flex-shrink-0">
              <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold">{property.baths}</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-700 group/item hover:text-yellow-600 transition-colors min-w-0">
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg group-hover/item:from-yellow-100 group-hover/item:to-yellow-200 transition-colors flex-shrink-0">
              <Square className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
            </div>
            <span className="text-xs sm:text-sm font-semibold truncate">{(property.sqft / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;