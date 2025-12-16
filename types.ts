export interface TaxData {
  year: number;
  currentSystemPct: number; // Percentage of the old system remaining (0-100 scale for calculation)
  
  // Breakdown of Old System
  pisCofinsRate: number; // Federal (ends 2027)
  pisCofinsStatus: 'active' | 'extinguishing' | 'extinct';
  
  icmsIssRate: number;   // Subnational (ends 2033)
  icmsIssTransitionFactor: number; // 100, 90, 80... 0
  
  // New System
  ibsRate: number;
  cbsRate: number;
  
  totalRate: number;
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
  "ICMS/ISS": number;
  "PIS/COFINS": number;
  "IBS (Novo)": number;
  "CBS (Novo)": number;
}
