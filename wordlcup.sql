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
    start_date DATETIME NOT NULL,
    background VARCHAR(128) NOT NULL,
    PRIMARY KEY(event_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO event (event_name, start_date, background) VALUES('World Cup Russia 2018', '2018-06-14 10:00:00', '/images/Events/wcbg.png');

CREATE TABLE quiniela(
    code CHAR(5) NOT NULL,
    name VARCHAR(32) NOT NULL,
    event_id INTEGER UNSIGNED NOT NULL,
    bet MEDIUMINT UNSIGNED NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT event_fk FOREIGN KEY (event_id) REFERENCES event(event_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

CREATE TABLE user(
    user_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    user_type TINYINT(1) UNSIGNED NOT NULL,
    username VARCHAR (32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL UNIQUE,
    password varchar(60) NOT NULL,
    quiniela_id CHAR(5),
    PRIMARY KEY (user_id),
    CONSTRAINT type_fk FOREIGN KEY (user_type) REFERENCES user_type(type_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT pool_fk FOREIGN KEY (quiniela_id) REFERENCES quiniela(code)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO user (user_type, username, password) VALUES (1, 'root', '$2b$11$3yi4iB.peepw.ig1N5fdAOsOcBpHo3A4DaapTbDjKMjDbJO.S64ua');

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

CREATE TABLE match_type(
    match_type_id TINYINT(1) UNSIGNED NOT NULL,
    name VARCHAR(32) NOT NULL,
    active TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (match_type_id)
) ENGINE=INNODB, CHARACTER SET=UTF8;

INSERT INTO match_type (match_type_id, name) VALUES (1, 'Fase de Grupos'), (2, 'Octavos'), (3, 'Cuartos'), (4, 'Semifinal'), (5, 'Final');

CREATE TABLE matches(
    match_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    home_team CHAR(3) NOT NULL,
    away_team CHAR(3) NOT NULL,
    local_goals TINYINT(2) UNSIGNED,
    away_goals TINYINT(2) UNSIGNED,
    match_date DATETIME,
    result_id TINYINT(1) UNSIGNED,
    match_status TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    match_type TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (match_id),
    CONSTRAINT home_fk FOREIGN KEY (home_team) REFERENCES team(code)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT away_fk FOREIGN KEY (away_team) REFERENCES team(code)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT res_fk FOREIGN KEY (result_id) REFERENCES result(result_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT mch_type_fk FOREIGN KEY (match_type) REFERENCES match_type(match_type_id)
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

INSERT INTO team VALUES('EGY', 'Egipto', '/images/Flags/EGY.png', 1);
INSERT INTO team VALUES('RUS', 'Rusia', '/images/Flags/RUS.png', 1);
INSERT INTO team VALUES('SAU', 'Arabia Saudita', '/images/Flags/SAU.png', 1);
INSERT INTO team VALUES('URY', 'Uruguay', '/images/Flags/URY.png', 1);

INSERT INTO team VALUES('IRN', 'Irán', '/images/Flags/IRN.png', 2);
INSERT INTO team VALUES('MAR', 'Marruecos', '/images/Flags/MAR.png', 2);
INSERT INTO team VALUES('PRT', 'Portugal', '/images/Flags/PRT.png', 2);
INSERT INTO team VALUES('ESP', 'España', '/images/Flags/ESP.png', 2);

INSERT INTO team VALUES('AUS', 'Australia', '/images/Flags/AUS.png', 3);
INSERT INTO team VALUES('DNK', 'Dinamarca', '/images/Flags/DNK.png', 3);
INSERT INTO team VALUES('FRA', 'Francia', '/images/Flags/FRA.png', 3);
INSERT INTO team VALUES('PER', 'Perú', '/images/Flags/PER.png', 3);

INSERT INTO team VALUES('ARG', 'Argentina', '/images/Flags/ARG.png', 4);
INSERT INTO team VALUES('HRV', 'Croacia', '/images/Flags/HRV.png', 4);
INSERT INTO team VALUES('ISL', 'Islandia', '/images/Flags/ISL.png', 4);
INSERT INTO team VALUES('NGA', 'Nigeria', '/images/Flags/NGA.png', 4);

INSERT INTO team VALUES('BRA', 'Brasil', '/images/Flags/BRA.png', 5);
INSERT INTO team VALUES('CRI', 'Costa Rica', '/images/Flags/CRI.png', 5);
INSERT INTO team VALUES('SRB', 'Serbia', '/images/Flags/SRB.png', 5);
INSERT INTO team VALUES('CHE', 'Suiza', '/images/Flags/CHE.png', 5);

INSERT INTO team VALUES('DEU', 'Alemania', '/images/Flags/DEU.png', 6);
INSERT INTO team VALUES('KOR', 'Corea del Sur', '/images/Flags/KOR.png', 6);
INSERT INTO team VALUES('MEX', 'Mexico', '/images/Flags/MEX.png', 6);
INSERT INTO team VALUES('SWE', 'Suecia', '/images/Flags/SWE.png', 6);

INSERT INTO team VALUES('BEL', 'Bélgica', '/images/Flags/BEL.png', 7);
INSERT INTO team VALUES('ENG', 'Inglaterra', '/images/Flags/ENG.png', 7);
INSERT INTO team VALUES('PAN', 'Panamá', '/images/Flags/PAN.png', 7);
INSERT INTO team VALUES('TUN', 'Túnez', '/images/Flags/TUN.png', 7);

INSERT INTO team VALUES('COL', 'Colombia', '/images/Flags/COL.png', 8);
INSERT INTO team VALUES('JPN', 'Japón', '/images/Flags/JPN.png', 8);
INSERT INTO team VALUES('POL', 'Polonia', '/images/Flags/POL.png', 8);
INSERT INTO team VALUES('SEN', 'Senegal', '/images/Flags/SEN.png', 8);

INSERT INTO matches (home_team, away_team, match_date) VALUES ('RUS', 'SAU', '2018-06-14 10:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('EGY', 'URY', '2018-06-15 07:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('MAR', 'IRN', '2018-06-15 10:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('PRT', 'ESP', '2018-06-15 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('FRA', 'AUS', '2018-06-16 05:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('ARG', 'ISL', '2018-06-16 08:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('PER', 'DNK', '2018-06-16 11:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('HRV', 'NGA', '2018-06-16 14:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('CRI', 'SRB', '2018-06-17 07:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('DEU', 'MEX', '2018-06-17 10:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('BRA', 'CHE', '2018-06-17 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('SWE', 'KOR', '2018-06-18 07:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('BEL', 'PAN', '2018-06-18 10:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('TUN', 'ENG', '2018-06-18 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('COL', 'JPN', '2018-06-19 07:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('POL', 'SEN', '2018-06-19 10:00:00');


INSERT INTO matches (home_team, away_team, match_date) VALUES ('RUS', 'EGY', '2018-06-19 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('PRT', 'MAR', '2018-06-20 07:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('URY', 'SAU', '2018-06-20 10:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('IRN', 'ESP', '2018-06-20 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('DNK', 'AUS', '2018-06-21 07:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('FRA', 'PER', '2018-06-21 10:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('ARG', 'HRV', '2018-06-21 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('BRA', 'CRI', '2018-06-22 07:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('NGA', 'ISL', '2018-06-22 10:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('SRB', 'CHE', '2018-06-22 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('BEL', 'TUN', '2018-06-23 07:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('KOR', 'MEX', '2018-06-23 10:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('DEU', 'SWE', '2018-06-23 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('ENG', 'PAN', '2018-06-24 07:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('JPN', 'SEN', '2018-06-24 10:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('POL', 'COL', '2018-06-24 13:00:00');


INSERT INTO matches (home_team, away_team, match_date) VALUES ('SAU', 'EGY', '2018-06-25 09:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('URY', 'RUS', '2018-06-25 09:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('IRN', 'PRT', '2018-06-25 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('ESP', 'MAR', '2018-06-25 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('AUS', 'PER', '2018-06-26 09:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('DNK', 'FRA', '2018-06-26 09:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('NGA', 'ARG', '2018-06-26 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('ISL', 'HRV', '2018-06-26 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('KOR', 'DEU', '2018-06-27 09:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('MEX', 'SWE', '2018-06-27 09:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('CHE', 'CRI', '2018-06-27 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('SRB', 'BRA', '2018-06-27 13:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('SEN', 'COL', '2018-06-28 09:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('JPN', 'POL', '2018-06-28 09:00:00');

INSERT INTO matches (home_team, away_team, match_date) VALUES ('ENG', 'BEL', '2018-06-28 13:00:00');
INSERT INTO matches (home_team, away_team, match_date) VALUES ('PAN', 'TUN', '2018-06-28 13:00:00');

INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('URY', 'PRT', '2018-06-30 13:00:00', 2);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('ESP', 'RUS', '2018-07-01 09:00:00', 2);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('BRA', 'MEX', '2018-07-02 09:00:00', 2);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('BEL', 'JPN', '2018-07-02 13:00:00', 2);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('SWE', 'CHE', '2018-07-03 09:00:00', 2);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('COL', 'ENG', '2018-07-03 13:00:00', 2);

INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('URY', 'FRA', '2018-07-06 09:00:00', 3);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('BRA', 'BEL', '2018-07-06 13:00:00', 3);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('SWE', 'ENG', '2018-07-07 09:00:00', 3);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('RUS', 'HRV', '2018-07-07 13:00:00', 3);

INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('FRA', 'BEL', '2018-07-10 13:00:00', 4);
INSERT INTO matches (home_team, away_team, match_date, match_type) VALUES ('HRV', 'ENG', '2018-07-11 13:00:00', 4);

DELIMITER //

CREATE TRIGGER update_points
AFTER UPDATE
    ON matches FOR EACH ROW

BEGIN
    UPDATE bet 
    SET bet.points = IF(NEW.result_id = bet.predicted_result, 3, 0)
    WHERE bet.respective_match = NEW.match_id;
END;    //

DELIMITER ;
