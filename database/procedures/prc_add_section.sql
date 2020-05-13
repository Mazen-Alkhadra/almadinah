DELIMITER $$
CREATE PROCEDURE `prcAddSection` (
  p_lang SMALLINT(2) UNSIGNED,
  p_display_name LONGTEXT,
  p_img_url VARCHAR(500),
  OUT out_section_id BIGINT(20) UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_display_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_display_name, name_str_id);
  END IF;

  INSERT INTO sections (NameStrId, ImgId)
  VALUES (name_str_id, funInsertImg(p_img_url, NULL, NULL));
  
  SET out_section_id = LAST_INSERT_ID();
  SELECT out_section_id as idSection;

END$$