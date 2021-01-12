DELIMITER $$
CREATE PROCEDURE `prcUpdatePrayerTime` (
  p_lang SMALLINT(2) UNSIGNED,
  p_img_url VARCHAR(500),
  p_prayer_time_id BIGINT(20) UNSIGNED
)
BEGIN

  UPDATE 
    prayers_times 
  SET 
    ImgId = CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE ImgId END
  WHERE 
    IdPrayerTime = p_prayer_time_id
  ;

END$$