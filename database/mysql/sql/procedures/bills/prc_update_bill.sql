DELIMITER $$
CREATE PROCEDURE `prc_update_bill` (
  p_bill_id               BIGINT UNSIGNED,
  p_customer_id           BIGINT UNSIGNED,
  p_serial_number         BIGINT UNSIGNED,
  p_notic                 LONGTEXT,
  p_at                    DATETIME,
  p_final_total           DOUBLE
)  
BEGIN

  IF p_serial_number IS NOT NULL AND 
    fun_is_bill_serial_number_exists (p_serial_number) THEN 
        CALL prc_throw_exception(NULL, 'DuplicateSerialNumber');
  END IF;


  UPDATE  
    bills 
  SET 
    customer_id = IFNULL(p_customer_id, customer_id),
    serial_number = IFNULL(p_serial_number, serial_number),
    notic = IFNULL(p_notic, notic),
    at = IFNULL(p_at, at),
    final_total = IFNULL(p_final_total, final_total)
  WHERE 
    id_bill = p_bill_id
  ;

END$$