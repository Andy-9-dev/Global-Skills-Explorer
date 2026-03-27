import { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

export const SkillDemandChart = () => {
  const data = {
    labels: ['React', 'Node.js', 'Python', 'TypeScript', 'Vue.js', 'Angular', 'Go', 'Rust'],
    datasets: [
      {
        label: 'Job Demand',
        data: [8500, 7200, 6800, 7500, 4200, 3800, 5100, 4900],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#64748b',
          font: { size: 12, weight: 'bold' },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} jobs`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: function(value) {
            return value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: { size: 11, weight: '500' }
        }
      }
    }
  }

  return (
    <div className="w-full h-80 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Top Skills in Demand</h3>
      <Line data={data} options={options} />
    </div>
  )
}

export const SalaryByRegionChart = () => {
  const data = {
    labels: ['North America', 'Europe', 'Asia', 'Oceania', 'Latin America', 'Africa'],
    datasets: [
      {
        label: 'Average Salary (USD)',
        data: [145000, 110000, 75000, 92000, 58000, 45000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(14, 165, 233, 0.8)'
        ],
        borderColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#22c55e',
          '#fb923c',
          '#0ea5e9'
        ],
        borderWidth: 2,
        borderRadius: 8,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#64748b',
          font: { size: 12, weight: 'bold' },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.x.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: function(value) {
            return `$${(value / 1000).toFixed(0)}k`
          }
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: { size: 11, weight: '500' }
        }
      }
    }
  }

  return (
    <div className="w-full h-80 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Average Salary by Region</h3>
      <Bar data={data} options={options} />
    </div>
  )
}

export const JobMarketShareChart = () => {
  const data = {
    labels: ['Tech', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Other'],
    datasets: [
      {
        label: 'Market Share',
        data: [35, 20, 15, 12, 10, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(14, 165, 233, 0.8)'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#64748b',
          font: { size: 12, weight: 'bold' },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`
          }
        }
      }
    }
  }

  return (
    <div className="w-full h-80 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Job Market Share by Industry</h3>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export const CareerGrowthChart = () => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Tech Jobs',
        data: [45000, 52000, 68000, 85000, 105000, 128000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      },
      {
        label: 'Finance Jobs',
        data: [38000, 40000, 42000, 44000, 46000, 48000],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart'
        }
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#64748b',
          font: { size: 12, weight: 'bold' },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} jobs`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: function(value) {
            return (value / 1000).toFixed(0) + 'k'
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: { size: 11, weight: '500' }
        }
      }
    }
  }

  return (
    <div className="w-full h-80 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Career Growth Trends (2019-2024)</h3>
      <Line data={data} options={options} />
    </div>
  )
}
