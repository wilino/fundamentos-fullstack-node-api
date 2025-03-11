//Importar Express
const express = require('express');
const app = express();

//Hacer que Express sepa que vamos a recibir y enviar JSON
app.use( express.json() );

//Puerto donde levanta el servidor
const port = 3000;

//Datos de prueba: una arreglo de objetos
let users = [
  { id:1, nombre:'Juan', edad: 28 },
  { id:2, nombre:'Ana', edad: 22 },
  { id:3, nombre:'Luis', edad: 35 }
];

//Endpoint: Inicio
app.get( '/', (req, res) => {
  res.send( 'Bienvenido a la API REST con Express.js' );
});

//Endpoint: Obtener todos los usuarios
app.get( '/api/users', (req, res) => {
  res.status(200).json(users);
});

//Endpoint: Obtener un usuario por ID
app.get( '/api/users/:id', (req, res) => {
  const userId = parseInt( req.params.id );
  const user = users.find( user => user.id === userId );
  res.status(200).json( user );
});

//Endpoint: Crear un usuario
app.post( '/api/users', (req, res) => {
  const { nombre, edad } = req.body;
  const newUser = {
    id: users.length + 1,
    nombre,
    edad,
  };
  users.push( newUser );
  res.status(201).json(newUser);
});

//Endpoint:actualizar usuario
app.put( '/api/users/:id' , (req, res) => {
  const user = users.find( user => user.id === parseInt(req.params.id) );
  if( !user ) return res.status(404).send('Usuario no encontrado');

  const { nombre, edad } = req.body;
  user.nombre = nombre || user.nombre;
  user.edad = edad || user.edad;
  res.status(200).json( user );
});

//Endpoint: Eliminar usuarios
app.delete( '/api/users/:id', (req,res) => {

  const indexUser  = users.findIndex( user => user.id === parseInt(req.params.id));
  if( indexUser === -1 ) return res.status(404).send('Usuario no encontrado');

  const deleteUser = users.splice( indexUser, 1 );
  res.status(200).json( deleteUser );

});

app.listen( port, () => {
  console.log( `Server running on http//:localhost:${port}` );
});