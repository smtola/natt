import {AfterViewInit, EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MainPageService{
  constructor(
  ) {
    this.currentSidebarSize.subscribe(e=>{
      this.sidebar = e;
    })
  }
  currentSidebarSize = new EventEmitter<{width?:any, height?: any}>();
  sidebar: {width?: any, height?: any} = {width: 90, height: 937};
  getModalFullPageSize(){
    return {paddingLeft: `${this.sidebar.width+2}px`}
  }
  getModalBodyStyle() {
    return {height: `${this.sidebar.height-180}px`, padding: '0'}
  }
}
