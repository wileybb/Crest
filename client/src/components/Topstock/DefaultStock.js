import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import API from "../../utils/API.js";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";
// import Conditiontable from "./condition.js"
import Jumbotron from "../Jumbotron/index";

export default class DefaultStock extends Component {
    state = {
          stockResponse:{},
          newsResponse:[],
          oneStockNews:[],
          stock: ["aapl", "googl", "fb", "amzn", "msft", "INDEXSP"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops",
        }

    componentDidMount(){
      this.intervalId = setInterval(this.autoStockData.bind(this), 1000);
      // this.autoNewsData();
    }

    componentWillUnmount(){
      clearInterval(this.intervalId);
    }

    autoStockData = () => {
      let symbols = this.state.stock.join(",") 
      API.batchStock(symbols).then((res) => {
          console.log("res.data")
          this.setState({stockResponse:res.data});
          })
    }

    render(){
      //const response = {};
      const stockResponse = this.state;
      // const {symbol} = this.state;
        console.log(this.state.stockResponse);
    //   console.log(this.state.newsResponse);
      //console.log(this.state.response.symbol + this.state.response.lastSalePrice);
      return(
        <div className="container">
         <div  className="row">
     
             <div style={{textAlign:"center"}} className="col-md-12 mt-3 mb-3">
             <div  className="row">
             <div className="col-md-12">
             {this.state.stockResponse
                ? (
             <div className="list-overflow-container">
               <ul className="list-group">
                   {Object.keys(this.state.stockResponse).map((key, i) => {
                       return (
                        <li style={{height:60}}key={i} className="list-group-item">
                        <div><h5 style={{display:"inline", float:"left"}}><span>{this.state.stockResponse[key].quote.symbol} : {this.state.stockResponse[key].quote.latestPrice.toFixed(2)}</span></h5>
                        <div style={{display:"inline", float:"right"}}><h5 style={(this.state.stockResponse[key].quote.change > 0) ? {color:"green"} : {color:"red"}}>
                        {this.state.stockResponse[key].quote.change > 0 ? ("+" + this.state.stockResponse[key].quote.change):(this.state.stockResponse[key].quote.change)}</h5>
                        </div></div><br />
                        <div><p style={{display:"inlineBlock", float:"middle", fontSize:14}}>{this.state.stockResponse[key].quote.companyName}</p></div>
                    </li>
                       )})}
               </ul>
             </div>
                )
              : <div>Loading...</div>}
             </div>
             </div>
                    
        </div> 
        </div>
        </div>
       );
        }}
