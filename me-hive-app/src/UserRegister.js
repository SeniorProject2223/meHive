import React from 'react'
import './App.css';
import NavBar from './Components/Navbar';
import logo from './Assets/2015-09-meHive-launch.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as infohandler from './modules/InformationHandler.mjs';
import bcrypt from 'bcryptjs';

const UserRegister = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    return <UserRegisterCore navigate={navigate}></UserRegisterCore>
}

 class UserRegisterCore extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userlist : null,
            selection: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUserLookup = this.handleUserLookup.bind(this);
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

    displayReigisterError(){
        console.log("registration failed");
        document.getElementsByClassName("errorMessage")[0].innerHTML = "Invalid Registration";
    }

    async registerUser() {
        let email = document.getElementById("username").value;
        let upass = document.getElementById("password").value;
        const userIDResponse = await infohandler.getUserIDFromEmail(email);
        const userIDData = await userIDResponse.json();
        if(userIDData.length == 0 ){
            let salt = await bcrypt.genSalt();
            let hash = await bcrypt.hash(upass, salt);
            infohandler.createUser(email, hash, salt);
            this.props.navigate("/");
        } else{
            this.displayReigisterError();
        }
    }

    render() {
        if (this.state.loading) {
            return ( <div>loading....</div>);
        } else {
            return (
                <div class="UserRegisterContainer">
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
                        <button class="redirectButton" onClick = {()=>{this.registerUser()}}> Register</button>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {()=>{this.props.navigate("/")}}> Return to Login</button>
                    </div>
                    <div class="redirectButtonContainer">
                        <h3 class="errorMessage"></h3>
                    </div>
                </div>
            );
        }   
    }
}

export default UserRegister;