import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-lookup',
  template: `
            <nz-layout>
              <app-breadcrumb *ngIf="breadcrumbData" [data]="breadcrumbData"></app-breadcrumb>
              <nz-content>
                <nz-layout>
                    <nz-sider nzWidth="240px" nzTheme="light">
                        <ul nz-menu nzMode="inline" >
                          <li nz-submenu nzOpen nzTitle="Lookup" nzIcon="tool">
                            <ul>
                              <li nz-menu-item>ភេទ</li>
                              <li nz-menu-item>ប្រភេទបដិសេធ</li>
                              <li nz-menu-item>ភស្ថានភាពការណាត់ជួប</li>
                              <li nz-menu-item>សញ្ជាតិ</li>
                            </ul>
                          </li>
                        </ul>
                    </nz-sider>
                  <nz-content>
                    <router-outlet></router-outlet>
                  </nz-content>
                </nz-layout>
              </nz-content>
            </nz-layout>
    `,
  styles: [`
    .sider-menu {
      height: 100%;
    }
    .ant-layout-content{
      margin: 0 -15px;
    }
    *{
      font-family: 'Roboto','Kantumruy',sans-serif;
    }
    `],
  styleUrls: ['../../../assets/scss/content_style.scss']
})
export class LookupComponent implements OnInit{
  constructor(
   private activated:ActivatedRoute
  ) {
  }
  breadcrumbData!:Observable<Data>;

  ngOnInit() {
    this.breadcrumbData = this.activated.data;
  }
}
