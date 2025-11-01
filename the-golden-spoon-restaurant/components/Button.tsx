import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'md' | 'lg';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, size = 'md', href }) => {
  const sizeClasses = size === 'lg' ? 'px-8 py-3 text-2xl' : 'px-6 py-2 text-xl';
  
  const commonClasses = `
    bg-brand-saffron text-brand-charcoal font-teko font-semibold uppercase tracking-wider
    border-2 border-brand-saffron
    hover:bg-transparent hover:text-brand-saffron
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-brand-saffron focus:ring-opacity-50
    ${sizeClasses}
    ${className || ''}
  `;

  if (href) {
    return (
      <a href={href} className={commonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {children}
    </button>
  );
};

export default Button;