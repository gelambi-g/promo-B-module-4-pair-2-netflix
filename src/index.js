const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// Conectar a la base de datos
async function connectDB(){
  const conex = await mysql.createConnection({
    host: 'localhost',
    user: 'admin',  // Usar 'admin' en lugar de 'root'
    password: 'NuevaContraseña123',  // La nueva contraseña que configuraste
    database: 'Netflix',
    port: 3306
  });
  console.log('✅ Conectado a la base de datos');
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


// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});



//endpoints que devuelva las peliculas
server.get('/movies', async(req, res) => {
  const connection = await connectDB();
  const sqlSelect = 'SELECT * FROM movies';

  const [result] = await connection.query(sqlSelect);
 console.log(result)
connection.end();


  if (result.length === 0){
    res
      .status(404)
      .json({
        status: 'error',
        message: 'No se ha encontrado el recurso solicitado',
      });
  } else {
    res.status(200).json({
      status: 'success',
      message: result,
    });
  }

 
});

