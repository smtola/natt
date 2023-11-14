import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Branch, BranchService} from "./branch.service";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../helpers/auth.service";
import {AuthKeys} from "../../const";
import {BranchUiService} from "./branch-ui.service";
import {QueryParam} from "../../helpers/base-api.service";
@Component({
  selector: 'app-branch',
  template: `

      <nz-content class="inner-content">
        <app-breadcrumb *ngIf="breadcrumbData" [data]="breadcrumbData"></app-breadcrumb>
      <div class="container-list">
        <div>
          <app-filter-input>
          </app-filter-input>
        </div>
        <ng-template #suffixIconSearch>
          <span nz-icon nzType="search"></span>
        </ng-template>

        <div class="btnGroup">
         <button nz-button nzType="primary" *ngIf="isBranchAdd" (click)="uiService.showAdd()">
           <span nz-icon nzType="plus"></span>
           Add
         </button>

         <button nz-button nzType="primary">
           <span nz-icon nzType="cloud-download"></span>
           Pull
         </button>
       </div>
      </div>
        <nz-table
          nzNotFoundImage="simple"
          #basicTable
          nzSize="small"
          [nzData]="list"
          [nzLoading]="loading"
          nzTableLayout="fixed"
          [nzFrontPagination]="false"
          [nzNoResult]="noResult"
        >
          <ng-template #noResult>
            <app-no-result-found></app-no-result-found>
          </ng-template>
          <thead>
          <tr>
            <th class="col-header" nzWidth="45px">#</th>
            <th nzWidth="10%"  nzColumnKey="code">Code</th>
            <th nzWidth="17%" nzColumnKey="name">Name</th>
            <th nzWidth="17%"  nzColumnKey="phone">Phone</th>
            <th nzColumnKey="address">Address</th>
            <th nzWidth="165px" ></th>
          </tr>
          </thead>

          <tbody>
          <tr *ngFor="let data of list; index as i;">
            <td>{{i}}</td>
            <td><a>{{data.code}}</a></td>
            <td>{{data.name}}</td>
            <td>{{data.phone}}</td>
            <td>{{data.address}}</td>
            <td style="text-align: right">
              <a><span nz-icon nzType="edit" nzTheme="outline" style="margin: 0 5px;" ></span>Edit</a>
              <nz-divider nzType="vertical"></nz-divider>
              <a>style="color:red;"><span nz-icon nzType="delete" nzTheme="outline" style="margin: 0 5px;"></span>Delete</a>
            </td>
          </tr>

          </tbody>
        </nz-table>
        </nz-content>
  `,
  styles: [
    `
      *{
        font-family: 'Roboto','Kantumruy',sans-serif;
      }
      .nz-content{
        padding:15px;
      }
      .inner-content{
        padding: 0 15px 15px;
      }
      .container-list{
        display: flex;
        justify-content: space-between;
        margin-top:5px;
      }
      .title>span{
        margin:0 12px 0 0 ;
        color:#4d4d4d;
      }
      nz-input-group{
        width:250px;
      }
      .content-list>.iconMenu{
        margin-top:10px;
      }
      .btnGroup{
        display: flex;
        gap:1rem;
      }
      ul{
        border:none;
      }
      ul li {

        margin: 15px 0;
      }
      nz-table{
        margin-top:10px;
        z-index:2;
      }
    `
  ],
  styleUrls: ['../../../assets/scss/content_style.scss']
})
export class BranchComponent implements OnInit, OnDestroy{

  constructor(
    private activated: ActivatedRoute,
    private authService: AuthService,
    public uiService : BranchUiService

  ) {}
  breadcrumbData!: Observable<Data>;
  list: Branch [] = [];
  refreshSub!:Subscription;
  loading=false;
  param: QueryParam = {
    pageIndex: 1,
    sorts: '',
    filters: ''
  }
  isBranchAdd:boolean = true;
  isBranchView: boolean = false;
   ngOnInit():void {
     this.breadcrumbData = this.activated.data;
     this.isBranchAdd = this.authService.isAuthorized(AuthKeys.NATT__SETTING__BRANCH__ADD);
     this.isBranchView = this.authService.isAuthorized(AuthKeys.NATT__SETTING__BRANCH__VIEW);
   }

  ngOnDestroy() {
    this.refreshSub.unsubscribe();
  }

}


