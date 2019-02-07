import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed'
import Footer from '../Footer/Footer'
import '../HomeUI/HomeUI.css'

class HomeUI extends React.Component {
  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white">
              <h1 className="">Welcome back to <strong>Crest.</strong></h1>
            </MDBRow>

            <MDBRow className="flex-center text-white mb-3" style={{ marginTop: -150 }}>
              <Link to="/allocate">
                <MDBBtn size="lg" color="elegant" style={{width: 250}}>Trade</MDBBtn>
              </Link>
              <Link to="/portfolio">
                <MDBBtn size="lg" color="elegant" style={{width: 250}}>View Portfolio</MDBBtn>
              </Link>
              <Link to="/watchlist">
                <MDBBtn size="lg" color="elegant" style={{width: 250}}>Watchlist</MDBBtn>
              </Link>
            </MDBRow>
            
            <MDBContainer className="flex-center flex-column mx-auto" style={{ marginTop: -75, height: 2500 }}>
              <MDBCol md="12" className="mx-auto">
                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="11" className="mx-auto mt-3">
                      <h3 className="text-white mb-3">IEX Market News Articles</h3>
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)', height: 500, overflow: "auto" }}>
                          <MDBCardBody>
                            <Newsfeed />
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
        <Footer />
      </div>
    );
  }
}

export default HomeUI;