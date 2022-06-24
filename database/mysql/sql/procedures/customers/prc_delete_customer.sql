DELIMITER $$
CREATE PROCEDURE `prc_delete_customer` (
  p_customer_id   BIGINT UNSIGNED
)  
BEGIN

  DELETE FROM  
    customers
  WHERE 
    id_customer = p_customer_id
  ;
      
END$$