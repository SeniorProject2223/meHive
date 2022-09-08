import React from "react";
import './ComponentCSS/modal.css';
import * as infohandler from '../modules/InformationHandler.mjs';

const api = "http://mehive.csse.rose-hulman.edu:3000/api";

export default class SnoozeModal extends React.Component {

  constructor(props) {
    super(props);
    this.snoozeDuration = 0;
    
  }
  updateDuration(evt) {
    this.snoozeDuration = evt.target.value;
  }
  submitSnooze() {
    
    infohandler.snoozeContact(this.props.contact.owner_id, this.props.contact.id, this.snoozeDuration)
     .then((res) => {
      //console.log(res);
      this.props.updateSnoozeButton(true);
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
   
  return ( 
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
        <button onClick={this.props.onClose} className="modalCloseButton">Cancel</button>
        <h3 className="modal-title">Snooze {this.props.contact.f_name} {this.props.contact.l_name}</h3>
        <button onClick={evt => this.submitSnooze()} className="modalSaveButton">Save</button>
        </div>
        <div className="modal-body">
          <div>Duration (in days):</div>
          <input type="number" id="snooze_duration" name="snooze_duration" defaultValue="0" onChange={evt => this.updateDuration(evt)}/>
          
          
        </div>
        
      </div>
    </div>
  )
  }
}