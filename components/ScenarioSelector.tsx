import React from 'react';
import { scenarios } from '../data';
import { TaxScenario } from '../types';
import { Check, Info } from 'lucide-react';

interface Props {
  currentScenario: TaxScenario;
  onSelect: (scenario: TaxScenario) => void;
}

const ScenarioSelector: React.FC<Props> = ({ currentScenario, onSelect }) => {
  return (
    <div className="bg-white border-b border-[#E5E7EB] pt-5 pb-3 shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Scenario Grid: Responsive Grid System */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
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
                        <span className={`text-lg font-bold tracking-tight leading-none ${isActive ? 'text-[#1E1423]' : 'text-[#1E1423]'}`}>
                            {scenario.rate.toFixed(1)}%
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider mt-1.5 text-center leading-tight px-1 ${isActive ? 'text-[#E5A100]' : 'text-[#9CA3AF]'}`}>
                            {scenario.description}
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
        
        {/* Description Box */}
        <div className="flex items-center justify-center gap-2 pb-1 opacity-80">
             <Info size={14} className="text-[#F6B221] shrink-0" />
             <p className="text-xs text-[#4B5563] text-center">
                <span className="font-bold text-[#1E1423]">{currentScenario.label}:</span> {currentScenario.appliesTo}
             </p>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;