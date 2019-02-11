import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import API from '../../utils/API';

import Navbar from "../Navbar/Navbar";
import QuickPortfolio from "../Portfolio/QuickPortfolio";
import HomeCopy from "./HomeCopy";
import StaticAreaChart from "../Charts/StaticAreaChart.js";
import Footer from "../Footer/Footer";
import CashFormat from "../CashCheck/CashFormat";
import Modal from "../Modals/Modals.js";


class Allocation extends React.Component {

  state = {
    stockResponse: {},
    symbol:"",
    quantity:null,
    stockPrice:null,
    stock: ["googl", "fb"],
    watchList: {},
    watchListsymbol: "",
    oneStockResponse: {},
    responseLiveStock: [],
    endpoint: "https://ws-api.iextrading.com/1.0/tops",
    show:false,
    modalMessage: "",
    buttonDisabled: true
  }

  componentDidMount() {
      this.getPertucularUserWatchList();
      this.intervalId = setInterval(this.autoStockData.bind(this), 1000);
  }

  //Clear interval when logging out or move to portfolio page or other page
  intervalClear() {
      clearInterval(this.intervalId);
  }

  //Get perticular user stock from database table stock
  getPertucularUserWatchList = () => {
      API.getPertucularUserWatchList().then((res) => {
          this.setState({ watchList: res.data });
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
      const data = {
          id: this.state.watchList.UserId,
          stockSymbols: this.state.watchList.stock + "," + this.state.watchListsymbol.toLowerCase()
      }
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
      this.setState({ symbol: this.state.symbol });
      this.stockSymbol(this.state.symbol);
  }

  handleBuySubmit = (event) => {
      // event.preventDefault();
      if(!this.state.quantity && !this.state.symbol && !this.state.stockPrice){
        this.setState({modalMessage: "Please correct your input"});
        this.toggleModal();
      } else {
      const purchaseData = {
          buy: true,
          quantity: this.state.quantity,
          symbol: this.state.symbol,
          purchasePrice: parseFloat(this.state.stockPrice).toFixed(2),
          purchaseTotal: parseFloat(this.state.stockPrice * this.state.quantity).toFixed(2)
      };
      this.addBuy(purchaseData);
      //alert(`Transaction successful! \n ${this.state.quantity} of ${this.state.oneStockResponse.data.quote.symbol.toUpperCase()} purchased at $${purchaseData.purchasePrice} per share, for $${purchaseData.purchaseTotal} total.`);
      //window.location.reload();
      this.setState({modalMessage: `Transaction successful! \n ${this.state.quantity} share(s) of ${this.state.oneStockResponse.data.quote.symbol.toUpperCase()} purchased at $${purchaseData.purchasePrice} per share, for a total of $${purchaseData.purchaseTotal}.`})
    }
  }

  //Handle Buy stock
  addBuy = (userBuy) => {
      API.createPurchase(userBuy)
          .then(res => { 
            console.log(res);
            this.setState({symbol:""});
            this.setState({quantity:""});
            this.setState({show:true});
          })
          .catch(err => console.log(err))
  }


  handleSellSubmit = (event) => {
      // event.preventDefault();
      if(!this.state.quantity && !this.state.symbol && !this.state.stockPrice){
        this.setState({modalMessage: "Please correct your input"});
        this.toggleModal();
      } else {
        const sellData = {
          buy: false,
          quantity: this.state.quantity,
          symbol: this.state.symbol,
          purchasePrice: parseFloat(this.state.stockPrice).toFixed(2),
          purchaseTotal: parseFloat(this.state.stockPrice * this.state.quantity).toFixed(2)
      }
      console.log(sellData);
      this.addSale(sellData);
      //alert(`Transaction successful! \n ${this.state.quantity} of ${this.state.oneStockResponse.data.quote.symbol.toUpperCase()} sold at $${sellData.purchasePrice} per share, for $${sellData.purchaseTotal} total.`);
      //window.location.reload();
      this.setState({modalMessage: `Transaction successful! \n ${this.state.quantity} share(s) of ${this.state.oneStockResponse.data.quote.symbol.toUpperCase()} sold at $${sellData.purchasePrice} per share, for a total of $${sellData.purchaseTotal}.`});
      }
    }

  //Sell a stock
  addSale = (userSell) => {
      API.createPurchase(userSell)
          .then(res => { 
            console.log(res);
            this.setState({symbol:""});
            this.setState({quantity:""});
            this.setState({show:true});  
          })
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
              this.setState({stockPrice:res.data.quote.latestPrice})
              //this.props.history.replace('/home');  
              this.setState({ oneStockResponse: res });
              //console.log(this.state.oneStockResponse)
          })
          .catch(err => console.log(err));
  }

  refreshPage(){
    window.location.reload();
  } 


  //Modal Toggle
  toggleModal = () => {
    this.setState({
    show: !this.state.show
    });
    window.location.reload();
 };

  render() {

    return (
      <div>
        {/* <Navbar /> */}
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white mt-3">
              <h1>Crest Trading Portal</h1> 
            </MDBRow>

            <MDBContainer className="flex-center flex-column" style={{ marginTop: -50, height: 2500 }}>
              {/* <MDBRow className="flex-center flex-column" style={{ marginTop: -100, height: 2500 }}> */}
                <MDBCol md="12">
                  <MDBCard className="transparent-background" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <MDBCardBody>
                      <MDBCardTitle className="text-white">
                        {/* <strong>Initialize Fund Allocation</strong> */}
                      </MDBCardTitle>
                      <MDBCardText>
                        <MDBRow center>
                          <MDBCol md="8">
                            <MDBCard className="mb-3">
                              <MDBCardBody>
                                <MDBCardTitle><strong>Remaining Balance:</strong> <CashFormat /></MDBCardTitle>
                                <MDBCardText>
                                  <form className="form-inline mt-4 mb-4 ml-5" onSubmit={this.handleFormSubmit}>
                                    <MDBIcon icon="search" />
                                    <input type="text"
                                      onChange={this.handleInputChange}
                                      value={this.state.symbol}
                                      name="symbol"
                                      placeholder="Search by Stock Symbol"
                                      className="form-control form-control-sm ml-3 w-75"  />
                                    <MDBBtn size="sm" color="elegant" disabled={!this.validateForm} onClick={this.handleFormSubmit}>Search</MDBBtn>
                                  </form>
                                </MDBCardText>
                                <MDBContainer>
                                    {Object.keys(this.state.oneStockResponse).length === 0 ? (<div>Results will appear here.</div>) : (
                                      <MDBTable className="table col-lg-12">
                                        <MDBTableHead>
                                          <tr>
                                            <th>Stock Symbol</th>
                                            <th>Close</th>
                                            <th>Current</th>
                                            <th>Change</th>
                                            <th>Change %</th>
                                            <th>High</th>
                                            <th>Low</th>
                                            {/* <th>52 Week High</th>
                                            <th>52 Week Low</th> */}
                                          </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                          <tr>
                                            <td>{this.state.oneStockResponse.data.quote.symbol}</td>
                                            <td>{this.state.oneStockResponse.data.quote.close}</td>
                                            <td>{this.state.oneStockResponse.data.quote.latestPrice}</td>
                                            <td>{this.state.oneStockResponse.data.quote.change}</td>
                                            <td>{this.state.oneStockResponse.data.quote.changePercent}</td>
                                            <td>{this.state.oneStockResponse.data.quote.high}</td>
                                            <td>{this.state.oneStockResponse.data.quote.low}</td>
                                            {/* <td>{this.state.oneStockResponse.data.quote.week52High}</td>
                                            <td>{this.state.oneStockResponse.data.quote.week52Low}</td> */}
                                          </tr>
                                        </MDBTableBody>
                                      </MDBTable>
                                    )}
                                  <MDBContainer>
                                      {Object.keys(this.state.oneStockResponse).length === 0 ?
                                          <div /> :
                                          <StaticAreaChart data={this.state.oneStockResponse.data} width="75%" height="200" />
                                      }
                                  </MDBContainer>
                                </MDBContainer>
                                  <MDBBtn color="elegant" href="#" className="float-right" style={{ marginTop: 20 }} onClick={this.handleSellSubmit}>Sell</MDBBtn>
                                  <MDBBtn color="elegant" href="#" className="float-right" style={{ marginTop: 20 }} onClick={this.handleBuySubmit}>Buy</MDBBtn>
                                <div className="float-right" style={{ width: 75 }}>
                                  <MDBInput name="quantity" label="Quantity" 
                                    onChange={this.handleInputChange}
                                    value={this.state.quantity}
                                    name="quantity" />
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                          <MDBCol md="4">
                            <MDBCard>
                              <MDBCardBody>
                                <MDBCardTitle><strong>Current Portfolio</strong></MDBCardTitle>
                                <MDBCardText>
                                  <MDBContainer>
                                    <QuickPortfolio />
                                  </MDBContainer>
                                </MDBCardText>
                              </MDBCardBody>
                            </MDBCard>
                            <MDBBtn className="mt-3" outline color="white" href="/home">Return to Home</MDBBtn>
                          </MDBCol>                 
                        </MDBRow>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>  
              {/* </MDBRow> */}
            </MDBContainer>
          </MDBMask>
        </MDBView>
        <Modal show={this.state.show} toggleModal={this.toggleModal}>{this.state.modalMessage}</Modal>
        <Footer/>
      </div>
    );
  }
}

export default Allocation;