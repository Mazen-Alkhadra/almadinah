-- -----------------------------------------------------
-- Table `strings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strings` (
 `id_str`   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
 `en`       LONGTEXT NULL DEFAULT NULL,
 `ar`       LONGTEXT NULL DEFAULT NULL,
  
  PRIMARY KEY (`id_str`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table imgs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imgs` (
  `id_img`		        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `url`	              VARCHAR(500) NOT NULL,
  `size_in_bytes`     INT UNSIGNED,
  
  PRIMARY KEY (`id_img`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ===================================================================================

-- -----------------------------------------------------
-- Table `logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logs` (
  `id_log`                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `log_text`               LONGTEXT NOT NULL,
  `log_level`              VARCHAR(50) NOT NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
     
  PRIMARY KEY (`id_log`)
  
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- ===================================================================================
-- -----------------------------------------------------
-- Table roles
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
  `id_role`		    VARCHAR(50)  NOT NULL,
  `name`	        VARCHAR(500) NOT NULL,
  
  PRIMARY KEY (`id_role`)

)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table permissions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `permissions` (
  `id_permission`	VARCHAR(50)  NOT NULL,
  `name`	        VARCHAR(500) NOT NULL,
   
  PRIMARY KEY (`id_permission`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table access_resources
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access_resources` (
  `id_resource`  	VARCHAR(50)  NOT NULL,
  `name`	        VARCHAR(500) NOT NULL,

  PRIMARY KEY (`id_resource`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table roles_resources_permissions
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles_resources_permissions` (
  `role_id`  	      VARCHAR(50)  NOT NULL,
  `resource_id`  	  VARCHAR(50)  NOT NULL,
  `permission_id`  	VARCHAR(50)  NOT NULL,

  CONSTRAINT `unique_rrp` 
    UNIQUE (`role_id`, `resource_id`, `permission_id`),
  CONSTRAINT `fk_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `roles` (`id_role`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_resources`
    FOREIGN KEY (`resource_id`)
    REFERENCES `access_resources` (`id_resource`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_permissions`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permissions` (`id_permission`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` 				  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` 					  VARCHAR(50) NULL,
  `last_name`						  VARCHAR(50) NULL, 
  `email`                 VARCHAR(100) NULL UNIQUE,    
  `mobile`                VARCHAR(100) NULL UNIQUE,    
  `password` 						  VARCHAR(100) NULL,              
  `birth_date` 					  BIGINT UNSIGNED NULL DEFAULT NULL,
  `gender` 							  ENUM('Male', 'Female') NULL DEFAULT NULL,
  `img_id`                BIGINT UNSIGNED NULL DEFAULT NULL,
  `role_id`               VARCHAR(50) NULL DEFAULT NULL,
  `is_blocked`            BOOLEAN NOT NULL DEFAULT FALSE,
  `is_active`             BOOLEAN NOT NULL DEFAULT FALSE,
  `auth_method`           ENUM('SYSTEM', 'GOOGLE') DEFAULT 'SYSTEM',
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_user`),
  
  CONSTRAINT `fk_users_imgs`
    FOREIGN KEY (`img_id` )
    REFERENCES `imgs` (`id_img` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`role_id` )
    REFERENCES `roles` (`id_role` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `users_codes` -- activation codes, reset password, etc
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users_codes` (
  `id_code`     		  	  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` 				  	  BIGINT UNSIGNED NOT NULL,
  `code`          				VARCHAR(190) NOT NULL UNIQUE,
  `type`                  ENUM('ACTIVATE', 'RESET_PASS') NOT NULL,
  `is_active`             BOOLEAN NOT NULL DEFAULT TRUE,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date_time`      BIGINT UNSIGNED NULL DEFAULT NULL,


  PRIMARY KEY (`id_code`) ,
  
  CONSTRAINT `fk_user_of_code`
    FOREIGN KEY (`user_id` )
    REFERENCES `users` (`id_user` )
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table customers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id_customer`                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` 			              VARCHAR(50) NOT NULL,
  `last_name`				              VARCHAR(50) NOT NULL,
  `mobile`                        VARCHAR(50) NULL,
  `address`                       VARCHAR(500) NULL DEFAULT NULL,
  `can_withdraw_from_cash`        BOOLEAN NOT NULL DEFAULT FALSE,
  `serial_number`                 BIGINT UNSIGNED NOT NULL,
  `creat_at`                      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_customer`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table bills
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bills` (
  `id_bill`               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id`           BIGINT UNSIGNED NULL DEFAULT NULL,
  `serial_number`         BIGINT UNSIGNED NOT NULL,
  `notic`                 LONGTEXT NULL DEFAULT NULL,
  `at`                    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `final_total`           DOUBLE NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_bill`),
  
  CONSTRAINT `fk_bill_customer`
    FOREIGN KEY (`customer_id` )
    REFERENCES `customers` (`id_customer`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table bills_recordes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bills_recordes` (
  `id_bill_record`        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `bill_id`               BIGINT UNSIGNED NOT NULL,
  `quantity`              DOUBLE NOT NULL,
  `unit_price`            DOUBLE NOT NULL,
  `discount`              DOUBLE NULL DEFAULT NULL,
  `addition`              DOUBLE NULL DEFAULT NULL,
  `notice`                LONGTEXT NULL DEFAULT NULL,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_bill_record`),
  
  CONSTRAINT `fk_bill_of_record`
    FOREIGN KEY (`bill_id`)
    REFERENCES `bills` (`id_bill`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table payments
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `payments` (
  `id_payment`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id`           BIGINT UNSIGNED NULL DEFAULT NULL,
  `serial_number`         BIGINT UNSIGNED NOT NULL,
  `value`                 DOUBLE NOT NULL,
  `notic`                 LONGTEXT NULL DEFAULT NULL,
  `at`                    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_payment`),
  
  CONSTRAINT `fk_payment_customer`
    FOREIGN KEY (`customer_id` )
    REFERENCES `customers` (`id_customer`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table cash_entries
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `cash_entries` (
  `id_cash_entry`       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial_number`       BIGINT UNSIGNED NOT NULL,
  `income`              DOUBLE NULL,
  `outcome`             DOUBLE NULL,
  `notic`               LONGTEXT NULL DEFAULT NULL,
  `at`                  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creat_at`            DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_cash_entry`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table withdraws
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `withdraws` (
  `id_withdraw`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id`           BIGINT UNSIGNED NULL DEFAULT NULL,
  `serial_number`         BIGINT UNSIGNED NOT NULL,
  `value`                 DOUBLE NOT NULL,
  `notic`                 LONGTEXT NULL DEFAULT NULL,
  `at`                    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_withdraw`),
  
  CONSTRAINT `fk_withdraw_customer`
    FOREIGN KEY (`customer_id` )
    REFERENCES `customers` (`id_customer`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table nitros
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `nitros` (
  `id_nitro`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial_number`         BIGINT UNSIGNED NOT NULL,
  `value`                 DOUBLE NOT NULL,
  `notic`                 LONGTEXT NULL DEFAULT NULL,
  `at`                    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creat_at`              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id_nitro`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
