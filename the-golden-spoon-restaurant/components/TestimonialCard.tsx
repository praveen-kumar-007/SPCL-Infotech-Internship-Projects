import React from 'react';

export interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, title, imageUrl }) => {
  return (
    <div className="flex items-start gap-6 p-6 border border-brand-saffron/20 rounded-lg hover:bg-black/20 transition-colors duration-300">
      <img src={imageUrl} alt={author} className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-brand-saffron" />
      <div className="text-left">
        <p className="font-poppins italic text-brand-gray mb-4">"{quote}"</p>
        <p className="font-teko text-3xl text-brand-saffron tracking-wider">{author}</p>
        <p className="font-poppins text-sm text-brand-gray">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;