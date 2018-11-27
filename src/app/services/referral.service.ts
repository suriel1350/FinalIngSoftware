import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class ReferralService{
	public identity;
	public token;
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	getExcelDataReferralsAndRecruiters(){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-referrals-for-excel', options).pipe(map(res => res.json()));
	}

	getReferralWithProcess(idRef, idUsuario){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-referral-user-with-process/'+idRef+'/'+idUsuario, options).pipe(map(res => res.json()));
	}

	sendEmailToRecruiters(idUs, parametros){
		let params = JSON.stringify(parametros);

		let headers = new Headers({
				'Content-Type':'application/json'
			});

		return this._http.post(this.url+'send-email-recruiters/'+idUs, params, {headers: headers}).pipe(map(res => res.json()));
	}

	updateUserPoints(idUs, points_to_update){

		let params = JSON.stringify(points_to_update);

		let headers = new Headers({
				'Content-Type':'application/json'
			});

		return this._http.post(this.url+'update-user-points/'+idUs, params, {headers: headers}).pipe(map(res => res.json()));
	}

	createReferral(referral, id){

		let params = JSON.stringify(referral);

		let headers = new Headers({
				'Content-Type':'application/json'
				//'Authorization': this.getToken()
			});

		return this._http.post(this.url+'create-referral/'+id, params, {headers: headers}).pipe(map(res => res.json()));
	}

	updateReferral(idRef, idUs, ref_to_update){

		let params = JSON.stringify(ref_to_update);

		let headers = new Headers({
				'Content-Type':'application/json'
			});

		return this._http.put(this.url+'update-referral/'+idRef+'/'+idUs, params, {headers: headers}).pipe(map(res => res.json()));
	}

	deleteReferralCV(idRef){

		let headers = new Headers({
				'Content-Type':'application/json'
				//'Authorization': this.getToken()
			});

		return this._http.post(this.url+'delete-referral-cv/'+idRef, {headers: headers}).pipe(map(res => res.json()));
	}

	addPoints(points_to_add, id){

		let params = JSON.stringify(points_to_add);

		let headers = new Headers({
				'Content-Type':'application/json'
				//'Authorization': this.getToken()
			});

		return this._http.post(this.url+'add-points/'+id, params, {headers: headers}).pipe(map(res => res.json()));
	}

	addTotal(id){

		let headers = new Headers({
				'Content-Type':'application/json'
				//'Authorization': this.getToken()
			});

		return this._http.post(this.url+'add-total/'+id, {headers: headers}).pipe(map(res => res.json()));
	}

	getReferrals(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-my-referrals/'+id, options).pipe(map(res => res.json()));
	}

	getRecruiterReferrals(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-my-referrals-recruiter/'+id, options).pipe(map(res => res.json()));
	}

	getReferral(idRef, idUsuario){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-referral-user/'+idRef+'/'+idUsuario, options).pipe(map(res => res.json()));
	}

	getReferralRecruiter(idRef, idUsuario){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'get-referral-recruiter/'+idRef+'/'+idUsuario, options).pipe(map(res => res.json()));
	}

	deleteReferral(id){
		let headers = new Headers({
			'Content-Type':'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url+'delete-referral/'+id, options).pipe(map(res => res.json()));
	}
}
