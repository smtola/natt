import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SettingService} from "./app-setting";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,

})
export class AppComponent implements OnInit{
  constructor(
    private titleService: Title,
    private settingService: SettingService
  ) {
  }
 ngOnInit() {
   this.titleService.setTitle(this.settingService.setting.APP_NAME);
 }
}
