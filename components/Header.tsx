import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#E5E7EB] py-4 shadow-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end gap-4">
        
        {/* Bloco de Título - Alinhado ao Grid Principal */}
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-[#1E1423] leading-none mb-1">
            Reforma Tributária
          </h1>
          <h2 className="text-lg text-[#4B5563] font-medium tracking-wide leading-tight">
            Período de Transição das Alíquotas (IBS/CBS)
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-1.5 leading-relaxed">
            Dashboard estratégico para análise da evolução da carga tributária durante o período de transição.
          </p>
        </div>

        {/* Assinatura Institucional - Discreta */}
        <div className="shrink-0 pb-0.5">
          <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-widest">
            Desenvolvido por VLMA
          </span>
        </div>

      </div>
    </header>
  );
};

export default Header;