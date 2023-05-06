import React from "react";
import { Line } from "react-chartjs-2";
import styles from './StatChart.module.css';

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const chartOptions = {
  responsive:true,
  maintainAspectRatio: false, // disables default aspect ratio



};

function StatChart() {
  return (
    <div className={styles.chartContainer} >
        <Line data={data} options={chartOptions}/>
    </div>
  )
}

export default StatChart