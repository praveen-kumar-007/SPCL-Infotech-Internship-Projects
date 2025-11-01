import React, { useState } from 'react';
import Button from './Button';

const NAV_LINKS = ['Home', 'About', 'Menu', 'Testimonials'];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderNavLinks = (isMobile: boolean = false) => (
    <ul className={`flex ${isMobile ? 'flex-col items-center gap-y-6' : 'flex-row items-center gap-x-8'}`}>
      {NAV_LINKS.map((link) => (
        <li key={link}>
          <a 
            href={`#${link.toLowerCase()}`} 
            onClick={() => setIsMenuOpen(false)}
            className="font-poppins text-brand-gray hover:text-brand-saffron transition-colors duration-300 tracking-wider"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="bg-brand-charcoal/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6 md:px-12 border-b border-brand-saffron/20">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-4xl md:text-5xl font-teko font-semibold text-brand-saffron tracking-widest">
          AMRUTHA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-8">
          {renderNavLinks()}
          <div className="w-px h-8 bg-brand-gray/30"></div>
          <Button>Book Table</Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none z-50 relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-brand-charcoal transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center gap-y-8">
              {renderNavLinks(true)}
              <Button className="mt-6">Book Table</Button>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;