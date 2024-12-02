-- ----------------------------------------------------------------------------
-- This file stands for creating the tables in DataBase that are going to be
-- used in the application.
-------------------------------------------------------------------------------
DROP TABLE User;

-- Creating table User to store users.
CREATE TABLE User (
                      id BIGINT NOT NULL AUTO_INCREMENT,
                      userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
                      password VARCHAR(60) NOT NULL,
                      email VARCHAR(60) NOT NULL,
                      role TINYINT NOT NULL,

                      CONSTRAINT UserPK PRIMARY KEY (id),
                      CONSTRAINT UserNameAndEmailUniqueKey UNIQUE (userName, email)

) ENGINE = InnoDB;