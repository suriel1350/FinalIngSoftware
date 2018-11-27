import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

declare var M:any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: '../views/forgotpassword.html',
  providers: [UserService]
})

export class ForgotPasswordComponent implements OnInit{
	public titulo: string;
	public identity;
  	public token;
  	public user_register: User;
	public errorMessage;
	public alertRegister;
	public lockButton: boolean;
  public recruBoton: boolean;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private toastr: ToastrService
	){
		this.titulo = 'Forgot Password';
		this.user_register = new User('','','','','');
    this.recruBoton = false;
	}

	ngOnInit(){
		console.log('forgotpassword.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
	}

	public onSubmitForgot(){
		if(this.user_register.email != '')
		{
			let body = {
		      email: this.user_register.email
		    };

        if(!this.recruBoton){ // No es un reclutador
          //console.log("Usuario");
          this.lockButton = true;
          this._userService.sendLinkResetUser(body).subscribe(
    				response => {
    					//M.toast({html: response.message});
    					this.toastr.success(response.message, 'Awesome!');
    					this.lockButton = false;
    				},
    				error => {
    					var errorMessage = <any>error;

    			        if(errorMessage != null){
    			          var body = JSON.parse(error._body);
                    this.lockButton = false;
    			          this.alertRegister = body.message;
    			          this.toastr.error(this.alertRegister, 'Error!');
    			          console.log(error);
    			        }
    				}
    			);
        }else{ // Es un reclutador
          //console.log("Reclutador");
          this.lockButton = true;
          this._userService.sendLinkResetRecruiter(body).subscribe(
    				response => {
    					//M.toast({html: response.message});
    					this.toastr.success(response.message, 'Awesome!');
    					this.lockButton = false;
    				},
    				error => {
    					var errorMessage = <any>error;

    			        if(errorMessage != null){
    			          var body = JSON.parse(error._body);
                    this.lockButton = false;
    			          this.alertRegister = body.message;
    			          this.toastr.error(this.alertRegister, 'Error!');
    			          console.log(error);
    			        }
    				}
    			);
        }



		}else{
			this.toastr.error('Please fill out the form', 'Error!');
		}
	}

  isRecruiter(e){
    if(e.target.checked){
      this.recruBoton = true;
    }else{
      this.recruBoton = false;
    }
  }

	  logout(){
	  	localStorage.removeItem('identidad');
	    localStorage.removeItem('tokenrecomendado');
	  	localStorage.clear();
	  	this.identity = null;
	  	this.token = null;
	    this._router.navigate(['/login']);
	  }
}
