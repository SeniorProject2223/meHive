const algorithm = require("../algorithm.js");
const db = require("../database-connection.js");

let userID;

beforeAll(() => {
    //create a test user to work on
    return new Promise(function(resolve, reject) {
        db.createUser("testuser@test.com")
        .then(results => {
            userID = results;
            resolve();
        }).catch(err => {
            reject(err);
        });
    })
})

afterAll(() => {
    //delete user created for testing & all relevant data
    return db.deleteUser(userID)
    .then(data => {
        return new Promise(function(resolve, reject) {
            db.closeConnection(err => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
})

afterEach(() => {
    //clear all contacts that may have been created
    return db.getContactsForUser(userID)
    .then(contacts => {
        ids = [];
        for(const contact of contacts) {
            ids.push(contact.id);
        }

        return db.deleteContact(userID, ids);
    })
});

test('A new contact with minimum values should have a severe severity', () => {
    //setup
    return db.createContact(userID, {f_name:"Test", l_name:"Test", status:0, working_relationship:0, knowledge_length:0})
    .then(contact_id => {
        return algorithm.getRelationshipSeverityForContact(userID, contact_id)
    })
    .then(alg_value => {
        expect(algorithm.getSeverityLabel(alg_value)).toBe('severe');
    })
});

test('Contacts with higher slider dimensions should be less severe by default', () => {
    //setup
    let first_id, second_id, third_id;

    return db.createContact(userID, {f_name:"Third", l_name:"Third", status:0, working_relationship:1, knowledge_length:1})
    .then(contact_id => {
        third_id = contact_id;
        return db.createContact(userID, {f_name:"First", l_name:"First", status:1, working_relationship:0, knowledge_length:0})
    })
    .then(contact_id => {
        first_id = contact_id;
        return db.createContact(userID, {f_name:"Second", l_name:"Second", status:0.5, working_relationship:0.5, knowledge_length:0.5})
    })
    .then(contact_id => {
        second_id = contact_id;
        return db.getOrderedContactsForUser(userID);
    })
    .then(contacts => {
        expect(contacts[0].id).toBe(first_id);
        expect(contacts[1].id).toBe(second_id);
        expect(contacts[2].id).toBe(third_id);
    })
});

test('Older interactions impact severity less than newer ones.', () => {

    let test_dates = [algorithm.getRelativeDateString(0, -1, 0, true), algorithm.getRelativeDateString(0, -7, 0, true), algorithm.getRelativeDateString(0, 0, -1, true), algorithm.getRelativeDateString(0, 0, -2, true)];
    let scores = [];
    let test_contact_id;
    //setup

    let promise = db.createContact(userID, {f_name:"Test", l_name:"Test", status:0, working_relationship:0, knowledge_length:0})
    .then(contact_id => {
        test_contact_id = contact_id;
        return algorithm.getRelationshipSeverityForContact(userID, test_contact_id)
    })
    .then(alg_value => {
        scores.push(alg_value);
    });

    for(const date of test_dates) {
     
        promise = promise.then(alg_value => {
            return db.createInteraction(userID, [test_contact_id], date, 0, false, 1, null);
        })
        .then(data => {
            return algorithm.getRelationshipSeverityForContact(userID, test_contact_id);
        })
        .then(alg_value => {
            scores.push(alg_value);
        });
    }

    return promise.then(alg_value => {

        let diffs = [];
        for(let i = 0; i < scores.length - 1; i++) {
            diffs.push(scores[i+1] - scores[i]);
        }

        expect(diffs).toStrictEqual(diffs.sort((a, b) => b - a)); //expect sorted descending
    })
});

test("Interactions in the future and older than 5 years ago don't count", () => {

    let test_dates = [algorithm.getRelativeDateString(1, 0, 0, true), algorithm.getRelativeDateString(0, 0, 0, true), algorithm.getRelativeDateString(0, 0, -5, true), algorithm.getRelativeDateString(-1, 0, -5, true)]; //boundaries of today, 5 years ago exactly, inclusive.
    let scores = [];
    let test_contact_id;
    //setup

    let promise = db.createContact(userID, {f_name:"Test", l_name:"Test", status:0, working_relationship:0, knowledge_length:0})
    .then(contact_id => {
        test_contact_id = contact_id;
        return algorithm.getRelationshipSeverityForContact(userID, test_contact_id)
    })
    .then(alg_value => {
        scores.push(alg_value);
    });

    for(const date of test_dates) {
     
        promise = promise.then(alg_value => {
            return db.createInteraction(userID, [test_contact_id], date, 0, false, 1, null);
        })
        .then(data => {
            return algorithm.getRelationshipSeverityForContact(userID, test_contact_id)
        })
        .then(alg_value => {
            scores.push(alg_value);
        });
    }

    return promise.then(alg_value => {

        let diffs = [];
        for(let i = 0; i < scores.length - 1; i++) {
            diffs.push(scores[i+1] - scores[i]);
        }

        expect(diffs[0]).toBe(0); // future
        expect(diffs[1]).toBeGreaterThan(0); //today
        expect(diffs[2]).toBeGreaterThan(0); //5 years
        expect(diffs[3]).toBeCloseTo(0, 5); // 5 years + 1 day, close to due to async decay on previous interactions
    })
});

test('A snoozed contact will appear after non-snoozed contacts, and be marked snoozed. Snoozed contacts are still sorted.', () => {

    let snoozed_id, unsnoozed_id = 0;

    return db.createContact(userID, {f_name:"TestSnoozed", l_name:"TestSnoozed", status:0, working_relationship:0, knowledge_length:0}) //id 1
    .then(contact_id => {
        snoozed_id = contact_id;
        return db.createContact(userID, {f_name:"TestUnsnoozed", l_name:"TestUnsnoozed", status:0, working_relationship:0, knowledge_length:0}) //id 2
    })
    .then(contact_id => {
        unsnoozed_id = contact_id;
        return db.createInteraction(userID, [unsnoozed_id], algorithm.getRelativeDateString(-1, 0, 0, true), 0, false, 1, null);
    })
    .then(data => {
        return db.getOrderedContactsForUser(userID);
    }).then(contacts => {
        expect(contacts[0].id).toBe(snoozed_id);
        expect(contacts[1].id).toBe(unsnoozed_id);

        return db.snoozeContact(userID, snoozed_id, {days:1, months:0, years:0});
    }).
    then(data => {
        return db.getOrderedContactsForUser(userID);
    }).then(contacts => {
        expect(contacts[0].id).toBe(unsnoozed_id);
        expect(contacts[1].id).toBe(snoozed_id);

        return db.snoozeContact(userID, unsnoozed_id, {days:1, months:0, years:0});
    })
    .then(data => {
        return db.getOrderedContactsForUser(userID);
    }).then(contacts => {
        expect(contacts[0].id).toBe(snoozed_id);
        expect(contacts[1].id).toBe(unsnoozed_id);
    })
});

test("Interactions in the last 5 days mark a contact as trending", () => {

    let test_dates = [
        [null, 0],
        [algorithm.getRelativeDateString(1, 0, 0, true), 1], //in the future
        [algorithm.getRelativeDateString(-1, 0, 0, true), 1],
        [algorithm.getRelativeDateString(-4, 0, 0, true), 1],
        [algorithm.getRelativeDateString(-6, 0, 0, true), 0]]; //boundaries of today, 5 days ago exactly, inclusive.

    let promise = Promise.resolve();

    for(const i in test_dates) {
     
        promise = promise.then(data => {
            return db.createContact(userID, {f_name:"Test" + i, l_name:"Test", status:0, working_relationship:0, knowledge_length:0})
        })
        .then(contact_id => {
            test_dates[i].push(contact_id);
            if(test_dates[i][0] != null) {
                return db.createInteraction(userID, [contact_id], test_dates[i][0], 0, false, 1, null);
            }
        })
        .then(data => {
            return db.getOrderedContactsForUser(userID);
        })
        .then(contacts => {
            let contact_found = false;
            for(const contact of contacts) {
                if(contact.id == test_dates[i][2]) {
                    expect(contact.is_trending).toBe(test_dates[i][1]);
                    contact_found = true;
                }
            }
            expect(contact_found).toBe(true);
        })
        .then(data => {
            return db.deleteContact(userID, [test_dates[i][2]]);
        })
    }

    return promise;
});
