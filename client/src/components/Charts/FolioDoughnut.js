import React, { Component } from "react";
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

// Step 4 - Including the chart type
import Doughnut2d from 'fusioncharts/fusioncharts.charts';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Doughnut2d, FusionTheme);

class FolioDoughnut extends Component {
    componentDidMount() {
        const data = [];
        let total = 0;
        const res = this.props.data;

        Object.keys(res).forEach(function (key) {
            data.push({
                "label": res[key].symbol.toUpperCase(),
                "value": res[key].TotalPurchase
            })
            total += res[key].TotalPurchase;
        })

        this.setState({
            type: 'doughnut2d',// The chart type
            width: this.props.width, // Width of the chart
            height: this.props.height, // Height of the chartf
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    // "bgColor": this.props.bgColor,
                    "caption": "Net Worth by Stock",
                    "sub-caption": "",
                    "plottooltext": "<b>$percentValue</b> $label Stocks, Amount: $$value",
                    "showlegend": "1",
                    "showpercentvalues": "1",
                    "legendposition": "bottom",
                    "usedataplotcolorforlabels": "1",
                    "decimals": "0",
                    "defaultCenterLabel": "Net Worth (Rounded) " + "$" + Math.round(total),
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

export default FolioDoughnut;