require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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


// endpoint singup
server.post("/signup", async (req, res) => {
  
  //conectar a la base de datos
  const connection = await connectDB();

  //recibir los datos del ususario
  const {email, password} = req.body;

  //comprobar si el email existe
  const selectEmail = 'SELECT email From users WHERE email = ?';
  const [emailResult] = await connection.query(selectEmail, [email]);

  //Hacer un condicional para verificar la longitud del array
  if (emailResult.length === 0){
    //antes de hacer el insert encrptar la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);
    //insertar el usuario
    const insertUser =
      'INSERT INTO users (email, password) value (?,?)';
    const [result] = await connection.query(insertUser, [email, passwordHashed]);
    res.status(201).json({success: true, id: result.insertId });
  }else{
    //Si el ususario ya existe responder con un mensaje de error
    res.status(200).json({success:false, menssage: 'Usuario ya existe'});
  }
});



// Iniciar el servidor
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

server.use(express.static('./css'))