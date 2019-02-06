import React, { Component } from "react";
import API from "../../utils/API"
import { Router, Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import Jumbotron from "../Jumbotron/index";



export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }
    static contextTypes = {
        router: PropTypes.object
    };
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const loginData = {
            email: this.state.email,
            password: this.state.password
        }
        this.loginUser(loginData);
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0;
    }
    loginUser = (userLogin) => {
        API.loginUser(userLogin)
      .then((res) => {
        const storeUser = localStorage.setItem("loggedIn","true");
        //const storeUser = localStorage.removeItem("loggedIn") do this when logout
        this.props.history.push("/home");
        //this.context.router.history.push('/home');
        //Cleared console.log can add later if required
        })
      .catch(err => {
          alert("Email or Password is invalid");
          console.log(err);});
    }

    render() {
        return (<div className="container">
            <Jumbotron />
            <form className="form">
                <div className="form-group">
                    {/* <label htmlFor="email">Email:</label> */}
                    <input type="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        name="email"
                        placeholder="abc@abc.com" />
                </div>
                <div className="form-group">
                    {/* <label htmlFor="password">Password:</label> */}
                    <input type="password"
                        name="password" value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="password"
                    />
                </div>
                <a href="/home"><button className="btn btn-lg btn-info" disabled={!this.validateForm} onClick={this.handleFormSubmit}>Login</button></a>
                <hr />
                <p>Open an account? <Link to={'/signup'}>SignUp</Link></p>
            </form>

        </div>)
    }  //Render End

}