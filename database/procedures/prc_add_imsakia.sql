DELIMITER $$
CREATE PROCEDURE `prcAddImsakia`
  p_lang SMALLINT(2) UNSIGNED,
  p_city_id BIGINT(20) UNSIGNED,
  p_img_url VARCHAR(200),
  OUT out_imsakia_id BIGINT(20) UNSIGNED
)  
BEGIN

  INSERT INTO 
    imsakia (
      ImgId,
      CityId
    )
  VALUES (
      p_city_id,
      funInsertImg(p_img_url, NULL, NULL)
  )
  ;

  SET out_imsakia_id = LAST_INSERT_ID();
  SELECT out_imsakia_id as idImsakia;

END$$