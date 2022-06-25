DELIMITER $$
CREATE PROCEDURE `prc_get_bill_details` (
  p_bill_id          BIGINT UNSIGNED
)  
BEGIN

  SELECT
    id_bill billId,
    notic,
    at,
    customer_id customerId,
    final_total finalTotal
  FROM
    bills
  WHERE 
    id_bill = p_bill_id
  ;

  SELECT
    quantity,
    unit_price unitPrice,
    discount, 
    addition,
    notice
  FROM 
    bills_recordes 
  WHERE 
    bill_id = p_bill_id
  ;

END$$
