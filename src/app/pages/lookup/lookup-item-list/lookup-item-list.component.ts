import {Component, OnInit} from '@angular/core';
import {LookupItem} from "./lookup-item.service";
import {AuthService} from "../../../helpers/auth.service";
import {ActivatedRoute} from "@angular/router";
import {AuthKeys} from "../../../const";
import {LookupUiService} from "./lookup-ui.service";

@Component({
  selector: 'app-lookup-item-list',
  template: `
    <nz-layout style="margin-left: 10px">
        <nz-header>
            <div nz-row>
              <div>
                    <app-filter-input>

                    </app-filter-input>
              </div>
            </div>
            <div>
                <button nz-button
                        nzTheme="primary"
                        *ngIf="isLookUpAdd"
                        (click)="uiService.showAdd()"
                >
                  <i nz-icon nzType="plus" nzTheme="outline"></i>
                  Add
                </button>
            </div>
        </nz-header>
        <nz-content>
            <nz-table
              [nzNoResult]="noResult"
              nzSize="small"
            >
                <ng-template #noResult>
                  <app-no-result-found></app-no-result-found>
                </ng-template>
                <thead>
                    <tr>
                      <th class="col-header" nzWidth="45px">#</th>
                      <th>Name</th>
                      <th>NameEn</th>
                      <th>Note</th>
                      <th style="text-align: center" nzWidth="180px"></th>
                    </tr>
                </thead>
              <tbody>
                    <tr *ngFor="let data of list; index as i">
                      <td>{{i}}</td>
                      <td>{{data.name}}</td>
                      <td>{{data.nameEn}}</td>
                      <td>{{data.note}}</td>
                      <td>
                        <nz-space [nzSplit]="spaceSplit">
                          <ng-template #spaceSplit>
                            <nz-divider nzType="vertical"></nz-divider>
                          </ng-template>
                          <ng-container >
                            <a *nzSpaceItem nz-typography >
                              <i nz-icon nzType="edit" nzTheme="outline" style="padding-right: 5px"></i>
                              Edit
                            </a>
                          </ng-container>
                          <ng-container>
                            <a *nzSpaceItem nz-typography style="color: #F31313">
                              <i nz-icon nzType="delete" nzTheme="outline" style="padding-right: 5px"></i>
                              Delete
                            </a>
                          </ng-container>
                        </nz-space>
                      </td>
                    </tr>
              </tbody>
            </nz-table>
        </nz-content>
    </nz-layout>
  `,
  styleUrls: ['../../../../assets/scss/content_style.scss']
})
export class LookupItemListComponent implements OnInit{
  constructor(
    private authService:AuthService,
    public uiService:LookupUiService
  ) {}
  list: LookupItem [] =[];
  isLookUpAdd:boolean = true;

  ngOnInit() {
    this.isLookUpAdd = this.authService.isAuthorized(AuthKeys.NATT__SETTING__LOOKUP__ADD);
  }

}
