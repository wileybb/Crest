import React, {Component} from "react";
import socketIOClient from "socket.io-client";
// import Conditiontable from "./condition.js"

//stock: ["spy","dai","ndaq","iwm"]

export default class Topstock extends Component {
    state = {
          response:[],
          APPL:0,
          GOOGL:0,
          stock: ["aapl", "googl", "fb"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops"
        }
    componentDidMount(){
        const{endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connect', () => {
            // Subscribe to topics (i.e. appl,fb,aig+)
            //socket.on('message', message => console.log(message))
            socket.emit('subscribe', this.state.stock.join(","));
            // Unsubscribe from topics (i.e. aig+)
            //socket.emit('unsubscribe', 'aig+')
            //console.log(response);
          })
          socket.on('message', (message) => {
              //let livesymbol = JSON.parse(message);
              // console.log(livesymbol)
              this.setState({response:JSON.parse(message)});
              // if(livesymbol.symbol === "APPL"){
              //   this.setState({APPL:livesymbol.lastSalePrice});
              // } else if(livesymbol.symbol === "GOOGL"){
              //   this.setState({GOOGL:livesymbol.lastSalePrice});
              // }
              console.log(this.state.response);
              //console.log(this.state.symbol)
            })
       }

    render(){
      //const response = {};
      const response = this.state;
      const APPL =this.state;
      const GOOGL= this.state;
      // const {symbol} = this.state;
      // console.log(this.state.response);
      //console.log(this.state.response.symbol + this.state.response.lastSalePrice);
      return(
            <div style={{ textAlign: "center" }}>
        {response
          ? (<div>
              {/* {response}  key={name}*/}
              {/* Object.values(this.state.response).map({response} => {<div > */}
                {/* this.state.response.map((res) => { */}
                <div>Live Stock Price available in console log</div>
                <ul>
                  <li>{this.state.response.symbol}: {this.state.response.lastSalePrice}</li>
                </ul>
                {/* }) */}
              {/* </div>})  */}
            </div>)
          : <div>Loading...</div>}
      </div>
        );
    }
}