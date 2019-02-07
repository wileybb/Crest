import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import API from "../../utils/API";
import Footer from '../Footer/Footer';
import Modal from '../Modals/Modals.js';

class LoginUI extends React.Component {
  state = {
    email: "",
    password: "",
    show:false,
    loginres:""
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
      window.location.href = "/home"      //this.context.router.history.push('/home');
      console.log(this.state.userid)  
      console.log(res)})
    .catch(err => {
        //alert("Email or Password is invalid");
        this.setState({loginres: "Email or Password is invalid, please try again.", show:true})
        console.log(err);});
  }

  toggleModal = () => {
    this.setState({
    show: !this.state.show
    });
 };

  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white">
              <h1>Welcome back to Crest.</h1> 
            </MDBRow>
            
            <MDBContainer className="flex-center flex-column mx-auto" style={{ marginTop: -50, height: 2500 }}>
              <MDBCol md="12">

                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="5" className="mx-auto white-text">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)' }}>
                          <MDBCardBody>
                            <form className="form">
                              <p className="h2 py-4"><small>Account Login</small></p>
                              <div className="white-text text-left mx-auto px-2">
                                <MDBInput
                                  label="Your email"
                                  icon="envelope"
                                  group
                                  type="email"
                                  validate
                                  error="wrong"
                                  success="right"
                                  className="white-text"
                                  name="email"
                                  onChange={this.handleInputChange}
                                  value={this.state.email}
                                />
                                <MDBInput
                                  label="Your password"
                                  icon="lock"
                                  group
                                  type="password"
                                  validate
                                  className="white-text"
                                  name="password"
                                  onChange={this.handleInputChange}
                                  value={this.state.password}
                                />
                              </div>
                              <div className="text-center mt-3">
                                <Link to="/homeUI">
                                  <MDBBtn color="grey" type="submit" onClick={this.handleFormSubmit}>
                                    Login
                                  </MDBBtn>
                                </Link>
                              </div>
                              <hr style={{ width: 250, backgroundColor: 'grey' }}/>
                              <p className="grey-text"><small>Don't have an account? </small></p>
                              <Link to="/signup" className="text-white"><MDBBtn outline color="grey" size="md">Sign Up</MDBBtn></Link>
                            </form>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBRow>
              </MDBCol>  
            </MDBContainer>
          </MDBMask>
        </MDBView>
        <Modal show={this.state.show} toggleModal={this.toggleModal}>{this.state.loginres}</Modal>
        <Footer />
      </div>
    );
  }
}

export default LoginUI;