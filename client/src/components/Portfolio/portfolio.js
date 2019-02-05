import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Router } from "react-router-dom";
import Jumbotron from "../Jumbotron/index";
import FolioCharts from "./FolioCharts.js";



export default class Portfolio extends Component {
    state = {
        watchList: {},
        transactions: [],
        chartData: [],
    };
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         watchList: {},
    //         transactions: [],
    //         chartData: []
    //     };
    // }

    componentDidMount() {
        //this.getPertucularUserWatchList();
        //this.myUser = setTimeout(() => this.getPerticularUserWatchList.bind(this), 500);
        // Wileys stuff
        // this.getPertucularUserWatchList();
        // this.myUser = setTimeout(() => this.getPerticularUserWatchList.bind(this), 500);
        // API.getPertucularUserWatchList().then((res) => {
        //     console.log(res.data);
        //     this.setState({ watchList: res.data });
        //     console.log(this.state.watchList.stock);
        // }).then(() => {
        //     console.log("dot then function ran in portfolio");
        //     this.getUserPortfolio();
        // });
    }
    //}

    //API AJAX Call to user portfolio table 
    getUserPortfolio = () => {
        API.getUserPortfolioData(this.state.watchList.UserId).then((res) => {
            console.log("front portfolio route hit");
        })
    }

    //Logout User Link 
    logoutUser = () => {
        //this.intervalClear();
        localStorage.removeItem("loggedIn");
        API.signOutUser().then((res) => {
            console.log(res);
        }).catch(err => console.log(err));
    }
    //Go to Home page
    goToHomePage = () => {
        this.props.history.push("/home");
    }
    //Go to Transaction page when user clicked on Transactions link
    userTransaction = () => {
        this.props.history.push("/transactions");
    }

    render() {

        return (
            <div className="container">
                <Jumbotron />
                <hr></hr>
                <Link to={'/login'} onClick={this.logoutUser.bind(this)}>Logout</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to={'/home'} onClick={this.goToHomePage.bind(this)}>Home</Link><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Link to={'/transactions'} onClick={this.userTransaction.bind(this)}>Transactions</Link>
                <hr></hr>
                <div className="row">
                    <div className="col-md-6">

                    </div>

                    <div className="col-md-6">
                        {(this.state.chartData).length === 0 ?
                            (
                                <div>
                                    <p>Your Portfolio is Empty!</p>
                                    {/* for reference */}
                                    < FolioCharts width="100%" height="500" />
                                </div>
                            )
                            :
                            (
                                <FolioCharts width="100%" height="500" />
                            )
                        }
                    </div>
                </div> {/* Row div end */}

            </div> //Container Div End
        )
    }   //Return and Render-Method End
} //Portfolio Class end 