DELIMITER $$
CREATE PROCEDURE `prcAddCity` (
  p_lang SMALLINT(2) UNSIGNED,
  p_name LONGTEXT,
  p_img_url VARCHAR(500),
  p_country_id INT(20) UNSIGNED,
  OUT out_city_id INT(20) UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT(20) UNSIGNED DEFAULT NULL;

  IF p_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_name, name_str_id);
  END IF;

  INSERT INTO 
    cities (
      NameStrId, 
      ImgId,
      CountryId
    )
  VALUES (
      name_str_id, 
      funInsertImg(p_img_url, NULL, NULL),
      p_country_id
  )
  ;

  SET out_city_id = LAST_INSERT_ID();
  SELECT out_city_id as idCity;

END$$