DROP DATABASE IF EXISTS ridereqs;

CREATE DATABASE ridereqs;

USE ridereqs;

CREATE TABLE reqs (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  zone int NOT NULL,
  atx int NOT NULL,
  aty int NOT NULL,
  tox int NOT NULL,
  toy int NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO reqs (user_id, zone, atx, aty, tox, toy) VALUES (101010, 3, 2373, 124, 616, 4728);

CREATE TABLE client (
  id int NOT NULL AUTO_INCREMENT,
  rider_id VARCHAR(50) NOT NULL,
  zone int NOT NULL,
  pickupx int NOT NULL,
  pickupy int NOT NULL,
  dropoffx int NOT NULL,
  dropoffy int NOT NULL,
  distance int NOT NULL,
  baseprice DECIMAL (10,2) NOT NULL,
  finalprice DECIMAL(10,2) NOT NULL,
  surgeratio DECIMAL (3,1) NOT NULL, 
  tomatchat DATETIME NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO client (rider_id, zone, pickupx, pickupy, dropoffx, dropoffy, distance, baseprice, finalprice, surgeratio, tomatchat) VALUES 
("2c8fa85c-a380-4d1c-935b-1dcf3f849440", 46, 5186, 4628, 4496, 385, 6017, 13.24, 13.24, 1, '2017-11-04 00:03:31')
;


