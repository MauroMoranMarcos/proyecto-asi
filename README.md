#  Proyecto ASI Hermenegildo e Hijos S.L.

## Authors

- Manuel Pérez Sueiro
- manuel.psueiro@udc.es

- Álvaro Argibay Pastoriza
- alvaro.argibayp@udc.es

- Manuel Ramos Lloves
- manuel.lloves@udc.es

- Óscar Castillo Fernández
- oscar.castillo@udc.es

- Juan Villaverde Rodríguez
- juan.villaverde.rodriguez@udc.es

- Mauro Morán Marcos
- mauro.moranm@udc.es

## Database creation

```
Start Mysql server if not running (e.g. mysqld).

mysqladmin -u root create proyectoasi -p

mysql -u root -p
    CREATE USER 'proyectoasi'@'localhost' IDENTIFIED BY 'proyectoasi';
    GRANT ALL PRIVILEGES ON proyectoasi.* to 'proyectoasi'@'localhost' WITH GRANT OPTION;
    exit
```

## Run

```
cd backend
mvn sql:execute (only first time to create tables)
mvn spring-boot:run

cd frontend
npm install (only first time to download libraries)
npm start
```
