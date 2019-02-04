import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import ScrollArea2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, ScrollArea2d, FusionTheme);


// Step 8 - Creating the DOM element to pass the react-fusioncharts component
class StaticAreaSample extends Component {
    // state = {};

    render() {
        const chart = this.props.data.chart;
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

        });


        this.state = {
            type: 'scrollarea2d',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                // Chart Configuration
                "chart": {
                    "caption": "Sales Trends",
                    "subCaption": "(FY 2012 to FY 2013)",
                    "xAxisname": "Month",
                    "pYAxisName": "Amount",
                    "labelDisplay": "AUTO",
                    "sYAxisName": "Employees",
                    "numberPrefix": "$",
                    "numVisiblePlot": "8",
                    "flatScrollBars": "1",
                    "scrollheight": "10",
                    "theme": "fusion"
                },
                "categories": [
                    {
                        "category": [
                            {
                                "label": "Jan 2012"
                            },
                            {
                                "label": "Feb 2012"
                            },
                            {
                                "label": "Mar 2012"
                            },
                            {
                                "label": "Apr 2012"
                            },
                            {
                                "label": "May 2012"
                            },
                            {
                                "label": "Jun 2012"
                            },
                            {
                                "label": "Jul 2012"
                            },
                            {
                                "label": "Aug 2012"
                            },
                            {
                                "label": "Sep 2012"
                            },
                            {
                                "label": "Oct 2012"
                            },
                            {
                                "label": "Nov 2012"
                            },
                            {
                                "label": "Dec 2012"
                            },
                            {
                                "label": "Jan 2013"
                            },
                            {
                                "label": "Feb 2013"
                            },
                            {
                                "label": "Mar 2013"
                            },
                            {
                                "label": "Apr 2013"
                            },
                            {
                                "label": "May 2013"
                            },
                            {
                                "label": "Jun 2013"
                            },
                            {
                                "label": "Jul 2013"
                            },
                            {
                                "label": "Aug 2013"
                            },
                            {
                                "label": "Sep 2013"
                            },
                            {
                                "label": "Oct 2013"
                            },
                            {
                                "label": "Nov 2013"
                            },
                            {
                                "label": "Dec 2013"
                            }
                        ]
                    }
                ],
                "dataset": [
                    {
                        "data": [
                            {
                                "value": "27400"
                            },
                            {
                                "value": "29800"
                            },
                            {
                                "value": "25800"
                            },
                            {
                                "value": "26800"
                            },
                            {
                                "value": "29600"
                            },
                            {
                                "value": "32600"
                            },
                            {
                                "value": "31800"
                            },
                            {
                                "value": "36700"
                            },
                            {
                                "value": "29700"
                            },
                            {
                                "value": "31900"
                            },
                            {
                                "value": "34800"
                            },
                            {
                                "value": "24800"
                            },
                            {
                                "value": "26300"
                            },
                            {
                                "value": "31800"
                            },
                            {
                                "value": "30900"
                            },
                            {
                                "value": "33000"
                            },
                            {
                                "value": "36200"
                            },
                            {
                                "value": "32100"
                            },
                            {
                                "value": "37500"
                            },
                            {
                                "value": "38500"
                            },
                            {
                                "value": "35400"
                            },
                            {
                                "value": "38200"
                            },
                            {
                                "value": "33300"
                            },
                            {
                                "value": "38300"
                            }
                        ]
                    }
                ]
            }
        }

        return (
            <ReactFC
                {...this.state
                } />
        );
    }
};

export default StaticAreaSample;