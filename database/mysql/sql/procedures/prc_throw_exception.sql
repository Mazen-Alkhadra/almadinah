DELIMITER $$
CREATE PROCEDURE `prc_throw_exception` (
  p_err_code      VARCHAR(50),
  p_err_msg       LONGTEXT
)  
BEGIN

  DECLARE v_err_code VARCHAR(50) DEFAULT '1644';
  DECLARE v_err_msg  VARCHAR(50) DEFAULT 'Mysql Unknown Exception';

  ROLLBACK;
    
  SET v_err_code = IFNULL(p_err_code, v_err_code);
  SET v_err_msg = IFNULL(p_err_msg, v_err_msg);

  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_err_msg, MYSQL_ERRNO = v_err_code;

  
END$$