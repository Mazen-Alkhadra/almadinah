DELIMITER $$
CREATE PROCEDURE `prc_add_surah` (
  p_lang           SMALLINT UNSIGNED,
  p_name           LONGTEXT,
  p_description    LONGTEXT,
  p_number         BIGINT UNSIGNED,
  OUT out_surah_id BIGINT UNSIGNED
)  
BEGIN

  DECLARE name_str_id BIGINT UNSIGNED DEFAULT NULL;
  DECLARE desc_str_id BIGINT UNSIGNED DEFAULT NULL;

  IF p_name IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_name, name_str_id);
  END IF;

  IF p_description IS NOT NULL THEN 
    CALL prcInsertText(p_lang, p_description, desc_str_id);
  END IF;

  INSERT INTO surah (
    name_str_id,
    description_str_id,
    number
  ) VALUES (
    name_str_id,
    desc_str_id,
    p_number
  );
  
  SET out_surah_id = LAST_INSERT_ID();
  SELECT out_surah_id as idSurah;

END$$