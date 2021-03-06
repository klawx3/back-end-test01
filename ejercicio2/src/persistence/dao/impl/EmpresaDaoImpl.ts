import { Connection } from "mysql";
import Empresa from "../../../models/Empresa";
import { DaoEmpresa } from "../Dao";
import ForumQuery from "../query/ForumQuery";
import QueryFactory from "../query/QueryFactory";

export default class EmpresaDaoImpl implements DaoEmpresa {

    private con : Connection;

    public constructor(con: Connection){
        this.con = con;
    }

    findOne(id: number): Promise<Empresa> {
        const findOne : ForumQuery<Empresa> = {
            sql: "SELECT * FROM empresa WHERE id = " + id,
            column : this.buildEmpresaData(),
        }
        return new QueryFactory<Empresa>(findOne,this.con).getSinglePromise();
    }

    findAll(): Promise<Empresa[]> {
        const findOne : ForumQuery<Empresa> = {
            sql: "SELECT * FROM empresa",
            column : this.buildEmpresaData(),
        }
        return new QueryFactory<Empresa>(findOne,this.con).getArrayPromise();
    }

    create(empresa: Empresa): void {
        const findOne : ForumQuery<null> = {
            sql: `INSERT INTO empresa VALUES(NULL,'${empresa.nombre}', NOW(), '${empresa.actividad}' , ${empresa.activa});`,
            column : () => (null)
        }
        return new QueryFactory<null>(findOne,this.con).getNoPromise();
    }

    delete(id: number): void {
        const findOne : ForumQuery<null> = {
            sql: `DELETE FROM empresa WHERE id = ${id}`,
            column : () => (null)
        }
        return new QueryFactory<null>(findOne,this.con).getNoPromise();
    }

    modify(empresa: Empresa, id: number): void {
        const findOne : ForumQuery<null> = {
            sql: `UPDATE empresa SET nombre = '',fecha_creacion = '${empresa.fecha_creacion}',actividad = '${empresa.actividad}', activa = ${empresa.activa} WHERE id = ${id}`,
            column : () => (null)
        }
        return new QueryFactory<null>(findOne,this.con).getNoPromise();
    }

    private buildEmpresaData(): any {
        return (data : any)  => {
            const empresa : Empresa = {
                id: data["id"],
                nombre: data["nombre"],
                fecha_creacion: data["fecha_creacion"],
                actividad: data["actividad"],
                activa: Boolean(data["activa"]) ? 1 : 0,
            }
            return empresa;
        }
    }


}