DELIMITER $$
CREATE FUNCTION `fun_get_string` (
    p_lang    VARCHAR(20),
    p_str_id  BIGINT UNSIGNED   
)
RETURNS LONGTEXT
BEGIN
  
  DECLARE ret_str LONGTEXT DEFAULT (
      SELECT 
        CASE WHEN p_lang = 'ar' THEN ar ELSE en END
      FROM 
        strings 
      WHERE 
        id_str = p_str_id
  );

  IF ret_str IS NOT NULL THEN 
    RETURN ret_str;
  ELSE 
    RETURN (
      SELECT COALESCE(en, ar) FROM strings WHERE id_str = p_str_id
    );
  END IF;

END$$