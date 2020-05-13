DELIMITER $$
CREATE PROCEDURE `prcGetAllArticles` (
  p_lang SMALLINT(2) UNSIGNED
)
BEGIN
    
    SELECT 
        IdArticle id,
        funGetString(titleStrId, p_lang) title,
        imgs.URL imgURL,
        Category articleCategory
    FROM 
        articles_categories ac
        INNER JOIN articles a ON a.IdArticle = ac.ArticleId
        LEFT JOIN imgs ON a.ImgId = imgs.IdImg
    GROUP BY IdArticle;

END$$