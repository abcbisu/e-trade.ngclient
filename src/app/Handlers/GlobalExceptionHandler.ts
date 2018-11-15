import { AppException } from './../Exceptions/AppException';
import { ErrorHandler, Type, Injectable } from "@angular/core";

@Injectable()
export class GlobalExceptionHandler implements ErrorHandler {
  
  handleError(error: any): void {
    if (error instanceof AppException) {
      let obj = error as AppException;
      alert("error alert from Global Exception handler: " + obj.message);
      console.log(obj.rawError);
    } else {
      alert(
        "error alert from Global Exception handler: error can not be handled, unknown type"
      );
      console.log(error as AppException);
    }
  }
}