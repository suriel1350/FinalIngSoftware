import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

declare var M:any;

@Component({
  selector: 'app-navbar',
  templateUrl: '../views/navbar.html',
  providers: [UserService]
})

export class NavbarComponent implements OnInit{
	public titulo: string;
	public identity;
  	public token;
  	public user: User;
	public errorMessage;
	public alertRegister;

  languages = [
     { code: 'en', label: 'English'},
     { code: 'es', label: 'Español'}
   ];

   currentUrl = "";

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
      @Inject(LOCALE_ID) protected localeId: string
	){
		this.titulo = 'Login';
		this.user = new User('','','','','');


	}


	ngOnInit(){
		this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();

    this.currentUrl = this._router.url;
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
