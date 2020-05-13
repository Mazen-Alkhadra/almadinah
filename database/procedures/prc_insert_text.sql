DELIMITER $$
CREATE PROCEDURE `prcInsertText` (
    p_lang SMALLINT(2) UNSIGNED, 
    p_text LONGTEXT,
    OUT out_str_id BIGINT(20) UNSIGNED
)
BEGIN

  SET out_str_id = NULL;
  
  IF p_lang IS NOT NULL THEN   
    IF p_lang = 1 THEN -- English
      CALL prcInsertString(p_text, NULL, out_str_id);
    ELSEIF p_lang = 2 THEN -- Arabic
      CALL prcInsertString(NULL, p_text, out_str_id);
    END IF;
  END IF;

END$$