DELIMITER $$
CREATE DEFINER = 'scacade1_islamsk'
FUNCTION `funGetString` (
    p_str_id BIGINT(20) UNSIGNED,
    p_lang SMALLINT(2) UNSIGNED
)
RETURNS LONGTEXT
BEGIN
    RETURN (
      SELECT 
        CASE WHEN p_lang = 2 THEN ArStr ELSE EnStr END
      FROM 
        strings 
      WHERE 
        idStr = p_str_id
    );
END$$