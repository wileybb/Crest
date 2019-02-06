import React, { Component } from "react";
import API from "../../utils/API"
import { Link, Router } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Jumbotron from "../Jumbotron/index";

import StaticAreaChart from "../Charts/StaticAreaChart.js";

//var stockArr =[];
export default class Home extends Component {

    state = {
        stockResponse: {},
        stock: ["googl", "fb"],
        watchList: {},
        watchListsymbol: "",
        oneStockResponse: {},
        responseLiveStock: [],
        endpoint: "https://ws-api.iextrading.com/1.0/tops",
        userCash: 0
    }


    componentDidMount() {
        this.checkCash();
        this.getPertucularUserWatchList();
        this.intervalId = setInterval(this.autoStockData.bind(this), 1000);
        
    }

    // walletCheck = () => {
    //     // const userData = {
    //     //     userId : userId
    //     // }
    //     console.log("wallet check entered");
    //     this.checkCash()
    // }


     //Check the cash value 
    checkCash = () => {
        console.log("check cash func hit");
        API.getCashValue()
            .then(res => {
                console.log("checkcash() ", res);
                console.log("above is the res dot data from checkCash");
                this.setState({userCash: res.data});
                // return (res);
            })
            .catch(err => console.log(err))
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
        this.stockSymbol(this.state.symbol.toLowerCase());
    }

    handleBuySubmit = (event) => {
        event.preventDefault();
        const purchaseData = {
            buy: true,
            quantity: this.state.quantity,
            symbol: this.state.symbol,
            purchasePrice: this.state.oneStockResponse.data.quote.latestPrice,
            purchaseTotal: (this.state.oneStockResponse.data.quote.latestPrice * this.state.quantity)
        };
        console.log(purchaseData);
        this.addBuy(purchaseData);
    }

    //Handle Buy stock
    addBuy = (userBuy) => {
        API.createPurchase(userBuy)
            .then(res => { 
                console.log(res); 
                this.setState({symbol:""});
                this.setState({quantity:""});
                this.checkCash();
            })
            .catch(err => console.log(err))
    }

    handleSellSubmit = (event) => {
        event.preventDefault();
        const sellData = {
            buy: false,
            quantity: this.state.quantity,
            symbol: this.state.symbol,
            purchasePrice: this.state.oneStockResponse.data.quote.latestPrice,
            purchaseTotal: (this.state.oneStockResponse.data.quote.latestPrice * this.state.quantity)
        }
        console.log(sellData);
        this.addSale(sellData);
    }

    //Sell a stock
    addSale = (userSell) => {
        API.createPurchase(userSell)
            .then(res => {
                console.log(res);
                this.setState({symbol:""});
                this.setState({quantity:""});
                this.checkCash();
            })
            .catch(err => console.log(err))

   
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

    //Logout User Link 
    logoutUser = () => {
        this.intervalClear();
        localStorage.removeItem("loggedIn");
        API.signOutUser().then((res) => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    //Go to Portfolio page when user clicked on portfolio link
    userPortfolio = () => {
        this.intervalClear();
        this.props.history.push("/portfolio");
    }

    //Go to Transaction page when user clicked on Transactions link
    userTransaction = () => {
        this.intervalClear();
        this.props.history.push("/transactions");
    }

    render() {
        const { responseLiveStock } = this.state;
        const watchListsymbol = this.state;
        return (
            <div className="container">
                <Jumbotron />
                <hr></hr>
                <Link to={'/login'} onClick={this.logoutUser.bind(this)}>Logout</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to={'/portfolio'} onClick={this.userPortfolio.bind(this)}>Portfolio</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to={'/transactions'} onClick={this.userTransaction.bind(this)}>Transactions</Link>
                <hr></hr>
                <div className="row">
                    {/* Get one stock price form column */}
                    <div className="col-md-4">
                        <form className="form">
                            <div className="form-group">
                                {/* <label htmlFor="email">Email:</label> */}
                                <input type="text"
                                    onChange={this.handleInputChange}
                                    value={this.state.symbol}
                                    name="symbol"
                                    placeholder="GOOG" />
                            </div>
                            <button className="btn btn-lg btn-info" disabled={!this.validateForm} onClick={this.handleFormSubmit}>Get-Quotes</button>
                        </form>

                        <form className="form">
                            <div className="form-group">
                                <hr></hr>
                                <input type="text"
                                    onChange={this.handleInputChange}
                                    value={this.state.quantity}
                                    name="quantity"
                                    placeholder="How many shares to buy?" />
                            </div>
                            <button className="btn btn-lg btn-info" onClick={this.handleBuySubmit}>Buy</button><span>&nbsp;&nbsp;</span>
                            <button className="btn btn-lg btn-info" onClick={this.handleSellSubmit}>Sell</button>
                            <hr></hr>
                            {/* <div className="form-group">
                    <input type="text"
                        onChange={this.handleInputChange}
                        value={this.state.sellquantity}
                        name="sellquantity"
                        placeholder="How many shares to sell?"/>
                    </div> */}
                        </form>
                        {Object.keys(this.state.oneStockResponse).length === 0 ?
                            <div /> :
                            <StaticAreaChart data={this.state.oneStockResponse.data} width="100%" height="300" />
                        }
                    </div> {/* 1st col-md-4 div end */}

                    {/* Get One stock data and appending to table */}
                    <div className="col-md-4">
                        {Object.keys(this.state.oneStockResponse).length === 0 ? (<div><img src={require('../../image.png')} alt="stock" className="img-responsive" /></div>) : (
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><b>Stock</b></td><br></br>
                                        <td><b>{this.state.oneStockResponse.data.quote.symbol}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Close</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.close}</td>
                                    </tr>
                                    <tr>
                                        <td>Current $</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.latestPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Change</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.change}</td>
                                    </tr>
                                    <tr>
                                        <td>Change %</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.changePercent}</td>
                                    </tr>
                                    <tr>
                                        <td>High</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.high}</td>
                                    </tr>
                                    <tr>
                                        <td>Low</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.low}</td>
                                    </tr>
                                    <tr>
                                        <td>52 Wk High</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.week52High}</td>
                                    </tr>
                                    <tr>
                                        <td>52 Wk Low</td><br></br>
                                        <td>{this.state.oneStockResponse.data.quote.week52Low}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div> {/* 2nd col-md-4 div end */}

                    {/*Live stock col md 4 for multiple sotcks */}
                    <div style={{ marginTop: 10, height: 500, overflow: "auto" }} className="col-md-4">

                        {this.state.stockResponse
                            ? (
                                <div className="list-overflow-container">
                                    <ul className="list-group">
                                        {Object.keys(this.state.stockResponse).map((key, i) => {
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
                        <form style={{ marginTop: 10 }} className="form text-center">
                            <div className="form-group text-center">
                                {/* <label htmlFor="email">Email:</label> */}
                                <input className="col-md-6" type="text"
                                    onChange={this.handleWatchListInputChange}
                                    value={this.state.watchListsymbol}
                                    name="watchListsymbol"
                                    placeholder="AA" />
                            </div>
                            <button className="btn btn-lg btn-info" disabled={!this.validateForm} onClick={this.handleWatchListFormSubmit}>Add Watch List</button>
                        </form>
                    </div> {/* 3rd col-md-4 div end */}

                </div> {/* First Row Div End   */}

                {/* Live stock price update div */}
                <div style={{ textAlign: "center" }} className="container">
                    <div style={{ textAlign: "center" }} className="row">
                        <div className="col-md-4">
                            <hr></hr>
                            <div>
                                <h3>You have {this.state.userCash} amount of dollars</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)
    }  //Render End
}
