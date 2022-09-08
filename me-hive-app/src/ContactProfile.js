import './App.css';
import React from 'react';
import ContactInfo from './Components/ContactInfo';
import NavBar from './Components/Navbar';
import Main from './Components/Main';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import * as infohandler from './modules/InformationHandler.mjs';

const ContactProfile = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    return <ContactProfileCore location={location} navigate={navigate}></ContactProfileCore>
}

class ContactProfileCore extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            contact: null,
            interactions: null
        }
        //console.log("Core props state: ", this.props.location.state);
    }
    
    async componentDidMount(){
        infohandler.setUserID(this.props.location.state.userId);
        infohandler.setContactID(this.props.location.state.contactId);
        const response = await infohandler.getContactDetails();
        const data = await response.json();
        this.setState({loading: false, contact: data[0]})        
    }

    updateInteractions(){
        infohandler.getInteractionList(this.state.userID, this.state.contactID)
        .then((res) =>  res.json())
        .then((res) => {
            //console.log(res);
            this.setState({ interactions: res.sort((a,b) => {
                                                return new Date(a.date_occurring).getTime() - 
                                                    new Date(b.date_occurring).getTime()
                                            }).reverse(), isLoaded: true })
        }).catch((err) => {
            //console.log(err);
        })
    };

render(){
    if(this.state.loading || !this.state.contact) {
        return ( <div>loading....</div>);
    }else{
    return (
    <div class="profileContainer">
      <div class="contactInfo"> <ContactInfo /></div>
      <div class="navBar"> <NavBar /></div>
      <div class="main"><Main key = {this.state.contact.id} contact = {this.state.contact} interactions={this.state.interactions} /></div>
      <div class="log"></div>
     
    </div>
  );
    }
}
}


export default ContactProfile;
