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
        this.state.userlist.forEach( (user) => {
            if(user.email == email){
                console.log(user);
                return user;
            }
        });
    }

    async handleGetUser(){
        let email = document.getElementById("username").value;
        let user = await this.handleUserLookup(email);
        console.log(user);
        this.handleChange(user.id);
        let upass = document.getElementById("password").value;
        //get user with uname
        console.log(user.id);
        //get salt
        //hash
        //verify that hash matches
        //login
        //this.props.navigate("/contacts", { state: { userId: uname}});
        
        //this.props.navigate("/contacts", { state: { userId: this.state.selection}})
        
    }

    render() {
        if (this.state.loading) {
            return ( <div>loading....</div>);
        } else {
            return (
                <div class="UserLoginContainer">
                    <div class = "userSelect">
                        <img src={logo} alt="logo"></img>
                        {/* <select class="userDropDown" id="selection" onChange={this.handleChange}> 
                            <option>SELECT USER</option> 
                            {this.state.userlist.map(user => (<option value={user.id} key={user.id}>{user.id}: {user.email}</option>))} 
                        </select> */}
                        <h3>Username</h3>
                        <input class="usernameInput" id="username"> 
                        </input>
                        <h3>Password</h3>
                        <input class="passwordInput" id="password">
                        </input>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {this.handleGetUser}> Enter</button>
                    </div>
                </div>
            );
        }   
    }
}

export default UserLogin;