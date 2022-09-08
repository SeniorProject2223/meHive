CREATE PROCEDURE `sp_SnoozeContact` (IN user_id INT, IN in_contact_id INT, IN in_snooze_until DATETIME)
BEGIN
UPDATE contact
SET
snooze_until = in_snooze_until
WHERE owner_id = user_id AND id = in_contact_id;
END
