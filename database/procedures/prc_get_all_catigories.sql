DELIMITER $$
CREATE PROCEDURE `prcGetAllCategories` (
  p_lang SMALLINT(2) UNSIGNED,
  p_type SMALLINT(2)
)
BEGIN
  
    SELECT 
        IdCategory id,
        funGetString(NameStrId, p_lang) displayName,
        Type type,
        i.Url imageURL
    FROM 
        categories
        INNER JOIN imgs i ON i.IdImg = c.ImgId
    WHERE 
      CASE WHEN p_type IS NOT NULL THEN Type = p_type ELSE TRUE END 
    ;
    
END$$