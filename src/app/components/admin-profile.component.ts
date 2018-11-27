import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { UserScores } from '../models/userscores';
import { UserNormal } from '../models/usernormal';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: '../views/admin-profile.html',
  providers: [UserService]
})

export class AdminProfileComponent implements OnInit{
	public titulo: string;
	public totalUserPoints: number;
	public identity;
  	public token;
  	public user: User;
  	public userNormal: UserNormal;
  	public userScore: UserScores[] = [];
	public errorMessage;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private toastr: ToastrService
	){
		this.titulo = 'Admin Profile';
		this.user = new User('','','','','');
		this.userNormal = new UserNormal('','','','','',null,'','','','','');
		this.totalUserPoints = null;
	}

	ngOnInit(){
		console.log('admin-profile.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

  		if(this.identity)
  			this.getFeed();
	}

	getFeed(){
		if(this.identity.role == 'ROLE_ADMIN'){
			this._userService.getUsuario(this.identity.id).subscribe(
				response => {
					  this.userNormal = response.user;

					  	this._userService.getUserReferrals(this.identity.id).subscribe(
							response => {
								  for(var i in response){
								  	this.totalUserPoints = this.totalUserPoints + response[i].idrecomendados[0].total;
								  }
							},
							error => {
								var errorMessage = <any>error;

						        if(errorMessage != null){
						          var body = JSON.parse(error._body);
						          this.alertMessage = body.message;
				        		  this.toastr.error(this.alertMessage, 'Error!');
						        }
							}
						);
				},
				error => {
					var errorMessage = <any>error;

			        if(errorMessage != null){
			          var body = JSON.parse(error._body);
			          this.alertMessage = body.message;
	        		  this.toastr.error(this.alertMessage, 'Error!');
			        }
				}
			);
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
