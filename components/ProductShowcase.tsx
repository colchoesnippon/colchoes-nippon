import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react';
import { MattressLine } from '../types';

interface ProductShowcaseProps {
  onNavigate: (view: 'home' | 'premium' | 'plus') => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400; // Approximate card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const lines = [
    {
      id: MattressLine.PREMIUM,
      name: "Linha Premium",
      tagline: "A excelência absoluta.",
      height: "40 cm",
      price: "R$ 11.990",
      features: [
        "Máximo luxo, tecnologia e exclusividade",
        "Suporta até 440kg por casal",
        "Todas as terapias exclusivas da Nippon",
        "Vibromassagem Premium com Alexa e App",
        "Experiência premium completa"
      ],
      highlight: true,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-PREMIUM-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg",
      color: "from-amber-700/20 to-amber-900/5",
      borderColor: "border-amber-500/30"
    },
    {
      id: MattressLine.PLUS,
      name: "Linha Plus",
      tagline: "O equilíbrio perfeito.",
      height: "32 cm",
      price: "R$ 6.990",
      features: [
        "Mais tecnologia e terapias integradas",
        "Suporta até 320kg por casal",
        "Ímãs + Infravermelho + EVI Diamond + X-Ions",
        "Vibromassagem Premium com Bluetooth",
        "Equilíbrio entre conforto e tecnologia"
      ],
      highlight: false,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-plus-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg",
      color: "from-zinc-700/20 to-zinc-900/5",
      borderColor: "border-white/10"
    },
    {
      id: MattressLine.AMERICAN,
      name: "Linha American",
      tagline: "Melhor custo-benefício.",
      height: "28 cm",
      price: "R$ 3.990",
      features: [
        "Melhor custo-benefício",
        "Suporta até 240kg por casal",
        "Ímãs + Infravermelho Longo",
        "Vibromassagem com 6 motores",
        "Conforto avançado e economia"
      ],
      highlight: false,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-american-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg",
      color: "from-stone-700/20 to-stone-900/5",
      borderColor: "border-white/10"
    }
  ];

  return (
    <section id="models" className="py-24 bg-black text-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Escolha sua <span className="text-gray-500">Performance.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Três níveis de engenharia avançada. Uma única missão: o sono perfeito.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all duration-300 hidden md:block -ml-4"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scroll Area */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar px-4 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {lines.map((line, index) => (
              <motion.div
                key={line.id}
                onClick={() => {
                  if (line.id === MattressLine.PREMIUM) {
                    onNavigate('premium');
                  } else if (line.id === MattressLine.PLUS) {
                    onNavigate('plus');
                  } else {
                    const quizSection = document.getElementById('quiz');
                    if (quizSection) {
                      quizSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`
                  relative flex-shrink-0 w-[85vw] md:w-[380px] snap-center
                  rounded-3xl overflow-hidden border ${line.borderColor}
                  bg-zinc-900/30 backdrop-blur-sm transition-transform duration-500 cursor-pointer hover:scale-[1.02]
                  ${line.highlight ? 'hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 'hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'}
                `}
              >
                 {/* Background Gradient */}
                 <div className={`absolute inset-0 bg-gradient-to-br ${line.color} opacity-30`} />

                 <div className="relative p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        {line.highlight && (
                          <span className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-500/30 px-2 py-0.5 rounded-full bg-amber-900/20">
                            <Star size={10} fill="currentColor" /> Best Seller
                          </span>
                        )}
                        <h3 className="text-2xl font-bold text-white leading-tight">{line.name}</h3>
                        <p className="text-gray-400 text-sm font-medium mt-1">{line.tagline}</p>
                      </div>
                      <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/5">
                        {line.height}
                      </div>
                    </div>

                    <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative bg-black/40">
                      <img 
                        src={line.img} 
                        alt={line.name} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 opacity-90 hover:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300">
                         <span className="flex items-center gap-2 text-white text-sm font-medium border border-white/30 px-4 py-2 rounded-full bg-black/50">
                            <MousePointerClick size={16} /> Ver Detalhes
                         </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mt-auto mb-6">
                      {line.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-300 text-sm leading-tight">
                          <div className="min-w-[6px] h-[6px] rounded-full bg-gray-600 mt-1.5 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider leading-tight">A partir de</span>
                          <span className="text-lg font-extrabold text-white tracking-tight">{line.price}</span>
                       </div>
                       {line.highlight ? (
                         <button className="text-amber-400 text-sm font-bold hover:text-amber-300 transition-colors flex items-center gap-1">
                           Ver Detalhes <ChevronRight size={14} />
                         </button>
                       ) : (
                        <span className="text-zinc-400 text-sm font-bold flex items-center gap-1">
                          Ver Detalhes <ChevronRight size={14} />
                        </span>
                       )}
                    </div>
                 </div>
              </motion.div>
            ))}
            
            {/* Spacer for better scrolling on right edge */}
            <div className="w-4 flex-shrink-0" />
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all duration-300 hidden md:block -mr-4"
          >
            <ChevronRight size={24} />
          </button>

        </div>
        
        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center mt-6 text-gray-600 text-xs animate-pulse">
          Deslize para ver mais modelos &rarr;
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;