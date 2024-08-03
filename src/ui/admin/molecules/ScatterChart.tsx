// src/components/ScatterChart.tsx
import {
    Chart as ChartJS,
    Legend,
    LinearScale,
    PointElement,
    ScatterController,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
    ScatterController,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const ScatterChart: React.FC = () => {
    const data = {
        datasets: [
            {
                label: 'Scatter Dataset',
                data: [
                    { x: -10, y: 0 },
                    { x: 0, y: 10 },
                    { x: 10, y: 5 },
                    { x: 5, y: -5 },
                    { x: 0, y: 2 },
                    { x: 6, y: 0 },
                    { x: 3, y: 5 },
                    { x: 2, y: -5 },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (
                            context.parsed.x !== null &&
                            context.parsed.y !== null
                        ) {
                            label += `(${context.parsed.x}, ${context.parsed.y})`;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return <Scatter data={data} options={options} />;
};

export default ScatterChart;
