import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Menu, ChevronLeft } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'premium';
  onNavigate: (view: 'home' | 'premium') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentView === 'premium' && (
            <button 
              onClick={() => onNavigate('home')}
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <ChevronLeft size={16} /> Voltar
            </button>
          )}
          <div 
            className="text-xl font-semibold tracking-tight text-white cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            Nippon {currentView === 'premium' && <span className="text-amber-500 text-sm font-normal ml-2">Premium</span>}
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-xs font-medium text-gray-300">
          <button onClick={() => scrollToSection('models')} className="hover:text-white transition-colors">Modelos</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-white transition-colors">Tecnologia</button>
          <button onClick={() => scrollToSection('comparison')} className="hover:text-white transition-colors">Comparativo</button>
        </div>

        <div className="flex items-center gap-4">
           <button 
            onClick={() => scrollToSection('quiz')}
            className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-200 transition-all"
           >
            Diagnóstico
           </button>
           <Menu className="w-5 h-5 text-gray-300 md:hidden" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;