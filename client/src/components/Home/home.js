import React, {Component} from "react";
import API from "../../utils/API"
import { Link, Redirect } from 'react-router-dom';


export default class Home extends Component {
    // state = {
    //     email:"",
    //     password:""
    // }
    // handleInputChange=(event) => {
    //     const{name, value} = event.target;
    //     this.setState({[name]: value});
    // }
    // handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     const loginData = {
    //         email: this.state.email,
    //         password: this.state.password
    //     }
    //     this.loginUser(loginData);
    // }
    // validateForm() {
    //     return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length >0;
    //   }
    // loginUser = (userLogin) => {
    //     API.loginUser(userLogin)
    //   .then((res) => {
    //     this.props.history.replace('/home');  
    //     console.log(res)})
    //   .catch(err => console.log(err));
    // }
    
    render(){
        return (<div className="container">
        
               <h1>Welcome to home page</h1>

        </div>)}  //Render End

}