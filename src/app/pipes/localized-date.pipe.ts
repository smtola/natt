import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Locale} from "../const";

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: Date | string, format = 'longDate'): string {
    const datePipe = new DatePipe(this.translateService.currentLang || Locale.DEFAULT);
    return <string>datePipe.transform(value, format);
  }
}
