import React, { Component } from "react";
import API from "../../utils/API"

export default class StockQuote extends Component {


  state = {
    stockResponse: {},
    stock: ["googl", "fb"],
    watchList: {},
    watchListsymbol: "",
    oneStockResponse: {},
    responseLiveStock: [],
    endpoint: "https://ws-api.iextrading.com/1.0/tops"
  }

  walletCheck = () => {
      // const userData = {
      //     userId : userId
      // }
      this.checkCash()
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
          .then(res => { console.log(res) })
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
          .then(res => { console.log(res) })
          .catch(err => console.log(err))
  }

  //Check the cash value 
  checkCash = () => {
      API.getCashValue()
          .then(res => {
              return (res);
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

  render(){
    return (
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
    </div> )
  }
}