DELIMITER $$
CREATE PROCEDURE `prcGetPrayersTimesMonths` (
   p_lang SMALLINT(2) UNSIGNED,
   p_city_id BIGINT(20) UNSIGNED
)
BEGIN

    SELECT 
      monthNumber
    FROM 
      prayers_times 
    WHERE 
      CityId = p_city_id
    ;

END$$