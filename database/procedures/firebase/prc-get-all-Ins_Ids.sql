DELIMITER $$
CREATE PROCEDURE `prcGetAllInsIds` ()
BEGIN
  
  SELECT 
    DISTINCT InstanceId
  FROM (
    
    SELECT 
        InstanceId
    FROM 
        firebase_users

    UNION 

    SELECT 
        InstanceId
    FROM 
        firebase_guest_users
  ) as InsIds
;
END$$