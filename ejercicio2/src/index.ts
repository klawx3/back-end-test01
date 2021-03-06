import {databaseConfig, PORT} from "./config/config";
import mysql from 'mysql';
import App from './webserver/App';
import {DaoContainer} from "./persistence/dao/Dao";
import EmpresaDaoImpl from "./persistence/dao/impl/EmpresaDaoImpl";
import EmpresaController from "./controllers/EmpresaController";
import LoggingMiddleware from "./middleware/LoggingMiddleware";

const con = mysql.createConnection({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.pass,
    database: databaseConfig.db
});

let daoEmpresad = new EmpresaDaoImpl(con);

let daoContainer: DaoContainer = {
    daoEmpresa: daoEmpresad,
}

const app: App = new App({
    controllers: [
        new EmpresaController(daoContainer),
    ],
    middleware : [
        new LoggingMiddleware()
    ],
    port: PORT
});

app.listen();
