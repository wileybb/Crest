import React, {Component} from "react";
import API from "../../utils/API"
import { Link, Redirect } from 'react-router-dom';


export default class Home extends Component {
    state = {
        symbol:"",
        response:{}
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
    validateForm() {
        return this.state.symbol.length > 0;
      }
    stockSymbol = (symbol) => {
        API.singleStock(symbol)
      .then((res) => {
        //this.props.history.replace('/home');  
        this.setState({response:res});
        console.log(this.state.response)})
      .catch(err => console.log(err));
    }
    
    render(){
        return (<div className="container">
        
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
            {Object.keys(this.state.response).length === 0 ? (<p>No Symbol To display yet!!!</p>) : (
            <tbody>
            <tr>
                <td>Stock</td><br></br>
                <td>{this.state.symbol}</td>
            </tr>
            <tr>
                <td>Close</td><br></br>
                <td>{this.state.response.data.quote.close}</td>
            </tr>
            <tr>
                <td>Current $</td><br></br>
                <td>{this.state.response.data.quote.latestPrice}</td>
            </tr>
            <tr>
                <td>Change</td><br></br>
                <td>{this.state.response.data.quote.change}</td>
            </tr>
            <tr>
                <td>Change %</td><br></br>
                <td>{this.state.response.data.quote.changePercent}</td>
            </tr>
            <tr>
                <td>High</td><br></br>
                <td>{this.state.response.data.quote.high}</td>
            </tr>
            <tr>
                <td>Low</td><br></br>
                <td>{this.state.response.data.quote.low}</td>
            </tr>
            <tr>
                <td>52 Wk High</td><br></br>
                <td>{this.state.response.data.quote.week52High}</td>
            </tr>
            <tr>
                <td>52 Wk Low</td><br></br>
                <td>{this.state.response.data.quote.week52Low}</td>
            </tr>
            </tbody>
            )}
            </div>
            </div>
        </div>)}  //Render End
}