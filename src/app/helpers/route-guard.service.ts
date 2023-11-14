import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorageService} from "./localStorage.service";
import {APP_STORAGE_KEY} from "../const";
import {SettingService} from "../app-setting";
@Injectable({providedIn: 'root'})
export class RouteGuardService implements CanActivate {
  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
    private settingService:SettingService
  ) {}
  canActivate(): boolean {
    const token = this.localStorageService.getValue<any>(APP_STORAGE_KEY.Authorized)?.token;
    if (!token) {
      this.localStorageService.removeValue(APP_STORAGE_KEY.Authorized);
      window.location.replace(`${this.settingService.setting.AUTH_UI_URL}/auth/login`)
      return false;
    }
    return true;
  }
}
