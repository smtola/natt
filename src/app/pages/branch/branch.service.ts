import { Injectable} from "@angular/core";
import {BaseApiService} from "../../helpers/base-api.service";
import {HttpClient} from "@angular/common/http";
import {SettingService} from "../../app-setting";
import {Observable, Subject} from "rxjs";

export interface Branch {
  code?:    string;
  name?:    string;
  address?: string;
  phone?:   string;
  id?:      number;
}

@Injectable({providedIn: "root"})

export class BranchService extends BaseApiService<any>{
  constructor(private http: HttpClient, settingService: SettingService) {
    super('branch', http, settingService);
  }
}


