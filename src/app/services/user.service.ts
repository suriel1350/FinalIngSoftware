import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public identity;
	public token;
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	sendLinkResetUser(email){
		let params = JSON.stringify(email);

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'reset-email-password-user', params, {headers: headers}).pipe(map(res => res.json()));
	}

	resetPasswordUser(parametros){
		let params = JSON.stringify(parametros);

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'reset-password-user', params, {headers: headers}).pipe(map(res => res.json()));
	}

	sendLinkResetRecruiter(email){
		let params = JSON.stringify(email);

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'reset-email-password-recruiter', params, {headers: headers}).pipe(map(res => res.json()));
	}

	resetPasswordRecruiter(parametros){
		let params = JSON.stringify(parametros);

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'reset-password-recruiter', params, {headers: headers}).pipe(map(res => res.json()));
	}

	deleteUserNotification(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'delete-user-notification/'+id, options).pipe(map(res => res.json()));
	}

	getUserNotification(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-user-notification/'+id, options).pipe(map(res => res.json()));
	}

	deleteRecruNotification(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'delete-recru-notification/'+id, options).pipe(map(res => res.json()));
	}

	getRecruNotification(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-recru-notification/'+id, options).pipe(map(res => res.json()));
	}

	deleteUserImage(idUs){

		let headers = new Headers({
				'Content-Type':'application/json'
				//'Authorization': this.getToken()
			});

		return this._http.post(this.url+'delete-user-photo/'+idUs, {headers: headers}).pipe(map(res => res.json()));
	}

	deleteRecruiterImage(idUs){

		let headers = new Headers({
				'Content-Type':'application/json'
				//'Authorization': this.getToken()
			});

		return this._http.post(this.url+'delete-recruiter-photo/'+idUs, {headers: headers}).pipe(map(res => res.json()));
	}

	signup(user_to_login, gethash = null){
		if(gethash != null){
			user_to_login.gethash = gethash;
		}

		let json = JSON.stringify(user_to_login);
		let params = json;

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'login', params, {headers: headers}).pipe(map(res => res.json()));
	}

	signupRecruiter(user_to_login, gethash = null){
		if(gethash != null){
			user_to_login.gethash = gethash;
		}

		let json = JSON.stringify(user_to_login);
		let params = json;

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'login-recruiter', params, {headers: headers}).pipe(map(res => res.json()));
	}

	register(user_to_register){
		let params = JSON.stringify(user_to_register);

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'register', params, {headers: headers}).pipe(map(res => res.json()));
	}

	sendTokenEmail(data_to_register){

		let params = JSON.stringify(data_to_register);

		let headers = new Headers({
				'Content-Type':'application/json'
			});

		return this._http.post(this.url+'send-token', params, {headers: headers}).pipe(map(res => res.json()));
	}

	validarRegister(user_to_register){
		let params = JSON.stringify(user_to_register);

		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'register-user', params, {headers: headers}).pipe(map(res => res.json()));
	}

	updateUser(user_to_update){

		let params = JSON.stringify(user_to_update);

		let headers = new Headers({
				'Content-Type':'application/json',
				'Authorization': this.getToken()
			});

		return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers}).pipe(map(res => res.json()));
	}

	updateUsuario(id, user_to_update){

		let params = JSON.stringify(user_to_update);

		let headers = new Headers({
				'Content-Type':'application/json'
			});

		return this._http.put(this.url+'update-user/'+id, params, {headers: headers}).pipe(map(res => res.json()));
	}

	updateRecruiter(id, user_to_update){

		let params = JSON.stringify(user_to_update);

		let headers = new Headers({
				'Content-Type':'application/json'
			});

		return this._http.put(this.url+'update-recruiter/'+id, params, {headers: headers}).pipe(map(res => res.json()));
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identidad'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('tokenrecomendado');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	getUsuarios(token, id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'usuarios-ya-registrados/'+id, options).pipe(map(res => res.json()));
	}

	getUsuario(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-user/'+id, options).pipe(map(res => res.json()));
	}

	getRecruiter(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-recruiter/'+id, options).pipe(map(res => res.json()));
	}

	getScores(){
		let headers = new Headers({
			'Content-Type':'application/json'
			//'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-users', options).pipe(map(res => res.json()));
	}

	getUserReferrals(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-my-referrals/'+id, options).pipe(map(res => res.json()));
	}

	deleteUser(token, id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'delete-user/'+id, options).pipe(map(res => res.json()));
	}
}
