import React from 'react';
import { Check, Minus } from 'lucide-react';

const ComparisonTable: React.FC = () => {
  return (
    <section id="comparison" className="py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Qual é o ideal para você?
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 text-gray-500 font-medium sticky left-0 bg-black z-10">Recursos</th>
                <th className="py-6 px-4 text-center text-xl font-bold text-white">Premium</th>
                <th className="py-6 px-4 text-center text-lg font-semibold text-gray-300">Diamond</th>
                <th className="py-6 px-4 text-center text-lg font-semibold text-gray-300">Plus</th>
                <th className="py-6 px-4 text-center text-lg font-semibold text-gray-300">American</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <TableRow label="Altura" val1="40 cm" val2="40 cm" val3="32 cm" val4="28 cm" />
              <TableRow label="Pillow Top" val1="Super Único" val2="Duplo" val3="Único" val4="Integrado" />
              <TableRow label="Motores de Massagem" val1="4 (Big Premium)" val2="4 (Big Premium)" val3="4 (Big)" val4="Vibroterapia" />
              <TableRow label="Energia Magnética" val1={<CheckIcon />} val2={<CheckIcon />} val3={<CheckIcon />} val4={<CheckIcon />} />
              <TableRow label="Infravermelho Longo" val1={<CheckIcon />} val2={<CheckIcon />} val3={<CheckIcon />} val4={<CheckIcon />} />
              <TableRow label="Controle via App" val1={<CheckIcon />} val2={<CheckIcon />} val3={<CheckIcon />} val4={<MinusIcon />} />
              <TableRow label="Comando de Voz" val1={<CheckIcon />} val2={<MinusIcon />} val3={<MinusIcon />} val4={<MinusIcon />} />
              <TableRow label="Suporte de Peso (Casal)" val1="440 kg" val2="440 kg" val3="320 kg" val4="280 kg" />
              <TableRow label="Garantia" val1="10 Anos" val2="10 Anos" val3="10 Anos" val4="5 Anos" />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const TableRow: React.FC<{ label: string, val1: React.ReactNode, val2: React.ReactNode, val3: React.ReactNode, val4: React.ReactNode }> = ({ label, val1, val2, val3, val4 }) => (
  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
    <td className="py-6 font-medium text-gray-400 sticky left-0 bg-black/90 backdrop-blur-sm pr-4">{label}</td>
    <td className="py-6 px-4 text-center text-white font-medium">{val1}</td>
    <td className="py-6 px-4 text-center text-gray-400">{val2}</td>
    <td className="py-6 px-4 text-center text-gray-400">{val3}</td>
    <td className="py-6 px-4 text-center text-gray-400">{val4}</td>
  </tr>
);

const CheckIcon = () => <Check className="w-5 h-5 mx-auto text-blue-500" />;
const MinusIcon = () => <Minus className="w-4 h-4 mx-auto text-gray-700" />;

export default ComparisonTable;