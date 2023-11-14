import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import {CurrencyPipe, DecimalPipe, registerLocaleData} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SettingComponent} from "./pages/setting/setting.component";
import {HomePageComponent} from "./pages/home/home-page.component";
import {BranchComponent} from "./pages/branch/branch.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {PagesComponent} from "./pages/pages.component";
import {NoResultFoundComponent} from "./share-components/no-result-found.component";
import {FilterInputComponent} from "./share-components/filter-input.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MapLanguagePipe} from "./pipes/map-language.pipe";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LookupComponent} from "./pages/lookup/lookup.component";
import {BreadcrumbComponent} from "./pages/setting/breadcrumb.component";
import {LanguageInputComponent} from "./share-components/language-input.component";
import {BranchOperationComponent} from "./pages/branch/branch-operation.component";
import {RedirectComponent} from "./redirect/redirect.component";
import {TokenInterceptor} from "./helpers/token.interceptor";
import {BaseMultipleSelectComponent} from "./share-components/base-multiple-select.component";
import {AntModule} from "./ant.module";
import {SettingHttpService} from "./app-setting";
import {LookupItemListComponent} from "./pages/lookup/lookup-item-list/lookup-item-list.component";
import {LookupItemOperationComponent} from "./pages/lookup/lookup-item-list/lookup-item-operation.component";

export function app_Init(settingsHttpService: SettingHttpService) {
  return () => settingsHttpService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    HomePageComponent,
    BranchComponent,
    PagesComponent,
    LookupComponent,
    LookupItemListComponent,


    NoResultFoundComponent,
    FilterInputComponent,
    LanguageInputComponent,

    MapLanguagePipe,

    BreadcrumbComponent,
    BranchOperationComponent,
    LookupItemOperationComponent,
    RedirectComponent,
    BaseMultipleSelectComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    TranslateModule,
    AntModule
  ],
  providers: [
    {
      provide: NZ_I18N, useValue: en_US,

    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: app_Init, deps: [SettingHttpService], multi: true},
    DecimalPipe,CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
