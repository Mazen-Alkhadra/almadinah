DELIMITER $$
CREATE PROCEDURE `prc_reset_user_password` (
  p_code         VARCHAR(190),
  p_new_password VARCHAR(100)
)
BEGIN

  DECLARE v_user_id BIGINT UNSIGNED DEFAULT (
    SELECT 
      user_id
    FROM 
      users_codes
    WHERE 
      code = p_code AND
      type = 'RESET_PASS' AND
      is_active = TRUE AND
      expiry_date_time > current_timestamp() 
  );

  IF v_user_id IS NULL THEN 

    CALL prc_throw_exception(404, 'InvalidUserAccountResetPasswordCode');

  ELSE
    
    UPDATE 
      users_codes 
    SET 
      is_active = FALSE 
    WHERE 
      user_id = v_user_id AND 
      type = 'RESET_PASS'
    ;
    
    UPDATE 
      users
    SET 
      password = p_new_password 
    WHERE 
      id_user = v_user_id 
    ;
    
  END IF;

END$$