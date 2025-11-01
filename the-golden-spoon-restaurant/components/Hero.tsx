import React from 'react';
import Button from './Button';
import Section from './Section';

const LotusIcon: React.FC = () => (
    <svg width="45" height="12" viewBox="0 0 45 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-saffron">
        <path d="M14.535 1.125C17.535 3.375 22.5 11.25 22.5 11.25M22.5 11.25C22.5 11.25 27.465 3.375 30.465 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25C22.5 11.25 18.75 6 16.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25C22.5 11.25 26.25 6 28.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25L22.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M1 11.25H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);


const Hero: React.FC = () => {
  return (
    <Section id="home" className="min-h-screen flex items-center bg-hero-bg bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-brand-charcoal opacity-70"></div>
      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="text-center lg:text-left lg:w-1/2">
          <div className="mb-4">
              <p className="font-poppins text-xl mb-2 tracking-wide">An Epicurean Journey Through Modern India</p>
              <LotusIcon />
          </div>
          <h1 className="font-teko text-7xl md:text-9xl font-semibold text-brand-saffron leading-tight mb-6 text-shadow uppercase">
            A Symphony of Spices
          </h1>
          <p className="text-brand-gray mb-8 max-w-lg mx-auto lg:mx-0">
            Experience the fusion of age-old traditions and avant-garde culinary techniques. A celebration of India's richest flavors, reimagined for the modern connoisseur.
          </p>
          <Button size="lg" href="#menu">Explore Menu</Button>
        </div>
        <div className="lg:w-1/2 flex justify-center p-4">
          <img 
            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop" 
            alt="Signature Dish" 
            className="rounded-lg shadow-2xl border-8 border-brand-saffron/20"
          />
        </div>
      </div>
    </Section>
  );
};

export default Hero;