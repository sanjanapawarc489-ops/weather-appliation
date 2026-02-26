import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import GlassCard from '../ui/GlassCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TemperatureChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.forecast) {
    return (
      <GlassCard className="text-center py-12">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-purple-200 mb-2">Temperature Chart</h3>
        <p className="text-gray-400">No forecast data available</p>
      </GlassCard>
    );
  }

  const { forecast } = forecastData;
  const dates = Object.keys(forecast);
  const temperatures = dates.map(date => forecast[date].temperature);
  const minTemps = dates.map(date => forecast[date].mintemp);
  const maxTemps = dates.map(date => forecast[date].maxtemp);

  const chartData = {
    labels: dates.map(date => new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })),
    datasets: [
      {
        label: 'Average Temperature',
        data: temperatures,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Min Temperature',
        data: minTemps,
        borderColor: 'rgb(56, 189, 248)',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Max Temperature',
        data: maxTemps,
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Temperature Forecast',
        color: '#c084fc',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#c084fc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(139, 92, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}°C`;
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94a3b8',
          callback: function(value) {
            return value + '°C';
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94a3b8'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <GlassCard className="h-96">
      <Line data={chartData} options={chartOptions} />
    </GlassCard>
  );
};

export default TemperatureChart;