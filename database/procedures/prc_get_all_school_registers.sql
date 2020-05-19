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
      Active active          
    FROM 
        school_registers
    ;
END$$