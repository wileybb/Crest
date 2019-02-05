import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import Doughnut2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Doughnut2d, FusionTheme);

class FolioDoughnut extends React.Component {
    render() {
        this.state = {
            type: 'doughnut2d',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    "caption": "Split of Revenue by Product Categories",
                    "subCaption": "Last year",
                    "numberPrefix": "$",
                    "defaultCenterLabel": "Total revenue: $64.08K",
                    "centerLabel": "Revenue from $label: $value",
                    "decimals": "0",
                    "theme": "fusion"
                },
                "data": [
                    {
                        "label": "Food",
                        "value": "28504"
                    },
                    {
                        "label": "Apparels",
                        "value": "14633"
                    },
                    {
                        "label": "Electronics",
                        "value": "10507"
                    },
                    {
                        "label": "Household",
                        "value": "4910"
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

export default FolioDoughnut;