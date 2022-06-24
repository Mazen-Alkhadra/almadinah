DELIMITER $$
CREATE PROCEDURE `prc_update_payment` (
  p_payment_id               BIGINT UNSIGNED,
  p_customer_id              BIGINT UNSIGNED,
  p_serial_number            BIGINT UNSIGNED,
  p_value                    DOUBLE,
  p_notic                    LONGTEXT,
  p_at                       DATETIME
)  
BEGIN

  IF p_serial_number IS NOT NULL AND 
    fun_is_payment_serial_number_exists (p_serial_number) THEN 
        CALL prc_throw_exception(NULL, 'DuplicateSerialNumber');
  END IF;


  UPDATE  
    payments 
  SET 
    customer_id = IFNULL(p_customer_id, customer_id),
    serial_number = IFNULL(p_serial_number, serial_number),
    value = IFNULL(p_value, value),
    notic = IFNULL(p_notic, notic),
    at = IFNULL(p_at, at),
  WHERE 
    id_payment = p_payment_id
  ;

END$$