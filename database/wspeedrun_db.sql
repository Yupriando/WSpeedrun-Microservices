-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2026 at 07:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wspeedrun_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `run_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` varchar(36) NOT NULL,
  `game_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `game_name`, `description`) VALUES
('2107b522-70d4-47ee-b5d6-155856c447a1', 'Celeste', 'Platformer game'),
('5ae77a00-b5a4-4525-bc1f-a7f07af95d12', 'Minecraft', 'Sandbox game'),
('e603115f-10cd-417f-a01e-e1d3eda706df', 'Minecraft', 'Sandbox game');

-- --------------------------------------------------------

--
-- Table structure for table `runs`
--

CREATE TABLE `runs` (
  `run_id` varchar(36) NOT NULL,
  `run_category_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `vod_url` varchar(255) NOT NULL,
  `run_duration` bigint(20) NOT NULL,
  `submitted_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `runs`
--

INSERT INTO `runs` (`run_id`, `run_category_id`, `user_id`, `vod_url`, `run_duration`, `submitted_at`, `verified_at`, `status`) VALUES
('4e84c7f0-8803-4457-bc73-9605e08e2c84', '9076e6a4-6f58-4d82-911f-534e74ca95d7', '112ee91e-9db6-4caa-afbb-efcb99f28894', 'https://youtube.com/watch?v=123', 12345, '2026-06-17 04:33:46', NULL, 'REJECTED'),
('5902ddcc-cc80-4ef6-b172-d246f658c3ba', 'c35b46cf-1e80-413c-a71e-06edc8d65ad4', '112ee91e-9db6-4caa-afbb-efcb99f28894', 'https://youtube.com/watch?v=123', 12345, '2026-06-17 04:33:17', NULL, 'PENDING'),
('8c6f7a01-0e64-41aa-a326-be6b6f170379', '9076e6a4-6f58-4d82-911f-534e74ca95d7', '112ee91e-9db6-4caa-afbb-efcb99f28894', 'https://youtube.com/watch?v=123', 12345, '2026-06-17 04:38:01', NULL, 'PENDING'),
('e05d9993-2706-4a7c-a569-52992d2aba18', '9076e6a4-6f58-4d82-911f-534e74ca95d7', '112ee91e-9db6-4caa-afbb-efcb99f28894', 'https://youtube.com/watch?v=123', 12345, '2026-06-17 04:48:42', '2026-06-17 04:49:38', 'VERIFIED');

-- --------------------------------------------------------

--
-- Table structure for table `run_categories`
--

CREATE TABLE `run_categories` (
  `run_category_id` varchar(36) NOT NULL,
  `game_id` varchar(36) NOT NULL,
  `run_category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `run_categories`
--

INSERT INTO `run_categories` (`run_category_id`, `game_id`, `run_category_name`) VALUES
('9076e6a4-6f58-4d82-911f-534e74ca95d7', '2107b522-70d4-47ee-b5d6-155856c447a1', 'Ikan'),
('c35b46cf-1e80-413c-a71e-06edc8d65ad4', '2107b522-70d4-47ee-b5d6-155856c447a1', 'Any%');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(55) DEFAULT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `country`, `role`) VALUES
('0644a087-8120-4f78-88ba-149f11bdefeb', 'User', 'user@gmail.com', '$2b$10$lf7hHwFDNmQhHsPpOtpD9OI966.JscfUpbQ1n6o.Bw1gpMXDmhYtG', 'Indonesia', 'USER'),
('112ee91e-9db6-4caa-afbb-efcb99f28894', 'Yupri', 'yupriando@gmail.com', '$2b$10$waGwpET.Qq7kXvY.qzzarOxP8aoS30C9F9OlEWxhlMprY.qom9lEm', 'Indonesia', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `run_id` (`run_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`run_id`),
  ADD KEY `run_category_id` (`run_category_id`);

--
-- Indexes for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD PRIMARY KEY (`run_category_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`run_id`) REFERENCES `runs` (`run_id`);

--
-- Constraints for table `runs`
--
ALTER TABLE `runs`
  ADD CONSTRAINT `runs_ibfk_1` FOREIGN KEY (`run_category_id`) REFERENCES `run_categories` (`run_category_id`);

--
-- Constraints for table `run_categories`
--
ALTER TABLE `run_categories`
  ADD CONSTRAINT `run_categories_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
