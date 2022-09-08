CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateInteraction`(IN user_id INT, IN in_contact_id INT, IN in_interaction_id INT, IN in_date_occurring DATE, IN in_direction TINYINT, IN in_thirdparty TINYINT, IN in_details VARCHAR(1024))
BEGIN
UPDATE interaction
SET
date_occurring = COALESCE(in_date_occurring, date_occurring),
direction = COALESCE(in_direction, direction),
thirdparty = COALESCE(in_thirdparty, thirdparty)
WHERE owner_id = user_id AND contact_id = in_contact_id AND id = in_interaction_id;

#deal with the details
IF (in_details IS NOT NULL) THEN #update the details if they exist or add them
	REPLACE INTO interaction_details (owner_id, contact_id, interaction_id, details)
		VALUES(user_id, in_contact_id, new_id, in_details);
ELSE #remove the details, if they exist
	DELETE FROM interaction_details
    WHERE owner_id = user_id AND contact_id = in_contact_id AND interaction_id = in_interaction_id;
END IF;
END