-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Апр 17 2014 г., 10:56
-- Версия сервера: 5.6.14
-- Версия PHP: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `myfoodmedb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `wp_couriers`
--

CREATE TABLE IF NOT EXISTS `wp_couriers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `courier_login` varchar(60) NOT NULL,
  `courier_pass` varchar(60) NOT NULL,
  `courier_firstName` varchar(60) NOT NULL,
  `courier_lastName` varchar(60) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `wp_couriers`
--

INSERT INTO `wp_couriers` (`ID`, `courier_login`, `courier_pass`, `courier_firstName`, `courier_lastName`) VALUES
(1, 'courier1', 'courier1', 'Anna', 'Anna'),
(2, 'courier2', 'courier2', 'Peter', 'Peter'),
(3, 'courier3', 'courier3', 'Thomas', 'Thomas');

-- --------------------------------------------------------

--
-- Структура таблицы `wp_order_details`
--

CREATE TABLE IF NOT EXISTS `wp_order_details` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderNummer` int(11) NOT NULL,
  `prodyctName` varchar(255) NOT NULL,
  `quontity` int(11) NOT NULL,
  `deliveryAddress` text NOT NULL,
  `deliveryTime` varchar(255) NOT NULL,
  `optional` tinyint(1) NOT NULL,
  `extraInfo` text NOT NULL,
  `delivery` tinyint(1) NOT NULL,
  `time` datetime NOT NULL,
  `done` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `wp_order_details`
--

INSERT INTO `wp_order_details` (`ID`, `OrderNummer`, `prodyctName`, `quontity`, `deliveryAddress`, `deliveryTime`, `optional`, `extraInfo`, `delivery`, `time`, `done`) VALUES
(1, 66, 'Colorfull set', 3, 'Lund Nordenvägen 7', '10.00-11.00', 0, '', 0, '0000-00-00 00:00:00', 'No'),
(2, 45, 'Wine', 1, 'Studentgatan 4 Malmö', '18.00-19.00', 0, '', 0, '0000-00-00 00:00:00', 'No'),
(3, 33, 'Yellow flowers', 7, 'Vintergatan 21 21120 Malmö', '12.00-14.00', 0, '', 0, '0000-00-00 00:00:00', 'No');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
