import React, {Component} from "react";
import API from "../../utils/API"
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {
        email:"",
        password:""
    }
    handleInputChange=(event) => {
        const{name, value} = event.target;
        this.setState({[name]: value});
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
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length >0;
      }
    loginUser = (userLogin) => {
        API.loginUser(userLogin)
      .then((res) => {
        this.props.history.replace('/home');  
        console.log(res)})
      .catch(err => console.log(err));
    }
    
    render(){
        return (<div className="container">
            <form className="form">
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
               <button className="btn btn-lg btn-info" disabled={!this.validateForm} onClick={this.handleFormSubmit}>Login</button>
               <hr />
               <p>Open an account? <Link to={'/signup'}>SignUp</Link></p>
            </form>
        </div>)}  //Render End

}