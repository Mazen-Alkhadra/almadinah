DELIMITER $$
CREATE FUNCTION `fun_get_img` (
    p_img_id  BIGINT UNSIGNED   
)
RETURNS LONGTEXT
BEGIN

    RETURN (
      SELECT 
        url 
      FROM 
        imgs 
      WHERE 
        id_img = p_img_id
    );
  
END$$