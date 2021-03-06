import {databaseConfig, PORT} from "./config/config";

import mysql from 'mysql';

import App from './webserver/App';


import {DaoContainer, DaoEmpresa} from "./persistence/dao/Dao";
import EmpresaDaoImpl from "./persistence/dao/impl/EmpresaDaoImpl";
import EmpresaController from "./controllers/EmpresaController";

const con = mysql.createConnection({
    host: databaseConfig.host,
   user: databaseConfig.user,
    password: databaseConfig.pass,
    database: databaseConfig.db
});

let daoEmpresa: DaoEmpresa = new EmpresaDaoImpl(con);


let daoContainer: DaoContainer = {
    daoEmpresa: daoEmpresa,
}

const app: App = new App({
    controllers: [
        new EmpresaController(daoContainer),
    ],
    port: PORT
});

app.listen();
