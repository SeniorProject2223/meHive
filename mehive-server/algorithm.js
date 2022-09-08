var db = require("./database-connection");
var config = require("./algorithmconfig.json")

exports.getRelationshipSeverityForContact = function (userid, contactid) {

    return new Promise((resolve, reject) => {
        let contact_promises = [];
        
        contact_promises.push(db.getContactDetails(userid, contactid).then(details => {
            let contactDimensionStrength = 0;
            contactDimensionStrength += (1 - details[0].status) * config.DIMENSION_MAX_STRENGTH;
            contactDimensionStrength += (details[0].working_relationship) * config.DIMENSION_MAX_STRENGTH;
            contactDimensionStrength += (details[0].knowledge_length + getStrengthFromLastUpdated(details[0].last_updated_date)) * config.DIMENSION_MAX_STRENGTH;
            return contactDimensionStrength;
        }).catch(function (err) {
            return null;
        }))

        contact_promises.push(getInteractionStrength(userid, contactid).catch(function (err) {
            console.log(err);
            return null;
        }))

        Promise.all(contact_promises).then(results => {
            for (const res of results) {
                if(res == null){ //if we've had any errors
                    resolve(null); //send back that we're uncertain
                    return;
                }
            }
            resolve(results[0] + results[1]);
        }).catch(err => {
            reject(err);
        })
    })
}

function getInteractionStrength(userid, contactid) {
    return new Promise((resolve, reject) => {


        let today = module.exports.getRelativeDateString(0, 0, 0);
        let five_years_ago = module.exports.getRelativeDateString(0, 0, -5);

        db.getInteractionsForContactBetweenDates(userid, contactid, five_years_ago, today).then(results => {
            //1.3 * .9928^t where t is in days
            let interactionStrength = 0.0;

            for(const interaction of results) {
                //type strength
                interactionStrength += interaction.type_strength;

                //memorable notes strength
                interactionStrength += interaction.has_memorable_notes ? config.MEMORABLE_NOTES_STRENGTH : config.NO_MEMORABLE_NOTES_STRENGTH;

                //self initiated strength
                interactionStrength += interaction.is_thirdparty ? config.INITIATED_BY_THIRDPARTY_STRENGTH : config.NOT_INITIATED_BY_THIRDPARTY_STRENGTH;
                
                //direction strength, 0 is I contacted them, 1 is they contacted me
                interactionStrength += interaction.direction ? config.DIRECTION_THEY_CONTACTED_ME_STRENGTH : config.DIRECTION_I_CONTACTED_THEM_STRENGTH;
                
                //time factor
                let t = (new Date() - new Date(interaction.date_occurring)) / (1000 * 60 * 60 * 24);
                interactionStrength *= 1.3 + Math.pow(.9928, t);
            }

            resolve(interactionStrength);
            
        })
        .catch(err => {
            reject(err);
        })


    })
}

function getStrengthFromLastUpdated(last_updated_date) {
    let last_updated = new Date(last_updated_date);

    if(last_updated < getRelativeDate(0, 0, -5)) {
        return config.LAST_UPDATED_STRENGTH_5_YR;
    } else if(last_updated < getRelativeDate(0, 0, -1)) {
        return config.LAST_UPDATED_STRENGTH_1_YR;
    } else if(last_updated < getRelativeDate(0, -6, 0)) {
        return config.LAST_UPDATED_STRENGTH_6_MO;
    } else if(last_updated < getRelativeDate(0, -1, 0)) {
        return config.LAST_UPDATED_STRENGTH_1_MO;
    } else {
        return config.LAST_UPDATED_STRENGTH_RECENT;
    }
}

exports.getSeverityLabel = function(strength) {
    if (strength < config.RELATIONSHIP_SEVERE_THRESHOLD) {
        return "severe";
    } else if (strength < config.RELATIONSHIP_CAUTION_THRESHOLD) {
        return "caution";
    } else if (strength != null) {
        return "nominal";
    } else {
        return "unknown";
    }
}

exports.getRelativeDateString = function(days, months, years, clearTime) {
    let day = getRelativeDate(days, months, years, clearTime);
    return day.toISOString().slice(0, 19).replace('T', ' ');
}

function getRelativeDate(days, months, years, clearTime) {
    let date = new Date();
    if(years != undefined) { date.setFullYear(date.getFullYear() + parseInt(years)) };
    if(months != undefined) { date.setMonth(date.getMonth() + parseInt(months)) };
    if(days != undefined) { date.setDate(date.getDate() + parseInt(days)) };
    if(clearTime) { date.setUTCHours(0,0,0,0); }
    return date;
}