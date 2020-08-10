-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2020 at 12:00 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lineapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `friend_demo_graphics`
--

CREATE TABLE `friend_demo_graphics` (
  `id` int(11) NOT NULL,
  `data_json` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `friend_demo_graphics`
--

INSERT INTO `friend_demo_graphics` (`id`, `data_json`, `created_at`) VALUES
(1, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:04:10'),
(2, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:05:10'),
(3, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:16:10'),
(4, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:17:10'),
(5, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:18:10'),
(6, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:23:10'),
(7, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:25:10'),
(8, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:33:10'),
(9, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:34:10'),
(10, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:35:10'),
(11, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:36:10'),
(12, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:45:10'),
(13, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:47:10'),
(14, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:48:10'),
(15, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:49:10'),
(16, '{\"available\":false,\"genders\":[],\"ages\":[],\"areas\":[],\"appTypes\":[],\"subscriptionPeriods\":[]}', '2020-08-10 16:50:10');

-- --------------------------------------------------------

--
-- Table structure for table `message_statistic`
--

CREATE TABLE `message_statistic` (
  `id` int(11) NOT NULL,
  `data_json` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `message_statistic`
--

INSERT INTO `message_statistic` (`id`, `data_json`, `created_at`) VALUES
(1, '{\"reply\":{\"status\":\"unready\"},\"sentPush\":{\"status\":\"unready\"},\"sentMulticast\":{\"status\":\"unready\"},\"sentBroadcast\":{\"status\":\"unready\"},\"messageDeliveries\":{\"status\":\"unready\"}}', '2020-08-10 00:00:00'),
(2, '{\"reply\":{\"status\":\"unready\"},\"sentPush\":{\"status\":\"unready\"},\"sentMulticast\":{\"status\":\"unready\"},\"sentBroadcast\":{\"status\":\"unready\"},\"messageDeliveries\":{\"status\":\"unready\"}}', '2020-08-10 16:48:11'),
(3, '{\"reply\":{\"status\":\"unready\"},\"sentPush\":{\"status\":\"unready\"},\"sentMulticast\":{\"status\":\"unready\"},\"sentBroadcast\":{\"status\":\"unready\"},\"messageDeliveries\":{\"status\":\"unready\"}}', '2020-08-10 16:49:11'),
(4, '{\"reply\":{\"status\":\"unready\"},\"sentPush\":{\"status\":\"unready\"},\"sentMulticast\":{\"status\":\"unready\"},\"sentBroadcast\":{\"status\":\"unready\"},\"messageDeliveries\":{\"status\":\"unready\"}}', '2020-08-10 16:50:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friend_demo_graphics`
--
ALTER TABLE `friend_demo_graphics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_statistic`
--
ALTER TABLE `message_statistic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friend_demo_graphics`
--
ALTER TABLE `friend_demo_graphics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `message_statistic`
--
ALTER TABLE `message_statistic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
