--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` VALUES ('ADD','Add new'),('DELETE','Remove'),('EDIT','Change'),('READ','Read'), ('EXPORT','Export');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` VALUES ('NORMAL_USER','Normal User'),('SUPER_ADMIN','Super Admin');

--
-- Dumping data for table `roles_resources_permissions`
--

INSERT INTO `roles_resources_permissions` VALUES 
  ('SUPER_ADMIN','ADMINS_CONTROL_PANEL','READ'),
  ('SUPER_ADMIN','ACCESS_CONTROL','READ'),
  ('SUPER_ADMIN','ACCESS_CONTROL','ADD'),
  ('SUPER_ADMIN','ACCESS_CONTROL','EDIT')
;


--
-- Dumping data for table `users`
--
--  admin@12345
INSERT INTO `users` VALUES (1,'admin','admin','admin@almadinah-ph.com',NULL,'$2b$04$4xkI/yTbQ1.a4tOqL00sYevDgn1Hf6TdkNJl4au1Nn/mNSYQv1oWK',NULL,NULL,NULL,'SUPER_ADMIN', FALSE, TRUE, 'SYSTEM', current_timestamp());
