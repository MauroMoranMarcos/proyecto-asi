-- ----------------------------------------------------------------------------
-- In this file we can put INSERT statements to introduce initial data to our
-- initial DataBase state.
-------------------------------------------------------------------------------
-- Inserting ADMIN_STAFF user to use its CU. Username: admin Password: admin
INSERT INTO User(userName, password, email, role) VALUES ('admin', '$2a$10$Dt3f1yw.WmD5RWDuNX8FcepE4s34W6De8EWUew/vYeS76ZmzrEFEO', 'ware@house.es', 1);
