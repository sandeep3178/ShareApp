import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers
        .set("header2", `${localStorage.getItem("key")}`)
        .set("header3", `${localStorage.getItem("searchuser")}`)
        .set("header4", `${localStorage.getItem("reqcounter")}`)
        .set("header5", `${localStorage.getItem("accepted")}`)
        .set("header6", `${localStorage.getItem("filepath")}`)
    });
    return next.handle(request);
  }
}
