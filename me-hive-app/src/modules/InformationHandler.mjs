import App from '../App';

var userID = null;
var contactID = null;
var contactList = null;
const api = window.location.protocol+"//"+window.location.hostname + (window.location.port ? ":" + window.location.port: "")+"/api";

export function getUserID() {
    //if userID return userid
    //else fetch
    return userID;
}

export function getUserList(){
    return fetch(`${api}/userlist`)
}

export function createUser(username, hash, salt){
    return fetch(`${api}/createUser`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"username": username, "hash": hash, "salt": salt})});
}


export function setUserID(id) {
    //console.log("setUserID: "+ id)
    userID = id;
}

export function getContactList() {
    //if contactlist return contactlist
    return fetch(`${api}/contactlist/${getUserID()}`)
}

export function getContactID() {
    //if userID return userid
    //else fetch
    return contactID
}

export function setContactID(id) {
    //console.log("setContactID: "+ id)
    contactID = id;
}

export function getContactDetails() {
    //if contactlist return contactlist
    return fetch(`${api}/contactdetails/${getUserID()}/${getContactID()}`);
}

export function getInteractionList(userid, contactid) {
    return fetch(`${api}/interactionlist/${userid}/${contactid}`);
}

export function getInteractionDetails(userid, contactid, interactionid) {
    return fetch(`${api}/interactiondetails/${userid}/${contactid}/${interactionid}`);
}

export function addInteraction(userID, contactID, interaction){
    return addInteractions(userID, [contactID], interaction);
}

export function addInteractions(userID, contactIDs, interaction){
    return fetch(`${api}/createinteraction/${userID}`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...interaction,
            "contact_ids":contactIDs
        })
    })
}

export function updateInteraction(userid, contactid, interactionID, interactionDetails) {
    return fetch(`${api}/updateinteraction/${userID}/${contactID}/${interactionID}`,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(interactionDetails)
    })
}

export function deleteInteraction(userid, contactid, interactionID) {
    return fetch(`${api}/deleteInteraction/${userID}/${contactID}/${interactionID}`,{
        method: "DELETE"
    })
}

export function getGroupList(){
    return fetch(`${api}/grouplist/${getUserID()}`);
}

export function getGroupContacts(groupID){
    return fetch(`${api}/groupcontacts/${getUserID()}/${groupID}`);
}

export function addGroup(userID, group){
    return fetch(`${api}/creategroup/${userID}`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    })
}

export function addContactToGroup(userID, groupID, contactIds){
    return fetch(`${api}/groupaddcontact/${userID}/${groupID}/`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(contactIds)
    })
}

export function deleteGroup(userID, groupid) {
    return fetch(`${api}/deletegroup/${userID}/${groupid}`,{
        method: "DELETE"
    })
}

export function addContact(userID, newContact){
    return fetch(`${api}/createcontact/${userID}`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newContact)
    })
}

export function editContact(userID, contactID, newContact){
    return fetch(`${api}/updatecontact/${userID}/${contactID}`,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newContact)
    })
}

export function deleteContacts(userID, contactIDs) {
    let body = {contact_ids: contactIDs}
    return fetch(`${api}/deletecontact/${userID}`,{
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export function deleteContactsFromGroup(userID, groupID, contactIDs){
    let body = {contact_ids: contactIDs}
    return fetch(`${api}/groupremovecontact/${userID}/${groupID}`,{
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export function deleteContact(userid, contactID) {
    return deleteContacts(userid, [contactID]);
}

export function snoozeContact(userID, contactID, duration){
    return fetch(`${api}/snoozecontact/${userID}/${contactID}`,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "days":duration
        })
    })
}

export function unsnoozeContact(userID, contactID){
    return fetch(`${api}/unsnoozecontact/${userID}/${contactID}`,{
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        })
    })
}

export function getContactInformation(userId, contactId) {
    return fetch(`${api}/contactdetails/${userId}/${contactId}`);
}


export function getFirstSalesforceContact(username, password, securityCode) {
    return fetch(`${api}/salesforcemapping/${username}/${password}/${securityCode}`)
}

export function importSalesforceContacts(authToken, mapping, userID) {
    return fetch(`${api}/salesforceimport/${authToken}/${userID}`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mapping)
    })
}