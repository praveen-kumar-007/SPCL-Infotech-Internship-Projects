import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
}

const Select: React.FC<SelectProps> = ({ children, className = '', containerClassName = '', ...props }) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <select
        className={`
          block w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
          focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none 
          appearance-none cursor-pointer bg-white/50 backdrop-blur-sm text-gray-900
          transition-all duration-300 hover:border-gray-300 modern-input
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-500">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
};

export default Select;