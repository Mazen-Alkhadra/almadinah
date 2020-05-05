DELIMITER $$
CREATE PROCEDURE `prcDeleteUserAccount` (
    IN p_UserId BIGINT(20) UNSIGNED
)
BEGIN
    UPDATE 
        users
    SET 
        Deleted = TRUE,
        DeletedTimestamp = current_timestamp() 
    WHERE 
        IdUser = p_UserId;
END$$