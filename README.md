# consorcio1-ucapoints - Loyalty Points

# Tabla de contenidos

- [Instalar herramientas](#instalacion)
- [Crear Usuario y Base de Datos](#creacion)
- [Archivos .env](#env)
- [Instalar dependencias y correr proyecto](#correr)

<a name="instalacion"></a>

# Instalar herramientas

## PostgreSQL

Para realizar la instalacion desde la linea de comandos.

```bash
$ sudo apt update
$ sudo apt install postgresql
```

```bash
# Para instalar pgAdmin (opcional)
$ sudo apt-get install pgadmin4
```

## NodeJS y NPM (Node Package Manager)

Para realizar la instalacion desde la linea de comandos.

```bash
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

## NestJS

Para realizar la instalacion desde la linea de comandos.

```bash
$ sudo npm install -g @nestjs/cli
```

## VueJS

Para realizar la instalacion desde la linea de comandos.

```bash
$ sudo npm install -g vue-cli
```

<a name="creacion"></a>

# Crear Usuario y Base de Datos

## Crear

**Lo que está entre `<>` son variables que deben buscarse en el .env de loyalty-server (en realidad no van los `<>`)**

```bash
$ sudo -u postgres psql # Para acceder desde el terminal (también se pueden ejecutar los siguientes comandos desde pgAdmin)
> CREATE USER <.env de loyalty-server -> TYPEORM_USERNAME> PASSWORD '<.env de loyalty-server -> TYPEORM_PASSWORD>';
> CREATE DATABASE <.env de loyalty-server -> TYPEORM_DATABASE> WITH OWNER <.env de loyalty-server -> TYPEORM_USERNAME>;
> GRANT ALL PRIVILEGES ON DATABASE <.env de loyalty-server -> TYPEORM_DATABASE> TO <.env de loyalty-server -> TYPEORM_USERNAME>;
```

## Insertar datos de consulta

Ejecutar el script inserts.sql - <a href="./loyalty-database/inserts.sql" target=""><strong>Insert</strong></a>

<a name="env"></a>

# Archivos .env

- Copiar en loyalty-server su respectivo archivo .env
- Copiar en loyalty-client su respectivo archivo .env
- Copiar en loyalty-backoffice su respectivo archivo .env

<a name="correr"></a>

# Instalar dependencias y correr proyecto

## Backend

```bash
$ npm install
$ npm start
```

## Cliente

```bash
$ npm install
$ npm run serve
```

### Producción

```bash
$ npm install
$ npm run build
$ cd dist
$ npx serve -s
```

## Back-office

```bash
$ npm install
$ npm run serve
```

### Producción

```bash
$ npm install
$ npm run build
$ cd dist
$ npx serve -s
```

### Contribuidores
<p>
    <img
      alt="JAA1998 Github Avatar" 
      width="80" 
      src="https://github.com/JAA1998.png?size=80"
    >
    <img
      alt="mecoccaro Github Avatar" 
      width="80" 
      src="https://github.com/mecoccaro.png?size=80"
    >
    <img
      alt="DiorfelisMedina Github Avatar" 
      width="80" 
      src="https://github.com/DiorfelisMedina.png?size=80"
    >
</p>
* Javier Andrade
* Miguel Coccaro
* Diorfelis Medina
