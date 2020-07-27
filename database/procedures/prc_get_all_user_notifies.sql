DELIMITER $$
CREATE PROCEDURE `prcGetAllUserNotifies` (
  p_lang SMALLINT(2) UNSIGNED,
  IN p_UserId BIGINT(20) UNSIGNED
)
BEGIN
    SELECT 
      IdNotification id,
      funGetString(TitleStrId, p_lang) title,
      funGetString(ContentStrId, p_lang) content,
      im.Url imgURL
    FROM 
      notifications n
      INNER JOIN notifications_users nu ON n.IdNotification = nu.NotificationId AND userId = p_UserId
      LEFT JOIN imgs ON n.ImgId = imgs.IdImg
    ;
END$$