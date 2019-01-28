import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Signup from "./components/Signup/signup.js";
import Login from "./components/Login/login.js"
import Home from "./components/Home/home.js"
import Jumbotron from "./components/Jumbotron";
// import logo from "./logo.svg";
// import "./App.css";

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <Router>
      <div>
         <Jumbotron />
         <Switch>
           <Route exact path="/signup" component={Signup} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/home" component={Home} />
           {/* <Route exact path="/login" component={Login} /> */}
           {/* <Route exact path="/books" component={Books} />
           <Route exact path="/books/:id" component={Detail} />
           <Route component={NoMatch} /> */}
         </Switch>
       </div>
     </Router>
    );
  }
}

export default App;
