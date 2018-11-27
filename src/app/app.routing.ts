import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from  '@angular/router';

//import user
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { RegisterValidateComponent } from './components/validate-register.component';
import { InicioComponent } from './components/inicio.component';
import { ReferralsComponent } from './components/referrals.component';
import { NewReferralComponent } from './components/referral-new.component';
import { ReferralShowComponent } from './components/referrals-show.component';
import { EditProfileComponent } from './components/edit-profile.component';
import { MyReferralShowComponent } from './components/referral-show.component';
import { EditReferralComponent } from './components/referral-edit.component';
import { AdminProfileComponent } from './components/admin-profile.component';
import { GetCardsComponent } from './components/get-cards.component';
import { ForgotPasswordComponent } from './components/forgotpassword.component';
import { ResetPasswordComponent } from './components/resetpassword.component';

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent },
	{path: 'register', component: RegisterComponent },
	{path: 'inicio', component: InicioComponent },
	{path: 'referrals', component: ReferralsComponent },
	{path: 'create-referral', component: NewReferralComponent },
	{path: 'my-referral/:idReferral', component: MyReferralShowComponent },
	{path: 'edit-referral/:idReferral', component: EditReferralComponent },
	{path: 'see-referrals', component: ReferralShowComponent },
	{path: 'admin-profile', component: AdminProfileComponent },
	{path: 'edit-profile', component: EditProfileComponent },
	{path: 'get-card', component: GetCardsComponent },
	{path: 'forgot-password', component: ForgotPasswordComponent},
	{path: 'register-user/:tokenn', component: RegisterValidateComponent },
	{path: 'reset-password/:tokenn', component: ResetPasswordComponent},
	{path: '**', pathMatch: 'full', redirectTo: 'login' }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
