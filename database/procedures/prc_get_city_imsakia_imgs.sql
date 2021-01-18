DELIMITER $$
CREATE PROCEDURE `prcGetCityImsakiaImgs` (
   p_lang SMALLINT(2) UNSIGNED,
   p_city_id BIGINT(20) UNSIGNED
)
BEGIN
    SELECT 
       IdImsakia id, imgs.Url url
    FROM 
        imsakia i
        INNER JOIN imgs ON i.ImgId = imgs.IdImg
    WHERE 
      CityId = p_city_id
    ;

END$$