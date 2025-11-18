import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import Testimonials from './components/Testimonials';
import TechScroll from './components/TechScroll';
import ComparisonTable from './components/ComparisonTable';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import PremiumPage from './components/PremiumPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'premium'>('home');

  // Reset scroll when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const navigateTo = (view: 'home' | 'premium') => {
    setCurrentView(view);
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500/30 selection:text-white">
      <Navbar currentView={currentView} onNavigate={navigateTo} />
      
      {currentView === 'home' ? (
        <main>
          <Hero />
          <ProductShowcase onNavigate={navigateTo} />
          <Testimonials />
          <TechScroll />
          <ComparisonTable />
          <Quiz />
        </main>
      ) : (
        <PremiumPage />
      )}
      
      <Footer />
    </div>
  );
};

export default App;