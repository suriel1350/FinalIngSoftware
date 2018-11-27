import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ReferralService } from '../services/referral.service';
import { UserScores } from '../models/userscores';
import { UserNormal } from '../models/usernormal';
import { User } from '../models/user';
import { Referral } from '../models/referral';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referral-show',
  templateUrl: '../views/referral-show.html',
  providers: [UserService, ReferralService]
})

export class MyReferralShowComponent implements OnInit{
	public titulo: string;
	public totalUserPoints: number;
	public identity;
  	public token;
  	public user: User;
    public referral: Referral;
  	public userNormal: UserNormal;
  	public userScore: UserScores[] = [];
	public errorMessage;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
      private _referralService: ReferralService,
    	private toastr: ToastrService
	){
		this.titulo = 'Referral: ';
		this.user = new User('','','','','');
    this.referral = new Referral('','','','',null,'','','','','','','','',null,'','','','','','','','','','');
		this.userNormal = new UserNormal('','','','','',null,'','','','','');
		this.totalUserPoints = null;
	}

	ngOnInit(){
		console.log('referral-show.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

  		if(this.identity)
  			this.getReferral();
	}

	getReferral(){
    this._route.params.forEach((params: Params) => {
        let idReferral = params['idReferral'];

        if(this.identity.role == 'ROLE_RECRUITER'){
          this._referralService.getReferralRecruiter(idReferral, this.identity.id).subscribe(
    				response => {
                //console.log(response.nombre);
                this.referral = response;
                //console.log(this.referral);
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
        }else{
          this._referralService.getReferral(idReferral, this.identity.id).subscribe(
    				response => {
                //console.log(response.nombre);
                this.referral = response;
                //console.log(this.referral);
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
		});
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
