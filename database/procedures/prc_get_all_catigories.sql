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
      Type = p_type 
    ;
END$$