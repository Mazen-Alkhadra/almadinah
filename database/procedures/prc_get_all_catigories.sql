DELIMITER $$
CREATE PROCEDURE `prcGetAllCategories` (
  p_lang SMALLINT(2) UNSIGNED,
  p_type SMALLINT(2)
)
BEGIN
  
    SELECT 
        IdCategory id,
        funGetString(NameStrId, p_lang) displayName,
        Type type
    FROM 
        categories
    WHERE 
      CASE WHEN p_type IS NOT NULL THEN Type = p_type ELSE TRUE END 
    ;
END$$