DELIMITER $$
CREATE PROCEDURE `prcGetCountryCities` (
    IN p_lang SMALLINT(2) UNSIGNED,
    IN p_country_id INT(20) UNSIGNED
)
BEGIN
    SELECT 
        IdCity id,
        funGetString(NameStrId, p_lang) AS displayName,
        i.Url imgURL
    FROM 
        cities c
        LEFT JOIN imgs i ON i.IdImg = c.ImgId
    WHERE 
        CountryId = p_country_id
    ORDER BY 
        displayName ASC
    ;
END$$