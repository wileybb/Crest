import React, {Component} from "react";
import API from "../../utils/API"
import {Router, Link } from 'react-router-dom';
import Jumbotron from "../Jumbotron/index";

class Signup extends Component {
    state = {
        username:"",
        password:"",
        email:"",
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value});
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
        const userData = {  
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
            }
        console.log(userData);
        this.createUser(userData)
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length >0;
      }
    createUser = (userSignup) => {
        API.createUser(userSignup)
      .then(res => {
        this.props.history.push("/login")
        //this.context.router.history.push('/login');
          console.log(res);
          alert(res.data);
        })
      .catch(err => console.log(err));
    }
  render(){
    return (<div className="container">
        <Jumbotron />
        <form className="form">
           {/* <label htmlFor="username">Username:</label> */}
           <div className="form-group">
           <input type="text"
           onChange={this.handleInputChange}
           value={this.state.username}
           name="username"
           placeholder="Username" />
            </div>
            <div className="form-group">
           {/* <label htmlFor="email">Email:</label> */}
           <input type="email"
           onChange={this.handleInputChange}
           value={this.state.email}
           name="email"
           placeholder="abc@abc.com"/>
           </div>
           <div className="form-group">
           {/* <label htmlFor="password">Password:</label> */}
           <input type="password"
           name="password" value={this.state.password}
           onChange={this.handleInputChange}
           placeholder="password"
           />
           </div>
           <button className="btn btn-lg btn-info" disabled={!this.validateForm} onClick={this.handleFormSubmit}>Signup</button>
           <hr />
           <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </form>
    </div>)}  //Render End
}

export default Signup;