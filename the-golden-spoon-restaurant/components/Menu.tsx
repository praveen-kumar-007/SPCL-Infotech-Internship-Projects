import React from 'react';
import Section from './Section';
import MenuItem, { type MenuItemProps } from './MenuItem';

const appetizers: MenuItemProps[] = [
  { name: 'Punjabi Samosa Chaat', price: '₹650', description: 'Crispy samosa topped with yogurt, tamarind chutney, and chickpea masala.' },
  { name: 'Classic Paneer Tikka', price: '₹900', description: 'Cottage cheese marinated in yogurt and spices, grilled in a tandoor.' },
  { name: 'Hara Bhara Kebab', price: '₹750', description: 'Spinach and green pea patties, shallow-fried to perfection.' },
  { name: 'Chicken Malai Tikka', price: '₹1100', description: 'Creamy chicken kebabs marinated with cheese, cream, and mild spices.' },
];

const mainCourses: MenuItemProps[] = [
  { name: 'Dal Makhani', price: '₹1200', description: 'Slow-cooked black lentils and kidney beans in a rich, buttery gravy.' },
  { name: 'Shahi Paneer', price: '₹1450', description: 'Royal cottage cheese curry cooked in a creamy tomato and cashew gravy.' },
  { name: 'Classic Butter Chicken', price: '₹1600', description: 'Tender tandoori chicken simmered in a silky tomato and butter gravy.' },
  { name: 'Hyderabadi Mutton Biryani', price: '₹1850', description: 'Aromatic basmati rice and tender mutton, slow-cooked with traditional spices.' },
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

const Menu: React.FC = () => {
  return (
    <Section id="menu">
      <div className="container mx-auto text-center">
        <p className="font-poppins text-xl mb-2 tracking-wide">A Palette for the Senses</p>
        <LotusIcon />
        <h2 className="font-teko text-6xl md:text-7xl text-brand-saffron font-semibold my-4 uppercase tracking-wider">Today’s Special</h2>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 mt-12">
          {/* Appetizers */}
          <div className="flex-1 w-full">
            <h3 className="font-teko text-5xl text-white mb-8">Starters</h3>
            <div className="space-y-6">
              {appetizers.map((item, index) => (
                <MenuItem key={index} {...item} />
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full lg:w-auto flex justify-center items-center px-4">
              <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop" alt="Special Dish" className="max-h-[600px] rounded-lg shadow-xl border-4 border-brand-saffron/30"/>
          </div>

          {/* Main Courses */}
          <div className="flex-1 w-full">
            <h3 className="font-teko text-5xl text-white mb-8">Main Courses</h3>
            <div className="space-y-6">
              {mainCourses.map((item, index) => (
                <MenuItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Menu;