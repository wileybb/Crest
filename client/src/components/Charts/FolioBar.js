import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import MsBar2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, MsBar2d, FusionTheme);

class FolioBarChart extends React.Component {
    render() {
        this.state = {
            type: 'msbar2d',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    "caption": "Split of Sales by Product Category",
                    "subCaption": "In top 5 stores last month",
                    "yAxisname": "Sales (In USD)",
                    "numberPrefix": "$",
                    "placevaluesInside": "1",
                    "xAxisLineColor": "#999999",
                    "theme": "fusion"
                },
                "categories": [
                    {
                        "category": [
                            {
                                "label": "Bakersfield Central"
                            },
                            {
                                "label": "Garden Groove harbour"
                            },
                            {
                                "label": "Los Angeles Topanga"
                            },
                            {
                                "label": "Compton-Rancho Dom"
                            },
                            {
                                "label": "Daly City Serramonte"
                            }
                        ]
                    }
                ],
                "dataset": [
                    {
                        "seriesname": "Food Products",
                        "data": [
                            {
                                "value": "17000"
                            },
                            {
                                "value": "19500"
                            },
                            {
                                "value": "12500"
                            },
                            {
                                "value": "14500"
                            },
                            {
                                "value": "17500"
                            }
                        ]
                    },
                    {
                        "seriesname": "Non-Food Products",
                        "data": [
                            {
                                "value": "25400"
                            },
                            {
                                "value": "29800"
                            },
                            {
                                "value": "21800"
                            },
                            {
                                "value": "19500"
                            },
                            {
                                "value": "11500"
                            }
                        ]
                    }
                ],
                "trendlines": [
                    {
                        "line": [
                            {
                                "startvalue": "15000",
                                "color": "#0075c2",
                                "valueOnRight": "1",
                                "displayvalue": "Avg. for{br}Food"
                            },
                            {
                                "startvalue": "22000",
                                "color": "#1aaf5d",
                                "valueOnRight": "1",
                                "displayvalue": "Avg. for{br}Non-food"
                            }
                        ]
                    }
                ]
            }
        }

        return (
            <ReactFC
                {...this.state} />
        );
    }
}

export default FolioBarChart;