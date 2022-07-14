DELIMITER $$
CREATE PROCEDURE `prc_add_withdraw` (
  p_customer_id           BIGINT UNSIGNED,
  p_serial_number         BIGINT UNSIGNED,
  p_value                 DOUBLE,
  p_notic                 LONGTEXT,
  p_at                    DATETIME,
  OUT out_withdraw_id      BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    withdraws (
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
        fun_get_auto_withdraw_serial_number()
      ),
      p_value,
      p_notic,
      p_at
  )
  ;

  SET out_withdraw_id = LAST_INSERT_ID();
  SELECT out_withdraw_id AS newRecordId;

END$$
