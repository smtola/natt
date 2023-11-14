import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./pages/home/home-page.component";
import {PagesComponent} from "./pages/pages.component";
import {SettingComponent} from "./pages/setting/setting.component";
import {BranchComponent} from "./pages/branch/branch.component";
import {LookupComponent} from "./pages/lookup/lookup.component";
import {RouteGuardService} from "./helpers/route-guard.service";
import {RedirectComponent} from "./redirect/redirect.component";

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path:'',
    component:PagesComponent,
     canActivate: [RouteGuardService],
    children:[
      {
        path:'home',
        component:HomePageComponent
      },
      {
        path:'setting',
        component:SettingComponent
      },
      {
        path:'setting/branch',
        component:BranchComponent,
        data: [
          {index:0,label: "Setting", url:'/setting'},
          {index:1,label: "Branch", url: null}
        ]
      },
      {
        path:'setting/lookup',
        component:LookupComponent,
        data: [
          {index:0,label: "Setting", url:'/setting'},
          {index:1,label: "Lookup", url: null}
        ]
      }
    ]
  },
   {
      path: 'redirect/:requestId',
     component: RedirectComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
