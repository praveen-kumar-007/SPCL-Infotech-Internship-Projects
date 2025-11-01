import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-brand-charcoal text-white font-poppins">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;