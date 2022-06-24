DELIMITER $$
CREATE PROCEDURE `prc_add_bill_record` (
  p_bill_id                   BIGINT UNSIGNED,
  p_quantity                  DOUBLE,
  p_unit_price                DOUBLE,
  p_discount                  DOUBLE,
  p_addition                  DOUBLE,         
  p_notice                    LONGTEXT,
  OUT p_out_bill_record_id    BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    bills_recordes (
      bill_id,
      quantity,
      unit_price,
      discount,
      addition,
      notice
    )
  VALUES (
      p_bill_id,
      p_quantity,
      p_unit_price,
      p_discount,
      p_addition,
      p_notice
  )
  ;

  SET p_out_bill_record_id = LAST_INSERT_ID();

END$$