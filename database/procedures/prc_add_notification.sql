DELIMITER $$
CREATE PROCEDURE `prcAddNotification`(
  p_lang SMALLINT(2) UNSIGNED,
  p_title LONGTEXT,
  p_contnet LONGTEXT,
  p_img_url VARCHAR(500),
  OUT out_notification_id BIGINT(20) UNSIGNED
)  
BEGIN

DECLARE title_str_id BIGINT(20) UNSIGNED DEFAULT 
  funGetStringId(p_lang, p_title);

DECLARE content_str_id BIGINT(20) UNSIGNED DEFAULT 
  funGetStringId(p_lang, p_contnet);

IF title_str_id IS NULL THEN 
  CALL prcInsertText(p_lang, p_title, title_str_id);
END IF;

IF content_str_id IS NULL THEN 
  CALL prcInsertText(p_lang, p_contnet, content_str_id);
END IF;

  INSERT INTO 
    notifications (
      TitleStrId,
      ContentStrId,
      ImgId
    )
  VALUES (
      title_str_id,
      content_str_id,
      CASE WHEN p_img_url IS NULL THEN NULL ELSE funInsertImg(p_img_url, NULL, NULL) END
  );

  SET out_notification_id = LAST_INSERT_ID();
  SELECT out_notification_id as idNotification;

END$$