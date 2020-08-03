DELIMITER $$
CREATE PROCEDURE `prcGetPublicNotifies` (
  p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
      IdNotification id,
      funGetString(TitleStrId, p_lang) title,
      funGetString(ContentStrId, p_lang) content,
      CreatedDateTime createdDateTime,
      imgs.Url imgURL
    FROM 
      notifications n
      LEFT JOIN imgs ON n.ImgId = imgs.IdImg
    WHERE 
      Type = 2
    ORDER BY 
      CreatedDateTime DESC
    
    ;
END$$