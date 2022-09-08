CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DeleteGroup`(IN user_id INT, IN in_group_id INT)
BEGIN
DELETE FROM contact_group
WHERE owner_id = user_id AND id = in_group_id;
END