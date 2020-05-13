DELIMITER $$
CREATE PROCEDURE `prcUpdateOrAddParagraph` (
  p_lang SMALLINT(2) UNSIGNED, 
  p_paragraph_id BIGINT(20) UNSIGNED,
  p_artice_id BIGINT(20) UNSIGNED,
  p_paragraph_title LONGTEXT,
  p_paragraph_txt LONGTEXT
)
BEGIN
  DECLARE title_str_id BIGINT(20) UNSIGNED DEFAULT
    (SELECT titleStrId FROM articles_paragraphs WHERE IdParagraph = p_paragraph_id);
  DECLARE txt_str_id BIGINT(20) UNSIGNED DEFAULT 
    (SELECT txtStrId FROM articles_paragraphs WHERE IdParagraph = p_paragraph_id);

  IF p_paragraph_title IS NOT NULL THEN 
    SET title_str_id = 
      funInsertOrUpdateText(p_lang, p_paragraph_title, title_str_id);   
  END IF;

  IF p_paragraph_txt IS NOT NULL THEN 
    SET txt_str_id = 
      funInsertOrUpdateText(p_lang, p_paragraph_txt, txt_str_id);
  END IF;

  IF p_paragraph_id IS NOT NULL THEN
    IF title_str_id IS NOT NULL AND txt_str_id IS NOT NULL THEN 
      UPDATE 
        articles_paragraphs 
      SET 
        titleStrId = title_str_id,
        txtStrId = txt_str_id
      WHERE 
        IdParagraph = p_paragraph_id;
    ELSEIF title_str_id IS NOT NULL THEN 
      UPDATE 
        articles_paragraphs 
      SET 
        titleStrId = title_str_id
      WHERE 
        IdParagraph = p_paragraph_id;
    ELSEIF txt_str_id IS NOT NULL THEN
      UPDATE 
        articles_paragraphs 
      SET 
        txtStrId = txt_str_id
      WHERE 
        IdParagraph = p_paragraph_id;
    END IF;
  ELSE 

    INSERT INTO articles_paragraphs (titleStrId, txtStrId, ArticleId) 
    VALUES (title_str_id, txt_str_id, p_artice_id);

  END IF;
    
END$$