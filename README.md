# Cliente API - Gestión de Clientes

Este proyecto es una aplicación web para la gestión de clientes desarrollada con React (frontend) y Node.js con Express (backend), utilizando MySQL como base de datos. La aplicación permite registrar nuevos clientes y visualizar la lista de clientes existentes.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:
- **Backend**: API REST desarrollada con Node.js y Express (carpeta server)
- **Frontend**: Interfaz de usuario desarrollada con React (carpeta client)

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- MySQL (v5.7 o superior)
- MySQL Workbench (recomendado para la gestión de la base de datos)

## Configuración de la Base de Datos

1. Abrir MySQL Workbench y conectarse a la instancia local de MySQL
2. Crear una nueva base de datos llamada `clienteapi`:
   ```sql
   CREATE DATABASE clienteapi;
   ```
3. No es necesario crear tablas manualmente, ya que el backend se encargará de crearlas automáticamente al iniciar

## Instalación y Ejecución del Backend

1. Clonar el repositorio
2. Navegar a la carpeta del backend (carpeta server)
3. Instalar dependencias:
   ```bash
   npm install express mysql2 cors body-parser
   ```
4. Configurar la conexión a la base de datos en `index.js` si es necesario:
   ```javascript
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',      // Cambiar a tu usuario de MySQL
     password: 'tu_contraseña',      // Cambiar a tu contraseña de MySQL
     database: 'clienteapi'
   });
   ```
5. Iniciar el servidor:
   ```bash
   node index.js
   ```
6. El servidor estará en funcionamiento en `http://localhost:5000`

## Instalación y Ejecución del Frontend

1. Navegar a la carpeta del frontend (carpeta client)
2. Instalar dependencias:
   ```bash
   npm install react react-dom react-scripts
   ```
3. Iniciar la aplicación:
   ```bash
   npm start
   ```
4. La aplicación estará disponible en `http://localhost:3000`

## Funcionalidades

- **Registrar clientes**: Permite agregar nuevos clientes con nombre, email y dirección
- **Visualizar clientes**: Muestra la lista de todos los clientes registrados
- **Validación de datos**: Verifica que no se dupliquen correos electrónicos

## API Endpoints

- `GET /api/clients`: Obtiene todos los clientes
- `POST /api/clients`: Registra un nuevo cliente

## Verificación de Funcionamiento

1. Acceder a `http://localhost:3000` en el navegador
2. Se mostrará la interfaz de "Viajes Colombia" con el módulo de clientes
3. Completar el formulario de "Nuevo Cliente" y hacer clic en "Agregar Cliente"
4. El cliente se agregará a la base de datos y aparecerá en la lista de clientes
5. Hacer clic en "Listar Clientes" para actualizar la lista

## Solución de Problemas Comunes

- **Error de conexión a la base de datos**: Verificar que MySQL esté en ejecución y que las credenciales en `index.js` sean correctas
- **El backend no se inicia**: Verificar que el puerto 5000 no esté en uso
- **El frontend no puede conectarse al backend**: Verificar que el backend esté en ejecución y que la URL en `App.js` sea correcta (`const API_URL = 'http://localhost:5000'`)
- **Error al agregar cliente**: Verificar que el correo electrónico no esté ya registrado en la base de datos

## Notas Adicionales

- La tabla `cliente` se crea automáticamente al iniciar el backend con la siguiente estructura:
  ```sql
  CREATE TABLE IF NOT EXISTS cliente (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
  )
  ```
- La aplicación utiliza CORS para permitir la comunicación entre el frontend y el backend
- El diseño es responsive y se adapta a diferentes tamaños de pantalla
