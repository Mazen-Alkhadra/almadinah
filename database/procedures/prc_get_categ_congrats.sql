DELIMITER $$
CREATE PROCEDURE `prcGetCategoryCongrats` (
  IN p_lang SMALLINT(2) UNSIGNED,
  IN p_category_id INT(20) UNSIGNED
)
BEGIN
    SELECT 
       idCongrat id,
       funGetString(NameStrId, p_lang) AS name,
       i.Url imageURL
    FROM 
        congrats c
        INNER JOIN imgs i ON i.IdImg = c.ImgId
    WHERE 
      CategoryId = p_category_id;
    ;
END$$