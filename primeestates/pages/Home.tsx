import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES } from '../constants';
import { ListingType, PropertyType } from '../types';

const Home: React.FC = () => {
  const location = useLocation();
  const propertiesRef = useRef<HTMLDivElement>(null);
  
  const [filters, setFilters] = useState({
    query: '',
    listingType: 'All' as ListingType | 'All',
    propertyType: 'All' as PropertyType | 'All'
  });

  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sync filters with URL path
  useEffect(() => {
    if (location.pathname === '/buy') {
      setFilters(prev => ({ ...prev, listingType: ListingType.Buy }));
    } else if (location.pathname === '/rent') {
      setFilters(prev => ({ ...prev, listingType: ListingType.Rent }));
    } else {
      setFilters(prev => ({ ...prev, listingType: 'All' }));
    }
  }, [location.pathname]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesQuery = p.title.toLowerCase().includes(filters.query.toLowerCase()) || 
                           p.address.toLowerCase().includes(filters.query.toLowerCase());
      const matchesType = filters.propertyType === 'All' || p.type === filters.propertyType;
      const matchesListing = filters.listingType === 'All' || p.listingType === filters.listingType;
      
      return matchesQuery && matchesType && matchesListing;
    });
  }, [filters]);

  const getHeroTitle = () => {
    if (location.pathname === '/buy') return "Find Your Forever Home";
    if (location.pathname === '/rent') return "Rent Your Perfect Space";
    return "Find Your Dream Place";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-cyan-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative vibrant-gradient-bg h-96 sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
          <div className="slide-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl neon-glow">
              {getHeroTitle()}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl font-light mb-8 drop-shadow-lg">
              Discover the most exclusive properties in the best neighborhoods.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={scrollToProperties}
                className="px-8 py-4 bg-white text-red-600 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-xl hover-glow">
                Explore Now
              </button>
              <button 
                onClick={scrollToProperties}
                className="px-8 py-4 glass text-white rounded-full font-bold hover:scale-105 transition-transform duration-300 border border-white/30">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Filters Section */}
      <div className="relative z-20 -mt-20">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Listings Section */}
      <main ref={propertiesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="flex justify-between items-end mb-10 fade-in">
            <div>
                 <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                    {filters.listingType === 'All' ? 'Featured Properties' : `Properties for ${filters.listingType}`}
                 </h2>
                 <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-cyan-600 rounded-full"></div>
                 <p className="text-gray-500 mt-4 text-lg">{filteredProperties.length} properties found</p>
            </div>
        </div>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div key={property.id} className="slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300 slide-up">
                <div className="text-gray-300 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <p className="text-gray-500 text-xl mb-2">No properties match your search criteria.</p>
                <p className="text-gray-400 mb-6">Try adjusting your filters</p>
                <button 
                    onClick={() => setFilters({query: '', listingType: 'All', propertyType: 'All'})}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-cyan-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover-glow"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-red-900 via-purple-900 to-cyan-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">PrimeEstates</h3>
            <p className="text-white/80 mb-4">Find Your Dream Property</p>
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} PrimeEstates. All rights reserved. Built with ❤️ by Praveen Kumar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;