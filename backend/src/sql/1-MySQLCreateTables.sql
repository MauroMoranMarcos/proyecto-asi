-- ----------------------------------------------------------------------------
-- This file stands for creating the tables in DataBase that are going to be
-- used in the application.
-------------------------------------------------------------------------------
DROP TABLE User;
DROP TABLE Box;
DROP TABLE Warehouse;

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

-- Creating table Warehouse to store info about the Warehouses of the company
CREATE TABLE Warehouse (

    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,

    CONSTRAINT WarehousePK PRIMARY KEY (id)

) ENGINE = InnoDB;

-- Creating table Box to store info about Boxes with its items that are stored in a Warehouse
CREATE TABLE Box (

    id BIGINT NOT NULL AUTO_INCREMENT,
    itemName VARCHAR(60) NOT NULL,
    numItems BIGINT NOT NULL,
    referenceCode VARCHAR(300) NOT NULL,
    barCode VARCHAR(300) NOT NULL,
    manufacturerRef VARCHAR(300) NOT NULL,
    supplier VARCHAR(120) NOT NULL,
    warehouseId BIGINT NOT NULL,

    CONSTRAINT BoxPK PRIMARY KEY (id),
    CONSTRAINT BoxWarehouseIdFK FOREIGN KEY (warehouseId)
        REFERENCES Warehouse(id)

)