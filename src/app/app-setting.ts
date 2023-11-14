import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";

export class Setting {
  LANG_URL: string = ''
  BASE_API_URL: string = ''
  AUTH_API_URL: string = ''
  AUTH_UI_URL: string = ''
  APP_NAME: string = ""
  APP_ICON: string = "https://sec-core.sgx.bz/files/22/12/logo_text-black-02_.png"
}

@Injectable({ providedIn: 'root' })
export class SettingService {
  public setting: Setting;
  constructor() {
    this.setting = new Setting();
  }
}

@Injectable({ providedIn: 'root' })
export class SettingHttpService {

  constructor(private http: HttpClient, private settingsService: SettingService) {
    // console.log('initialize httpSetting service');
  }

  initializeApp(): Promise<any> {

    return new Promise(
      (resolve)  => {
        this.http.get('assets/setting.json')
          .toPromise()
          .then(response => {
              this.settingsService.setting = <Setting>response;
              resolve(null);
            }
          )
      }
    );
  }
}
