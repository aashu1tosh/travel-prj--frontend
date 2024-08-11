// src/Dashboard.tsx
import DashboardBox from '@ui/admin/molecules/DashboardBox/DashboardBox';
import LineChart from '@ui/admin/molecules/LineChart';
import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className='dashboard'>
            <h1 className='custom-h'>Dashboard</h1>

            <div className='stats-box'>
                <DashboardBox title='New Users' number='1000' growth='12' />
                <DashboardBox title='New Messages' number='10000' growth='45' />
                <DashboardBox title='Sales' number='850' growth='19' />
                <DashboardBox
                    title='Satisfied Customers'
                    number='12000'
                    growth='25'
                />
            </div>

            <div className='chart-container'>
                <div className='chart'>
                    {/* <h2>Growth of our site</h2> */}
                    <LineChart key={Math.random() * 99} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
