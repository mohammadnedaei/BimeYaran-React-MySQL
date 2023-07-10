-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bime_yaran
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `branch_id` int NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `branch_address` varchar(255) DEFAULT NULL,
  `branch_phone` varchar(255) DEFAULT NULL,
  `branch_type` varchar(255) NOT NULL,
  PRIMARY KEY (`branch_id`),
  UNIQUE KEY `branches_pk2` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` (`branch_id`, `branch_name`, `branch_address`, `branch_phone`, `branch_type`) VALUES (1,'سما','خیابان بهشتی - بالاتر از پارک دولت','+۲۱-۲۵۶۵۶۵۶','sales'),(2,'آزادگان','خیابان مدنی - جنب مجتمع تجاری البرز','+۲۶-۵۳۵۳۵۳۵','damage'),(3,'نیرو هوایی','خیابان روستا - نبش کوچه ی سیزدهم','+۲۶-۴۵۴۵۴۵۴','sales'),(4,'جمهوری','میدان جمهوری - جنب بانک ملی','+۲۱-۴۳۴۳۲۲۱','sales,damage');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `car_insurance_type` varchar(50) NOT NULL,
  `car_insurance_price` int NOT NULL,
  `car_date_start` date NOT NULL,
  `car_date_expire` date NOT NULL,
  `car_number` varchar(50) NOT NULL,
  `branch_id` int NOT NULL,
  `car_type` varchar(20) NOT NULL,
  `car_value` int NOT NULL,
  PRIMARY KEY (`car_id`),
  KEY `car_branches_branch_id_fk` (`branch_id`),
  KEY `car_client_client_id_fk` (`client_id`),
  CONSTRAINT `car_branches_branch_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `car_client_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `car_users`
--

DROP TABLE IF EXISTS `car_users`;
/*!50001 DROP VIEW IF EXISTS `car_users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `car_users` AS SELECT 
 1 AS `car_id`,
 1 AS `client_id`,
 1 AS `car_insurance_type`,
 1 AS `car_date_expire`,
 1 AS `branch_id`,
 1 AS `car_type`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `client_name` varchar(50) NOT NULL,
  `client_fname` varchar(50) NOT NULL,
  `client_address` varchar(250) NOT NULL,
  `client_phone` varchar(255) NOT NULL,
  `client_birthday` date DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  KEY `client_users_user_id_fk` (`user_id`),
  CONSTRAINT `client_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `client_id` int NOT NULL,
  `contract_id` int NOT NULL AUTO_INCREMENT,
  `branch_id` int NOT NULL,
  `transaction_id` int DEFAULT NULL,
  `insurance_id` int NOT NULL,
  `contract_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`client_id`,`insurance_id`),
  UNIQUE KEY `contract_pk` (`contract_id`),
  KEY `contract_branches_branch_id_fk` (`branch_id`),
  KEY `contract_insurance_insurance_id_fk` (`insurance_id`),
  KEY `contract_transaction_transaction_id_fk` (`transaction_id`),
  CONSTRAINT `contract_branches_branch_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `contract_client_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `contract_insurance_insurance_id_fk` FOREIGN KEY (`insurance_id`) REFERENCES `insurance` (`insurance_id`),
  CONSTRAINT `contract_transaction_transaction_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(50) DEFAULT NULL,
  `employee_num` int NOT NULL,
  `employee_salary` int NOT NULL,
  `employee_branch` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`employee_id`,`user_id`),
  UNIQUE KEY `Nnum` (`employee_num`),
  UNIQUE KEY `employee_pk` (`user_id`),
  KEY `Branch` (`employee_branch`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_branch`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `user_id to user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fire`
--

DROP TABLE IF EXISTS `fire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fire` (
  `fire_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `fire_price` int DEFAULT NULL,
  `fire_date_start` date NOT NULL,
  `fire_date_expire` date NOT NULL,
  `fire_house_area` int NOT NULL,
  `branch_id` int NOT NULL,
  PRIMARY KEY (`fire_id`),
  KEY `fire_branches_branch_id_fk` (`branch_id`),
  KEY `fire_client_client_id_fk` (`client_id`),
  CONSTRAINT `fire_branches_branch_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `fire_client_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fire`
--

LOCK TABLES `fire` WRITE;
/*!40000 ALTER TABLE `fire` DISABLE KEYS */;
/*!40000 ALTER TABLE `fire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `fire_users`
--

DROP TABLE IF EXISTS `fire_users`;
/*!50001 DROP VIEW IF EXISTS `fire_users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `fire_users` AS SELECT 
 1 AS `fire_id`,
 1 AS `client_id`,
 1 AS `fire_date_expire`,
 1 AS `branch_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `health`
--

DROP TABLE IF EXISTS `health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health` (
  `health_id` int NOT NULL AUTO_INCREMENT,
  `branch_id` int NOT NULL,
  `client_id` int NOT NULL,
  `health_price` int DEFAULT NULL,
  `health_date_start` date NOT NULL,
  `health_date_expire` date NOT NULL,
  `health_age` int NOT NULL,
  PRIMARY KEY (`health_id`),
  KEY `health_branches_branch_id_fk` (`branch_id`),
  KEY `health_client_client_id_fk` (`client_id`),
  CONSTRAINT `health_branches_branch_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `health_client_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health`
--

LOCK TABLES `health` WRITE;
/*!40000 ALTER TABLE `health` DISABLE KEYS */;
/*!40000 ALTER TABLE `health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `health_users`
--

DROP TABLE IF EXISTS `health_users`;
/*!50001 DROP VIEW IF EXISTS `health_users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `health_users` AS SELECT 
 1 AS `health_id`,
 1 AS `branch_id`,
 1 AS `client_id`,
 1 AS `health_date_expire`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `insurance`
--

DROP TABLE IF EXISTS `insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance` (
  `insurance_id` int NOT NULL AUTO_INCREMENT,
  `insurance_name` varchar(50) NOT NULL,
  PRIMARY KEY (`insurance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance`
--

LOCK TABLES `insurance` WRITE;
/*!40000 ALTER TABLE `insurance` DISABLE KEYS */;
INSERT INTO `insurance` (`insurance_id`, `insurance_name`) VALUES (1,'بیمه اتوموبیل'),(2,'بیمه آتش'),(3,'بیمه عمر');
/*!40000 ALTER TABLE `insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repay`
--

DROP TABLE IF EXISTS `repay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repay` (
  `repay_id` int NOT NULL AUTO_INCREMENT,
  `contract_id` int NOT NULL,
  `client_id` int NOT NULL,
  `repay_status` varchar(255) NOT NULL,
  PRIMARY KEY (`repay_id`),
  UNIQUE KEY `repay_pk` (`contract_id`),
  KEY `repay_client_client_id_fk` (`client_id`),
  CONSTRAINT `repay_client_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `repay_contract_contract_id_fk` FOREIGN KEY (`contract_id`) REFERENCES `contract` (`contract_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repay`
--

LOCK TABLES `repay` WRITE;
/*!40000 ALTER TABLE `repay` DISABLE KEYS */;
/*!40000 ALTER TABLE `repay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `branch_id` int NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_amount` int NOT NULL,
  `transaction_description` varchar(100) DEFAULT NULL,
  `insurance_id` int NOT NULL,
  `transaction_type` varchar(10) NOT NULL,
  PRIMARY KEY (`transaction_id`,`insurance_id`),
  KEY `UserID` (`user_id`),
  KEY `Branch` (`branch_id`),
  KEY `insurance__i_fk` (`insurance_id`),
  CONSTRAINT `insurance__i_fk` FOREIGN KEY (`insurance_id`) REFERENCES `insurance` (`insurance_id`),
  CONSTRAINT `transaction_branches_branch_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  CONSTRAINT `transaction_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `complete_health` AFTER INSERT ON `transaction` FOR EACH ROW BEGIN
      UPDATE health
      SET health_price = health_age * 22500
      WHERE health_price IS NULL;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `complete_fire` AFTER INSERT ON `transaction` FOR EACH ROW BEGIN
      UPDATE fire
      SET fire_price = fire.fire_house_area * 15000
      WHERE fire_price IS NULL;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_chk_1` CHECK (((`user_type` = _utf8mb4'user') or (`user_type` = _utf8mb4'admin') or (`user_type` = _utf8mb4'manager') or (`user_type` = _utf8mb4'owner')))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `email`, `password`, `user_type`) VALUES (1,'owner@gmail.com','656454','owner'),(2,'admin@gmail.com','454656','admin'),(3,'user@gmail.com','656454','user'),(4,'user1@gmail.com','656454','admin'),(5,'user2@gmail.com','656454','user'),(6,'manager@gmail.com','656454','manager'),(7,'user5@gmail.com','656454','user'),(8,'test@gmail.com','12345','user'),(9,'us2er@gmail.com','656454','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `car_users`
--

/*!50001 DROP VIEW IF EXISTS `car_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `car_users` AS select `car`.`car_id` AS `car_id`,`car`.`client_id` AS `client_id`,`car`.`car_insurance_type` AS `car_insurance_type`,`car`.`car_date_expire` AS `car_date_expire`,`car`.`branch_id` AS `branch_id`,`car`.`car_type` AS `car_type` from `car` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `fire_users`
--

/*!50001 DROP VIEW IF EXISTS `fire_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `fire_users` AS select `fire`.`fire_id` AS `fire_id`,`fire`.`client_id` AS `client_id`,`fire`.`fire_date_expire` AS `fire_date_expire`,`fire`.`branch_id` AS `branch_id` from `fire` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `health_users`
--

/*!50001 DROP VIEW IF EXISTS `health_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `health_users` AS select `health`.`health_id` AS `health_id`,`health`.`branch_id` AS `branch_id`,`health`.`client_id` AS `client_id`,`health`.`health_date_expire` AS `health_date_expire` from `health` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-10 15:23:06
