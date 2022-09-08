USE mehive_prod;

INSERT INTO interaction_type (id, `name`, strength)
VALUES
	(1, "Large Group", 3),
	(2, "Email/Social Media", 1),
	(3, "Small Group", 4),
	(4, "Phone", 2),
	(5, "Direct Contact", 5);
    
INSERT INTO `user` (email, `hash`, salt)
VALUES
	("annisg@rose-hulman.edu", "DUMMY HASH", "DUMMY SALT"),
	("ahmed1@rose-hulman.edu", "DUMMY HASH", "DUMMY SALT"),
	("hernanre@rose-hulman.edu", "DUMMY HASH", "DUMMY SALT"),
	("nandoltw@rose-hulman.edu", "DUMMY HASH", "DUMMY SALT");

#CALL sp_CreateContact(1, "Jamie", "K", "Riley", "VP of Marketing", "Toyota", IN in_mobilephone VARCHAR(36), IN in_workphone VARCHAR(36), IN in_personalemail VARCHAR(36), IN in_workemail VARCHAR(36), IN in_website VARCHAR(64), IN in_status DECIMAL(8,4), IN in_working_relationship DECIMAL(8,4), IN in_knowledge_length DECIMAL(8,4));
CALL sp_CreateContact(1, "Jamie", "K", "Riley", "VP of Marketing", "Toyota", "202-555-0183", "202-555-0167", NULL, "jamie@toyota.com", NULL, 0.5, 0.5, 0.5);
CALL sp_CreateContact(1, "Dominic", NULL, "Butler", NULL, "SEP", "202-555-0183", "202-555-0167", NULL, "dominic@sep.com", NULL, 1, 0, 0);
CALL sp_CreateContact(1, "Jasmine", NULL, "Poole", NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 1);
CALL sp_CreateContact(1, "Neil", NULL, "Morgan", NULL, "Microsoft", "202-555-0183", "202-555-0167", NULL, "neil@microsoft.com", NULL, 0.3, 0.7, 0.7);
CALL sp_CreateContact(1, "Gordon", NULL, "Lewis", NULL, "Rose-Hulman", "202-555-0183", "202-555-0167", NULL, "lewisg@rose-hulman.edu", NULL, 0.7, 0.3, 0.3);
CALL sp_CreateContact(1, "Courtney", NULL, "Ross", "CFO", "Meta", "202-555-0183", "202-555-0167", NULL, "lewisg@rose-hulman.edu", NULL, 0.8, 0.3, 0.3);


CALL sp_CreateGroup(1, "My Group");
CALL sp_AddContactToGroup(1, 1, 1);
CALL sp_AddContactToGroup(1, 1, 2);
