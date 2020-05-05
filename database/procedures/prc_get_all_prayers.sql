DELIMITER $$
CREATE PROCEDURE `prcGetAllPrayers` (
    IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
      IdPrayer id, 
      funGetString(NameStrId, p_lang) AS displayName,
      ApiKeyName apiKeyName
    FROM 
      prayers
    ORDER BY 
      DisplayOrder
    ;
END$$