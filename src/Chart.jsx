import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Chart({x,y1,y2}){
    
  const data = {
    labels: x, // X-axis labels
    datasets: [
      {
        label: "Actual Temperature", // Name shown in legend & tooltip
        data:y1, // Y-axis values
        borderColor: "blue",   // Line color
        backgroundColor: "white", // Fill color under line
        tension: 0.4,          // Smooth curves (0 = straight lines)          
      },
      {
        label: "Feels Like",
        data:y2, 
        borderColor: "red",  
        backgroundColor: "white", 
        tension: 0.4,               
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Legend position
      },
    },
    scales: {
    y: {
      beginAtZero: true, // ✅ ensures Y-axis starts from 0
    },
  },
  };
  return <div className="chart"><Line data={data} options={options}  />;</div>
};
export default Chart;