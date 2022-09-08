USE mehive_prod;

DELETE FROM `user` WHERE id;
DELETE FROM interaction_type WHERE id;

ALTER TABLE `user` AUTO_INCREMENT = 1;
ALTER TABLE `contact` AUTO_INCREMENT = 1;
ALTER TABLE `interaction` AUTO_INCREMENT = 1;

SELECT * FROM `user`;
SELECT * FROM contact;
SELECT * FROM contact_dimensions;
SELECT * FROM contact_group;
SELECT * FROM group_member;
SELECT * FROM interaction;
SELECT * FROM interaction_details;
SELECT * FROM interaction_type;