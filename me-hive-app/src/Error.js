import React from "react";
import { Component } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Error = (props) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  return <ErrorCore location={location} navigate={navigate}></ErrorCore>
}

class ErrorCore extends Component{

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="loading">
        meHive Error
        <br></br>
        Whoops! Looks like there was an error!
        <br></br>
        <br></br>
        <br></br>
        Re-directing now ...
      </div>
    )
  }
}
  

export default Error;
