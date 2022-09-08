CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetContactsForUser`(IN user_id INT)
BEGIN
SELECT contact.id as id, f_name, l_name, company, title, IF(snooze_until IS NOT NULL AND snooze_until >= NOW(), TRUE, FALSE) as is_snoozed, (COUNT(i.id) > 0) as is_trending
FROM contact
LEFT OUTER JOIN 
(SELECT * from interaction
WHERE interaction.owner_id = user_id AND interaction.date_occurring > DATE_SUB(NOW(), INTERVAL 5 DAY)) as i
ON i.owner_id = contact.owner_id AND i.contact_id = contact.id
WHERE contact.owner_id=user_id
GROUP BY contact.id;
END