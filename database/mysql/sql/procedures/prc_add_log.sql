DELIMITER $$
CREATE PROCEDURE `prc_add_log` (
  p_log_text LONGTEXT,
  p_log_level VARCHAR(50)
)  
BEGIN

  INSERT INTO 
    logs (
      log_text, 
      log_level
    )
  VALUES (
      p_log_text,
      p_log_level
  )
  ;

  
END$$