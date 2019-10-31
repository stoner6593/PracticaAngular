import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import {Route,  RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ErrorInterceptor} from './services/ErrorInterceptor'
//import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { FormEditComponent } from './form-edit/form-edit.component';
import { ModalComponent } from './modal/modal.component';

const routes: Route[]=[
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'form', component: FormComponent},
  { path: 'form-edit/:id', component: FormEditComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    NavbarComponent,
    FormEditComponent,
    ModalComponent,
    /*BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,*/
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
  ],
  entryComponents: [ ModalComponent ],
  
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }  ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
