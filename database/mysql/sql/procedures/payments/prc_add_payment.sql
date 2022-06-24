DELIMITER $$
CREATE PROCEDURE `prc_add_payment` (
  p_customer_id           BIGINT UNSIGNED,
  p_serial_number         BIGINT UNSIGNED,
  p_value                 DOUBLE,
  p_notic                 LONGTEXT,
  p_at                    DATETIME,
  OUT out_payment_id      BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    payments (
      customer_id,
      serial_number,
      value,
      notic,
      at
    )
  VALUES (
      p_customer_id,
      IFNULL (
        p_serial_number,
        fun_get_auto_payment_serial_number()
      ),
      p_value,
      p_notic,
      p_at
  )
  ;

  SET out_bill_id = LAST_INSERT_ID();
  SELECT out_bill_id AS newRecordId;

END$$
