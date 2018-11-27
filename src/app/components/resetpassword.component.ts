import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

declare var M:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: '../views/resetpassword.html',
  providers: [UserService]
})

export class ResetPasswordComponent implements OnInit{
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
		this.titulo = 'Reset Password';
		this.user_register = new User('','','','','');
    this.recruBoton = false;
	}

	ngOnInit(){
		console.log('resetpassword.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
	}

	public onSubmitReset(){
        //Confirm password                        New Password
		if(this.user_register.password != '' && this.user_register.email != '' && this.user_register.nombre != '')
		{
		  if(this.user_register.password == this.user_register.email){

        this._route.params.forEach((params: Params) => {
          let userToken = params['tokenn'];

          this.lockButton = true;
          let body = {
  			      password: this.user_register.password,
  			      token: userToken,
              email: this.user_register.nombre
  			  };

          this.lockButton = true;
          if(!this.recruBoton){
            this._userService.resetPasswordUser(body).subscribe(
      				response => {
      					//M.toast({html: response.message});
      					this.toastr.success(response.message + ' Go to Login', 'Awesome!');
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
          }else{
            this._userService.resetPasswordRecruiter(body).subscribe(
      				response => {
      					//M.toast({html: response.message});
      					this.toastr.success(response.message + ' Go to Login', 'Awesome!');
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
        });

      }else{
        this.toastr.error('Make sure your password is the same in both fields', 'Error!');
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
