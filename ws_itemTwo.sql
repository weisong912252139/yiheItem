-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-02-28 13:58:01
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 7.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ws_itemTwo`
--

-- --------------------------------------------------------

--
-- 表的结构 `ws_addressList`
--

CREATE TABLE `ws_addressList` (
  `addressId` int(11) NOT NULL,
  `userName` varchar(64) CHARACTER SET utf8mb4 NOT NULL,
  `province` varchar(64) CHARACTER SET utf8 NOT NULL,
  `city` varchar(64) CHARACTER SET utf8 NOT NULL,
  `country` varchar(64) CHARACTER SET utf8 NOT NULL,
  `streetName` varchar(64) CHARACTER SET utf8 NOT NULL,
  `tel` varchar(64) CHARACTER SET utf8 NOT NULL,
  `isDefault` varchar(64) NOT NULL,
  `time` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `ws_addressList`
--

INSERT INTO `ws_addressList` (`addressId`, `userName`, `province`, `city`, `country`, `streetName`, `tel`, `isDefault`, `time`) VALUES
(1, '魏松的', '北京市', '北京市', '西城区', '从科技局', '18336345030', 'true', '1488280310026'),
(2, '亚飞', '河北省', '张家口市', '桥东区', '第三方', '13112813457', 'false', '1488280333227'),
(3, '如今', '山西省', '阳泉市', '郊区', '第三方方式', '13112813457', 'false', '1488280365973');

-- --------------------------------------------------------

--
-- 表的结构 `ws_addShoppingCart`
--

CREATE TABLE `ws_addShoppingCart` (
  `productId` int(11) NOT NULL,
  `shopName` varchar(64) CHARACTER SET utf8 NOT NULL,
  `itemDescription` varchar(64) CHARACTER SET utf8 NOT NULL,
  `edition` varchar(64) CHARACTER SET utf8 NOT NULL,
  `color` varchar(64) CHARACTER SET utf8 NOT NULL,
  `itemPrice` varchar(64) CHARACTER SET utf8 NOT NULL,
  `shopNum` varchar(64) CHARACTER SET utf8 NOT NULL,
  `srcImg` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `ws_addShoppingCart`
--

INSERT INTO `ws_addShoppingCart` (`productId`, `shopName`, `itemDescription`, `edition`, `color`, `itemPrice`, `shopNum`, `srcImg`) VALUES
(1, '海澜之家', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '../img/today_deal/limit1.png'),
(2, '海澜之家', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '../img/home_page/yf_car5.png'),
(3, '海澜之家', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '../img/home_page/yf_dian2.png');

-- --------------------------------------------------------

--
-- 表的结构 `ws_orderList`
--

CREATE TABLE `ws_orderList` (
  `productId` int(11) NOT NULL,
  `shopName` varchar(64) CHARACTER SET utf8 NOT NULL,
  `srcImg` varchar(64) CHARACTER SET utf8 NOT NULL,
  `itemDescription` varchar(64) CHARACTER SET utf8 NOT NULL,
  `edition` varchar(64) CHARACTER SET utf8 NOT NULL,
  `color` varchar(64) CHARACTER SET utf8 NOT NULL,
  `itemPrice` varchar(64) CHARACTER SET utf8 NOT NULL,
  `shopNum` varchar(64) CHARACTER SET utf8 NOT NULL,
  `time` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `ws_orderList`
--

INSERT INTO `ws_orderList` (`productId`, `shopName`, `srcImg`, `itemDescription`, `edition`, `color`, `itemPrice`, `shopNum`, `time`) VALUES
(1, '海澜之家旗舰店', '../img/today_deal/limit1.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '1488280269696'),
(2, '海澜之家旗舰店', '../img/home_page/yf_car4.png', '&lt;&lt;亚飞&gt;&gt; 的小小的广场', '国航32G', '白色', '35', '2', '1488280274752'),
(3, '海澜之家旗舰店', '../img/today_deal/limit1.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '1488280274752'),
(4, '海澜之家旗舰店', '../img/home_page/yf_car5.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '1488282304286'),
(5, '海澜之家旗舰店', '../img/home_page/yf_dian2.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '1488282304286'),
(6, '海澜之家旗舰店', '../img/home_page/yf_car4.png', '&lt;&lt;亚飞&gt;&gt; 的小小的广场', '国航32G', '白色', '35', '6', '1488282317343'),
(7, '海澜之家旗舰店', '../img/today_deal/limit1.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '2', '1488282317343'),
(8, '海澜之家旗舰店', '../img/home_page/yf_car5.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '3', '1488282317343'),
(9, '海澜之家旗舰店', '../img/home_page/yf_dian2.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '1488282317343'),
(10, '海澜之家', '../img/home_page/yf_car3.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '175', '蓝', '20', '1', '1488282340664'),
(11, '海澜之家', '../img/home_page/yf_dian2.png', '&lt;&lt;男士短衬衫&gt;&gt; 万达青花瓷广场', '170', '红', '20', '1', '1488282359777');

-- --------------------------------------------------------

--
-- 表的结构 `ws_recharge`
--

CREATE TABLE `ws_recharge` (
  `phone` varchar(64) CHARACTER SET utf8 NOT NULL,
  `time` varchar(64) CHARACTER SET utf8 NOT NULL,
  `orderNum` varchar(64) CHARACTER SET utf8 NOT NULL,
  `num` varchar(64) CHARACTER SET utf8 NOT NULL,
  `remainder` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `ws_register`
--

CREATE TABLE `ws_register` (
  `userId` int(64) NOT NULL,
  `phone` varchar(64) CHARACTER SET utf8 NOT NULL,
  `pass` varchar(64) CHARACTER SET utf8 NOT NULL,
  `remainder` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `ws_register`
--

INSERT INTO `ws_register` (`userId`, `phone`, `pass`, `remainder`) VALUES
(1, '18336345030', '123456q', '');

-- --------------------------------------------------------

--
-- 表的结构 `yf_appraise`
--

CREATE TABLE `yf_appraise` (
  `appraiseId` int(64) NOT NULL,
  `userName` varchar(64) CHARACTER SET utf8 NOT NULL,
  `goodsGrade` int(64) NOT NULL,
  `valuationText` varchar(64) CHARACTER SET utf8 NOT NULL,
  `timer` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `yf_collectGoods`
--

CREATE TABLE `yf_collectGoods` (
  `goods_id` int(64) NOT NULL,
  `goods_imgSrc` varchar(64) CHARACTER SET utf8 NOT NULL,
  `goods_text` varchar(64) CHARACTER SET utf8 NOT NULL,
  `goods_newPrice` varchar(64) CHARACTER SET utf8 NOT NULL,
  `goods_OriginalPrice` varchar(64) CHARACTER SET utf8 NOT NULL,
  `id` varchar(64) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `yf_collectGoods`
--

INSERT INTO `yf_collectGoods` (`goods_id`, `goods_imgSrc`, `goods_text`, `goods_newPrice`, `goods_OriginalPrice`, `id`) VALUES
(2, '../img/home_page/yf_dian2.png', '男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家', '20', '100.00', ''),
(3, '../img/today_deal/commodity4.png', '男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家', '20', '100.00', '4'),
(4, '../img/today_deal/commodity3.png', '男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家', '20', '100.00', '11'),
(5, '../img/today_deal/commodity2.png', '男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家男人的衣柜海澜之家', '20', '100.00', '9');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ws_addressList`
--
ALTER TABLE `ws_addressList`
  ADD PRIMARY KEY (`addressId`);

--
-- Indexes for table `ws_addShoppingCart`
--
ALTER TABLE `ws_addShoppingCart`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `ws_orderList`
--
ALTER TABLE `ws_orderList`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `ws_register`
--
ALTER TABLE `ws_register`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `yf_appraise`
--
ALTER TABLE `yf_appraise`
  ADD PRIMARY KEY (`appraiseId`);

--
-- Indexes for table `yf_collectGoods`
--
ALTER TABLE `yf_collectGoods`
  ADD PRIMARY KEY (`goods_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `ws_addressList`
--
ALTER TABLE `ws_addressList`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `ws_addShoppingCart`
--
ALTER TABLE `ws_addShoppingCart`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `ws_orderList`
--
ALTER TABLE `ws_orderList`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `ws_register`
--
ALTER TABLE `ws_register`
  MODIFY `userId` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `yf_appraise`
--
ALTER TABLE `yf_appraise`
  MODIFY `appraiseId` int(64) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `yf_collectGoods`
--
ALTER TABLE `yf_collectGoods`
  MODIFY `goods_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
