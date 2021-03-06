import express, { response } from "express";
import BodyParamsException from "../exception/BodyParamsException";
import EmpresaNotExistsException from "../exception/EmpresaNotExistsException";
import InvalidParamException from "../exception/InvalidParamException";
import Empresa from "../models/Empresa";
import { DaoContainer } from "../persistence/dao/Dao";
import Controller from "../webserver/Controller";

export default class EmpresaController extends Controller {


    private static BASE_PATH: string = "/empresa";

    constructor(daoContainer: DaoContainer) {
        super(EmpresaController.BASE_PATH, daoContainer);
    }

    public buildAllRequests(): void {
        this.router.post('/', this.createEmpresa);
        this.router.get('/', this.getAllEmpresas);
        this.router.get('/:id', this.getOneEmpresaById);
        this.router.put("/:id", this.updateEmpresa);
        this.router.delete('/:id', this.deleteEmpresaById);        
    }

    private createEmpresa = (request: express.Request, _response: express.Response, _next : express.NextFunction) => {
        const empresaFromBody : Empresa | null = this.extractEmpresaFromBody(request);
        if(empresaFromBody){
            this.daoContainer.daoEmpresa.create(empresaFromBody);
            response.send(201);
        }else{
            _next(new BodyParamsException(`this endpoinds needs : nombre, actividad, activa. ej:{'nombre' : 'empresa x', 'actividad' : 'actividad x','activa' : 1}`));
        }
     }

    private updateEmpresa = async (request: express.Request, _response: express.Response, _next : express.NextFunction) => {
        const id = Number(request.params["id"]);
        if(id){
            const empresa: Empresa = await this.daoContainer.daoEmpresa.findOne(id);
            if(empresa){
                const empresaFromBody : Empresa | null = this.extractEmpresaFromBody(request);
                if(empresaFromBody){
                    this.daoContainer.daoEmpresa.modify(empresa,id);
                    response.send(201);
                }else{
                    _next(new BodyParamsException(`this endpoinds needs : nombre, actividad, activa. ej:{'nombre' : 'empresa x', 'actividad' : 'actividad x','activa' : 1}`));
                } 
            } else{
                _next(new EmpresaNotExistsException());
            }
        }else{
            _next(new InvalidParamException("id"));
        }
    }

    private getAllEmpresas = async (_request: express.Request, _response: express.Response, _next : express.NextFunction) => {
       const empresas: Array<Empresa> = await this.daoContainer.daoEmpresa.findAll();
       _response.send(JSON.stringify(empresas));
    }

    private getOneEmpresaById = async (_request: express.Request, _response: express.Response, _next : express.NextFunction) => {
        const id = Number(_request.params["id"]);
        if(id){
            const empresa: Empresa = await this.daoContainer.daoEmpresa.findOne(id);
            _response.send(JSON.stringify(empresa));
        }else{
            _next(new InvalidParamException("id"));
        }        
     }

     private deleteEmpresaById = async (_request: express.Request, _response: express.Response, _next : express.NextFunction) => {
        const id: number = Number(_request.params["id"]);
        if(id){
            const empresa: Empresa = await this.daoContainer.daoEmpresa.findOne(id);
            if(empresa){
                this.daoContainer.daoEmpresa.delete(id);
                _response.send(200);
            }else{
                _next(new EmpresaNotExistsException());
            }
        }else{
            _next(new InvalidParamException("id"));
        }        
     }

    private extractEmpresaFromBody(request: express.Request) : Empresa | null {
        try {
            console.log(request.body);
            const nombre: string = request.body["nombre"];
            const actividad : string = request.body["actividad"];
            const activa : number = Number(request.body["activa"] || 0) ;
    
            console.log("nombre:" +nombre);
            console.log("actividad:" +actividad);
            console.log("activa:" +activa);
    
            if(nombre && actividad){
                const empresa : Empresa  = {
                    nombre : nombre,
                    actividad : actividad,
                    activa : activa,
                }
                return empresa;
            }
            return null;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

}
