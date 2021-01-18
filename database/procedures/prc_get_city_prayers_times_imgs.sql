DELIMITER $$
CREATE PROCEDURE `prcGetCityPrayersTimesImgs` (
   p_lang SMALLINT(2) UNSIGNED,
   p_city_id BIGINT(20) UNSIGNED,
   p_month_number INT UNSIGNED
)
BEGIN
    SELECT 
       IdPrayerTime id, imgs.Url url
    FROM 
        prayers_times pt
        INNER JOIN imgs ON pt.ImgId = imgs.IdImg
    WHERE 
      CityId = p_city_id AND MonthNumber = p_month_number
    ;

END$$