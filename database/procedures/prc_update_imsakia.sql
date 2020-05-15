DELIMITER $$
CREATE PROCEDURE `prcUpdateImsakia` (
  p_lang SMALLINT(2) UNSIGNED,
  p_img_url VARCHAR(500),
  p_imsakia_id BIGINT(20) UNSIGNED
)
BEGIN

  UPDATE 
    imsakia 
  SET 
    ImgId = CASE WHEN p_img_url IS NOT NULL THEN funInsertImg(p_img_url, NULL, NULL) ELSE ImgId END
  WHERE 
    IdImsakia = p_imsakia_id;
  ;

END$$