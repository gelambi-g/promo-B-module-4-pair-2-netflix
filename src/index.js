const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
//plantillas ejs
server.set('view engine', 'ejs');
require('dotenv').config();

// Conectar a la base de datos
async function connectDB(){
  const conex = await mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSDB,
    database: process.env.DATADB,
  });
  console.log('Conectado a la base de datos');
  conex.connect();
  return conex;
}

//datos listado de peliculas
// const fakeMovies = [
//   {
//     id: 1,
//     title: "Wonder Woman",
//     genre: "Action",
//     image:
//       "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
//     category: "Superhero",
//     year: 2017,
//     director: "Patty Jenkins",
//   },
//   {
//     id: 2,
//     title: "Inception",
//     genre: "Science Fiction",
//     image:
//       "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
//     category: "Thriller",
//     year: 2010,
//     director: "Christopher Nolan",
//   },
// ];


//endpoints que devuelva las peliculas
server.get('/movies', async(req, res) => {
  const connection = await connectDB();
  //4.8 peticiones con parametros
  
  // console.log(sqlSelect);
  const {genre} = req.query
  let sqlSelect = ''

  if(genre === ''){
    sqlSelect = 'SELECT * FROM movies ';
  }else{
    sqlSelect = 'SELECT * FROM movies WHERE genre = ?';
  }
  
  const [result] = await connection.query(sqlSelect, [genre]);


connection.end();

    res.status(200).json({
      status: 'success',
      movies: result,
    });
});

//24feb renderizar motor de plantillas


//24Feb plantillas
//endpoint
server.get('/movie/:movieId', async (req, res) => { 
  const {movieId} = req.params;

  const connection = await connectDB();
  const sql = 'SELECT * FROM movies WHERE idMovies = ?'
  const [result] = await connection.query(sql, [movieId])
 
  const foundMovie = result[0]
  console.log(foundMovie)

  connection.end();

  res.render('movie', {movie: foundMovie})

 })






// Iniciar el servidor
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

