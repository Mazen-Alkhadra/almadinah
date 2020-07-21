DELIMITER $$
CREATE PROCEDURE `prcGetAllUsers` ()
BEGIN
    SELECT 
      IdUser id,
      FirstName firstName,			
      LastName lastName, 				
      PersonalEmail personalEmail,
      MobilePhone mobile,
      BirthDate birthDate, 			
      Gender gender, 					
      Active active,
      CountryId countryId,
      CityId cityId,
      ZipCode zipCode        
    FROM 
        users
    ;
END$$