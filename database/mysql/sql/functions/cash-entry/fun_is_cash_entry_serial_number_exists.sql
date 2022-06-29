DELIMITER $$
CREATE FUNCTION `fun_is_cash_entry_serial_number_exists` (
  p_serial_number         BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  RETURN EXISTS ( 
    SELECT 
      id_cash_entry
    FROM 
      cash_entries
    WHERE 
      serial_number = p_serial_number
  );
  
END$$