import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {MatDialogModule} from '@angular/material';



import { AppComponent } from './app.component';
import {AuthInterceptor} from './auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import { ModalModule} from 'ngx-bootstrap';

import { HeaderComponent } from './main-page/header/header.component';
import { ContentFormComponent } from './main-page/content-form/content-form.component';
import { UserContenComponent } from './main-page/user-conten/user-conten.component';
import { UserListComponent } from './user-list/user-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormRegComponent } from './main-page/form-reg/form-reg.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import {ErrorComponent} from './error/error.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentFormComponent,
    UserContenComponent,
    UserListComponent,
    MainPageComponent,
    FormRegComponent,
    EditPageComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    ModalModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
