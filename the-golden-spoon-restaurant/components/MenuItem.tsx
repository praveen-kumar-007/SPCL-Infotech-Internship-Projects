import React from 'react';

export interface MenuItemProps {
  name: string;
  price: string;
  description: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description }) => {
  return (
    <div className="group transition-transform duration-500 ease-in-out" style={{ perspective: '1000px' }}>
      <div className="w-full text-left p-4 rounded-lg bg-brand-charcoal hover:bg-black/30 border border-transparent group-hover:border-brand-saffron/30 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-brand-saffron/10 group-hover:-rotate-x-[8deg]"
           style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex justify-between items-center mb-2">
          <p className="font-teko text-3xl text-brand-saffron font-semibold tracking-wider">{name}</p>
          <div className="flex-grow border-b border-dashed border-brand-gray/30 mx-4"></div>
          <p className="font-poppins text-xl text-white">{price}</p>
        </div>
        <p className="font-poppins text-sm text-brand-gray">{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;