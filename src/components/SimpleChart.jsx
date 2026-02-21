import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

//register Chart.js
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

    //bar chart options for popup
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                //x axis label
                title: {
                    display: true,
                    text: xAxisTitle,
                    font: { size: 10 },
                },
                ticks: { font: { size: 10 } },
                grid: { color: 'rgba(148, 163, 184, 0.25)' },
            },
            y: {
                //y axis label
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
                    //format tooltip as readable population count
                    label(context) {
                        const value = Number(context.raw || 0)
                        return `${value.toLocaleString()} residents`
                    },
                },
            },
        },
    }

    return (
        //container controls rendered chart height inside popup
        <div style={{ height, width: '100%', marginTop: 6 }}>
            <Bar data={data} options={options} />
        </div>
    )
}