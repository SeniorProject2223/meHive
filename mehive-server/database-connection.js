var mysql = require('mysql')
var config = require('./dbconfig.json')
var algo = require("./algorithm");

var connection = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports.closeConnection = function(callback) {
    connection.end(callback);
}

module.exports.getUsers = function() {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetUsers()',
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

module.exports.getIDForUser = function(email) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetUserID(?)', [email],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

module.exports.getLoginForUser = function(userID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetUserLogin(?)', [userID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

//only used for testing
module.exports.createUser = function(email, hash, salt) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_CreateUser(?, ?, ?)', [email, hash, salt],
        function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0][0].user_id)
            }
        });
    });
}

//only used for testing
module.exports.deleteUser = function(userID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_DeleteUser(?)', [userID],
        function (err, rows, fields) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports.getContactsForUser = function(userID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetContactsForUser(?)', [userID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                let contacts = rows[0];
                resolve(contacts);
            }
        });
    }); 
}

module.exports.getOrderedContactsForUser = function(userID) {
    return module.exports.getContactsForUser(userID)
    .then(function(contacts){

        let promises = [];
        for(const contact of contacts) {
            promises.push(algo.getRelationshipSeverityForContact(userID, contact.id));
        }

        return Promise.all(promises).then((results) => {
            for(let i = 0; i < promises.length; i++) {
                contacts[i].severity = results[i];
            }

            contacts.sort((a, b) => { //sort ascending, all unsnoozed first then snoozed.
                if((a.is_snoozed && b.is_snoozed) || !(a.is_snoozed || b.is_snoozed)) {
                    return a.severity - b.severity
                } else { //only one is snoozed, that one should be second
                    if(a.is_snoozed) {
                        return 1;
                    } else { //b is
                        return -1;
                    }
                }
            });
            
            for(let i = 0; i < contacts.length; i++) { //replace with labels
                contacts[i].severity = algo.getSeverityLabel(contacts[i].severity);
            }

            return contacts;
        })
    })
};

module.exports.getContactDetails = function(userID, contactID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetContactDetails(?, ?)', [userID, contactID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

module.exports.createContact = function(userID, contactDetails) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_CreateContact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userID, contactDetails.f_name, contactDetails.m_name, contactDetails.l_name, contactDetails.title, contactDetails.company, contactDetails.mobile_phone, contactDetails.work_phone, contactDetails.personal_email, contactDetails.work_email, contactDetails.website, contactDetails.status, contactDetails.working_relationship, contactDetails.knowledge_length],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0][0].new_id)
            }
        });
    }); 
}

module.exports.updateContact = function(userID, contactID, contactDetails) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_UpdateContactDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userID, contactID, contactDetails.f_name, contactDetails.m_name, contactDetails.l_name, contactDetails.title, contactDetails.company, contactDetails.mobile_phone, contactDetails.work_phone, contactDetails.personal_email, contactDetails.work_email, contactDetails.website, contactDetails.status, contactDetails.working_relationship, contactDetails.knowledge_length],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    }); 
}

module.exports.snoozeContact = function(userID, contactID, snoozeDuration) {
    return new Promise(function(resolve, reject) {

        let snoozeUntil = snoozeDuration != null ? algo.getRelativeDateString(snoozeDuration.days, snoozeDuration.months, snoozeDuration.years) : null;

        connection.query('CALL sp_SnoozeContact(?, ?, ?)', [userID, contactID, snoozeUntil],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    }); 
}

module.exports.deleteContact = function(userID, contactIDs) {

    let promises = [];

    for(const contactID of contactIDs) {
        promises.push(new Promise(function(resolve, reject) {
            connection.query('CALL sp_DeleteContact(?, ?)', [userID, contactID],
            function (err, rows, fields) {
                if(err) {
                    reject(err);
                } else {
                    resolve()
                }
            });
        })); 
    }

    return Promise.all(promises);
}

module.exports.getInteractionsForContact = function(userID, contactID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetInteractionsForContact(?, ?)', [userID, contactID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

module.exports.getInteractionsForContactBetweenDates = function(userID, contactID, afterDate, beforeDate) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetInteractionsForContactBetweenDates(?, ?, ?, ?)', [userID, contactID, afterDate, beforeDate],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

module.exports.getInteractionDetails = function(userID, contactID, interactionID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetInteractionDetails(?, ?, ?)', [userID, contactID, interactionID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0])
            }
        });
    }); 
}

module.exports.createInteraction = function(userID, contactIDs, dateOccurring, direction, is_thirdparty, type, details) {
    let promises = [];
    
    for(const contactID of contactIDs) {
        promises.push(new Promise(function(resolve, reject) {
            connection.query('CALL sp_CreateInteraction(?, ?, ?, ?, ?, ?, ?)', [userID, contactID, dateOccurring, direction, is_thirdparty ? 1 : 0, type, details],
            function (err, rows, fields) {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            });
        }));
    }
    return Promise.all(promises)
}

module.exports.updateInteraction = function(userID, contactID, interactionID, interactionDetails) {
    return new Promise(function(resolve, reject) {
        let thirdparty = null;
        if(interactionDetails.is_thirdparty != null) {
            thirdparty = interactionDetails.is_thirdparty ? 1 : 0;
        }

        connection.query('CALL sp_UpdateInteraction(?, ?, ?, ?, ?, ?, ?)',
        [userID, contactID, interactionID, interactionDetails.date_occurring, interactionDetails.direction, thirdparty, interactionDetails.details],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    }); 
}

module.exports.deleteInteraction = function(userID, contactID, interactionID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_DeleteInteraction(?, ?, ?)', [userID, contactID, interactionID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    }); 
}

module.exports.getGroupsForUser = function(userID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetGroupsForUser(?)', [userID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    }); 
}

module.exports.getContactsInGroup = function(userID, groupID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_GetContactsInGroup(?, ?)', [userID, groupID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    }); 
}

module.exports.addContactsToGroup = function(userID, groupID, contactIDs) {
    
    let promises = [];
    for(const contactID of contactIDs) {
        promises.push(new Promise(function(resolve, reject) {
            connection.query('CALL sp_AddContactToGroup(?, ?, ?)', [userID, groupID, contactID],
            function (err, rows, fields) {
                if(err && err.code != "ER_DUP_ENTRY") {
                    reject(false);
                } else {
                    resolve(true)
                }
            });
        }));
    }

    return Promise.all(promises)
}

module.exports.createGroup = function(userID, groupName) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_CreateGroup(?, ?)', [userID, groupName],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    }); 
}

module.exports.editGroup = function(userID, groupID, groupName) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_UpdateGroup(?, ?, ?)', [userID, groupID, groupName],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    });
}

module.exports.deleteGroup = function(userID, groupID) {
    return new Promise(function(resolve, reject) {
        connection.query('CALL sp_DeleteGroup(?, ?)', [userID, groupID],
        function (err, rows, fields) {
            if(err) {
                reject(err);
            } else {
                resolve(rows)
            }
        });
    }); 
}

module.exports.removeContactsFromGroup = function(userID, groupID, contactIDs) {
    let promises = [];
    
    for(const contactID of contactIDs) {
        promises.push(new Promise(function(resolve, reject) {
            connection.query('CALL sp_RemoveContactFromGroup(?, ?, ?)', [userID, groupID, contactID],
            function (err, rows, fields) {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })); 
    }
    return Promise.all(promises);
}
