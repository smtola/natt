import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MultiLanguageInput} from "../share-components/language-input.component";

@Pipe({
  name: 'mapLanguage'
})
@Injectable({
  providedIn: "root"
})
export class MapLanguagePipe implements PipeTransform {
  constructor
  (
    public translate: TranslateService,
  ) {}

   transform(val: any, localId: any = null): any {
    try {
      let language = JSON.parse(val);
      return language[localId || this.translate.currentLang];
    }
    catch {
      return val;
    }
  }

}
