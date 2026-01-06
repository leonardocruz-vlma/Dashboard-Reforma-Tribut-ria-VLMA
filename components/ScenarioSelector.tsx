import React, { useState, useEffect } from 'react';
import { scenarios } from '../data';
import { TaxScenario } from '../types';
import { Check, Info } from 'lucide-react';

interface Props {
  currentScenario: TaxScenario;
  onSelect: (scenario: TaxScenario) => void;
}

const ScenarioSelector: React.FC<Props> = ({ currentScenario, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Reset expansion when scenario changes
  useEffect(() => {
    setIsExpanded(false);
  }, [currentScenario]);

  const renderDescription = () => {
    const parts = currentScenario.appliesTo.split('|').map(p => p.trim());
    
    // Fallback simple rendering if data doesn't follow the pattern
    if (parts.length < 2) {
        return (
            <div className="w-full text-center">
                <p className="text-sm font-medium text-[#1E1423] tracking-tight">{currentScenario.appliesTo}</p>
            </div>
        );
    }

    const [line1, line2, fullList] = parts;
    const hasFullList = !!fullList && fullList !== line2;

    return (
      <div className="w-full text-center max-w-4xl mx-auto">
        {/* Linha 1: Título em destaque e Resumo (Negrito) */}
        <p className="text-[13px] font-bold text-[#1E1423] mb-0.5 tracking-tight uppercase">
          {line1}
        </p>
        
        {/* Linha 2: Linha secundária (Cinza) + Link opcional */}
        <div className="text-[12px] text-[#6B7280] font-medium leading-tight">
          {isExpanded ? (
            <div className="animate-fade-in py-3 px-6 bg-[#F8F9FB] rounded-lg mt-3 border border-[#E5E7EB] text-[#4B5563] text-center shadow-inner">
              <p className="leading-relaxed">{fullList}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="mt-2 text-[#E5A100] font-bold hover:underline uppercase tracking-tighter text-[10px]"
              >
                 · Recolher lista
              </button>
            </div>
          ) : (
            <p>
              {line2}
              {hasFullList && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                  className="ml-2 text-[#E5A100] font-bold hover:underline uppercase tracking-tighter text-[10px]"
                >
                   · VER LISTA COMPLETA
                </button>
              )}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border-b border-[#E5E7EB] pt-5 pb-3 shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Scenario Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
            {scenarios.map((scenario) => {
                const isActive = currentScenario.id === scenario.id;
                return (
                    <button
                        key={scenario.id}
                        onClick={() => onSelect(scenario)}
                        className={`relative flex flex-col items-center justify-center py-3 px-1 rounded-lg border transition-all duration-200 w-full h-full min-h-[70px] ${
                            isActive 
                            ? 'bg-[#FFF4D6] border-[#F6B221] text-[#1E1423] shadow-sm' 
                            : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#F6B221] hover:bg-[#F8F9FB] hover:text-[#1E1423]'
                        }`}
                    >
                        <span className={`text-base font-bold tracking-tight leading-none text-[#1E1423]`}>
                            {scenario.label}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider mt-1.5 text-center leading-tight px-1 ${isActive ? 'text-[#E5A100]' : 'text-[#9CA3AF]'}`}>
                            Tributação
                        </span>
                        
                        {isActive && (
                            <div className="absolute -top-2 -right-2 bg-[#E5A100] text-white p-0.5 rounded-full border-2 border-white shadow-sm">
                                <Check size={12} strokeWidth={4} />
                            </div>
                        )}
                    </button>
                )
            })}
        </div>
        
        {/* Standardized Horizontal Description Area - Styled according to new professional pattern */}
        <div className="mt-4 mb-3 flex items-start justify-center gap-3">
             <div className="mt-0.5 shrink-0 p-1 bg-[#FFF4D6] rounded-md text-[#F6B221]">
                <Info size={14} />
             </div>
             <div className="w-full">
                {renderDescription()}
             </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;