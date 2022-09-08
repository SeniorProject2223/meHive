CREATE TABLE `group_member` (
  `owner_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`owner_id`,`group_id`,`contact_id`),
  KEY `group_member_ibfk_2` (`owner_id`,`contact_id`),
  CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`owner_id`, `group_id`) REFERENCES `contact_group` (`owner_id`, `id`) ON DELETE CASCADE,
  CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`owner_id`, `contact_id`) REFERENCES `contact` (`owner_id`, `id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
