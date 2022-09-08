CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CreateUser`(IN in_email VARCHAR(64), IN in_hash VARCHAR(128), IN in_salt VARCHAR(16))
BEGIN 
INSERT INTO user (email, hash, salt)
VALUES(in_email, in_hash, in_salt);
SELECT LAST_INSERT_ID() as "user_id";
END