CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CreateInteraction`(IN user_id INT, IN in_contact_id INT, IN in_dateoccurring DATE, IN in_direction TINYINT, IN in_thirdparty TINYINT, IN in_type INT, IN in_details VARCHAR(1024))
BEGIN
DECLARE new_id INT;
INSERT INTO interaction (owner_id, contact_id, id, date_occurring, direction, thirdparty, `type`)
VALUES(user_id, in_contact_id, new_id, in_dateoccurring, in_direction, in_thirdparty, in_type);
IF (in_details IS NOT NULL) THEN
	SELECT LAST_INSERT_ID() into new_id;
	INSERT INTO interaction_details (owner_id, contact_id, interaction_id, details)
    VALUES(user_id, in_contact_id, new_id, in_details);
END IF;
END