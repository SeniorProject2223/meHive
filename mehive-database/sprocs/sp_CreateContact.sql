CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CreateContact`(IN user_id INT, IN in_fname VARCHAR(36), IN in_mname VARCHAR(36), IN in_lname VARCHAR(36), IN in_title VARCHAR(36), IN in_company VARCHAR(36), IN in_mobilephone VARCHAR(36), IN in_workphone VARCHAR(36), IN in_personalemail VARCHAR(36), IN in_workemail VARCHAR(36), IN in_website VARCHAR(64), IN in_status DECIMAL(8,4), IN in_working_relationship DECIMAL(8,4), IN in_knowledge_length DECIMAL(8,4))
BEGIN
DECLARE new_id INT;
INSERT INTO contact (owner_id, id, f_name, m_name, l_name, title, company, mobile_phone, work_phone, personal_email, work_email, website, last_updated_date)
VALUES(user_id, new_id, in_fname, in_mname, in_lname, in_title, in_company, in_mobilephone, in_workphone, in_personalemail, in_workemail, in_website, NOW());
SELECT LAST_INSERT_ID() into new_id;
INSERT INTO contact_dimensions (owner_id, contact_id, status, working_relationship, knowledge_length)
VALUES(user_id, new_id, in_status, in_working_relationship, in_knowledge_length);
SELECT new_id;
END