import React, {Component} from "react";
import socketIOClient from "socket.io-client";
// import Conditiontable from "./condition.js"

//stock: ["spy","dai","ndaq","iwm"]
var stockArr =[];
export default class Topstock extends Component {
    state = {
          stockResponse:[],
          stock: ["spy","dai","ndaq","iwm","aapl", "googl", "fb"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops",
        }
    componentDidMount(){
        const{endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        // socket.on('message', (message) => {
        //   //this.state.stockResponse.empty();
        //   let livesymbol = JSON.parse(message)
        //   stockArr.push(livesymbol);
        //   this.setState({stockResponse:stockArr})
        //     //console.log((JSON.parse(message)));
        //   })
        socket.on('connect', () => {
            // Subscribe to topics (i.e. appl,fb,aig+)
            //socket.on('message', message => console.log(message))
            socket.emit('subscribe', this.state.stock.join(","))
            // Unsubscribe from topics (i.e. aig+)
            //socket.emit('unsubscribe', 'aig+')
            socket.on('message', (message) => {
              //this.state.stockResponse.empty();
              let livesymbol = JSON.parse(message)
              stockArr.push(livesymbol);
              this.setState({stockResponse:stockArr});
              // stockArr.length = 0;
                //console.log((JSON.parse(message)));
              })
          })
       }

    render(){
      //const response = {};
      const stockResponse = this.state;
      // const {symbol} = this.state;
      console.log(this.state.stockResponse);
      //console.log(this.state.response.symbol + this.state.response.lastSalePrice);
      return(
            <div style={{ textAlign: "center" }}>
        {this.state.stockResponse
          ? (<div>
              {/* {response}  key={name}*/}
              {/* Object.values(this.state.response).map({response} => {<div > */}
                
                <div>Live Stock Price available in console log</div>
                <hr></hr>
                <ul>
                  {this.state.stockResponse.map((res) =>{
                    return(
                    <li key={res.symbol}>
                      <span>{res.symbol} : {res.lastSalePrice}</span>
                    </li>
                    )
                  })}
                </ul>
            </div>)
          : <div>Loading...</div>}
      </div>
        );
    }
}