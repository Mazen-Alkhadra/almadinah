DELIMITER $$
CREATE PROCEDURE `prcGetArticleContent` (
  p_lang SMALLINT(2) UNSIGNED,
  p_artice_id BIGINT(20) UNSIGNED 
)
BEGIN

    SELECT 
      IdParagraph id,
      funGetString(titleStrId, p_lang) title,
      funGetString(txtStrId, p_lang) txt,
      i.Url imageURL
    FROM 
      articles_paragraphs ap
      LEFT JOIN imgs i ON i.IdImg = ap.ImgId
    WHERE 
      ArticleId = p_artice_id
    ;

    SELECT 
      funGetString(txtStrId, p_lang) txt
    FROM 
      articles
    WHERE 
      IdArticle = p_artice_id
    ;
    
END$$