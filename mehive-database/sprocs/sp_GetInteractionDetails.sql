CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetInteractionDetails`(IN in_user_id INT, IN in_contact_id INT, IN in_interaction_id INT)
BEGIN
SELECT date_occurring, name as interaction_type, direction, thirdparty, details
FROM interaction JOIN interaction_type ON interaction.type = interaction_type.id
LEFT JOIN interaction_details ON interaction.owner_id = interaction_details.owner_id AND interaction.contact_id = interaction_details.contact_id AND interaction.id = interaction_details.interaction_id
WHERE interaction.owner_id=in_user_id AND interaction.contact_id = in_contact_id AND interaction.id = in_interaction_id;
END