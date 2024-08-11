import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

const LineChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                        datasets: [
                            {
                                label: 'Users Growth',
                                data: [
                                    30, 20, 50, 40, 60, 70, 80, 120, 350, 600,
                                    1200, 1800,
                                ],
                                fill: false,
                                borderColor: '#62a944',
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Users over time',
                            },
                        },
                    },
                });

                return () => {
                    myChart.destroy();
                };
            }
        }
    }, []);

    return <canvas ref={canvasRef} />;
};

export default LineChart;
