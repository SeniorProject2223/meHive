import React from 'react'
import Navbar from './Components/Navbar';
import './App.css'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import * as infohandler from './modules/InformationHandler.mjs';

//const api = "http://mehive.csse.rose-hulman.edu:3000/api";

const AddContact = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <AddContactCore isNew={props.isNew} navigate={navigate} location={location}></AddContactCore>
}

class AddContactCore extends React.Component {
    constructor(props){    
        super(props);

        this.state = {
            contactID: props.location.state.contactId,
            userID: props.location.state.userId,
            isNew: props.isNew
        }
        //console.log(this.state);
        this.newContact = {};
        if(this.state.isNew){
            this.resetContact()
        } else {
            //console.log("isOld");
            infohandler.getContactDetails()
            .then(response => response.json())
            .then(data => this.loadContactDetails(data[0]))
        }
    }

    resetContact() {
        this.newContact = {
            f_name: "",
            m_name: "",
            l_name: "",
            company: "",
            title: "",
            work_email: "",
            personal_email: "",
            mobile_phone:"",
            work_phone: "",
            website: "",
            status: .5,
            working_relationship: .5,
            knowledge_length: .5
        }
    }

    loadContactDetails(contactDetails){
        //console.log(contactDetails);
        this.newContact = {
            f_name: contactDetails.f_name,
            m_name: contactDetails.m_name,
            l_name: contactDetails.l_name,
            company: contactDetails.company,
            title: contactDetails.title,
            work_email: contactDetails.work_email,
            personal_email: contactDetails.personal_email,
            mobile_phone:contactDetails.mobile_phone,
            work_phone: contactDetails.work_phone,
            website: contactDetails.website,
            status: contactDetails.status,
            working_relationship: contactDetails.working_relationship,
            knowledge_length: contactDetails.knowledge_length
        }
        
        this.updateInputs();
    }

    updateInputs(){
        document.querySelector("#firstName").value = this.newContact.f_name;
        document.querySelector("#middleName").value = this.newContact.m_name;
        document.querySelector("#lastName").value = this.newContact.l_name;
        document.querySelector("#company").value = this.newContact.company;
        document.querySelector("#title").value = this.newContact.title;
        document.querySelector("#workEmail").value = this.newContact.work_email;
        document.querySelector("#personalEmail").value = this.newContact.personal_email;
        document.querySelector("#mobilePhone").value = this.newContact.mobile_phone;
        document.querySelector("#workPhone").value = this.newContact.work_phone;
        document.querySelector("#workWebsite").value = this.newContact.website

        document.querySelector("#status").value = this.newContact.status
        document.querySelector("#relationship").value = this.newContact.working_relationship
        document.querySelector("#timeKnown").value = this.newContact.knowledge_length
    }

    sendNewContact(redirect){
        //console.log(JSON.stringify(this.newContact));
        infohandler.addContact(this.state.userID, this.newContact)
        .then((res) => {
            //console.log(res);
            if(redirect){
                //console.log("Redirect:", this.state.userID);
                this.props.navigate("/contacts", { state: { userId: this.state.userID, contactId: this.state.contactID}})
            } else {
                this.resetContact()
                this.updateInputs()
            }
        })
        .catch((error) => {
            //console.error("Error:", error);
        })
    }

    updateContact(){
        //console.log("Edited contact: ", JSON.stringify(this.newContact));
        infohandler.editContact(this.state.userID, this.state.contactID, this.newContact)
        .then((res) => {
            //console.log(res);
            this.props.navigate("/profile", { state: { userId: this.state.userID, contactId: this.state.contactID}})
        })
        .catch((error) => {
            //console.error("Error:", error);
        })
    }

    //#region Setters
    updateFName(evt){
        this.newContact.f_name = evt.target.value;
    }

    updateLName(evt){
        this.newContact.l_name = evt.target.value;
    }

    updateMName(evt){
        this.newContact.m_name = evt.target.value;
    }

    updateCompany(evt){
        this.newContact.company = evt.target.value;
    }

    updateTitle(evt){
        this.newContact.title = evt.target.value;
    }

    updateWorkEmail(evt){
        this.newContact.work_email = evt.target.value;
    }

    updatePersonalEmail(evt){
        this.newContact.personal_email = evt.target.value;
    }

    updateMobilePhone(evt){
        this.newContact.mobile_phone = evt.target.value;
    }

    updateWorkPhone(evt){
        this.newContact.work_phone = evt.target.value;
    }

    updateWebsite(evt){
        this.newContact.website = evt.target.value;
    }

    updateStatus(evt){
        this.newContact.status = parseFloat(evt.target.value);
    }

    updateRelationship(evt){
        this.newContact.working_relationship = parseFloat(evt.target.value);
    }

    updateDuration(evt){
        this.newContact.knowledge_length = parseFloat(evt.target.value);
    }
    //#endregion

    render() {
        return  <div id="component-body">
          <div><Navbar></Navbar></div>
          {this.state.isNew ?
            <div id="top-bar-add" class="top-bar">
                <h1>Add New Contact</h1>
                <div>
                    <button onClick={() => {
                        this.sendNewContact(false);
                    }}>Save and Add More</button>
                    <button onClick={() => {
                        this.sendNewContact(true);
                    }}>Save Contact</button>
                </div>
            </div>
            :
            <div id="top-bar-edit" class="top-bar">
                <h1>Edit Contact</h1>
                <div>
                    <button onClick={() => {
                        this.updateContact();
                    }}>Save Contact</button>
                </div>
            </div>
        }
        <div id="data-entry">
            <div id="text-input">
                <h2>Contact Information</h2>
                <span>
                    <label for="firstName">First name:</label>
                    <input type="text" id="firstName" name="firstName" onChange={evt => this.updateFName(evt)} required size="30"/>
                </span>
                <br/>
                <span>
                    <label for="middleName">Middle name:</label>
                    <input type="text" id="middleName" name="middleName" onChange={evt => this.updateMName(evt)} required size="30"/>
                </span>
                <br/>
                <span>
                    <label for="lastName">Last name:</label>
                    <input type="text" id="lastName" name="lastName" onChange={evt => this.updateLName(evt)} required size="30"/>
                </span>
                <br/>
                <span>
                    <label for="company">Company:</label>
                    <input type="text" id="company" name="company" onChange={evt => this.updateCompany(evt)} size="30"/>
                </span>
                <br/>
                <span>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" onChange={evt => this.updateTitle(evt)} size="30"/>
                </span>
                <hr/>
                <span>
                    <label for="workEmail">Work Email:</label>
                    <input type="text" id="workEmail" name="workEmail" onChange={evt => this.updateWorkEmail(evt)} size="30"/>
                </span>
                <br/>
                <span>
                    <label for="personalEmail">Personal Email:</label>
                    <input type="text" id="personalEmail" name="personalEmail" onChange={evt => this.updatePersonalEmail(evt)} size="30"/>
                </span>
                <br/>
                <span>
                    <label for="mobilePhone">Mobile Phone:</label>
                    <input type="text" id="mobilePhone" name="mobilePhone" onChange={evt => this.updateMobilePhone(evt)} size="30"/>
                </span>
                <br/>
                <span>
                    <label for="workPhone">Work Phone:</label>
                    <input type="text" id="workPhone" name="workPhone" onChange={evt => this.updateWorkPhone(evt)} size="30"/>
                </span>
                <br/>
                <span>
                    <label for="workWebsite">Work Website:</label>
                    <input type="text" id="workWebsite" name="workWebsite" onChange={evt => this.updateWebsite(evt)} size="30"/>
                </span>
            </div>
            <div id="sliders">
                <h2>Relationship Information</h2>
                <span class="slider">
                    <label for="status">Status</label>
                    <input type="range" id="status" name="status" min="0.0" max="1.0" step='0.01' onChange={evt => this.updateStatus(evt)}/>
                    <div class="slider-label">
                        <span>I am weaker</span>
                        <span>I am stronger</span>
                    </div>
                </span>
                <span class="slider">
                    <label for="relationship">Working Relationship</label>
                    <input type="range" id="relationship" name="relationship" min="0.0" max="1.0" step='0.01' onChange={evt => this.updateRelationship(evt)}/>
                    <div class="slider-label">
                        <span>We don't work well</span>
                        <span>We work well together</span>
                    </div>
                </span>
                <span class="slider">
                    <label for="timeKnown">I've known this contact</label>
                    <input type="range" id="timeKnown" name="timeKnown" min="0.0" max="1.0" step='0.01' onChange={evt => this.updateDuration(evt)}/>
                    <div class="slider-label">
                        <span>Less than a year</span>
                        <span>More than 5 years</span>
                    </div>
                </span>
            </div>
        </div>
    </div>;
    }
  }

  export default AddContact