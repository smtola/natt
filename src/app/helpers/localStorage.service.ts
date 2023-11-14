import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  getValue<T>(key: string): T {
    return JSON.parse(<string>localStorage.getItem(key));
  }

  setValue(option: { key: string; value: any }): void {
    if (localStorage.getItem(option.key)) {
      localStorage.removeItem(option.key);
    }
    localStorage.setItem(option.key, JSON.stringify(option.value));
  }

  removeValue(key:any): void{
    localStorage.removeItem(key);
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

}
//
// export class LocalStorageHelper {
//   static getValue<T>(key: string): T {
//     return JSON.parse(localStorage.getItem(key));
//   }
//
//   static setValue(key: string, value: any): void {
//     if (localStorage.getItem(key)) {
//       localStorage.removeItem(key);
//     }
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// }
