DELIMITER $$
CREATE FUNCTION `fun_add_string` (
    p_lang  VARCHAR(20),
    p_str   LONGTEXT
)
RETURNS BIGINT UNSIGNED
BEGIN
  
  IF p_lang IS NULL OR p_str IS NULL THEN 
    RETURN NULL;
  END IF;
  
  INSERT INTO 
    strings (
      en, 
      ar
    )
  VALUES (
    CASE WHEN p_lang = 'en' THEN p_str ELSE NULL END,
    CASE WHEN p_lang = 'ar' THEN p_str ELSE NULL END
  );

  RETURN LAST_INSERT_ID();
  
END$$