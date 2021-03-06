
import GenericCrud from "../GenericCrud";
import Empresa from "../../models/Empresa";


export interface DaoContainer {
    daoEmpresa: DaoEmpresa;
}

export interface DaoEmpresa extends GenericCrud<Empresa, number> {}



