DELIMITER $$
CREATE PROCEDURE `prc_get_all_surah_reads` (
  p_lang        SMALLINT UNSIGNED,
  p_surah_id    BIGINT UNSIGNED
)  
BEGIN

  SELECT 
    DISTINCT id_quran_read idQuranRead,
    funGetString(name_str_id, p_lang) name,
    funGetString(description_str_id, p_lang) description,
    file_url fileUrl,
    surah_page_number surahPageNumnber
  FROM 
    surah_reads_files srf
    INNER JOIN quran_reads qr ON qr.id_quran_read = srf.quran_read_id
  WHERE 
    surah_id = p_surah_id
  ;

END$$