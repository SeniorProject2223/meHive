const axios = require('axios');
const { json } = require('express');
var db = require("./database-connection");
var salesforceConfig = require("./salesforceconfig.json")

module.exports.getCode = function(username, password, securityToken) {
  if(salesforceConfig.USE_DUMMY_CONNECTION){
    return new Promise((resolve, reject) => {
      resolve(salesforceConfig.DUMMY_CODE)
    })
  }
  let config = {
    headers: {
      Authorization: `Bearer ${securityToken}`
    }
  }
  return axios.get(`https://power-java-4757.my.salesforce.com/services/data/v57.0/query?q=SELECT+name+from+Account`, config); //axios.post(`https://power-java-4757.my.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9EMJF5MdlzDpJfnGI7n1VPlx.ZmLvK9FKdUdxyTTub6AsXRTVLA.pHHNnQNX_Pu9bJa2wt3sYZaGtTxyk&client_secret=B1C435D48739C4F2AD5C2623B498E3FE39B25CD1BF9015F13633E7EC944079D6&username=${username}&password=${password}${securityToken}&format=json`);
}

module.exports.getFirstContact = function(accessToken, url) {
  if(salesforceConfig.USE_DUMMY_CONNECTION){
    return new Promise((resolve, reject) => {
      resolve(salesforceConfig.DUMMY_FIRST_CONTACT)
    })
  }
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
  return axios.get(`https://power-java-4757.my.salesforce.com/${url}/Contacts`, config);
}

module.exports.importContacts = function(accessToken, userID, mapping) {
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
  if(salesforceConfig.USE_DUMMY_CONNECTION){
    return new Promise((resolve, reject) => {
      resolve(salesforceConfig.DUMMY_CONTACT_LIST)
    }).then(response => {
      console.log(userID);
      let contacts = response.data.records;
      for (let i = 0; i < contacts.length; i++){
        let newContact = {
          f_name: "",
          m_name: "",
          l_name: "",
          company: "",
          title: "",
          work_email: "",
          personal_email: "",
          mobile_phone:"",
          work_phone: "",
          website: "",
          status: .5,
          working_relationship: .5,
          knowledge_length: .5
        }
  
        //f_name
        if(mapping.f_name == ""){
          newContact.f_name = ""
        } else {
          newContact.f_name = contacts[i][mapping.f_name]
        }
  
        //m_name
        if(mapping.m_name == ""){
          newContact.m_name = ""
        } else {
          newContact.m_name = contacts[i][mapping.m_name]
        }
  
        //l_name
        if(mapping.l_name == ""){
          newContact.l_name = ""
        } else {
          newContact.l_name = contacts[i][mapping.l_name]
        }
  
        //company
        if(mapping.company == ""){
          newContact.company = ""
        } else {
          newContact.company = contacts[i][mapping.company]
        }
  
        //title
        if(mapping.title == ""){
          newContact.title = ""
        } else {
          newContact.title = contacts[i][mapping.title]
        }
  
        //work_email
        if(mapping.work_email == ""){
          newContact.work_email = ""
        } else {
          newContact.work_email = contacts[i][mapping.work_email]
        }
  
        //personal_email
        if(mapping.personal_email == ""){
          newContact.personal_email = ""
        } else {
          newContact.personal_email = contacts[i][mapping.personal_email]
        }
  
        //mobile_phone
        if(mapping.mobile_phone == ""){
          newContact.mobile_phone = ""
        } else {
          newContact.mobile_phone = contacts[i][mapping.mobile_phone]
        }
  
        //work_phone
        if(mapping.work_phone == ""){
          newContact.work_phone = ""
        } else {
          newContact.work_phone = contacts[i][mapping.work_phone]
        }
  
        //website
        if(mapping.website == ""){
          newContact.website = ""
        } else {
          newContact.website = contacts[i][mapping.website]
        }
  
        db.createContact(userID, newContact);
      }
    })
  }
  return axios.get(`https://power-java-4757.my.salesforce.com/services/data/v57.0/Account/${accountID}/Contacts`, config)
  .then(response => {
    console.log(userID);
    let contacts = response.data.records;
    for (let i = 0; i < contacts.length; i++){
      let newContact = {
        f_name: "",
        m_name: "",
        l_name: "",
        company: "",
        title: "",
        work_email: "",
        personal_email: "",
        mobile_phone:"",
        work_phone: "",
        website: "",
        status: .5,
        working_relationship: .5,
        knowledge_length: .5
      }

      //f_name
      if(mapping.f_name == ""){
        newContact.f_name = ""
      } else {
        newContact.f_name = contacts[i][mapping.f_name]
      }

      //m_name
      if(mapping.m_name == ""){
        newContact.m_name = ""
      } else {
        newContact.m_name = contacts[i][mapping.m_name]
      }

      //l_name
      if(mapping.l_name == ""){
        newContact.l_name = ""
      } else {
        newContact.l_name = contacts[i][mapping.l_name]
      }

      //company
      if(mapping.company == ""){
        newContact.company = ""
      } else {
        newContact.company = contacts[i][mapping.company]
      }

      //title
      if(mapping.title == ""){
        newContact.title = ""
      } else {
        newContact.title = contacts[i][mapping.title]
      }

      //work_email
      if(mapping.work_email == ""){
        newContact.work_email = ""
      } else {
        newContact.work_email = contacts[i][mapping.work_email]
      }

      //personal_email
      if(mapping.personal_email == ""){
        newContact.personal_email = ""
      } else {
        newContact.personal_email = contacts[i][mapping.personal_email]
      }

      //mobile_phone
      if(mapping.mobile_phone == ""){
        newContact.mobile_phone = ""
      } else {
        newContact.mobile_phone = contacts[i][mapping.mobile_phone]
      }

      //work_phone
      if(mapping.work_phone == ""){
        newContact.work_phone = ""
      } else {
        newContact.work_phone = contacts[i][mapping.work_phone]
      }

      //website
      if(mapping.website == ""){
        newContact.website = ""
      } else {
        newContact.website = contacts[i][mapping.website]
      }

      db.createContact(userID, newContact);
    }
  })
}