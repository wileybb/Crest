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

class FolioPie extends React.Component {

    componentDidMount() {
        const data = [];
        const res = this.props.data;
        console.log(this.props.data)
        Object.keys(res).forEach(function (key) {

            data.push({
                "label": res[key].symbol.toUpperCase(),
                "value": res[key].TotalPurchase.toFixed(2),
                // "cashValue": Intl.NumberFormat.call('en-US', { style: 'currency', currency: 'USD' }).format(res[key].value)
            })
        })

        console.log("DATA ARRAY: ", data);

        this.setState({
            
            type: 'pie2d',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    // "bgColor": this.props.bgColor,
                    "caption": "Portfolio Value by Stock Symbol",
                    "sub-caption": "Hover to see Total Values",
                    "plottooltext": "<b>$percentValue</b> $label stock, worth $$value total",
                    "showlegend": "1",
                    "showpercentvalues": "1",
                    "legendposition": "bottom",
                    "usedataplotcolorforlabels": "1",
                    "theme": "fusion"
                },
                "data": data
            }
        })
        // END of setState
    } 
    // END of componentDidMount
    
    render() {


        return (
            <ReactFC
                {...this.state} />
        );
    }
}

export default FolioPie;