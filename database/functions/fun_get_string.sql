DELIMITER $$
CREATE FUNCTION `funGetString` (
    p_str_id BIGINT(20) UNSIGNED,
    p_lang SMALLINT(2) UNSIGNED
)
RETURNS LONGTEXT
BEGIN
  DECLARE result_text LONGTEXT DEFAULT (
      SELECT 
        CASE WHEN p_lang = 2 THEN ArStr ELSE EnStr END
      FROM 
        strings 
      WHERE 
        idStr = p_str_id
    );

    IF result_text IS NOT NULL THEN 
      RETURN result_text;
    ELSE 
      RETURN (
        SELECT COALESCE(EnStr, ArStr) FROM strings WHERE idStr = p_str_id
      );
    END IF;

END$$