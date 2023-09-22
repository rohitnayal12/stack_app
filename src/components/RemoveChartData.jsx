import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RemoveChartData({ chartData, updateChartData }) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const chartRef = useRef(null); // Reference to the chart instance
console.log(chartData)
  useEffect(() => {
    if (chartRef.current) {
      // Destroy the existing chart if it exists
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('chartCanvas').getContext('2d');

    // Create a new chart with the updated chartData
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Attendance',
            data: chartData.attendanceData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Performance',
            data: chartData.performanceData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    // Update the chartRef with the new chart instance
    chartRef.current = newChart;
  }, [chartData]);

  const handleRemoveSubmit = (e) => {
    e.preventDefault();

    if (selectedMonth) {
      // Find the index of the selected month in labels
      const selectedIndex = chartData.labels.indexOf(selectedMonth);

      if (selectedIndex !== -1) {
        // Remove the data point at the selected index
        chartData.labels.splice(selectedIndex, 1);
        chartData.attendanceData.splice(selectedIndex, 1);
        chartData.performanceData.splice(selectedIndex, 1);

        // Update the chartData in the parent component
        updateChartData({ ...chartData });

        // Clear the form input
        setSelectedMonth('');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleRemoveSubmit}>
        <label htmlFor="selectedMonth">Select Month to Remove:</label>
        <select
          id="selectedMonth"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          required
        >
          <option value="">Select Month</option>
          {chartData.labels?.map((label, index) => (
            <option key={index} value={label}>
              {label}
            </option>
          ))}
        </select>
        <button type="submit">Remove Data</button>
      </form>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <canvas id="chartCanvas"></canvas>
      </div>
    </div>
  );
}

export default RemoveChartData;
