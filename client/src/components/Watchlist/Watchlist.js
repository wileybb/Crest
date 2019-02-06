import React, { Component } from "react";
import API from "../../utils/API"
import { Link, Router } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Jumbotron from "../Jumbotron/index";
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';


import StaticAreaChart from "../Charts/StaticAreaChart.js";

//var stockArr =[];
export default class Watchlist extends Component {

    state = {
        stockResponse: {},
        stock: ["googl", "fb"],
        watchList: {},
        watchListsymbol: "",
        oneStockResponse: {},
        responseLiveStock: [],
        endpoint: "https://ws-api.iextrading.com/1.0/tops"
    }

    componentDidMount() {
        this.getPertucularUserWatchList();
        this.intervalId = setInterval(this.autoStockData.bind(this), 1000);
    }

    //Clear interval on real time stock purchase when unmounting from this component
    // componentWillUnmount(){
    //   clearInterval(this.intervalId);
    // }

    //Clear interval when logging out or move to portfolio page or other page
    intervalClear() {
        clearInterval(this.intervalId);
    }

    //Get perticular user stock from database table stock
    getPertucularUserWatchList = () => {
        API.getPertucularUserWatchList().then((res) => {
            this.setState({ watchList: res.data });
            console.log(this.state.watchList);
        });
    }

    //Watch list input update in state
    handleWatchListInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    //Watch list submit button 
    handleWatchListFormSubmit = (event) => {
        event.preventDefault();
        this.setState({ watchListsymbol: this.state.watchListsymbol });
        console.log(this.state.watchListsymbol);
        const data = {
            id: this.state.watchList.UserId,
            stockSymbols: this.state.watchList.stock + "," + this.state.watchListsymbol.toLowerCase()
        }
        console.log(data);
        this.updateWatchList(data);
        this.setState({ watchListsymbol: ""})
    }
    updateWatchList = (stockTicker) => {
        API.updatePertucularUserWatchList(stockTicker)
            .then(res => {
                console.log(res);
                this.getPertucularUserWatchList();
            })
            .catch(err => console.log(err))
    }

    //Get Real time stock prices based on stocks in state stocks
    autoStockData = () => {
        //console.log(this.state.watchList.stock);
        //let symbols = this.state.stock.join(",") 
        API.batchStock(this.state.watchList.stock).then((res) => {
            this.setState({ stockResponse: res.data });
            console.log(this.state.stockResponse);
        })
    }

    //Input value updated in state
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    //Form Value submission to get once stock price 
    handleFormSubmit = (event) => {
        event.preventDefault();
        // const stockTic = {
        //     symbol: this.state.symbol,
        // }
        this.setState({ symbol: this.state.symbol });
        this.stockSymbol(this.state.symbol);
    }

    //Form Validataion to check if symbol is entered or not 
    validateForm() {
        return this.state.symbol.length > 0;
    }

    //Get info on one stock symbol
    stockSymbol = (symbol) => {
        API.singleStock(symbol)
            .then((res) => {
                //this.props.history.replace('/home');  
                this.setState({ oneStockResponse: res });
                console.log(this.state.oneStockResponse)
            })
            .catch(err => console.log(err));
    }
    render() {
        const { responseLiveStock } = this.state;
        const watchListsymbol = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
            
                    {/*Live stock col md 4 for multiple sotcks */}
                    <div style={{ marginTop: -25, height: 500, overflow: "auto" }} className="col-md-12 mx-auto">
                                                                                  
                                  <form style={{ marginTop: 10 }} className="form text-center" onSubmit={this.handleFormSubmit}>
                                    <div className="form-group text-center">
                                      {/* <label htmlFor="email">Email:</label> */}
                                      <input className="col-md-8" type="text"
                                          onChange={this.handleWatchListInputChange}
                                          value={this.state.watchListsymbol}
                                          name="watchListsymbol"
                                          placeholder="Stock Symbol" />
                                      </div>
                                      <MDBBtn outline type="submit" color="elegant" className="mb-3" disabled={!this.validateForm} onClick={this.handleWatchListFormSubmit}>Add to Watch List</MDBBtn>
                                  </form>

                        {this.state.stockResponse
                            ? (
                                <div className="list-overflow-container">
                                    <ul className="list-group mb-5" >
                                        {Object.keys(this.state.stockResponse).reverse().map((key, i) => {
                                            return (
                                                <li style={{ height: 60 }} key={i} className="list-group-item">
                                                    <div><h5 style={{ display: "inline", float: "left" }}><span>{this.state.stockResponse[key].quote.symbol} : {this.state.stockResponse[key].quote.latestPrice.toFixed(2)}</span></h5>
                                                        <div style={{ display: "inline", float: "right" }}><h5 style={(this.state.stockResponse[key].quote.change > 0) ? { color: "green" } : { color: "red" }}>
                                                            {this.state.stockResponse[key].quote.change > 0 ? ("+" + this.state.stockResponse[key].quote.change) : (this.state.stockResponse[key].quote.change)}</h5></div></div><br />
                                                    <div><p style={{ display: "inlineBlock", float: "middle", fontSize: 10 }}>{this.state.stockResponse[key].quote.companyName}</p></div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                            : <div>Loading...</div>}
                    </div> {/* 3rd col-md-4 div end */}
                </div> {/* First Row Div End   */}

            </div>)
    }  //Render End
}
