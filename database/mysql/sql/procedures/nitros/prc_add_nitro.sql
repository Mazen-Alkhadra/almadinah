DELIMITER $$
CREATE PROCEDURE `prc_add_nitro` (
  p_serial_number         BIGINT UNSIGNED,
  p_value                 DOUBLE,
  p_notic                 LONGTEXT,
  p_at                    DATETIME,
  OUT out_nitro_id       BIGINT UNSIGNED
)  
BEGIN

  INSERT INTO 
    nitros (
      serial_number,
      value,
      notic,
      at
    )
  VALUES (
      IFNULL (
        p_serial_number,
        fun_get_auto_nitro_serial_number()
      ),
      p_value,
      p_notic,
      p_at
  )
  ;

  SET out_nitro_id = LAST_INSERT_ID();
  SELECT out_nitro_id AS newRecordId;

END$$
