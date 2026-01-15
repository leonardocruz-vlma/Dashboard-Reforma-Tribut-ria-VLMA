import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#E5E7EB] py-6 shadow-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center lg:items-center gap-6 text-center lg:text-left">
        
        {/* Bloco de Título - Alinhado ao Grid Principal */}
        <div className="max-w-4xl flex flex-col items-center lg:items-start">
          <h1 className="text-2xl font-bold tracking-tight text-[#1E1423] leading-none mb-1">
            Reforma Tributária
          </h1>
          <h2 className="text-lg text-[#4B5563] font-medium tracking-wide leading-tight">
            Período de Transição das Alíquotas (IBS/CBS)
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-1.5 leading-relaxed max-w-xl lg:max-w-none">
            Dashboard estratégico para análise da evolução da carga tributária durante o período de transição.
          </p>
        </div>

        {/* Card Institucional - Logo VLMA */}
        <div className="shrink-0 bg-white border border-[#E5E7EB] rounded-[10px] p-[10px_14px] shadow-[0px_6px_18px_rgba(17,12,46,0.04)] h-[52px] flex flex-col justify-center items-center min-w-[160px]">
          <span className="text-[10px] font-normal text-[#9CA3AF] uppercase tracking-[0.14em] leading-none mb-[2px]">
            DESENVOLVIDO POR
          </span>
          <img 
            src="https://i.ibb.co/6cG3nF6W/VLMA-01.png" 
            alt="VLMA Logo" 
            className="h-[24px] max-h-[24px] w-auto block"
          />
        </div>

      </div>
    </header>
  );
};

export default Header;