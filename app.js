// Importar la biblioteca Express para crear un servidor web
const express = require('express');
const app = express();

// Configurar Express para manejar solicitudes JSON
app.use(express.json());

// Puerto donde se ejecutará el servidor
const port = 3000;

// Datos iniciales: un arreglo de objetos que representan usuarios
let users = [
  { id: 1, nombre: 'Juan', edad: 28 },
  { id: 2, nombre: 'Ana', edad: 22 },
  { id: 3, nombre: 'Luis', edad: 35 }
];

// Endpoint para la página de inicio
// Devuelve un mensaje de bienvenida cuando se accede a la raíz ('/') del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido a la API REST con Express.js');
});

// Endpoint para obtener todos los usuarios
// Devuelve la lista completa de usuarios en formato JSON
app.get('/api/users', (req, res) => {
  res.status(200).json(users); // Respuesta con código de estado 200 (OK)
});

// Endpoint para obtener un usuario específico por su ID
// Busca el usuario en el arreglo 'users' y lo devuelve
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Obtener el ID de los parámetros de la URL
  const user = users.find(user => user.id === userId); // Buscar usuario por ID
  res.status(200).json(user); // Respuesta con código de estado 200 (OK)
});

// Endpoint para crear un nuevo usuario
// Recibe datos en el cuerpo de la solicitud y agrega un nuevo usuario al arreglo
app.post('/api/users', (req, res) => {
  const { nombre, edad } = req.body; // Extraer datos del cuerpo de la solicitud
  const newUser = {
    id: users.length + 1, // Generar un nuevo ID basado en la longitud del arreglo
    nombre,
    edad,
  };
  users.push(newUser); // Agregar el nuevo usuario al arreglo
  res.status(201).json(newUser); // Respuesta con código de estado 201 (Creado)
});

// Endpoint para actualizar un usuario existente
// Busca un usuario por su ID y actualiza sus datos
app.put('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id)); // Buscar usuario
  if (!user) return res.status(404).send('Usuario no encontrado'); // Error si no existe

  const { nombre, edad } = req.body; // Extraer datos del cuerpo de la solicitud
  user.nombre = nombre || user.nombre; // Actualizar nombre si se proporciona
  user.edad = edad || user.edad; // Actualizar edad si se proporciona
  res.status(200).json(user); // Respuesta con código de estado 200 (OK)
});

// Endpoint para eliminar un usuario
// Busca un usuario por su ID y lo elimina del arreglo
app.delete('/api/users/:id', (req, res) => {
  const indexUser = users.findIndex(user => user.id === parseInt(req.params.id)); // Buscar índice
  if (indexUser === -1) return res.status(404).send('Usuario no encontrado'); // Error si no existe

  const deleteUser = users.splice(indexUser, 1); // Eliminar usuario del arreglo
  res.status(200).json(deleteUser); // Respuesta con código de estado 200 (OK)
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});