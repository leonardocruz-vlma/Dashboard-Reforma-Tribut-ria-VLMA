import { TaxData, TaxScenario } from './types';

export const scenarios: TaxScenario[] = [
  { 
    id: 'padrao-teto', 
    label: '28,0%', 
    rate: 28.0, 
    description: 'Alíquota geral',
    appliesTo: 'Comércio, indústria e serviços sem regime específico.'
  },
  { 
    id: 'padrao-ref', 
    label: '26,5%', 
    rate: 26.5, 
    description: 'Referência oficial (MF)',
    appliesTo: 'Estimativa oficial do Ministério da Fazenda para neutralidade.'
  },
  { 
    id: 'red-30', 
    label: '19,6%', 
    rate: 19.6, 
    description: 'Redução de 30%',
    appliesTo: 'Serviços profissionais regulamentados (Advogados, Engenheiros, etc).'
  },
  { 
    id: 'red-40', 
    label: '16,8%', 
    rate: 16.8, 
    description: 'Redução de 40%',
    appliesTo: 'Regimes específicos definidos em Lei Complementar.'
  },
  { 
    id: 'red-50', 
    label: '14,0%', 
    rate: 14.0, 
    description: 'Redução de 50%',
    appliesTo: 'Imóveis, transporte coletivo, alimentos e insumos.'
  },
  { 
    id: 'red-60', 
    label: '11,2%', 
    rate: 11.2, 
    description: 'Redução de 60%',
    appliesTo: 'Educação, saúde, medicamentos e dispositivos médicos.'
  },
  { 
    id: 'red-70', 
    label: '8,4%', 
    rate: 8.4, 
    description: 'Redução máxima',
    appliesTo: 'Cenários super reduzidos (ex: Projetos Culturais, cesta básica estendida).'
  }
];

// Helper to generate data based on the selected final rate
export const generateTransitionData = (finalRate: number): TaxData[] => {
  // Estimated split for Final State: CBS ~35%, IBS ~65%
  const finalCbs = finalRate * 0.35;
  const finalIbs = finalRate * 0.65;
  
  // Estimated split for Old System (Illustrative reference)
  // Visual simplification: PIS/COFINS approx 25% of burden, ICMS/ISS approx 75%
  const basePisCofins = finalRate * 0.25; 
  const baseIcmsIss = finalRate * 0.75;

  return [
    {
      year: 2025,
      currentSystemPct: 100,
      pisCofinsRate: basePisCofins,
      pisCofinsStatus: 'active',
      icmsIssRate: baseIcmsIss,
      icmsIssTransitionFactor: 100,
      ibsRate: 0,
      cbsRate: 0,
      totalRate: 0, // Explicitly 0 for New System load in 2025 based on rules
      description: "Sistema Atual (Pré-Reforma)",
      strategicInsight: "Vigência plena do sistema cumulativo (PIS/COFINS + ICMS/ISS). O foco estratégico deve ser a revisão do compliance atual (NCMs, créditos) antes da migração."
    },
    {
      year: 2026,
      currentSystemPct: 100,
      pisCofinsRate: basePisCofins,
      pisCofinsStatus: 'active',
      icmsIssRate: baseIcmsIss,
      icmsIssTransitionFactor: 100,
      ibsRate: 0.1,
      cbsRate: 0.9,
      totalRate: 1.0, 
      description: "Fase de Testes (Cobrança Simbólica)",
      strategicInsight: "Ano crucial para adaptação de ERPs. Cobra-se apenas 1% (0,9% CBS + 0,1% IBS), compensável com PIS/COFINS. Teste de conformidade sem impacto financeiro real."
    },
    {
      year: 2027,
      currentSystemPct: 75,
      pisCofinsRate: 0, 
      pisCofinsStatus: 'extinct',
      icmsIssRate: baseIcmsIss,
      icmsIssTransitionFactor: 100,
      ibsRate: 0.05, 
      cbsRate: finalCbs, 
      totalRate: 0.05 + finalCbs,
      description: "Extinção PIS/COFINS",
      strategicInsight: "Marco Federal: PIS e COFINS são extintos (alíquota zero). A CBS entra com alíquota cheia. O IPI tem alíquotas reduzidas a zero (exceto Zona Franca)."
    },
    {
      year: 2028,
      currentSystemPct: 75,
      pisCofinsRate: 0,
      pisCofinsStatus: 'extinct',
      icmsIssRate: baseIcmsIss,
      icmsIssTransitionFactor: 100,
      ibsRate: 0.05,
      cbsRate: finalCbs,
      totalRate: 0.05 + finalCbs,
      description: "Estabilização Federal",
      strategicInsight: "Ano de ajuste da CBS plena. As empresas já operam no novo modelo federal, mas ainda convivem com ICMS/ISS cheios. Atenção à tomada de crédito sobre a CBS."
    },
    {
      year: 2029,
      currentSystemPct: 67.5,
      pisCofinsRate: 0,
      pisCofinsStatus: 'extinct',
      icmsIssRate: baseIcmsIss * 0.9, 
      icmsIssTransitionFactor: 90,
      ibsRate: finalIbs * 0.1, 
      cbsRate: finalCbs,
      totalRate: finalCbs + (finalIbs * 0.1),
      description: "Início Transição ICMS/ISS (90%)",
      strategicInsight: "Início do escalonamento do IBS. ICMS e ISS são reduzidos para 90% da alíquota original. O sistema se torna verdadeiramente híbrido e complexo."
    },
    {
      year: 2030,
      currentSystemPct: 60,
      pisCofinsRate: 0,
      pisCofinsStatus: 'extinct',
      icmsIssRate: baseIcmsIss * 0.8, 
      icmsIssTransitionFactor: 80,
      ibsRate: finalIbs * 0.2, 
      cbsRate: finalCbs,
      totalRate: finalCbs + (finalIbs * 0.2),
      description: "Transição ICMS/ISS (80%)",
      strategicInsight: "Gestão simultânea de créditos. O peso do IBS aumenta (20%), exigindo controle rigoroso do saldo credor do ICMS remanescente."
    },
    {
      year: 2031,
      currentSystemPct: 52.5,
      pisCofinsRate: 0,
      pisCofinsStatus: 'extinct',
      icmsIssRate: baseIcmsIss * 0.7, 
      icmsIssTransitionFactor: 70,
      ibsRate: finalIbs * 0.3, 
      cbsRate: finalCbs,
      totalRate: finalCbs + (finalIbs * 0.3),
      description: "Transição ICMS/ISS (70%)",
      strategicInsight: "Ponto de virada (Tipping Point). Com 30% de IBS e CBS cheia, a lógica do IVA (não-cumulatividade) passa a ser dominante no fluxo de caixa tributário."
    },
    {
      year: 2032,
      currentSystemPct: 45,
      pisCofinsRate: 0,
      pisCofinsStatus: 'extinct',
      icmsIssRate: baseIcmsIss * 0.6, 
      icmsIssTransitionFactor: 60,
      ibsRate: finalIbs * 0.4, 
      cbsRate: finalCbs,
      totalRate: finalCbs + (finalIbs * 0.4),
      description: "Transição ICMS/ISS (60%)",
      strategicInsight: "Reta final da transição escalonada. Revisão profunda de contratos de longo prazo para garantir que cláusulas tributárias reflitam o cenário de 2033."
    },
    {
      year: 2033,
      currentSystemPct: 0,
      pisCofinsRate: 0,
      pisCofinsStatus: 'extinct',
      icmsIssRate: 0,
      icmsIssTransitionFactor: 0,
      ibsRate: finalIbs, 
      cbsRate: finalCbs, 
      totalRate: finalRate,
      description: "Vigência Plena (2033)",
      strategicInsight: "Consolidação total. Extinção definitiva de ICMS e ISS. Sistema puramente baseado em IVA Dual (IBS + CBS), com cobrança no destino."
    }
  ];
};

export const chartDataConverter = (data: TaxData[]) => data.map(d => ({
  year: d.year,
  "ICMS/ISS": Number(d.icmsIssRate.toFixed(2)),
  "PIS/COFINS": Number(d.pisCofinsRate.toFixed(2)),
  "IBS (Novo)": Number(d.ibsRate.toFixed(2)),
  "CBS (Novo)": Number(d.cbsRate.toFixed(2)),
}));