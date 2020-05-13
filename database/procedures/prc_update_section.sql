DELIMITER $$
CREATE PROCEDURE `prcUpdateSection` (
  p_lang SMALLINT(2) UNSIGNED,
  p_display_name LONGTEXT,
  p_img_url VARCHAR(500),
  p_section_id BIGINT(20) UNSIGNED
)
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_display_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_display_name, name_str_id);
  END IF;

  
  UPDATE 
    sections 
  SET 
    NameStrId = CASE WHEN name_str_id IS NOT NULL THEN name_str_id ELSE NameStrId END,
    ImgId = CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE ImgId END
  WHERE 
    IdSection = p_section_id;

END$$