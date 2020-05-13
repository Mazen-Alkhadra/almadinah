DELIMITER $$
CREATE PROCEDURE `prcAddArticle` (
  p_lang SMALLINT(2) UNSIGNED,
  p_title LONGTEXT,
  p_img_url VARCHAR(500),
  OUT out_article_id BIGINT(20) UNSIGNED
)  
BEGIN

  DECLARE title_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_title IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_paragraph_title, title_str_id);
  END IF;

  INSERT INTO articles (titleStrId, ImgId)
  VALUES (title_str_id, funInsertImg(p_img_url, NULL, NULL));
  
  SET out_article_id = LAST_INSERT_ID();
  SELECT out_article_id as idArticle;

END$$