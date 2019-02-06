import React, { Component } from "react"
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import ScrollArea2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, ScrollArea2d, FusionTheme);


// Step 8 - Creating the DOM element to pass the react-fusioncharts component
class StaticAreaChart extends Component {
  state = {
    type: 'scrollarea2d',// The chart type
    width: this.props.width, // Width of the chart
    height: this.props.height, // Height of the chart
    dataFormat: 'json', // Data type
    chart: {},
    categories: [],
    dataset: []
  }
  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.update();
    }
  }

  update() {
    const chart = this.props.data.chart;
    const dataset = [];
    const dates = [];
    let yAxisMin = null;
    let yAxisMax = 0;

    Object.keys(chart).forEach(function (key) {
      dates.push({ "label": chart[key].date.slice(-5) });
      dataset.push({ "value": chart[key].close });
      yAxisMax = (chart[key].high > yAxisMax) ? Math.round(chart[key].high) : yAxisMax;
      yAxisMin = (yAxisMin === null || chart[key].low < yAxisMin) ? Math.round(chart[key].low) : yAxisMin;
    });

    this.setState({
      dataSource: {
        // Chart Configuration
        "chart": {
          "caption": this.props.data.quote.symbol,
          "subCaption": this.props.data.quote.companyName,
          "xAxisName": "Date (mm-dd)",
          "yAxisName": "Cost USD",
          "yAxisMaxValue": yAxisMax,
          "yAxisMinValue": yAxisMin,
          "numberPrefix": "$",
          "lineThickness": "3",
          "flatScrollBars": "1",
          "scrollheight": "10",
          "numVisiblePlot": "6",
          "numVDivLines": this.props.data.chart.length - 1,
          "theme": "fusion",
        },
        "categories": [{
          "category": dates
        }],
        "dataset": [{
          "data": dataset
        }]
      }
    }) // end of setState
  } // end of update()

  render() {
    return (
      <ReactFC
        {...this.state} />
    );
  }
};

export default StaticAreaChart;