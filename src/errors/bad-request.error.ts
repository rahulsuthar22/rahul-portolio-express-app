import { AppError } from "./app-error.js";

export class BadRequestError extends AppError {
    constructor(
        message ="Bad Request",
        code = "BAD_REQUEST"
    ){
        super(message, 400, code);
        this.name = "BadRequestError"
    }
}