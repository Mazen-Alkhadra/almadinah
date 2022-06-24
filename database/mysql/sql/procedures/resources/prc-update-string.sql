DELIMITER $$
CREATE PROCEDURE `prc_update_string` (
    p_lang      VARCHAR(20), 
    p_str       LONGTEXT,
    p_str_id    BIGINT UNSIGNED
)
BEGIN
    
  IF p_lang IS NOT NULL AND p_str IS NOT NULL AND p_str_id IS NOT NULL THEN   
  
    IF p_lang = 'en' THEN
      
      UPDATE
       strings 
      SET 
        en = p_str
      WHERE 
        id_str = p_str_id;

    ELSEIF p_lang = 'ar' THEN
     
      UPDATE
       strings 
      SET 
        ar = p_str
      WHERE 
        id_str = p_str_id;

    END IF;

  END IF;

END$$