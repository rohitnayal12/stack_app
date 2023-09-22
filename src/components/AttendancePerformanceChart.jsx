import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

function AttendancePerformanceChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    attendanceData: [],
    performanceData: [],
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  const [newMonth, setNewMonth] = useState('');
  const [newAttendance, setNewAttendance] = useState('');
  const [newPerformance, setNewPerformance] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('attendancePerformanceChart').getContext('2d');

    chartRef.current = new Chart(ctx, {
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
  }, [chartData]);

  const handleAddData = () => {
    if (newMonth && newAttendance && newPerformance) {
      const updatedLabels = [...chartData.labels, newMonth];
      const updatedAttendanceData = [...chartData.attendanceData, parseInt(newAttendance)];
      const updatedPerformanceData = [...chartData.performanceData, parseInt(newPerformance)];

      setChartData({
        labels: updatedLabels,
        attendanceData: updatedAttendanceData,
        performanceData: updatedPerformanceData,
      });

      setNewMonth('');
      setNewAttendance('');
      setNewPerformance('');
    }
  };

  const handleRemoveData = () => {
    if (selectedMonth) {
      const selectedIndex = chartData.labels.indexOf(selectedMonth);

      if (selectedIndex !== -1) {
        const updatedLabels = chartData.labels.filter((_, index) => index !== selectedIndex);
        const updatedAttendanceData = chartData.attendanceData.filter((_, index) => index !== selectedIndex);
        const updatedPerformanceData = chartData.performanceData.filter((_, index) => index !== selectedIndex);

        setChartData({
          labels: updatedLabels,
          attendanceData: updatedAttendanceData,
          performanceData: updatedPerformanceData,
        });

        setSelectedMonth('');
        setIsEditing(false);
      }
    }
  };

  const handleEditData = () => {
    if (selectedMonth && newAttendance && newPerformance && isEditing) {
      const updatedAttendanceData = [...chartData.attendanceData];
      const updatedPerformanceData = [...chartData.performanceData];

      if (editIndex !== -1) {
        updatedAttendanceData[editIndex] = parseInt(newAttendance);
        updatedPerformanceData[editIndex] = parseInt(newPerformance);

        setChartData({
          ...chartData,
          attendanceData: updatedAttendanceData,
          performanceData: updatedPerformanceData,
        });

        setSelectedMonth('');
        setNewAttendance('');
        setNewPerformance('');
        setIsEditing(false);
        setEditIndex(-1);
      }
    }
  };

  const handleSelectMonth = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    if (selectedMonth && chartData.labels.includes(selectedMonth)) {
      const selectedIndex = chartData.labels.indexOf(selectedMonth);
      setNewAttendance(chartData.attendanceData[selectedIndex].toString());
      setNewPerformance(chartData.performanceData[selectedIndex].toString());
      setIsEditing(true);
      setEditIndex(selectedIndex);
    } else {
      setIsEditing(false);
      setEditIndex(-1);
    }
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Attendance Performance Chart
        </Text>
        <Box w="80%" m="0 auto">
          <canvas id="attendancePerformanceChart"></canvas>
        </Box>
      </Box>
      <FormControl>
        <FormLabel>Select Month:</FormLabel>
        <Select
          id="selectedMonth"
          value={selectedMonth}
          onChange={handleSelectMonth}
          required
        >
          <option value="">Select Month</option>
          {chartData.labels.map((label, index) => (
            <option key={index} value={label}>
              {label}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
      <FormLabel>New month:</FormLabel>
        <Input
          type="text"
          id="newMonth"
          value={newMonth}
          onChange={(e) => setNewMonth(e.target.value)}
          required
        />
        <FormLabel>New Attendance:</FormLabel>
        <Input
          type="number"
          id="newAttendance"
          value={newAttendance}
          onChange={(e) => setNewAttendance(e.target.value)}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>New Performance:</FormLabel>
        <Input
          type="number"
          id="newPerformance"
          value={newPerformance}
          onChange={(e) => setNewPerformance(e.target.value)}
          required
        />
      </FormControl>
      <Button onClick={handleAddData} colorScheme="blue">
        Add Data
      </Button>
      <Button onClick={handleRemoveData} colorScheme="red">
        Remove Data
      </Button>
      <Button onClick={handleEditData} colorScheme="teal">
        {isEditing ? 'Update Data' : 'Edit Data'}
      </Button>
    </Stack>
  );
}

export default AttendancePerformanceChart;
