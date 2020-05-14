DELIMITER $$
CREATE PROCEDURE `prcUpdateDoor` (
  p_lang SMALLINT(2) UNSIGNED,
  p_display_name LONGTEXT,
  p_img_url VARCHAR(500),
  p_section_id BIGINT(20) UNSIGNED,
  p_door_id BIGINT(20) UNSIGNED,
  p_article_categ_id INT(20) UNSIGNED,
  p_visible BOOLEAN
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT 
    (SELECT NameStrId FROM doors WHERE IdDoor = p_door_id);

  IF p_display_name IS NOT NULL THEN 
    SET name_str_id = funInsertOrUpdateText(p_lang, p_display_name, name_str_id);
  END IF;

  UPDATE 
    doors 
  SET 
    NameStrId = CASE WHEN name_str_id IS NOT NULL THEN name_str_id ELSE NameStrId END,
    ImgId = CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE ImgId END,
    SectionId = CASE WHEN p_section_id IS NOT NULL THEN p_section_id ELSE SectionId END,
    MobileAppKey = CASE WHEN p_article_categ_id IS NOT NULL THEN 'articles' ELSE MobileAppKey END,
    ArticlesCategoryId = CASE WHEN p_article_categ_id IS NOT NULL THEN p_article_categ_id ELSE ArticlesCategoryId END,
    Visible = CASE WHEN p_visible IS NOT NULL THEN p_visible ELSE Visible END
  WHERE 
    IdDoor = p_door_id;

END$$