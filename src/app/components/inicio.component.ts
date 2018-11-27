import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ReferralService } from '../services/referral.service';
import { UserScores } from '../models/userscores';
import { UserNormal } from '../models/usernormal';
import { User } from '../models/user';
import { Proceso } from '../models/proceso';
import { Referral } from '../models/referral';
import { Recruiter } from '../models/recruiter';

import { ToastrService } from 'ngx-toastr';

import { GLOBALSOCKET } from '../services/globalsocket';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-inicio',
  templateUrl: '../views/inicio.html',
  providers: [UserService, ReferralService]
})

export class InicioComponent implements OnInit{
  @ViewChild('bonuses') public bonusModal;

	public titulo: string;
  public status: string;
  public cardAmazon: number;
	public totalUserPoints: number;
	public identity;
  	public token;
  	public user: User;
  	public userNormal: UserNormal;
    public userRecruiter: Recruiter;
  	public userScore: UserScores[] = [];
    public referral: Referral[] = [];
    public proceso: Proceso[] = [];
	public errorMessage;
	public alertMessage;

  private url: string;
  private socket;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
      private _referralService: ReferralService,
    	private toastr: ToastrService
	){
		this.titulo = 'Main';
		this.user = new User('','','','','');
    this.userNormal = new UserNormal('','','','','',null,'','','','','');
		this.userRecruiter = new Recruiter('','','','','',null,'','','','','');
		this.totalUserPoints = null;
    this.status = '';
    this.cardAmazon = null;
    this.url = GLOBALSOCKET.urldevelopment;
	}

	ngOnInit(){
		console.log('inicio.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

      this.socket = io.connect(this.url);

      this.socket.on('make-user-update-points', (data) => {
        //console.log('user-noti-added: '+JSON.stringify(data));
        //console.log(data);
        if(data.idusuarios == this.identity.id)
          this.getFeed();
      });

  		if(this.identity)
  			this.getFeed();
	}

  showBonus(){


    this._referralService.getReferrals(this.identity.id).subscribe(
      response => {
        this.proceso = [];
        this.referral = response;
        for (var i in response) {
          //console.log(response[i].idrecomendados[0]);
          this.proceso.push(response[i].idrecomendados[0]);
        }
        //console.log(this.proceso[0].idrecomendados);
        //console.log(this.proceso);
        this.bonusModal.show();
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

	getFeed(){
		if(this.identity.role == 'ROLE_USER'){
			this._userService.getUsuario(this.identity.id).subscribe(
				response => {
					  this.userNormal = response.user;
              this.totalUserPoints = response.user.totalpoints;

					  	/*this._userService.getUserReferrals(this.identity.id).subscribe(
							response => {

								  for(var i in response){
								  	this.totalUserPoints = this.totalUserPoints + response[i].idrecomendados[0].total;
								  }*/

                  if((this.totalUserPoints >= 1000) && (this.totalUserPoints < 2000))
                    this.cardAmazon = 1000;

                  if((this.totalUserPoints >= 2000) && (this.totalUserPoints < 3000))
                    this.cardAmazon = 2000;

                  if((this.totalUserPoints == 3000))
                    this.cardAmazon = 3000;

                  if((this.totalUserPoints > 3000))
                    this.cardAmazon = 1000;

                  if(this.totalUserPoints <= 500)
                    this.status = 'Beginner';
                  else
                    if((this.totalUserPoints > 500) && (this.totalUserPoints <= 1000))
                      this.status = 'Specialist';
                    else
                      if((this.totalUserPoints > 1000) && (this.totalUserPoints <= 1500))
                        this.status = 'Professional';
                      else
                        if((this.totalUserPoints > 1500) && (this.totalUserPoints <= 2000))
                          this.status = 'Expert';
                        else
                          if((this.totalUserPoints > 2000) && (this.totalUserPoints <= 2500))
                            this.status = 'Master';
                          else
                            if(this.totalUserPoints > 2500)
                              this.status = 'Super Master';

							/*},
							error => {
								var errorMessage = <any>error;

						        if(errorMessage != null){
						          var body = JSON.parse(error._body);
						          this.alertMessage = body.message;
				        		  this.toastr.error(this.alertMessage, 'Error!');
						        }
							}
						);*/
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

    if(this.identity.role == 'ROLE_RECRUITER'){
			this._userService.getRecruiter(this.identity.id).subscribe(
				response => {
					  this.userRecruiter = response.recruiter;
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

		if(this.identity.role == 'ROLE_ADMIN'){
			this._userService.getScores().subscribe(
				response => {
					let total = 0;
					for(var i in response){

						for( var j in response[i].idusuarios){
							total = total + response[i].idusuarios[j].idrecomendados[0].total;
						}

						let myObj = new UserScores(response[i].id, response[i].nombre, response[i].email, response[i].role, response[i].phone, response[i].idusuarios.length, total);
						this.userScore.push(myObj);
						total = 0;

					}

					//console.log(this.userScore);
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
