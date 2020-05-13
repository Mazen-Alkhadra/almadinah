DELIMITER $$
CREATE PROCEDURE `prcAddDoor` (
  p_lang SMALLINT(2) UNSIGNED,
  p_display_name LONGTEXT,
  p_img_url VARCHAR(500),
  p_section_id BIGINT(20) UNSIGNED,
  OUT out_door_id BIGINT(20) UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_display_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_display_name, name_str_id);
  END IF;

  INSERT INTO doors (NameStrId, ImgId, SectionId)
  VALUES (name_str_id, funInsertImg(p_img_url, NULL, NULL), p_section_id);
  
  SET out_door_id = LAST_INSERT_ID();
  SELECT out_door_id as idDoor;

END$$