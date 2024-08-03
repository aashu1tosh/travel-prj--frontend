// src/Dashboard.tsx
import BarChart from '@ui/admin/molecules/BarChart';
import LineChart from '@ui/admin/molecules/LineChart';
import PieChart from '@ui/admin/molecules/PieChart';
import ScatterChart from '@ui/admin/molecules/ScatterChart';
import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <div className='chart-container'>
                <div className='chart'>
                    <h2>Bar Chart</h2>
                    <BarChart />
                </div>
                <div className='chart'>
                    <h2>Pie Chart</h2>
                    <PieChart />
                </div>
                <div className='chart'>
                    <h2>Line Chart</h2>
                    <LineChart />
                </div>
                <div className='chart'>
                    <h2>Scatter Chart</h2>
                    <ScatterChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
