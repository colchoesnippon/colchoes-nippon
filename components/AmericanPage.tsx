import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, Check, ChevronRight, Rotate3d, ArrowDown, Layers, ChevronDown, Info, Activity
} from 'lucide-react';

const AmericanPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', size: 'Casal 138x188' });
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<number | null>(null);
  
  // Gallery State
  const [activeTab, setActiveTab] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.1, 0.9]);
  
  const imgFilter = useTransform(brightness, b => `brightness(${b}) grayscale(100%)`);

  // Scroll detection for Floating CTA
  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('american-offer-form');
      if (!formElement) return;
      
      const threshold = 100; 
      const formRect = formElement.getBoundingClientRect();
      
      const isPastThreshold = window.scrollY > threshold;
      const isFormVisible = formRect.top < (window.innerHeight * 0.8); 

      if (isPastThreshold && !isFormVisible) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('american-offer-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, tenho interesse na *Linha American 28cm*.\n\n*Medida Desejada:* ${formData.size}\n*Nome:* ${formData.name}\n*WhatsApp:* ${formData.whatsapp}\n\nGostaria de receber a tabela de valores e condições.`;
    window.open(`https://wa.me/554334720040?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleSpec = (index: number) => {
    setExpandedSpec(expandedSpec === index ? null : index);
  };

  const features = [
    { icon: <Activity className="text-amber-500" />, title: "6 Motores Tradicionais", desc: "Sistema integrado excelente de massagem para relaxamento profundo." },
    { icon: <Layers className="text-blue-500" />, title: "Densidade Progressiva", desc: "Distribuição inteligente de peso para postura e alinhamento ortopédico." },
    { icon: <Zap className="text-purple-500" />, title: "Energia Quântica", desc: "Pulsos eletromagnéticos que ajudam a restabelecer o equilíbrio biológico." },
    { icon: <ShieldCheck className="text-green-500" />, title: "Terapias Integradas", desc: "Magnetismo tradicional e Infravermelho Longo de alto padrão." },
  ];

  const specs = [
    { title: "Pillow Top Anatômico", detail: "Camada de conforto sob medida, garantindo uma acomodação agradável que reduz os pontos de pressão corporal sem comprometer o suporte ortopédico." },
    { title: "Pastilhas de Magnético", detail: "Magnetos permanentes de 800 Gauss estrategicamente distribuídos para melhora na microcirculação periférica com relaxamento garantido." },
    { title: "Pastilhas de Infravermelho Longo", detail: "Pastilhas de biocerâmica que absorvem e convertem o calor em ondas terapêuticas que simulam a radiação solar benéfica matinal." },
    { title: "Densidade Progressiva Ortopédica", detail: "Combinação estudada de espumas de alta qualidade que apoia homogeneamente a coluna vertebral em qualquer posição de sono." },
    { title: "Tecido Jacquard Exclusivo", detail: "Padrão de alta durabilidade, macio ao toque, hipoalergênico e projetado para excelente troca térmica e ventilação." },
    { title: "Design Slim Elegante 28cm", detail: "Uma altura clássica e versátil, ideal para camas tradicionais ou baús, oferecendo imponência de cabeira na medida certa." },
    { title: "Suporta 240kg (Casal)", detail: "Desenvolvido de forma robusta e qualificada para suportar de forma exemplar até 120kg de cada lado com estabilidade e durabilidade impecáveis." },
    { title: "10 Anos de Garantia Estrutural", detail: "Excelente respaldo técnico cobrindo qualquer tipo de deformação na estrutura de espumas e pastilhas pelo período de uma década." },
    { title: "Vibromassagem com 6 Motores", detail: "Excelente massageador integrado de alta durabilidade com motores tradicionais robustos que promovem bem-estar de forma contínua." },
    { title: "Controle Tradicional Intuitivo", detail: "Controle com fio prático e super resistente para ajustar com precisão e facilidade as frequências e zonas das massagens corporais." }
  ];

  const galleryItems = [
    { 
        id: 'overview',
        title: "Perfil American", 
        desc: "Design clássico e compacto estruturado para o perfeito descanso.",
        img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-american-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg" 
    },
    { 
        id: 'side',
        title: "Linha Slim 28cm", 
        desc: "Equilíbrio em espessura clássica com excelente ergonomia.",
        img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-american-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg" 
    },
    { 
        id: 'texture',
        title: "Malha Nobre Jacquard", 
        desc: "Visual clássico com textura suave e alta resistência contra desgaste.",
        img: "https://colchoesnippon.com.br/wp-content/uploads/2025/05/colchao-magnetico-fitilho-nippon-massageador-linha-premium-quantico-nipponflex.jpg" 
    }
  ];

  return (
    <div className="pt-36 md:pt-48 bg-black min-h-screen overflow-x-hidden relative">
      
      {/* Hero American */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-500 font-semibold text-sm tracking-wider mb-6">
              LINHA AMERICAN
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
              28cm
            </h1>
            <p className="text-2xl md:text-4xl font-light text-gray-300 tracking-tight mb-10">
              O maior custo-benefício em tecnologia ortopédica e bem-estar do mercado.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative w-full max-w-4xl mx-auto aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 group"
          >
            <img 
              src="https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-american-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg" 
              alt="Colchão American 28cm" 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Explore os Detalhes</span>
                <ChevronRight className="rotate-90 text-gray-500" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="py-20 bg-zinc-950 relative z-20">
        <div className="container mx-auto px-6">
           <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rotate3d className="text-amber-500" size={24} />
                <span className="text-amber-500 font-medium tracking-wider text-xs uppercase">Galeria Imersiva</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Design e Eficiência</h2>
           </div>

           <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
              {/* Controls */}
              <div className="flex lg:flex-col gap-4 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex flex-col items-start p-4 rounded-xl border transition-all min-w-[160px] lg:w-64 text-left ${
                      activeTab === index 
                      ? 'bg-white/10 border-amber-500/50 shadow-lg shadow-amber-900/20' 
                      : 'bg-transparent border-white/5 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-bold ${activeTab === index ? 'text-white' : 'text-gray-400'}`}>
                        {item.title}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 leading-tight hidden md:block">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* 3D Viewport */}
              <div 
                className="perspective-1000 w-full max-w-3xl aspect-[4/3] md:aspect-[16/9] relative"
                style={{ perspective: '1000px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                ref={galleryRef}
              >
                 <motion.div
                   style={{ 
                     rotateX, 
                     rotateY, 
                     transformStyle: "preserve-3d",
                   }}
                   className="w-full h-full rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl relative overflow-hidden"
                 >
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full relative"
                        >
                           
                            <motion.img 
                                style={{ filter: imgFilter }}
                                src={galleryItems[activeTab].img} 
                                alt={galleryItems[activeTab].title}
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Floating UI Elements */}
                            <motion.div 
                                style={{ translateZ: 40 }}
                                className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 pointer-events-none"
                            >
                                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Linha American</p>
                                <p className="text-white text-lg font-semibold">{galleryItems[activeTab].title}</p>
                            </motion.div>

                            <motion.div 
                                style={{ translateZ: 20 }}
                                className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none mix-blend-overlay"
                            />
                              
                        </motion.div>
                    </AnimatePresence>

                    {/* Shine Effect */}
                    <motion.div 
                        style={{ 
                        x: useTransform(x, [-0.5, 0.5], ["-100%", "100%"]),
                        opacity: useTransform(y, [-0.5, 0.5], [0, 0.3])
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                    />
                    
                 </motion.div>
                 
                 <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1">
                    <Rotate3d size={12}/> Mova o cursor para interagir
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Bento Grid Tech */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Eficiência Comprovada. <br/><span className="text-amber-500 font-normal">Investimento Inteligente.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Equipado com tecnologias essenciais para transformar a qualidade de suas noites com o melhor preço.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm hover:bg-zinc-800/50 transition-colors"
              >
                <div className="mb-4 p-3 bg-white/5 rounded-2xl w-fit">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
            
            {/* App features alternative */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-amber-900/10 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Activity size={120} className="text-amber-500" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">6 Motores Tradicionais de Massagem</h3>
               <p className="text-gray-400 mb-6 relative z-10 max-w-xs">
                 Excelente sistema de vibromassagem acionado por controle intuitivo e direto, sem complicação ou necessidade de pareamento.
               </p>
               <ul className="space-y-2 relative z-10">
                 <li className="flex items-center text-sm text-amber-200"><Check size={14} className="mr-2 text-amber-500"/> 6 pontos de massagem direcionada</li>
                 <li className="flex items-center text-sm text-amber-200"><Check size={14} className="mr-2 text-amber-500"/> Controle por controle físico tradicional e intuitivo</li>
                 <li className="flex items-center text-sm text-amber-200"><Check size={14} className="mr-2 text-amber-500"/> Ajustes diretos de alta durabilidade e confiança</li>
               </ul>
            </div>

             {/* Durability */}
             <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-emerald-900/20 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute -bottom-4 -right-4 opacity-10">
                 <ShieldCheck size={140} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Durabilidade e Suporte de Peso</h3>
               <p className="text-gray-400 mb-6 relative z-10">
                 Alinhamento anatômico estrutural preciso e longa vida útil de 10 anos.
               </p>
               <div className="flex items-center gap-8 relative z-10 mt-8">
                 <div>
                    <span className="block text-4xl font-bold text-white">240kg</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Suporte Casal</span>
                 </div>
                 <div className="w-px h-12 bg-white/10"></div>
                 <div>
                    <span className="block text-4xl font-bold text-white">10 Anos</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Garantia estrutural</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs & Form */}
      <section className="py-24 bg-black border-t border-white/5" id="american-offer-form">
         <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-8">
                 <Layers className="text-amber-500" />
                 <h3 className="text-3xl font-bold text-white">Especificações Ampleas</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {specs.map((spec, i) => (
                    <div 
                      key={i} 
                      onClick={() => toggleSpec(i)}
                      className={`flex flex-col p-4 border-b hover:bg-white/5 transition-colors rounded-lg cursor-pointer ${expandedSpec === i ? 'bg-white/5 border-amber-500/30' : 'border-zinc-900'}`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-center">
                          <div className="mr-3 flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${expandedSpec === i ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] scale-125' : 'bg-zinc-600'}`}></div>
                          </div>
                          <span className={`font-medium transition-colors ${expandedSpec === i ? 'text-white' : 'text-gray-300'}`}>
                            {spec.title}
                          </span>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`text-gray-500 transition-transform duration-300 ${expandedSpec === i ? 'rotate-180 text-amber-500' : ''}`} 
                        />
                      </div>
                      
                      <AnimatePresence>
                        {expandedSpec === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 pl-5 text-sm text-gray-400 leading-relaxed border-l border-white/10 ml-1 mt-1">
                              <div className="flex items-start gap-2">
                                <Info size={14} className="mt-0.5 text-amber-500/70 flex-shrink-0" />
                                {spec.detail}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
               </div>
               
               <div className="mt-12 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
                 <p className="text-gray-500 text-sm italic">
                   * Esta linha foca nas terapias tradicionais de magnetismo e infravermelho longo de alto nível, não incluindo as pastilhas EVI Diamond, X-Ions, nem comandos opcionais Bluetooth ou assistentes virtuais de voz.
                 </p>
               </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 md:max-w-md">
               <div className="sticky top-24 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl shadow-amber-900/10">
                   {/* Investimento */}
                   <div className="mb-6 pb-6 border-b border-zinc-800/80 space-y-3">
                     <div className="flex items-baseline justify-between font-sans">
                       <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Investimento Inteligente</span>
                       <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Custo-Benefício</span>
                     </div>
                     <div className="bg-black/40 border border-zinc-800/50 p-4 rounded-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                       <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">Modelos American a partir de</p>
                       <div className="flex items-baseline gap-1 mt-1">
                         <span className="text-zinc-500 font-semibold text-sm">R$</span>
                         <span className="text-3xl font-extrabold text-white tracking-tight">3.990</span>
                         <span className="text-xs text-zinc-500 ml-1.5 font-medium">consulte parcelamento</span>
                       </div>
                       <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed border-t border-zinc-800/80 pt-2.5 flex items-start gap-2">
                         <Info size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                         <span>Economia máxima mantendo as tecnologias cientificamente comprovadas de magnetismo e infravermelho.</span>
                       </p>
                     </div>
                   </div>

                   <div className="mb-6 pb-6 border-b border-white/5">
                     <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Cotação & Consulta Linha American</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                       Economize sem abrir mão dos benefícios fundamentais para sua coluna e relaxamento muscular com a confiança Nippon.
                     </p>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                       <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Selecione o Tamanho</label>
                       <select
                         name="size"
                         value={formData.size}
                         onChange={handleInputChange}
                         className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer appearance-none"
                       >
                         <option value="Casal 138x188">Casal 138x188 (Padrão)</option>
                         <option value="Queen 158x198">Queen 158x198</option>
                         <option value="King 193x203">King 193x203</option>
                         <option value="Solteiro 88x188">Solteiro 88x188</option>
                         <option value="Sob Medida">Sob Medida</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Nome Completo</label>
                       <input 
                         type="text" 
                         name="name"
                         required
                         value={formData.name}
                         onChange={handleInputChange}
                         className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition-all placeholder-zinc-700"
                         placeholder="Digite seu nome"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">WhatsApp</label>
                       <input 
                         type="tel" 
                         name="whatsapp"
                         required
                         value={formData.whatsapp}
                         onChange={handleInputChange}
                         className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-amber-500 transition-all placeholder-zinc-700"
                         placeholder="(DDD) 99999-9999"
                       />
                     </div>
                     
                     <button 
                       type="submit"
                       className="group relative w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-4 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-500 transform hover:-translate-y-1"
                     >
                       <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                       
                       <span className="relative flex items-center justify-center gap-2">
                          Solicitar Cotação Personalizada <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                       </span>
                     </button>
                   </form>
                   
                   <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
                     <ShieldCheck size={14} /> Seus dados estão 100% seguros.
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* Floating Sticky CTA */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-4 right-4 z-[100] flex justify-center pointer-events-none"
          >
             <div className="bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 p-2 pr-3 pl-6 rounded-full shadow-2xl shadow-amber-900/50 flex items-center justify-between gap-3 md:gap-6 pointer-events-auto max-w-md w-full ring-1 ring-white/10">
               <div className="flex flex-col">
                  <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider leading-tight">Escolha Inteligente</span>
                  <span className="text-white font-bold text-sm">Linha American 28cm</span>
               </div>
               <button 
                  onClick={scrollToForm}
                  className="relative overflow-hidden bg-[#F59E0B] text-black font-bold py-2.5 px-5 rounded-full text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all transform hover:scale-105 active:scale-95 flex-shrink-0"
               >
                  <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
                  <span className="relative flex items-center gap-2">Solicitar Cotação <ArrowDown size={16} /></span>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AmericanPage;
