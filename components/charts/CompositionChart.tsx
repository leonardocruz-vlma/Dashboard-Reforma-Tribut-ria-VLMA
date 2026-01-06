import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TaxData } from '../../types';

interface Props {
  data: TaxData;
}

const CompositionChart: React.FC<Props> = ({ data }) => {
  const pieData = [
    { name: 'PIS/COFINS', value: data.pisCofinsRate },
    { name: 'CBS', value: data.cbsRate },
    { name: 'IBS', value: data.ibsRate },
  ].filter(item => item.value > 0.001);

  const COLORS = ['#cbd5e1', '#E5A100', '#FCD34D'];

  return (
    <div className="h-[100px] w-[100px] flex-shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={45}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(2)}%`}
            contentStyle={{ borderRadius: '4px', fontSize: '12px', padding: '4px' }}
           />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompositionChart;