import React from 'react';
import Section from './Section';

const LotusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="45" height="12" viewBox="0 0 45 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-brand-saffron ${className}`}>
    <path d="M14.535 1.125C17.535 3.375 22.5 11.25 22.5 11.25M22.5 11.25C22.5 11.25 27.465 3.375 30.465 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22.5 11.25C22.5 11.25 18.75 6 16.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22.5 11.25C22.5 11.25 26.25 6 28.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22.5 11.25L22.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M1 11.25H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const About: React.FC = () => {
  return (
    <Section id="about" className="bg-about-bg bg-cover bg-center">
      <div className="absolute inset-0 bg-brand-charcoal opacity-90"></div>
      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex-1 text-center md:text-right">
          <h2 className="font-teko text-6xl md:text-7xl text-brand-saffron font-semibold uppercase tracking-wider">About Us</h2>
          <LotusIcon className="mx-auto md:ml-auto md:mr-0 my-4 rotate-180" />
          <p className="text-brand-gray leading-relaxed font-poppins">
            Amrutha was born from a desire to bridge the gap between India's rich culinary past and a progressive future. We honor ancestral recipes while embracing innovative techniques to create an unforgettable dining experience.
          </p>
        </div>

        <div className="w-24 h-24 md:w-48 md:h-48 flex-shrink-0">
          <img src="https://thumbs.dreamstime.com/z/very-healthy-famous-traditional-thai-appetizer-perfect-combination-taste-beauty-its-dish-miang-kham-bua-207191088.jpg?ct=jpeg" alt="Lotus logo" className="w-full h-full object-cover rounded-full filter invert opacity-80" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="font-teko text-6xl md:text-7xl text-brand-saffron font-semibold uppercase tracking-wider">Our History</h2>
          <LotusIcon className="mx-auto md:mr-auto md:ml-0 my-4" />
          <p className="text-brand-gray leading-relaxed font-poppins">
            From the spice markets of Old Delhi to the modern kitchens of the world, our journey is one of passion. A legacy of flavor, meticulously crafted and served with a story on every plate.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default About;