DELIMITER $$
CREATE PROCEDURE `prc_signup` (
    IN p_first_name    VARCHAR(50), 
    IN p_last_name     VARCHAR(50),    
    IN p_email         VARCHAR(100),
		IN p_mobile        VARCHAR(100),
    IN p_password      VARCHAR(100),
    IN p_birth_date    BIGINT UNSIGNED,
    IN p_gender        VARCHAR(50),
    IN p_role_id       VARCHAR(50),
    IN p_img_url       VARCHAR(500),
		IN p_is_active     BOOLEAN,
		IN p_auth_method   VARCHAR(50)
)
BEGIN

DECLARE new_user_id BIGINT UNSIGNED DEFAULT NULL;

SELECT 
	id_user
INTO 
	new_user_id 
FROM 
	users 
WHERE 
	email = p_email OR 
	mobile = p_mobile 
;

IF new_user_id IS NOT NULL THEN 
	CALL prc_throw_exception(409, 'DuplicateUser');
END IF;

INSERT INTO 
    users (
			first_name, 
			last_name,
			email,
			mobile,
			password, 
			birth_date,
			gender,
			role_id,
			img_id,
			is_active,
			auth_method
    )
VALUES (
			p_first_name,
			p_last_name,
			p_email,
			p_mobile,
			p_password,
			p_birth_date,
			p_gender,
			p_role_id,
			fun_insert_img(p_img_url, NULL),
			IFNULL(p_is_active, FALSE),
			IFNULL(p_auth_method, 'SYSTEM')
);

SET new_user_id = LAST_INSERT_ID();

SELECT new_user_id AS userId;

END$$