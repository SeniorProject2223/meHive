CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetGroupsForUser`(IN user_id INT)
BEGIN
SELECT id, contact_group.`name` FROM contact_group WHERE owner_id=user_id;
END