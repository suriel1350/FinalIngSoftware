import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { routing, appRoutingProviders } from './app.routing';

import { LoginComponent } from './components/login.component';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { RegisterComponent } from './components/register.component';
import { RegisterValidateComponent } from './components/validate-register.component';
import { InicioComponent } from './components/inicio.component';
import { NavbarLoggedComponent }  from './components/navbar-logged.component';
import { ReferralsComponent } from './components/referrals.component';
import { NewReferralComponent } from './components/referral-new.component';
import { ReferralShowComponent } from './components/referrals-show.component';
import { EditProfileComponent } from './components/edit-profile.component';
import { MyReferralShowComponent } from './components/referral-show.component';
import { EditReferralComponent } from './components/referral-edit.component';
import { NavbarAdminComponent } from './components/navbar-admin.component';
import { NavbarRecruComponent } from './components/navbar-recruiter.component';
import { AdminProfileComponent } from './components/admin-profile.component';
import { GetCardsComponent } from './components/get-cards.component';
import { ForgotPasswordComponent } from './components/forgotpassword.component';
import { ResetPasswordComponent } from './components/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterValidateComponent,
    InicioComponent,
    NavbarLoggedComponent,
    ReferralsComponent,
    NewReferralComponent,
    ReferralShowComponent,
    EditProfileComponent,
    MyReferralShowComponent,
    EditReferralComponent,
    NavbarAdminComponent,
    NavbarRecruComponent,
    AdminProfileComponent,
    GetCardsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMultiSelectModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    FormsModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
