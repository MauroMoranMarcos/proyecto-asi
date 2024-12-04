-- ----------------------------------------------------------------------------
-- In this file we can put INSERT statements to introduce initial data to our
-- initial DataBase state.
-------------------------------------------------------------------------------
-- Inserting WAREHOUSE_STAFF user to use its CU. Username: warehouse Password: warehouse
INSERT INTO User(userName, password, email, role) VALUES ('warehouse', '$2a$10$QBWLNv9Mq7NfmggktfrRQerq2vca/ybc5CY6NXB51JL06rgwiznyG', 'ware@house.es', 0);
