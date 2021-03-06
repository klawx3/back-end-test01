CREATE DATABASE IF NOT EXISTS `empresa`;

GRANT ALL ON `empresa`.* TO 'user'@'%';

FLUSH PRIVILEGES;

USE empresa;

CREATE TABLE empresa (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(50),
    fecha_creacion DATE,
    actividad TEXT,
    activa BIT(1),

    PRIMARY KEY (id)
);

INSERT INTO empresa VALUES(NULL,'Empresa 1', NOW(), 'Desarrollo e inovación' , 0);
INSERT INTO empresa VALUES(NULL,'Empresa 2', NOW(), 'Medición de la calidad y eficiencia' , 1);
