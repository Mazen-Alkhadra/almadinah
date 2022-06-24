DELIMITER $$
CREATE PROCEDURE `prc_delete_bill` (
  p_bill_id          BIGINT UNSIGNED
)  
BEGIN
   
  CALL prc_delete_all_bill_records(p_bill_id);
  
  DELETE FROM 
    bills 
  WHERE 
    id_bill = p_bill_id
  ;
   
END$$