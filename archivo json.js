import http from 'node:http';
const mysql = require('mysql2');
const fs  = require("fs");
const server = http.createServer(manejadorSolicitud);

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bike',
};

// Función para obtener los datos de la tabla
function obtenerDatos(callback) {
  // Conexión a la base de datos
  const pool = mysql.createPool(dbConfig);

  // Consulta a la tabla
  const query = 'SELECT * FROM staff';

  pool.query(query, (error, results) => {
    pool.end();

    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
}

// Función para manejar las solicitudes HTTP
function manejadorSolicitud(req, res) {
  // Si la solicitud es GET en la ruta /datos
  if (req.method === 'GET' && req.url === '/archivo json.js') {
    obtenerDatos((error, results) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al obtener datos de la base de datos');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
}

// Función para obtener y guardar los datos
function obtenerYGuardarDatos() {
  obtenerDatos((error, results) => {
    if (error) {
      console.error('Error al obtener datos de la base de datos:', error);
    } else {
      const jsonData = JSON.stringify(results,null,2);

      fs.writeFile('staff.json', jsonData, (error) => {
        if (error) {
          console.error('Error al guardar el archivo json:', error);
        } else {
          console.log('Archivo txt creado exitosamente: staff.json');
        }
      });
    }
  });
}

// Llamada a la función para obtener y guardar los datos
obtenerYGuardarDatos();

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

