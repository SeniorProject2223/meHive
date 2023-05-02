import React from 'react'
import Navbar from './Components/Navbar';
import './App.css';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import * as infohandler from './modules/InformationHandler.mjs';

const SalesforceImport = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <SalesforceImportCore location={location} navigate={navigate}></SalesforceImportCore>
}

class SalesforceImportCore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            contactID: props.location.state.contactId,
            userID: props.location.state.userId,
            loading:true,
            sampleContact: null,
            mappingOptions: [],
            accessToken: ""
        }
        this.newMapping = {};
        this.resetMapping()

        this.populateSelects = this.populateSelects.bind(this);
    }

    resetMapping() {
        this.newMapping = {
            f_name: "",
            m_name: "",
            l_name: "",
            company: "",
            title: "",
            work_email: "",
            personal_email: "",
            mobile_phone:"",
            work_phone: "",
            website: ""
        }
    }

     //#region Setters
     updateFName(evt){
        this.newMapping.f_name = evt.value;
    }

    updateLName(evt){
        this.newMapping.l_name = evt.value;
    }

    updateMName(evt){
        this.newMapping.m_name = evt.value;
    }

    updateCompany(evt){
        this.newMapping.company = evt.value;
    }

    updateTitle(evt){
        this.newMapping.title = evt.value;
    }

    updateWorkEmail(evt){
        this.newMapping.work_email = evt.value;
    }

    updatePersonalEmail(evt){
        this.newMapping.personal_email = evt.value;
    }

    updateMobilePhone(evt){
        this.newMapping.mobile_phone = evt.value;
    }

    updateWorkPhone(evt){
        this.newMapping.work_phone = evt.value;
    }

    updateWebsite(evt){
        this.newMapping.website = evt.value;
    }
    //#endregion
    getMappingOptions(){
        let credential = this.props.location.state.credentials
        infohandler.getFirstSalesforceContact(credential.username, credential.password, credential.securityToken)
        .then(response => response.json())
        .then(data => {
            console.log(typeof data);
            this.setState({accessToken: credential.securityToken})
            this.populateSelects(Object.keys(data.mapping[0]));
        });
    }

    populateSelects(options){
        var selectFields = [];
        for (let i = 0; i < options.length; i++){
            let newOption = {value: options[i], label: options[i]}
            selectFields.push(newOption)
        }
        this.setState({mappingOptions: selectFields, loading: false});
        console.log("Setting fields and stopping load");
    }

    importContactsAndInteractions(){;
        infohandler.importSalesforceContacts(this.state.accessToken, this.newMapping, this.state.userID)
        .then((result) => {
            this.props.navigate("/contacts", { state: { userId: this.state.userID, contactId: this.state.contactID}})    
        })
    }

    render(){
        if(this.state.loading) {
            this.getMappingOptions();
            return ( <div>loading....</div>);
        }else{
            return  <div id="component-body">
                <div><Navbar></Navbar></div>
                <div id="top-bar-edit" class="top-bar">
                    <h1>Import Contacts and Interactions</h1>
                    <div>
                        <button onClick={() => {
                            this.importContactsAndInteractions();
                        }}>Import Contacts</button>
                    </div>
                </div>
                <div id="data-entry">
                    <div id="text-input">
                        <h2>Contact Mapping</h2>
                        <span>
                            <label for="firstName">First name:</label>
                            <Select options={this.state.mappingOptions} type="text" id="firstName" name="firstName" onChange={evt => this.updateFName(evt)} required size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="middleName">Middle name:</label>
                            <Select options={this.state.mappingOptions} type="text" id="middleName" name="middleName" onChange={evt => this.updateMName(evt)} required size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="lastName">Last name:</label>
                            <Select options={this.state.mappingOptions} type="text" id="lastName" name="lastName" onChange={evt => this.updateLName(evt)} required size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="company">Company:</label>
                            <Select options={this.state.mappingOptions} type="text" id="company" name="company" onChange={evt => this.updateCompany(evt)} size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="title">Title:</label>
                            <Select options={this.state.mappingOptions} type="text" id="title" name="title" onChange={evt => this.updateTitle(evt)} size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="workEmail">Work Email:</label>
                            <Select options={this.state.mappingOptions} type="text" id="workEmail" name="workEmail" onChange={evt => this.updateWorkEmail(evt)} size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="personalEmail">Personal Email:</label>
                            <Select options={this.state.mappingOptions} type="text" id="personalEmail" name="personalEmail" onChange={evt => this.updatePersonalEmail(evt)} size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="mobilePhone">Mobile Phone:</label>
                            <Select options={this.state.mappingOptions} type="text" id="mobilePhone" name="mobilePhone" onChange={evt => this.updateMobilePhone(evt)} size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="workPhone">Work Phone:</label>
                            <Select options={this.state.mappingOptions} type="text" id="workPhone" name="workPhone" onChange={evt => this.updateWorkPhone(evt)} size="30"/>
                        </span>
                        <br/>
                        <span>
                            <label for="workWebsite">Work Website:</label>
                            <Select options={this.state.mappingOptions} type="text" id="workWebsite" name="workWebsite" onChange={evt => this.updateWebsite(evt)} size="30"/>
                        </span>
                    </div>
                </div>
            </div>;
        }
    }
}

export default SalesforceImport