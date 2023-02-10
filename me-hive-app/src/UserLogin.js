import React from 'react'
import './App.css';
import NavBar from './Components/Navbar';
import logo from './Assets/2015-09-meHive-launch.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as infohandler from './modules/InformationHandler.mjs';

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
        this.handleUserLookup = this.handleUserLookup.bind(this);
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

    handleUserLookup(email){
        let currentUser = null;
        this.state.userlist.forEach( (user) => {
            if(user.email == email){
                console.log(user);
                currentUser = user;
            }
        });
        return currentUser;
    }

    async handleGetUser(){
        let email = document.getElementById("username").value;
        let user = this.handleUserLookup(email);
        this.handleChange(user.id);
        let upass = document.getElementById("password").value;
        //get user with uname
        const userIDResponse = await infohandler.getUserIDFromEmail(email);
        const userIDData = await userIDResponse.json();
        const userID = userIDData[0].id;
        const userLoginInfoResponse = await infohandler.getUserLoginFromID(userID);
        const userLoginInfoData = await userLoginInfoResponse.json();
        console.log(userLoginInfoData);
        const userHash = userLoginInfoData[0].hash;
        const userSalt = userLoginInfoData[0].salt;
        console.log(userID);
        console.log(userHash);
        console.log(userSalt);
        //infohandler.getUserIDFromEmail -> router call get -> api call db -> db query 
        //hashing vertification
        //login
        this.props.navigate("/contacts", { state: { userId: user.id}});
        
        //this.props.navigate("/contacts", { state: { userId: this.state.selection}})
        
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
                </div>
            );
        }   
    }
}

export default UserLogin;