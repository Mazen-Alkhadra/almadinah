DELIMITER $$
CREATE PROCEDURE `prcDeleteUserInsId` (
    p_user_id BIGINT(20) UNSIGNED,
    p_session_id  VARCHAR(128)
)
BEGIN

DELETE FROM 
    firebase_users 
WHERE 
    UserId = p_user_id AND
    SessionId = p_session_id
; 

END$$