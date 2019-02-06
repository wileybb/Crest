import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Watchlist from '../Watchlist/Watchlist'
import Footer from '../Footer/Footer'


class WatchlistUI extends React.Component {
  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white mt-3 mb-3">
              <h2 className=""><strong>Watchlist</strong></h2> 
            </MDBRow>
            
            <MDBContainer className="flex-center flex-column mx-auto " style={{ marginTop: -25, height: 2500 }}>
              <MDBCol md="12">
                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="8" className="mx-auto mt-1">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)', height: 550, overflow: "auto" }}>
                          <MDBCardBody>
                            <MDBCard className="shadow-box-example hoverable mx-auto" style={{opacity: ".85"}} >
                              <Watchlist />
                            </MDBCard>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBRow>
              </MDBCol>  
            </MDBContainer>
            
            <MDBRow className="flex-center text-white">
              <Link to="/home">
                <MDBBtn color="elegant">Back to Home</MDBBtn>
              </Link>
            </MDBRow>

          </MDBMask>
        </MDBView>
        <Footer />
        
      </div>
    );
  }
}

export default WatchlistUI;