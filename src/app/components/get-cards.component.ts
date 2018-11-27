import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ReferralService } from '../services/referral.service';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

import { GLOBALSOCKET } from '../services/globalsocket';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-getcards',
  templateUrl: '../views/get-cards.html',
  providers: [UserService, ReferralService]
})

export class GetCardsComponent implements OnInit{
  @ViewChild('confirmation') public confiModal;

	public titulo: string;
  public confValue: number;
	public identity;
  	public token;
  	public user: User;
	public errorMessage;
  public alertRegister;
	public alertMessage;
  public totalUserPoints: number;
  public buttonStatus: boolean;

  private url: string;
  private socket;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
      private _referralService: ReferralService,
    	private toastr: ToastrService
	){
		this.titulo = 'Get a card';
		this.user = new User('','','','','');
    this.totalUserPoints = null;
    this.confValue = null;
    this.buttonStatus = false;
    this.url = GLOBALSOCKET.urldevelopment;
	}

	ngOnInit(){
		console.log('get-cards.component cargado');
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

  getFeed(){
    if(this.identity.role == 'ROLE_USER'){
      this._userService.getUsuario(this.identity.id).subscribe(
				response => {
          this.totalUserPoints = response.user.totalpoints;
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

  showConfirmation(cardType){
    this.confValue = cardType;
    this.confiModal.show();
  }

  checkPoints(cardType){
    if(cardType == 1000){
      if(this.totalUserPoints >= 1000){
        this.buttonStatus = true;
        this.totalUserPoints = this.totalUserPoints - 1000;

        let points_to_updt = {
             points: 1000,
             totalpoints: this.totalUserPoints,
             nombre: this.identity.nombre,
             email: this.identity.email
        };

        this._referralService.sendEmailToRecruiters(this.identity.id, points_to_updt).subscribe(
          response => {
            this.buttonStatus = false;
            this.confiModal.hide();
            this.getFeed();
            this.toastr.warning('An email has been sent to TalentHub Team requesting your Amazon Card', 'Email sent!');
          },
          error => {
            var errorMessage = <any>error;

                if(errorMessage != null){
                  var body = JSON.parse(error._body);
                  this.alertMessage = body.message;
                  this.buttonStatus = false;
                  this.toastr.error(this.alertMessage, 'Error!');
                }
          }
        );

      }else{
        this.toastr.error('You need a minimum of 1000 points to get this card', 'Error!');
      }
    }

    if(cardType == 2000){
      if(this.totalUserPoints >= 2000){
        this.buttonStatus = true;
        this.totalUserPoints = this.totalUserPoints - 2000;
        let points_to_updt = {
             points: 2000,
             totalpoints: this.totalUserPoints,
             nombre: this.identity.nombre,
             email: this.identity.email
        };

        this._referralService.sendEmailToRecruiters(this.identity.id, points_to_updt).subscribe(
          response => {
            this.buttonStatus = false;
            this.confiModal.hide();
            this.getFeed();
            this.toastr.warning('An email has been sent to TalentHub Team requesting your Amazon Card', 'Email sent!');
          },
          error => {
            var errorMessage = <any>error;

                if(errorMessage != null){
                  var body = JSON.parse(error._body);
                  this.alertMessage = body.message;
                  this.buttonStatus = false;
                  this.toastr.error(this.alertMessage, 'Error!');
                }
          }
        );

      }else{
        this.toastr.error('You need a minimum of 2000 points to get this card', 'Error!');
      }
    }

    if(cardType == 3000){
      if(this.totalUserPoints >= 3000){
        this.buttonStatus = true;
        this.totalUserPoints = this.totalUserPoints - 3000;
        let points_to_updt = {
             points: 3000,
             totalpoints: this.totalUserPoints,
             nombre: this.identity.nombre,
             email: this.identity.email
        };

        this._referralService.sendEmailToRecruiters(this.identity.id, points_to_updt).subscribe(
          response => {
            this.buttonStatus = false;
            this.confiModal.hide();
            this.getFeed();
            this.toastr.warning('An email has been sent to TalentHub Team requesting your Amazon Card', 'Email sent!');
          },
          error => {
            var errorMessage = <any>error;

                if(errorMessage != null){
                  var body = JSON.parse(error._body);
                  this.alertMessage = body.message;
                  this.buttonStatus = false;
                  this.toastr.error(this.alertMessage, 'Error!');
                }
          }
        );
      }else{
        this.toastr.error('You need a minimum of 3000 points to get this card', 'Error!');
      }
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
