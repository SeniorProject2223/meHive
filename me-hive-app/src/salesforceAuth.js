import React from 'react'
import Navbar from './Components/Navbar';
import './App.css';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as infohandler from './modules/InformationHandler.mjs';

const SalesforceAuth = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    return <SalesforceAuthCore location={location} navigate={navigate}></SalesforceAuthCore>
}

class SalesforceAuthCore extends React.Component{

    constructor(props){
        super(props)
        try {
            const userId =  this.props.location.state.userId;
        } catch (error) {
            this.props.navigate("/error");
        }
        this.credential = {
            username: "",
            password: "",
            securityToken: ""
        }

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateSecurityToken = this.updateSecurityToken.bind(this);
        this.authorizeSalesforce = this.authorizeSalesforce.bind(this)
    }

    updateUsername(evt){
        this.credential.username = evt.target.value;
    }

    updatePassword(evt){
        this.credential.password =  evt.target.value;
    }

    updateSecurityToken(evt){
        this.credential.securityToken = evt.target.value;
    }

    authorizeSalesforce(){
        this.props.navigate("/import", { state: { userId: this.props.location.state.userId, contactId: this.props.location.state.contactId, credentials: this.credential}})
    }

    render(){
        return <div id="component-body">
        <div><Navbar></Navbar></div>
        <div id="data-entry">
            <h2>Please enter your Salesforce credentials</h2>
            <div id = "text-input">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={evt => this.updateUsername(evt)} required size="30"/>
                </div>
                <br/>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={evt => this.updatePassword(evt)} required size="30"/>
                </div>
                <br/>
                <div>
                    <label for="securityToken">Security Token:</label>
                    <input type="password" id="securityToken" name="securityToken" onChange={evt => this.updateSecurityToken(evt)} required size="30"/>
                </div>
            </div>
        </div>
        <button id='submitCredentials' onClick={this.authorizeSalesforce}>Submit</button>
    </div>;
    }
}

export default SalesforceAuth