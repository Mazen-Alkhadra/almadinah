DELIMITER $$
CREATE PROCEDURE `prcGetAllUsersInsIds` (
    p_user_id     BIGINT(20) UNSIGNED
)
BEGIN

SELECT 
    InstanceId
FROM 
    firebase_users fu
    INNER JOIN sessions s ON fu.SessionId = s.session_id
WHERE 
    fu.UserId = p_user_id
;

END$$