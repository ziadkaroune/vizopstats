import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, Tooltip, Legend, LinearScale, Title } from 'chart.js';

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title);

export default function ScatterChart({ dataPoints }) {
  const scatterData = {
    datasets: [
      {
        label: 'Year vs. Value',
        data: dataPoints
          .filter(dp => dp.date && dp.value)
          .map(dp => ({
            x: parseInt(dp.date),
            y: parseFloat(dp.value)
          })),
        backgroundColor: '#00a63e',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Scatter Plot: Year vs. Value',
        color: 'white',
        font: {
          size: 18
        }
      },
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: 'white'
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        },
        type: 'linear',
        position: 'bottom'
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: 'white'
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255,255,255,0.1)'
        }
      }
    }
  };

  return (
    <div className="w-full my-6">
      <Scatter data={scatterData} options={options} />
    </div>
  );
}
