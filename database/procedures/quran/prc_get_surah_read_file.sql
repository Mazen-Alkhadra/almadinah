DELIMITER $$
CREATE PROCEDURE `prc_get_surah_read_file` (
  p_surah_id       BIGINT UNSIGNED,
  p_quran_read_id  BIGINT UNSIGNED
)  
BEGIN
  SELECT 
    surah_page_number surahPageNumber,
    file_url fileUrl
  FROM 
    surah_reads_files
  WHERE 
    surah_id = p_surah_id AND 
    quran_read_id = p_quran_read_id
  ;

END$$