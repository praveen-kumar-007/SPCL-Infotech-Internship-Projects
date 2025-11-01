import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className }) => {
  return (
    <section 
      id={id} 
      className={`relative py-20 md:py-28 px-6 ${className || ''}`}
    >
      {children}
    </section>
  );
};

export default Section;