CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_AddContactToGroup`(IN user_id INT, in in_group_id INT, in in_contact_id INT)
BEGIN
INSERT INTO group_member (owner_id, group_id, contact_id)
VALUES(user_id, in_group_id, in_contact_id);
END