-- --------------------------------------------------------
-- Host:                         192.168.56.1
-- Server version:               10.6.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mehive_prod
CREATE DATABASE IF NOT EXISTS `mehive_prod` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `mehive_prod`;

-- Dumping structure for table mehive_prod.contact
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `f_name` varchar(36) NOT NULL,
  `m_name` varchar(36) DEFAULT NULL,
  `l_name` varchar(36) NOT NULL,
  `title` varchar(36) DEFAULT NULL,
  `company` varchar(36) DEFAULT NULL,
  `mobile_phone` varchar(36) DEFAULT NULL,
  `work_phone` varchar(36) DEFAULT NULL,
  `personal_email` varchar(36) DEFAULT NULL,
  `work_email` varchar(36) DEFAULT NULL,
  `website` varchar(64) DEFAULT NULL,
  `last_updated_date` datetime NOT NULL,
  `snooze_until` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`owner_id`),
  KEY `contact_ibfk_1` (`owner_id`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.contact: ~6 rows (approximately)
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` (`id`, `owner_id`, `f_name`, `m_name`, `l_name`, `title`, `company`, `mobile_phone`, `work_phone`, `personal_email`, `work_email`, `website`, `last_updated_date`, `snooze_until`) VALUES
	(1, 1, 'Jamie', 'K', 'Riley', 'VP of Marketing', 'Toyota', '202-555-0183', '202-555-0167', NULL, 'jamie@toyota.com', NULL, '2022-12-13 17:08:51', NULL),
	(2, 1, 'Dominic', NULL, 'Butler', NULL, 'SEP', '202-555-0183', '202-555-0167', NULL, 'dominic@sep.com', NULL, '2022-12-13 17:08:51', NULL),
	(3, 1, 'Jasmine', NULL, 'Poole', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:08:51', NULL),
	(4, 1, 'Neil', NULL, 'Morgan', NULL, 'Microsoft', '202-555-0183', '202-555-0167', NULL, 'neil@microsoft.com', NULL, '2022-12-13 17:08:51', NULL),
	(5, 1, 'Gordon', NULL, 'Lewis', NULL, 'Rose-Hulman', '202-555-0183', '202-555-0167', NULL, 'lewisg@rose-hulman.edu', NULL, '2022-12-13 17:08:51', NULL),
	(6, 1, 'Courtney', NULL, 'Ross', 'CFO', 'Meta', '202-555-0183', '202-555-0167', NULL, 'lewisg@rose-hulman.edu', NULL, '2022-12-13 17:08:51', NULL);
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.contact_dimensions
CREATE TABLE IF NOT EXISTS `contact_dimensions` (
  `contact_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `status` decimal(8,4) NOT NULL,
  `working_relationship` decimal(8,4) NOT NULL,
  `knowledge_length` decimal(8,4) NOT NULL,
  PRIMARY KEY (`owner_id`,`contact_id`),
  KEY `contact_dimensions_ibfk_1` (`contact_id`,`owner_id`),
  CONSTRAINT `contact_dimensions_ibfk_1` FOREIGN KEY (`contact_id`, `owner_id`) REFERENCES `contact` (`id`, `owner_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.contact_dimensions: ~6 rows (approximately)
/*!40000 ALTER TABLE `contact_dimensions` DISABLE KEYS */;
INSERT INTO `contact_dimensions` (`contact_id`, `owner_id`, `status`, `working_relationship`, `knowledge_length`) VALUES
	(1, 1, 0.5000, 0.5000, 0.5000),
	(2, 1, 1.0000, 0.0000, 0.0000),
	(3, 1, 0.0000, 1.0000, 1.0000),
	(4, 1, 0.3000, 0.7000, 0.7000),
	(5, 1, 0.7000, 0.3000, 0.3000),
	(6, 1, 0.8000, 0.3000, 0.3000);
/*!40000 ALTER TABLE `contact_dimensions` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.contact_group
CREATE TABLE IF NOT EXISTS `contact_group` (
  `owner_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`owner_id`,`id`),
  CONSTRAINT `contact_group_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.contact_group: ~1 rows (approximately)
/*!40000 ALTER TABLE `contact_group` DISABLE KEYS */;
INSERT INTO `contact_group` (`owner_id`, `id`, `name`) VALUES
	(1, 1, 'My Group');
/*!40000 ALTER TABLE `contact_group` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.group_member
CREATE TABLE IF NOT EXISTS `group_member` (
  `owner_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`owner_id`,`group_id`,`contact_id`),
  KEY `group_member_ibfk_2` (`owner_id`,`contact_id`),
  CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`owner_id`, `group_id`) REFERENCES `contact_group` (`owner_id`, `id`) ON DELETE CASCADE,
  CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`owner_id`, `contact_id`) REFERENCES `contact` (`owner_id`, `id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.group_member: ~2 rows (approximately)
/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
INSERT INTO `group_member` (`owner_id`, `group_id`, `contact_id`) VALUES
	(1, 1, 1),
	(1, 1, 2);
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.interaction
CREATE TABLE IF NOT EXISTS `interaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `date_occurring` date NOT NULL,
  `direction` tinyint(4) NOT NULL,
  `thirdparty` tinyint(1) DEFAULT 0,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`,`owner_id`,`contact_id`),
  KEY `interaction_ibfk_1` (`type`),
  KEY `interaction_ibfk_2` (`contact_id`,`owner_id`),
  CONSTRAINT `interaction_ibfk_1` FOREIGN KEY (`type`) REFERENCES `interaction_type` (`id`),
  CONSTRAINT `interaction_ibfk_2` FOREIGN KEY (`contact_id`, `owner_id`) REFERENCES `contact` (`id`, `owner_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.interaction: ~0 rows (approximately)
/*!40000 ALTER TABLE `interaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `interaction` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.interaction_details
CREATE TABLE IF NOT EXISTS `interaction_details` (
  `contact_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `interaction_id` int(11) NOT NULL,
  `details` varchar(1024) NOT NULL,
  PRIMARY KEY (`owner_id`,`contact_id`,`interaction_id`),
  KEY `interaction_details_ibfk_1` (`contact_id`,`owner_id`,`interaction_id`),
  CONSTRAINT `interaction_details_ibfk_1` FOREIGN KEY (`contact_id`, `owner_id`, `interaction_id`) REFERENCES `interaction` (`contact_id`, `owner_id`, `id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.interaction_details: ~0 rows (approximately)
/*!40000 ALTER TABLE `interaction_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `interaction_details` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.interaction_type
CREATE TABLE IF NOT EXISTS `interaction_type` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `strength` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.interaction_type: ~5 rows (approximately)
/*!40000 ALTER TABLE `interaction_type` DISABLE KEYS */;
INSERT INTO `interaction_type` (`id`, `name`, `strength`) VALUES
	(1, 'Large Group', 3),
	(2, 'Email/Social Media', 1),
	(3, 'Small Group', 4),
	(4, 'Phone', 2),
	(5, 'Direct Contact', 5);
/*!40000 ALTER TABLE `interaction_type` ENABLE KEYS */;

-- Dumping structure for procedure mehive_prod.sp_AddContactToGroup
DELIMITER //
CREATE PROCEDURE `sp_AddContactToGroup`(IN user_id INT, in in_group_id INT, in in_contact_id INT)
BEGIN
INSERT INTO group_member (owner_id, group_id, contact_id)
VALUES(user_id, in_group_id, in_contact_id);
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_CreateContact
DELIMITER //
CREATE PROCEDURE `sp_CreateContact`(IN user_id INT, IN in_fname VARCHAR(36), IN in_mname VARCHAR(36), IN in_lname VARCHAR(36), IN in_title VARCHAR(36), IN in_company VARCHAR(36), IN in_mobilephone VARCHAR(36), IN in_workphone VARCHAR(36), IN in_personalemail VARCHAR(36), IN in_workemail VARCHAR(36), IN in_website VARCHAR(64), IN in_status DECIMAL(8,4), IN in_working_relationship DECIMAL(8,4), IN in_knowledge_length DECIMAL(8,4))
BEGIN
DECLARE new_id INT;
INSERT INTO contact (owner_id, id, f_name, m_name, l_name, title, company, mobile_phone, work_phone, personal_email, work_email, website, last_updated_date)
VALUES(user_id, new_id, in_fname, in_mname, in_lname, in_title, in_company, in_mobilephone, in_workphone, in_personalemail, in_workemail, in_website, NOW());
SELECT LAST_INSERT_ID() into new_id;
INSERT INTO contact_dimensions (owner_id, contact_id, status, working_relationship, knowledge_length)
VALUES(user_id, new_id, in_status, in_working_relationship, in_knowledge_length);
SELECT new_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_CreateGroup
DELIMITER //
CREATE PROCEDURE `sp_CreateGroup`(IN user_id INT, IN in_name VARCHAR(64))
BEGIN
DECLARE new_id INT;
SELECT COALESCE(MAX(id), 0) + 1 into new_id FROM contact_group WHERE owner_id = user_id;
INSERT INTO contact_group (owner_id, id, `name`)
VALUES(user_id, new_id, in_name);
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_CreateInteraction
DELIMITER //
CREATE PROCEDURE `sp_CreateInteraction`(IN user_id INT, IN in_contact_id INT, IN in_dateoccurring DATE, IN in_direction TINYINT, IN in_thirdparty TINYINT, IN in_type INT, IN in_details VARCHAR(1024))
BEGIN
DECLARE new_id INT;
INSERT INTO interaction (owner_id, contact_id, id, date_occurring, direction, thirdparty, `type`)
VALUES(user_id, in_contact_id, new_id, in_dateoccurring, in_direction, in_thirdparty, in_type);
IF (in_details IS NOT NULL) THEN
	SELECT LAST_INSERT_ID() into new_id;
	INSERT INTO interaction_details (owner_id, contact_id, interaction_id, details)
    VALUES(user_id, in_contact_id, new_id, in_details);
END IF;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_CreateUser
DELIMITER //
CREATE PROCEDURE `sp_CreateUser`(IN in_email VARCHAR(64), IN in_hash VARCHAR(128), IN in_salt VARCHAR(16))
BEGIN 
INSERT INTO user (email, hash, salt)
VALUES(in_email, in_hash, in_salt);
SELECT LAST_INSERT_ID() as "user_id";
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_DeleteContact
DELIMITER //
CREATE PROCEDURE `sp_DeleteContact`(IN user_id INT, IN in_contact_id INT)
BEGIN
DELETE FROM contact
WHERE owner_id = user_id AND id = in_contact_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_DeleteGroup
DELIMITER //
CREATE PROCEDURE `sp_DeleteGroup`(IN user_id INT, IN in_group_id INT)
BEGIN
DELETE FROM contact_group
WHERE owner_id = user_id AND id = in_group_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_DeleteInteraction
DELIMITER //
CREATE PROCEDURE `sp_DeleteInteraction`(IN user_id INT, IN in_contact_id INT, in_interaction_id INT)
BEGIN
DELETE FROM interaction
WHERE owner_id = user_id AND contact_id = in_contact_id AND id = in_interaction_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_DeleteUser
DELIMITER //
CREATE PROCEDURE `sp_DeleteUser`(IN user_id INT)
BEGIN
DELETE FROM `user`
WHERE id = user_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetContactDetails
DELIMITER //
CREATE PROCEDURE `sp_GetContactDetails`(IN user_id INT, IN contact_id INT)
BEGIN
SELECT contact.owner_id, contact.id, contact.f_name, contact.m_name, contact.l_name, contact.title, contact.company, contact.mobile_phone, contact.work_phone, contact.personal_email, contact.work_email, contact.website, contact_dimensions.status, contact_dimensions.working_relationship, contact_dimensions.knowledge_length, IF(contact.snooze_until >= NOW(), contact.snooze_until, NULL) as snooze_until, contact.last_updated_date
FROM contact LEFT JOIN contact_dimensions ON contact.owner_id = contact_dimensions.owner_id AND contact.id = contact_dimensions.contact_id
WHERE contact.owner_id=user_id AND contact.id=contact_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetContactsForUser
DELIMITER //
CREATE PROCEDURE `sp_GetContactsForUser`(IN user_id INT)
BEGIN
SELECT contact.id as id, f_name, l_name, company, title, IF(snooze_until IS NOT NULL AND snooze_until >= NOW(), TRUE, FALSE) as is_snoozed, (COUNT(i.id) > 0) as is_trending
FROM contact
LEFT OUTER JOIN 
(SELECT * from interaction
WHERE interaction.owner_id = user_id AND interaction.date_occurring >= DATE_SUB(NOW(), INTERVAL 5 DAY)) as i
ON i.owner_id = contact.owner_id AND i.contact_id = contact.id
WHERE contact.owner_id=user_id
GROUP BY contact.id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetContactsInGroup
DELIMITER //
CREATE PROCEDURE `sp_GetContactsInGroup`(IN user_id INT, IN in_group_id INT)
BEGIN
SELECT contact_id as 'id' FROM group_member WHERE owner_id = user_id AND group_id = in_group_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetGroupsForUser
DELIMITER //
CREATE PROCEDURE `sp_GetGroupsForUser`(IN user_id INT)
BEGIN
SELECT id, contact_group.`name` FROM contact_group WHERE owner_id=user_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetInteractionDetails
DELIMITER //
CREATE PROCEDURE `sp_GetInteractionDetails`(IN in_user_id INT, IN in_contact_id INT, IN in_interaction_id INT)
BEGIN
SELECT date_occurring, name as interaction_type, direction, thirdparty, details
FROM interaction JOIN interaction_type ON interaction.type = interaction_type.id
LEFT JOIN interaction_details ON interaction.owner_id = interaction_details.owner_id AND interaction.contact_id = interaction_details.contact_id AND interaction.id = interaction_details.interaction_id
WHERE interaction.owner_id=in_user_id AND interaction.contact_id = in_contact_id AND interaction.id = in_interaction_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetInteractionsForContact
DELIMITER //
CREATE PROCEDURE `sp_GetInteractionsForContact`(IN in_user_id INT, IN in_contact_id INT)
BEGIN
SELECT interaction.id AS id, date_occurring, name as interaction_type FROM interaction JOIN interaction_type ON interaction.type = interaction_type.id WHERE owner_id=in_user_id AND contact_id = in_contact_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetInteractionsForContactBetweenDates
DELIMITER //
CREATE PROCEDURE `sp_GetInteractionsForContactBetweenDates`(IN in_user_id INT, IN in_contact_id INT, IN in_date_after DATE, IN in_date_before DATE)
BEGIN
SELECT interaction.id AS id, date_occurring, direction, thirdparty as is_thirdparty, interaction_type.strength as type_strength, details IS NOT NULL as has_memorable_notes
FROM (interaction
LEFT JOIN interaction_details ON interaction.id = interaction_details.interaction_id AND interaction_details.owner_id=in_user_id AND interaction_details.contact_id = in_contact_id)
JOIN interaction_type ON interaction.type = interaction_type.id
WHERE interaction.owner_id=in_user_id AND interaction.contact_id = in_contact_id
AND date_occurring >= in_date_after AND date_occurring <= in_date_before;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetUsers
DELIMITER //
CREATE PROCEDURE `sp_GetUsers`()
BEGIN
SELECT id, email FROM user;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_RemoveContactFromGroup
DELIMITER //
CREATE PROCEDURE `sp_RemoveContactFromGroup`(IN user_id INT, in in_group_id INT, in in_contact_id INT)
BEGIN
DELETE FROM group_member
WHERE owner_id = user_id AND group_id = in_group_id AND contact_id = in_contact_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_SnoozeContact
DELIMITER //
CREATE PROCEDURE `sp_SnoozeContact`(IN user_id INT, IN in_contact_id INT, IN in_snooze_until DATETIME)
BEGIN
UPDATE contact
SET
snooze_until = in_snooze_until
WHERE owner_id = user_id AND id = in_contact_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_UpdateContactDetails
DELIMITER //
CREATE PROCEDURE `sp_UpdateContactDetails`(IN user_id INT, IN in_contact_id INT, IN in_f_name VARCHAR(36), IN in_m_name VARCHAR(36), IN in_l_name VARCHAR(36), IN in_title VARCHAR(36), IN in_company VARCHAR(36), IN in_mobile_phone VARCHAR(36), IN in_work_phone VARCHAR(36), IN in_personal_email VARCHAR(36), IN in_work_email VARCHAR(36), IN in_website VARCHAR(64), IN in_status DECIMAL(8,4), IN in_working_relationship DECIMAL(8,4), IN in_knowledge_length DECIMAL(8,4))
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
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_UpdateGroup
DELIMITER //
CREATE PROCEDURE `sp_UpdateGroup`(IN user_id INT, IN in_group_id INT, IN in_name VARCHAR(64))
BEGIN
UPDATE contact_group
SET
`name` = COALESCE(in_name, `name`)
WHERE owner_id = user_id AND id = in_group_id;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_UpdateInteraction
DELIMITER //
CREATE PROCEDURE `sp_UpdateInteraction`(IN user_id INT, IN in_contact_id INT, IN in_interaction_id INT, IN in_date_occurring DATE, IN in_direction TINYINT, IN in_thirdparty TINYINT, IN in_details VARCHAR(1024))
BEGIN
UPDATE interaction
SET
date_occurring = COALESCE(in_date_occurring, date_occurring),
direction = COALESCE(in_direction, direction),
thirdparty = COALESCE(in_thirdparty, thirdparty)
WHERE owner_id = user_id AND contact_id = in_contact_id AND id = in_interaction_id;


IF (in_details IS NOT NULL) THEN 
	REPLACE INTO interaction_details (owner_id, contact_id, interaction_id, details)
		VALUES(user_id, in_contact_id, in_interaction_id, in_details);
ELSE 
	DELETE FROM interaction_details
    WHERE owner_id = user_id AND contact_id = in_contact_id AND interaction_id = in_interaction_id;
END IF;
END//
DELIMITER ;

-- Dumping structure for table mehive_prod.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `salt` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mehive_prod.user: ~4 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `hash`, `salt`) VALUES
	(1, 'annisg@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT'),
	(2, 'ahmed1@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT'),
	(3, 'hernanre@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT'),
	(4, 'nandoltw@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
