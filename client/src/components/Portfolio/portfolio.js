import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Router } from "react-router-dom";
import Jumbotron from "../Jumbotron/index";
import FolioCharts from "./FolioCharts.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';

export default class Portfolio extends Component {
    state = {
        watchList:{},
        portfolio:[]
    }
    componentDidMount(){
            API.getPertucularUserWatchList().then((res) => {
                console.log(res.data);
                this.setState({watchList:res.data});
                console.log(this.state.watchList.stock);
            }).then(() => {
                console.log("dot then function ran in portfolio");
                this.getUserPortfolio();
            });
        }
    //}

    //API AJAX Call to user portfolio table 
    getUserPortfolio = () => {
        API.getUserPortfolioData(this.state.watchList.UserId).then((res) => {
            console.log("front portfolio route hit");
            // this.setState({portfolio: res.data})
            console.log(this.state.portfolio)
            this.filterPortfolioData(res.data)
        })
    }
    filterPortfolioData = (dataArray) => {
        console.log(dataArray);
        console.log("above is the data");
        let primedArray = []
        for (var i=0; i<dataArray.length; i++){
            // console.log(dataArray[i].symbol)
            if(dataArray[i].quantity > 0){
                    primedArray.push(dataArray[i]);
                    console.log(primedArray)
            }else{};
        }
        this.setState({portfolio: primedArray});
        console.log(primedArray);
    }

    //Logout User Link 
    logoutUser = () => {
        //this.intervalClear();
        localStorage.removeItem("loggedIn");
        API.signOutUser().then((res) => {
            console.log(res);
        }).catch(err => console.log(err));
    }
    //Go to Home page
    goToHomePage = () => {
        this.props.history.push("/home");
    }
    //Go to Transaction page when user clicked on Transactions link
    userTransaction = () => {
        this.props.history.push("/transactions");
    }

    printDocument =() =>{
        const input = document.getElementById('mytable');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png',1.0);
            const pdf = new jsPDF('p','mm');
            pdf.addImage(imgData, 'PNG', 10, 10);
            // pdf.output('dataurlnewwindow');
            pdf.save("myDocument.pdf");
          });
    }
    
    render() {

        return (
            <div className="container">
                <Jumbotron />
                <hr></hr>
                <Link to={'/login'} onClick={this.logoutUser.bind(this)}>Logout</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to={'/home'} onClick={this.goToHomePage.bind(this)}>Home</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to={'/transactions'} onClick={this.userTransaction.bind(this)}>Transactions</Link>
                <hr></hr>
                <div className="row">
                    <div className="col-md-6">
 <div className="container">
            <Jumbotron />
            <hr></hr>
            <Link to={'/login'} onClick={this.logoutUser.bind(this)}>Logout</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Link to={'/home'} onClick={this.goToHomePage.bind(this)}>Home</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {/* <Link to={'/portfolio'} onClick={this.userPortfolio.bind(this)}>Portfolio</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
            <button className="btn btn-info" onClick={this.printDocument.bind(this)}>Generate PDF Report</button>
            <hr></hr>
             <div className="row">
               <div className="col-md-12">
               {(this.state.portfolio).length === 0 ? (<div><img src={require('../../image.png')} alt="stock" className="img-responsive" /></div>) : (
                <table id="mytable" className="table table-striped">
                 <thead className="table-dark">
                     <tr>
                         <th scope="col">Stock</th>
                         <th scope="col">Quantity</th>
                         {/* <th scope="col">Type</th> */}
                         {/* <th scope="col">Purchase Price</th> */}
                         {/* <th scope="col">Purchase Total</th> */}
                         {/* <th scope="col">Purchase Date</th> */}
                     </tr>
                 </thead>
                 <tbody>
                     {this.state.portfolio.map((data) => {
                         return (
                            <tr>
                            <td><b>{data.symbol.toUpperCase()}</b></td>
                            <td>{data.quantity}</td>
                            {/* <td>{(data.buy) ? ("Buy") : ("Sell")}</td> */}
                            {/* <td>{data.purchasePrice}</td> */}
                            {/* <td>{data.purchaseTotal}</td> */}
                            {/* <td>{data.updatedAt}</td> */}
                            </tr>)
                     })}
                 </tbody>
                </table>
                )}
                
               </div> 
             </div>
            </div>
                    </div>

                    <div className="col-md-6">
                        {(this.state.chartData).length === 0 ?
                            (
                                <div>
                                    <p>Your Portfolio is Empty!</p>
                                    {/* for reference */}
                                    < FolioCharts width="100%" height="500" />
                                </div>
                            )
                            :
                            (
                                <FolioCharts width="100%" height="500" />
                            )
                        }
                    </div>
                </div> {/* Row div end */}

            </div> //Container Div End
        )
    }   //Return and Render-Method End
} //Portfolio Class end 