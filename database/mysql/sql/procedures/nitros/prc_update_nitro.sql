DELIMITER $$
CREATE PROCEDURE `prc_update_nitro` (
  p_nitro_id                 BIGINT UNSIGNED,
  p_serial_number            BIGINT UNSIGNED,
  p_value                    DOUBLE,
  p_notic                    LONGTEXT,
  p_at                       DATETIME
)  
BEGIN

  IF p_serial_number IS NOT NULL AND 
    fun_is_nitro_serial_number_exists (p_serial_number) THEN 
        CALL prc_throw_exception(NULL, 'DuplicateSerialNumber');
  END IF;


  UPDATE  
    nitros 
  SET 
    serial_number = IFNULL(p_serial_number, serial_number),
    value = IFNULL(p_value, value),
    notic = IFNULL(p_notic, notic),
    at = IFNULL(p_at, at)
  WHERE 
    id_nitro = p_nitro_id
  ;

END$$