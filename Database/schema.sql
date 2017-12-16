-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Purchase'
-- 
-- ---

DROP DATABASE IF EXISTS bundlin;
--
CREATE DATABASE bundlin;

USE bundlin;

DROP TABLE IF EXISTS purchases;
    
CREATE TABLE purchases (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  price CHAR(25) NULL DEFAULT NULL,
  isBundle BOOLEAN NULL DEFAULT NULL,
  date DATE NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Product_purchase'
-- 
-- ---

DROP TABLE IF EXISTS product_purchases;
    
CREATE TABLE weekly_product_purchases (
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  individual_purchase_count INTEGER NULL DEFAULT 0,
  bundle_purchase_count INTEGER NULL DEFAULT 0,
  week_start_date DATE NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys 

-- ALTER TABLE product_purchase ADD FOREIGN KEY (product_id) REFERENCES purchase (product_id);
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Purchase` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product_purchase` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Purchase` (`id`,`user_id`,`product_id`,`quantity`,`price`,`isBundle`,`date`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Product_purchase` (`id`,`product_id`,`individual_purchase_count`,`bundle_purchase_count`) VALUES
-- ('','','','');