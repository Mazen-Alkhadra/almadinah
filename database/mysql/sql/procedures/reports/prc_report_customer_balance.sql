DELIMITER $$
CREATE PROCEDURE `prc_report_customer_balance` (
  p_customer_id          BIGINT UNSIGNED,
  p_from                 DATETIME,
  p_to                   DATETIME
)  
BEGIN
     
  IF p_from IS NOT NULL THEN 
    SET p_from = DATE(p_from);
  END IF;

  IF p_to IS NOT NULL THEN 
    SET p_to = DATE_ADD(DATE(p_to), INTERVAL 1 DAY);
  END IF;

  SELECT 
    id_bill billId,
    customer_id customerId,
    serial_number serialNumber,
    notic,
    at,
    final_total value
  FROM 
    bills
  WHERE 
    (customer_id = p_customer_id OR p_customer_id IS NULL) AND 
    (p_from IS NULL OR p_from <= at) AND 
    (p_to IS NULL OR p_to >= at)
  ORDER BY 
    at ASC
  ;

  SELECT 
    id_payment paymentId,
    customer_id customerId,
    serial_number serialNumber,
    value,
    notic,
    at
  FROM 
    payments 
  WHERE 
    (customer_id = p_customer_id OR p_customer_id IS NULL) AND 
    (p_from IS NULL OR p_from <= at) AND 
    (p_to IS NULL OR p_to >= at)
  ORDER BY 
    at ASC
  ;
  

   
END$$