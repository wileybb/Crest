import React from 'react';
import { MDBContainer, MDBMask, MDBView, MDBBtn, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon, MDBInput } from 'mdbreact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PortfolioTransactions from './PortfolioTransactions'
import TotalValue from './TotalValue'
import Footer from '../Footer/Footer'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


class PortfolioTransactionsUI extends React.Component {

  
  printDocument = () => {
    const input = document.getElementById('mytable');
    html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('p', 'mm');
            pdf.addImage(imgData, 'PNG', 10, 10);
            // pdf.output('dataurlnewwindow');
            pdf.save("myDocument.pdf");
        });
  }

  render() {
    return (
      <div>
        <MDBView src="https://images.unsplash.com/photo-1460620105278-b7f0516e6d65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          <MDBMask overlay="black-light" className="flex-center flex-column text-center align-middle mx-auto">

            <MDBRow className="flex-center text-white mt-5">
              {/* <h2 className=""><strong>Current Portfolio</strong></h2> <br /> */}
              <Link to="/PortfolioDiversityUI">
                <MDBBtn size="lg" color="elegant">Portfolio Diversity</MDBBtn>
              </Link>
              <Link to="/PortfolioSummaryUI">
                <MDBBtn size="lg" color="elegant">Portfolio Summary</MDBBtn>
              </Link>
              <Link to="/PortfolioTransactionsUI">
                <MDBBtn size="lg" active color="elegant">Transactions</MDBBtn>
              </Link>
            </MDBRow>

            <MDBContainer className="flex-center flex-column mx-auto " style={{ marginTop: 50, height: 2500 }}>
              <MDBCol md="12">
                <MDBRow>
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol lg="8" className="mx-auto mt-1">
                        <MDBCard className="shadow-box-example hoverable" style={{ backgroundColor: 'rgba(0,0,0,.7)', height: 600, overflow: "auto" }}>
                          <MDBCardBody>
                            <MDBCard className="shadow-box-example hoverable mx-auto" style={{opacity: ".85"}} >
                              <TotalValue />
                              <PortfolioTransactions />            
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

export default PortfolioTransactionsUI;