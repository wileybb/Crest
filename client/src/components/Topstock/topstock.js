import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import API from "../../utils/API.js";
// import Conditiontable from "./condition.js"

//stock: ["spy","dai","ndaq","iwm"]
var stockArr =[];
export default class Topstock extends Component {
    state = {
          stockResponse:[],
          APPL:{},
          GOOGL:{},
          AMZN:{},
          stock: ["spy","dai","ndaq","iwm","aapl", "googl", "fb"],
          endpoint: "https://ws-api.iextrading.com/1.0/tops",
        }
    componentDidMount(){
        const{endpoint} = this.state;
        const socket = socketIOClient(endpoint);
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
               stockArr.length = 0;
                //console.log((JSON.parse(message)));
              })
          })
            // API.alphaVantageCall().then((res) => {
            //     console.log(res)
            // });  
        // const{endpoint} = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on('connect', () => {
        //     // Subscribe to topics (i.e. appl,fb,aig+)
        //     //socket.on('message', message => console.log(message))
        //     socket.emit('subscribe', 'appl,googl,msft')
        //     // Unsubscribe from topics (i.e. aig+)
        //     //socket.emit('unsubscribe', 'aig+')
        //     socket.on('message', (message) => {
        //       //this.state.stockResponse.empty();
        //       let liveappl = JSON.parse(message)
        //       //stockArr.push(livesymbol);
        //       this.setState({APPL:liveappl});
        //        //stockArr.length = 0;
        //         //console.log((JSON.parse(message)));
        //       })
        //   })  
        //   socket.on('connect', () => {
        //     // Subscribe to topics (i.e. appl,fb,aig+)
        //     //socket.on('message', message => console.log(message))
        //     socket.emit('subscribe', 'googl')
        //     // Unsubscribe from topics (i.e. aig+)
        //     //socket.emit('unsubscribe', 'aig+')
        //     socket.on('message', (message) => {
        //       //this.state.stockResponse.empty();
        //       let livegoogl = JSON.parse(message)
        //       //stockArr.push(livesymbol);
        //       this.setState({GOOGL:livegoogl});
        //        //stockArr.length = 0;
        //         //console.log((JSON.parse(message)));
        //       })
        //   })     
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
              {this.state.stockResponse.map((stock) => {
                  return (
                      <li key={stock.symbol} className="list-group-item">
                          <h3><span>{stock.symbol}</span></h3>
                          <p><span>{stock.lastSalePrice}</span></p>
                      </li>
                  )})}
          </ul>
          {/* <ul className="list-group">
                      <li key={this.state.APPL.symbol} className="list-group-item">
                          <h3><span>{this.state.APPL.symbol}</span></h3>
                          <p><span>{this.state.APPL.lastSalePrice}</span></p>
                      </li>
                      <li key={this.state.GOOGL.symbol} className="list-group-item">
                          <h3><span>{this.state.GOOGL.symbol}</span></h3>
                          <p><span>{this.state.GOOGL.lastSalePrice}</span></p>
                      </li>
          </ul> */}
        </div>
           )
         : <div>Loading...</div>}
        </div>
        </div>
        </div>
           );   //map return function end
    }
}