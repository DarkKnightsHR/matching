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


