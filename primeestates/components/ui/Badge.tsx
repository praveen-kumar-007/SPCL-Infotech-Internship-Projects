import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'gray' | 'outline';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', className = '' }) => {
  const variants = {
    blue: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover-glow',
    green: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg hover-glow',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200',
    outline: 'glass border border-white/30 text-gray-700 backdrop-blur-sm',
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;