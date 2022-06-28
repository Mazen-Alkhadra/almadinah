DELIMITER $$
CREATE PROCEDURE `prc_report_customer_balance` (
  p_customer_id          BIGINT UNSIGNED,
  p_from                 DATETIME,
  p_to                   DATETIME
)  
BEGIN
     
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
    (p_from IS NULL OR p_from <= DATE(at)) AND 
    (p_to IS NULL OR p_to >= DATE(at))
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
    (p_from IS NULL OR p_from <= DATE(at)) AND 
    (p_to IS NULL OR p_to >= DATE(at))
  ORDER BY 
    at ASC
  ;
  

   
END$$