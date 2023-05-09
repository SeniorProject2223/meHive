import React from "react";
import './ComponentCSS/modal.css';
import * as infohandler from '../modules/InformationHandler.mjs';

const api = "http://mehive.csse.rose-hulman.edu:3000/api";

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.newInteraction = {};
    this.resetInteraction()
    this.state = {
      users: props.groupContacts,
      contactID: !!props.contactID ? props.contactID : (!props.groupContacts[0] ? null : props.groupContacts[0].id)
    };
  }

  getCurrentDate(){
    let separator='-';
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let wholeDate = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`;
    //console.log(wholeDate);
    return wholeDate; 
  }

  resetInteraction() {
    this.newInteraction = {
        date_occurring: this.getCurrentDate(),
        direction: 0,
        is_thirdparty: 0,
        type: this.props.interactionType,
        details: ""
    }
  }

  saveInteraction(){
    if(this.props.mode === "add"){
      //console.log("add");
      this.createInteraction()
    } else {
      this.editInteraction()
    }
  }

  createInteraction(){
    //console.log(JSON.stringify(this.newInteraction));
    infohandler.addInteraction(this.props.userID, this.props.contactID, this.newInteraction)
    .then((res) => {
        //console.log(res);
        this.props.onClose();
    })
    .catch((error) => {
        //console.error("Error:", error);
        this.props.onClose();
    })
  }

  editInteraction(){
    //console.log(JSON.stringify(this.newInteraction));
    infohandler.updateInteraction(this.props.userID, this.props.contactID, this.state.editInteraction, this.newInteraction)
    .then((res) => {
        //console.log(res);
        this.props.onClose();
    })
    .catch((error) => {
        //console.error("Error:", error);
        this.props.onClose();
    })
  }

  deleteInteraction(){
    infohandler.deleteInteraction(this.props.userID, this.props.contactID, this.state.editInteraction)
    .then((res) => {
        //console.log(res);
        this.props.onClose();
    })
    .catch((error) => {
        //console.error("Error:", error);
        this.props.onClose();
    })
  }
 
  fetchInteraction(interaction){
    this.setState({editInteraction : interaction})
    infohandler.getInteractionDetails(this.props.userID, this.props.contactID, interaction)
    .then(response => response.json())
    .then(data => this.populateInteraction(data[0]))
  }

  populateInteraction(interactionJSON){
    this.setDate(interactionJSON.date_occurring);
    if(interactionJSON.direction == 0){
      document.querySelector("#contactThem").checked = true;
    } else {
      document.querySelector("#contactMe").checked = true;
    }
    if(interactionJSON.is_thirdparty == 0){
      document.querySelector("#notOnMyBehalf").checked = true;
    } else {
      document.querySelector("#onMyBehalf").checked = true;
    }
    document.querySelector("#details").value = interactionJSON.details
  }

  setDate(date){
    let separator='-';
    let newDate = new Date(date)
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let wholeDate = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`;
    document.querySelector("#interaction_date").value = wholeDate;
  }

  //#region Setters
  updateDate(evt){
    this.newInteraction.date_occurring = evt.target.value;
  }
  
  updateDirection(isOutbound){
    this.newInteraction.direction = isOutbound;
  }

  updateIsThirdParty(isThirdParty){
    this.newInteraction.is_thirdparty = isThirdParty;
  }

  updateDetails(evt){
    this.newInteraction.details = evt.target.value;
  }
  //#endregion

    renderDeleteButton(){
      if (!(this.props.mode === "add")){
        //console.log("the mode is add");
        return <button onClick={() => {this.deleteInteraction()}} className="modalDeleteButton">Delete Interaction</button>
      } else {
        return null;
      }
  }

  render() {
    if(!this.props.show){
      return null;
    }
    this.getCurrentDate();
    if(this.props.fName && this.props.lName) {
      return ( 
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <button onClick={this.props.onClose} className="modalCloseButton">Cancel</button>
            <h3 className="modal-title">Interaction with {this.props.fName} {this.props.lName}</h3>
            <button onClick={evt => {this.setState({contactID: this.props.contactID}); this.saveInteraction()}} className="modalSaveButton">Save</button>
            </div>
            <div className="modal-body">
              <div>Contact:</div>
              <div>{this.props.fName} {this.props.lName}</div>
              <div>Date of Interaction:</div>
              <input type="date" id="interaction_date" name="interaction_date" defaultValue={this.getCurrentDate()} onChange={evt => this.updateDate(evt)}/>
              <div>Direction:</div>
              <div className="directionField">
                <input type="radio" id="contactThem" name="switch-direction" defaultValue="outward" onChange={evt => this.updateDirection(0)} defaultChecked />
                <label for="contactThem">I contacted them</label>
                <input type="radio" id="contactMe" name="switch-direction" defaultValue="inward" onChange={evt => this.updateDirection(1)}/>
                <label for="ContactMe">They contacted me</label>
              
              </div>
              <div>Did someone make the interaction on your behalf?</div>
              <div className="interactionBehalfField">
                <input type="radio" id="onMyBehalf" name="switch-behalf" defaultValue="Yes" onChange={evt => this.updateIsThirdParty(1)}/>
                <label for="onMyBehalf">YES</label>
                <input type="radio" id="notOnMyBehalf" name="switch-behalf" defaultValue="No" onChange={evt => this.updateIsThirdParty(0)} defaultChecked/>
                <label for="notOnMyBehalf">NO</label>
              
              </div>
              <div>Anything memorable?</div>
              {/* <input type="text" className="interactNotes" id="interactionNotes" name="interactionNotes"></input> */}
              <textarea name="text" id="details" rows="14" cols="10" wrap="soft" onChange={evt => this.updateDetails(evt)}> </textarea>
            </div>
            <div className="modal-footer">
             {this.renderDeleteButton()}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <button onClick={this.props.onClose} className="modalCloseButton">Cancel</button>
            <h3 className="modal-title">Interaction</h3>
            <button onClick={evt => this.saveInteraction()} className="modalSaveButton">Save</button>
            </div>
            <div className="modal-body">
              <div>Nothing Broski:</div>
              <select value={this.state.contactID} onChange={(event) => {
                this.setState({contactID: event.target.selectedOptions[0].value});
              }}>
              {this.state.users.map((user) => {
                return <option value={user.id}>{user.f_name} {user.l_name}</option>
              })}
            </select>
              <div>Date of Interaction:</div>
              <input type="date" id="interaction_date" name="interaction_date" defaultValue={this.getCurrentDate()} onChange={evt => this.updateDate(evt)}/>
              <div>Direction:</div>
              <div className="directionField">
                <input type="radio" id="contactThem" name="switch-direction" defaultValue="outward" onChange={evt => this.updateDirection(0)} defaultChecked />
                <label for="contactThem">I contacted them</label>
                <input type="radio" id="contactMe" name="switch-direction" defaultValue="inward" onChange={evt => this.updateDirection(1)}/>
                <label for="ContactMe">They contacted me</label>
              
              </div>
              <div>Did someone make the interaction on your behalf?</div>
              <div className="interactionBehalfField">
                <input type="radio" id="onMyBehalf" name="switch-behalf" defaultValue="Yes" onChange={evt => this.updateIsThirdParty(1)}/>
                <label for="onMyBehalf">YES</label>
                <input type="radio" id="notOnMyBehalf" name="switch-behalf" defaultValue="No" onChange={evt => this.updateIsThirdParty(0)} defaultChecked/>
                <label for="notOnMyBehalf">NO</label>
              
              </div>
              <div>Anything memorable?</div>
              {/* <input type="text" className="interactNotes" id="interactionNotes" name="interactionNotes"></input> */}
              <textarea name="text" id="details" rows="14" cols="10" wrap="soft" onChange={evt => this.updateDetails(evt)}> </textarea>
            </div>
            <div className="modal-footer">
             {this.renderDeleteButton()}
            </div>
          </div>
        </div>
      );
    }
  }
}