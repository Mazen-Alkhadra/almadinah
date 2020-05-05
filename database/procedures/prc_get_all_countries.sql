DELIMITER $$
CREATE PROCEDURE `prcGetAllCountries` (
    IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        IdCountry id, 
        funGetString(NameStrId, p_lang) AS displayName
    FROM 
        countries
    ORDER BY 
        displayName ASC
    ;
END$$