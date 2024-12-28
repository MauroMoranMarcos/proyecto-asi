-- ----------------------------------------------------------------------------
-- This file stands for creating the tables in DataBase that are going to be
-- used in the application.
-------------------------------------------------------------------------------
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS OrderBox;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS ItemBox;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Supplier;
DROP TABLE IF EXISTS Warehouse;

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

    CONSTRAINT WarehousePK PRIMARY KEY (id),
    CONSTRAINT WarehouseNameUniqueKey UNIQUE (name)

) ENGINE = InnoDB;

CREATE TABLE Supplier (

    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,

    CONSTRAINT SupplierPK PRIMARY KEY (id)

) ENGINE = InnoDB;

-- Creating table Item to store info about items
CREATE TABLE Item (

    id BIGINT NOT NULL AUTO_INCREMENT,
    itemName VARCHAR(60) NOT NULL,
    referenceCode VARCHAR(300) NOT NULL,
    barCode VARCHAR(300) NOT NULL,
    manufacturerRef VARCHAR(300) NOT NULL,
    imgFile LONGBLOB,
    supplierId BIGINT NOT NULL,

    CONSTRAINT ItemPK PRIMARY KEY (id),
    CONSTRAINT ItemSupplierIdFK FOREIGN KEY (supplierId)
        REFERENCES Supplier(id)

) ENGINE = InnoDB;

-- Creating table ItemBox to store info about boxes with its items that are stored in a Warehouse
CREATE TABLE ItemBox (

    id BIGINT NOT NULL AUTO_INCREMENT,
    numItems BIGINT NOT NULL,
    currentNumItems BIGINT NOT NULL,
    itemId BIGINT NOT NULL,
    warehouseId BIGINT NOT NULL,

    CONSTRAINT ItemBoxPK PRIMARY KEY (id),
    CONSTRAINT ItemBoxItemIdFK FOREIGN KEY (itemId)
        REFERENCES Item(id) ON DELETE CASCADE,
    CONSTRAINT ItemBoxWarehouseIdFK FOREIGN KEY (warehouseId)
        REFERENCES Warehouse(id)

) ENGINE = InnoDB;

-- Creating table Order to store info about orders
-- State value is 0 when the order is a draft, 1 when the order is sent to admins, and 2 when the order is sent to the supplier
-- (Falta en la especificación el caso de uso de marcar pedido como comprado, aunque la compra pone al final del documento
-- que se hace a través de la web de los proveedores, en el sistema entiendo que hay que marcarlo de alguna manera, ya que
-- además se indica que se muestre la fecha en la que se realizó el pedido)
CREATE TABLE `Order` (

    id BIGINT NOT NULL AUTO_INCREMENT,
    orderDate DATE,
    state TINYINT NOT NULL,

    CONSTRAINT OrderPK PRIMARY KEY (id)

) ENGINE = InnoDB;

CREATE TABLE OrderBox (

    id BIGINT NOT NULL AUTO_INCREMENT,
    numBoxes INT NOT NULL,
    orderId BIGINT NOT NULL,
    boxId BIGINT NOT NULL,

    CONSTRAINT OrderBoxPK PRIMARY KEY (id),
    CONSTRAINT OrderBoxOrderIdFK FOREIGN KEY (orderId)
        REFERENCES `Order`(id),
    CONSTRAINT OrderBoxBoxIdFK FOREIGN KEY (boxId)
        REFERENCES ItemBox(id)
)