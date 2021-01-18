DELIMITER $$
CREATE PROCEDURE `prcGetAllSchoolRegisters` ()
BEGIN
    SELECT 
      IdRegister id,
      FirstName firstName,			
      LastName lastName, 				
      PersonalEmail personalEmail,
      MobilePhone mobile,
      BirthDate birthDate, 			
      Gender gender, 					
      Active active,
      ZipCode zipCode,
      CountryId countryId,
      CityId cityId,
      RegisterMessage message,
      Address address,
      NationalNumber nationalNumber       
    FROM 
        school_registers
    ;
END$$