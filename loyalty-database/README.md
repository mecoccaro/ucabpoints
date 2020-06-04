
## Instrucciones para la preparación de la BD
Para el proyecto decidimos utilizar <a href="https://www.postgresql.org" target="blank">PostgreSQL</a> version 11.

## Tabla de contenidos
   * [Instalación de PostgreSQL](#instalacion)
   * [Creación de la Base de Datos](#creacion)
   * [Creación y manejo de las tablas](#creacion-tablas)

<a name="instalacion"></a>
## Instalación de postgreSQL

Para realizar la instalacion desde la linea de comandos.

```bash
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
```

<a name="creacion"></a>
## Creación de la base de datos

```bash
> CREATE DATABASE fidelidad
```

<a name="creacion-tablas"></a>
## Creación y manejo de las tablas

1. Para la creación de las tablas, ejecutar el archivo <a href="./creates.sql" target=""><strong>Creates</strong></a>
2. Para eliminar todas las tablas, ejecutar el archivo <a href="./drop.sql" target=""><strong>Drop</strong></a>
3. Para vaciar la información de las tablas, ejecutar el archivo <a href="./delete.sql" target=""><strong>Delete</strong></a>