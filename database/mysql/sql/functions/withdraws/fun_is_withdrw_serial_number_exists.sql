DELIMITER $$
CREATE FUNCTION `fun_is_withdraw_serial_number_exists` (
  p_serial_number         BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  RETURN EXISTS ( 
    SELECT 
      id_withdraw
    FROM 
      withdraws 
    WHERE 
      serial_number = p_serial_number
  );
  
END$$