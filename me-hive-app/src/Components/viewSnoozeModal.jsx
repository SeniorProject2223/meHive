import React from "react";
import './ComponentCSS/modal.css';
import * as infohandler from '../modules/InformationHandler.mjs';

const api = "http://mehive.csse.rose-hulman.edu:3000/api";

export default class viewSnoozeModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null
    }

    
    }
    
    
  
  getCurrentDate(){
    const userID = this.props.contact.owner_id;
    const contactID = this.props.contact.id;
    infohandler.getContactInformation(userID, contactID)
    .then(response => response.json())
    .then(data => {
        const contact = data[0];
        const isoStr = contact.snooze_until;
        const d = new Date(isoStr).toString();
        this.setState({date: d});
        

    })
   .catch((error) => {
     //console.error("Error:", error);
 })



  }
 
  deleteSnooze() {
    
    infohandler.unsnoozeContact(this.props.contact.owner_id, this.props.contact.id)
     .then((res) => {
      this.props.updateSnoozeButton(false);
      this.props.updateContact();
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
    this.getCurrentDate();

    
  
  
  return ( 
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
        <button onClick={this.props.onClose} className="modalCloseButton">Cancel</button>
        <h3 className="modal-title">{this.props.contact.f_name} {this.props.contact.l_name} is Currently Snoozed</h3>
        {/* <button onClick={evt => this.submitSnooze()} className="modalSaveButton">Save</button> */}
        </div>
        <div className="modal-body">
          {/* <div>Duration (in days):</div>
          <input type="number" id="snooze_duration" name="snooze_duration" defaultValue="0" onChange={evt => this.updateDuration(evt)}/> */}
          <div>Current Snooze End Date:</div>
          <div>{this.state.date}</div>
          
          
        </div>
        <div className="modal-footer">
        <button className="vsOKButton" onClick = {this.props.onClose}>OK</button>
        <button className="vsCancelSnoozeButton" onClick={() => {this.deleteSnooze()}}>Unsnooze {this.props.contact.f_name}</button>
        </div>
        
      </div>
    </div>
  )
  }
}