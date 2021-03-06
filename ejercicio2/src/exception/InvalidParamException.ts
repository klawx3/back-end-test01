import HttpException from "./HttpException";

export default class InvalidParamException extends HttpException {
    constructor(){
        super(402,"Invalid param");
    }
}
