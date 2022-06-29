DELIMITER $$
CREATE PROCEDURE `prc_delete_cash_entry` (
  p_id          BIGINT UNSIGNED
)  
BEGIN
     
  DELETE FROM 
    cash_entries 
  WHERE 
    id_cash_entry = p_id
  ;
   
END$$