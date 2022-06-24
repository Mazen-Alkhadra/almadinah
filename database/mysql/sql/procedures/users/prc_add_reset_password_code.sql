DELIMITER $$
CREATE PROCEDURE `prc_add_reset_password_code` (
    p_login_name     VARCHAR(150),
    p_code       VARCHAR(190)
)

BEGIN

    DECLARE v_user_id BIGINT UNSIGNED DEFAULT (
      SELECT 
        id_user 
      FROM 
        users 
      WHERE 
        email = p_login_name OR 
        mobile = p_login_name
    );

    IF v_user_id IS NULL THEN 
      CALL prc_throw_exception(404, 'NotExistsUser');    
    ELSE 
    
      UPDATE 
        users_codes 
      SET 
        is_active = FALSE 
      WHERE 
        user_id = v_user_id AND 
        type = 'RESET_PASS'
      ;
      
      INSERT INTO  
        users_codes (
          user_id, 
          code,
          type,
          expiry_date_time
        )
      VALUES (
        v_user_id,
        p_code,
        'RESET_PASS',
        DATE_ADD(current_timestamp(), INTERVAL 30 MINUTE)
      )
      ;

      SELECT 
        u.first_name firstName,
        u.last_name lastName,
        email,
        mobile
      FROM 
        users
      WHERE 
        id_user = v_user_id;

    END IF;
    
END$$
