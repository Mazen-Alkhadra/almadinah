DELIMITER $$
CREATE PROCEDURE `prcGetAllCongratsImgs` ()
BEGIN
    SELECT 
        i.IdImg id, i.Url url
    FROM 
        congrats c
        INNER JOIN imgs i ON i.IdImg = c.ImgId
    ;
END$$