CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetInteractionsForContactBetweenDates`(IN in_user_id INT, IN in_contact_id INT, IN in_date_after DATE, IN in_date_before DATE)
BEGIN
SELECT interaction.id AS id, date_occurring, direction, thirdparty as is_thirdparty, interaction_type.strength as type_strength, details IS NOT NULL as has_memorable_notes
FROM (interaction
LEFT JOIN interaction_details ON interaction.id = interaction_details.interaction_id AND interaction_details.owner_id=in_user_id AND interaction_details.contact_id = in_contact_id)
JOIN interaction_type ON interaction.type = interaction_type.id
WHERE interaction.owner_id=in_user_id AND interaction.contact_id = in_contact_id
AND date_occurring >= in_date_after AND date_occurring <= in_date_before;
END