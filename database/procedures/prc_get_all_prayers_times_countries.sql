DELIMITER $$
CREATE PROCEDURE `prcGetAllPrayersTimesCountries` (
  IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        DISTINCT ct.IdCountry id,
        funGetString(ct.NameStrId, p_lang) name,
        im.Url imgURL
    FROM 
        prayers_times pt
        INNER JOIN cities c ON pt.CityId = c.IdCity
        INNER JOIN countries ct ON ct.IdCountry = c.CountryId
        LEFT JOIN imgs im ON im.IdImg = ct.ImgId
    ;
END$$