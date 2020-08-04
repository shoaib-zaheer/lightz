import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const Dchart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let answer = [];
    let stateName = [];
    let colors = [
      "Coral",
      "CornflowerBlue",
      "Cornsilk",
      "Crimson",
      "Cyan",
      "DarkBlue",
      "DarkCyan",
      "DarkGoldenRod",
      "DarkGray",
      "DarkGrey",
      "DarkGreen",
      "DarkKhaki",
      "DarkMagenta",
      "DarkOliveGreen",
      "DarkOrange",
      "DarkOrchid",
      "DarkRed",
      "DarkSalmon",
      "DarkSeaGreen",
      "DarkSlateBlue",
      "DarkSlateGray",
      "DarkSlateGrey",
      "DarkTurquoise",
      "DarkViolet",
    ];
    
    axios
      .get("http://localhost:8080/api/reports")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data) {
            if (dataObj.answer === true) {
                answer.push(dataObj.answer);
                stateName.push(dataObj.stateName);
            }
                
              
        }
        
        setChartData({
          labels: stateName,
          datasets: [
            {
              data: answer,
              backgroundColor: colors,
              hoverBackgroundColor: "white",
              borderColor: "rgba(200, 200, 200, 0.75)",
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(answer, stateName);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Have Electricity?</h1>
      <div>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default Dchart;
