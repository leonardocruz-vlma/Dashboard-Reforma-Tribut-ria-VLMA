import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TaxData } from '../../types';
import { chartDataConverter } from '../../data';

interface Props {
  data: TaxData[];
}

const GeneralChart: React.FC<Props> = ({ data }) => {
  const chartData = chartDataConverter(data);
  const [hidden, setHidden] = useState<string[]>([]);

  const toggleSeries = (dataKey: string) => {
    setHidden((prev) => 
      prev.includes(dataKey) ? prev.filter((k) => k !== dataKey) : [...prev, dataKey]
    );
  };

  const legendFormatter = (value: string, entry: any) => {
    const isHidden = hidden.includes(value);
    return <span style={{ color: isHidden ? '#cbd5e1' : '#4B5563', fontSize: '11px', fontWeight: isHidden ? 'normal' : '600', cursor: 'pointer', textTransform: 'uppercase' }}>{value}</span>;
  };

  return (
    <div className="h-[400px] w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey="year" 
            tick={{fontSize: 10, fill: '#9CA3AF'}} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{fontSize: 10, fill: '#9CA3AF'}} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '4px', border: '1px solid #E5E7EB', boxShadow: '0 4px 10px -2px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            itemStyle={{ padding: 0 }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
          />
          <Legend 
            wrapperStyle={{paddingTop: '20px'}} 
            formatter={legendFormatter}
            onClick={(e) => toggleSeries(e.value)}
            iconType="circle"
          />
          
          {/* SISTEMA ANTIGO (Tons de Cinza) */}
          <Area 
            type="monotone" 
            dataKey="ICMS/ISS" 
            stackId="1" 
            stroke="none" 
            fill="#E5E7EB" 
            name="ICMS/ISS (Antigo)"
            animationDuration={800}
            hide={hidden.includes("ICMS/ISS (Antigo)")}
            fillOpacity={1}
          />
           <Area 
            type="monotone" 
            dataKey="PIS/COFINS" 
            stackId="1" 
            stroke="none" 
            fill="#EEF0F3" 
            name="PIS/COFINS (Antigo)"
            animationDuration={800}
            hide={hidden.includes("PIS/COFINS (Antigo)")}
            fillOpacity={1}
          />

          {/* NOVO SISTEMA (Yellow VLMA) */}
          {/* CBS - Amarelo Forte */}
          <Area 
            type="monotone" 
            dataKey="CBS (Novo)" 
            stackId="1" 
            stroke="#E5A100" 
            fill="#E5A100" 
            name="CBS (Federal)"
            animationDuration={800}
            hide={hidden.includes("CBS (Federal)")}
            strokeWidth={0}
            fillOpacity={0.9}
          />
          {/* IBS - Amarelo Fraco */}
          <Area 
            type="monotone" 
            dataKey="IBS (Novo)" 
            stackId="1" 
            stroke="#FCD34D" 
            fill="#FCD34D" 
            name="IBS (Est/Mun)"
            animationDuration={800}
            hide={hidden.includes("IBS (Est/Mun)")}
            strokeWidth={0}
            fillOpacity={0.7}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeneralChart;