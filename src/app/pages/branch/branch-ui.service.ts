import {EventEmitter, Injectable} from "@angular/core";
import {NzModalService} from "ng-zorro-antd/modal";
import {BranchOperationComponent} from "./branch-operation.component";

@Injectable({providedIn: "root"})

export class BranchUiService {
  constructor(
    private modalService: NzModalService,
  ) {}
  refresher = new EventEmitter<{key:string, value?: any, componentId?:any}>();
  showAdd(componentId: any = ''): void{
    this.modalService.create({
      nzContent: BranchOperationComponent,
      nzFooter: null,
      nzClosable: true,
      nzWidth: '460px',
      nzBodyStyle: {height: '270px', padding: '0'},
      nzMaskClosable: false,
      nzOnOk: (e) => {
        this.refresher.emit({key: 'added', value: e.model, componentId});
      }
    });
  }
}


