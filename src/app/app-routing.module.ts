import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';

import {MainPageComponent} from './main-page/main-page.component';
import {UserListComponent} from './user-list/user-list.component';
import {ContentFormComponent} from './main-page/content-form/content-form.component';
import {FormRegComponent} from './main-page/form-reg/form-reg.component';
import {EditPageComponent} from './edit-page/edit-page.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full'},
  { path: 'main-page', component: MainPageComponent, children: [
      { path: '', component: ContentFormComponent },
      { path: 'form-reg', component: FormRegComponent},
    ]},
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'edit/:userId', component: EditPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
