CREATE TABLE `contact` (
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
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4