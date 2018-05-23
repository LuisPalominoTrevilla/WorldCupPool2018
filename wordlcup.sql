CREATE DATABASE worldcuppool;

GRANT ALL ON worldcuppool.* TO 'maestro'@'%' IDENTIFIED BY 'themaster';

USE worldcuppool;

CREATE TABLE user_type (
    type_id TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY(type_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO user_type (name) VALUES ('admin'), ('user');

CREATE TABLE event(
    event_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(64) NOT NULL UNIQUE,
    PRIMARY KEY(event_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO event (event_name) VALUES('World Cup Russia 2018');

CREATE TABLE quiniela(
    code CHAR(5) NOT NULL,
    name VARCHAR(32) NOT NULL,
    event_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT event_fk FOREIGN KEY (event_id) REFERENCES event(event_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE user(
    user_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    user_type TINYINT(1) UNSIGNED NOT NULL,
    username VARCHAR (32) NOT NULL UNIQUE,
    password varchar(60) NOT NULL,
    quiniela_id CHAR(5),
    PRIMARY KEY (user_id),
    CONSTRAINT type_fk FOREIGN KEY (user_type) REFERENCES user_type(type_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT pool_fk FOREIGN KEY (quiniela_id) REFERENCES quiniela(code)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO user (user_type, username, password) VALUES (1, 'root', '$2a$04$YcS86bxGTLV/aHDFfRv.ju3xwyaq3nUUXmA5kIZeWwhJpwQ8oTVg6');

CREATE TABLE groups(
    group_id MEDIUMINT UNSIGNED NOT NULL,
    group_name VARCHAR(16) NOT NULL,
    PRIMARY KEY (group_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO groups VALUES (1, 'A'), (2, 'B'), (3, 'C'), (4, 'D'), (5, 'E'), (6, 'F'), (7, 'G'), (8, 'H');

CREATE TABLE result(
    result_id TINYINT(1) UNSIGNED NOT NULL,
    outcome VARCHAR(8) NOT NULL,
    PRIMARY KEY (result_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO result VALUES (1, 'home'), (2, 'away'), (0, 'tie');

CREATE TABLE team(
    code CHAR(3) NOT NULL,
    name VARCHAR(64) NOT NULL,
    flag VARCHAR(128) NOT NULL,
    belonging_group MEDIUMINT UNSIGNED,
    PRIMARY KEY (code),
    CONSTRAINT grp_fk FOREIGN KEY (belonging_group) REFERENCES groups(group_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE matches(
    match_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    home_team CHAR(3) NOT NULL,
    away_team CHAR(3) NOT NULL,
    local_goals TINYINT(2) UNSIGNED DEFAULT 0,
    away_goals TINYINT(2) UNSIGNED DEFAULT 0,
    match_date DATETIME,
    result_id TINYINT(1) UNSIGNED,
    match_status TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (match_id),
    CONSTRAINT home_fk FOREIGN KEY (home_team) REFERENCES team(code)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT away_fk FOREIGN KEY (away_team) REFERENCES team(code)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT res_fk FOREIGN KEY (result_id) REFERENCES result(result_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE bet(
    respective_match INTEGER UNSIGNED NOT NULL,
    user INTEGER UNSIGNED NOT NULL,
    date_modified DATETIME,
    predicted_result TINYINT(1) UNSIGNED NOT NULL,
    points TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY(respective_match, user),
    CONSTRAINT match_fk FOREIGN KEY (respective_match) REFERENCES matches(match_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT user_fk FOREIGN KEY (user) REFERENCES user(user_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT rst_fk FOREIGN KEY (predicted_result) REFERENCES result(result_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;