import React from 'react'
import './App.css';
import NavBar from './Components/Navbar';
import logo from './Assets/2015-09-meHive-launch.png'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as infohandler from './modules/InformationHandler.mjs';

const UserSelection = (props) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    return <UserSelectionCore navigate={navigate}></UserSelectionCore>
}

 class UserSelectionCore extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userlist : null,
            selection: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        //console.log(value);
        infohandler.setUserID(value);
        this.setState({
            selection: value
        });
    }

    async componentDidMount(){
        const response = await infohandler.getUserList();
        const data = await response.json();
        this.setState({loading: false, userlist: data, selection: null})
        //console.log(this.state.userlist); 
    }

    render() {
        if (this.state.loading) {
            return ( <div>loading....</div>);
        } else {
            return (
                <div class="userSelectionContainer">
                    <div class = "userSelect">
                        <img src={logo} alt="logo"></img>
                        <h3>Please select from the following list of users :</h3>
                        <select class="userDropDown" id="selection" onChange={this.handleChange}> 
                            <option>SELECT USER</option> 
                            {this.state.userlist.map(user => (<option value={user.id} key={user.id}>{user.id}: {user.email}</option>))} 
                        </select>
                    </div>
                    <div class="redirectButtonContainer">
                        <button class="redirectButton" onClick = {()=>{this.props.navigate("/contacts", { state: { userId: this.state.selection}})}}> Enter</button>
                    </div>
                </div>
            );
        }   
    }
}

export default UserSelection;