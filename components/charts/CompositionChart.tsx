import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TaxData } from '../../types';

interface Props {
  data: TaxData;
}

const CompositionChart: React.FC<Props> = ({ data }) => {
  const currentSystemRate = data.pisCofinsRate + data.icmsIssRate;

  const pieData = [
    { name: 'Atual', value: currentSystemRate },
    { name: 'CBS', value: data.cbsRate },
    { name: 'IBS', value: data.ibsRate },
  ].filter(item => item.value > 0.01);

  const COLORS = ['#94a3b8', '#38bdf8', '#34d399'];

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