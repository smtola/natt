import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

    <nz-layout class="inner-layout" >
      <nz-content>
        <nz-breadcrumb>
          <div class="title">
            <span nz-icon nzType="setting" nzTheme="outline"></span>
            <span>Home</span>
          </div>
        </nz-breadcrumb>
        <hr>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      *{
        font-family: 'Roboto','Kantumruy',sans-serif;
      }
      .title>span{
        margin:0 12px 0 0 ;
        color:#4d4d4d;
      }
      nz-content {
        background: #fff;
        padding: 15px;
      }
    `
  ]
})
export class HomePageComponent {

}
