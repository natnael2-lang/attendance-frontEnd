import React from 'react';
import "./flex.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CurveChart = () => {

    const data = [
        { name: 'Page A', uv: 4000},
        { name: 'Page B', uv: 5000},
        { name: 'Page C', uv: 6000},
        { name: 'Page D', uv: 7000},
        { name: 'Page E', uv: 8000},
        { name: 'Page F', uv: 9000},
      ];
  return (
    <div className="chart-container">
      <h2 className="chart-title">UV Data Over Time</h2>
      <LineChart width={400} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" stroke="#555" fontSize={12}  />
        <YAxis  stroke="#555" fontSize={10} />
        <Tooltip fontSize={3} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="uv" 
          stroke="#ff7300" 
          strokeWidth={1} 
          dot={{ fill: '#ff7300', strokeWidth: 1 }} 
        />
      </LineChart>
    </div>
  );
};

export default CurveChart;