DELIMITER $$
CREATE PROCEDURE `prcGetAllSections` (
    IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        IdSection id, 
        funGetString(NameStrId, p_lang) displayName,
        i.Url imageURI
    FROM 
      sections s
      INNER JOIN imgs i ON i.IdImg = s.ImgId
    WHERE 
      Visible = TRUE
    ;
END$$