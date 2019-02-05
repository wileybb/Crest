import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import MsLine from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, MsLine, FusionTheme);

class FolioMultiLine extends React.Component {
    render() {
        this.state = {
            type: 'msline',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    "caption": "Number of visitors last week",
                    "subCaption": "Bakersfield Central vs Los Angeles Topanga",
                    "xAxisName": "Day",
                    "theme": "fusion"
                },
                "categories": [
                    {
                        "category": [
                            {
                                "label": "Mon"
                            },
                            {
                                "label": "Tue"
                            },
                            {
                                "label": "Wed"
                            },
                            {
                                "vline": "true",
                                "lineposition": "0",
                                "color": "#6baa01",
                                "labelHAlign": "center",
                                "labelPosition": "0",
                                "label": "National holiday",
                                "dashed": "1"
                            },
                            {
                                "label": "Thu"
                            },
                            {
                                "label": "Fri"
                            },
                            {
                                "label": "Sat"
                            },
                            {
                                "label": "Sun"
                            }
                        ]
                    }
                ],
                "dataset": [
                    {
                        "seriesname": "Bakersfield Central",
                        "data": [
                            {
                                "value": "15123"
                            },
                            {
                                "value": "14233"
                            },
                            {
                                "value": "25507"
                            },
                            {
                                "value": "9110"
                            },
                            {
                                "value": "15529"
                            },
                            {
                                "value": "20803"
                            },
                            {
                                "value": "19202"
                            }
                        ]
                    },
                    {
                        "seriesname": "Los Angeles Topanga",
                        "data": [
                            {
                                "value": "13400"
                            },
                            {
                                "value": "12800"
                            },
                            {
                                "value": "22800"
                            },
                            {
                                "value": "12400"
                            },
                            {
                                "value": "15800"
                            },
                            {
                                "value": "19800"
                            },
                            {
                                "value": "21800"
                            }
                        ]
                    }
                ],
                "trendlines": [
                    {
                        "line": [
                            {
                                "startvalue": "17022",
                                "color": "#6baa01",
                                "valueOnRight": "1",
                                "displayvalue": "Average"
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

export default FolioMultiLine;