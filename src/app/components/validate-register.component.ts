import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validate',
  templateUrl: '../views/validate.html',
  providers: [UserService]
})

export class RegisterValidateComponent implements OnInit{
	public titulo: string;
	public identity;
  	public token;
  	public user_register: User;
	public errorMessage;
	public alertRegister;	
	public lockButton: boolean;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private toastr: ToastrService		
	){
		this.titulo = 'Validate Register';	
		this.lockButton = false;
		this.user_register = new User('','','','','');  		
	}

	ngOnInit(){
		console.log('validate-register.component cargado');
		this.identity = this._userService.getIdentity();		
  		this.token = this._userService.getToken();  		
	}

	onSubmitRegister(){
		if(this.user_register.password != '' && this.user_register.email != '')
		{
			this._route.params.forEach((params: Params) => {
				let userToken = params['tokenn'];

				let body = {
			      email: this.user_register.email,
			      password: this.user_register.password,
			      token: userToken
			    };

			    this.lockButton = true;

			    this._userService.validarRegister(body).subscribe(
					response => {										
						//M.toast({html: response.message});
						this.toastr.success(response.message, 'Awesome!');
						this.lockButton = false;
					},
					error => {
						var errorMessage = <any>error;

				        if(errorMessage != null){
				          var body = JSON.parse(error._body);
				          this.alertRegister = body.message;
				          this.toastr.error(this.alertRegister, 'Error!');
				          console.log(error);
				        }
					}	
				);
			});
		}else{
			this.toastr.error('Please, fill out the form', 'Error!');
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