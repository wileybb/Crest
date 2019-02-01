import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import API from "../../utils/API.js";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";
// import Conditiontable from "./condition.js"

//stock: ["spy","dai","ndaq","iwm","aapl", "googl", "fb"]
//var stockArr =[];
export default class Topstock extends Component {
    state = {
          stockResponse:{},
          stock: ["aapl", "googl", "fb"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops",
        }
    componentDidMount(){
        //COMMENTED SOCKET IO QUOTES FOR NOW TO GET OTHER OPTIONS
        // const{endpoint} = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on('connect', () => {
        //     // Subscribe to topics (i.e. appl,fb,aig+)
        //     //socket.on('message', message => console.log(message))
        //     socket.emit('subscribe', this.state.stock.join(","))
        //     // Unsubscribe from topics (i.e. aig+)
        //     //socket.emit('unsubscribe', 'aig+')
        //     socket.on('message', (message) => {
        //       //this.state.stockResponse.empty();
        //       let livesymbol = JSON.parse(message)
        //       stockArr.push(livesymbol);
        //       this.setState({stockResponse:stockArr});
        //       stockArr.length = 0;
        //         //console.log((JSON.parse(message)));
        //       })
        //   })
            // API.alphaVantageCall().then((res) => {
            //     console.log(res)
            // });   
        this.intervalId = setInterval(this.autoStockData.bind(this), 1000);
      }
      componentWillUnmount(){
        clearInterval(this.intervalId);
      }
       autoStockData = () => {
        let symbols = this.state.stock.join(",") 
        API.batchStock(symbols).then((res) => {
            console.log("res.data")
            //console.log(res.data);
            // let obj = res.data
            // //const stockArr = []
            // for(const k in obj){
            //     let dataValue = obj[k];
            //     console.log(dataValue);
            //     stockArr.push(dataValue);
            // }
            this.setState({stockResponse:res.data});
           })
        }

    render(){
      //const response = {};
      const stockResponse = this.state;
      // const {symbol} = this.state;
      console.log(this.state.stockResponse);
      //console.log(this.state.response.symbol + this.state.response.lastSalePrice);
      return(
        <div style={{textAling:"center"}} className="container">
        <div style={{ textAlign: "center" }} className="row">
        <div className="col-md-4">
        {this.state.stockResponse
           ? (
        <div className="list-overflow-container">
          <ul className="list-group">
              {Object.keys(this.state.stockResponse).map((key, i) => {
                  return (
                      <li key={i} className="list-group-item">
                          <h3><span>{this.state.stockResponse[key].quote.symbol}</span></h3>
                          <p><span>{this.state.stockResponse[key].quote.close}</span></p>
                      </li>
                  )})}
          </ul>
        </div>
           )
         : <div>Loading...</div>}
        </div>
        </div>
        </div>
           );   //map return function end
    }
}
