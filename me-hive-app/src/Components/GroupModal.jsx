import React from "react";
import './ComponentCSS/modal.css';
import * as infohandler from '../modules/InformationHandler.mjs';

const api = "http://mehive.csse.rose-hulman.edu:3000/api";

export default class GroupModal extends React.Component {

  constructor(props) {
    super(props);
    this.newGroup = {};
    this.resetGroup();
  }

  resetGroup(){
    this.newGroup = {
      name: ""
    }
  }

  saveGroup(){
    if(this.props.mode === "add"){
      //console.log("add");
      this.createGroup()
    } else {
      this.editGroup()
    }
  }

  createGroup(){
    //console.log(JSON.stringify(this.newGroup));
    infohandler.addGroup(this.props.userID, this.newGroup)
    .then((res) => {
        //console.log(res);
        this.props.onClose();
    })
    .catch((error) => {
        //console.error("Error:", error);
        this.props.onClose();
    })
  }

  editGroup(){
    //TODO
  }
 
  fetchGroup(group){
    //TODO
  }

  populateGroup(groupJSON){
    //TODO
  }

  //#region Setters
  updateName(evt){
    this.newGroup.name = evt.target.value;
  }
  //#endregion

  render() {
    if(!this.props.show){
      return null;
    }
    return ( 
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
          <button onClick={this.props.onClose} className="modalCloseButton">Cancel</button>
          <h3 className="modal-title">New Group</h3>
          <button onClick={evt => this.saveGroup()} className="modalSaveButton">Save</button>
          </div>
          <div className="modal-body">
            <div>Group Name</div>
            <input type="text" onChange={evt => this.updateName(evt)}></input>
          </div>
        </div>
      </div>
  )
  }
}