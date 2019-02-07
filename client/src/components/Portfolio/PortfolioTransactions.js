import React, { Component } from "react";
import API from "../../utils/API";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';

export default class PortfolioTransactions extends Component {
    state = {
        watchList:{},
        transactions:[]
    }

   componentDidMount(){
       API.getPertucularUserWatchList().then((res) => {
           console.log(res.data);
           this.setState({watchList:res.data});
           console.log(this.state.watchList);
       }).then(() => {
        console.log("dot then function ran in transaction");
        this.getUserTransaction();
       });
   }

   //API AJAX Call to user transaction table
   getUserTransaction = () => {
        API.getUserTransactionData(this.state.watchList.UserId).then((res)=> {
            console.log("front transaction route hit");
            this.setState({transactions:res.data})
            console.log(this.state.transactions);
        })
   }


    render() {
        return (
            <div>
                <table id="mytable" className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Stock</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Type</th>
                        <th scope="col">Purchase Price</th>
                        <th scope="col">Purchase Total</th>
                        <th scope="col">Purchase Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transactions.map((data) => {
                        var priceFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.purchasePrice);
                        var totalFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.purchaseTotal);
                        return (
                            <tr>
                            <td><b>{data.symbol.toUpperCase()}</b></td>
                            <td>{data.quantity}</td>
                            <td>{(data.buy) ? ("Buy") : ("Sell")}</td>
                            <td>{priceFormat}</td>
                            <td>{totalFormat}</td>
                            <td>{data.updatedAt.slice(0, data.updatedAt.length-5).replace(/T/g, " ")}</td>
                            </tr>)
                    })}
                </tbody>
                </table>
           </div>
        )
    }   //Return and Render-Method End
} //Portfolio Class end 