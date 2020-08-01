DELIMITER $$
CREATE PROCEDURE `prcAddUserInsId` (
    p_user_id BIGINT(20) UNSIGNED,
    p_session_id  VARCHAR(128),
    p_instance_id VARCHAR(256)
)
BEGIN

INSERT INTO  firebase_users VALUES (
    p_user_id, p_session_id, p_instance_id 
)
ON DUPLICATE KEY UPDATE InstanceId = p_instance_id
; 

END$$