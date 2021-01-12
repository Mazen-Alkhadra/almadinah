DELIMITER $$
CREATE PROCEDURE `prcAssignNotificationToAllUsers`(
  p_notification_id BIGINT(20) UNSIGNED
)  
BEGIN
  INSERT INTO 
      notifications_users (
        userId,
        NotificationId
      )
  SELECT 
    IdUser, p_notification_id 
  FROM 
    users
  ;
END$$