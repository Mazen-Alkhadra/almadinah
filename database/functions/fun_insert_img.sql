DELIMITER $$
CREATE FUNCTION `funInsertImg` (
  p_url             VARCHAR(500),
  p_img             mediumblob,
  p_size_in_bytes   INT(10) UNSIGNED
)
RETURNS BIGINT(20) UNSIGNED
BEGIN
    DECLARE id_img BIGINT(20) UNSIGNED DEFAULT NULL;
    SET id_img = (SELECT IdImg from imgs WHERE Url = p_url);

    IF id_img IS NULL THEN 
      INSERT INTO imgs (Url, Img, SizeInBytes) 
      VALUES (p_url, p_img, p_size_in_bytes);
      SET id_img = LAST_INSERT_ID();
    END IF;

    RETURN id_img;
END$$