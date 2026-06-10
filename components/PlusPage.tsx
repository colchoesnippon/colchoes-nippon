import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Zap, Smartphone, ShieldCheck, 
  Check, ChevronRight, Rotate3d, ArrowDown, Layers, ChevronDown, Info
} from 'lucide-react';

const PlusPage: React.FC = () => {
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
      const formElement = document.getElementById('plus-offer-form');
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
    document.getElementById('plus-offer-form')?.scrollIntoView({ behavior: 'smooth' });
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
    const text = `Olá, tenho interesse na *Linha Plus 32cm*.\n\n*Medida Desejada:* ${formData.size}\n*Nome:* ${formData.name}\n*WhatsApp:* ${formData.whatsapp}\n\nGostaria de receber a tabela de valores e condições.`;
    window.open(`https://wa.me/554334720040?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleSpec = (index: number) => {
    setExpandedSpec(expandedSpec === index ? null : index);
  };

  const features = [
    { icon: <Zap className="text-amber-400" />, title: "Energia Quântica", desc: "Equilíbrio energético corporal através de pulsos eletromagnéticos." },
    { icon: <Smartphone className="text-blue-400" />, title: "Vibromassagem App", desc: "Ajuste e controle seus ciclos de massagem diretamente pelo celular." },
    { icon: <Layers className="text-purple-400" />, title: "Densidade Progressiva", desc: "Distribuição científica de peso para alinhamento correto da coluna." },
    { icon: <ShieldCheck className="text-green-400" />, title: "Múltiplas Terapias", desc: "Magnetismo, Infravermelho Longo, vibromassagem, EVI Diamond e X-Ions integrados." },
  ];

  const specs = [
    { title: "Pillow Top Único", detail: "Camada de conforto superior com densidade ideal, assegurando maciez agradável ao deitar sem comprometer a estabilidade ortopédica." },
    { title: "Pastilhas de Magnético", detail: "Ondas magnéticas constantes de 800 Gauss que proporcionam um relaxamento profundo e atuam na melhoria da circulação periférica." },
    { title: "Pastilhas de Infravermelho Longo", detail: "Pastilhas biocerâmicas que emitem ondas que simulam a energia solar matinal, auxiliando na redução de dores musculares e eliminação de toxinas." },
    { title: "Pastilhas EVI Diamond", detail: "Energia Vibracional de Impulso premium que age no sistema nervoso autônomo, favorecendo a modulação do estresse acumulado." },
    { title: "Pastilhas X-Ions", detail: "Interação molecular que emite íons negativos benéficos, limpando energeticamente e gerando um ambiente de sono revigorante." },
    { title: "Densidade Progressiva", detail: "Estrutura inteligente de camadas perfeitamente dimensionada para o conforto ideal enquanto apoia as articulações." },
    { title: "Tecido Malha Especial", detail: "Respirável, hipoalergênico e incrivelmente agradável ao toque, favorecendo o controle ideal de temperatura corporal de forma contínua." },
    { title: "Design Moderno 32cm", detail: "Uma altura equilibrada e imponente que se adapta primorosamente a qualquer estilo de cama ou decoração contemporânea." },
    { title: "Suporta 320kg (Casal)", detail: "Robustez ideal desenvolvida para suportar perfeitamente até 160kg de cada lado com durabilidade exemplar e estabilidade total." },
    { title: "10 Anos de Garantia", detail: "Excelente cobertura estrutural garantindo que seu colchão Nippon não deforma e mantém sua eficácia por uma década." },
    { title: "Vibromassagem com 4 Motores", detail: "Motores silenciosos integrados de alta tecnologia acionados em diversas modalidades para acalmar todo o corpo." },
    { title: "Controle por Aplicativo via Bluetooth", detail: "Conectividade sem complicação para selecionar intensidade, tempo (timer) de massagem e tipos preferenciais com facilidade técnica." }
  ];

  const galleryItems = [
    { 
        id: 'overview',
        title: "Visão Global", 
        desc: "Design versátil e tecnológico estruturado para o bem-estar.",
        img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-plus-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg" 
    },
    { 
        id: 'side',
        title: "Altura 32cm", 
        desc: "Uma silhueta elegante com Pillow Top integrado de alta resiliência.",
        img: "https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-plus-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg" 
    },
    { 
        id: 'texture',
        title: "Conforto Tátil", 
        desc: "Tecido suave que promove a respiração celular e frescor na pele.",
        img: "https://colchoesnippon.com.br/wp-content/uploads/2025/05/colchao-magnetico-fitilho-nippon-massageador-linha-premium-quantico-nipponflex.jpg" 
    }
  ];

  return (
    <div className="pt-36 md:pt-48 bg-black min-h-screen overflow-x-hidden relative">
      
      {/* Hero Plus */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-500 font-semibold text-sm tracking-wider mb-6">
              LINHA PLUS
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
              32cm
            </h1>
            <p className="text-2xl md:text-4xl font-light text-gray-300 tracking-tight mb-10">
              O equilíbrio absoluto entre conforto e tecnologia aplicada.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative w-full max-w-4xl mx-auto aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/10 group"
          >
            <img 
              src="https://colchoesnippon.com.br/wp-content/uploads/2026/06/LINHA-plus-COLCHOES-NIPPON-FLEX-PRECO-PREMIUM-FIR-MAGNETICO-MASSAGEADOR.jpg" 
              alt="Colchão Plus 32cm" 
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
              <h2 className="text-3xl md:text-5xl font-bold text-white">Visual e Estrutura</h2>
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
                                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Linha Plus</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tecnologia Terapêutica. <br/><span className="text-amber-500 font-normal">Qualidade de Vida.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Cada camada dos 32cm de altura foi calculada cientificamente para proporcionar relaxamento e alinhamento ortopédico.
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
            
            {/* App features */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-900/20 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Smartphone size={120} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Vibromassagem App via Bluetooth</h3>
               <p className="text-gray-400 mb-6 relative z-10 max-w-xs">
                 Conecte seu smartphone via Bluetooth para modular a vibromassagem com extrema facilidade.
               </p>
               <ul className="space-y-2 relative z-10">
                 <li className="flex items-center text-sm text-indigo-200"><Check size={14} className="mr-2 text-indigo-400"/> Controle total via aplicativo exclusivo</li>
                 <li className="flex items-center text-sm text-indigo-200"><Check size={14} className="mr-2 text-indigo-400"/> Temporizador programável (Timer)</li>
                 <li className="flex items-center text-sm text-indigo-200"><Check size={14} className="mr-2 text-indigo-400"/> Seleção de intensidade e pontos direcionados</li>
               </ul>
            </div>

             {/* Durability */}
             <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-emerald-900/20 to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute -bottom-4 -right-4 opacity-10">
                 <ShieldCheck size={140} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Estrutura Ortopédica Reforçada</h3>
               <p className="text-gray-400 mb-6 relative z-10">
                 Firmeza anatômica sob medida com alta durabilidade.
               </p>
               <div className="flex items-center gap-8 relative z-10 mt-8">
                 <div>
                    <span className="block text-4xl font-bold text-white">320kg</span>
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
      <section className="py-24 bg-black border-t border-white/5" id="plus-offer-form">
         <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-8">
                 <Layers className="text-amber-500" />
                 <h3 className="text-3xl font-bold text-white">Especificações Técnicas</h3>
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
                   * O controle por aplicativo requer um dispositivo com conexão Bluetooth ativa. Imagens demonstrativas.
                 </p>
               </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 md:max-w-md">
               <div className="sticky top-24 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl shadow-amber-900/10">
                   {/* Investimento */}
                   <div className="mb-6 pb-6 border-b border-zinc-800/80 space-y-3">
                     <div className="flex items-baseline justify-between font-sans">
                       <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Investimento Estimado</span>
                       <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Mais Desejado</span>
                     </div>
                     <div className="bg-black/40 border border-zinc-800/50 p-4 rounded-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                       <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">Modelos Plus a partir de</p>
                       <div className="flex items-baseline gap-1 mt-1">
                         <span className="text-zinc-500 font-semibold text-sm">R$</span>
                         <span className="text-3xl font-extrabold text-white tracking-tight">6.990</span>
                         <span className="text-xs text-zinc-500 ml-1.5 font-medium">consulte parcelamento</span>
                       </div>
                       <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed border-t border-zinc-800/80 pt-2.5 flex items-start gap-2">
                         <Info size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                         <span>Os valores variam conforme o tamanho de colchão escolhido, opcionais do revestimento e assessórios de quarto como box e cabeceira.</span>
                       </p>
                     </div>
                   </div>

                   <div className="mb-6 pb-6 border-b border-white/5">
                     <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Cotação & Consulta Linha Plus</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                       Receba um atendimento focado e personalizado para encontrar o tamanho e configuração perfeita para suas noites de sono.
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
                  <span className="text-white font-bold text-sm">Linha Plus 32cm</span>
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

export default PlusPage;
