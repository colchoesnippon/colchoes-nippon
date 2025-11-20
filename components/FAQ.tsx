import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Vou sentir dificuldade na adaptação com o magnético?",
    answer: "Não. A tecnologia Nippon foi desenvolvida com densidade progressiva inteligente. Diferente de colchões ortopédicos antigos e duros, nossos modelos possuem camadas de conforto (Rabatan e Pillow Top) que acolhem as curvaturas do corpo enquanto alinham a coluna. 98% dos clientes relatam melhora no sono já na primeira semana."
  },
  {
    question: "Como funciona a entrega e montagem?",
    answer: "Nossa logística é especializada em produtos de alto padrão. Entregamos em todo o território nacional com agendamento prévio. Em regiões atendidas por nossa equipe direta, realizamos a montagem completa no seu quarto e deixamos o produto pronto para uso, sem custos surpresa."
  },
  {
    question: "O colchão afunda ou deforma com o tempo?",
    answer: "Definitivamente não. Utilizamos espumas de alta resiliência (HR) e uma estrutura robusta projetada para suportar até 440kg (no modelo casal Premium). Oferecemos 10 anos de garantia contra deformações estruturais, uma das maiores do mercado, assegurando a durabilidade do seu investimento."
  },
  {
    question: "Qual a diferença real para um colchão comum?",
    answer: "Um colchão comum serve apenas para repouso passivo. O Nippon é um aparelho terapêutico ativo. Enquanto você dorme, ele trata sua saúde através de 5 terapias: Magnetismo (circulação), Infravermelho (desinflamação), Energia Quântica (renovação celular), Massagem (relaxamento muscular) e Cromoterapia (indução do sono)."
  },
  {
    question: "O sistema elétrico consome muita energia?",
    answer: "O consumo é irrelevante, similar ao de um rádio relógio ou carregador de celular. O sistema é bivolt automático e possui desligamento programável (timer), garantindo eficiência energética e segurança total."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Trabalhamos com condições facilitadas para tornar essa tecnologia acessível. Oferecemos parcelamento estendido no cartão de crédito, desconto especial para pagamento à vista (PIX) e financiamento próprio em alguns casos. Solicite um orçamento no WhatsApp para ver a melhor condição para você."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-40 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-white/10 mb-6 text-amber-500">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Dúvidas Frequentes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Transparência total para você decidir com segurança.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden
        ${isOpen ? 'bg-zinc-900 border-amber-500/30 shadow-lg shadow-black/50' : 'bg-transparent border-white/5 hover:bg-zinc-900/50'}
      `}
    >
      <div className="p-6 flex items-center justify-between">
        <h3 className={`text-lg font-medium pr-8 transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
          {faq.question}
        </h3>
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0
          ${isOpen ? 'bg-amber-500 border-amber-500 text-black rotate-180' : 'border-white/10 text-gray-400 group-hover:border-white/30'}
        `}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;