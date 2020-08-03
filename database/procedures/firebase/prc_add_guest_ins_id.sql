DELIMITER $$
CREATE PROCEDURE `prcAddGuestInsId` (
    p_instance_id VARCHAR(256)
)
BEGIN

INSERT INTO  firebase_guest_users VALUES (
    p_instance_id 
)
ON DUPLICATE KEY UPDATE InstanceId = p_instance_id
; 

END$$