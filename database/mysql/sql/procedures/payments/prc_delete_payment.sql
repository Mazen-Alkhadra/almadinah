DELIMITER $$
CREATE PROCEDURE `prc_delete_payment` (
  p_payment_id          BIGINT UNSIGNED
)  
BEGIN
     
  DELETE FROM 
    payments 
  WHERE 
    id_payment = p_payment_id
  ;
   
END$$