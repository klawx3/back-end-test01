# Prueba tecnica back-end

## Pauta de ejecución de la prueba tecnica

clonar el repositorio a su equipo e ingresar a la carpeta raiz

```sh
git clone url:repo
cd repo
```

### Ejercicio 1

> Nota : El ejercicio 1 involucra al ejercicio 2

para ejecutar este ejercicio debe tener de antemano `docker` , `docker-compose` ademas tener los puertos `3000` y `3306` disponibles para su ejecución local.

#### Pasos ejecución

```sh
cd ejercicio1
docker-compose up
```
Luego de esto se descargaran y **ejecutaran** 2 dependencias desde DockerHub
- MariaDB
- Ejercicio2
    - Este esta en el siguiente [link](https://hub.docker.com/repository/docker/klawx3/ej2) (opcional)

**Opcional**
Verificar su desplige con 

```sh
docker ps
```
Luego de estos deberia estar todo ok para probar la API

### Ejercicio 2

El ejercicio 2 tiene su despliege automatico si es que siguio los pasos anteriores, por tanto solo bastara probar los end-point

> Nota: este ejercicio esta construido en **Typescript** y compilado a Javascript

**GET** - Obtener Todas las empresas
```sh
curl --location --request GET 'localhost:3000/empresa'
```

**GET** - Obtener una empresa por su *ID*
```sh
curl --location --request GET 'localhost:3000/empresa/23'
```

**GET** - Eliminar una empresa por su *ID*
```sh
curl --location --request DELETE 'localhost:3000/empresa/2'
```

**POST** - Crear una empresa 
```sh
curl --location --request POST 'localhost:3000/empresa' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre" : "asdasdasd",
    "actividad" : "aasdasdasd",
    "activa" : 1
}'
```

**POST** - Actualizar una empresa por su *ID*
```sh
curl --location --request PUT 'localhost:3000/empresa/3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre" : "x",
    "actividad" : "x",
    "activa" : 0
}'
```

> Nota : tambien se adjunta la colección de PostMan en el respositorio 
> `empresa-prueba-tecnica.postman_collection.json`

### Ejercicio 3 , 5 , 6 

Estos ejercicios estan desarrollados en **Python** 🐍 y *no tienen ninguna dependencia externa*, por tanto se puede ejecutar directamente desde el interprete de Python:

```sh
python ejercicio3.py
python ejercicio5.py
python ejercicio6.py
```

> Nota: ejercicio5.py puede demorar si no se modifica el parametro **DIVISORES** a un numero mas bajo ya que este ejercicio utiliza un algoritmo de fuerza bruta para hacer la busqueda de palabras con una complejidad ciclomatica de O( N\*P\*len )

### Ejercicio 4

Este ejercicio esta en **NodeJS**

```sh
cd ejercicio4
npm install
npm start # o 'node main.js'
```

### Ejercicio 7

Esto esta en SQL (MariaDB) y debe ser probado idealmente en su motor de base de datos **MariaDB/MySQL** directamente

El script esta hecho para ser ejecutado de una pasada y resolver el problema en cuestion (con la ultima consulta)