import React, {Component} from "react";
import socketIOClient from "socket.io-client";

export default class Topstock extends Component {
    constructor() {
        super();
        this.state = {
          response: [],
          endpoint: "https://ws-api.iextrading.com/1.0/tops"
        };
      }
    componentDidMount(){
        const{endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('connect', () => {
            // Subscribe to topics (i.e. appl,fb,aig+)
            //socket.on('message', message => console.log(message))
            socket.emit('subscribe', 'snap,fb,aapl,googl')
            // Unsubscribe from topics (i.e. aig+)
            //socket.emit('unsubscribe', 'aig+')
            //console.log(response);
          })
          socket.on('message', (message) => {
              this.setState({response:message})
              console.log(message)
            })
        //socket.on("FromAPI", data => this.setState({ response: data }));
       }

    render(){
      const {response} = this.state;
      return(
            <div style={{ textAlign: "center" }}>
        {response
          ? (<div>
              {/* {response}  key={name}*/}
              {/* Object.values(this.state.response).map({response} => {<div > */}
                {/* this.state.response.map((res) => { */}
                <div>Live Stock Price available in console log</div>
                {/* }) */}
              {/* </div>})  */}
            </div>)
          : <div>Loading...</div>}
      </div>
        );
    }
}