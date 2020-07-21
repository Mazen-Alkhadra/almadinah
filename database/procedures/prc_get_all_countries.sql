DELIMITER $$
CREATE PROCEDURE `prcGetAllCountries` (
    IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        IdCountry id, 
        funGetString(NameStrId, p_lang) AS displayName,
        i.Url imgURL
    FROM 
        countries c
        LEFT JOIN imgs i ON i.IdImg = c.ImgId
    ORDER BY 
        displayName ASC
    ;
END$$