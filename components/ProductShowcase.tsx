import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, MousePointerClick } from 'lucide-react';
import { MattressLine } from '../types';

interface ProductShowcaseProps {
  onNavigate: (view: 'home' | 'premium') => void;
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
      features: [
        "Super Pillow Top Único",
        "EVI Diamond & X-Ions",
        "Comando de Voz & App",
        "4 Motores Big Premium",
        "Suporta 440kg (Casal)"
      ],
      highlight: true,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2025/09/colchao-nipponflex-king-qual-preco-magnetico-massageador-evolurion-fir-casal-casal-fabrica.jpg",
      color: "from-amber-700/20 to-amber-900/5",
      borderColor: "border-amber-500/30"
    },
    {
      id: MattressLine.DIAMOND,
      name: "Linha Diamond",
      tagline: "Robustez e luxo.",
      height: "40 cm",
      features: [
        "Pillow Top Duplo",
        "Infravermelho & Magnético",
        "Display LCD & Bluetooth",
        "4 Motores Big Premium",
        "Suporta 440kg (Casal)"
      ],
      highlight: false,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2025/09/diamond-colchao-nipponflex-king-qual-preco-magnetico-massageador-evolurion-fir-casal-casal-fabrica.jpg",
      color: "from-slate-700/20 to-slate-900/5",
      borderColor: "border-white/10"
    },
    {
      id: MattressLine.PLUS,
      name: "Linha Plus",
      tagline: "O equilíbrio perfeito.",
      height: "32 cm",
      features: [
        "Pillow Top Único",
        "Terapia Magnética",
        "Display LCD",
        "4 Motores Big",
        "Suporta 320kg (Casal)"
      ],
      highlight: false,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2025/09/plus-colchao-nipponflex-king-qual-preco-magnetico-massageador-evolurion-fir-casal-casal-fabrica.jpg",
      color: "from-zinc-700/20 to-zinc-900/5",
      borderColor: "border-white/10"
    },
    {
      id: MattressLine.AMERICAN,
      name: "Linha American",
      tagline: "Desempenho premium.",
      height: "28 cm",
      features: [
        "Vibroterapia Essencial",
        "Energia Quântica",
        "Cromoterapia",
        "Excelente custo-benefício",
        "Suporta 280kg (Casal)"
      ],
      highlight: false,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2025/09/american-colchao-nipponflex-king-qual-preco-magnetico-massageador-evolurion-fir-casal-casal-fabrica.jpg",
      color: "from-stone-700/20 to-stone-900/5",
      borderColor: "border-white/10"
    },
    {
      id: MattressLine.SMART,
      name: "Linha Smart",
      tagline: "Tecnologia essencial.",
      height: "25 cm",
      features: [
        "Massagem Inteligente",
        "Densidade Progressiva",
        "Magnetismo Terapêutico",
        "Controle Simplificado",
        "Suporta 240kg (Casal)"
      ],
      highlight: false,
      img: "https://colchoesnippon.com.br/wp-content/uploads/2025/11/linha-smart-colchao-nipponflex-king-qual-preco-magnetico-massageador-evolurion-fir-casal-casal-fabrica.jpg",
      color: "from-gray-700/20 to-gray-900/5",
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
            Cinco níveis de engenharia avançada. Uma única missão: o sono perfeito.
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
                onClick={() => line.id === MattressLine.PREMIUM ? onNavigate('premium') : null}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`
                  relative flex-shrink-0 w-[85vw] md:w-[380px] snap-center
                  rounded-3xl overflow-hidden border ${line.borderColor}
                  bg-zinc-900/30 backdrop-blur-sm transition-transform duration-500
                  ${line.highlight ? 'cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]' : ''}
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
                      {line.highlight && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300">
                           <span className="flex items-center gap-2 text-white text-sm font-medium border border-white/30 px-4 py-2 rounded-full bg-black/50">
                              <MousePointerClick size={16} /> Ver Detalhes
                           </span>
                        </div>
                      )}
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
                       <div className="flex gap-2 text-gray-500 items-center">
                          <ShieldCheck size={16} />
                          <span className="text-xs">10 Anos</span>
                       </div>
                       {line.highlight ? (
                         <button className="text-amber-400 text-sm font-bold hover:text-amber-300 transition-colors flex items-center gap-1">
                           Ver Premium <ChevronRight size={14} />
                         </button>
                       ) : (
                        <span className="text-gray-600 text-sm">
                          Saiba mais
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