import React from 'react';
import './main.css';
import * as infohandler from '../modules/InformationHandler.mjs';

class InteractionHistory extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            interactions: null,
            contactID: props.contactID,
            userID: props.userID,
            isLoaded: false,
            openEdit: props.openEdit
        }
    }

    async componentDidMount(){
        this.updateInteractions();
    }

    updateInteractions(){
        infohandler.getInteractionList(this.state.userID, this.state.contactID)
        .then((res) =>  res.json())
        .then((res) => {
            //console.log(res);
            this.setState({ interactions: res.sort((a,b) => {
                                                    return new Date(a.date_occurring).getTime() - 
                                                        new Date(b.date_occurring).getTime()
                                                }).reverse(), isLoaded: true })
        }).catch((err) => {
            //console.log(err);
        })
    }
	
	render(){
        var interactions = this.state.interactions;
        var isLoaded = this.state.isLoaded;

        if(!isLoaded){
            return <div>Loading Interactions ...</div>
        }

		return(
            <div class="interactionHistoryContainer">
                
                {interactions.map(interaction => (
                    <div class="interactionHistoryEntry">
                        <div class="interaction_history_date"> {new Date(interaction.date_occurring).toDateString()} </div>
                        <div class="interaction_history_description"> {interaction.interaction_type} </div>
                        <button class="interaction_history_details" onClick={() => {this.state.openEdit(interaction.id)}}>View Details</button>
                    </div>
                ))}
            </div>
        );
        }
    }

export default InteractionHistory;
