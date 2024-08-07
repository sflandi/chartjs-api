const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const path = require('path');

const app = express();
const port = 3132;

// Define chart width and height
const width = 800;
const height = 600;

// Chart.js options
const canvasRenderService = new ChartJSNodeCanvas({ width, height, plugins: {
  requireLegacy: ['chartjs-plugin-datalabels']
} });

app.get('/chart', async (req, res) => {
  try {
    console.log("OK");
    const token = req.headers['token'];
    // const chartConfiguration = {
    //   type: "bar",
    //   data: {
    //     labels: ["2024-07-13","2024-07-14","2024-07-15","2024-07-16","2024-07-17","2024-07-18","2024-07-19","2024-07-20","2024-07-21","2024-07-22","2024-07-23","2024-07-24","2024-07-25","2024-07-26"],
    //     datasets: [{
    //       "type":"line",
    //       "fill":false,
    //       "label":"Success",
    //       "data":[0,0,0,0,0,0,0,0,0,0,1122111,1132011,1131711,0],
    //       "borderColor":"#1abc9c",
    //       "borderWidth":2
    //     },
    //     {
    //       "type":"bar",
    //       "label":"Request",
    //       "backgroundColor":"#2980b9",
    //       "data":[0,0,0,0,0,0,0,0,0,0,1122111,1132102,1132161,0],
    //       "datalabels": {
    //         display: false,
    //       }
    //     }],
    //   }
    // };

    console.log(req.query.p);
    const chartConfiguration = JSON.parse(req.query.p)
    chartConfiguration.options = {}
    chartConfiguration.options.plugins = {
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#1abc9c",
        font: {
          weight: "bold",
          size: "15",
        },
        formatter: (value) => {
          return value;
        },
      },
    };
    const imageBuffer = await canvasRenderService.renderToBuffer(chartConfiguration, 'image/png');
    
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
