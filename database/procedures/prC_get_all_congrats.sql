DELIMITER $$
CREATE PROCEDURE `prcGetAllCongrats` (
  IN p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    SELECT 
       idCongrat id,
       funGetString(NameStrId, p_lang) AS name,
       i.Url imageURL
    FROM 
        congrats c
        INNER JOIN imgs i ON i.IdImg = c.ImgId
    ;
END$$