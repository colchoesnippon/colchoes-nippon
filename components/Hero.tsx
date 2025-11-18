import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black pt-36 md:pt-48 pb-20">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-amber-500 font-medium tracking-wider text-xs uppercase mb-4 block">Nova Geração</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 apple-gradient-text max-w-5xl mx-auto leading-[1.1]">
            A Evolução do Sono <br /> Começa Agora.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-10"
        >
          Colchões magnéticos com terapias avançadas, massagem inteligente e engenharia premium para transformar suas noites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <a 
            href="https://wa.me/554334720040" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-black font-medium px-8 py-4 rounded-full hover:bg-[#20bd5a] transition-all flex items-center gap-2 text-lg"
          >
            Receber Preços Exclusivos <ChevronRight size={18} />
          </a>
          <button 
             onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
             className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            Conhecer as linhas <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Mockup visual representing the mattress */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="mt-16 md:mt-24 w-full max-w-5xl relative"
        >
           <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/20 border border-white/10 bg-neutral-900">
               {/* 
                  ATENÇÃO: Se você quiser usar sua imagem específica, substitua a URL abaixo pelo caminho da sua imagem.
                  Exemplo: src="/assets/minha-foto-colchao.jpg"
               */}
               <img 
                src="https://images.unsplash.com/photo-1617325247661-675ab4b64ae4?q=80&w=2071&auto=format&fit=crop" 
                alt="Tecnologia do Colchão - Design Premium" 
                className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[2s]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               
               <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-left">
                   <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium text-white mb-2">
                       Tecnologia 2025
                   </div>
                   <h3 className="text-2xl md:text-3xl font-semibold text-white">Design Premium</h3>
               </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;