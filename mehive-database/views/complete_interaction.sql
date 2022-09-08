CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `mehive_test`.`complete_interaction` AS
    SELECT 
        `mehive_test`.`interaction`.`owner_id` AS `owner_id`,
        `mehive_test`.`interaction`.`contact_id` AS `contact_id`,
        `mehive_test`.`interaction`.`id` AS `id`,
        `mehive_test`.`interaction_type`.`name` AS `type`,
        `mehive_test`.`interaction`.`date_occurring` AS `date_occurring`,
        `mehive_test`.`interaction`.`direction` AS `direction`,
        `mehive_test`.`interaction`.`thirdparty` AS `thirdparty`,
        `mehive_test`.`interaction_details`.`details` AS `details`
    FROM
        ((`mehive_test`.`interaction`
        JOIN `mehive_test`.`interaction_type` ON (`mehive_test`.`interaction`.`type` = `mehive_test`.`interaction_type`.`id`))
        LEFT JOIN `mehive_test`.`interaction_details` ON (`mehive_test`.`interaction`.`owner_id` = `mehive_test`.`interaction_details`.`owner_id`
            AND `mehive_test`.`interaction`.`contact_id` = `mehive_test`.`interaction_details`.`contact_id`
            AND `mehive_test`.`interaction`.`id` = `mehive_test`.`interaction_details`.`interaction_id`))