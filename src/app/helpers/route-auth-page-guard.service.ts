import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorageService} from "./localStorage.service";
import {APP_STORAGE_KEY} from "../const";
@Injectable({providedIn: 'root'})
export class RouteAuthPageGuardService implements CanActivate {
  constructor(public router: Router, public localStorageService: LocalStorageService) {}
  canActivate(): boolean {
    if (this.localStorageService.getValue<any>(APP_STORAGE_KEY.Authorized)?.token) {
      this.router.navigate(['home']).then();
      return false;
    }
    return true;
  }
}
