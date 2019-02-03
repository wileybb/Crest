import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
// import ScrolLArea2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, /*ScrolLArea2d,*/ FusionTheme);




// Step 8 - Creating the DOM element to pass the react-fusioncharts component
class StaticAreaChart extends Component {
  constructor(props) {
    super(props);
    const chart = props.data.chart;
    const dataset = [];
    const dates = [];
    let yAxisMin = null;
    let yAxisMax = 0;

    Object.keys(chart).forEach(function (key) {

      dates.push({ "label": chart[key].date.slice(-5) });
      dataset.push({ "value": chart[key].close });
      // dataset.push({ "label": chart[key].date, "value": chart[key].close })

      yAxisMax = (chart[key].high > yAxisMax) ? chart[key].high : yAxisMax;
      yAxisMin = (yAxisMin === null || chart[key].low < yAxisMin) ? Math.round(chart[key].low) : yAxisMin;

    })



    this.state = ({
      chartConfigs: {
        type: 'scrollarea2d',// The chart type
        width: '100%', // Width of the chart
        height: '300', // Height of the chart
        dataFormat: 'json', // Data type
        dataSource: {
          // Chart Configuration
          "chart": {
            "caption": props.data.quote.symbol,
            "subCaption": props.data.quote.companyName,
            "xAxisName": "Date (mm-dd)",
            "yAxisName": "Cost USD",
            "yAxisMaxValue": yAxisMax,
            "yAxisMinValue": yAxisMin,
            "numberPrefix": "$",
            "lineThickness": "3",
            "flatScrollBars": "1",
            "scrollheight": "10",
            "numVisiblePlot": "6",

            "numVDivLines": chart.length-1,

            "theme": "fusion",
          },
          "categories": [{
            "category": dates
          }],
          // Chart Data
          "dataset": [{
            "data": dataset
          }]
        }

      },
      // message: chart

      // message: newData

      // message: alt

      // message: props.data.chart
    })
  }


  render() {
    // console.log(this.state.chartConfigs)
    return (
      <ReactFC
        {...this.state.chartConfigs} />
    );
  }
};

export default StaticAreaChart;