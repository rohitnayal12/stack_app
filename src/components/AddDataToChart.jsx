import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function AddDataToChart({ chartData, updateChartData }) {
  const [month, setMonth] = useState('');
  const [attendance, setAttendance] = useState('');
  const [performance, setPerformance] = useState('');
  const [myChart, setMyChart] = useState(null); // Store the chart instance
console.log(chartData)
  useEffect(() => {
    // Create the chart when the component mounts
    if (!myChart) {
      const ctx = document.getElementById('chartCanvas').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.label || [],
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
      setMyChart(newChart); // Store the chart instance
    }
  }, [chartData, myChart]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a new data point
    const newDataPoint = {
      month: month,
      attendance: parseInt(attendance),
      performance: parseInt(performance),
    };

    // Update the chart data in the parent component
    updateChartData({
      labels: [...chartData.labels, newDataPoint.month],
      attendanceData: [...chartData.attendanceData, newDataPoint.attendance],
      performanceData: [...chartData.performanceData, newDataPoint.performance],
    });

    // Update the chart with the new data point
    if (myChart) {
      myChart.data.labels.push(newDataPoint.month);
      myChart.data.datasets[0].data.push(newDataPoint.attendance);
      myChart.data.datasets[1].data.push(newDataPoint.performance);
      myChart.update(); // Update the chart
    }

    // Clear the form inputs
    setMonth('');
    setAttendance('');
    setPerformance('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="month">Month:</label>
        <input
          type="text"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <label htmlFor="attendance">Attendance:</label>
        <input
          type="number"
          id="attendance"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          required
        />
        <label htmlFor="performance">Performance:</label>
        <input
          type="number"
          id="performance"
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
          required
        />
        <button type="submit">Add Data</button>
      </form>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <canvas id="chartCanvas"></canvas>
      </div>
    </div>
  );
}

export default AddDataToChart;
