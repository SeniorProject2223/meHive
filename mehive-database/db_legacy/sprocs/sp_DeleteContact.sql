CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DeleteContact`(IN user_id INT, IN in_contact_id INT)
BEGIN
DELETE FROM contact
WHERE owner_id = user_id AND id = in_contact_id;
END