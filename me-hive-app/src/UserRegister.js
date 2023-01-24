import React from 'react'
import './App.css';
import NavBar from './Components/Navbar';
import logo from './Assets/2015-09-meHive-launch.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as infohandler from './modules/InformationHandler.mjs';

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
        this.handleGetUser = this.handleGetUser.bind(this);
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

    handleGetUser(){
        let email = document.getElementById("username").value;
        let user = this.handleUserLookup(email);
        this.handleChange(user.id);
        let upass = document.getElementById("password").value;
        //get user with uname
        //get salt
        //hash
        //verify that hash matches
        //login
        this.props.navigate("/contacts", { state: { userId: user.id}});
        
        //this.props.navigate("/contacts", { state: { userId: this.state.selection}})
        
    }

    registerUser() {
        let email = document.getElementById("username").value;
        let upass = document.getElementById("password").value;
        // hash and salt here
        infohandler.createUser(email, upass); // replace function with (email, hash, salt). 
        // related functions in database-connection.js and informationHandler.mjs

        this.props.navigate("/");
    }

    render() {
        if (this.state.loading) {
            return ( <div>loading....</div>);
        } else {
            return (
                <div class="UserRegisterContainer">
                    <div class = "userSelect">
                        <img src={logo} alt="logo"></img>
                        {/* <select class="userDropDown" id="selection" onChange={this.handleChange}> 
                            <option>SELECT USER</option> 
                            {this.state.userlist.map(user => (<option value={user.id} key={user.id}>{user.id}: {user.email}</option>))} 
                        </select> */}
                        <h3>Email</h3>
                        <input class="usernameInput" id="username"> 
                        </input>
                        <h3>Password</h3>
                        <input class="passwordInput" id="password">
                        </input>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {()=>{this.registerUser()}}> Register</button>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {()=>{this.props.navigate("/")}}> Return to Login</button>
                    </div>
                </div>
            );
        }   
    }
}

export default UserRegister;