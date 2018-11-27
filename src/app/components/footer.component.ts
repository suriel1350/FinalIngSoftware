import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

declare var M:any;

@Component({
  selector: 'app-footer',
  templateUrl: '../views/footer.html',
  providers: [UserService]
})

export class FooterComponent implements OnInit{
	public titulo: string;
	public identity;
  	public token;
  	public user: User;
	public errorMessage;
	public alertRegister;	

	
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService
	){
		this.titulo = 'Login';	
		this.user = new User('','','','','');  		
	}


	ngOnInit(){		
		this.identity = this._userService.getIdentity();		
  		this.token = this._userService.getToken();  		
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