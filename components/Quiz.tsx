import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { QuizData, MattressLine } from '../types';

const questions = [
  {
    id: 'size',
    text: 'Qual o tamanho ideal para você?',
    options: ['Solteiro', 'Casal Padrão', 'Queen Size', 'King Size', 'Sob Medida']
  },
  {
    id: 'comfortProfile',
    text: 'Qual seu perfil de conforto preferido?',
    options: ['Macio (Nuvens)', 'Intermediário (Equilibrado)', 'Firme (Ortopédico)']
  },
  {
    id: 'needs',
    text: 'Qual sua principal necessidade hoje?',
    options: ['Dores na Coluna', 'Insônia / Ansiedade', 'Má Circulação', 'Renovação do Colchão']
  },
  {
    id: 'lineOfInterest',
    text: 'Qual linha chamou sua atenção?',
    options: [MattressLine.PREMIUM, MattressLine.DIAMOND, MattressLine.PLUS, MattressLine.AMERICAN, 'Não tenho certeza']
  }
];

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizData>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionClick = (option: string) => {
    const currentQuestionId = questions[step].id;
    setAnswers(prev => ({ ...prev, [currentQuestionId]: option }));
    
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const sendToWhatsApp = () => {
    const text = `Olá! Realizei o diagnóstico no site:\n\n` +
      `*Tamanho:* ${answers.size}\n` +
      `*Conforto:* ${answers.comfortProfile}\n` +
      `*Necessidade:* ${answers.needs}\n` +
      `*Interesse:* ${answers.lineOfInterest}\n\n` +
      `Gostaria de receber os preços e condições.`;
    
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="quiz" className="py-24 bg-zinc-900 relative overflow-hidden">
       {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-16 shadow-2xl">
          
          {!isCompleted ? (
            <div className="min-h-[300px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Diagnóstico do Sono — Passo {step + 1}/{questions.length}
                </span>
                {step > 0 && (
                  <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                )}
              </div>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-10">
                    {questions[step].text}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="group text-left p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-between"
                      >
                        <span className="text-lg text-gray-200 font-medium group-hover:text-white">{opt}</span>
                        <ChevronRight className="text-gray-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Diagnóstico Pronto!</h3>
              <p className="text-xl text-gray-400 mb-10 max-w-md mx-auto">
                Com base nas suas respostas, selecionamos as melhores condições para o seu perfil.
              </p>
              <button 
                onClick={sendToWhatsApp}
                className="w-full md:w-auto bg-white text-black text-lg font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg shadow-white/10"
              >
                Ver Meu Resultado no WhatsApp
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;