import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

import Signup from "./components/Signup/signup.js";
import Login from "./components/Login/login.js";
import Home from "./components/Home/home.js";
import Portfolio from "./components/Portfolio/portfolio.js";
// import Jumbotron from "./components/Jumbotron";
import Topstock from "./components/Topstock/topstock.js";
import Allocation from "./components/Allocation/Allocation";
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";

// import logo from "./logo.svg";
// import "./App.css";

class App extends Component {
  render() {
    const isLoggedIn = localStorage.getItem("loggedIn");
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
         <Navbar />
         <Switch>
           <Route exact path="/landing" component={Landing} />
           <Route exact path="/allocate" component={Allocation} />
           <Route exact path="/signup" component={Signup} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/" component={Topstock} />
           {/* <Route exact path="/home" component={Home} /> */}
           <Route
              path="/home"
              render={() =>
                isLoggedIn ? (
                  <Route component={Home} />
                ) : (
                  <Route component={Login} />
                )
              }
            />
           <Route path="/portfolio" 
              render={() => 
                isLoggedIn ? ( 
                 <Route component={Portfolio} />
                 ) : (<Route component={Login} /> )} />
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
