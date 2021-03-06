import express from "express";
import BodyParamsException from "../exception/BodyParamsException";
//import BodyParamsException from "../exception/BodyParamsException";
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
        this.router.put("/:id", this.changeEmpresa);

        this.router.post('/', this.makeEmpresa);
        this.router.get('/', this.getAllEmpresas);
        
        this.router.get('/:id', this.getOneEmpresaById);        
        this.router.delete('/:id', this.deleteEmpresaById);        
    }

    private makeEmpresa = async (_request: express.Request, _response: express.Response, _next : express.NextFunction) => {
        //console.log(JSON.stringify(_request.headers));
        const empresaFromBody : Empresa | null = this.extractEmpresaFromBody(_request);
          if(empresaFromBody){
              this.daoContainer.daoEmpresa.create(empresaFromBody);
            _response.send(201);
          }else{
              _next(new BodyParamsException(`this endpoinds needs : nombre, actividad, activa. ej:{'nombre' : 'empresa x', 'actividad' : 'actividad x','activa' : 1}`));
         }
     }

    private changeEmpresa = async (_request: express.Request, _response: express.Response, _next : express.NextFunction) => {
        const id = Number(_request.params["id"]);
        if(id){
            const empresa: Empresa = await this.daoContainer.daoEmpresa.findOne(id);
            if(empresa){
                const empresaFromBody2 : Empresa | null = this.extractEmpresaFromBody(_request);
                if(empresaFromBody2){
                    this.daoContainer.daoEmpresa.modify(empresaFromBody2,id);
                    _response.send(200);
                }else{
                    _next(new BodyParamsException(`this endpoinds needs : nombre, actividad, activa. ej:{'nombre' : 'empresa x', 'actividad' : 'actividad x','activa' : 1}`));
                } 
            } else{
                _next(new EmpresaNotExistsException());
            }
        }else{
            _next(new InvalidParamException());
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
            if(empresa){
                _response.send(JSON.stringify(empresa));
            }else{
                _next(new EmpresaNotExistsException());
            }
            
        }else{
            _next(new InvalidParamException());
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
            _next(new InvalidParamException());
        }        
     }

    private extractEmpresaFromBody = (request: express.Request) : Empresa | null => {
        const {nombre,actividad,activa} = request.body; 
        if(nombre && actividad){
            const empresa : Empresa  = {
                nombre : nombre,
                actividad : actividad,
                activa : activa,
            }
            return empresa;
        }
        return null;
    }
}
