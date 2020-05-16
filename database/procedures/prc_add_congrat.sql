DELIMITER $$
CREATE PROCEDURE `prcAddCongrat` (
  p_lang SMALLINT(2) UNSIGNED,
  p_name LONGTEXT,
  p_img_url VARCHAR(500),
  OUT out_congrat_id BIGINT(20) UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_name, name_str_id);
  END IF;

  INSERT INTO 
    congrats (
      NameStrId, 
      ImgId
    )
  VALUES (
      name_str_id, 
      CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE NULL END
  )
  ;

  SET out_congrat_id = LAST_INSERT_ID();
  SELECT out_congrat_id as idCongrat;

END$$