DELIMITER $$
CREATE PROCEDURE `prcUpdateArticle` (
  p_lang SMALLINT(2) UNSIGNED,
  p_title LONGTEXT,
  p_img_url VARCHAR(500),
  p_article_id BIGINT(20) UNSIGNED,
  p_article_categ_id INT(20) UNSIGNED
)  
BEGIN

  DECLARE title_str_id BIGINT(20) UNSIGNED DEFAULT 
    (SELECT titleStrId FROM articles WHERE IdArticle = p_article_id);

  IF p_title IS NOT NULL THEN 
    SET title_str_id = 
      funInsertOrUpdateText(p_lang, p_title, title_str_id);   
  END IF;

  
  UPDATE 
    articles 
  SET 
    titleStrId = CASE WHEN title_str_id IS NOT NULL THEN title_str_id ELSE titleStrId END,
    ImgId = CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE ImgId END
  WHERE 
    IdArticle = p_article_id;

  IF p_article_categ_id IS NOT NULL THEN 
    UPDATE 
      articles_categories 
    SET 
      CategoryId = p_article_categ_id 
    WHERE 
      ArticleId = p_article_id
    ;
  END IF;

END$$