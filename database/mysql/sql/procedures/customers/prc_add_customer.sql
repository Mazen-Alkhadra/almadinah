DELIMITER $$
CREATE PROCEDURE `prc_add_customer` (
  p_first_name 			              VARCHAR(50),
  p_last_name				              VARCHAR(50), 
  p_mobile                        VARCHAR(50),
  p_address                       VARCHAR(500),
  OUT out_customer_id             BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    customers (
      first_name,
      last_name,
      mobile,
      address
    )
  VALUES (
    p_first_name,
    p_last_name,
    p_mobile,
    p_address
  )
  ;

  SET out_customer_id = LAST_INSERT_ID();
  SELECT out_customer_id AS newRecordId;

END$$