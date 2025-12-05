import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ leftIcon, rightIcon, className = '', containerClassName = '', ...props }) => {
  return (
    <div className={`relative ${containerClassName}`}>
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {leftIcon}
        </div>
      )}
      <input
        className={`
          block w-full modern-input
          ${leftIcon ? 'pl-10' : 'pl-4'} 
          ${rightIcon ? 'pr-10' : 'pr-4'} 
          py-3 border-2 border-gray-200 rounded-xl 
          focus:ring-4 focus:ring-red-100 focus:border-red-500 outline-none 
          transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400
          hover:border-gray-300
          ${className}
        `}
        {...props}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default Input;