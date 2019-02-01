import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Navbar from "../Navbar/Navbar";


class Allocation extends React.Component {
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white">
              <h1>Welcome to Crest,<br/><strong>User First Name</strong></h1> 
            </MDBRow>

            <MDBContainer className="flex-center flex-column" style={{ marginTop: -50, height: 2500 }}>
              {/* <MDBRow className="flex-center flex-column" style={{ marginTop: -100, height: 2500 }}> */}
                <MDBCol md="12">
                  <MDBCard className="transparent-background" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <MDBCardBody>
                      <MDBCardTitle className="text-white">
                        <strong>Initialize Fund Allocation</strong>
                      </MDBCardTitle>
                      <MDBCardText>
                        <MDBRow center>
                          <MDBCol md="8">
                            <MDBCard className="mb-3">
                              <MDBCardBody>
                                <MDBCardTitle><strong>Remaining Budget:</strong> $20,000</MDBCardTitle>
                                <MDBCardText>
                                  <form className="form-inline mt-4 mb-4 ml-5">
                                    <MDBIcon icon="search" />
                                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search by Stock Symbol" aria-label="Search" />
                                  </form>
                                </MDBCardText>
                                <MDBContainer>
                                  Results appear here
                                </MDBContainer>
                                <MDBBtn color="elegant" href="#" className="float-right" style={{ marginTop: 20 }}>Buy</MDBBtn>
                                <div className="float-right" style={{ width: 75 }}>
                                  <MDBInput name="quantity" label="Quantity" />
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                          <MDBCol md="4">
                            <MDBCard>
                              <MDBCardBody>
                                <MDBCardTitle><strong>Current Portfolio</strong></MDBCardTitle>
                                <MDBCardText>
                                  <MDBContainer>
                                    Results appear here
                                  </MDBContainer>
                                </MDBCardText>
                                <MDBBtn color="elegant" href="#">Continue</MDBBtn>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>                 
                        </MDBRow>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>  
              {/* </MDBRow> */}
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default Allocation;