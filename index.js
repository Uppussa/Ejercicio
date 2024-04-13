import http from 'node:http'
import fs from 'fs/promises';
import path from 'node:path'
import {pool} from './conexion.js';

const server= http.createServer(manejarSolicitud)
const port = 3000
server.listen(3000,`Servervidor ejecutandose en el puerto: http://localhost:${port}`)

function manejarSolicitud(solicitud,respuesta){
    try {
        const url = solicitud.url
        const metodo = solicitud.method
        if (metodo === 'GET') {
            switch (url) {
                case '/':
                    const readindex = path.resolve('./index.html')
                    const index= fs.readFile(readindex,'utf8')
                    respuesta.end(index)
                    break;
                case '/empleados':
                    
                break;
                default:
                    respuesta.writeHead(404,{'Content-Type': 'application'})
                    respuesta.end('Pagina no encontrada')
                    break;
            }
        }
        if (metodo === 'POST') {
            switch (url) {
                case '/empleados/import':
                    
                    break;
                case '/empleados/import':
                    
                break;
                default:
                    respuesta.writeHead(404,{'Content-Type': 'application'})
                    respuesta.end('Pagina no encontrada')
                    break;
            }
        }
    } catch (error) {
        
    }
}
