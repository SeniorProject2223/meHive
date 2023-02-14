import React from 'react'
import './App.css';
import NavBar from './Components/Navbar';
import logo from './Assets/2015-09-meHive-launch.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as infohandler from './modules/InformationHandler.mjs';
import bcrypt from 'bcryptjs';

const UserLogin = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    return <UserLoginCore navigate={navigate}></UserLoginCore>
}

 class UserLoginCore extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userlist : null,
            selection: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleGetUser = this.handleGetUser.bind(this);
        this.handleMoveToRegister = this.handleMoveToRegister.bind(this);
    }

    handleChange(e) {
        infohandler.setUserID(e);
        this.setState({
            selection: e
        });
    }

    async componentDidMount(){
        const response = await infohandler.getUserList();
        const data = await response.json();
        this.setState({loading: false, userlist: data, selection: null})
        //console.log(this.state.userlist); 
    }

    displayLoginError(){
        console.log("login failed");
        document.getElementsByClassName("errorMessage")[0].innerHTML = "Invalid Login";
    }

    async handleGetUser(){
        let email = document.getElementById("username").value;
        let upass = document.getElementById("password").value;
        const userIDResponse = await infohandler.getUserIDFromEmail(email);
        const userIDData = await userIDResponse.json();
        if(userIDData.length == 0){
            this.displayLoginError();
            return;
        }

        const userID = userIDData[0].id;
        const userLoginInfoResponse = await infohandler.getUserLoginFromID(userID);
        const userLoginInfoData = await userLoginInfoResponse.json();
        const userHash = userLoginInfoData[0].hash;
        const userSalt = userLoginInfoData[0].salt;
        const newHash = await bcrypt.hash(upass, userSalt);
        
        if(userHash == newHash){
            this.handleChange(userID);
            this.props.navigate("/contacts", { state: { userId: userID}});
        } else{
            this.displayLoginError();
        }

    }

    handleMoveToRegister(){
        this.props.navigate("/register", { state: { userId: 0}});
    }

    render() {
        if (this.state.loading) {
            return ( <div>loading....</div>);
        } else {
            return (
                <div class="UserLoginContainer">
                    <div class = "userSelect">
                        <img src={logo} alt="logo"></img>
                        <h3>Email</h3>
                        <input class="usernameInput" id="username"> 
                        </input>
                        <h3>Password</h3>
                        <input type="password" class="passwordInput" id="password">
                        </input>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {()=>{this.handleGetUser()}}> Enter </button>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {()=>{this.handleMoveToRegister()}}> Register</button>
                    </div>
                    <div class="redirectButtonContainer">
                        <h3 class="errorMessage"></h3>
                    </div>
                </div>
            );
        }   
    }
}

export default UserLogin;