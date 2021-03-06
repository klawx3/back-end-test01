import HttpException from "./HttpException";

export default class EmpresaNotExistsException extends HttpException {
    constructor(){
        super(404,`Empresa doen't exists`);
    }
}
