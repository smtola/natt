import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {LookupUiService} from "./lookup-ui.service";
import {LookupItem, LookupItemService} from "./lookup-item.service";


@Component({
  selector: 'app-lookup-item',
  template: `
        <nz-layout>
            <div *nzModalTitle class="modal-header-ellipsis">
              <span>Add</span>
            </div>
            <div class="modal-content">
              <nz-spin *ngIf="loading" style="position:absolute;top:50%;left:50%;"></nz-spin>

              <nz-form nz-form [formGroup]="frm">
                    <nz-form-item>
                      <nz-form-label nzRequired [nzSm]="7" [nzXs]="24">Name</nz-form-label>
                        <nz-form-control [nzSm]="14" [nzXs]="24" nzHasFeedback>
                          <input nz-input formControlName="name">
                        </nz-form-control>
                    </nz-form-item>

                <nz-form-item>
                  <nz-form-label nzRequired [nzSm]="7" [nzXs]="24">NameEn</nz-form-label>
                  <nz-form-control [nzSm]="14" [nzXs]="24" nzHasFeedback>
                    <input nz-input formControlName="name(English)">
                  </nz-form-control>
                </nz-form-item>

                <nz-form-item>
                  <nz-form-label nzRequired [nzSm]="7" [nzXs]="24">Note</nz-form-label>
                  <nz-form-control [nzSm]="14" [nzXs]="24">
                    <textarea rows="3" formControlName="note" nz-input></textarea>
                  </nz-form-control>
                </nz-form-item>
              </nz-form>
            </div>

            <div *nzModalFooter>
              <div>
                  <button nz-button nzType="primary" [disabled]="!this.frm.valid">
                    <i *ngIf="loading"  nz-icon nzType="loading"></i>
                    Save
                  </button>

                <button nz-button nzType="default">
                  <i *ngIf="loading"  nz-icon nzType="loading"></i>
                  Cancel
                </button>
              </div>
            </div>
        </nz-layout>
  `,
  // styleUrls: ['../../../assets/scss/operation-page.scss'],
})

export class LookupItemOperationComponent implements OnInit{
  constructor(
    private fb : FormBuilder,
    private ref: NzModalRef<LookupItemOperationComponent>,
    public uiService: LookupUiService,
    private service:LookupItemService,
  ) {}
  @Input() id:number = 0;
  @Input() isView:boolean = false;
  loading = false;
  frm!:FormGroup;
  model: LookupItem ={};
  refreshSub$:any;
  ngOnInit() {
    if(this.isView){
      this.frm.disable();
      this.refreshSub$ = this.uiService.refresher.subscribe( e => {
        if(e.key === 'edited'){
          this.loading = true;
          this.service.find(this.id).subscribe(
            (result: any) => {
              this.loading = false;
              this.model = result;
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
        else {
          this.ref.triggerCancel();
        }
      })
    }
  }
}
