CREATE PROCEDURE `sp_GetContactsInGroup` (IN user_id INT, IN in_group_id INT)
BEGIN
SELECT contact_id FROM group_member WHERE owner_id = user_id AND group_id = in_group_id;
END
