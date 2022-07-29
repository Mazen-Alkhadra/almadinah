DELIMITER $$
CREATE FUNCTION `fun_is_nitro_serial_number_exists` (
  p_serial_number         BIGINT UNSIGNED
)
RETURNS BOOLEAN
BEGIN
  RETURN EXISTS ( 
    SELECT 
      id_nitro
    FROM 
      nitros 
    WHERE 
      serial_number = p_serial_number
  );
  
END$$