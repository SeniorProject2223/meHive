CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateGroup`(IN user_id INT, IN in_group_id INT, IN in_name VARCHAR(64))
BEGIN
UPDATE contact_group
SET
`name` = COALESCE(in_name, `name`)
WHERE owner_id = user_id AND id = in_group_id;
END