DELIMITER $$
CREATE PROCEDURE `prc_add_customer` (
  p_first_name 			              VARCHAR(50),
  p_last_name				              VARCHAR(50), 
  p_mobile                        VARCHAR(50),
  p_address                       VARCHAR(500),
  p_can_Withdraw_from_cash        BOOLEAN,
  p_serial_number                 BIGINT UNSIGNED,
  OUT out_customer_id             BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    customers (
      first_name,
      last_name,
      mobile,
      address,
      can_Withdraw_from_cash,
      serial_number
    )
  VALUES (
    p_first_name,
    p_last_name,
    p_mobile,
    p_address,
    IFNULL(p_can_Withdraw_from_cash, DEFAULT(can_Withdraw_from_cash)),
    IFNULL(p_serial_number, fun_get_auto_customer_serial_number())
  )
  ;

  SET out_customer_id = LAST_INSERT_ID();
  SELECT out_customer_id AS newRecordId;

END$$