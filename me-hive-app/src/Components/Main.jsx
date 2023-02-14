import React from 'react';
import './main.css';
import largeGroup from '../Assets/View Contact Assets/Images/btn_int_lg_group@2x.png';
import smallGroup from '../Assets/View Contact Assets/Images/btn_int_sm_group@2x.png';
import email_social from '../Assets/View Contact Assets/Images/btn_int_email@2x.png';
import phone from '../Assets/View Contact Assets/Images/btn_int_phone@2x.png';
import direct from '../Assets/View Contact Assets/Images/btn_int_direct@2x.png';
import InteractionHistory from './InteractionHistory';
import Modal from './Modal';
import SnoozeModal from './snoozeModal';
import ViewSnoozeModal from './viewSnoozeModal';
import * as infohandler from '../modules/InformationHandler.mjs';


class Main extends React.Component {
    constructor(props){
    super()
    this.interactionHistory = React.createRef();
    this.editModal = React.createRef();
    this.contact = props.contact;
    var sBool = (this.contact.snooze_until === null)? false: true;
    this.state = {
        activeModal: false,
        sModal: false,
        sVModal: false, 
        interactionType: null,
        editedInteraction: null,
        snoozeBoolean: sBool,
        contact: props.contact,
        viewSnoozeModal: null

      }
    this.showLargeGroupModal = this.showLargeGroupModal.bind(this);
    this.showSmallGroupModal = this.showSmallGroupModal.bind(this);
    this.showEmailSocialModal = this.showEmailSocialModal.bind(this);
    this.showDirectModal = this.showDirectModal.bind(this);
    this.showPhoneModal = this.showPhoneModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideModal =  this.hideModal.bind(this);
    this.showSnoozeModal =  this.showSnoozeModal.bind(this);
    this.hideSnoozeModal =  this.hideSnoozeModal.bind(this);
    this.updateSnoozeButton = this.updateSnoozeButton.bind(this);
    this.showViewSnoozeModal =  this.showViewSnoozeModal.bind(this);
    this.hideViewSnoozeModal =  this.hideViewSnoozeModal.bind(this);
    this.updateContact = this.updateContact.bind(this);
    }
    showLargeGroupModal = () => {
        this.setState({ activeModal: 'largeGroup' });
    }; 
    showSmallGroupModal = () => {
        this.setState({ activeModal: 'smallGroup'});
    }; 
    showEmailSocialModal = () => {
        this.setState({ activeModal: 'emailSocial' });
    }; 
    showDirectModal = () => {
        this.setState({ activeModal: 'direct' });
    }; 
    showPhoneModal = () => {
        this.setState({ activeModal: 'phone' });
    };
    showEditModal = (interaction) => {
        this.setState({ activeModal: 'edit' });
        this.editModal.current.fetchInteraction(interaction);
    };
    hideModal = () => {
        this.setState({ editedInteraction: null, activeModal: false });
        this.interactionHistory.current.updateInteractions()
    }; 
    hideSnoozeModal = () => {
        this.setState({sModal: false});
    }
    showSnoozeModal = () => {
        this.setState({sModal: true});
        

    }
    hideViewSnoozeModal = () => {
        this.setState({sVModal: false});
    }
    showViewSnoozeModal = () => {
        this.setState({sVModal: true});
        

    }
    updateSnoozeButton(flag){
         this.setState({snoozeBoolean: flag});
    }
    renderSnoozeButton(){
        if(!this.state.snoozeBoolean){
            return <button class ="snoozeButton" onClick = {this.showSnoozeModal}>Snooze Contact</button>
        } else return <button class ="snoozedButton" onClick = {this.showViewSnoozeModal}>Contact Snoozed</button>

    }
    updateContact(){
        const userID = this.props.contact.owner_id;
        const contactID = this.props.contact.id;
        infohandler.getContactInformation(userID, contactID)
        .then(response => response.json())
        .then(data => {
            this.setState({contact: data[0]});
            
            
        })
       .catch((error) => {
         //console.error("Error:", error);
     })
    }
    renderViewSnoozeModal(){
        if(this.snoozeBoolean){
            this.setState({viewSnoozeModal: <ViewSnoozeModal show={this.state.sVModal} onClose={this.hideViewSnoozeModal} contact={this.state.contact} updateSnoozeButton={this.updateSnoozeButton} updateContact = {this.updateContact}></ViewSnoozeModal>});
        }
        <ViewSnoozeModal show={this.state.sVModal} onClose={this.hideViewSnoozeModal} contact={this.state.contact} updateSnoozeButton={this.updateSnoozeButton} updateContact = {this.updateContact}></ViewSnoozeModal>

    
    }
    render(){
        
       
        const { f_name, m_name, l_name } =  this.props.contact;
        
        
        
		return(
            <div class = "mainContainer">
                <div class="profileIntro">
                    <div class = "mainInfoContainer">
                        <div>
                            <h1 class="contactName">{f_name} {m_name} {l_name}</h1>
                            <p class = "lastContactLabel">Last Contact: None</p>
                            </div>
                        <div class="snoozeContainer">
                            {/* <button class ="snoozeButton" onClick = {this.showSnoozeModal}>Snooze Contact</button> */}
                            {this.renderSnoozeButton()}
                            <SnoozeModal show={this.state.sModal} onClose={this.hideSnoozeModal} updateSnoozeButton={this.updateSnoozeButton} updateContact = {this.updateContact} contact={this.contact}></SnoozeModal> 
                            <ViewSnoozeModal show={this.state.sVModal} onClose={this.hideViewSnoozeModal} contact={this.state.contact} updateSnoozeButton={this.updateSnoozeButton} updateContact = {this.updateContact}></ViewSnoozeModal>

                        </div>
                    </div>
                <hr/>
            </div>
                

                <div>
                    <h3>DID YOU CONTACT {f_name}?</h3>
                    <div   class="interactionsContainer"> 
                        <div class = "interactionGridItem"  onClick = { this.showLargeGroupModal} ><img class="profileInteractionIcon" src={largeGroup} alt="Large Group Icon"/></div>
                        <div class = "interactionGridItem"  onClick = { this.showEmailSocialModal}> <img class="profileInteractionIcon" src={email_social} alt="Email Social Icon"/></div>
                        <div class = "interactionGridItem" onClick = { this.showSmallGroupModal}> <img class="profileInteractionIcon" src={smallGroup} alt="Small Group Icon"/> </div>
                        <div class = "interactionGridItem" onClick = { this.showPhoneModal}> <img class="profileInteractionIcon" src={phone} alt="Phone Icon"/></div>
                        <div class = "interactionGridItem" onClick = { this.showDirectModal}> <img class="profileInteractionIcon" src={direct} alt="Direct Icon"/></div>
                        
                        <Modal show={this.state.activeModal === 'largeGroup'} onClose={this.hideModal}  interactionType={1} fName={f_name} lName={l_name} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} mode='add'/>
                        <Modal show={this.state.activeModal === 'smallGroup'} onClose={this.hideModal} interactionType={3} fName={f_name} lName={l_name} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} mode='add'/>
                        <Modal show={this.state.activeModal === 'phone'} onClose={this.hideModal} interactionType={4} fName={f_name} lName={l_name} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} mode='add'/>
                        <Modal show={this.state.activeModal === 'emailSocial'}  onClose={this.hideModal} interactionType={2} fName={f_name} lName={l_name} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} mode='add'/>
                        <Modal show={this.state.activeModal === 'direct'} onClose={this.hideModal} interactionType={5} fName={f_name} lName={l_name} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} mode='add'/>
                        <Modal show={this.state.activeModal === 'edit'} ref = {this.editModal} onClose={this.hideModal} interactionType={5} fName={f_name} lName={l_name} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} mode='edit'/>                  
                      
                    </div>

                </div>



                <div class='interactionHistory'>
                    <h3>INTERACTION HISTORY</h3> 
                    <InteractionHistory ref={this.interactionHistory} userID = {this.props.contact.owner_id} contactID = {this.props.contact.id} openEdit = {this.showEditModal.bind(this)}/>
                </div>
            </div>

        );
        }
}
export default Main;