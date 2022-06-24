DELIMITER $$
CREATE PROCEDURE `prc_delete_all_bill_records` (
  p_bill_id                   BIGINT UNSIGNED
)  
BEGIN

  DELETE FROM  
    bills_recordes 
  WHERE 
    bill_id = p_bill_id
  ;
  
END$$