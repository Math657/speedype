SET NAMES utf8;

SET @@session.time_zone = "+00:00";

DROP TABLE IF EXISTS Highscores;

CREATE TABLE Players (
    id SMALLINT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
    player_name VARCHAR(40) UNIQUE NOT NULL,
    score SMALLINT,
    created_at DATETIME default CURRENT_TIMESTAMP
) 
ENGINE=INNODB;

-- SOURCE C:/Projects/speedype/DB.sql