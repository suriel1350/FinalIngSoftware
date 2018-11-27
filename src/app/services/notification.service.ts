import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { GLOBALSOCKET } from './globalsocket';

//import * as io from 'socket.io-client';

@Injectable()
export class NotificationService{
	public identity;
	public token;
	public url: string;

  // public socket;

	constructor(private _http: Http){
		this.url = GLOBALSOCKET.urldevelopment;
		//this.url = GLOBALSOCKET.urlproduction;
		//this.url = 'https://reward-referral-program.herokuapp.com';//'http://localhost:8000';
    //this.socket = io(this.url);
	}

  /*getUserNotification(){
		let observable = new Observable(observer => {
			this.socket.on('user-noti-added', (data) => {
				console.log(data);
				observer.next(data);
			});
		});

		return observable;
	}*/
	updateUserPoints(info:any, socket:any): void{
		socket.emit('update-user-points', info);
	}

	createUserNotification(info:any, socket:any): void{
    socket.emit('add-user-notification', info);
  }

	createRecruNotification(info:any, socket:any): void{
    socket.emit('add-recru-notification', info);
  }

}
