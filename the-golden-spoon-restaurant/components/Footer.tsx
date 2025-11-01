import React from 'react';

const LotusIcon: React.FC = () => (
    <svg width="45" height="12" viewBox="0 0 45 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-saffron mx-auto">
        <path d="M14.535 1.125C17.535 3.375 22.5 11.25 22.5 11.25M22.5 11.25C22.5 11.25 27.465 3.375 30.465 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25C22.5 11.25 18.75 6 16.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25C22.5 11.25 26.25 6 28.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22.5 11.25L22.5 1.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M1 11.25H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a href="#" className="text-white hover:text-brand-saffron transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-brand-gray font-poppins">
        <div>
          <h4 className="font-teko text-3xl text-white mb-4 uppercase tracking-wider">Contact Us</h4>
          <p>9 W 53rd St, New York, NY 10019, USA</p>
          <p>+1 212-344-1230</p>
          <p>+1 212-555-1230</p>
        </div>
        
        <div className="flex flex-col items-center">
            <h3 className="font-teko text-5xl text-brand-saffron mb-4 tracking-widest">AMRUTHA</h3>
            <p className="italic mb-4 max-w-xs">"Where every meal is a sacred ritual, and every flavor tells a story.”</p>
            <LotusIcon />
            <div className="flex gap-4 mt-4">
                <SocialIcon>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </SocialIcon>
                <SocialIcon>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </SocialIcon>
                 <SocialIcon>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.161 2.065c-1.056.048-1.749.215-2.23.402a3.02 3.02 0 00-1.096.736 3.02 3.02 0 00-.736 1.096c-.187.48-.354 1.173-.402 2.23-.048 1.02-.06 1.344-.06 3.47s.012 2.45.06 3.47c.048 1.056.215 1.749.402 2.23a3.02 3.02 0 00.736 1.096 3.02 3.02 0 001.096.736c.48.187 1.173.354 2.23.402 1.02.048 1.344.06 3.47.06s2.45-.012 3.47-.06c1.056-.048 1.749-.215 2.23-.402a3.02 3.02 0 001.096-.736 3.02 3.02 0 00.736-1.096c.187-.48.354-1.173.402-2.23.048-1.02.06-1.344.06-3.47s-.012-2.45-.06-3.47c-.048-1.056-.215-1.749-.402-2.23a3.02 3.02 0 00-.736-1.096 3.02 3.02 0 00-1.096-.736c-.48-.187-1.173.354-2.23-.402C14.773 4.077 14.45 4.065 12.315 4.065zm-4.116 8.243a4.12 4.12 0 118.24 0 4.12 4.12 0 01-8.24 0zm2.06 0a2.06 2.06 0 104.12 0 2.06 2.06 0 00-4.12 0zm4.49-5.105a.96.96 0 100-1.92.96.96 0 000 1.92z" clipRule="evenodd" /></svg>
                </SocialIcon>
            </div>
        </div>

        <div>
          <h4 className="font-teko text-3xl text-white mb-4 uppercase tracking-wider">Working Hours</h4>
          <p>Monday-Friday:</p>
          <p>08:00 am - 12:00 am</p>
          <p className="mt-2">Saturday-Sunday:</p>
          <p>07:00 am - 11:00 pm</p>
        </div>
      </div>
      <div className="text-center text-brand-gray mt-16 font-poppins">
        <p>&copy; 2025 Amrutha. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;