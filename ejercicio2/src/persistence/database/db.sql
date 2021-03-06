DROP DATABASE IF EXISTS empresa_prueba_tecnica;

CREATE DATABASE empresa_prueba_tecnica;

USE empresa_prueba_tecnica;

CREATE TABLE empresa (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(50),
    fecha_creacion DATE,
    actividad TEXT,
    activa BIT(1),

    PRIMARY KEY (id)
);

INSERT INTO empresa VALUES(NULL,'Empresa 1', NOW(), 'Desarrollo e inovación' , 0);
INSERT INTO empresa VALUES(NULL,'Empresa 2', NOW(), ' medición de la calidad y eficiencia' , 1);


SELECT * FROM empresa;
