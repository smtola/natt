import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from "./localStorage.service";
import {APP_STORAGE_KEY} from "../const";
import {catchError, filter, map, switchMap, take, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject, throwError} from "rxjs";
import {NotificationService} from "./notification.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingService} from "../app-setting";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private settingService: SettingService
    ) { }
  public jwtHelper: JwtHelperService = new JwtHelperService();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorized = this.localStorageService.getValue<any>(APP_STORAGE_KEY.Authorized);
    const token = authorized?.token;
    if (token) {
      request = this.addToken(request, token);
    }
    // @ts-ignore
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next, authorized);
        } else {
          if (request.headers.get('disableErrorNotification') != 'yes'){
            // this.notificationService.errorNotification(error);
          }
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'en'
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, authorized:any) {
    if(!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(authorized?.token).pipe(
        switchMap((result: any) => {
          this.isRefreshing = false;
          authorized.token = result.accessToken;
          this.refreshTokenSubject.next(authorized.token);
          this.localStorageService.setValue({key:APP_STORAGE_KEY.Authorized, value:authorized});
          return next.handle(this.addToken(request, result.accessToken));
        }),
        catchError((error) => {
            if (this.isRefreshing){
              this.localStorageService.removeValue(APP_STORAGE_KEY.Authorized);
              window.location.replace(`https://sec-core.sgx.bz/auth/login`)
            }else{
              //alert("Error:"+error.message);
            }
          this.isRefreshing = false;
          return throwError(error);
        })
      );
    }else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }

  }
}
