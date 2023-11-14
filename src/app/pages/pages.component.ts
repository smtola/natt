import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <nz-layout class="app-layout">
      <nz-sider class="menu-sidebar" nzTheme="light"
                nzCollapsible
                nzWidth="90px"
                [nzTrigger]="null">
        <div class="sidebar-logo">
          <div id="img">
            <img src="../../assets/image/image-skeleton.jpg"
                 alt="logo">
          </div>
          <a target="_blank">
            <h1 class="modal-header-ellipsis">companyInfo</h1>
          </a>
        </div>
        <div class="scrollbar">
          <ul nz-menu nzMode="inline" class="custom-menu">
            <li  nz-menu-item routerLink="/home" >
              <i nz-icon nzType="home"></i>
              <span>Home</span>
            </li>

            <li  nz-menu-item routerLink="/setting">
              <i nz-icon nzType="setting"></i>
              <span>Setting</span>
            </li>
          </ul>
        </div>
      </nz-sider>
      <nz-layout>
        <nz-header>
          <div class="app-header">
            <span class="header-right">
              <span style="padding-right: 4px;">
                <span style="background-color: #e6f7ff; font-size: 16px;padding: 2px 6px;border-radius: 2px;">
                  name
                </span>
              </span>
              <span nzTrigger="click" nzPlacement="bottomRight" nz-dropdown style="padding: 0 6px;"
                    [nzDropdownMenu]="language">
                <img class="img-head"
                     src="../../assets/image/en_FLAG.png"
                     alt="language">
              </span>
              <i nz-icon nzType="appstore" nzTheme="outline"></i>
              <i nz-icon nzType="fullscreen"
                 nzTheme="outline" class="icon"></i>
              <span style="background: #1890ff; border-radius: 50%; width: 25px; height: 25px; margin: 0 4px 0 6px;"
                    >
                <i style="padding: 3px;vertical-align: super; color: white" nz-icon nzType="user" nzTheme="outline"></i>
              </span>
              <span>
                <span style="font-size: 17px">name</span>
              </span>
            </span>
            <nz-dropdown-menu #language="nzDropdownMenu">
              <ul nz-menu style="width: 125px;">
                <li nz-menu-item >
                  <img class="img"  alt="language">
                  <span>lang</span>
                  <i style="position: absolute; right: 5px;" class="primary-color"
                      nz-icon nzType="check"
                     nzTheme="outline"></i>
                </li>

              </ul>
            </nz-dropdown-menu>
          </div>
        </nz-header>
        <nz-content>
          <div class="inner-content">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styleUrls: [`../../assets/scss/layout-style.scss`],
  styles: [`
    .modal-header-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 75%;
      margin: auto;
    }
  `]
})
export class PagesComponent {

}
