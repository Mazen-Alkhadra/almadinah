DELIMITER $$
CREATE PROCEDURE `prc_add_bill` (
  p_customer_id           BIGINT UNSIGNED,
  p_serial_number         BIGINT UNSIGNED,
  p_notic                 LONGTEXT,
  p_at                    DATETIME,
  p_final_total           DOUBLE,
  OUT out_bill_id         BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    bills (
      customer_id,
      serial_number,
      notic,
      at,
      final_total
    )
  VALUES (
      p_customer_id,
      IFNULL (
        p_serial_number,
        fun_get_auto_bill_serial_number()
      ),
      p_notic,
      p_at,
      p_final_total
  )
  ;

  SET out_bill_id = LAST_INSERT_ID();
  SELECT out_bill_id AS newRecordId;

END$$
