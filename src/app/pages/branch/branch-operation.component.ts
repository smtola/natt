import {Component, Input, OnInit} from '@angular/core';
import {CommonValidators} from "../../helpers/common-validators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {Branch, BranchService} from "./branch.service";
import {AuthService} from "../../helpers/auth.service";
import {BranchUiService} from "./branch-ui.service";

@Component({
  selector: 'app-branch-operation',
  template: `
    <div *nzModalTitle class="modal-header-ellipsis">
      <span>Add</span>
    </div>
    <div class="modal-content">
        <nz-spin *ngIf="loading" style="position:absolute;top:50%;left:50%;"></nz-spin>
        <nz-form nz-form [formGroup]="form" (ngSubmit)="onSubmit()" [nzAutoTips]="autoTips">

          <nz-form-item>
            <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>Code</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24" nzHasFeedback>
              <input nz-input formControlName="code" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>Name</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24" nzHasFeedback>
              <input nz-input formControlName="name" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>Phone</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24" nzHasFeedback>
              <input nz-input formControlName="phone" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="7" [nzXs]="24" nzRequired>Address</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24" >
              <textarea nz-input formControlName="address" rows="3"> </textarea>
            </nz-form-control>
          </nz-form-item>
        </nz-form>
    </div>
    <div *nzModalFooter>
        <div>
            <button nz-button nzType="primary" [disabled]="!this.form.valid" (click)="onSubmit()">
                <i *ngIf="loading"  nz-icon nzType="loading"></i>
              Save
            </button>

            <button nz-button nzType="default" (click)="cancel()">
            <i *ngIf="loading"  nz-icon nzType="loading"></i>
              Cancel
          </button>
        </div>
    </div>
  `,
  styleUrls: ['../../../assets/scss/operation_page.scss'],
})
export class BranchOperationComponent implements OnInit{

  constructor(
    private fb : FormBuilder,
    private ref:NzModalRef<BranchOperationComponent>,
    private service:BranchService,
    private authService:AuthService,
    public  branchUi:BranchUiService
  ) { }
  @Input()id:number=0;
  @Input()isView:boolean =false;
  form!:FormGroup;
  autoTips= CommonValidators.autoTips;
  loading =false;
  model:Branch = {};
  refreshSub$:any;
  ngOnInit() {
    this.initControl();
    if(this.isView){
      this.form.disable();
      this.refreshSub$ = this.branchUi.refresher.subscribe(e => {
        if(e.key === 'edited'){
          this.loading = true;
          this.service.find(this.id).subscribe(
            (result: any) => {
              this.loading = false;
              this.model = result;
              this.setFormValue();
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
        else {
          this.ref.triggerCancel();
        }
      });
    }
    if(this.id){
      this.loading = true;
      this.service.find(this.id).subscribe((result: any) =>{
        this.loading = false;
        this.model = result;
        this.setFormValue();
      });
    }
  }
  initControl(){
    const {required,nameMaxLengthValidator,noteMaxLengthValidator,multiplePhoneValidator} = CommonValidators;
    this.form = this.fb.group({
      code:[null,[required,noteMaxLengthValidator()]],
      name:[null,[required,nameMaxLengthValidator]],
      phone:[null,[required,multiplePhoneValidator]],
      address:[null,required]
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.loading = true;
      let operation$ = this.service.add(this.form.value);
        operation$.subscribe((result:Branch)=>{
          this.loading = false;
          this.model = result;
          this.ref.triggerOk().then();
        },(error:any)=>{
          console.log(error);
        })
    }
  }
  cancel(){
    this.ref.triggerCancel().then();
  }
  setFormValue(){
    this.form.setValue({
      name: this.model.name,
      code: this.model.code,
      phone: this.model.phone,
      address: this.model.address,
    })
  }
}
