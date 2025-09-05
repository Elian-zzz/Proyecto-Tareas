create database DBTareas;
use DBTareas;
show databases;
create table Tarea(
id_tarea int auto_increment primary key,
nombre varchar(25) not null,
descripcion varchar(200) not null
);

-- select id_tarea,nombre,descripcion from Tarea;

create table estadoTarea(
id_tarea int auto_increment,
estado enum("completo","incompleto") default ("incompleto"),
PRIMARY KEY (id_tarea,estado),
FOREIGN KEY (id_tarea) REFERENCES Tarea(id_tarea)
);
-- select id_tarea,estado from estadoTarea;

insert into estadoTarea(id_tarea) value (1); 

insert into Tarea(nombre,descripcion) values ("Lavar cocina","Lavar los platos sucios");
-- select * from Tarea;


