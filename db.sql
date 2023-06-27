CREATE DATABASE IF NOT EXISTS auto_refresh;
USE auto_refresh;

CREATE TABLE a_refresh
(
    `link` VARCHAR(1000) NOT NULL,
    `delay` INT(100) NOT NULL,
);