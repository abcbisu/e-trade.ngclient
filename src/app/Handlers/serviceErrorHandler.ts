import { Observable } from "rxjs/Observable";
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
export class serviceErrorHandler {
  public handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(
        new BadRequestException(error.statusText, error.json())
      );
    else if (error.status === 401)
      return Observable.throw(
        new LoginRequiredException(error.statusText, error.json())
      );
    else if (error.status === 403)
      return Observable.throw(
        new AccessDeniedException(error.statusText, error.json())
      );
    else if (error.status === 404)
      return Observable.throw(
        new NotFoundException(error.statusText, error.json())
      );
    else
      return Observable.throw(new AppException(error.statusText, error.json()));
  }
}