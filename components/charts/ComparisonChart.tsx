import React from 'react';
import {
  BarChart,
  Bar,
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

const ComparisonChart: React.FC<Props> = ({ data }) => {
  const chartData = chartDataConverter(data);

  return (
    <div className="h-[400px] w-full select-none">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
             dataKey="year" 
             tick={{fontSize: 12, fill: '#9CA3AF'}}
             axisLine={false}
             tickLine={false}
          />
          <YAxis 
            hide={false} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
            tick={{fontSize: 11, fill: '#9CA3AF'}}
            width={40}
          />
          <Tooltip 
            cursor={{fill: '#F8F9FB'}}
            contentStyle={{ borderRadius: '4px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
          />
          <Legend wrapperStyle={{paddingTop: '20px', fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase'}} />
          
          <Bar 
            dataKey="PIS/COFINS" 
            stackId="a" 
            fill="#EEF0F3" 
            name="Antigo (PIS/COFINS)" 
            radius={[0, 0, 0, 0]} 
          />
          
          <Bar 
            dataKey="CBS (Novo)" 
            stackId="a" 
            fill="#E5A100" 
            name="Novo (CBS)" 
            fillOpacity={0.9}
          />
           <Bar 
            dataKey="IBS (Novo)" 
            stackId="a" 
            fill="#FCD34D" 
            name="Novo (IBS)" 
            radius={[2, 2, 0, 0]}
            fillOpacity={0.7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;