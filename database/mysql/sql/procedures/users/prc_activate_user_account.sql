DELIMITER $$
CREATE PROCEDURE `prc_activate_user_account` (
  p_code VARCHAR(190)
)
BEGIN

  DECLARE v_user_id BIGINT UNSIGNED DEFAULT (
    SELECT 
      user_id
    FROM 
      users_codes
    WHERE 
      code = p_code AND
      type = 'ACTIVATE' AND
      is_active = TRUE AND
      expiry_date_time > current_timestamp() 
  );

  IF v_user_id IS NULL THEN 

    CALL prc_throw_exception(404, 'InvalidUserAccountActivationCode');   

  ELSE
    
    UPDATE 
      users_codes 
    SET 
      is_active = FALSE 
    WHERE 
      user_id = v_user_id AND 
      type = 'ACTIVATE'
    ;
    
    UPDATE 
      users
    SET 
      is_active = TRUE 
    WHERE 
      id_user = v_user_id 
    ;
    
  END IF;

END$$