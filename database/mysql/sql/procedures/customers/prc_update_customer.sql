DELIMITER $$
CREATE PROCEDURE `prc_update_customer` (
  p_customer_id                   BIGINT UNSIGNED, 
  p_first_name 			              VARCHAR(50),
  p_last_name				              VARCHAR(50), 
  p_mobile                        VARCHAR(50),
  p_address                       VARCHAR(500),
  p_can_Withdraw_from_cash        BOOLEAN
)  
BEGIN

  UPDATE 
    customers 
  SET
    first_name = IFNULL(p_first_name, first_name),
    last_name = IFNULL(p_last_name, last_name),
    mobile = IFNULL(p_mobile, mobile),
    address = IFNULL(p_address, address),
    can_Withdraw_from_cash = 
      IFNULL(p_can_Withdraw_from_cash, can_Withdraw_from_cash)
  WHERE 
    id_customer = p_customer_id
  ;
    
END$$