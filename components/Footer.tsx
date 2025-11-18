import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Seu novo padrão <br /> de sono começa agora.
          </h2>
          <a 
            href="https://wa.me/554334720040" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 text-blue-400 text-xl hover:underline flex items-center gap-2"
          >
            Falar com um especialista <ChevronRight size={20} />
          </a>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Nippon High Performance Mattresses.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Garantia</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;