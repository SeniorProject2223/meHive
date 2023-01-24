import React from 'react'
import './App.css';
import NavBar from './Components/Navbar';
import largeGroup from './Assets/View Contact Assets/Images/btn_int_lg_group@2x.png';
import smallGroup from './Assets/View Contact Assets/Images/btn_int_sm_group@2x.png';
import email_social from './Assets/View Contact Assets/Images/btn_int_email@2x.png';
import phone from './Assets/View Contact Assets/Images/btn_int_phone@2x.png';
import direct from './Assets/View Contact Assets/Images/btn_int_direct@2x.png';
import severe from './Assets/Home Screen Assets/Images/status_severe@2x.png';
import connected from './Assets/Home Screen Assets/Images/status_connected@2x.png';
import snoozed from './Assets/Home Screen Assets/Images/moon.png';
import caution from './Assets/Home Screen Assets/Images/status_caution@2x.png';
import edit from './Assets/Home Screen Assets/Images/btn_groups_edit@2x.png';
import add from './Assets/Home Screen Assets/Images/add_group_icon@2x.png';
import deleteIcon from './Assets/Home Screen Assets/Images/btn_groups_delete@2x.png';
import multiSelectButton from './Assets/Home Screen Assets/Images/multi-select-btn@2x.png';
import multiSelectButtonPressed from './Assets/Home Screen Assets/Images/multi-select-done@2x.png';
import multiSelectContactSelected from './Assets/View Contact Assets/Images/import_checkmark@2x.png';
import DeleteRow from './Assets/Home Screen Assets/Images/delete-row.png';
import MultiInteraction from './Components/MultiInteraction';
import Modal from './Components/Modal';
import GroupModal from "./Components/GroupModal"
import DeleteGroupModal from "./Components/DeleteGroupModal"
import InteractionHistory from './Components/InteractionHistory';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as infohandler from './modules/InformationHandler.mjs';

const ContactListPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    return <ContactListPageCore location={location} navigate={navigate}></ContactListPageCore>
}

class ContactListPageCore extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            contacts: [],
            groups: [],
            defaultContacts: [],
            filteredContacts: [],
            groupContactId: [],
            groupContacts: [],
            activeFilter: null,
            sortOrder: null,
            id: null,
            contact_fname: null,
            contact_lname: null,
            contact_id: null,
            contact_severity: null,
            activeModal: false,
            interactionType: null,
            editGroups: false,
            multiContactSelectMode: false,
            multiContactSelected: new Map(),
            groupSelected: false,
            groupID: 0,
            groupName: "",
            searchTerm : ""
        }
        this.selectedContactIDs = [];
        this.groupContactArray = {};
        this.contactsToDeleteArray = {};
        this.deleteGroupModal = React.createRef();
        this.defaultData = [];
        this.showLargeGroupModal = this.showLargeGroupModal.bind(this);
        this.showSmallGroupModal = this.showSmallGroupModal.bind(this);
        this.showEmailSocialModal = this.showEmailSocialModal.bind(this);
        this.showDirectModal = this.showDirectModal.bind(this);
        this.showPhoneModal = this.showPhoneModal.bind(this);
        this.showContactGroupModal = this.showContactGroupModal.bind(this);
        this.showDeleteGroupModal = this.showDeleteGroupModal.bind(this);
        this.hideModal =  this.hideModal.bind(this);
        this.filterWithSearch = this.filterWithSearch.bind(this);
        this.updateSortBy = this.updateSortBy.bind(this);
        this.updateFilterBy = this.updateFilterBy.bind(this);
        try {
            const userId =  this.props.location.state.userId;
        } catch (error) {
            this.props.navigate("/error");
        }
    }

    showLargeGroupModal = () => {
        this.state.multiContactSelectMode ?
        this.setState({ activeModal: 'multiLargeGroup' }) :
        this.setState({ activeModal: 'largeGroup' })
    }; 
    showSmallGroupModal = () => {
        this.state.multiContactSelectMode ?
        this.setState({ activeModal: 'multiSmallGroup' }) :
        this.setState({ activeModal: 'smallGroup'});
    }; 
    showEmailSocialModal = () => {
        this.state.multiContactSelectMode ?
        this.setState({ activeModal: 'multiEmailSocial' }) :
        this.setState({ activeModal: 'emailSocial' });
    }; 
    showDirectModal = () => {
        this.state.multiContactSelectMode ?
        this.setState({ activeModal: 'multiDirect' }) :
        this.setState({ activeModal: 'direct' });
    }; 
    showPhoneModal = () => {
        this.state.multiContactSelectMode ?
        this.setState({ activeModal: 'multiPhone' }) :
        this.setState({ activeModal: 'phone' });
    };
    showContactGroupModal = () => {
        this.setState({ activeModal: 'newContactGroup' });
    }
    showDeleteGroupModal = (groupID) => {
        this.setState({ activeModal: 'deleteGroup' });
        this.deleteGroupModal.current.setInfo(this.state.id, groupID);
    };
    hideModal = () => {
        this.setState({ activeModal: false });
    }; 
    hideContactModal = () => {
        this.getGroups();
        this.hideModal();
    };
    filterWithSearch (e) {
        const search = e.target.value;
        const res = search.replace(/ /g, '')
        this.setState({searchTerm : res});
        
    }
     strcmp(a, b){   
         var contact1 = null;
         var contact2 = null;
        a==null? contact1="zzzz":contact1=a.toString().toLowerCase();
        b==null? contact2="zzzz":contact2=b.toString().toLowerCase();
        
     
    return (contact1<contact2?-1:(contact1>contact2?1:0));  
    }

    severityCmp(a, b){
        var contact1 = this.severityNum(a);
        var contact2 = this.severityNum(b);
        return (contact1<contact2?-1:(contact1>contact2?1:0));  
    }
    severityNum(a){
        if(a === "severe") return 1;
        else if (a === "caution")  return 10;
        else if (a === "nominal") return 100;
        else return 0;
    }


    updateSortBy(e){
        const unSortedFiltered = this.state.filteredContacts.map((x) => x);
        const sort = e.target.value;
        const sortedArr = this.SortBy(unSortedFiltered, sort);
        switch(sort){
            case "SeverityDESC":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "LastNameASC":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "LastNameDSC":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "FirstNameASC":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "FirstNameDSC":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "CompanyASC":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "CompanyDSC":
              
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            case "default":
                this.setState({contacts: sortedArr, sortOrder: sort});
                break;
            default:
                break;
        }
        
    }

    SortBy(arr, order){
        switch(order){
            case "SeverityDESC":
                return arr.sort((a, b) => this.severityCmp(b.severity, a.severity));
            
            case "LastNameASC":
                return arr.sort((a, b) => this.strcmp(a.l_name, b.l_name));
                
            case "LastNameDSC":
                return arr.sort((a, b) => this.strcmp(b.l_name, a.l_name));
                
            case "FirstNameASC":
                return arr.sort((a, b) => this.strcmp(a.f_name, b.f_name));
          
            case "FirstNameDSC":
                return arr.sort((a, b) => this.strcmp(b.f_name, a.f_name));
        
            case "CompanyASC":
                return arr.sort((a, b) => this.strcmp(a.company, b.company));
              
            case "CompanyDSC":
                // this.setState({contacts: this.state.contacts.filter((contact)=> {return contact.severity === "caution";})});
                return arr.sort((a, b) => this.strcmp(b.company, a.company));
            
            case "default":
                return arr.sort((a, b) => this.severityCmp(a.severity, b.severity));
         
            default:
        }
        
    }
    FilterBy(arr, filter){        
        switch(filter){
            case "ALLRESULTS":
            return arr;
            case "SeveritySevere":
                return arr.filter((contact) => {return contact.severity === "severe";});
            case "SeverityCaution":
                return arr.filter((contact) => {return contact.severity === "caution";});
            case "SeverityNominal":
                return arr.filter((contact) => {return contact.severity === "nominal";});
            case "Snoozed":
                return arr.filter((contact) => {return contact.is_snoozed === 1;});
            case "NotSnoozed":
                return arr.filter((contact) => {return contact.is_snoozed === 0;});
            default:
                break;
        }
    }

    updateFilterBy(e){
        const unfiltered = this.state.groupContacts.map((x) => x);
        const filter = e.target.value;
        const unfilteredSorted = this.SortBy(unfiltered, this.state.sortOrder).map((x) => x);
        const filteredSorted = this.FilterBy(unfilteredSorted, filter).map((x)=> x);
        switch(filter){
            case "ALLRESULTS":
                this.setState({contacts: unfilteredSorted , filteredContacts: unfilteredSorted, activeFilter: filter});
                // this.updateSortBy("FirstNameASC");
                break;
            case "SeveritySevere":
                this.setState({contacts: filteredSorted, filteredContacts: filteredSorted, activeFilter: filter});
                break;
            case "SeverityCaution":
                this.setState({contacts: filteredSorted, filteredContacts: filteredSorted, activeFilter: filter});
                break;
            case "SeverityNominal":
                this.setState({contacts: filteredSorted, filteredContacts: filteredSorted, activeFilter: filter});                
                break;
            case "Snoozed":
                this.setState({contacts: filteredSorted, filteredContacts: filteredSorted, activeFilter: filter});                
                break;
            case "NotSnoozed":
                this.setState({contacts: filteredSorted, filteredContacts: filteredSorted, activeFilter: filter});                
                break;
            default:
                break;
        }

    }

    addContactToGroup(userID, groupID, contactIDs){
        this.groupContactArray.contact_ids = contactIDs;
        infohandler.addContactToGroup(userID, groupID, this.groupContactArray)
      }

    async deleteContact(userID, contactIDs){
        this.contactsToDeleteArray = contactIDs;
        await infohandler.deleteContacts(userID, this.contactsToDeleteArray)
    }

    async deleteContactsFromGroup(userID, groupID, contactIDs){
        this.contactsToDeleteArray = contactIDs;
        //console.log("PREPARE FOR DELETE -> userID %d, groupID %d, contactIDs", userID, groupID, this.contactsToDeleteArray);
        await infohandler.deleteContactsFromGroup(userID, groupID, this.contactsToDeleteArray)
    }
    
    async componentDidMount(){
        await Promise.all([this.getContactList(), this.getGroups()])
        this.setState({id: this.props.location.state.userId, isLoaded: true });
    }

    async getContactList(){
        let dataMap;
        await infohandler.getContactList()
            .then(response => response.json())
            .then(data => dataMap = data.map((x) => x))
        const defaultData = dataMap.map((x) => x);
        const filteredData = dataMap.map((x) => x);
        this.setState({groupContacts: defaultData, activeFilter: "ALLRESULTS", sortOrder: "default", filteredContacts: filteredData, defaultContacts: defaultData, contacts: dataMap, id: this.props.location.state.userId, isLoaded: true});
    }

    async getGroups(){
        let groupListData;
        await infohandler.getGroupList()
            .then(response => response.json())
            .then(data => groupListData = data) 
        this.setState({ groups: groupListData });
    }

    async getGroupContacts(groupID){
        let groupContactData;
        await infohandler.getGroupContacts(groupID)
            .then(response => response.json())
            .then(data => groupContactData = data) 
        this.setState({ groupContactId: groupContactData });
    }

   async retrieveGroupContacts(groupId){
       //console.log("GROUP CONTACT ID: ", groupId)
        await this.getGroupContacts(groupId);
        const unSortedFiltered = this.state.defaultContacts.map((x) => x);
        const groupFiltered = unSortedFiltered.filter((contact)=> {return this.state.groupContactId.includes(contact.id)});
        const groupSortedContacts =  this.SortBy(groupFiltered, this.state.sortOrder).map((x)=> x);
        const groupFilteredAndSortedContacts =  this.FilterBy(groupSortedContacts, this.state.activeFilter).map((x) => x);
        this.setState({groupContacts: groupFilteredAndSortedContacts, contacts: groupFilteredAndSortedContacts, filteredContacts: groupFilteredAndSortedContacts});
    }
    async displayGroupContacts(groupId){

    }
    displayAllContacts(){
        const allContacts = this.state.defaultContacts.map((c) => c);
        const sortedContacts =  this.SortBy(allContacts, this.state.sortOrder).map((x)=> x);
        const filteredAndSortedContacts =  this.FilterBy(sortedContacts, this.state.activeFilter);
        this.setState({contacts: filteredAndSortedContacts, groupContacts: allContacts, filteredContacts: allContacts});

    }

    clearSelectedContacts(){
        this.state.multiContactSelected = new Map();
    }

    render(){
        var { isLoaded, contacts, groups, defaultContacts, id, activeModal, searchTerm}  = this.state;
        if(!isLoaded){
            return <div className="loading">Your contacts will appear here shortly ...</div>
        }
       else{
           
            return (
                <body>
                <div class="navBar"> <NavBar /></div>
                    <div className="contactListPage">
                        <div className="groups">
                            <div id="group-header">
                                <h2>GROUPS</h2>
                                <div id="edit-groups" > 
                                    <button onClick={()=>{
                                        this.setState({ editGroups: !this.state.editGroups });}}>
                                        <img src={edit} alt="Edit Groups"/> </button></div>
                            </div>
                            {this.state.editGroups ?
                                <div className='groupsDisplay'>
                                     <div class="grid-item groups-list-entry"
                                        draggable="false">
                                        <div class="groupEntry">
                                        All Contacts
                                        </div>
                                    </div>
                                    {groups.map(group => (
                                    <div class="grid-item groups-list-entry"
                                    draggable="false"
                                    onDrop={(event)=>{}}
                                    onDragOver={(event)=>{event.preventDefault()}}
                                    > 
                                        <div><button class='deleteGroupButton' onClick={()=>{
                                            this.showDeleteGroupModal(group.id)
                                            }}>
                                                                 <img class="deleteGroupButton" src={deleteIcon} alt="Delete Group"/> </button></div>
                                        <div class="groupEntry">
                                            {group.name}
                                        </div>
                                    </div>
                                    ))}
                                    <div id="add-group" > <button onClick={()=>{this.showContactGroupModal()}}>
                                                            <img src={add} alt="Add Group"/> </button></div>
                                </div>
                                :
                                <div className='groupsDisplay'>
                                     <div class="grid-item groups-list-entry"
                                        draggable="false">
                                        <div class="groupEntry" onClick={()=> {
                                            this.setState({groupSelected: false});
                                            this.displayAllContacts();
                                            }}>
                                        All Contacts
                                        </div>
                                    </div>
                                    {groups.map(group => (
                                    <div class="grid-item groups-list-entry"
                                    draggable="false"
                                    onClick={() => {
                                        this.setState({groupSelected: true});
                                        this.setState({groupID: group.id});
                                        this.setState({groupName: group.name})
                                        this.retrieveGroupContacts(group.id)}
                                    }
                                    onDrop={(event)=>{
                                        var obj = JSON.parse(event.dataTransfer.getData("contactDetails"));
                                        this.state.multiContactSelectMode ?
                                        this.addContactToGroup(obj.userID, group.id, obj.contactIDs)
                                        :
                                        this.addContactToGroup(obj.userID, group.id, [obj.contactIDs]);
                                        
                                    }}
                                    onDragOver={(event)=>{event.preventDefault()}}
                                    > 
                                        <div class="groupEntry">
                                            {group.name}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            }
                        </div>
                        <div className="allContacts"> 
                                <div className = "searchBarContainer" >
                                <label className = "sortByLabel" for="filterby">Filter By:</label>
                                    <select class="FilterDropDown" id="filterby" onChange={this.updateFilterBy}> 
                                        <option value ="ALLRESULTS">ALL RESULTS</option> 
                                        <option value="SeveritySevere">Severity: Severe</option>
                                        <option value="SeverityCaution">Severity: Caution</option>
                                        <option value="SeverityNominal">Severity: Nominal</option>
                                        <option value="Snoozed">Snoozed</option>
                                        <option value="NotSnoozed">Not Snoozed</option>
                                    </select>
                                    
                                    <label className = "sortByLabel" for="sortby">Sort By:</label>
                                    <select class="SortDropDown" id="sortby" onChange={this.updateSortBy}> 
                                        <option value ="default">Severity (LOW - HIGH)</option> 
                                        <option value="SeverityDESC">Severity (HIGH - LOW)</option>
                                        <option value="FirstNameASC">First Name (A-Z)</option>
                                        <option value="FirstNameDSC">First Name (Z-A)</option>
                                        <option value="LastNameASC">Last Name (A-Z)</option>
                                        <option value="LastNameDSC">Last Name (Z-A)</option>
                                        <option value="CompanyASC">Company (A-Z)</option>
                                        <option value="CompanyDSC">Company (Z-A)</option>
                                    </select>
                                    <input className = "searchBar"  type="text" placeholder="Search for Contact" onChange={this.filterWithSearch}/>
                                </div> 
                           
                            <div className='contactListScroll'>

                                <div className='allContactsGrid'>
                                    <div className="allContactsHeader">
                                        {this.state.groupSelected ?
                                            <h2>{this.state.groupName}</h2>
                                            :
                                            <h2>ALL CONTACTS</h2>
                                        }        
                                    </div>
                                    <div className="multiSelectButtonContainer">
                                        <button onClick={()=>{
                                            this.selectedContactIDs = [];
                                            let multiContactSelectModeState = !this.state.multiContactSelectMode;
                                            this.setState( {multiContactSelectMode: multiContactSelectModeState})
                                            ;}}>
                                            {this.state.multiContactSelectMode ?
                                            <img id="multiSelectButtonPressed" src={multiSelectButtonPressed} style={{width: 50, height: 25 , margin: 0}}></img> :
                                            <img id="multiSelectButton" src={multiSelectButton} style={{width: 30, height: 30 , margin: 0}}></img> 
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div class="grid-container">
                                    {contacts.filter((contact) => 
                                    {return contact.f_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) || contact.l_name.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())  }).map(contact => (   


                                    <div id="contacts-list" class="grid-item"
                                        onDragStart={(event)=>{
                                            var contactDetails = {userID: id, contactIDs: this.selectedContactIDs}
                                            if(this.state.multiContactSelectMode){
                                                var contactDetailsJson = JSON.stringify(contactDetails);
                                                event.dataTransfer.setData("contactDetails", contactDetailsJson)
                                            } else {
                                                var contactDetails = {userID: id, contactIDs: contact.id}
                                                var contactDetailsJson = JSON.stringify(contactDetails);
                                                event.dataTransfer.setData("contactDetails", contactDetailsJson) 
                                            }
                                        }}
                                        draggable="true"
                                        onDrop={(event)=>{
                                            this.state.contact_fname = contact.f_name;
                                            this.state.contact_lname = contact.l_name;
                                            this.state.contact_id = contact.id;
                                            var modalType = event.dataTransfer.getData("text");
                                            switch(modalType){
                                                case "LargeGroup":
                                                    this.showLargeGroupModal();
                                                    break;
                                                    case "SmallGroup":
                                                        this.showSmallGroupModal();
                                                        break;
                                                    case "EmailSocial":
                                                        this.showEmailSocialModal();
                                                        break;
                                                    case "Direct":
                                                        this.showDirectModal();
                                                        break;
                                                    case "Phone":
                                                        this.showPhoneModal();
                                                        break;
                                                    default:
                                                        break;
                                            }
                                            }}
                                            onDragOver={(event)=>{event.preventDefault()}}

                                            
                                           >
                                             
                                        <div draggable="false" className='gridProfilePic'
                                         onClick={()=>{
                                            {if(!this.state.multiContactSelectMode)
                                                this.props.navigate("/profile", { state: { userId: id, contactId: contact.id}})
                                            }
                                        }}>
                                            <div className='gridSeverity'>
                                             {(() => {
                                                if(contact.is_snoozed === 1){
                                                    return <img id="snoozed" src={snoozed} style={{width: 20, height: 20 , margin: 0}}></img>;
                                                }
                                                if(contact.is_trending === 1){
                                                    return <img id="connected" src={connected} style={{width: 20, height: 20 , margin: 0}}></img>;
                                                }

                                                switch(contact.severity) {
                                                    case "severe": return  <img id="severe" src={severe} style={{width: 20, height: 20 , margin: 0}}></img>;
                                                    case "caution": return <img id="caution" src={caution} style={{width: 20, height: 20 , margin: 0}}></img>;
                                                    case "connected": return <img id="connected" src={connected} style={{width: 20, height: 20 , margin: 0}}></img>;
                                                    default: return;
                                                }
                                                
                                                })()}
                                            </div>

                                            {this.state.multiContactSelectMode ?
                                                <div className='gridText'>
                                                    <div className='multiSelect'
                                                    onClick={()=>{
                                                        let mapChange = this.state.multiContactSelected;
                                                        let selected = this.state.multiContactSelected.get(contact.id);
                                                        mapChange.set(contact.id, !selected);
                                                        this.setState({multiContactSelected: mapChange});
                                                        if(this.state.multiContactSelected.get(contact.id)){
                                                            this.selectedContactIDs.push(contact.id);
                                                        } else {
                                                            if(this.state.multiContactSelected.has(contact.id)){
                                                                let index = this.selectedContactIDs.indexOf(contact.id);
                                                                this.selectedContactIDs.splice(index);
                                                            }
                                                        }
                                                    }}>
                                                            <div>
                                                                {this.state.multiContactSelected.get(contact.id) ? 
                                                                    <img id="multiContactIsSelected" src={multiSelectContactSelected} style={{width: 20, height: 20 , margin: 0}}></img> 
                                                                    :
                                                                    <img id="multiContactIsNotSelected" src={add} style={{width: 20, height: 20 , margin: 0}}></img>
                                                                }
                                                            </div>          
                                                    </div> 
                                                    <b>{contact.f_name + " " + contact.l_name}</b>
                                                    <br></br>
                                                    {contact.company} 
                                                </div> :
                                                <div className='gridText'>
                                                    {this.clearSelectedContacts()}
                                                    <b>{contact.f_name + " " + contact.l_name}</b>
                                                    <br></br>
                                                    {contact.company} 
                                                </div>
                                            }
                                        </div>

                                    </div>
                                ))}
                            </div>
                            </div>
                            {this.state.multiContactSelectMode ?
                            <div className="deleteContactRow"
                            onDrop={async (event)=>{
                                //console.log("selected contact IDs: ", this.selectedContactIDs)
                                //console.log("In delete, current group: ", this.state.groupID)
                                var obj = JSON.parse(event.dataTransfer.getData("contactDetails"));
                                //console.log("contacts going to be deleted ...", obj.contactIDs)
                                !this.state.multiContactSelectMode ?
                                this.deleteContact(obj.userID, [obj.contactIDs])
                                :
                                this.state.groupSelected ?
                                await this.deleteContactsFromGroup(obj.userID, this.state.groupID, obj.contactIDs)
                                :
                                await this.deleteContact(obj.userID, obj.contactIDs)
                                this.getContactList();
                            }}
                            onDragOver={(event)=>{event.preventDefault()}}>
                                <img id="DeleteContactRow" src={DeleteRow} />
                            </div>
                            :
                            <div></div>
                            }        
                            <Modal show={activeModal === 'largeGroup'} onClose={this.hideModal} interactionType={1} fName={this.state.contact_fname} lName={this.state.contact_lname} userID = {id} contactID = {this.state.contact_id} mode='add'/>
                            <Modal show={this.state.activeModal === 'smallGroup'} onClose={this.hideModal} interactionType={3} fName={this.state.contact_fname} lName={this.state.contact_lname} userID = {id} contactID = {this.state.contact_id} mode='add'/>
                            <Modal show={this.state.activeModal === 'phone'} onClose={this.hideModal} interactionType={4} fName={this.state.contact_fname} lName={this.state.contact_lname} userID = {id} contactID = {this.state.contact_id}  mode='add'/>
                            <Modal show={this.state.activeModal === 'emailSocial'}  onClose={this.hideModal} interactionType={2} fName={this.state.contact_fname} lName={this.state.contact_lname} userID = {id} contactID = {this.state.contact_id}  mode='add'/>
                            <Modal show={this.state.activeModal === 'direct'} onClose={this.hideModal} interactionType={5} fName={this.state.contact_fname} lName={this.state.contact_lname} userID = {id} contactID = {this.state.contact_id}  mode='add'/>


                            <MultiInteraction show={activeModal === 'multiLargeGroup'} onClose={this.hideModal} interactionType={1} userID = {id} contactID = {this.selectedContactIDs} mode='add'/>
                            <MultiInteraction show={this.state.activeModal === 'multiSmallGroup'} onClose={this.hideModal} interactionType={3} userID = {id} contactID = {this.selectedContactIDs} mode='add'/>
                            <MultiInteraction show={this.state.activeModal === 'multiPhone'} onClose={this.hideModal} interactionType={4} userID = {id} contactID = {this.selectedContactIDs}  mode='add'/>
                            <MultiInteraction show={this.state.activeModal === 'multiEmailSocial'}  onClose={this.hideModal} interactionType={2} userID = {id} contactID = {this.selectedContactIDs}  mode='add'/>
                            <MultiInteraction show={this.state.activeModal === 'multiDirect'} onClose={this.hideModal} interactionType={5} userID = {id} contactID = {this.selectedContactIDs}  mode='add'/>

                            <GroupModal show={this.state.activeModal === 'newContactGroup'} onClose={this.hideContactModal} userID = {id} mode='add'></GroupModal>
                            <DeleteGroupModal ref={this.deleteGroupModal} show={this.state.activeModal === "deleteGroup"} onClose={this.hideContactModal}></DeleteGroupModal>     
                        </div>
                        <div className="interactions"> 
                            <h2>INTERACTIONS</h2>
                                <div className="contactListPageInteractionsColumn">
                                    <img id="dragLargeGroup" src={largeGroup} style={{width: 110, height: 110 , margin: 0}} 
                                    onDragStart={(event)=>{
                                        event.dataTransfer.setData("text", "LargeGroup");
                                    }}
                                    draggable="true" 
                                    alt="Large Group Icon"
                                    onClick={(event) => {
                                        if(true) { // Check if on mobile
                                            this.showLargeGroupModal();
                                        }
                                        }}/>
                                    <img id="dragSmallGroup" src={smallGroup} style={{width: 110, height: 110 , margin: 0}} 
                                    onDragStart={(event)=>{event.dataTransfer.setData("text", "SmallGroup")}}
                                    draggable="true"
                                    alt="Small Group Icon"
                                    onClick={(event) => {
                                        if(true) { // Check if on mobile
                                            this.showSmallGroupModal();
                                        }
                                        }}/>
                                    <img id="dragEmail" src={email_social} style={{width: 110, height: 110 , margin: 0}} 
                                    onDragStart={(event)=>{event.dataTransfer.setData("text", "EmailSocial")}}
                                    draggable="true"
                                    alt="Email Icon"
                                    onClick={(event) => {
                                        if(true) { // Check if on mobile
                                            this.showEmailSocialModal();
                                        }
                                        }}/>
                                    <img id="dragPhone" src={phone} style={{width: 110, height: 110 , margin: 0}} 
                                    onDragStart={(event)=>{event.dataTransfer.setData("text", "Phone")}}
                                    draggable="true"
                                    alt="Phone Icon"
                                    onClick={(event) => {
                                        if(true) { // Check if on mobile
                                            this.showPhoneModal();
                                        }
                                        }}/>
                                    <img id="dragDirect" src={direct} style={{width: 110, height: 110 , margin: 0}} 
                                    onDragStart={(event)=>{event.dataTransfer.setData("text", "Direct")}}
                                    draggable="true"
                                    alt="Direct Icon"
                                    onClick={(event) => {
                                        if(true) { // Check if on mobile
                                            this.showDirectModal();
                                        }
                                        }}/>
                                </div>   
                            </div>            
                        </div>
                </body>
            );
        }
    }
};
export default ContactListPage;