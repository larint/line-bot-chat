-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2020 at 03:21 AM
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
-- Table structure for table `friend_graphics__ages`
--

CREATE TABLE `friend_graphics__ages` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `unknown` float DEFAULT 0,
  `from0to14` float DEFAULT 0,
  `from15to19` float DEFAULT 0,
  `from20to24` float DEFAULT 0,
  `from25to29` float DEFAULT 0,
  `from30to34` float DEFAULT 0,
  `from35to39` float DEFAULT 0,
  `from40to44` float DEFAULT 0,
  `from45to49` float DEFAULT 0,
  `from50` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_graphics__ages`
--

INSERT INTO `friend_graphics__ages` (`id`, `date_update`, `unknown`, `from0to14`, `from15to19`, `from20to24`, `from25to29`, `from30to34`, `from35to39`, `from40to44`, `from45to49`, `from50`) VALUES
(1, '20200817', 9.1, 0.2, 0.5, 48.9, 0, 35.3, 0.1, 5.7, 0.1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__apptypes`
--

CREATE TABLE `friend_graphics__apptypes` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `ios` float DEFAULT 0,
  `android` float DEFAULT 0,
  `others` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_graphics__apptypes`
--

INSERT INTO `friend_graphics__apptypes` (`id`, `date_update`, `ios`, `android`, `others`) VALUES
(1, '20200817', 43.7, 28.9, 27.4);

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__areas_id`
--

CREATE TABLE `friend_graphics__areas_id` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `unknown` float DEFAULT 0,
  `bali` float DEFAULT 0,
  `bandung` float DEFAULT 0,
  `banjarmasin` float DEFAULT 0,
  `jabodetabek` float DEFAULT 0,
  `makassar` float DEFAULT 0,
  `medan` float DEFAULT 0,
  `palembang` float DEFAULT 0,
  `samarinda` float DEFAULT 0,
  `semarang` float DEFAULT 0,
  `surabaya` float DEFAULT 0,
  `yogyakarta` float DEFAULT 0,
  `lainnya` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__areas_jp`
--

CREATE TABLE `friend_graphics__areas_jp` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `unknown` float DEFAULT 0,
  `hokkaido` float DEFAULT 0,
  `aomori` float DEFAULT 0,
  `iwate` float DEFAULT 0,
  `miyagi` float DEFAULT 0,
  `akita` float DEFAULT 0,
  `yamagata` float DEFAULT 0,
  `fukushima` float DEFAULT 0,
  `ibaraki` float DEFAULT 0,
  `tochigi` float DEFAULT 0,
  `gunma` float DEFAULT 0,
  `saitama` float DEFAULT 0,
  `chiba` float DEFAULT 0,
  `tokyo` float DEFAULT 0,
  `kanagawa` float DEFAULT 0,
  `niigata` float DEFAULT 0,
  `toyama` float DEFAULT 0,
  `ishikawa` float DEFAULT 0,
  `fukui` float DEFAULT 0,
  `yamanashi` float DEFAULT 0,
  `nagano` float DEFAULT 0,
  `gifu` float DEFAULT 0,
  `shizuoka` float DEFAULT 0,
  `aichi` float DEFAULT 0,
  `mie` float DEFAULT 0,
  `shiga` float DEFAULT 0,
  `kyoto` float DEFAULT 0,
  `osaka` float DEFAULT 0,
  `hyogo` float DEFAULT 0,
  `nara` float DEFAULT 0,
  `wakayama` float DEFAULT 0,
  `tottori` float DEFAULT 0,
  `shimane` float DEFAULT 0,
  `okayama` float DEFAULT 0,
  `hiroshima` float DEFAULT 0,
  `yamaguchi` float DEFAULT 0,
  `tokushima` float DEFAULT 0,
  `kagawa` float DEFAULT 0,
  `ehime` float DEFAULT 0,
  `kochi` float DEFAULT 0,
  `fukuoka` float DEFAULT 0,
  `saga` float DEFAULT 0,
  `nagasaki` float DEFAULT 0,
  `kumamoto` float DEFAULT 0,
  `oita` float DEFAULT 0,
  `miyazaki` float DEFAULT 0,
  `kagoshima` float DEFAULT 0,
  `okinawa` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_graphics__areas_jp`
--

INSERT INTO `friend_graphics__areas_jp` (`id`, `date_update`, `unknown`, `hokkaido`, `aomori`, `iwate`, `miyagi`, `akita`, `yamagata`, `fukushima`, `ibaraki`, `tochigi`, `gunma`, `saitama`, `chiba`, `tokyo`, `kanagawa`, `niigata`, `toyama`, `ishikawa`, `fukui`, `yamanashi`, `nagano`, `gifu`, `shizuoka`, `aichi`, `mie`, `shiga`, `kyoto`, `osaka`, `hyogo`, `nara`, `wakayama`, `tottori`, `shimane`, `okayama`, `hiroshima`, `yamaguchi`, `tokushima`, `kagawa`, `ehime`, `kochi`, `fukuoka`, `saga`, `nagasaki`, `kumamoto`, `oita`, `miyazaki`, `kagoshima`, `okinawa`) VALUES
(1, '20200817', 12.4, 0, 0.3, 0.7, 0, 0, 11.1, 1, 0, 0.6, 0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6.3, 0, 0, 0, 2.7, 0, 0, 0, 0, 0, 0, 64.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__areas_th`
--

CREATE TABLE `friend_graphics__areas_th` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `unknown` float DEFAULT 0,
  `bangkok` float DEFAULT 0,
  `pattaya` float DEFAULT 0,
  `northern` float DEFAULT 0,
  `central` float DEFAULT 0,
  `southern` float DEFAULT 0,
  `eastern` float DEFAULT 0,
  `northeastern` float DEFAULT 0,
  `western` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__areas_tw`
--

CREATE TABLE `friend_graphics__areas_tw` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `unknown` float DEFAULT 0,
  `taipei_city` float DEFAULT 0,
  `new_taipei` float DEFAULT 0,
  `taoyuan_city` float DEFAULT 0,
  `taichung` float DEFAULT 0,
  `tainan_city` float DEFAULT 0,
  `kaohsiung` float DEFAULT 0,
  `keelung` float DEFAULT 0,
  `hsinchu_city` float DEFAULT 0,
  `chiayi_city` float DEFAULT 0,
  `hisnchu_county` float DEFAULT 0,
  `miaoli_county` float DEFAULT 0,
  `changhua_county` float DEFAULT 0,
  `nantou_county` float DEFAULT 0,
  `yunlin_county` float DEFAULT 0,
  `chiayi_county` float DEFAULT 0,
  `pingtung_county` float DEFAULT 0,
  `yilan_county` float DEFAULT 0,
  `hualien_county` float DEFAULT 0,
  `taitung_county` float DEFAULT 0,
  `penghu_county` float DEFAULT 0,
  `kinmen_county` float DEFAULT 0,
  `lianjiang_county` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__genders`
--

CREATE TABLE `friend_graphics__genders` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `unknown` float DEFAULT 0,
  `male` float DEFAULT 0,
  `female` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_graphics__genders`
--

INSERT INTO `friend_graphics__genders` (`id`, `date_update`, `unknown`, `male`, `female`) VALUES
(1, '20200817', 11.8, 48, 40.2);

-- --------------------------------------------------------

--
-- Table structure for table `friend_graphics__subscriptions`
--

CREATE TABLE `friend_graphics__subscriptions` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `within7days` float DEFAULT 0,
  `within30days` float DEFAULT 0,
  `within90days` float DEFAULT 0,
  `within180days` float DEFAULT 0,
  `within365days` float DEFAULT 0,
  `over365days` float DEFAULT 0,
  `unknown` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friend_graphics__subscriptions`
--

INSERT INTO `friend_graphics__subscriptions` (`id`, `date_update`, `within7days`, `within30days`, `within90days`, `within180days`, `within365days`, `over365days`, `unknown`) VALUES
(1, '20200817', 59.3, 1.9, 0.6, 1.6, 13.5, 2.1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `messages_statistic`
--

CREATE TABLE `messages_statistic` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_update` varchar(255) NOT NULL,
  `reply_status` varchar(255) DEFAULT NULL,
  `reply_number` int(11) DEFAULT 0,
  `push_status` varchar(255) DEFAULT NULL,
  `push_number` int(11) DEFAULT 0,
  `multicast_status` varchar(255) DEFAULT NULL,
  `multicast_number` int(11) DEFAULT 0,
  `broadcast_status` varchar(255) DEFAULT NULL,
  `broadcast_number` int(11) DEFAULT 0,
  `deliveries_status` varchar(255) DEFAULT '0',
  `deliveries_broadcast` int(11) DEFAULT 0,
  `deliveries_targeting` int(11) DEFAULT 0,
  `deliveries_auto_response` int(11) DEFAULT 0,
  `deliveries_welcome_response` int(11) DEFAULT 0,
  `deliveries_chat` int(11) DEFAULT 0,
  `deliveries_api_broadcast` int(11) DEFAULT 0,
  `deliveries_api_push` int(11) DEFAULT 0,
  `deliveries_api_multicast` int(11) DEFAULT 0,
  `deliveries_api_narrowcast` int(11) DEFAULT 0,
  `deliveries_api_reply` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages_statistic`
--

INSERT INTO `messages_statistic` (`id`, `date_update`, `reply_status`, `reply_number`, `push_status`, `push_number`, `multicast_status`, `multicast_number`, `broadcast_status`, `broadcast_number`, `deliveries_status`, `deliveries_broadcast`, `deliveries_targeting`, `deliveries_auto_response`, `deliveries_welcome_response`, `deliveries_chat`, `deliveries_api_broadcast`, `deliveries_api_push`, `deliveries_api_multicast`, `deliveries_api_narrowcast`, `deliveries_api_reply`) VALUES
(1, '20200817', 'unready', 12, 'unready', 40, 'unready', 30, 'unready', 0, 'unready', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friend_graphics__ages`
--
ALTER TABLE `friend_graphics__ages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__apptypes`
--
ALTER TABLE `friend_graphics__apptypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__areas_id`
--
ALTER TABLE `friend_graphics__areas_id`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__areas_jp`
--
ALTER TABLE `friend_graphics__areas_jp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__areas_th`
--
ALTER TABLE `friend_graphics__areas_th`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__areas_tw`
--
ALTER TABLE `friend_graphics__areas_tw`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__genders`
--
ALTER TABLE `friend_graphics__genders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_graphics__subscriptions`
--
ALTER TABLE `friend_graphics__subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages_statistic`
--
ALTER TABLE `messages_statistic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friend_graphics__ages`
--
ALTER TABLE `friend_graphics__ages`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `friend_graphics__apptypes`
--
ALTER TABLE `friend_graphics__apptypes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `friend_graphics__areas_id`
--
ALTER TABLE `friend_graphics__areas_id`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friend_graphics__areas_jp`
--
ALTER TABLE `friend_graphics__areas_jp`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `friend_graphics__areas_th`
--
ALTER TABLE `friend_graphics__areas_th`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friend_graphics__areas_tw`
--
ALTER TABLE `friend_graphics__areas_tw`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `friend_graphics__genders`
--
ALTER TABLE `friend_graphics__genders`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `friend_graphics__subscriptions`
--
ALTER TABLE `friend_graphics__subscriptions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages_statistic`
--
ALTER TABLE `messages_statistic`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
