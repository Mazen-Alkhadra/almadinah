DELIMITER $$
CREATE PROCEDURE `prcUpdateCongrat` (
  p_lang SMALLINT(2) UNSIGNED,
  p_name LONGTEXT,
  p_img_url VARCHAR(500),
  p_congrat_id BIGINT(20) UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT 
    (SELECT NameStrId FROM congrats WHERE IdCongrat = p_congrat_id);

  IF p_name IS NOT NULL THEN 
    SET name_str_id = funInsertOrUpdateText(p_lang, p_name, name_str_id);
  END IF;

  UPDATE 
    congrats 
  SET 
    NameStrId = CASE WHEN name_str_id IS NOT NULL THEN name_str_id ELSE NameStrId END,
    ImgId = CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE ImgId END
  WHERE 
    IdCongrat = p_congrat_id;

END$$