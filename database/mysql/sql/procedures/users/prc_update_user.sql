DELIMITER $$
CREATE PROCEDURE `prc_update_user` (
    p_user_id       BIGINT UNSIGNED,
    p_first_name    VARCHAR(50), 
    p_last_name     VARCHAR(50),    
    p_email         VARCHAR(100),
		p_mobile        VARCHAR(100),
    p_password      VARCHAR(100),
    p_birth_date    BIGINT UNSIGNED,
    p_gender        VARCHAR(50),
    p_role_id       VARCHAR(50),
    p_img_url       VARCHAR(500),
		p_is_active     BOOLEAN
)
BEGIN

  UPDATE
    users 
  SET 
		first_name = IFNULL(p_first_name, first_name), 
		last_name = IFNULL(p_last_name, last_name),
		email = IFNULL(p_email, email),
		mobile = IFNULL(p_mobile, mobile),
		password = IFNULL(p_password, password), 
		birth_date = IFNULL(p_birth_date, birth_date),
		gender = IFNULL(p_gender, gender),
		role_id = IFNULL(p_role_id, role_id),
		img_id = IFNULL(p_img_id, fun_insert_img(p_img_url, NULL)),
		is_active = IFNULL(p_is_active, is_active)
  WHERE 
    id_user = p_user_id
  ;

END$$