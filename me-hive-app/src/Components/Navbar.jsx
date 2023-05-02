import React from 'react';
import './main.css';
import './ComponentCSS/phone-main.css';
import NavBarAdd from '../Assets/Home Screen Assets/Images/nav_add_selected@2x.png'
import NavBarImport from '../Assets/Home Screen Assets/Images/nav_import_selected@2x.png'
import NavBarContacts from '../Assets/Home Screen Assets/Images/nav_contacts_selected@2x.png'
import NavBarSettings from '../Assets/Home Screen Assets/Images/nav_settings_selected@2x.png'
import NavBarLogout from '../Assets/Home Screen Assets/Images/nav_logout.png'
import Logo from '../Assets/Home Screen Assets/Images/mehive_logo.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import * as infohandler from '../modules/InformationHandler.mjs';

const Navbar = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	return <NavBarCore location={location} navigate={navigate}></NavBarCore>
}

class NavBarCore extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			id : this.props.location.state.userId,
			contact_id : this.props.location.state.contactId
		}
	}

	render(){
		var { id, contact_id}  = this.state;
		return (
			<div className = "navBar">
				<div class="meHiveToolBar">
					<div class="meHiveLabel"><button onClick={()=>{this.props.navigate("/contacts", { state: { userId: id, contactId: contact_id}})}}><img class="LogoIcon" src={Logo} alt="Logo"/></button></div>
					<div class= "navButton"> <button onClick={()=>{this.props.navigate("/contacts", { state: { userId: id, contactId: contact_id}})}}><img class= "navBarButton" src={NavBarContacts} alt="navBarContacts"/> </button></div>
					<div class= "navButton"> <button onClick={()=>{this.props.navigate("/add", { state: { userId: id, contactId: contact_id}})}}><img class= "navBarButton" src={NavBarAdd} alt="navBarAdd"/></button></div>
					<div class= "navButton"> <button onClick={()=>{this.props.navigate("/auth", { state: { userId: id, contactId: contact_id}})}}><img class= "navBarButton" src={NavBarImport} alt="navBarImport"/></button></div>
					<div class= "navButton"> <button onClick={()=>{this.props.navigate("/", { state: { userId: null, contactId: null}})}}><img class= "navBarButton" src={NavBarLogout} alt="navBarSettings"/></button> </div>
					<div class= "navButton"> <img class= "navBarButton" src={NavBarSettings} alt="navBarAdd"/> </div>
				</div>
			</div>
		)
	}
}

export default Navbar;