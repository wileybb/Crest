import React, { Component } from "react";
import FolioPie from "../Charts/FolioPie.js";
import FolioBar from "../Charts/FolioBar.js";
import FolioDoughnut from "../Charts/FolioDoughnut.js";
import FolioMultiLine from "../Charts/FolioMultiLine.js";

class FolioCharts extends Component {
    render() {

        return (
            <div>

                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary">Left</button>
                    <button type="button" class="btn btn-primary">Middle</button>
                    <button type="button" class="btn btn-primary">Right</button>
                </div>

                <FolioPie
                    width={this.props.width}
                    height={this.props.height}
                    data={""}
                />
                <FolioDoughnut
                    width={this.props.width}
                    height={this.props.height}
                    data={""}
                />
                <FolioBar
                    width={this.props.width}
                    height={this.props.height}
                    data={""}
                />
                <FolioMultiLine
                    width={this.props.width}
                    height={this.props.height}
                    data={""}
                />
            </div >
        )
    }
}

export default FolioCharts;