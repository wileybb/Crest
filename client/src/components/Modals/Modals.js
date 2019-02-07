import React, {Component} from 'react';
import {MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';

export default class Modals extends Component {
    state = {
        show:false
    }

    toggleModal = () => {
        this.setState({
        show: !this.state.show
        });
     };
        
    render (){
        return (
            <div>
              {(this.state.show) ? (
                <MDBModal show={this.state.show} isOpen={this.state.show} toggle={this.toggleModal} >
                  <MDBModalHeader></MDBModalHeader>
                  <MDBModalBody>Please Enter Correct Username or Password</MDBModalBody>
                  <MDBModalFooter>
                  <MDBBtn className="btn-grey" variant="gray" onClick={this.toggleModal}>
                  Close
                  </MDBBtn>
                  </MDBModalFooter>
                </MDBModal>) : null}
            </div>
        )
    }
}