select * from movies;
select * from Users;
select * from Actors;


SELECT title, genre FROM Movies WHERE year  >1990;
SELECT * From Movies WHERE category= 'Top 10';

SELECT * FROM Actors WHERE birthday BETWEEN 1950 AND 1960;
SELECT name, lastname FROM Actors WHERE country= 'Estados Unidos';