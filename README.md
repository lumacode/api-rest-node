
DOCUMENTACIÓN API REST – NODE (express), MONGODB y JWT – V. 1.0.0

Descripción: un pequeño backend de un blog con fines didácticos.  Se podrán registrar usuarios, loguearse obteniendo un JWT, crear artículos, listar todos los artículos, listar un artículo en particular,  editar artículos, borrar artículos y buscar artículos. 
En la próxima versión se adicionará una funcionalidad para subir las imágenes. 
Autor: Luis Albanese

=> INICIANDO LA APLICACIÓN
Para iniciar el proyecto deberá instalar los módulos de node y proceder a crear un archivo .env en el directorio raíz del proyecto, el mismo deberá contener las siguientes variables de entorno, según los datos que correspondan:
USER=localhost
PASSWORD=""
DBNAME=api_rest_blog
TOKEN_SECRET=tuclavesecreta

=> RECURSOS DE LA API REST 
A continuación se listarán todos los endpoints de la API REST con json de ejemplo tanto de petición como de respuesta. Se sigue el lineamiento REST siendo utilizados los métodos GET, POST, PUT Y DELETE.
--

Para crear un nuevo usuario enviar un json a http://localhost:3900/api/user/register
METODO POST 
{
	"name": "Miguel Perez"
	"email": "miguel@perez.com",
	"password": "123456"
}
*Devuelve mensaje success y el id del usuario registrado, en caso de que se intente registrar un correo que ya existe en la base de datos devuelve un error indicando esa situación. 
Respuesta de ejemplo: 
{
    "status": "success",
    "userId": "5fd44b35dfef725854533185"
}

--

Para loguearse y obtener jwt enviar un json a http://localhost:3900/api/user/login
METODO POST
{
	"email": "albaneseluism@gmail.com",
	"password": "38166409"
}
*Devuelve jwt 
Respuesta de ejemplo: 
{
    "error": null,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpcyBBbGJhbmVzZSIsImlkIjoiNWY5OWQ0MmM0N2QwNDQ0ZWI4Yzc0Yzc3IiwiaWF0IjoxNjA3NzQ0OTk1fQ.a6UROFsVBLAEF01TvgKQqqIuSsIXNmb52Vlb0sNhycc"
    }
}

--

Para crear un nuevo artículo enviar un json a http://localhost:3900/api/save
METODO POST – RUTA PROTEGIDA CON JWT 
Enviar en headers un token dentro de la clave "Authorization" 
{
    "title":"Hola es un nuevo articulo de prueba",
    "content": "Contenido de prueba desde postman"
}
Respuesta de ejemplo: 
{
    "status": "success",
    "article": {
        "_id": "5fd43f17721de75a30ffda82",
        "date": "2020-12-12T03:55:03.098Z",
        "title": "Hola es un nuevo articulo de prueba",
        "content": "Contenido de prueba desde postman",
        "image": null,
        "__v": 0
    }
}

-- 

Para editar un artículo enviar un json a http://localhost:3900/api/article/id
METODO PUT – RUTA PROTEGIDA CON JWT 
Enviar en headers un token dentro de la clave "Authorization" 
{
    "title":"Estoy editando el articulo",
    "content": "Contenido de prueba del articulo editado desde postman"
}
Respuesta de ejemplo: 
{
    "status": "success",
    "article": {
        "_id": "5fb5322883b8700be4d9877c",
        "date": "2020-11-18T14:39:36.078Z",
        "title": "Editando el articulo 1",
        "content": "Contenido de prueba desde postman",
        "image": "64uG0At57wP1F-_YKvl5jW-f.jpeg",
        "__v": 0
    }
}

--

Para listar todos los artículos enviar petición a http://localhost:3900/api/articles
METODO GET 
Respuesta de ejemplo:
{
    "status": "success",
    "articles": [
        {
            "_id": "5fb5322883b8700be4d9877c",
            "date": "2020-11-18T14:39:36.078Z",
            "title": "Nuevo articulo desde vue con axios!",
            "content": "Hola espero que te guste mi blog",
            "image": "64uG0At57wP1F-_YKvl5jW-f.jpeg",
            "__v": 0
        },
        {
            "_id": "5fb530f283b8700be4d98778",
            "date": "2020-11-18T14:34:26.173Z",
            "title": "Ahora si funciona todo bien",
            "content": "Probando subir articulos!!",
            "image": "CDnSNrdMbiD8aAwQzWaFfhwO.jpeg",
            "__v": 0
        },
    ]
}

--

Para listar un artículo en particular enviar petición a http://localhost:3900/api/article/id
METODO GET 
Respuesta de ejemplo:
{
    "status": "success",
    "article": {
        "_id": "5fb530f283b8700be4d98778",
        "date": "2020-11-18T14:34:26.173Z",
        "title": "Ahora si funciona todo bien",
        "content": "Probando subir articulos!!",
        "image": "CDnSNrdMbiD8aAwQzWaFfhwO.jpeg",
        "__v": 0
    }
}

*Se debe pasar el _id del artículo que se busque.

--

Para buscar artículos enviar petición a http://localhost:3900/api/search/stringdebusqueda
Se debe pasar el string de búsqueda por la URL
Respuesta de ejemplo:
{
    "status": "success",
    "articles": [
        {
            "_id": "5fd43f17721de75a30ffda82",
            "date": "2020-12-12T03:55:03.098Z",
            "title": "Hola es un nuevo articulo de prueba",
            "content": "Contenido de prueba desde postman",
            "image": null,
            "__v": 0
        }
    ]
}

