DELIMITER $$
CREATE PROCEDURE `prcProcessForgetPaswrd` (IN p_user_email VARCHAR(100), IN p_reset_passWord_code varchar(100))
prcProcessForgetPaswrd_label:
BEGIN
    IF NOT EXISTS (SELECT IdUser FROM users WHERE PersonalEmail = p_user_email AND Deleted = FALSE) THEN 
        SELECT "Failed to to process forget the password, no account exists with this email please signup." as error;
        LEAVE prcProcessForgetPaswrd_label;
    ELSE 
    BEGIN
        IF EXISTS (SELECT IdUser FROM users WHERE ResetPasswordCode = p_reset_passWord_code) THEN 
            SELECT '1' as codeExists;
        ELSE 
        BEGIN
            UPDATE user SET ResetPasswordCode = p_reset_passWord_code WHERE PersonalEmail = p_user_email;
            SELECT FirstName, LastName, ResetPasswordCode FROM users WHERE PersonalEmail = p_user_email;
        END;
        END IF;
    END;
    END IF;
END$$
