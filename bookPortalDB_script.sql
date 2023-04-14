CREATE DATABASE  IF NOT EXISTS `bookportal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bookportal`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookportal
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `operation_type` varchar(255) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_or6k6jmywerxbme223c988bmg` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,_binary '','2022-08-04 16:32:45.028000','UPDATE','2022-08-19 16:28:24.384000','ekin'),(2,_binary '','2022-08-04 16:35:11.131000','SAVE','2022-08-04 16:35:11.131000','George Orwell'),(3,_binary '','2022-08-09 10:34:35.900000','UPDATE','2022-08-09 15:10:15.858000','Fyodor Dostoyevski'),(7,_binary '','2022-08-09 13:46:30.693000','SAVE','2022-08-09 13:46:30.693000','dede'),(19,_binary '','2022-08-09 14:26:31.911000','SAVE','2022-08-09 14:26:31.911000','dene'),(20,_binary '','2022-08-09 15:07:12.982000','SAVE','2022-08-09 15:07:12.982000','Lev Tolstoy'),(22,_binary '','2022-08-15 17:11:20.825000','SAVE','2022-08-15 17:11:20.825000','Sabahattin Ali'),(23,_binary '','2022-08-15 17:15:31.101000','SAVE','2022-08-15 17:15:31.101000','Ahmet Umit'),(29,_binary '','2022-08-18 17:24:28.120000','SAVE','2022-08-18 17:24:28.120000','dere'),(30,_binary '','2022-08-19 17:21:20.595000','SAVE','2022-08-19 17:21:20.595000','George Orwellk'),(31,_binary '','2022-08-19 17:28:12.334000','SAVE','2022-08-19 17:28:12.334000','George Orwellt');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author_books`
--

DROP TABLE IF EXISTS `author_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_books` (
  `author_id` bigint NOT NULL,
  `books_id` bigint NOT NULL,
  PRIMARY KEY (`author_id`,`books_id`),
  UNIQUE KEY `UK_fxksjqa1a5dnqf0egcdxlrcna` (`books_id`),
  CONSTRAINT `FKfvabqdr9njwv4khjqkf1pbmma` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`),
  CONSTRAINT `FKr514ej8rhei197wx3nrvp0qie` FOREIGN KEY (`books_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author_books`
--

LOCK TABLES `author_books` WRITE;
/*!40000 ALTER TABLE `author_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `author_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `operation_type` varchar(255) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `aut_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_g0286ag1dlt4473st1ugemd0m` (`title`),
  KEY `FKgfyed6p3pxdugerisn4otot3j` (`aut_id`),
  CONSTRAINT `FKgfyed6p3pxdugerisn4otot3j` FOREIGN KEY (`aut_id`) REFERENCES `author` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,_binary '','2022-08-04 16:41:14.711000','UPDATE','2022-08-26 14:18:24.325000','Hayvan Ciftligi','Distopik Kurgu',2),(5,_binary '','2022-08-09 10:34:35.963000','UPDATE','2022-08-09 15:09:27.220000','Suc ve Ceza','Psikolojik Kurgu',3),(8,_binary '','2022-08-09 15:07:13.005000','UPDATE','2022-08-15 15:43:37.267000','Insan Ne Ile Yasar?','Kurgu',20),(9,_binary '','2022-08-09 15:17:54.268000','SAVE','2022-08-09 15:17:54.268000','Anna Karenina','Roman',20),(14,_binary '','2022-08-15 17:11:20.890000','SAVE','2022-08-15 17:11:20.890000','Kuyucakli Yusuf','Roman',22);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `operation_type` varchar(255) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_8sewwnpamngi6b1dwaa88askk` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,_binary '','2022-08-04 16:24:39.328000','SAVE','2022-08-04 16:24:39.328000','ROLE_USER'),(2,_binary '','2022-08-04 16:24:39.361000','SAVE','2022-08-04 16:24:39.361000','ROLE_ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_account`
--

DROP TABLE IF EXISTS `users_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `operation_type` varchar(255) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_c7ttsekbjswy3dv0kim87o3pr` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_account`
--

LOCK TABLES `users_account` WRITE;
/*!40000 ALTER TABLE `users_account` DISABLE KEYS */;
INSERT INTO `users_account` VALUES (1,_binary '','2022-08-04 16:45:41.157000','UPDATE','2022-08-19 16:53:16.447000','$2a$10$a/fdWJJRleoThqdT0Whx.O/q.yBE2zx6utyjGFn2tD2urObtuhLlO','ekin'),(2,_binary '','2022-08-04 16:50:28.105000','UPDATE','2022-08-18 11:35:47.155000','$2a$10$bQGtL.95kJyG9H9f3KaSGO.VXk6O7vl7ERGuPyZ7KMzLJTCw7qcSu','deneme'),(7,_binary '','2022-08-15 15:57:37.226000','UPDATE','2022-08-18 11:37:07.956000','$2a$10$2melKD7hxnthp22A9TXvp.temQgp28/7annG4e3J2kp1sguwP/Es6','abc'),(14,_binary '','2022-08-15 16:33:29.298000','UPDATE','2022-08-18 11:37:08.798000','$2a$10$5AJkGXiMYC6YpXkYPF0rc.nt5qfut7iT/TIDoBRDps7rfxvUUh2pe','abcdef'),(15,_binary '','2022-08-17 11:42:51.313000','SAVE','2022-08-17 11:42:51.313000','$2a$10$pLa4A1TEv3eR8w5EwhM5VOasH5uqky8u9Sc5JfVoDkE3iJOBbyaGG','asga'),(16,_binary '','2022-08-17 11:43:27.602000','SAVE','2022-08-17 11:43:27.602000','$2a$10$bCuDUpcBKeCXoS4ffPTTI..U3OPMa3.d0lq6PQrpRD8UyYK/oEBTi','dene'),(17,_binary '','2022-08-17 11:45:03.957000','SAVE','2022-08-17 11:45:03.957000','$2a$10$9XOtzG1JqLSb4jnqGFLoQewBh4F4vREFoGLUQFT880/F289YC/hK.','haha'),(23,_binary '','2022-08-18 14:47:20.234000','SAVE','2022-08-18 14:47:20.234000','$2a$10$SL/DxKO5BwIlhmBaBndG6eHC6.133C7sIFIAid0d.FvStqeav31o6','ekino'),(24,_binary '','2022-08-18 14:48:07.274000','SAVE','2022-08-18 14:48:07.274000','$2a$10$crTZplYoIsqIjecu.q6Zk.m6ybS6/oibR9owOT96bQEKCj0WULK32','ekinovv'),(25,_binary '','2022-08-23 08:59:08.143000','SAVE','2022-08-23 08:59:08.143000','$2a$10$w5XZ4ximGh3jodQdP3tC0u04ppQA0sEmXD4MTlDbGIEBK81CIg3u2','deneme2'),(26,_binary '','2022-08-23 09:01:46.099000','SAVE','2022-08-23 09:01:46.099000','$2a$10$L9liHnihU1Ay395Z3PsoG.aE2fsUelaipjfMdTpFt5b.hUeixPO7y','deneme3'),(27,_binary '','2022-08-24 16:08:09.171000','SAVE','2022-08-24 16:08:09.171000','$2a$10$Vt23YlrimWdpxSte0K9zP./5qumqEdoR7Cv4mC7IXrLsO1.QViffm','agaga'),(28,_binary '','2022-08-25 08:52:54.181000','SAVE','2022-08-25 08:52:54.181000','$2a$10$hU7aUYzGg78X6PT.i6.cRu/ty4pk1RRsGJ11BBdniFHcHzQc.FEgq','deneme35'),(29,_binary '','2022-08-25 08:55:50.283000','SAVE','2022-08-25 08:55:50.283000','$2a$10$xuDF3vWANkQKLVQuO1TEaOdmNPDysM5EaS/YXeUnfFLeOAx5MXG8u','deneme34');
/*!40000 ALTER TABLE `users_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_fav`
--

DROP TABLE IF EXISTS `users_fav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_fav` (
  `user_id` bigint NOT NULL,
  `book_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`book_id`),
  KEY `FK6wrge4qsm7bmi0bmxykwlnfg6` (`book_id`),
  CONSTRAINT `FK6wrge4qsm7bmi0bmxykwlnfg6` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FKf6crnushj1kttfuy9o2n1fkg1` FOREIGN KEY (`user_id`) REFERENCES `users_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_fav`
--

LOCK TABLES `users_fav` WRITE;
/*!40000 ALTER TABLE `users_fav` DISABLE KEYS */;
INSERT INTO `users_fav` VALUES (1,1),(2,1),(1,8),(2,8),(1,14);
/*!40000 ALTER TABLE `users_fav` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_read`
--

DROP TABLE IF EXISTS `users_read`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_read` (
  `user_id` bigint NOT NULL,
  `book_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`book_id`),
  KEY `FK18ttj74ds32empu4gelvg4obs` (`book_id`),
  CONSTRAINT `FK18ttj74ds32empu4gelvg4obs` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `FKfbi910d4e2dfi5w6292upl5jw` FOREIGN KEY (`user_id`) REFERENCES `users_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_read`
--

LOCK TABLES `users_read` WRITE;
/*!40000 ALTER TABLE `users_read` DISABLE KEYS */;
INSERT INTO `users_read` VALUES (1,1),(2,1),(1,8),(2,8);
/*!40000 ALTER TABLE `users_read` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKt4v0rrweyk393bdgt107vdx0x` (`role_id`),
  CONSTRAINT `FKlk0nf2qimw4psu91kinli1ohe` FOREIGN KEY (`user_id`) REFERENCES `users_account` (`id`),
  CONSTRAINT `FKt4v0rrweyk393bdgt107vdx0x` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (2,1),(7,1),(14,1),(15,1),(16,1),(17,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(1,2);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bookportal'
--

--
-- Dumping routines for database 'bookportal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-14 17:53:20
