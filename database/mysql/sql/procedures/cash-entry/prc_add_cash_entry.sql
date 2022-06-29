DELIMITER $$
CREATE PROCEDURE `prc_add_cash_entry` (
  p_serial_number         BIGINT UNSIGNED,
  p_income                DOUBLE,
  p_outcome               DOUBLE,
  p_notic                 LONGTEXT,
  p_at                    DATETIME,
  OUT out_new_rec_id      BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    cash_entries (
      serial_number,
      income,
      outcome,
      notic,
      at
    )
  VALUES (
    IFNULL (
      p_serial_number,
      fun_get_auto_cash_entry_serial_number()
    ),
    p_income,
    p_outcome,
    p_notic,
    p_at
  )
  ;

  SET out_new_rec_id = LAST_INSERT_ID();
  SELECT out_new_rec_id AS newRecordId;

END$$
