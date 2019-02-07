import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import API from "../../utils/API";
import Footer from "../Footer/Footer";
import Modal from "../Modals/Modals.js";

class SignupUI extends React.Component {
  state = {
    username:"",
    password:"",
    email:"",
    show:false
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
      //console.log(userData);
      this.createUser(userData)
  }
  validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length >0;
    }
  createUser = (userSignup) => {
      API.createUser(userSignup)
    .then(res => {
      this.setState({show:true});
      //window.location.href = "/login"      //this.context.router.history.push('/login'); //moved this function to modal
        //alert(res.data);
      })
    .catch(err => console.log(err));
  }

  toggleModal = () => {
    this.setState({
    show: !this.state.show
    });
    window.location.href = "/login"  
 };

  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white">
              <h1>Welcome to Crest.</h1> 
            </MDBRow>
            
            <MDBContainer className="flex-center flex-column mx-auto" style={{ marginTop: -50, height: 2500 }}>
              <MDBCol md="12">

                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="5" className="mx-auto white-text">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)' }}>
                          <MDBCardBody>
                            <form>
                              <p className="h2 py-4"><small>Create an Account</small></p>
                              <div className="white-text text-left mx-auto px-2">
                                <MDBInput
                                  label="Username"
                                  icon="user"
                                  group
                                  type="text"
                                  validate
                                  error="wrong"
                                  success="right"
                                  className="white-text"
                                  name="username"
                                  onChange={this.handleInputChange}
                                  value={this.state.username}
                                />
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
                                  label="Confirm your email"
                                  icon="exclamation-triangle"
                                  group
                                  type="text"
                                  validate
                                  error="wrong"
                                  success="right"
                                  className="white-text"
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
                                <Link to="/login">
                                  <MDBBtn color="grey" type="submit" onClick={this.handleFormSubmit}>
                                    Register
                                  </MDBBtn>
                                </Link>
                              </div>
                              <hr style={{ width: 250, backgroundColor: 'grey' }}/>
                              <p className="grey-text"><small>Already a user? </small></p>
                              <Link to="/login" className="text-white"><MDBBtn outline color="grey" size="md">Log In</MDBBtn></Link>
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
        <Modal show={this.state.show} toggleModal={this.toggleModal}>Thank you for Registering! <br /> Please log in.</Modal>
        <Footer />
      </div>
    );
  }
}

export default SignupUI;