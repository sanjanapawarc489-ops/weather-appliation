import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GlassCard from '../ui/GlassCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HumidityChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.forecast) {
    return (
      <GlassCard className="text-center py-12">
        <div className="text-4xl mb-4">💧</div>
        <h3 className="text-lg font-semibold text-purple-200 mb-2">Humidity Chart</h3>
        <p className="text-gray-400">No forecast data available</p>
      </GlassCard>
    );
  }

  const { forecast } = forecastData;
  const dates = Object.keys(forecast);
  const humidity = dates.map(date => forecast[date].humidity);

  const chartData = {
    labels: dates.map(date => new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short' 
    })),
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidity,
        backgroundColor: 'rgba(56, 189, 248, 0.6)',
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
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
          }
        }
      },
      title: {
        display: true,
        text: 'Humidity Forecast',
        color: '#c084fc',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#c084fc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(56, 189, 248, 0.5)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94a3b8',
          callback: function(value) {
            return value + '%';
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
    }
  };

  return (
    <GlassCard className="h-80">
      <Bar data={chartData} options={chartOptions} />
    </GlassCard>
  );
};

export default HumidityChart;