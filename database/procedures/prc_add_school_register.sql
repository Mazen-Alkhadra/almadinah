DELIMITER $$
CREATE PROCEDURE `prcAddSchoolRegister` (
    IN p_FirstName NVARCHAR(50), 
    IN p_LastName  NVARCHAR(50),
    IN p_PersonalEmail NVARCHAR(50),
    IN p_MobilePhone NVARCHAR(50),
    IN p_BirthDate DATETIME,
    IN p_ZipCode NVARCHAR(50),
    IN p_Gender SMALLINT(1), -- [Male, Female]
    IN p_ActivationCode varchar(100),
    IN p_country_id INT(20) UNSIGNED,
    IN p_city_id   BIGINT(20) UNSIGNED,
    IN p_register_message NVARCHAR(2000)
)
BEGIN

DECLARE new_register_id BIGINT(20) UNSIGNED;

INSERT INTO school_registers (
    FirstName, LastName, PersonalEmail, MobilePhone,
    BirthDate, ZipCode, Gender, ActivationCode, CountryId, CityId,
    RegisterMessage
)
VALUES (
    p_FirstName, p_LastName, p_PersonalEmail, p_MobilePhone,
    p_BirthDate, p_ZipCode, p_Gender, p_ActivationCode,
    p_country_id, p_city_id, p_register_message
);

SET new_register_id = LAST_INSERT_ID();

SELECT new_register_id;

END$$