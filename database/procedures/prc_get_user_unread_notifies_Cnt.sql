DELIMITER $$
CREATE PROCEDURE `prcGetUserUnReadNotifiesCnt` (
  IN p_UserId BIGINT(20) UNSIGNED
)
BEGIN
    SELECT 
      Count(NotificationId) as `count`
    FROM 
      notifications_users
    WHERE 
      userId = p_UserId AND 
      IsRead != TRUE
    ;
END$$