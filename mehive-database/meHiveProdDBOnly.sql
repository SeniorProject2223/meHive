-- --------------------------------------------------------
-- Host:                         database-2.cq2qrghl88rw.us-east-1.rds.amazonaws.com
-- Server version:               10.6.10-MariaDB-log - managed by https://aws.amazon.com/rds/
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mehive_prod
CREATE DATABASE IF NOT EXISTS `mehive_prod` /*!40100 DEFAULT CHARACTER SET latin1 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table mehive_prod.contact: ~28 rows (approximately)
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` (`id`, `owner_id`, `f_name`, `m_name`, `l_name`, `title`, `company`, `mobile_phone`, `work_phone`, `personal_email`, `work_email`, `website`, `last_updated_date`, `snooze_until`) VALUES
	(1, 1, 'Jamie', 'K', 'Riley', 'VP of Marketing', 'Toyota', '202-555-0183', '202-555-0167', NULL, 'jamie@toyota.com', NULL, '2022-12-13 17:08:51', NULL),
	(2, 1, 'Dominic', NULL, 'Butler', NULL, 'SEP', '202-555-0183', '202-555-0167', NULL, 'dominic@sep.com', NULL, '2022-12-13 17:08:51', NULL),
	(3, 1, 'Jasmine', NULL, 'Poole', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:08:51', NULL),
	(4, 1, 'Neil', NULL, 'Morgan', NULL, 'Microsoft', '202-555-0183', '202-555-0167', NULL, 'neil@microsoft.com', NULL, '2022-12-13 17:08:51', NULL),
	(5, 1, 'Gordon', NULL, 'Lewis', NULL, 'Rose-Hulman', '202-555-0183', '202-555-0167', NULL, 'lewisg@rose-hulman.edu', NULL, '2022-12-13 17:08:51', NULL),
	(6, 1, 'Courtney', NULL, 'Ross', 'CFO', 'Meta', '202-555-0183', '202-555-0167', NULL, 'lewisg@rose-hulman.edu', NULL, '2022-12-13 17:08:51', NULL),
	(137, 4, 'John', '', 'Doe', '', '', '', '', '', 'abc@123.com', '', '2023-01-24 02:02:40', NULL),
	(151, 16, 'Ian', '', 'Barthel', '', '', '', '', '', 'bartheic@rose-hulman.edu', '', '2023-01-24 17:27:42', NULL),
	(152, 4, 'Jane', '', 'Doe', '', '', '', '', '', '', '', '2023-01-24 17:50:10', NULL),
	(166, 25, 'Jim', '', 'John', '', 'Jimmy John\'s', '224-235-9745', '', '', 'test@email.com', '', '2023-02-11 00:26:58', '2023-05-04 17:28:34'),
	(167, 25, 'Jeff', '', 'Gilberts', '', '', '', '', '', 'test@email.com', '', '2023-02-14 22:05:14', NULL),
	(170, 32, '', '', '', '', '', '', '', '', '', '', '2023-03-28 23:46:08', NULL),
	(171, 32, '', '', '', '', '', '', '', '', '', '', '2023-03-28 23:46:08', NULL),
	(172, 32, '', '', '', '', '', '', '', '', '', '', '2023-03-28 23:46:08', NULL),
	(184, 25, 'Josh', '', 'Allen', 'Quarterback', 'Buffalo Bills', '', '', '', '', '', '2023-05-03 17:17:06', NULL),
	(185, 25, 'Russell', '', 'Wilson', '', '', '', '', '', '', '', '2023-05-03 17:40:55', NULL),
	(186, 25, 'Ian', '', 'Barthel', '', '', '1234567890', '', '', 'test@gmail.com', 'rose-hulman.edu', '2023-05-03 18:00:30', NULL),
	(187, 25, 'Barry', 'B.', 'Benson', 'god', 'Bee Movie', '', '1234235321', '', 'god@beemovie.net', '', '2023-05-03 18:14:03', NULL),
	(188, 25, 'New', '', 'Contact', '', '', '', '', '', '', '', '2023-05-03 18:17:26', NULL),
	(189, 25, 'Adrian', '', 'Anderson', 'Sales Associate', 'Example Inc.', '9876543210', '1234567890', 'anderson@gmail.com', 'anderson@example.com', 'anderson.github.io', '2023-05-03 18:21:16', NULL),
	(190, 25, 'Brian', '', 'Barnhardt', 'QA Tester', 'Example Inc.', '1029384756', '6574839201', 'brianb@gmail.com', 'barnhardt@example.com', NULL, '2023-05-03 18:21:16', NULL),
	(191, 25, 'Catherine', '', 'Cohen', 'CEO', 'Example Inc.', '1627384950', '5049382716', 'cohencat@gmail.com', 'cc@example.com', 'example.com', '2023-05-03 18:21:16', NULL),
	(192, 25, 'Phil', '', 'T', '', 'Ur MOM', '', '', '', '', '', '2023-05-03 18:51:05', '2025-04-22 18:51:57'),
	(193, 37, '1', '', '2', '', '', '', '', '', '', '', '2023-05-09 02:11:32', NULL),
	(194, 37, '3', '', '4', '', '', '', '', '', '', '', '2023-05-09 02:11:35', NULL),
	(195, 37, 'drag', '', 'test', '', '', '', '', '', '', '', '2023-05-09 02:25:31', NULL),
	(196, 37, 'test', '', 'drag', '', '', '', '', '', '', '', '2023-05-09 02:25:36', NULL),
	(197, 37, 'test 3', '', 'haha', '', '', '', '', '', '', '', '2023-05-09 02:33:04', NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table mehive_prod.contact_dimensions: ~28 rows (approximately)
/*!40000 ALTER TABLE `contact_dimensions` DISABLE KEYS */;
INSERT INTO `contact_dimensions` (`contact_id`, `owner_id`, `status`, `working_relationship`, `knowledge_length`) VALUES
	(1, 1, 0.5000, 0.5000, 0.5000),
	(2, 1, 1.0000, 0.0000, 0.0000),
	(3, 1, 0.0000, 1.0000, 1.0000),
	(4, 1, 0.3000, 0.7000, 0.7000),
	(5, 1, 0.7000, 0.3000, 0.3000),
	(6, 1, 0.8000, 0.3000, 0.3000),
	(137, 4, 0.5100, 0.7400, 0.6800),
	(152, 4, 0.5000, 0.5000, 0.5000),
	(151, 16, 0.5000, 0.4400, 0.2100),
	(166, 25, 0.5000, 0.5000, 0.5000),
	(167, 25, 0.5000, 0.5000, 0.5000),
	(184, 25, 0.5000, 0.0000, 1.0000),
	(185, 25, 0.5000, 0.5000, 0.5000),
	(186, 25, 0.5000, 0.0000, 0.0000),
	(187, 25, 0.5000, 0.5000, 0.5000),
	(188, 25, 0.5000, 0.5000, 0.5000),
	(189, 25, 0.5000, 0.5000, 0.5000),
	(190, 25, 0.5000, 0.5000, 0.5000),
	(191, 25, 0.5000, 0.5000, 0.5000),
	(192, 25, 0.5000, 0.5000, 0.5000),
	(170, 32, 0.5000, 0.5000, 0.5000),
	(171, 32, 0.5000, 0.5000, 0.5000),
	(172, 32, 0.5000, 0.5000, 0.5000),
	(193, 37, 0.5000, 0.5000, 0.5000),
	(194, 37, 0.5000, 0.5000, 0.5000),
	(195, 37, 0.5000, 0.5000, 0.5000),
	(196, 37, 0.5000, 0.5000, 0.5000),
	(197, 37, 0.5000, 0.5000, 0.5000);
/*!40000 ALTER TABLE `contact_dimensions` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.contact_group
CREATE TABLE IF NOT EXISTS `contact_group` (
  `owner_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`owner_id`,`id`),
  CONSTRAINT `contact_group_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table mehive_prod.contact_group: ~3 rows (approximately)
/*!40000 ALTER TABLE `contact_group` DISABLE KEYS */;
INSERT INTO `contact_group` (`owner_id`, `id`, `name`) VALUES
	(1, 1, 'My Group'),
	(35, 1, 'group 1'),
	(37, 1, 'NFL');
/*!40000 ALTER TABLE `contact_group` ENABLE KEYS */;

-- Dumping structure for procedure mehive_prod.GetUserID
DELIMITER //
CREATE PROCEDURE `GetUserID`()
BEGIN

END//
DELIMITER ;

-- Dumping structure for table mehive_prod.group_member
CREATE TABLE IF NOT EXISTS `group_member` (
  `owner_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`owner_id`,`group_id`,`contact_id`),
  KEY `group_member_ibfk_2` (`owner_id`,`contact_id`),
  CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`owner_id`, `group_id`) REFERENCES `contact_group` (`owner_id`, `id`) ON DELETE CASCADE,
  CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`owner_id`, `contact_id`) REFERENCES `contact` (`owner_id`, `id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table mehive_prod.interaction: ~55 rows (approximately)
/*!40000 ALTER TABLE `interaction` DISABLE KEYS */;
INSERT INTO `interaction` (`id`, `contact_id`, `owner_id`, `date_occurring`, `direction`, `thirdparty`, `type`) VALUES
	(131, 137, 4, '2023-01-23', 0, 0, 1),
	(132, 137, 4, '2023-01-23', 0, 0, 3),
	(133, 137, 4, '2023-01-23', 0, 0, 2),
	(134, 137, 4, '2023-01-23', 0, 0, 4),
	(135, 137, 4, '2023-01-23', 0, 0, 5),
	(149, 2, 1, '2023-01-24', 0, 0, 2),
	(150, 137, 4, '2023-01-24', 0, 0, 1),
	(151, 152, 4, '2023-01-24', 0, 0, 1),
	(152, 152, 4, '2023-01-24', 0, 0, 1),
	(153, 152, 4, '2023-01-24', 0, 0, 1),
	(154, 152, 4, '2023-01-24', 0, 0, 1),
	(155, 137, 4, '2023-01-24', 0, 0, 1),
	(156, 152, 4, '2023-01-24', 0, 0, 1),
	(157, 152, 4, '2023-01-24', 0, 0, 1),
	(158, 152, 4, '2023-01-24', 0, 0, 2),
	(159, 152, 4, '2023-01-24', 0, 0, 3),
	(160, 137, 4, '2023-01-24', 0, 0, 3),
	(174, 6, 1, '2023-02-07', 0, 0, 5),
	(175, 5, 1, '2023-02-09', 0, 0, 5),
	(176, 1, 1, '2023-02-09', 0, 0, 1),
	(177, 4, 1, '2023-02-09', 0, 0, 1),
	(178, 166, 25, '2023-02-10', 0, 0, 5),
	(179, 166, 25, '2023-02-15', 0, 0, 4),
	(180, 167, 25, '2023-02-15', 0, 0, 1),
	(181, 166, 25, '2023-02-15', 0, 0, 3),
	(182, 167, 25, '2023-02-15', 0, 0, 3),
	(183, 167, 25, '2023-02-15', 0, 0, 1),
	(189, 166, 25, '2023-05-03', 0, 0, 4),
	(190, 167, 25, '2023-05-03', 0, 0, 1),
	(191, 184, 25, '2023-05-03', 0, 0, 1),
	(192, 184, 25, '2023-05-03', 0, 0, 3),
	(193, 184, 25, '2023-05-03', 0, 0, 1),
	(194, 167, 25, '2023-05-03', 0, 0, 2),
	(195, 167, 25, '2023-05-03', 0, 0, 5),
	(196, 166, 25, '2023-05-03', 0, 0, 5),
	(197, 185, 25, '2023-05-03', 0, 0, 3),
	(198, 185, 25, '2023-05-03', 0, 0, 2),
	(199, 186, 25, '2023-05-03', 1, 1, 1),
	(200, 187, 25, '2023-05-03', 0, 0, 3),
	(201, 188, 25, '2023-05-03', 0, 1, 4),
	(202, 189, 25, '2023-05-03', 0, 0, 4),
	(203, 186, 25, '2023-05-03', 0, 0, 2),
	(204, 189, 25, '2023-05-03', 0, 0, 2),
	(205, 190, 25, '2023-05-03', 0, 0, 1),
	(206, 192, 25, '2023-05-03', 0, 0, 3),
	(207, 190, 25, '2023-05-03', 0, 0, 3),
	(225, 194, 37, '2023-05-08', 0, 0, 1),
	(226, 194, 37, '2023-05-08', 0, 0, 2),
	(227, 194, 37, '2023-05-08', 0, 0, 4),
	(228, 194, 37, '2023-05-08', 0, 0, 5),
	(229, 193, 37, '2023-05-08', 0, 0, 5),
	(230, 195, 37, '2023-05-08', 0, 0, 4),
	(231, 196, 37, '2023-05-08', 0, 0, 1),
	(232, 195, 37, '2023-05-08', 0, 0, 3),
	(233, 197, 37, '2023-05-08', 0, 0, 2);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table mehive_prod.interaction_details: ~55 rows (approximately)
/*!40000 ALTER TABLE `interaction_details` DISABLE KEYS */;
INSERT INTO `interaction_details` (`contact_id`, `owner_id`, `interaction_id`, `details`) VALUES
	(1, 1, 176, ''),
	(2, 1, 149, ''),
	(4, 1, 177, ''),
	(5, 1, 175, ''),
	(6, 1, 174, ''),
	(137, 4, 131, ''),
	(137, 4, 132, ''),
	(137, 4, 133, ''),
	(137, 4, 134, ''),
	(137, 4, 135, ''),
	(137, 4, 150, ''),
	(137, 4, 155, ''),
	(137, 4, 160, ''),
	(152, 4, 151, ''),
	(152, 4, 152, ''),
	(152, 4, 153, ''),
	(152, 4, 154, ''),
	(152, 4, 156, ''),
	(152, 4, 157, ''),
	(152, 4, 158, ''),
	(152, 4, 159, ''),
	(166, 25, 178, ''),
	(166, 25, 179, ''),
	(166, 25, 181, ''),
	(166, 25, 189, ''),
	(166, 25, 196, ''),
	(167, 25, 180, ''),
	(167, 25, 182, ''),
	(167, 25, 183, ''),
	(167, 25, 190, ''),
	(167, 25, 194, ''),
	(167, 25, 195, ''),
	(184, 25, 191, ''),
	(184, 25, 192, ''),
	(184, 25, 193, ''),
	(185, 25, 197, ''),
	(185, 25, 198, ''),
	(186, 25, 199, ' They have a first and last name'),
	(186, 25, 203, ' wants work'),
	(187, 25, 200, 'They stole all my honey'),
	(188, 25, 201, ''),
	(189, 25, 202, ''),
	(189, 25, 204, ''),
	(190, 25, 205, ''),
	(190, 25, 207, ''),
	(192, 25, 206, ''),
	(193, 37, 229, ''),
	(194, 37, 225, ''),
	(194, 37, 226, ''),
	(194, 37, 227, ''),
	(194, 37, 228, ''),
	(195, 37, 230, ''),
	(195, 37, 232, ''),
	(196, 37, 231, ''),
	(197, 37, 233, '');
/*!40000 ALTER TABLE `interaction_details` ENABLE KEYS */;

-- Dumping structure for table mehive_prod.interaction_type
CREATE TABLE IF NOT EXISTS `interaction_type` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `strength` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
CREATE PROCEDURE `sp_CreateUser`(
	IN `in_email` VARCHAR(64),
	IN `in_hash` VARCHAR(128),
	IN `in_salt` VARCHAR(128)
)
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

-- Dumping structure for procedure mehive_prod.sp_GetUserID
DELIMITER //
CREATE PROCEDURE `sp_GetUserID`(
	IN `in_user_email` VARCHAR(50)
)
BEGIN
SELECT user.id
FROM user
WHERE user.email = in_user_email;
END//
DELIMITER ;

-- Dumping structure for procedure mehive_prod.sp_GetUserLogin
DELIMITER //
CREATE PROCEDURE `sp_GetUserLogin`(
	IN `in_user_id` INT
)
BEGIN
SELECT user.salt, user.hash
FROM user
WHERE user.id = in_user_id;
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
  `salt` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table mehive_prod.user: ~25 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `hash`, `salt`) VALUES
	(1, 'annisg@rose-hulman.edu', '123', '123'),
	(2, 'ahmed1@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT'),
	(3, 'herman@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT'),
	(4, 'nandoltw@rose-hulman.edu', 'DUMMY HASH', 'DUMMY SALT'),
	(16, 'test', 'DUMMY HASH', 'DUMMY SALT'),
	(17, 'test2', 'DUMMY_HASH', 'DUMMY_SALT'),
	(18, 'realuser@gmail.com', 'DUMMY_HASH', 'DUMMY_SALT'),
	(19, 'realuser2@gmail.com', 'DUMMY_HASH', 'DUMMY_SALT'),
	(20, 'user5', '$2a$10$AU8qLP8NafFWUXirOWN/du7YzKbIOG4d.xEucKMpppbnAt/oe/RLW', '$2a$10$AU8qLP8NafFWUXirOWN/du'),
	(21, 'jo@mama.com', '$2a$10$Prv/qx/Znj7HYm38iO12NeBcxzNZxlHh4mekIaNhYvYf9YTDu1sFW', '$2a$10$Prv/qx/Znj7HYm38iO12Ne'),
	(23, 'user7@gmail.com', '$2a$10$0VeIfDOyjEoeArcHJlpHsO96giqSDTlOyGOUiuwcz65N3a2iucUlC', '$2a$10$0VeIfDOyjEoeArcHJlpHsO'),
	(24, 'testuser', '$2a$10$WYeze.awlT1hbxSR2dTjK.szibpRf9L6zupV58C0pYhaM1//eHmb2', '$2a$10$WYeze.awlT1hbxSR2dTjK.'),
	(25, 'jacksob1@rose-hulman.edu', '$2a$10$u320MeFI8UJ7AynhxrlNUuEOpFfsUh5s8paraJEsSGYujEAxuTMXe', '$2a$10$u320MeFI8UJ7AynhxrlNUu'),
	(26, 'user20@gmail.com', '$2a$10$sQtl0d6gKtZ5at1V2teTgeEEWdAv9dAYuXek5Vg2YXKmyYve9m3x6', '$2a$10$sQtl0d6gKtZ5at1V2teTge'),
	(27, 'hola', '$2a$10$xsfrtgpWy7LdspDCmdlRauHuAMRyvcEwGJt48hor49n4Xa6Nx9k2G', '$2a$10$xsfrtgpWy7LdspDCmdlRau'),
	(28, 'tool', '$2a$10$DXxgCLD43Q1j7LNgHggzReaWRW/BXg1VPUMEpqXTrnHUKzcv0fqjS', '$2a$10$DXxgCLD43Q1j7LNgHggzRe'),
	(29, 'tope', '$2a$10$b.5R2j2frgq708gQWjvAjO3m/8JZ18lmEQgZoOpGLwmcgSHCGVq6i', '$2a$10$b.5R2j2frgq708gQWjvAjO'),
	(30, 'user21@gmail.com', '$2a$10$IOxEWKR3eCfSlUC86SzqOeIikNVtA1IYa5g9XlBri2zO0ZuYUrxKu', '$2a$10$IOxEWKR3eCfSlUC86SzqOe'),
	(31, 'test13', '$2a$10$Fx7VlgqvTh1c/Ija/.JX4.7zaJdzELWoG3XDh6Mx0h94UHl2ugDdW', '$2a$10$Fx7VlgqvTh1c/Ija/.JX4.'),
	(32, 'jacksob1', '$2a$10$5PoJr39lP7QHnUULtXXzBOyD8SsYdalZPj9Mh8hUqXDq4gxbCZKTC', '$2a$10$5PoJr39lP7QHnUULtXXzBO'),
	(33, 'test130', '$2a$10$2qL.0MjKSW6ISqgT2e3gw.63LgN/XZZlh7ffBovXafBhn/E7a99Fi', '$2a$10$2qL.0MjKSW6ISqgT2e3gw.'),
	(34, 'bartheic@rose-hulman.edu', '$2a$10$GZrLII/2D4B08IQ6GF6f.OIBdwAATHmoP.VI7cmvwQezYPOVcollm', '$2a$10$GZrLII/2D4B08IQ6GF6f.O'),
	(35, 'test10', '$2a$10$NmoREFEGJo945nH.4Nb5XuXWg/szDbcf8BnPDYssHF.tiX4HtF1gG', '$2a$10$NmoREFEGJo945nH.4Nb5Xu'),
	(36, 'banana', '$2a$10$OlvEqieGYZsv1qxv8eEsO.uOHionAGSRChw6YPoejfD6WMy5e8Y32', '$2a$10$OlvEqieGYZsv1qxv8eEsO.'),
	(37, 'test14', '$2a$10$5GsVx.LyHg5tKS9Zdp66Ju2qiudHnZZ04AzqyzHSlgwN4lDzEQlhG', '$2a$10$5GsVx.LyHg5tKS9Zdp66Ju');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
