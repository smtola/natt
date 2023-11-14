import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {BaseApiService} from "../../helpers/base-api.service";
import {SettingService} from "../../app-setting";

export enum LOOKUP_TYPE {
  GENDER = 1,
  CANCEL_TYPE = 2,
  APPOINTMENT_STATUS = 3,
}


  export interface LookupType {
  id?: number,
  name?:string,
  nameKh?:string,
}
@Injectable({
  providedIn: 'root'
})

export class LookupTypeService extends BaseApiService<any> {
  constructor(private http: HttpClient, settingService: SettingService) {
    super('lookuptype', http, settingService);
  }
}
