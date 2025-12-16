import React, { useState } from 'react';
import { TaxData, TaxScenario } from '../types';
import GeneralChart from './charts/GeneralChart';
import ComparisonChart from './charts/ComparisonChart';
import { TrendingUp, BarChart3, FileText, Table2, AlertTriangle, ChevronDown, ChevronUp, HelpCircle, ShieldAlert, Target } from 'lucide-react';

interface Props {
  selectedData: TaxData;
  fullSeries: TaxData[];
  scenario: TaxScenario;
}

type TabType = 'evolution' | 'comparison' | 'technical';

const Dashboard: React.FC<Props> = ({ selectedData, fullSeries }) => {
  const [activeTab, setActiveTab] = useState<TabType>('evolution');
  const [showFullTable, setShowFullTable] = useState(false);

  const [selectedTaxes, setSelectedTaxes] = useState({
    pisCofins: true,
    icmsIss: true,
    cbs: true,
    ibs: true
  });

  const calculatedTotal = 
    (selectedTaxes.pisCofins ? selectedData.pisCofinsRate : 0) +
    (selectedTaxes.icmsIss ? selectedData.icmsIssRate : 0) +
    (selectedTaxes.cbs ? selectedData.cbsRate : 0) +
    (selectedTaxes.ibs ? selectedData.ibsRate : 0);

  const toggleTax = (key: keyof typeof selectedTaxes) => {
    setSelectedTaxes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
      
      {/* 1. HEADER DO DASHBOARD */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-[#E5E7EB] pb-8 items-stretch">
        <div className="lg:col-span-4 flex items-center gap-4">
            <div className="bg-[#1E1423] text-white px-4 py-3 rounded-lg text-3xl font-bold shadow-md tracking-tight h-full flex items-center justify-center min-w-[80px]">
                {selectedData.year}
            </div>
            <div className="flex flex-col justify-center h-full">
                <h2 className="text-xl font-bold text-[#1E1423] leading-tight">{selectedData.description}</h2>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className={`h-2 w-2 rounded-full ${selectedData.year >= 2033 ? 'bg-[#E5A100]' : 'bg-[#F6B221]'}`}></span>
                    <p className="text-xs text-[#4B5563] uppercase tracking-wide font-bold">
                        {selectedData.year >= 2033 ? 'Novo Modelo Consolidado' : 'Fase de Transição'}
                    </p>
                </div>
            </div>
        </div>
        
        {/* Impacto Estratégico - Linha Lateral Amarelo Mostarda */}
        <div className="lg:col-span-8 bg-white border-l-4 border-[#F6B221] px-5 py-4 rounded-r-lg flex flex-col justify-center">
             <h3 className="text-xs font-bold text-[#1E1423] uppercase tracking-wide mb-1">Impacto Estratégico</h3>
             <p className="text-[#374151] text-sm leading-relaxed font-medium">
                {selectedData.strategicInsight}
             </p>
        </div>
      </div>

      {/* 2. GRID PRINCIPAL */}
      <div className="grid lg:grid-cols-12 gap-8 mb-12 items-stretch">
        
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card de Composição */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden flex-none">
                <div className="bg-[#F8F9FB] px-5 py-3 border-b border-[#E5E7EB] flex justify-between items-center">
                    <h3 className="font-bold text-[#1E1423] text-sm uppercase tracking-wide flex items-center gap-2">
                        <FileText size={16} className="text-[#F6B221]" /> Composição da Alíquota
                    </h3>
                    <HelpCircle size={16} className="text-[#9CA3AF]" />
                </div>
                
                <div className="divide-y divide-[#F8F9FB]">
                    {/* Sistema Antigo */}
                    <div className="bg-[#F8F9FB]">
                        {/* PIS / COFINS */}
                        <div className={`px-5 py-3 flex justify-between items-center transition-opacity ${selectedData.pisCofinsStatus === 'extinct' ? 'opacity-40 grayscale' : ''}`}>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    checked={selectedTaxes.pisCofins} 
                                    onChange={() => toggleTax('pisCofins')}
                                    disabled={selectedData.pisCofinsStatus === 'extinct'}
                                    className="w-4 h-4 rounded text-[#F6B221] focus:ring-[#F6B221] border-gray-300 cursor-pointer"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-[#9CA3AF]">PIS / COFINS</p>
                                        {selectedData.pisCofinsStatus === 'extinct' && (
                                            <span className="text-[9px] bg-[#EEF0F3] text-[#6B7280] border border-[#E5E7EB] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                                Extinto
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-[#9CA3AF]">Federal – Antigo</p>
                                </div>
                            </div>
                            <p className="font-mono font-bold text-base text-[#6B7280]">
                                {selectedData.pisCofinsRate.toFixed(2)}%
                            </p>
                        </div>

                        {/* ICMS / ISS */}
                        <div className={`px-5 py-3 flex justify-between items-center transition-opacity ${selectedData.icmsIssTransitionFactor === 0 ? 'opacity-40 grayscale' : ''}`}>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    checked={selectedTaxes.icmsIss} 
                                    onChange={() => toggleTax('icmsIss')}
                                    disabled={selectedData.icmsIssTransitionFactor === 0}
                                    className="w-4 h-4 rounded text-[#F6B221] focus:ring-[#F6B221] border-gray-300 cursor-pointer"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-[#9CA3AF]">ICMS / ISS</p>
                                        {selectedData.year >= 2033 ? (
                                            <span className="text-[9px] bg-[#EEF0F3] text-[#6B7280] border border-[#E5E7EB] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                                Extinto
                                            </span>
                                        ) : selectedData.icmsIssTransitionFactor < 100 && (
                                            <span className="text-[9px] bg-white text-[#6B7280] border border-[#E5E7EB] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                                {selectedData.icmsIssTransitionFactor}% Rem.
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-[#9CA3AF]">Est/Mun – Antigo</p>
                                </div>
                            </div>
                            <p className="font-mono font-bold text-base text-[#6B7280]">
                                {selectedData.icmsIssRate.toFixed(2)}%
                            </p>
                        </div>
                    </div>

                    {/* Novo Modelo */}
                    <div className="bg-white">
                        <div className="px-5 py-3 flex justify-between items-center hover:bg-[#FFF4D6] transition-colors">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    checked={selectedTaxes.cbs} 
                                    onChange={() => toggleTax('cbs')}
                                    className="w-4 h-4 rounded text-[#E5A100] focus:ring-[#E5A100] border-gray-300 cursor-pointer"
                                />
                                <div>
                                    <p className="text-sm font-bold text-[#1E1423]">CBS</p>
                                    <p className="text-[10px] text-[#4B5563]">Novo Federal</p>
                                </div>
                            </div>
                            <p className="font-mono font-bold text-lg text-[#1E1423]">
                                {selectedData.cbsRate.toFixed(2)}%
                            </p>
                        </div>

                        <div className="px-5 py-3 flex justify-between items-center hover:bg-[#FFF4D6] transition-colors">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    checked={selectedTaxes.ibs} 
                                    onChange={() => toggleTax('ibs')}
                                    className="w-4 h-4 rounded text-[#FCD34D] focus:ring-[#FCD34D] border-gray-300 cursor-pointer"
                                />
                                <div>
                                    <p className="text-sm font-bold text-[#1E1423]">IBS</p>
                                    <p className="text-[10px] text-[#4B5563]">Novo Est/Mun</p>
                                </div>
                            </div>
                            <p className="font-mono font-bold text-lg text-[#1E1423]">
                                {selectedData.ibsRate.toFixed(2)}%
                            </p>
                        </div>
                    </div>

                    {/* Carga Total - Fundo Roxo VLMA */}
                    <div className="px-5 py-5 bg-[#1E1423] text-white">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Carga Selecionada</p>
                            <p className="font-mono font-bold text-4xl tracking-tight text-white">
                                {calculatedTotal.toFixed(2)}%
                            </p>
                        </div>
                        <div className="flex gap-2 items-start mt-2 pt-2 border-t border-[#2A1F30]">
                            <AlertTriangle size={12} className="text-[#F6B221] mt-0.5 shrink-0" />
                            <p className="text-[10px] text-[#9CA3AF] leading-tight">
                                Considera apenas os tributos marcados e suas reduções no ano {selectedData.year}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards de Foco e Risco */}
            <div className="flex flex-col gap-4 flex-grow">
                 {/* Foco Operacional */}
                 <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Target size={16} className="text-[#F6B221]" />
                        <h4 className="text-xs font-bold text-[#1E1423] uppercase tracking-wider">Foco Operacional</h4>
                    </div>
                    <p className="text-sm text-[#374151] font-medium leading-snug">
                        {selectedData.year < 2027 ? "Saneamento de cadastro (NCM) e Compliance." : 
                         selectedData.year < 2033 ? "Gestão de dupla conformidade (Antigo + Novo)." : 
                         "Otimização de créditos do IVA e precificação."}
                    </p>
                 </div>
                 
                 {/* Risco Principal - Vermelho */}
                 <div className="bg-[#FDECEC] p-4 rounded-xl border border-[#D92D20] shadow-sm flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert size={16} className="text-[#D92D20]" />
                        <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">Risco Principal</h4>
                    </div>
                    <p className="text-sm text-[#4B5563] font-medium leading-snug">
                        {selectedData.year < 2029 ? "Adequação sistêmica (ERP) e parametrização." : "Acúmulo de créditos e impacto no fluxo de caixa."}
                    </p>
                 </div>
            </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-7 flex flex-col h-full">
            
            {/* Navegação por Abas - Azul para ativo */}
            <div className="flex bg-[#F8F9FB] p-1 rounded-lg mb-4 shrink-0">
                <button
                    onClick={() => setActiveTab('evolution')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wide rounded-md transition-all ${
                        activeTab === 'evolution' ? 'bg-white text-[#1E1423] shadow-sm border-b-2 border-[#F6B221]' : 'text-[#6B7280] hover:text-[#4B5563]'
                    }`}
                >
                    <TrendingUp size={14} className={activeTab === 'evolution' ? 'text-[#F6B221]' : 'text-[#9CA3AF]'} /> Evolução
                </button>
                <button
                    onClick={() => setActiveTab('comparison')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wide rounded-md transition-all ${
                        activeTab === 'comparison' ? 'bg-white text-[#1E1423] shadow-sm border-b-2 border-[#F6B221]' : 'text-[#6B7280] hover:text-[#4B5563]'
                    }`}
                >
                    <BarChart3 size={14} className={activeTab === 'comparison' ? 'text-[#F6B221]' : 'text-[#9CA3AF]'} /> Comparativo
                </button>
                 <button
                    onClick={() => setActiveTab('technical')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wide rounded-md transition-all ${
                        activeTab === 'technical' ? 'bg-white text-[#1E1423] shadow-sm border-b-2 border-[#F6B221]' : 'text-[#6B7280] hover:text-[#4B5563]'
                    }`}
                >
                    <Table2 size={14} className={activeTab === 'technical' ? 'text-[#F6B221]' : 'text-[#9CA3AF]'} /> Detalhe
                </button>
            </div>

            {/* Conteúdo das Visualizações */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm flex-grow min-h-[500px] flex flex-col">
                
                {activeTab === 'evolution' && (
                    <div className="animate-fade-in h-full flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-[#1E1423] uppercase">Evolução Temporal</h3>
                            <p className="text-xs text-[#9CA3AF] mt-1">
                                Substituição gradativa da carga cumulativa pelo IVA.
                            </p>
                        </div>
                        <div className="flex-grow min-h-[400px]">
                            <GeneralChart data={fullSeries} />
                        </div>
                    </div>
                )}

                {activeTab === 'comparison' && (
                    <div className="animate-fade-in h-full flex flex-col">
                         <div className="mb-4">
                            <h3 className="text-sm font-bold text-[#1E1423] uppercase">Comparativo do Ano</h3>
                            <p className="text-xs text-[#9CA3AF] mt-1">
                                Carga do Sistema Antigo vs Novo Modelo em {selectedData.year}.
                            </p>
                        </div>
                        <div className="flex-grow min-h-[400px]">
                            <ComparisonChart data={fullSeries} />
                        </div>
                    </div>
                )}

                {activeTab === 'technical' && (
                    <div className="animate-fade-in flex flex-col h-full">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-[#1E1423] uppercase">Dados Nominais ({selectedData.year})</h3>
                        </div>
                        
                        <div className="overflow-hidden border border-[#E5E7EB] rounded-lg flex-grow">
                            <table className="w-full text-sm text-left h-full">
                                <thead className="bg-[#F8F9FB] text-[#4B5563] font-semibold border-b border-[#E5E7EB]">
                                    <tr>
                                        <th className="px-4 py-3">Tributo</th>
                                        <th className="px-4 py-3 text-right">Alíquota</th>
                                        <th className="px-4 py-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F8F9FB]">
                                    <tr className="bg-white">
                                        <td className="px-4 py-3 font-medium text-[#4B5563]">PIS / COFINS</td>
                                        <td className="px-4 py-3 text-right font-mono text-[#6B7280]">
                                            {selectedData.pisCofinsRate.toFixed(2)}%
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${selectedData.pisCofinsStatus === 'active' ? 'bg-[#EEF0F3] text-[#4B5563] border border-[#E5E7EB]' : 'bg-[#F8F9FB] text-[#9CA3AF]'}`}>
                                                {selectedData.pisCofinsStatus === 'active' ? 'Vigente' : 'Extinto'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-4 py-3 font-medium text-[#4B5563]">ICMS / ISS</td>
                                        <td className="px-4 py-3 text-right font-mono text-[#6B7280]">
                                            {selectedData.icmsIssRate.toFixed(2)}%
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                             <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${selectedData.icmsIssTransitionFactor > 0 ? 'bg-[#EEF0F3] text-[#6B7280] border border-[#E5E7EB]' : 'bg-[#F8F9FB] text-[#9CA3AF]'}`}>
                                                {selectedData.icmsIssTransitionFactor > 0 ? `${selectedData.icmsIssTransitionFactor}% Rem.` : 'Extinto'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-[#FFF4D6]">
                                        <td className="px-4 py-3 font-bold text-[#E5A100]">CBS</td>
                                        <td className="px-4 py-3 text-right font-mono font-bold text-[#1E1423]">
                                            {selectedData.cbsRate.toFixed(2)}%
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-white text-[#E5A100] border border-[#E5A100]">
                                                Novo
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-[#FFF4D6]">
                                        <td className="px-4 py-3 font-bold text-[#F59E0B]">IBS</td>
                                        <td className="px-4 py-3 text-right font-mono font-bold text-[#1E1423]">
                                            {selectedData.ibsRate.toFixed(2)}%
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-white text-[#F59E0B] border border-[#FCD34D]">
                                                Novo
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>

      {/* RODAPÉ TABELA (Mantido) */}
      <div className="border border-[#E5E7EB] rounded-lg bg-white overflow-hidden shadow-sm mt-8 animate-fade-in">
          <button 
            onClick={() => setShowFullTable(!showFullTable)}
            className="w-full flex items-center justify-between px-6 py-4 bg-[#F8F9FB] hover:bg-[#EEF0F3] transition-colors"
          >
              <div className="flex items-center gap-3">
                  <div className="bg-[#E5E7EB] p-1.5 rounded text-[#4B5563]"><Table2 size={16} /></div>
                  <div className="text-left">
                     <p className="text-[#1E1423] font-bold text-sm">Tabela Oficial de Transição (2025-2033)</p>
                     <p className="text-[#9CA3AF] text-xs">Visão macro completa de todos os tributos</p>
                  </div>
              </div>
              {showFullTable ? <ChevronUp size={20} className="text-[#9CA3AF]" /> : <ChevronDown size={20} className="text-[#9CA3AF]" />}
          </button>
          
          {showFullTable && (
            <div className="overflow-x-auto border-t border-[#E5E7EB] p-4 bg-[#F8F9FB]">
                <table className="w-full text-xs text-left bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
                    <thead className="bg-[#F8F9FB] text-[#4B5563] font-semibold border-b border-[#E5E7EB]">
                        <tr>
                            <th className="px-4 py-3 w-16 text-center">Ano</th>
                            <th className="px-4 py-3 text-right bg-[#F8F9FB] text-[#9CA3AF]">PIS/COFINS</th>
                            <th className="px-4 py-3 text-right bg-[#F8F9FB] text-[#9CA3AF]">ICMS/ISS</th>
                            <th className="px-4 py-3 text-right bg-[#FFF4D6] text-[#E5A100] border-l border-[#E5E7EB]">CBS (Novo)</th>
                            <th className="px-4 py-3 text-right bg-[#FFF4D6] text-[#F59E0B]">IBS (Novo)</th>
                            <th className="px-4 py-3 text-right font-bold text-[#1E1423] border-l border-[#E5E7EB] bg-[#F8F9FB]">Carga Efetiva</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F8F9FB]">
                        {fullSeries.map((row) => {
                            const isSelected = row.year === selectedData.year;
                            const effectiveLoad = row.pisCofinsRate + row.icmsIssRate + row.cbsRate + row.ibsRate;
                            return (
                                <tr key={row.year} className={`transition-colors ${isSelected ? "bg-[#FFF4D6]" : "hover:bg-[#F8F9FB]"}`}>
                                    <td className="px-4 py-3 font-bold text-center text-[#4B5563]">{row.year}</td>
                                    
                                    <td className="px-4 py-3 text-right font-mono text-[#9CA3AF] bg-[#F8F9FB]">
                                        {row.pisCofinsRate === 0 ? <span className="text-[#E5E7EB]">-</span> : `${row.pisCofinsRate.toFixed(2)}%`}
                                    </td>
                                    <td className="px-4 py-3 text-right font-mono text-[#9CA3AF] bg-[#F8F9FB]">
                                        {row.icmsIssRate === 0 ? <span className="text-[#E5E7EB]">-</span> : 
                                            <span>
                                                {row.icmsIssRate.toFixed(2)}%
                                                <span className="text-[9px] ml-1 text-[#9CA3AF]">({row.icmsIssTransitionFactor}%)</span>
                                            </span>
                                        }
                                    </td>
                                    
                                    <td className="px-4 py-3 text-right font-mono text-[#1E1423] bg-[#FFF4D6] bg-opacity-40 border-l border-[#E5E7EB]">
                                        {row.cbsRate > 0 ? `${row.cbsRate.toFixed(2)}%` : <span className="text-[#E5E7EB]">-</span>}
                                    </td>
                                    <td className="px-4 py-3 text-right font-mono text-[#1E1423] bg-[#FFF4D6] bg-opacity-40">
                                        {row.ibsRate > 0 ? `${row.ibsRate.toFixed(2)}%` : <span className="text-[#E5E7EB]">-</span>}
                                    </td>
                                    
                                    <td className="px-4 py-3 text-right font-mono font-bold text-[#1E1423] border-l border-[#E5E7EB] bg-[#F8F9FB]">
                                        {effectiveLoad.toFixed(2)}%
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
          )}
      </div>

    </div>
  );
};

export default Dashboard;