DELIMITER $$
CREATE PROCEDURE `prcGetSectionDoors` (
    p_lang SMALLINT(2) UNSIGNED,
    p_section_id BIGINT(20) UNSIGNED
)
BEGIN
    SELECT 
        IdDoor id, 
        funGetString(NameStrId, p_lang) displayName,
        i.Url imageURI,
        MobileAppKey mobileAppKey,
        ArticlesCategoryId articlesCategoryId
    FROM 
      doors d
      INNER JOIN imgs i ON i.IdImg = d.ImgId
    WHERE 
      Visible = TRUE AND 
      SectionId = p_section_id
    ;
END$$