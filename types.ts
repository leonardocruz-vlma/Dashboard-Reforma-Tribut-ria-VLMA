export interface TaxData {
  year: number;
  
  // Breakdown of Old System
  pisCofinsRate: number; // Federal (ends 2027)
  pisCofinsStatus: 'active' | 'extinguishing' | 'extinct';
  
  // New System
  ibsRate: number;
  cbsRate: number;
  
  totalRate: number; // Agora "Alíquota Total"
  description: string;
  strategicInsight: string;
}

export interface TaxScenario {
  id: string;
  label: string;
  rate: number;
  description: string;
  appliesTo: string;
}

export interface ChartDataPoint {
  year: number;
  "PIS/COFINS": number;
  "IBS (Novo)": number;
  "CBS (Novo)": number;
}