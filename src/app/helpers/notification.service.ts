import {Injectable} from "@angular/core";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Injectable({providedIn: 'root'})

export class NotificationService {
  constructor(private notification: NzNotificationService, private translateService: TranslateService) {}

  errorNotification(error: HttpErrorResponse): void {
    this.notification.create('error',`${this.translateService.instant("unsuccess")}`,this.translateService.instant(error.error.message));
  }
  successNotification(content: string, title:string = "success"): void{
    this.notification.create('success',this.translateService.instant(title),this.translateService.instant(content));
  }
  customErrorNotification(content: string, title:string = "error"){
    this.notification.create('error',`${this.translateService.instant(title)}`,this.translateService.instant(content));
  }
  customContentErrorNotification(content: string){
    this.notification.create('error',`${this.translateService.instant("unsuccess")}`,content);
  }
}

