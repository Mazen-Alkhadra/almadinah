DELIMITER $$
CREATE FUNCTION `funInsertOrUpdateText` (
    p_lang SMALLINT(2) UNSIGNED, 
    p_text LONGTEXT,
    p_str_id BIGINT(20) UNSIGNED
)
RETURNS BIGINT(20) UNSIGNED
BEGIN
  DECLARE str_id BIGINT(20) UNSIGNED DEFAULT p_str_id;

  IF str_id IS NULL THEN 
    CALL prcInsertText(p_lang, p_text, str_id);
  ELSE 
    CALL prcUpdateText(p_lang, p_text, str_id);
  END IF;

    RETURN str_id;
END$$