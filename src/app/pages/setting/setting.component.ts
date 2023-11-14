import { Component } from '@angular/core';

@Component({
  selector: 'app-setting',
  template: `
    <nz-layout class="inner-layout" >
      <nz-content>
      <nz-breadcrumb>
        <div class="title">
          <span nz-icon nzType="setting" nzTheme="outline"></span>
          <span>Setting</span>
        </div>
      </nz-breadcrumb>
      <hr>
      <div class="container-list">
        <div class="content-list">
          <h4>General Setting</h4>
          <ul nz-menu>
            <li>
              <a class="iconMenu" routerLink="lookup">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Lookup
              </a>
            </li>

            <li>
              <a class="iconMenu" routerLink="branch">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Branch
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Service Item
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Appointment Type
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Space
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Position
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Patient Group
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Contract Type
              </a>
            </li>
          </ul>
        </div>

        <div class="content-list">
          <h4>Report</h4>
          <ul nz-menu>
            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Report Group
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Report
              </a>
            </li>
          </ul>
        </div>

        <div class="content-list">
          <h4>System Setting</h4>
          <ul nz-menu>
            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                System Setting
              </a>
            </li>

            <li>
              <a class="iconMenu">
                <span nz-icon nzType="container" nzTheme="outline"></span>
                Auto Number
              </a>
            </li>
          </ul>
        </div>
      </div>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      .container-list{
        display: flex;
        gap:15rem;
      }
      .title>span{
        margin:0 12px 0 0 ;
        color:#4d4d4d;
      }

      .content-list>.iconMenu{
        margin-top:45px;
      }
      ul{
        border:none;
      }
      ul li {
        margin: 15px 0;
      }
      nz-content {
        background: #fff;
        padding: 15px;
      }
    `
  ]
})
export class SettingComponent {

}
