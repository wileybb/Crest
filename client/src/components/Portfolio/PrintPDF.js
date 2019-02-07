import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Router } from "react-router-dom";
import Jumbotron from "../Jumbotron/index";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';

import FolioPie from "../Charts/FolioPie.js";

export default class PrintPDF extends Component {

  printDocument = () => {
    const input = document.getElementById('mytable');
    html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('p', 'mm');
            pdf.addImage(imgData, 'PNG', 10, 10);
            // pdf.output('dataurlnewwindow');
            pdf.save("myDocument.pdf");
        });
}
    render() {
        const updateWatchList = this.state;
        const totalValue = this.state;
        return (
          <div>
            {this.state.userPortfolio.length === 0 ?
              ( 
                <div><p>Your Portfolio is Empty!</p></div> 
              ) : 
              (
                  <div>
                    <FolioPie
                      width="100%"
                      height="500"
                      data={this.state.userPortfolio}
                    />
                  </div>
              )
            }
          </div>
        )
    }   //Return and Render-Method End
} //Portfolio Class end 