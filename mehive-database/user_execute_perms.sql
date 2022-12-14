USE mehive_prod;

CREATE USER IF NOT EXISTS 'dbuser'@'%' IDENTIFIED BY 'my_password';
GRANT EXECUTE ON PROCEDURE sp_GetUsers TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_CreateUser TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_DeleteUser TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_CreateContact TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_UpdateContactDetails TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_SnoozeContact TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetContactDetails TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_DeleteContact TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetContactsForUser TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetInteractionsForContact TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetInteractionsForContactBetweenDates TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetInteractionDetails TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_CreateInteraction TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_UpdateInteraction TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_DeleteInteraction TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetGroupsForUser TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_GetContactsInGroup TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_AddContactToGroup TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_CreateGroup TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_UpdateGroup TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_DeleteGroup TO 'dbuser'@'%';
GRANT EXECUTE ON PROCEDURE sp_RemoveContactFromGroup TO 'dbuser'@'%';
