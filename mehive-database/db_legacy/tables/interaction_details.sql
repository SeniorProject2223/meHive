CREATE TABLE `interaction_details` (
  `contact_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `interaction_id` int(11) NOT NULL,
  `details` varchar(1024) NOT NULL,
  PRIMARY KEY (`owner_id`,`contact_id`,`interaction_id`),
  CONSTRAINT `interaction_details_ibfk_1` FOREIGN KEY (`contact_id`, `owner_id`, `interaction_id`) REFERENCES `interaction` (`contact_id`, `owner_id`, `id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4