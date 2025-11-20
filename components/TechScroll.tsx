import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Waves, Layers, Activity } from 'lucide-react';

const features = [
  {
    title: "Energia Magnética",
    desc: "Um campo de força invisível de 800 Gauss que restaura o equilíbrio bioelétrico do seu corpo enquanto você dorme.",
    icon: <Zap size={40} />,
    img: "https://colchoesnippon.com.br/wp-content/uploads/2025/11/news-16.png"
  },
  {
    title: "Infravermelho Longo",
    desc: "Tecnologia que simula os raios solares benéficos da manhã, auxiliando na síntese de Vitamina D e desintoxicação celular.",
    icon: <Waves size={40} />,
    img: "https://colchoesnippon.com.br/wp-content/uploads/2025/11/depositphotos_26073829-stock-photo-free-happy-woman-enjoying-sunset-transformed.jpeg"
  },
  {
    title: "Massagem Bioquântica",
    desc: "Até 9.999 ciclos de vibromassagem inteligente. Relaxe a musculatura profunda e elimine o estresse acumulado.",
    icon: <Activity size={40} />,
    img: "https://colchoesnippon.com.br/wp-content/uploads/2025/11/efeitos-da-massagem-sobre-o-corpo-cursos-cpt.jpg"
  },
  {
    title: "Densidade Progressiva",
    desc: "Camadas de espuma de alta resiliência projetadas ortopedicamente para alinhar a coluna cervical e lombar.",
    icon: <Layers size={40} />,
    img: "https://colchoesnippon.com.br/wp-content/uploads/2025/11/postura-durante-o-sono.jpg"
  }
];

const TechScroll: React.FC = () => {
  return (
    <section id="experience" className="bg-zinc-950 py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 apple-gradient-text">
            Engenharia do Sono.
          </h2>
          <p className="text-xl text-gray-400">Por dentro da tecnologia.</p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureBlock key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureBlock: React.FC<{ feature: any, index: number }> = ({ feature, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20%", once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
    >
      <div className="flex-1 space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10 backdrop-blur-md">
          {feature.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {feature.title}
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed">
          {feature.desc}
        </p>
      </div>
      
      <div className="flex-1 w-full">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 group">
           <img 
             src={feature.img} 
             alt={feature.title} 
             className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default TechScroll;