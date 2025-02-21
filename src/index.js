require('dotenv').config();
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
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSDB,
    database: process.env.DATADB,
  });
  console.log('Conectado a la base de datos');
  conex.connect();
  return conex;
}

//endpoints que devuelva las peliculas
server.get('/movies', async(req, res) => {
  const connection = await connectDB();
  //4.8 peticiones con parametros
  
  // console.log(sqlSelect);
  const {genre} = req.query

  console.log("🔎 Valor de genre recibido:", genre);

  let sqlSelect = ''

  if(!genre){//MODIFICADO PARA QUE DEVUELVA TODAS LAS PELICULAS
    sqlSelect = 'SELECT * FROM movies ';
  }else{
    sqlSelect = 'SELECT * FROM movies WHERE genre = ?';
  }
  console.log("Consulta SQL:", sqlSelect);
  const [result] = await connection.query(sqlSelect, [genre]);
  console.log("Resultado de la consulta:", result);

connection.end();

    res.status(200).json({
      status: 'success',
      movies: result,
    });
});

// Iniciar el servidor
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

