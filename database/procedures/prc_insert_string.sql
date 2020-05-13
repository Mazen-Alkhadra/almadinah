-- If string exists return IdString else insert into strings table then return IdStrinng  
DELIMITER $$
CREATE PROCEDURE `prcInsertString` (
    IN p_english_str LONGTEXT, 
    IN p_arabic_str LONGTEXT, 
    OUT out_str_id BIGINT(20) UNSIGNED
)
proc_label: BEGIN
DECLARE Id_string BIGINT(20) UNSIGNED DEFAULT NULL;

    IF p_english_str IS NULL AND p_arabic_str IS NULL THEN 
        SET out_str_id = NULL;
        SELECT NULL;
        LEAVE proc_label; 
    END IF;

    INSERT INTO strings VALUES (DEFAULT, p_english_str, p_arabic_str);
    SET out_str_id = LAST_INSERT_ID();
    SELECT out_str_id as IdStr;

END$$