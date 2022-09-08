CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetContactDetails`(IN user_id INT, IN contact_id INT)
BEGIN
SELECT contact.owner_id, contact.id, contact.f_name, contact.m_name, contact.l_name, contact.title, contact.company, contact.mobile_phone, contact.work_phone, contact.personal_email, contact.work_email, contact.website, contact_dimensions.status, contact_dimensions.working_relationship, contact_dimensions.knowledge_length, IF(contact.snooze_until >= NOW(), contact.snooze_until, NULL) as snooze_until, contact.last_updated_date
FROM contact LEFT JOIN contact_dimensions ON contact.owner_id = contact_dimensions.owner_id AND contact.id = contact_dimensions.contact_id
WHERE contact.owner_id=user_id AND contact.id=contact_id;
END