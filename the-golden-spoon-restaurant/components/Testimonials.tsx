import React from 'react';
import Section from './Section';
import TestimonialCard, { type TestimonialProps } from './TestimonialCard';

const testimonialsData: TestimonialProps[] = [
  {
    quote: "The ambiance and the food were simply divine. An unforgettable experience from start to finish. The chef is a true artist!",
    author: "Priya Sharma",
    title: "Food Critic",
    imageUrl: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=1974&auto=format&fit=crop"
  },
  {
    quote: "A culinary masterpiece! Every dish was a delightful surprise. I highly recommend the Lamb Shank. Service was impeccable.",
    author: "Rohan Mehta",
    title: "Gourmet Enthusiast",
    imageUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "Perfect for a special occasion. The attention to detail in both the decor and the plating is second to none.",
    author: "Ananya Iyer",
    title: "Anniversary Dinner",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  },
    {
    quote: "I've traveled the world, and Amrutha stands out. A truly world-class dining experience in our city.",
    author: "Vikram Singh",
    title: "World Traveler",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
  },
];

const LotusIcon: React.FC = () => (
    <svg width="45" height="12" viewBox="0 0 45 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-saffron mx-auto">
        <path d="M14.535 1.125C17.535 3.375 22.5 11.25 22.5 11.25M22.5 11.25C22.5 11.25 27.465 3.375 30.465 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25C22.5 11.25 18.75 6 16.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25C22.5 11.25 26.25 6 28.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25L22.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M1 11.25H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);


const Testimonials: React.FC = () => {
  return (
    <Section id="testimonials" className="bg-hero-bg bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-brand-charcoal opacity-90"></div>
        <div className="container mx-auto text-center relative z-10">
            <p className="font-poppins text-xl mb-2 tracking-wide">Testimony</p>
            <LotusIcon />
            <h2 className="font-teko text-6xl md:text-7xl text-brand-saffron font-semibold my-4 uppercase tracking-wider">Our Patrons Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {testimonialsData.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </div>
        </div>
    </Section>
  );
};

export default Testimonials;