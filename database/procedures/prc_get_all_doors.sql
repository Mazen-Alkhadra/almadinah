DELIMITER $$
CREATE PROCEDURE `prcGetAllDoors` (
    p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
        IdDoor id, 
        funGetString(NameStrId, p_lang) displayName,
        i.Url imageURI,
        MobileAppKey mobileAppKey,
        ArticlesCategory articlesCategory,
        Visible visible
    FROM 
      doors d
      INNER JOIN imgs i ON i.IdImg = d.ImgId;
END$$