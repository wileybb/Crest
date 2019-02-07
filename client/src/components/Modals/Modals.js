import React, {Component} from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';

export default function Modals(props) {
    // state = {
    //     show:false
    // }

    // toggleModal = () => {
    //     this.setState({
    //     show: !this.state.show
    //     });
    //  };
        
        return (
            <div>
              {/* {(this.state.show) ? ( */}
                <MDBModal isOpen={props.show} toggle={props.toggleModal} >
                  <MDBModalHeader></MDBModalHeader>
                  <MDBModalBody className="mx-auto text-center">{props.children}</MDBModalBody>
                  <MDBModalFooter>
                  <MDBBtn className="btn-grey" variant="gray" onClick={props.toggleModal}>Close</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
                {/* ) : null} */}
            </div>
        )
    }
