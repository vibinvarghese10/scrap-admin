import React from "react";
import { Line } from "react-chartjs-2";
import styles from './StatChart.module.css';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);



function StatChart({chartDataToRender, label}) {
 

const data = {
  labels: chartDataToRender.labels,
  datasets: [
    {
      label: label,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: chartDataToRender.data,
    },
  ],
};

const chartOptions = {
  responsive:true,
  maintainAspectRatio: false, // disables default aspect ratio



};
  return (
    <div className={styles.chartContainer} >
        <Line data={data} options={chartOptions}/>
    </div>
  )
}

export default StatChart