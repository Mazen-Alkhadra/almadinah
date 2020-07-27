DELIMITER $$
CREATE FUNCTION `funGetStringId` (
    p_lang SMALLINT(2) UNSIGNED,
    p_str   LONGTEXT
)
RETURNS BIGINT(20) UNSIGNED
BEGIN

  DECLARE str_id BIGINT(20) UNSIGNED DEFAULT (
      SELECT 
        IdStr
      FROM 
        strings 
      WHERE 
        (p_lang = 2 AND ArStr = p_str) OR
        (p_lang = 1 AND EnStr = p_str)
      LIMIT 1
    );

  RETURN str_id;
 
END$$