# Proyecto 6: Aplicación Backend con Autenticación
## Descripción
Este proyecto es una aplicación backend desarrollada con Node.js y Express, que implementa autenticación mediante JWT (JSON Web Tokens). Permite la gestión de usuarios y productos de ropa, ofreciendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para ambos:

- **Usuarios:** Registro, inicio de sesión, actualización de datos y eliminación de cuentas.
- **Productos de ropa:** Creación, consulta, actualización y eliminación de prendas.

## Tecnologías Utilizadas

Este proyecto utiliza una serie de tecnologías y herramientas para su desarrollo. A continuación se enumeran las principales:

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express**: Framework web para Node.js que facilita la creación de API RESTful.
- **MongoDB Atlas**: Servicio de base de datos NoSQL en la nube para almacenar información de usuarios y productos.
- **Mongoose**: Biblioteca para modelar objetos MongoDB en Node.js.
- **JWT (JSON Web Tokens)**: Tecnología para la autenticación de usuarios mediante tokens seguros.
- **bcryptjs**: Librería para el cifrado y descifrado de contraseñas.
- **dotenv**: Permite gestionar las variables de entorno desde un archivo `.env`.
- **CORS**: Middleware para habilitar el intercambio de recursos entre dominios (Cross-Origin Resource Sharing).
- **Railway**: Plataforma de despliegue y hosting para aplicaciones backend.


## Estructura del Proyecto
La estructura de directorios del proyecto es la siguiente:
```
├─ .env                     # Variables de entorno
├─ .gitignore               # Archivos y directorios a ignorar por Git
├─ README.md                # Este archivo
├─ controllers              # Controladores de las rutas
│  ├─ clothesController.js  # Lógica para la gestión de ropa
│  └─ userController.js     # Lógica para la gestión de usuarios
├─ config                   # Configuración de la base de datos
│  ├─ db.js                 # Conexión a MongoDB
├─ middleware               # Middleware de autorización
│  └─ Authorization.js      # Middleware para la verificación de JWT
├─ models                   # Modelos de datos
│  ├─ Clothes.js            # Esquema de ropa
│  └─ User.js               # Esquema de usuario
├─ routes                   # Rutas de la API
│  ├─ clothesRoutes.js      # Rutas para ropa
│  └─ userRoutes.js         # Rutas para usuarios
└─ Server.js                # Configuración y ejecución del servidor
```

## Uso
El servidor está desplegado en Railway y se puede acceder a través de la siguiente URL:  
[https://proyecto-6-production.up.railway.app](https://proyecto-6-production.up.railway.app)

## Endpoints
### Usuarios
Para las solicitudes de verificación(`/verify`), actualización de datos de usuario(`/update`) y eliminar usuario (`/delete`) es necesario haber iniciado sesión antes e incluir el token al realizar la solicitud. Luego de iniciar sesión el token expirará en 3 minutos.

- `POST /api/user/register`: Registra un nuevo usuario.  
  **Body**: `{ name, email, password }`  
  **Respuesta**: Información del usuario creado (sin el password).

- `POST /api/user/login`: Inicia sesión y obtiene un token JWT.  
  **Body**: `{ email, password }`  
  **Respuesta**: Token JWT.

- `GET /api/user/verify`: Verifica el usuario actual (requiere autenticación).  
  **Respuesta**: Información del usuario verificado.

- `PUT /api/user/update`: Actualiza los datos del usuario (requiere autenticación).  
  **Body**: `{ name, email, password }`  
  **Respuesta**: Información actualizada del usuario.

- `DELETE /api/user/delete`: Elimina el usuario (requiere autenticación).  
  **Respuesta**: Mensaje de confirmación.

### Ropa

- `POST /api/clothes/create-clothes`: Crea una nueva prenda de ropa.  
  **Body**: `{ clothingType, brand, size, price, description }`  
  **Respuesta**: Detalles de la prenda creada.

- `GET /api/clothes/all-clothes`: Obtiene todas las prendas de ropa.  
  **Respuesta**: Lista de todas las prendas.

- `GET /api/clothes/get-clothes/:id`: Obtiene una prenda de ropa por su ID.  
  **Respuesta**: Detalles de la prenda.

- `PUT /api/clothes/update-clothes/:id`: Actualiza una prenda de ropa.  
  **Body**: `{ clothingType, brand, size, price, description }`  
  **Respuesta**: Detalles de la prenda actualizada.

- `DELETE /api/clothes/delete-clothes/:id`: Elimina una prenda de ropa.  
  **Respuesta**: Mensaje de confirmación.

## Middleware de Autenticación

La autenticación de usuarios se maneja a través de JWT. Para acceder a las rutas protegidas, el usuario debe incluir un token en el encabezado de autorización `Bearer` o `Token`.
