import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

declare var M:any;

@Component({
  selector: 'app-register',
  templateUrl: '../views/register.html',
  providers: [UserService]
})

export class RegisterComponent implements OnInit{
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
		this.titulo = 'Sign up';	
		this.user_register = new User('','','','',''); 
	}

	ngOnInit(){
		console.log('register.component cargado');
		this.identity = this._userService.getIdentity();		
  		this.token = this._userService.getToken();  		
	}

	public onSubmitRegister(){
		if(this.user_register.nombre != '' && this.user_register.email != '')
		{
			let body = {
		      email: this.user_register.email,
		      nombre: this.user_register.nombre
		    };

		    this.lockButton = true;

		    this._userService.sendTokenEmail(body).subscribe(
				response => {															
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

		}else{
			this.toastr.error('Please fill out the form', 'Error!');
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