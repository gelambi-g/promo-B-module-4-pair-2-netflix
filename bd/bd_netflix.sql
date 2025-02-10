CREATE DATABASE Netflix;
USE Netflix;
CREATE TABLE movies (
	idMovies INT auto_increment primary key not null,
    title varchar (45) not null,
    genre varchar (45) not null,
    image varchar (1000) not null,
    category varchar (45) not null,
    year smallint not null
);

CREATE TABLE Users (
	idUser INT auto_increment primary key not null,
    user varchar (45) not null,
    password varchar (45) not null,
    name varchar (45) not null,
    email varchar (45) not null,
    plan_details varchar (45) not null
);

CREATE TABLE Actors (
	idActor INT auto_increment primary key not null,
    name varchar (45) not null,
    lastname varchar (45) not null,
    country varchar (45) not null,
    birthday date 
);