DELIMITER $$
CREATE PROCEDURE `prcGetAllImsakiaCountries` (
  IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        DISTINCT ct.IdCountry id, funGetString(ct.NameStrId, p_lang) name
    FROM 
        imsakia i
        INNER JOIN cities c ON i.CityId = c.IdCity
        INNER JOIN countries ct ON ct.IdCountry = c.CountryId
    ;
END$$