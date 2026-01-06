import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Dot
} from 'recharts';
import { TaxData } from '../../types';
import { chartDataConverter } from '../../data';

interface Props {
  data: TaxData[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + (entry.value || 0), 0);
    return (
      <div className="bg-white border-2 border-[#F6B221] rounded-lg shadow-2xl p-4 text-[13px] animate-fade-in pointer-events-none">
        <p className="font-extrabold text-[#1E1423] mb-3 border-b-2 border-[#F1F5F9] pb-2 flex justify-between">
            <span>Ano:</span> 
            <span className="text-[#E5A100] text-lg leading-none">{label}</span>
        </p>
        <div className="space-y-2">
          {/* Invertemos a ordem de exibição no tooltip para o TOTAL REAL ficar embaixo e os componentes em cima, acompanhando a pilha visual */}
          {payload.slice().reverse().map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex justify-between items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></span>
                <span className="text-[#6B7280] font-bold uppercase text-[10px] tracking-tight">{entry.name}:</span>
              </span>
              <span className="font-mono font-bold text-[#1E1423] text-[14px]">{entry.value.toFixed(2)}%</span>
            </div>
          ))}
          <div className="flex justify-between items-center gap-6 pt-2 mt-2 border-t-2 border-[#F1F5F9] font-black">
            <span className="text-[#1E1423] uppercase text-[11px] tracking-tighter">TOTAL REAL:</span>
            <span className="font-mono text-[18px] text-[#E5A100] tracking-tighter">{total.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const GeneralChart: React.FC<Props> = ({ data, selectedYear, onYearChange }) => {
  const chartData = chartDataConverter(data);
  
  // Eixo Y fixo global conforme solicitado: 0% a 30%
  const yDomain = [0, 30];
  const yTicks = [0, 5, 10, 15, 20, 25, 30];

  const handleChartClick = (state: any) => {
    if (state && state.activeLabel) {
      onYearChange(Number(state.activeLabel));
    }
  };

  // Custom Dots for highlighting selection
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.year === selectedYear) {
      return (
        <Dot cx={cx} cy={cy} r={5} fill="white" stroke={props.stroke} strokeWidth={3} />
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] w-full select-none cursor-crosshair">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          onClick={handleChartClick}
          margin={{
            top: 25,
            right: 15,
            left: -15,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey="year" 
            tick={{fontSize: 12, fill: '#1E1423', fontWeight: 800}} 
            axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 600}} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={yDomain}
            ticks={yTicks}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            position={{ y: 0 }} 
            isAnimationActive={false} 
          />
          
          <ReferenceLine 
            x={selectedYear} 
            stroke="#F6B221" 
            strokeWidth={3} 
            strokeDasharray="4 4"
            isFront={true}
          />
          
          {/* Ordem de empilhamento: PIS (base), CBS (meio), IBS (topo) */}
          <Area 
            type="linear" 
            dataKey="PIS/COFINS" 
            stackId="1" 
            stroke="#94a3b8" 
            fill="#EEF0F3" 
            name="PIS/COFINS"
            animationDuration={600}
            fillOpacity={1}
            isAnimationActive={true}
            activeDot={renderDot}
          />

          <Area 
            type="linear" 
            dataKey="CBS (Novo)" 
            stackId="1" 
            stroke="#D97706" 
            fill="#E5A100" 
            name="CBS (Federal)"
            animationDuration={600}
            fillOpacity={0.9}
            isAnimationActive={true}
            activeDot={renderDot}
          />
          <Area 
            type="linear" 
            dataKey="IBS (Novo)" 
            stackId="1" 
            stroke="#F59E0B" 
            fill="#FCD34D" 
            name="IBS (Est/Mun)"
            animationDuration={600}
            fillOpacity={0.8}
            isAnimationActive={true}
            activeDot={renderDot}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeneralChart;