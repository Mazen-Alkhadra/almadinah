DELIMITER $$
CREATE PROCEDURE `prc_delete_nitro` (
  p_nitro_id          BIGINT UNSIGNED
)  
BEGIN
     
  DELETE FROM 
    nitros 
  WHERE 
    id_nitro = p_nitro_id
  ;
   
END$$