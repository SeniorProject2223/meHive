import React from 'react';
import './main.css';
import mobileIcon from '../Assets/View Contact Assets/Images/icon_mobile@2x.png';
import emailIcon from '../Assets/View Contact Assets/Images/icon_email.png';
import webIcon from '../Assets/View Contact Assets/Images/icon_url@2x.png';
import phoneIcon from '../Assets/View Contact Assets/Images/icon_phone@2x.png';
import groupIcon from '../Assets/View Contact Assets/Images/icon_groups@2x.png';
import defaultProfileIcon from '../Assets/Home Screen Assets/Images/default_contact@2x.png'
import { useLocation, useNavigate } from 'react-router-dom';
import * as infohandler from '../modules/InformationHandler.mjs';

const ContactInfo = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <ContactInfoCore navigate={navigate} location={location}></ContactInfoCore>
}

class ContactInfoCore extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userID: props.location.state.userId,
            contactID: props.location.state.contactId,
            loading: true,
            contact : null,
        }
    };
    
    async componentDidMount(){
        const response = await infohandler.getContactDetails();
        const data = await response.json();
        const contact = data[0];
        this.setState({loading: false, contact: data[0]})
        // console.log(contact);
        
    }

    deleteContact(){
        infohandler.deleteContact(this.state.userID, this.state.contactID)
        .then((res) => {
            //console.log(res);
            this.props.navigate("/contacts", { state: { userId: this.state.userID }})
        })
        .catch((error) => {
            //console.error("Error:", error);
        })
    }

	render(){
        // let contact = await infohandler.getContactDetails();
        // console.log(this.state.contact);
        if(this.state.loading || !this.state.contact) {
            return ( <div>loading....</div>);
        }else{
		return(
        
			<div class = "contactInfo">
                <img class = "profilePic" src={defaultProfileIcon} alt = "Default Profile Pic"></img>
				<div class = "credentials">
                <p>{this.state.contact.title} </p>
                <p> {this.state.contact.company} </p>
                </div>
                
                
                <div class = 'contactDetails'> 
                <ul >
                   
                       <li class='contactElements'><img src={phoneIcon} style={{width: 20, height: 20 , margin: 0}} alt="phoneIcon"/> &nbsp;&nbsp; {this.state.contact.work_phone}</li>
                       <li class='contactElements'> <img src={mobileIcon} style={{width: 20, height: 20 , margin: 0}} alt="mobileIcon"/> &nbsp;&nbsp; {this.state.contact.mobile_phone}</li>
                       <li class='contactElements'> <img src={emailIcon} style={{width: 20, height: 20 , margin: 0}} alt="emailIcon"/> &nbsp;&nbsp; {this.state.contact.work_email}</li>
                       <li class='contactElements'> <img src={emailIcon} style={{width: 20, height: 20, margin: 0}} alt="emailIcon"/> &nbsp;&nbsp; {this.state.contact.personal_email}</li>
                       <li class='contactElements'> <img src={webIcon} style={{width: 20, height: 20, margin: 0}} alt="webIcon"/> &nbsp;&nbsp; {this.state.contact.website}</li>
                </ul>

                    
                </div>
                {/* <hr/> */}
                <div class = 'contactGroups'>
                    <div style={{'padding-top': '20px', 'padding-left':'1.2em', 'font-weight': 'bold'}}>Groups</div>
                    <ul>
                        <li class = 'contactGroupListElement'> <img src={groupIcon} style={{width: 20, height: 20, margin: 0}} alt="webIcon"/> &nbsp;&nbsp;  New Opportunities</li>
                    </ul>
                </div>

                <div class='contactInfoButtons'>
                    <button class="editContactButton" onClick={() => {
                        //console.log("edit");
                        this.props.navigate("/edit", { state: { userId: this.state.userID, contactId: this.state.contactID}})
                    }}>Edit Contact Info</button>
                    <button class = "deleteContactButon" onClick={() => {
                        this.deleteContact();
                    }}>Delete Contact</button>
                </div>

			</div>
        );
        }
    }
}



export default ContactInfo;