
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
// @ts-ignore
import {Observable} from "rxjs/dist/types";
import {BaseApiService, QueryParam, SearchResult} from "../helpers/base-api.service";
import {SettingService} from "../app-setting";

export interface User {
  id?: number,
  name?: string,
  fullName?: string,
  phone?: string,
  email?: string,
  branchId?:number,
  branchName?:string,
  branchCode?:string,
  lastLoginDate?: string,
  active?:number,
  isEnabled?:number,
  roleIds?:number[],
  changePasswordRequired?: boolean
}


export const UserStatusWithIcon: {label?: any, value?: any, type?: any, color?: any}[] = [
  {label:'Inactive', value: false,  type: 'clock-circle', color: '#3498DB'},
  {label:'Active', value: true, type: 'check-circle', color: '#2ECC71'},
]

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<any>{

  ALLOW_ROLE_PER_USER = 1;

  constructor(private http: HttpClient,  settingService: SettingService) {
    super('user', http, settingService);
  }

  public changePassword(model: any): Observable<any> {
    return this.http.put(this.getUrl() + '/change-password/' + model.id, model);
  }
  public searchWithoutPermission(query: QueryParam): Observable<SearchResult<any>> {
    return this.http.get<SearchResult<any>>(`${this.getUrl()}/without-permission`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams()
        .append('pageIndex', `${query.pageIndex}`)
        .append('pageSize', `${query.pageSize}`)
        .append('sorts', `${query.sorts === undefined ? '' : query.sorts}`)
        .append(
          'filters',
          `${query.filters === undefined ? '' : query.filters}`
        ),
    });
  }
}
