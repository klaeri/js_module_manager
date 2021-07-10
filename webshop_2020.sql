-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Júl 10. 11:35
-- Kiszolgáló verziója: 10.4.19-MariaDB
-- PHP verzió: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webshop_2020`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkategoriak`
--

CREATE TABLE `alkategoriak` (
  `id` int(6) NOT NULL,
  `fokategid` int(6) NOT NULL,
  `megnevezes` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `alkategoriak`
--

INSERT INTO `alkategoriak` (`id`, `fokategid`, `megnevezes`) VALUES
(1, 1, 'INTEL'),
(2, 1, 'ASUS'),
(3, 4, 'HP'),
(4, 4, 'KONICA MINOLTA');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(99) NOT NULL,
  `nev` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(99) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `admin` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `jelszo`, `admin`) VALUES
(1, 'admin', '12345', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int(5) NOT NULL,
  `kategnev` varchar(200) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `kategnev`) VALUES
(1, 'ALAPLAP'),
(2, 'MEMÓRIA'),
(3, 'HDD'),
(4, 'NYOMTATÓ');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar`
--

CREATE TABLE `kosar` (
  `id` int(11) NOT NULL,
  `p_id` int(10) NOT NULL,
  `id_add` varchar(250) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `user_id` int(10) NOT NULL,
  `qty` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `id` int(11) NOT NULL,
  `termek_nev` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `fokategoria` int(11) NOT NULL,
  `alkategoria` int(11) NOT NULL,
  `termek_ar` int(9) NOT NULL,
  `termek_leiras` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `termek_kep` varchar(100) NOT NULL,
  `kosarba` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `termek_nev`, `fokategoria`, `alkategoria`, `termek_ar`, `termek_leiras`, `termek_kep`, `kosarba`) VALUES
(1, 'Intel DB65AL s1155', 1, 1, 9980, 'Asus alaplap 1155 -ös II generációs I3,I5,I7-es Processzorok fogadására alkalmas, integrált videokártya (processzor HD graphic)!', 'intel db65alnull.jpg', 0),
(2, 'NZXT N7 Z390 Matt fekete', 1, 1, 99400, 'NZXT N7 Z390 Matt fekete típusú alaplap LGA-1151 (300) foglalattal, Intel Z390 chipsettel', '1364950_nzxt_n7_z390_matt_fekete (1).jpg', 0),
(3, 'Infolex ASUS H81', 1, 2, 29000, ' Intel H81 alaplap', 'asus-h81-gamer-intel-h81-lga1150-atx-alaplap.jpg', 0),
(4, 'ASUS ROG STRIX B360-G', 1, 2, 41999, 'Gaming alaplap', '01_nhpjhwu2.jpg', 0),
(5, 'Intel NUC5i3MYBE', 1, 1, 82990, 'Intel NUC5i3MYBE Alaplap', '392649508.intel-nuc5i3mybe.jpg', 0),
(6, 'Kingston 8GB/DDR4 memória', 2, 0, 8700, 'kingston memória', 'kingston-8gb2400mhz-ddr4-value-memoria-kvr24n17s88.jpg', 0),
(7, 'Kingston 16GB/ DDR4', 2, 0, 29400, 'Kingston 16GB/ DDR4', 'kingston-16gb2933mhz-ddr4-hyperx-predator-rgb-xmp-kit-2db-8gb-hx429c15pb3ak216-memoria.jpg', 0),
(8, 'CSX 8GB DDR3 ', 2, 0, 9980, 'CSX 8GB DDR3 ', '167439540.csx-8gb-ddr3-1600mhz-csxo-d3-lo-1600-8gb.jpg', 0),
(9, ' Focuscamera Rammax 4GB-1600 DDR3', 2, 0, 9980, ' Focuscamera Rammax 4GB-1600 LO-DIMM DDR3', '424881-e516e.png', 0),
(10, 'HP Laserjet Pro', 4, 3, 47800, 'HP Laserjet Pro MFP M28a (W2G54A) multifunkciós mono lézernyomtató', 'HP_Laserjet_Pro_M28a_W2G54A_multifunkcios_mono_lezernyomtato-i173668.jpg', 0),
(11, 'HP Deskjet 2721', 4, 3, 16190, 'Tintasugaras nyomtató - multifunkciós, szines,', 'ImgW.jpg', 0),
(12, 'Konica Minolta magicolor', 4, 4, 73590, 'Konica Minolta magicolor', '35127472.konica-minolta-magicolor-1680mf.jpg', 0),
(13, 'Konica Minolta 3602P', 4, 4, 94330, 'Konica Minolta 3602P', '564591669.konica-minolta-3602p.jpg', 0),
(14, 'Konica Minolta 3602P', 4, 4, 94330, 'Konica Minolta 3602P', '564591669.konica-minolta-3602p.jpg', 0),
(15, 'Konica Minolta 3602P', 4, 4, 94330, 'Konica Minolta 3602P', '564591669.konica-minolta-3602p.jpg', 0),
(16, 'Konica Minolta magicolor', 4, 4, 73590, 'Konica Minolta magicolor', '35127472.konica-minolta-magicolor-1680mf.jpg', 0),
(17, 'Konica Minolta magicolor', 4, 4, 73590, 'Konica Minolta magicolor', '35127472.konica-minolta-magicolor-1680mf.jpg', 0),
(18, 'Konica Minolta magicolor', 4, 4, 73590, 'Konica Minolta magicolor', '35127472.konica-minolta-magicolor-1680mf.jpg', 0),
(19, 'Konica Minolta 3602P', 4, 4, 94330, 'Konica Minolta 3602P', '564591669.konica-minolta-3602p.jpg', 0),
(20, 'Konica Minolta 3602P', 4, 4, 94330, 'Konica Minolta 3602P', '564591669.konica-minolta-3602p.jpg', 0),
(21, 'Konica Minolta magicolor', 4, 4, 73590, 'Konica Minolta magicolor', '35127472.konica-minolta-magicolor-1680mf.jpg', 0),
(22, 'Seagate 2TB BarraCuda', 3, 0, 24300, 'Seagate 2TB BarraCuda', 'images (1).jpg', 0),
(23, 'WD Blue 3,5\" 1TB merevlemez', 3, 0, 19880, 'WD Blue 3,5 1TB merevlemez', 'western-digital-wd10ezex-caviar-blue-1tb-merevlemez_7f5fdcb5.jpg', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkategoriak`
--
ALTER TABLE `alkategoriak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kosar`
--
ALTER TABLE `kosar`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkategoriak`
--
ALTER TABLE `alkategoriak`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(99) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `kosar`
--
ALTER TABLE `kosar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
