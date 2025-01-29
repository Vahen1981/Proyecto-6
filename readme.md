# Proyecto 6: Aplicación Backend con Autenticación
## Descripción
Este proyecto es una aplicación de backend desarrollada con Node.js y Express, que implementa un sistema de autenticación basado en JWT (JSON Web Tokens). La aplicación permite la gestión de usuarios y ropa, incluyendo registro, inicio de sesión y actualización de datos de usuario. Además, permite CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de productos de ropa.

Estructura del Proyecto
La estructura de directorios del proyecto es la siguiente:
```
├─ .env                # Variables de entorno
├─ .gitignore          # Archivos y directorios a ignorar por Git
├─ README.md           # Este archivo
├─ controllers         # Controladores de las rutas
│  ├─ clothesController.js  # Lógica para la gestión de ropa
│  └─ userController.js    # Lógica para la gestión de usuarios
├─ config              # Configuración de la base de datos
│  ├─ db.js            # Conexión a MongoDB
├─ middleware          # Middleware de autorización
│  └─ Authorization.js # Middleware para la verificación de JWT
├─ models              # Modelos de datos
│  ├─ Clothes.js       # Esquema de ropa
│  └─ User.js          # Esquema de usuario
├─ routes              # Rutas de la API
│  ├─ clothesRoutes.js # Rutas para ropa
│  └─ userRoutes.js    # Rutas para usuarios
└─ Server.js           # Configuración y ejecución del servidor
```

## Instalación
Clona el repositorio:

```
git clone https://github.com/Vahen1981/Proyecto-6.git
cd proyecto-6
```

Instala las dependencias:
```
npm install
```

Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno:

```
MONGODB_URI=tu_conexion_de_mongodb
SECRET=tu_clave_secreta_jwt
PORT=8000
```

## Uso
Inicia el servidor:
```
npm start
La API estará disponible en http://localhost:8000
```

## Endpoints
### Usuarios

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

La autenticación de usuarios se maneja a través de JWT. Para acceder a las rutas protegidas, el usuario debe incluir un token en el encabezado de autorización como `Bearer <token>`.
