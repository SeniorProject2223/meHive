CREATE PROCEDURE `sp_DeleteUser` (IN user_id INT)
BEGIN
DELETE FROM `user`
WHERE id = user_id;
END
