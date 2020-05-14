DELIMITER $$
CREATE PROCEDURE `prcAddCategory` (
  p_lang SMALLINT(2) UNSIGNED,
  p_display_name LONGTEXT,
  p_Type SMALLINT(2),
  OUT out_category_id INT(20) UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_display_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_display_name, name_str_id);
  END IF;

  INSERT INTO categories (NameStrId, Type)
  VALUES (name_str_id, p_Type);
  
  SET out_category_id = LAST_INSERT_ID();
  SELECT out_category_id as idCategory;

END$$