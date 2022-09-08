CREATE TABLE `interaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `date_occurring` date NOT NULL,
  `direction` tinyint(4) NOT NULL,
  `thirdparty` tinyint(1) DEFAULT 0,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`,`owner_id`,`contact_id`),
  KEY `type` (`type`),
  CONSTRAINT `interaction_ibfk_1` FOREIGN KEY (`type`) REFERENCES `interaction_type` (`id`),
  CONSTRAINT `interaction_ibfk_2` FOREIGN KEY (`contact_id`, `owner_id`) REFERENCES `contact` (`id`, `owner_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4