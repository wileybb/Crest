import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import Pie2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Pie2d, FusionTheme);

class FolioPieChart extends React.Component {
    render() {
        this.state = {
            type: 'pie2d',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    "caption": "Market Share of Web Servers",
                    "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
                    "showlegend": "1",
                    "showpercentvalues": "1",
                    "legendposition": "bottom",
                    "usedataplotcolorforlabels": "1",
                    "theme": "fusion"
                },
                "data": [
                    {
                        "label": "Apache",
                        "value": "32647479"
                    },
                    {
                        "label": "Microsoft",
                        "value": "22100932"
                    },
                    {
                        "label": "Zeus",
                        "value": "14376"
                    },
                    {
                        "label": "Other",
                        "value": "18674221"
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

export default FolioPieChart;