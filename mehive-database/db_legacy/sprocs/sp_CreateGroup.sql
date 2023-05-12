CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CreateGroup`(IN user_id INT, IN in_name VARCHAR(64))
BEGIN
DECLARE new_id INT;
SELECT COALESCE(MAX(id), 0) + 1 into new_id FROM contact_group WHERE owner_id = user_id;
INSERT INTO contact_group (owner_id, id, `name`)
VALUES(user_id, new_id, in_name);
END