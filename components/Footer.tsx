import React from 'react';
import { ChevronRight, MapPin, Phone, Building2, Store } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Main CTA Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Seu novo padrão <br /> de sono começa agora.
          </h2>
          <a 
            href="https://wa.me/554334720040" 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-200 transition-all flex items-center gap-2 group"
          >
            Falar com um especialista <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </a>
        </div>

        {/* Locations Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Factory Card */}
          <div className="group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 hover:border-amber-500/30 transition-all duration-500">
            <div className="h-48 overflow-hidden relative">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
               <img 
                 src="https://colchoesnippon.com.br/wp-content/uploads/2025/09/fabrica-de-colchoes-nippon-flex-brasil-magneticos-massageador-colchoes.jpg" 
                 alt="Nossa Fábrica" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
               />
               <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                 <Building2 size={14} className="text-amber-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-wider">Nossa Fábrica</span>
               </div>
            </div>
            <div className="p-8">
               <h3 className="text-xl font-bold text-white mb-4">São José dos Pinhais</h3>
               <div className="space-y-4">
                 <a href="https://maps.google.com/?q=Rua+Colorado,+50+–+São+Cristóvão,+São+José+dos+Pinhais" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group/link">
                    <MapPin className="mt-1 text-zinc-600 group-hover/link:text-amber-500 transition-colors" size={20} />
                    <span className="text-sm leading-relaxed">
                      Rua Colorado, 50 – São Cristóvão<br/>
                      São José dos Pinhais – PR, 83040-260, Brasil
                    </span>
                 </a>
                 <a href="tel:+5541991844305" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group/link">
                    <Phone className="text-zinc-600 group-hover/link:text-amber-500 transition-colors" size={20} />
                    <span className="text-sm font-medium">41 99184-4305</span>
                 </a>
               </div>
            </div>
          </div>

          {/* Store Card */}
          <div className="group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 hover:border-amber-500/30 transition-all duration-500">
            <div className="h-48 overflow-hidden relative">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
               <img 
                 src="https://colchoesnippon.com.br/wp-content/uploads/2025/03/loja-de-colchoes-magneticos-com-massagem-nippon-no-parana.jpg" 
                 alt="Nossa Loja" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
               />
               <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                 <Store size={14} className="text-amber-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-wider">Visite nossa Loja</span>
               </div>
            </div>
            <div className="p-8">
               <h3 className="text-xl font-bold text-white mb-4">Ivaiporã</h3>
               <div className="space-y-4">
                 <a href="https://maps.google.com/?q=Av+Paraná+1290+–+Centro,+Ivaiporã" target="_blank" rel="noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group/link">
                    <MapPin className="mt-1 text-zinc-600 group-hover/link:text-amber-500 transition-colors" size={20} />
                    <span className="text-sm leading-relaxed">
                      Av Paraná 1290 – Centro<br/>
                      Ivaiporã – Paraná, CEP: 86870-000
                    </span>
                 </a>
                 <a href="tel:+554334720040" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group/link">
                    <Phone className="text-zinc-600 group-hover/link:text-amber-500 transition-colors" size={20} />
                    <span className="text-sm font-medium">43 3472-0040</span>
                 </a>
               </div>
            </div>
          </div>

        </div>

        {/* Copyright Footer */}
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