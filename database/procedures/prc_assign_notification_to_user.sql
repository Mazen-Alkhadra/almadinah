DELIMITER $$
CREATE PROCEDURE `prcAssignNotificationToUser`(
  p_notification_id BIGINT(20) UNSIGNED,
  p_user_id BIGINT(20) UNSIGNED
)  
BEGIN
  INSERT INTO 
      notifications_users (
        NotificationId,
        userId
      )
  VALUES (
      p_notification_id,
      p_user_id
  );

END$$