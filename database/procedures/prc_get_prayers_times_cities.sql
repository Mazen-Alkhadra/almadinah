DELIMITER $$
CREATE PROCEDURE `prcGetPrayersTimesCities` (
   p_lang SMALLINT(2) UNSIGNED,
   p_country_id BIGINT(20) UNSIGNED
)
BEGIN

    SELECT 
        DISTINCT c.IdCity id,
        funGetString(c.NameStrId, p_lang) name,
        im.Url imgURL
    FROM 
        cities c
        INNER JOIN prayers_times pt ON pt.CityId = c.IdCity AND c.CountryId = p_country_id
        LEFT JOIN imgs im ON im.IdImg = c.ImgId
    ;

END$$