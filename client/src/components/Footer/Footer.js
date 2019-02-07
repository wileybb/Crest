import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow between>
          <MDBCol md="6">
            <h5 className="title"><strong>What is Crest?</strong></h5>
            <p>
            Crest is a mock stock trading platform that enables users to purchase and trade imaginary shares of real stocks in real time. <br/><br/> Data provided for free by <a href="https://iextrading.com/developer" style={{ textDecoration: "underline" }}>IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/" style={{ textDecoration: "underline" }}>IEX’s Terms of Use.</a> <br/><br/> 💻 Website designed for resolutions above 1600 by 1050 :) 💻
            </p>
          </MDBCol>
          <MDBCol md="4" className="text-center">
            <h5 className="title"><strong>Navigation</strong></h5>
            <a href="/" style={{ textDecoration: "underline" }}>Home</a> <br />
            <a href="https://github.com/sgenini/projectThree" style={{ textDecoration: "underline" }}>GitHub Repo</a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} CREST, LLC
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
