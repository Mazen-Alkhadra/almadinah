DELIMITER $$
CREATE FUNCTION `fun_get_auto_payment_serial_number` ()
RETURNS BIGINT UNSIGNED
BEGIN
  RETURN ( 
    SELECT 
      IFNULL(MAX(serial_number), 0) + 1
    FROM 
      payments     
  );
END$$