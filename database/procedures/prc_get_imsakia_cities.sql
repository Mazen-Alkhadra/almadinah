DELIMITER $$
CREATE PROCEDURE `prcGetImsakiaCities` (
   p_lang SMALLINT(2) UNSIGNED,
   p_country_id BIGINT(20) UNSIGNED
)
BEGIN

    SELECT 
        c.IdCity id, funGetString(c.NameStrId, p_lang) name
    FROM 
        cities c
        INNER JOIN imsakia i ON i.CityId = c.IdCity AND c.CountryId = p_country_id
    ;

END$$