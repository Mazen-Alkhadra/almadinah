DELIMITER $$
CREATE FUNCTION `fun_is_payment_serial_number_exists` (
  p_serial_number         BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  RETURN EXISTS ( 
    SELECT 
      id_payment
    FROM 
      payments 
    WHERE 
      serial_number = p_serial_number
  );
  
END$$