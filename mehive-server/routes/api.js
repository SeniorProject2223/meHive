var express = require('express');
var db = require("../database-connection");
var sf = require("../salesforce-connection");
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  db.getUsers().then(function(results) {
    res.send(JSON.stringify(results));
  }).catch(function(err) {
    res.statusCode = 500;
    res.send();
  })
});

/* get user ID */
router.get('/userlist/:userEmail', function (req, res, next){
  console.log('User Email', req.params.userEmail);
  db.getIDForUser(req.params.userEmail)
  .then(function(ID) {
    res.send(JSON.stringify(ID));
  })
  .catch(function(err) {
    res.statusCode = 500;
    res.send();
  })
});

/* get user login */
router.get('/userlogin/:userID', function (req, res, next){
  db.getLoginForUser(req.params.userID)
  .then(function(login) {
    res.send(JSON.stringify(login));
  })
  .catch(function(err) {
    res.statusCode = 500;
    res.send();
  })
});

/* GET all contacts for a user. */
router.get('/contactlist/:userid', function(req, res, next) {

  db.getOrderedContactsForUser(req.params.userid)
  .then(function(contacts) {
      res.send(JSON.stringify(contacts));
  })
  .catch(function(err) {
    res.statusCode = 500;
    res.send();
  })
});

/* GET details on one specific contact. */
router.get('/contactdetails/:userid/:contactid', function(req, res, next) {
  db.getContactDetails(req.params.userid, req.params.contactid).then(function(results){
    res.send(JSON.stringify(results));
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* POST new contact. */
router.post('/createcontact/:userid', function(req, res, next) {
  db.createContact(req.params.userid, req.body).then(function(results){
    res.send(JSON.stringify(results));
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* PUT contact details update. */
router.put('/updatecontact/:userid/:contactid', function(req, res, next) {
  db.updateContact(req.params.userid, req.params.contactid, req.body).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* PUT snooze contact. */
router.put('/snoozecontact/:userid/:contactid', function(req, res, next) {
  db.snoozeContact(req.params.userid, req.params.contactid, req.body).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* DELETE unsnooze contact. */
router.delete('/unsnoozecontact/:userid/:contactid', function(req, res, next) {
  db.snoozeContact(req.params.userid, req.params.contactid, null).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* DELETE contact */
router.delete('/deletecontact/:userid', function(req, res, next) {
  db.deleteContact(req.params.userid, req.body.contact_ids).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* GET all interactions for a contact. */
router.get('/interactionlist/:userid/:contactid', function(req, res, next) {
  db.getInteractionsForContact(req.params.userid, req.params.contactid).then(function(results){
    res.send(JSON.stringify(results));
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* GET details for an interaction. */
router.get('/interactiondetails/:userid/:contactid/:interactionid', function(req, res, next) {
  db.getInteractionDetails(req.params.userid, req.params.contactid, req.params.interactionid).then(function(results){
    res.send(JSON.stringify(results));
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* POST new interactions. */
router.post('/createinteraction/:userid/', function(req, res, next) {
  let interaction_date;
  try {
    interaction_date = new Date(req.body.date_occurring).toISOString().slice(0, 19).replace('T', ' ');
  }
  catch (err) {
    res.statusCode = 400;
    res.send();
  }

  db.createInteraction(req.params.userid, req.body.contact_ids, interaction_date, req.body.direction, req.body.is_thirdparty, req.body.type, req.body.details).then(function(results){
    res.send();
  }).catch(function(err) {
    res.statusCode = 500;
    res.send();
  })
});

/* PUT interaction details update. */
router.put('/updateinteraction/:userid/:contactid/:interactionid', function(req, res, next) {
  try {
    if(req.body.date_occurring) {
      req.body.date_occurring = new Date(req.body.date_occurring).toISOString().slice(0, 19).replace('T', ' ');
    }
  }
  catch (err) {
    res.statusCode = 400;
    res.send();
  }
  db.updateInteraction(req.params.userid, req.params.contactid, req.params.interactionid, req.body).then(function(results) {
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* DELETE interaction */
router.delete('/deleteinteraction/:userid/:contactid/:interactionid', function(req, res, next) {
  db.deleteInteraction(req.params.userid, req.params.contactid, req.params.interactionid).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* GET all groups for a user. */
router.get('/grouplist/:userid', function(req, res, next) {

  db.getGroupsForUser(req.params.userid).then(function(groups){
    res.send(JSON.stringify(groups));
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* GET all contact ids in a particular group */
router.get('/groupcontacts/:userid/:groupid', function(req, res, next) {

  db.getContactsInGroup(req.params.userid, req.params.groupid).then(function(contacts){
    res.send(JSON.stringify(contacts.map(e => e.id)));
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* POST add contact to group. */
router.post('/groupaddcontact/:userid/:groupid/', function(req, res, next) {
  db.addContactsToGroup(req.params.userid, req.params.groupid, req.body.contact_ids).then(function(results){
    res.send(results);
  }).catch(function(err) {
    res.statusCode = 500;
  });
  res.send();
});

/* POST create group. */
router.post('/creategroup/:userid', function(req, res, next) {
  db.createGroup(req.params.userid, req.body.name).then(function(results){
    res.send();
  }).catch(function(err) {
    res.statusCode = 500;
    res.send();
  })
});

/* PUT edit group */
router.put('/editgroup/:userid/:groupid', function(req, res, next) {
  db.editGroup(req.params.userid, req.params.groupid, req.body.name).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* POST User */
router.post('/createUser', function(req, res, next) {
  db.createUser(req.body.username, req.body.hash, req.body.salt).then(function(results) {
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});


/* DELETE group */
router.delete('/deletegroup/:userid/:groupid', function(req, res, next) {
  db.deleteGroup(req.params.userid, req.params.groupid).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* DELETE contacts from group */
router.delete('/groupremovecontact/:userid/:groupid', function(req, res, next) {
  db.removeContactsFromGroup(req.params.userid, req.params.groupid, req.body.contact_ids).then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

/* GET inital Salesforce mapping */
router.get('/salesforcemapping/:username/:password/:securitytoken', function(req, res, next) {
  sf.getCode(req.params.username, req.params.password, req.params.securitytoken).then(function(results){
    //let accessToken = results.data.access_token
    sf.getFirstContact(req.params.securitytoken, results.data.records[0].attributes.url).then((results) => {
      let records = results.data.records;
      console.log(records);
      res.send({mapping: records});
    });
  })
  .catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
  
});

/* POST import contacts from Salesforce */
router.post('/salesforceimport/:accesstoken/:userid', function(req, res, next) {
  sf.importContacts(req.params.accesstoken, req.params.userid, req.body)
  .then(function(results){
    res.send();
  }).catch(function(err) {
    console.log(err);
    res.statusCode = 500;
    res.send();
  })
});

module.exports = router;