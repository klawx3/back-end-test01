import HttpException from "./HttpException";

export default class InvalidParamException extends HttpException{
    constructor(invalid : string){
        super(404,"Invalid param: " + invalid);
    }
}
