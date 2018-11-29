import { Observable } from "rxjs/Rx";
import {
  NotFoundException,
  BadRequestException,
  AppException,
  AccessDeniedException,
  LoginRequiredException
} from "./../Exceptions/AppException";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class ServiceErrorHandler {
  public handleError(error: Response) {
    if (error.status === 400){
      return Observable.throw(
        new BadRequestException(error.statusText, error)
      );
    }
    else if (error.status === 401){
      return Observable.throw(
        new LoginRequiredException(error.statusText, error)
      );
    }
    // tslint:disable-next-line:one-line
    else if (error.status === 403){
      return Observable.throw(
        new AccessDeniedException(error.statusText, error)
      );
    }
    // tslint:disable-next-line:one-line
    else if (error.status === 404){
      return Observable.throw(
        new NotFoundException(error.statusText, error)
      );
    }
    else{
      return Observable.throw(new AppException(error.statusText, error));
    }
  }
}