import { TaxData, TaxScenario } from './types';

export const scenarios: TaxScenario[] = [
  { 
    id: 'padrao-teto', 
    label: '28,0%', 
    rate: 28.0, 
    description: 'ALÍQUOTA PADRÃO',
    appliesTo: 'ALÍQUOTA PADRÃO — Aplicação geral do novo sistema tributário (IBS + CBS). | Comércio, indústria e serviços sem regime específico. | Comércio, indústria e serviços sem regime específico.'
  },
  { 
    id: 'red-30', 
    label: '19,6%', 
    rate: 19.6, 
    description: 'REDUÇÃO DE 30%',
    appliesTo: 'PROFISSÕES REGULAMENTADAS — Atividades fiscalizadas por conselhos profissionais. | Administração, advocacia, arquitetura, engenharia, contabilidade. Saúde migra automaticamente para redução de 60%. | Administradores, advogados, arquitetos e urbanistas, assistentes sociais, bibliotecários, biólogos, contabilistas, economistas, economistas domésticos, profissionais de educação física, engenheiros e agrônomos, estatísticos, médicos veterinários e zootecnistas, museólogos, químicos, relações públicas, técnicos industriais e técnicos agrícolas.'
  },
  { 
    id: 'red-40', 
    label: '16,8%', 
    rate: 16.8, 
    description: 'REDUÇÃO DE 40%',
    appliesTo: 'REGIMES DIFERENCIADOS — Tratamento tributário específico por setor. | Hotelaria, bares e restaurantes (Lei Complementar). | Hotelaria, bares e restaurantes. Definidos em Lei Complementar.'
  },
  { 
    id: 'red-50', 
    label: '14,0%', 
    rate: 14.0, 
    description: 'REDUÇÃO DE 50%',
    appliesTo: 'SERVIÇOS IMOBILIÁRIOS — Operações ligadas ao setor de construção e mercado imobiliário. | Alienação, administração e construção civil. | Alienação, administração e construção civil. Regimes especiais por tipo de operação.'
  },
  { 
    id: 'red-60', 
    label: '11,2%', 
    rate: 11.2, 
    description: 'REDUÇÃO DE 60%',
    appliesTo: 'BENS E SERVIÇOS ESSENCIAIS — Redução ampliada para setores estratégicos. | Educação, saúde, medicamentos, alimentos, higiene, agro, cultura, comunicação institucional. | Dispositivos médicos, dispositivos de acessibilidade, medicamentos, composições enterais e parenterais, produtos de cuidados básicos à saúde menstrual, serviços de educação, serviços de saúde, alimentos destinados ao consumo humano, produtos de higiene e limpeza de baixa renda, produtos agropecuários, aquícolas, pesqueiros, florestais e extrativistas in natura, insumos agropecuários e aquícolas, produções artísticas, culturais, jornalísticas e audiovisuais, atividades desportivas, comunicação institucional, bens e serviços ligados à soberania e segurança nacional, projetos de reabilitação urbana.'
  },
  { 
    id: 'red-70', 
    label: '8,4%', 
    rate: 8.4, 
    description: 'REDUÇÃO DE 70%',
    appliesTo: 'LOCAÇÕES E ARRENDAMENTOS — Redução máxima setorial. | Locações, cessões onerosas e arrendamentos de bens imóveis. | Locações, cessões onerosas e arrendamentos de bens imóveis.'
  }
];

const RAW_DATA: Record<number, Record<number, { pis: number, cbs: number, ibs: number, total: number }>> = {
  28.0: {
    2026: { pis: 2.65, cbs: 0.90, ibs: 0.10, total: 3.65 },
    2027: { pis: 0.00, cbs: 9.30, ibs: 0.10, total: 9.40 },
    2028: { pis: 0.00, cbs: 9.30, ibs: 0.10, total: 9.40 },
    2029: { pis: 0.00, cbs: 9.30, ibs: 1.87, total: 11.17 },
    2030: { pis: 0.00, cbs: 9.30, ibs: 3.74, total: 13.04 },
    2031: { pis: 0.00, cbs: 9.30, ibs: 5.61, total: 14.91 },
    2032: { pis: 0.00, cbs: 9.30, ibs: 7.48, total: 16.78 },
    2033: { pis: 0.00, cbs: 9.30, ibs: 18.70, total: 28.00 },
  },
  19.6: {
    2026: { pis: 2.65, cbs: 0.90, ibs: 0.10, total: 3.65 },
    2027: { pis: 0.00, cbs: 6.51, ibs: 0.10, total: 6.61 },
    2028: { pis: 0.00, cbs: 6.51, ibs: 0.10, total: 6.61 },
    2029: { pis: 0.00, cbs: 6.51, ibs: 1.31, total: 7.82 },
    2030: { pis: 0.00, cbs: 6.51, ibs: 2.62, total: 9.13 },
    2031: { pis: 0.00, cbs: 6.51, ibs: 3.93, total: 10.44 },
    2032: { pis: 0.00, cbs: 6.51, ibs: 5.24, total: 11.75 },
    2033: { pis: 0.00, cbs: 6.51, ibs: 13.09, total: 19.60 },
  },
  16.8: {
    2026: { pis: 2.65, cbs: 0.90, ibs: 0.10, total: 3.65 },
    2027: { pis: 0.00, cbs: 5.58, ibs: 0.10, total: 5.68 },
    2028: { pis: 0.00, cbs: 5.58, ibs: 0.10, total: 5.68 },
    2029: { pis: 0.00, cbs: 5.58, ibs: 1.12, total: 6.70 },
    2030: { pis: 0.00, cbs: 5.58, ibs: 2.24, total: 7.82 },
    2031: { pis: 0.00, cbs: 5.58, ibs: 3.37, total: 8.95 },
    2032: { pis: 0.00, cbs: 5.58, ibs: 4.49, total: 10.07 },
    2033: { pis: 0.00, cbs: 5.58, ibs: 11.22, total: 16.80 },
  },
  14.0: {
    2026: { pis: 2.65, cbs: 0.90, ibs: 0.10, total: 3.65 },
    2027: { pis: 0.00, cbs: 4.65, ibs: 0.10, total: 4.75 },
    2028: { pis: 0.00, cbs: 4.65, ibs: 0.10, total: 4.75 },
    2029: { pis: 0.00, cbs: 4.65, ibs: 0.94, total: 5.59 },
    2030: { pis: 0.00, cbs: 4.65, ibs: 1.87, total: 6.52 },
    2031: { pis: 0.00, cbs: 4.65, ibs: 2.81, total: 7.46 },
    2032: { pis: 0.00, cbs: 4.65, ibs: 3.74, total: 8.39 },
    2033: { pis: 0.00, cbs: 4.65, ibs: 9.35, total: 14.00 },
  },
  11.2: {
    2026: { pis: 2.65, cbs: 0.90, ibs: 0.10, total: 3.65 },
    2027: { pis: 0.00, cbs: 3.72, ibs: 0.10, total: 3.82 },
    2028: { pis: 0.00, cbs: 3.72, ibs: 0.10, total: 3.82 },
    2029: { pis: 0.00, cbs: 3.72, ibs: 0.75, total: 4.47 },
    2030: { pis: 0.00, cbs: 3.72, ibs: 1.50, total: 5.22 },
    2031: { pis: 0.00, cbs: 3.72, ibs: 2.24, total: 5.96 },
    2032: { pis: 0.00, cbs: 3.72, ibs: 2.99, total: 6.71 },
    2033: { pis: 0.00, cbs: 3.72, ibs: 7.48, total: 11.20 },
  },
  8.4: {
    2026: { pis: 2.65, cbs: 0.90, ibs: 0.10, total: 3.65 },
    2027: { pis: 0.00, cbs: 2.79, ibs: 0.10, total: 2.89 },
    2028: { pis: 0.00, cbs: 2.79, ibs: 0.10, total: 2.89 },
    2029: { pis: 0.00, cbs: 2.79, ibs: 0.56, total: 3.35 },
    2030: { pis: 0.00, cbs: 2.79, ibs: 1.12, total: 3.91 },
    2031: { pis: 0.00, cbs: 2.79, ibs: 1.68, total: 4.47 },
    2032: { pis: 0.00, cbs: 2.79, ibs: 2.24, total: 5.03 },
    2033: { pis: 0.00, cbs: 2.79, ibs: 5.61, total: 8.40 },
  }
};

export const generateTransitionData = (finalRate: number): TaxData[] => {
  const years = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];
  const scenarioData = RAW_DATA[finalRate] || RAW_DATA[28.0];

  return years.map(year => {
    const data = scenarioData[year];
    let insight = "";

    if (year === 2026) {
      insight = "Simulação e Teste: Início da CBS e IBS compensáveis com tributos federais.";
    } else if (year === 2027 || year === 2028) {
      insight = "Extinção Federal: PIS/COFINS extintos. CBS assume patamar proporcional.";
    } else if (year === 2029) {
      insight = "Início da Transição IBS: Elevação gradual do IBS e redução de impostos locais.";
    } else if (year === 2033) {
      insight = "Vigência Plena: Novo sistema IVA Dual totalmente implementado.";
    }

    return {
      year,
      pisCofinsRate: data.pis,
      pisCofinsStatus: data.pis > 0 ? 'active' : 'extinct',
      ibsRate: data.ibs,
      cbsRate: data.cbs,
      totalRate: data.total,
      description: year === 2026 ? "Simulação/Teste" : year >= 2033 ? "Modelo Final" : "Transição IBS",
      strategicInsight: insight
    };
  });
};

export const chartDataConverter = (data: TaxData[]) => data.map(d => ({
  year: d.year,
  "PIS/COFINS": Number(d.pisCofinsRate.toFixed(2)),
  "IBS (Novo)": Number(d.ibsRate.toFixed(2)),
  "CBS (Novo)": Number(d.cbsRate.toFixed(2)),
  "Total": Number(d.totalRate.toFixed(2))
}));