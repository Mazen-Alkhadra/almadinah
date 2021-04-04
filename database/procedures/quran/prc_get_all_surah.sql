DELIMITER $$
CREATE PROCEDURE `prc_get_all_surah` (
  p_lang SMALLINT UNSIGNED
)  
BEGIN
  SELECT 
    DISTINCT id_surah id,
    funGetString(name_str_id, p_lang) name,
    funGetString(description_str_id, p_lang) description,
    number    
  FROM 
    surah_reads_files srf
    INNER JOIN surah s ON s.id_surah = srf.surah_id
  ;
END$$