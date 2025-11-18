import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Zap, Smartphone, Music, 
  ShieldCheck, Mic, BatteryCharging, 
  Check, ChevronRight, Rotate3d, ArrowDown, Layers
} from 'lucide-react';

const PremiumPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', whatsapp: '' });
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  
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
  
  // FIX: Hook must be called at top level, not inside conditional render
  const imgFilter = useTransform(brightness, b => `brightness(${b}) grayscale(100%)`);

  // Scroll detection for Floating CTA
  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('premium-offer-form');
      if (!formElement) return;
      
      const heroHeight = window.innerHeight * 0.5; 
      const formRect = formElement.getBoundingClientRect();
      
      // Show if scrolled past hero AND form is not yet fully visible in viewport
      const isPastHero = window.scrollY > heroHeight;
      const isFormVisible = formRect.top < window.innerHeight - 100; // 100px buffer

      if (isPastHero && !isFormVisible) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('premium-offer-form')?.scrollIntoView({ behavior: 'smooth' });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, tenho interesse na *Linha Premium 40cm*.\nNome: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nGostaria de receber a tabela de valores e condições.`;
    window.open(`https://wa.me/554334720040?text=${encodeURIComponent(text)}`, '_blank');
  };

  const features = [
    { icon: <Zap className="text-amber-400" />, title: "Energia Quântica", desc: "Restabelecimento do equilíbrio energético." },
    { icon: <Music className="text-blue-400" />, title: "AudioVibe Bluetooth", desc: "Imersão sonora via condução no colchão." },
    { icon: <Mic className="text-purple-400" />, title: "Comando de Voz", desc: "Compatível com Alexa (Opcional)." },
    { icon: <BatteryCharging className="text-green-400" />, title: "Indução", desc: "Carregadores de celular integrados." },
  ];

  const specs = [
    "Super Pillow Top Único", "Pastilhas de Magnético", "Pastilhas de Infravermelho Longo", 
    "Pastilhas EVI Diamond", "Pastilhas X-Ions", "Densidade Progressiva Inteligente", 
    "Tecido Malha 400 Fios", "Linho Bouclê Premium", "Suporta 440kg (Casal)",
    "10 Anos de Garantia", "Ozonioterapia", "Cromoterapia",
    "4 Motores Big Premium", "Display LCD Completo"
  ];

  const galleryItems = [
    { 
        id: 'overview',
        title: "Visão Global", 
        desc: "Design imponente que redefine o quarto.",
        img: "https://picsum.photos/1200/800?grayscale&random=10" 
    },
    { 
        id: 'side',
        title: "Perfil 40cm", 
        desc: "Altura robusta com Super Pillow Top Único.",
        img: "https://picsum.photos/1200/800?grayscale&random=11" 
    },
    { 
        id: 'texture',
        title: "Linho Bouclê", 
        desc: "Acabamento de toque suave e visual sofisticado.",
        img: "https://picsum.photos/1200/800?grayscale&random=12" 
    },
    { 
        id: 'interface',
        title: "Interface Smart", 
        desc: "Tecnologia embarcada com display LCD e App.",
        img: "https://picsum.photos/1200/800?grayscale&random=13" 
    }
  ];

  return (
    <div className="pt-36 md:pt-48 bg-black min-h-screen overflow-x-hidden relative">
      
      {/* Hero Premium */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-500 font-semibold text-sm tracking-wider mb-6">
              LINHA PREMIUM
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
              40cm
            </h1>
            <p className="text-2xl md:text-4xl font-light text-gray-300 tracking-tight mb-10">
              O ápice absoluto da engenharia do sono.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative w-full max-w-4xl mx-auto aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 group"
          >
            <img 
              src="https://picsum.photos/1200/800?grayscale&random=99" 
              alt="Colchão Premium 40cm" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Explore os Detalhes</span>
                <ChevronRight className="rotate-90 text-gray-500" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Interactive Gallery */}
      <section className="py-20 bg-zinc-950 relative z-20">
        <div className="container mx-auto px-6">
           <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Rotate3d className="text-amber-500" size={24} />
                <span className="text-amber-500 font-medium tracking-wider text-xs uppercase">Galeria Imersiva</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Design em cada ângulo.</h2>
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
                            
                            {/* Floating UI Elements in 3D Space */}
                            <motion.div 
                                style={{ translateZ: 40 }}
                                className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 pointer-events-none"
                            >
                                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Vista Selecionada</p>
                                <p className="text-white text-lg font-semibold">{galleryItems[activeTab].title}</p>
                            </motion.div>

                            <motion.div 
                                style={{ translateZ: 20 }}
                                className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none mix-blend-overlay"
                            />
                              
                        </motion.div>
                    </AnimatePresence>

                    {/* Shine Effect (Only for Images) */}
                    <motion.div 
                        style={{ 
                        x: useTransform(x, [-0.5, 0.5], ["-100%", "100%"]),
                        opacity: useTransform(y, [-0.5, 0.5], [0, 0.3])
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                    />
                    
                 </motion.div>
                 
                 <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1">
                    <Rotate3d size={12}/> Mova o cursor para interagir em 3D
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Bento Grid Tech */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tecnologia Invisível. <br/><span className="text-gray-500">Resultados Visíveis.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Cada centímetro dos 40cm de altura foi projetado com um propósito terapêutico.
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
            
            {/* Big Feature Block */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-900/20 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Smartphone size={120} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Controle Total na Palma da Mão</h3>
               <p className="text-gray-400 mb-6 relative z-10 max-w-xs">
                 Ajuste a massagem, defina o despertador e controle a cromoterapia pelo App via Bluetooth.
               </p>
               <ul className="space-y-2 relative z-10">
                 <li className="flex items-center text-sm text-indigo-200"><Check size={14} className="mr-2"/> 3 Níveis de Intensidade</li>
                 <li className="flex items-center text-sm text-indigo-200"><Check size={14} className="mr-2"/> Controle Lado Direito/Esquerdo</li>
                 <li className="flex items-center text-sm text-indigo-200"><Check size={14} className="mr-2"/> Timer 15 a 60 minutos</li>
               </ul>
            </div>

             {/* Big Feature Block 2 */}
             <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-emerald-900/20 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute -bottom-4 -right-4 opacity-20">
                 <ShieldCheck size={140} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Durabilidade Extrema</h3>
               <p className="text-gray-400 mb-6 relative z-10">
                 Não afunda. Não deforma. Garantido por uma década.
               </p>
               <div className="flex items-center gap-8 relative z-10 mt-8">
                 <div>
                    <span className="block text-4xl font-bold text-white">440kg</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Suporte Casal</span>
                 </div>
                 <div className="w-px h-12 bg-white/10"></div>
                 <div>
                    <span className="block text-4xl font-bold text-white">10 Anos</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Garantia</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed List & Form */}
      <section className="py-24 bg-black border-t border-white/5" id="premium-offer-form">
         <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-8">
                 <Layers className="text-amber-500" />
                 <h3 className="text-3xl font-bold text-white">Especificações Técnicas</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex items-start p-4 border-b border-zinc-900 hover:bg-white/5 transition-colors rounded-lg">
                      <div className="mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                      </div>
                      <span className="text-gray-300 font-medium">{spec}</span>
                    </div>
                  ))}
               </div>
               
               <div className="mt-12 p-6 bg-zinc-900/50 rounded-xl border border-zinc-800">
                 <p className="text-gray-500 text-sm italic">
                   * O comando de voz via Alexa é opcional e requer dispositivo Echo Dot. O carregamento por indução requer dispositivos compatíveis com padrão Qi.
                 </p>
               </div>
            </div>

            {/* Form Section - Sticky on Desktop */}
            <div className="flex-1 md:max-w-md">
               <div className="sticky top-24 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl shadow-amber-900/10">
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <h3 className="text-2xl font-bold text-white mb-2">Receber Oferta Premium</h3>
                    <p className="text-gray-400 text-sm">
                      Garanta condições exclusivas para o modelo de 40cm.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
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
                      {/* Shine Effect Layer */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                      
                      <span className="relative flex items-center justify-center gap-2">
                         Solicitar Tabela de Preços <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
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

      {/* Floating Sticky CTA for Mobile/Tablet */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none"
          >
             <div className="bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 p-2 pr-3 pl-6 rounded-full shadow-2xl shadow-amber-900/50 flex items-center justify-between gap-6 pointer-events-auto max-w-md w-full ring-1 ring-white/10">
               <div className="flex flex-col">
                  <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider leading-tight">Oferta Limitada</span>
                  <span className="text-white font-bold text-sm">Premium 40cm</span>
               </div>
               <button 
                  onClick={scrollToForm}
                  className="relative overflow-hidden bg-[#F59E0B] text-black font-bold py-3 px-6 rounded-full text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all transform hover:scale-105 active:scale-95"
               >
                  <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
                  <span className="relative flex items-center gap-2">Ver Preço <ArrowDown size={16} /></span>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PremiumPage;