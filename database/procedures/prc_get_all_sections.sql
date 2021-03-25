DELIMITER $$
CREATE PROCEDURE `prcGetAllSections` (
    IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        IdSection id, 
        funGetString(NameStrId, p_lang) displayName,
        i.Url imageURI,
        Visible visible
    FROM 
      sections s
      LEFT JOIN imgs i ON i.IdImg = s.ImgId
    ;
END$$