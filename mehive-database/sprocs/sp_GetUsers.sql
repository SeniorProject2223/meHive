CREATE PROCEDURE `sp_GetUsers` ()
BEGIN
SELECT id, email FROM user;
END
