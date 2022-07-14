DELIMITER $$
CREATE PROCEDURE `prc_delete_withdraw` (
  p_withdraw_id          BIGINT UNSIGNED
)  
BEGIN
     
  DELETE FROM 
    withdraws 
  WHERE 
    id_withdraw = p_withdraw_id
  ;
   
END$$