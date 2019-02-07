import React, { Component } from "react";
import API from "../../utils/API"
import { Link, Router } from 'react-router-dom';

export default class CashCheck extends Component {

    state = {
        userCash: 0
    }

    componentDidMount() {
        this.checkCash();
        
        
    }

    //Check the cash value 
    checkCash = () => {
            console.log("check cash func hit");
     API.getCashValue()
         .then(res => {
            console.log("checkcash() ", res);
            console.log("above is the res dot data from checkCash");
            this.setState({userCash: res.data});
        })
        .catch(err => console.log(err))
    
     }

     render(){
         return this.state.userCash
     } 

}