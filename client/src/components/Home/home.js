import React, {Component} from "react";
import API from "../../utils/API"
import { Link, Router} from 'react-router-dom';
import socketIOClient from "socket.io-client";

export default class Home extends Component {
    constructor() {
        super();
        // this.state = {
        //   responseLiveStock: [],
        //   endpoint: "https://ws-api.iextrading.com/1.0/tops"
        // };
      }
    state = {
        symbol:"",
        quantity:"",
        oneStockResponse:{},
        responseLiveStock: [],
        endpoint: "https://ws-api.iextrading.com/1.0/tops"
    }

    // componentDidMount(){
    //     const{endpoint} = this.state;
    //     const socket = socketIOClient(endpoint);
    //     socket.on('connect', () => {
    //         // Subscribe to topics (i.e. appl,fb,aig+)
    //         //socket.on('message', message => console.log(message))
    //         socket.emit('subscribe', 'snap,fb,aapl,googl')
    //         // Unsubscribe from topics (i.e. aig+)
    //         //socket.emit('unsubscribe', 'aig+')
    //         //console.log(response);
    //       })
    //       socket.on('message', (message) => {
    //           this.setState({responseLiveStock:message})
    //           console.log(message)
    //         })
    //     //socket.on("FromAPI", data => this.setState({ response: data }));
    //    }


    handleInputChange=(event) => {
        const{name, value} = event.target;
        this.setState({[name]: value});
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        // const stockTic = {
        //     symbol: this.state.symbol,
        // }
        this.setState({symbol:this.state.symbol});
        this.stockSymbol(this.state.symbol);
    }

    handleBuySubmit = (event) => {
        event.preventDefault();

        // totalPrice = (this.state.oneStockResponse.data.quote.latestPrice * this.state.quantity)

        const purchaseData = {
            quantity: this.state.quantity,
            symbol: this.state.symbol,
            purchasePrice: this.state.oneStockResponse.data.quote.latestPrice,
        }
        console.log(purchaseData);
        this.addBuy(purchaseData);
    }

    addBuy = (userBuy) => {
        API.createPurchase(userBuy)
        .then(res => { console.log(res)})
        .catch(err => console.log(err))
    }

    validateForm() {
        return this.state.symbol.length > 0;
      }
    stockSymbol = (symbol) => {
        API.singleStock(symbol)
      .then((res) => {
        //this.props.history.replace('/home');  
        this.setState({oneStockResponse:res});
        console.log(this.state.oneStockResponse)})
      .catch(err => console.log(err));
    }
    logoutUser = () => {
        localStorage.removeItem("loggedIn");
        API.signOutUser().then((res) => {
            console.log(res);
        }).catch(err => console.log(err));
    }
    
    render(){
        // const {responseLiveStock} = this.state;
        return (<div className="container">
                <hr></hr>
                <Link to={'/login'} onClick={this.logoutUser}>Logout</Link>
                <hr></hr>
               <h1 style={{textAlign:"center"}}>Welcome to home page</h1>
               <div className="row">
               <div className="col-md-4">
               <form className="form">
               <div className="form-group">
               {/* <label htmlFor="email">Email:</label> */}
               <input type="text"
               onChange={this.handleInputChange}
               value={this.state.symbol}
               name="symbol"
               placeholder="GOOG"/>
               </div>
               <button className="btn btn-lg btn-info" disabled={!this.validateForm} onClick={this.handleFormSubmit}>Get-Quotes</button>
            </form>
            </div>
            <div className="col-md-8">
            {Object.keys(this.state.oneStockResponse).length === 0 ? (<p>No Symbol To display yet!!!</p>) : (
            <tbody>

            <tr>
                <td>Stock</td><br></br>
                <td>{this.state.oneStockResponse.data.quote.symbol}</td>
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
            )}
            </div>
            </div>

        {/* Live stock price update div */}
        <div className="row">
            <div className="col-md-4">
               <form className="form">
                <div className="form-group">
                {/* <label htmlFor="email">Email:</label> */}
                <input type="text"
                onChange={this.handleInputChange}
                value={this.state.quantity}
                name="quantity"
               placeholder="How many shares?"/>
               </div>
               <button className="btn btn-lg btn-info" onClick={this.handleBuySubmit}>Buy</button>
            </form>
            </div>
        </div>
        {/* <div className="row"> */}
            {/* <div style={{ textAlign: "center" }}> */}
            {/* {responseLiveStock */}
               {/* ? (<div> */}
              {/* {response}  key={name}*/}
              {/* Object.values(this.state.response).map({response} => {<div > */}
                {/* this.state.response.map((res) => { */}
                {/* <div>Live Stock Price available in console log</div> */}
                {/* }) */}
              {/* </div>})  */}
            {/* </div>) */}
             {/* : <div>Loading...</div>} */}
      {/* </div> */}
            {/* // </div> */}
        </div>)}  //Render End
}