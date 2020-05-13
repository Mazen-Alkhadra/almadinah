DELIMITER $$
CREATE PROCEDURE `prcUpdateText` (
    p_lang SMALLINT(2) UNSIGNED, 
    p_text LONGTEXT,
    p_str_id BIGINT(20) UNSIGNED
)
BEGIN
    
  IF p_lang IS NOT NULL AND p_str_id IS NOT NULL THEN   
    IF p_lang = 1 THEN -- English
      UPDATE
       strings 
      SET 
        EnStr = p_text
      WHERE 
        IdStr = p_str_id;

    ELSEIF p_lang = 2 THEN -- Arabic
      UPDATE
       strings 
      SET 
        ArStr = p_text
      WHERE 
        IdStr = p_str_id;
    END IF;
  END IF;

END$$