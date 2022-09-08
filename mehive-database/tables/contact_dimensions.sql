CREATE TABLE `contact_dimensions` (
  `contact_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `status` decimal(8,4) NOT NULL,
  `working_relationship` decimal(8,4) NOT NULL,
  `knowledge_length` decimal(8,4) NOT NULL,
  PRIMARY KEY (`owner_id`,`contact_id`),
  CONSTRAINT `contact_dimensions_ibfk_1` FOREIGN KEY (`contact_id`, `owner_id`) REFERENCES `contact` (`id`, `owner_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4