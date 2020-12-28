# Instalación
Clonar el repositorio, ejecutar "npm install" para instalar dependencias, renombrar .env.example a .env, cambiar SECRET y KEY, agregar la base de datos en DATABASE. 

El puerto por defecto es 3000, el puerto en el .env es 5000, se accede: http://localhost:5000 (donde 5000 es el puerto en el .env).

Para correr el proyecto "DEBUG=myapp:* npm start" para Linux / MacOS o "set DEBUG=myapp:* & npm start" para windows (corre con node) o "npm run dev" en cualquier SO (corre con nodemon).

Utilizar [Postman](https://www.postman.com/) u otro cliente similar.

# Rutas

## Registrar usuario

POST http://localhost:5000/api/users/new

Enviar un json con name,email,password. Ejemplo:

```json
{
    "name":"Mi Nombre",
    "email":"mi@email.com",
    "password":"123456"
}
```
La respuesta es parecida a esta:

```json
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTllNmM1ZmIwNDRmMTk5OGMyODQ2MiIsImlhdCI6MTYwOTE2NDQ4NSwiZXhwIjoxNjA5MjUwODg1fQ.Xv3yDezff88JBeHfotkt8gF2rXWXWhZpR389k1TQakI"
}
``` 

Este token ya se puede usar para iniciar sesión.

## Login

POST http://localhost:5000/api/users/login
 
 Enviar un json con email y password para iniciar sesión. Ejemplo:

```json
 {
     "email":"email@email",
     "password":"123456"
 }
 ```
 La respuesta es parecida a esta:

```json
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTllNmM1ZmIwNDRmMTk5OGMyODQ2MiIsImlhdCI6MTYwOTE2NDQ4NSwiZXhwIjoxNjA5MjUwODg1fQ.Xv3yDezff88JBeHfotkt8gF2rXWXWhZpR389k1TQakI"
}
``` 

## Panel

GET http://localhost:5000/api/users/panel

Enviar Header:

```bash
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTllNmM1ZmIwNDRmMTk5OGMyODQ2MiIsImlhdCI6MTYwOTE2NDQ4NSwiZXhwIjoxNjA5MjUwODg1fQ.Xv3yDezff88JBeHfotkt8gF2rXWXWhZpR389k1TQakI
```
El valor de x-access-token es el token generado en el login o registro.

La respuesta es como esta:

```json
{
    "decode": {
        "id": "5fe9e6c5fb044f1998c28462",
        "iat": 1609164493,
        "exp": 1609250893
    },
    "msg": "Bienvenido"
}
```

## Usuarios

GET http://localhost:5000/api/users

En esta ruta se pueden ver los usuarios registrados, incluso el password, pero esta hasheado.

Ejemplo:

```json
{
    "users": [
        {
            "_id": "5fe9e6c5fb044f1998c28462",
            "name": "Juan Iriart",
            "email": "mi@email.com",
            "password": "$2b$12$q9ALa1LD.1d2u8s0jwx/rOY9Lk5fTE0bIIY3QrzueeBc6pG5U8FU6",
            "created": "2020-12-28T14:08:05.322Z",
            "__v": 0
        }
    ]
}
```

# Notas

El proyecto esta creado con [Express Generator](https://expressjs.com/es/starter/generator.html).

El proyecto usa [MongoDB](https://www.mongodb.com/), se puede instalar en local (Community Server):

* Descargar instalador para [Windows](https://www.mongodb.com/try/download/community?tck=docs_server). Tutorial para instalación en [Windows](https://www.youtube.com/watch?v=2KMQdqDk9e8&t=355s&ab_channel=Fazt).
* Instalar [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/). Hay diferentes paquetes segun distro usada (Red Hat, Ubuntu, Debian, etc).
* Instalar en [MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

Introducción a MongoDB: [Video](https://www.youtube.com/watch?v=lWMemPN9t6Q&t=1584s&ab_channel=Fazt)