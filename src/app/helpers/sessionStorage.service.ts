import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  constructor() {}

  getValue<T>(key: string): T {
    return JSON.parse(<string>sessionStorage.getItem(key));
  }

  setValue(option: { key: string; value: any }): void {
    if (sessionStorage.getItem(option.key)) {
      sessionStorage.removeItem(option.key);
    }
    sessionStorage.setItem(option.key, JSON.stringify(option.value));
  }

  removeValue(key:any): void{
    sessionStorage.removeItem(key);
  }
  setPageSizeOptionKey(pageSize:any, key:any){
    let value: any[] = [];
    value = this.getValue('page-size-option') || [];
    const index = value.findIndex((e: { key: any; }) => e.key === key);
    index !== -1 ? value[index].value = pageSize : value.push({key: key, value: pageSize});
    this.setValue({key: 'page-size-option', value});
  }
  getCurrentPageSizeOption(key: any): any{
    let pageSizeOptions:any[] = [];
    pageSizeOptions = this.getValue('page-size-option') ?? [];
    return pageSizeOptions.filter(item => item.key === key)[0]?.value;
  }

  setStaffMenu(value: any , key: any){
    this.setValue({key,value})
  }

  getCurrentStaffMenu(key: any): any{
    return  this.getValue(key);
  }

}
