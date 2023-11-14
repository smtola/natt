import {Inject, Injectable} from "@angular/core";
import {BaseApiService} from "../../../helpers/base-api.service";
import {HttpClient} from "@angular/common/http";
import {SettingService} from "../../../app-setting";



export interface LookupItem {
  id?: number,
  lookupTypeId?: number,
  name?:string,
  nameEn?:string,
  ordering?:number,
  note?: string
}

@Injectable({providedIn: 'root'})

export class LookupItemService extends BaseApiService<any>{
  constructor(private http: HttpClient, settingService: SettingService) {
    super('lookupitem', http ,settingService);
  }
}
