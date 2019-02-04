import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class HomeUI extends React.Component {
  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white mt-5">
              <h1>Welcome back to Crest,<br />(username).</h1> 
            </MDBRow>
            
            <MDBContainer className="flex-center flex-column mx-auto" style={{ marginTop: 0, height: 2500 }}>
              <MDBCol md="12">

                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="5" className="mx-auto white-text">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)' }}>
                          <MDBCardBody>
                            <p className="h2 py-4"><small>View Portfolio</small></p>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                      <MDBCol lg="5" className="mx-auto white-text">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)' }}>
                          <MDBCardBody>
                            <p className="h2 py-4"><small>View Watchlist</small></p>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol lg="11" className="mx-auto white-text mt-5">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)', height: 300 }}>
                          <MDBCardBody>
                            <p className="h2 py-4"><small>News Articles</small></p>
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
      </div>
    );
  }
}

export default HomeUI;