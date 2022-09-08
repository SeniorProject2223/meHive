import React from "react";
import './ComponentCSS/modal.css';

import * as infohandler from '../modules/InformationHandler.mjs';

export default class DeleteGroupModalModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: -1,
      groupID: -1
    }
  }

  setInfo(currentUserID, oldGroupID){
    //console.log(currentUserID, oldGroupID);
    this.setState({userID: currentUserID, groupID: oldGroupID});
    //console.log("Modal state: ", this.state);
  }

  deleteGroup(){
    var {userID, groupID}  = this.state;
    infohandler.deleteGroup(userID, groupID)
    .then((res) => {
      //console.log(res);
      this.props.onClose();
    })
    .catch((error) => {
        //console.error("Error:", error);
        this.props.onClose();
    })
  }
  

  render() {
    if(!this.props.show){
      return null;
    }
    return ( 
      <div className="modal">
        <div className="modal-content">
          <div className="confirmation-modal-header">
            <h3 className="confirmation-modal-title">Delete Group</h3>
            <div>Are you sure? This action cannot be undone</div>
            <br/>
          </div>
          <div className="confirmation-modal-body">
            <button onClick={this.props.onClose} className="modalCloseButton">Cancel</button>
            <button onClick={() => {this.deleteGroup()}} className="modalDeleteButton">Delete</button>
          </div>
        </div>
      </div>
  )
  }
}