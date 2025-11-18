import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, CheckCircle, Lock, User, Phone } from 'lucide-react';
import { QuizData } from '../types';

const questions = [
  {
    id: 'size',
    text: 'Qual o tamanho ideal?',
    options: [
      'Solteiro (088x188cm)', 
      'Casal Padrão (138x188cm)', 
      'Queen Size (158x198cm)', 
      'King Size (193x203cm)', 
      'Sob Medida'
    ]
  },
  {
    id: 'baseType',
    text: 'Qual a configuração desejada?',
    options: [
      'Somente o Colchão', 
      'Colchão + Base Box', 
      'Colchão + Base Baú'
    ]
  },
  {
    id: 'comfortProfile',
    text: 'Qual seu perfil de conforto?',
    options: ['Macio (Nuvens)', 'Intermediário (Equilibrado)', 'Firme (Ortopédico)']
  },
  {
    id: 'needs',
    text: 'Qual sua principal necessidade?',
    options: ['Dores na Coluna', 'Insônia / Ansiedade', 'Má Circulação', 'Renovação do Colchão']
  }
];

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizData>>({});
  const [isFormStep, setIsFormStep] = useState(false);

  const handleOptionClick = (option: string) => {
    const currentQuestionId = questions[step].id as keyof QuizData;
    setAnswers(prev => ({ ...prev, [currentQuestionId]: option }));
    
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setIsFormStep(true), 300);
    }
  };

  const handleBack = () => {
    if (isFormStep) {
      setIsFormStep(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answers.name || !answers.whatsapp) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const text = `Olá! Realizei o diagnóstico no site e gostaria de ver meu resultado e valores.\n\n` +
      `*📋 Meu Perfil:*\n` +
      `*Medida:* ${answers.size}\n` +
      `*Configuração:* ${answers.baseType}\n` +
      `*Conforto:* ${answers.comfortProfile}\n` +
      `*Necessidade:* ${answers.needs}\n\n` +
      `*👤 Meus Dados:*\n` +
      `*Nome:* ${answers.name}\n` +
      `*WhatsApp:* ${answers.whatsapp}`;
    
    window.open(`https://wa.me/554334720040?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="quiz" className="py-24 bg-zinc-900 relative overflow-hidden">
       {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl">
          
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              {isFormStep ? 'Passo Final' : `Diagnóstico — Passo ${step + 1}/${questions.length}`}
            </span>
            {(step > 0 || isFormStep) && (
              <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
                <ArrowLeft size={16} /> Voltar
              </button>
            )}
          </div>

          <div className="min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode='wait'>
              {!isFormStep ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
                    {questions[step].text}
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="group text-left p-5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/80 border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-between"
                      >
                        <span className="text-lg text-gray-200 font-medium group-hover:text-white">{opt}</span>
                        <ChevronRight className="text-gray-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4 ring-1 ring-green-500/30">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Diagnóstico Concluído!</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Para liberar seu resultado e as condições especiais para o perfil <strong>{answers.size}</strong>, preencha abaixo:
                    </p>
                  </div>

                  <form onSubmit={sendToWhatsApp} className="space-y-4 max-w-md mx-auto">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Seu Nome Completo"
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-zinc-600"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input 
                        type="tel" 
                        name="whatsapp"
                        required
                        placeholder="Seu WhatsApp com DDD"
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-zinc-600"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black text-lg font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                    >
                      Ver Resultado e Preços <ChevronRight size={20} />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-zinc-600 mt-4">
                      <Lock size={12} /> Seus dados estão seguros e não enviaremos spam.
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;