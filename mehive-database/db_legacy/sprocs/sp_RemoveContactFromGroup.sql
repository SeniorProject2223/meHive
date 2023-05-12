CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RemoveContactFromGroup`(IN user_id INT, in in_group_id INT, in in_contact_id INT)
BEGIN
DELETE FROM group_member
WHERE owner_id = user_id AND group_id = in_group_id AND contact_id = in_contact_id;
END