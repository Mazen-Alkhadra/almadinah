DELIMITER $$
CREATE PROCEDURE `prcAddArticle` (
  p_lang SMALLINT(2) UNSIGNED,
  p_title LONGTEXT,
  p_img_url VARCHAR(500),
  OUT out_article_id BIGINT(20) UNSIGNED,
  p_article_categ_id INT(20) UNSIGNED
)  
BEGIN

  DECLARE title_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_title IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_title, title_str_id);
  END IF;

  INSERT INTO articles (titleStrId, ImgId)
  VALUES (
    title_str_id,
    CASE WHEN p_img_url IS NULL THEN NULL ELSE funInsertImg(p_img_url, NULL, NULL) END
  );
  
  SET out_article_id = LAST_INSERT_ID();

  IF p_article_categ_id IS NOT NULL THEN 
    INSERT INTO 
      articles_categories 
    VALUES 
      (out_article_id, p_article_categ_id)
    ;
  END IF;

  SELECT out_article_id as idArticle;

END$$