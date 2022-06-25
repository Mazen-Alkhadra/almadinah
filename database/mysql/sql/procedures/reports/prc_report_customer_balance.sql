DELIMITER $$
CREATE PROCEDURE `prc_report_customer_balance` (
  p_customer_id          BIGINT UNSIGNED,
  p_from                 DATETIME,
  p_to                   DATETIME
)  
BEGIN
     
  SELECT 
    id_bill billId,
    b.customer_id customerId,
    b.serial_number serialNumber,
    b.notic billNotic,
    b.at,
    br.quantity,
    br.unit_price,
    br.discount,
    br.addition,
    br.notice recordNotic
  FROM 
    bills b
    INNER JOIN bills_recordes br ON br.bill_id = b.id_bill
  WHERE 
    (b.customer_id = p_customer_id OR p_customer_id IS NULL) AND 
    (p_from IS NULL OR p_from <= at) AND 
    (p_to IS NULL OR p_to >= at)
  ORDER BY 
    b.at ASC
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