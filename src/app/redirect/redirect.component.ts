import {Component, OnInit} from '@angular/core';

import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../helpers/auth.service";
import {APP_STORAGE_KEY} from "../const";
import {SettingService} from "../app-setting";
import {LocalStorageService} from "../helpers/localStorage.service";

@Component({
  selector: 'app-redirect',
  template: `
    <div> Redirecting... {{ requestId }} </div>
  `,
})
export class RedirectComponent implements OnInit {
  requestId: string = "";
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private settingService: SettingService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.requestId = params['requestId'];
      this.authService.redirectLogin({'requestId': this.requestId}).subscribe((result: any) => {
        this.localStorageService.setValue({key: APP_STORAGE_KEY.Authorized, value: result});
        this.router.navigate(['home']).then();
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        window.location.href = `${this.settingService.setting.AUTH_UI_URL}/auth/login`;
      });
    });
  }

}
