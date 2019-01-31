import React, {Component} from "react";
import API from "../../utils/API"
import { Link, Router} from 'react-router-dom';
import socketIOClient from "socket.io-client";

var stockArr =[];
export default class Home extends Component {

    state = {
        stockResponse:[],
        stock: ["spy","dai","ndaq","iwm","aapl", "googl", "fb"],
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
    walletCheck=() => {
        // const userData = {
        //     userId : userId
        // }
        this.checkCash()
    }

    componentDidMount(){
        const{endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connect', () => {
            // Subscribe to topics (i.e. appl,fb)
            socket.emit('subscribe', this.state.stock.join(","))
            // Unsubscribe from topics (i.e. aig+)
            //socket.emit('unsubscribe', 'aig+')
            socket.on('message', (message) => {
              //this.state.stockResponse.empty();
              let livesymbol = JSON.parse(message)
              stockArr.push(livesymbol);
              this.setState({stockResponse:stockArr});
              // stockArr.length = 0;
              })
          })
       }



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

        // let totalPrice = ()

        const purchaseData = {

            quantity: this.state.quantity,
            symbol: this.state.symbol,
            purchasePrice: this.state.oneStockResponse.data.quote.latestPrice,
            purchaseTotal: (this.state.oneStockResponse.data.quote.latestPrice * this.state.quantity)
        }
        console.log(purchaseData);
        this.addBuy(purchaseData);
    }

    addBuy = (userBuy) => {
        API.createPurchase(userBuy)
        .then(res => { console.log(res)})
        .catch(err => console.log(err))
    }
    
    checkCash = () => {
        API.getCashValue()
        .then(res => {
            return(res);
        })
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
        const {responseLiveStock} = this.state;
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
        <div style={{textAling:"center"}} className="container">
            <div style={{ textAlign: "center" }} className="row">
            <div className="col-md-4">

               <form className="form">
                    <div className="form-group">
                        <hr></hr>
                        {/* <label htmlFor="email">Email:</label> */}
                        <input type="text"
                        onChange={this.handleInputChange}
                        value={this.state.quantity}
                        name="quantity"
                        placeholder="How many shares to buy?"/>
                    </div>
                    <button className="btn btn-lg btn-info" onClick={this.handleBuySubmit}>Buy</button>
                </form>
                <hr></hr>
                <form className="form">
                    <div className="form-group">
                        <input type="text"
                        onchange={this.handleInputChange}
                        value={this.state.quantity}
                        name="quantity"
                        placeholder="How many shares to sell?"/>
                    </div>
                    <button className="btn btn-lg btn-info" onClick={this.handleSellSubmit}>Sell</button>
                </form>
                <hr></hr>
                <div>
                    <h3>You have x{this.walletCheck} amount of dollars</h3>
                </div>

            {this.state.stockResponse
               ? (
            <div className="list-overflow-container">
            <ul className="list-group">
                {this.state.stockResponse.map((stock) => {
                    return (
                        <li key={stock.symbol} className="list-group-item">
                            <h3><span>{stock.symbol}</span></h3>
                            <p><span>{stock.lastSalePrice}</span></p>
                        </li>
                    )})}
            </ul>

            </div>
               )
             : <div>Loading...</div>}
        </div>
        </div>
        </div>


        </div>)}  //Render End
}