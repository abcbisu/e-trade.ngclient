import { Dictionary } from './../Collections/Dictionary';
export class AppException extends Error {
         constructor(public message: string = "Uncaught Exception", public rawError?: any) {
             super(message);
             this.name = AppException.name;
             Object.setPrototypeOf(this, AppException.prototype);
         }
       }
//when resource not found
export class NotFoundException extends AppException {
    constructor(message: string = "Resource not found",rawError?: any) {
           super(message, rawError);
         }
       }
//login required
export class LoginRequiredException extends AppException {
    constructor(message: string = "Authentication Required",  rawError?: any) {
           super(message, rawError);
         }
       }
//resource access forbidden
export class AccessDeniedException extends AppException {
    constructor(message: string = "Access denied", rawError?: any) {
           super(message, rawError);
         }
       }
//entity validation failed
export class EntityValidationException extends AppException {
    public data:Dictionary<string>;
    constructor(message: string = "Entity validation failed", rawError?: any,data:Dictionary<string>=new Dictionary<string>()) {
        super(message, rawError);
        this.data=data;
    }
}
//logic validation failed
export class LogicValidationException extends AppException {
    constructor(message: string = "Logical validation failed" , rawError?: any) {
        super(message, rawError);
        let x = new LoginRequiredException("hello",{});
        let g=x.message;
    }
}
export class NotSupportedException extends AppException {
    constructor(message: string = "Operation not supported", rawError?: any) {
        super(message, rawError);
    }
}
export class NullReferenceException extends AppException {
         constructor(message: string = "Object reference not set to an instance of an object", rawError?: any) {
           super(message, rawError);
         }
}
export class BadRequestException extends AppException {
    constructor(message: string = "Bad request made", rawError?: any) {
        super(message, rawError);
    }
}