import React from 'react';
import { Heart, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass backdrop-blur-lg bg-gradient-to-r from-white/80 to-white/60 border-b border-white/20 shadow-lg hover-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative h-14 w-14 flex items-center justify-center">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-400 p-0.5 group-hover:rotate-360 transition-transform duration-700" style={{
                  maskImage: 'radial-gradient(circle, transparent 65%, black 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, transparent 65%, black 100%)',
                }}>
                  <div className="absolute inset-0 rounded-full bg-white/5"></div>
                </div>

                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-400 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 group-hover:animate-pulse" style={{
                  filter: 'blur(12px)',
                }}></div>
                
                {/* Glass container with curved border */}
                <div className="absolute inset-1 glass bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-full border-2 border-transparent bg-clip-padding group-hover:border-white/60 transition-all duration-300" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderImage: 'linear-gradient(135deg, rgba(255,107,107,0.4), rgba(78,205,196,0.4)) 1',
                }}></div>

                {/* Inner glow ring */}
                <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-cyan-300/40 transition-colors duration-300 shadow-inner" style={{
                  boxShadow: 'inset 0 0 20px rgba(78,205,196,0.1), 0 0 15px rgba(255,107,107,0.2)',
                }}></div>
                
                {/* Logo image with curved effect */}
                <img 
                  src={logo} 
                  alt="PrimeEstates Logo" 
                  className="h-10 w-10 object-contain relative z-10 group-hover:scale-125 group-hover:drop-shadow-2xl transition-all duration-500 rounded-full"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(255, 107, 107, 0.5)) drop-shadow(0 0 8px rgba(78, 205, 196, 0.3))',
                    clipPath: 'circle(45%)',
                  }}
                />

                {/* Animated accent dots */}
                <div className="absolute inset-0 rounded-full group-hover:animate-spin transition-transform" style={{animationDuration: '20s'}}>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-1/2 right-0 transform translate-y-1 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-extrabold text-lg bg-gradient-to-r from-red-600 via-cyan-600 to-yellow-500 bg-clip-text text-transparent group-hover:from-red-500 group-hover:via-cyan-500 group-hover:to-yellow-400 transition-all duration-500">PrimeEstates</span>
                <span className="text-xs text-gray-500 group-hover:text-cyan-600 transition-colors duration-300 font-semibold tracking-wider">Luxury Properties</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/buy" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                isActive('/buy') 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover-glow' 
                  : 'text-gray-600 hover:bg-red-50'
              }`}
            >
              Buy
            </Link>
            <Link 
              to="/rent" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                isActive('/rent') 
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg hover-glow' 
                  : 'text-gray-600 hover:bg-cyan-50'
              }`}
            >
              Rent
            </Link>
             <Link 
              to="/sell" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                isActive('/sell') 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg hover-glow' 
                  : 'text-gray-600 hover:bg-yellow-50'
              }`}
            >
              Sell
            </Link>
            <Link 
              to="/agents" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                isActive('/agents') 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover-glow' 
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              Agents
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-110 hover-glow">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-all duration-300 hover:scale-110 hover-glow">
              <User className="h-6 w-6" />
            </button>
             <button className="md:hidden p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 hover-glow">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;