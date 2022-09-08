CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DeleteInteraction`(IN user_id INT, IN in_contact_id INT, in_interaction_id INT)
BEGIN
DELETE FROM interaction
WHERE owner_id = user_id AND contact_id = in_contact_id AND id = in_interaction_id;
END