// LineChart.jsx
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChart = ({ dataPoints }) => {
  const chartData = {
    labels: dataPoints.map(point => point.date).reverse(),
    datasets: [
      {
        label: 'Expenditure (% of GDP)',
        data: dataPoints.map(point => point.value).reverse(),
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74,222,128,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-white">Yearly Government Expenditure</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
