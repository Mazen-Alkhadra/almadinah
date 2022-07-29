DELIMITER $$
CREATE FUNCTION `fun_get_auto_nitro_serial_number` ()
RETURNS BIGINT UNSIGNED
BEGIN
  RETURN ( 
    SELECT 
      IFNULL(MAX(serial_number), 0) + 1
    FROM 
      nitros
  );
END$$