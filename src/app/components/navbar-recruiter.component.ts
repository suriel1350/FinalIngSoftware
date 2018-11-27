import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import { GLOBALSOCKET } from '../services/globalsocket';
import { ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-navbarrecru',
  templateUrl: '../views/navbarrecru.html',
  providers: [UserService]
})

export class NavbarRecruComponent implements OnInit{
  @ViewChild('contentnotirecru') public contentModal;
  public name: string;

	public titulo: string;
	public identity;
  	public token;
  	public user: User;
    public notification: Notification[] = [];
	public errorMessage;
	public alertRegister;
  public alertMessage;

  private url: string; //= 'https://reward-referral-program.herokuapp.com';//'http://localhost:8000';
  private socket;

  languages = [
     { code: 'en', label: 'English'},
     { code: 'es', label: 'Español'}
   ];

   currentUrl = "";

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private toastr: ToastrService,
      @Inject(LOCALE_ID) protected localeId: string
	){
		this.titulo = 'Navbar Recru';
		this.user = new User('','','','','');
    this.url = GLOBALSOCKET.urldevelopment;

    this.currentUrl = this._router.url;
	}


	ngOnInit(){
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

      this.socket = io.connect(this.url);

        this.socket.on('recru-noti-added', (data) => {
          //console.log('user-noti-added: '+JSON.stringify(data));
          //console.log(data.info.contenido);
          if(this.identity)
            if(data.info.idrecruiters == this.identity.id)
              this.toastr.success(data.info.contenido, 'Success!');
        });
	}

  show(value:string){
    this.notification = [];
    this._userService.getRecruNotification(this.identity.id).subscribe(
      response => {
        //this.notification = response.user_notis;
        for(var i in response.recru_notis){
          let strFirstNine = response.recru_notis[i].createdAt.substring(0,10);

          let aux = new Notification(response.recru_notis[i].id, response.recru_notis[i].contenido, strFirstNine)
          this.notification.push(aux);
        }
        //console.log(this.notification);
      },
      error => {
        var errorMessage = <any>error;

            if(errorMessage != null){
              var body = JSON.parse(error._body);
              this.alertRegister = body.message;
              this.toastr.error(this.alertRegister, 'Error!');
            }
      }
    );

    this.contentModal.show();
  }

  deleteNotification(id){

    this._userService.deleteRecruNotification(id).subscribe(
			response => {
        this.notification = [];
        this.show('delete');

			},
			error => {
				var errorMessage = <any>error;

	  			if(errorMessage != null){
	  				var body = JSON.parse(error._body);
	  				this.alertMessage = body.message;

	  				console.log(error);
	  			}
			}
		);
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
