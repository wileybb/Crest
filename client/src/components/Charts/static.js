import React, {Component} from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

import socketIOClient from "socket.io-client";

// Step 4 - Including the chart type
import Column2D from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations
const dataset = [
  {
    "label": "GOOG",
    "value": "50"
  },
  {
    "label": "APPL",
    "value": "30"
  },
  {
    "label": "ETC",
    "value": "80"
  }
];

const chartConfigs = {
  type: 'column2d',// The chart type
  width: '700', // Width of the chart
  height: '400', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration
    "chart": {
      "caption": "Net Profits",
      "subCaption": "Just Profits, no losses",
      "xAxisName": "Symbol",
      "yAxisName": "Gain",
      "numberPrefix": "$",
      "theme": "fusion",
    },
    // Chart Data
    "data": dataset
  }

};

// Step 8 - Creating the DOM element to pass the react-fusioncharts component
class SampleChart extends Component {
  render() {
    return (
      <ReactFC
        {...chartConfigs} />
    );
  }
}

export default SampleChart;