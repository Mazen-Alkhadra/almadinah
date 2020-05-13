DELIMITER $$
CREATE PROCEDURE `prcGetAllImgs` ()
BEGIN
    SELECT 
       IdImg id, imgs.Url url
    FROM 
        imgs
    ;
END$$