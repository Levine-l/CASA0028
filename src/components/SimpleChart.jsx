import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SimpleChart({
    data,
    title = 'Distance to work distribution',
    height = 140,
    showLegend = false,
    xAxisTitle = 'Distance(km)',
    yAxisTitle = 'Residents',
}) {
    if (!data) return null

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: xAxisTitle,
                    font: { size: 10 },
                },
                ticks: { font: { size: 10 } },
                grid: { color: 'rgba(148, 163, 184, 0.25)' },
            },
            y: {
                title: {
                    display: true,
                    text: yAxisTitle,
                    font: { size: 10 },
                },
                ticks: { font: { size: 10 } },
                grid: { display: false },
            },
        },
        plugins: {
            legend: {
                display: showLegend,
                position: 'top',
            },
            title: {
                display: Boolean(title),
                text: title,
                font: { size: 11 },
            },
            tooltip: {
                callbacks: {
                    label(context) {
                        const value = Number(context.raw || 0)
                        return `${value.toLocaleString()} residents`
                    },
                },
            },
        },
    }

    return (
        <div style={{ height, width: '100%', marginTop: 6 }}>
            <Bar data={data} options={options} />
        </div>
    )
}