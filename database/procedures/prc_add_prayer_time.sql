DELIMITER $$
CREATE PROCEDURE `prcAddPrayerTime`(
  p_lang SMALLINT(2) UNSIGNED,
  p_city_id BIGINT(20) UNSIGNED,
  p_img_url VARCHAR(200),
  OUT out_prayer_tiem_id BIGINT(20) UNSIGNED
)  
BEGIN

  INSERT INTO 
    prayers_times (
      CityId,
      ImgId
    )
  VALUES (
      p_city_id,
      funInsertImg(p_img_url, NULL, NULL)
  )
  ;

  SET out_prayer_tiem_id = LAST_INSERT_ID();
  SELECT out_prayer_tiem_id as idPrayerTime;

END$$