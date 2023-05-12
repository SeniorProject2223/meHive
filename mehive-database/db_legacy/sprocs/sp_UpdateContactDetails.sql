CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateContactDetails`(IN user_id INT, IN in_contact_id INT, IN in_f_name VARCHAR(36), IN in_m_name VARCHAR(36), IN in_l_name VARCHAR(36), IN in_title VARCHAR(36), IN in_company VARCHAR(36), IN in_mobile_phone VARCHAR(36), IN in_work_phone VARCHAR(36), IN in_personal_email VARCHAR(36), IN in_work_email VARCHAR(36), IN in_website VARCHAR(64), IN in_status DECIMAL(8,4), IN in_working_relationship DECIMAL(8,4), IN in_knowledge_length DECIMAL(8,4))
BEGIN
UPDATE contact
SET
f_name = COALESCE(in_f_name, f_name),
m_name = COALESCE(in_m_name, m_name),
l_name = COALESCE(in_l_name, l_name),
title = COALESCE(in_title, title),
company = COALESCE(in_company, company),
mobile_phone = COALESCE(in_mobile_phone, mobile_phone),
work_phone = COALESCE(in_work_phone, work_phone),
personal_email = COALESCE(in_personal_email, personal_email),
work_email = COALESCE(in_work_email, work_email),
website = COALESCE(in_website, website),
last_updated_date = NOW()
WHERE owner_id = user_id AND id = in_contact_id;
UPDATE contact_dimensions
SET
status = COALESCE(in_status, status),
working_relationship = COALESCE(in_working_relationship, working_relationship),
knowledge_length = COALESCE(in_knowledge_length, knowledge_length)
WHERE owner_id = user_id AND contact_id = in_contact_id;
END