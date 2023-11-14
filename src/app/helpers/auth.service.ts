import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "../helpers/localStorage.service";
import {APP_STORAGE_KEY} from "../const";
import {map} from "rxjs/operators";
import {SettingService} from "../app-setting";
import {UserService} from "../user/user.service";


export interface ClientInfo {
  id?: number,
  name?: string,
  fullName?: string,
  email?: string,
  token?: string,
  branchId?: string,
  changePasswordRequired?: boolean,
  permissions?: number[],
}

@Injectable({providedIn: 'root'})

export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private settingService: SettingService,
  )
  {
  }

  clientInfo: ClientInfo = this.localStorageService.getValue(APP_STORAGE_KEY.Authorized);

  get url(){
    return this.settingService.setting.AUTH_API_URL;
  }

  redirectLogin(model: any){
    return this.httpClient.post(`${this.url}/auth/redirect-login`, model, { withCredentials: true, headers: {'disableErrorNotification': 'yes'}}).pipe(map(result => {
      this.localStorageService.setValue({key: APP_STORAGE_KEY.Authorized, value: result});
      this.clientInfo = result;
      return result;
    }));
  }

  redirectRequest(appId: string){
    return this.httpClient.post(`${this.url}/auth/redirect-request`,
      {
        app: appId,
        withCredentials: true,
        headers: {'disableErrorNotification': 'yes'}
      }).pipe(map(result => {
      return  result;
    }))
  }


  login(model: any){
    return this.httpClient.post(`${this.url}/auth/login`, model, { withCredentials: true, headers: {'disableErrorNotification': 'yes'}}).pipe(map(result => {
      this.localStorageService.setValue({key: APP_STORAGE_KEY.Authorized, value: result});
      this.clientInfo = result;
      return result;
    }));
  }
  logout(){
    return this.httpClient.get(`${this.url}/auth/logout`, { withCredentials: true}).pipe(map(result => {
      this.localStorageService.removeValue(APP_STORAGE_KEY.Authorized);
      this.clientInfo = {};
      return result;
    }))
  }
  getUserInfo(){
    return this.httpClient.get(`${this.url}/auth/info`).pipe(map(result => {
      return result;
    }))
  }
  refreshToken(accessToken: string){
    return this.httpClient.post(`${this.url}/auth/refresh`,
      {accessToken},
      {
        headers: {'disableErrorNotification': 'yes', },
        withCredentials: true
      });
  }

  sendResetPasswordLinkAsync(model: any){
    return this.httpClient.post(`${this.url}/auth/send-reset-password-link`, model, {headers: {'disableErrorNotification': 'yes'}});
  }

  verifyOtp(model:any){
    return this.httpClient.post(`${this.url}/auth/verify-otp`, model, {headers: {'disableErrorNotification': 'yes'}});
  }

  resetPassword(model:any){
    return this.httpClient.post(`${this.url}/auth/reset-password`, model);
  }
  changePassword(model:any){
    return this.httpClient.post(`${this.url}/auth/change-password`, model);
  }
  editProfile(model:any){
    return this.httpClient.post(`${this.url}/auth/edit-profile`, model);
  }

  updateClientInfo(){
    // @ts-ignore
    this.getUserInfo().subscribe(result =>{
      const authorized: ClientInfo = this.localStorageService.getValue(APP_STORAGE_KEY.Authorized);
      this.clientInfo = result;
      // @ts-ignore
      this.clientInfo.token = authorized.token;
      this.clientInfo.permissions = authorized.permissions
      this.localStorageService.setValue({key: APP_STORAGE_KEY.Authorized, value: this.clientInfo})
    })
  }
  getAuthorizedPermissions(): number[]{
    return this.clientInfo.permissions || [];
  }

  isAuthorized(key: number): boolean {
    if(!key){
      return true;
    }
    return this.getAuthorizedPermissions().includes(key);
  }
}
