import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { UserScores } from '../models/userscores';
import { UserNormal } from '../models/usernormal';
import { Recruiter } from '../models/recruiter';
import { GLOBAL } from '../services/global';

import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';

@Component({
  selector: 'app-editprofile',
  templateUrl: '../views/editprofile.html',
  providers: [UserService]
})

export class EditProfileComponent implements OnInit{
	public titulo: string;
	public url: string;
	public lockButton: boolean;
	public identity;
  	public token;
  	public user: User;
    public userNormal: UserNormal;
  	public userRecruiter: Recruiter;
  	public userScore: UserScores[] = [];
	public errorMessage;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private toastr: ToastrService
	){
		this.titulo = 'Edit my profile';
		this.lockButton = false;
		this.user = new User('','','','','');
    this.userNormal = new UserNormal('','','','','',null,'','','','','');
		this.userRecruiter = new Recruiter('','','','','',null,'','','','','');
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('edit-profiles.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

  		if(this.identity){
  			$(document).ready(function(){
	  			$(".form").on("change", ".file-upload-field", function(){
		            $(this).parent(".file-upload-wrapper").attr("data-text",
				    $(this).val().replace(/.*(\/|\\)/, '') );
		        });
			});
  			this.getInfo();
  		}
	}

	getInfo(){
    if(this.identity.role == 'ROLE_RECRUITER'){
      this._userService.getRecruiter(this.identity.id).subscribe(
        response => {
            this.userNormal = response.recruiter;
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
  			this._userService.getUsuario(this.identity.id).subscribe(
  				response => {
  					  this.userNormal = response.user;
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

	onSubmit(){
    if(this.identity.role == 'ROLE_RECRUITER'){
      if(this.filesToUpload){
        let ext = this.filesToUpload[0].type;
  			console.log(ext);
  			this.lockButton = true;

  			if(ext == 'image/png' || ext == 'image/jpeg' || ext == 'image/jpg'){

          this._userService.deleteRecruiterImage(this.identity.id).subscribe(
            response => {
                 // Aqui ya se borro la Photo del bucket, ahora hay que actualizar los datos nuevos primero
                 this._userService.updateRecruiter(this.identity.id, this.userNormal).subscribe(
                  response => {
                        //Ya se actualizaron los datos, ahora a subir el nuevo file
                        this.makeFileRequest(this.url+'submit-recruiter-s3/'+this.identity.id, [], this.filesToUpload).then(
            							(result: any) => {
            								  this.lockButton = false;
            			            		  this.toastr.success('Your changes have been registered', 'Success!');
                                    if(this.identity.role == 'ROLE_RECRUITER')
            	                			  this._router.navigate(['inicio']);
            							},
            							error => {
                                  this.lockButton = false;
            			            		  this.toastr.error('There was an error uploading your photo, check if your photo is on png format', 'Error!');
            							}
            						);
                  },
                  error => {
                    var errorMessage = <any>error;

                        if(errorMessage != null){
                          var body = JSON.parse(error._body);
                          this.alertMessage = body.message;
                           this.lockButton = false;
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
                   this.lockButton = false;
                     this.toastr.error(this.alertMessage, 'Error!');
                 }
            }
          );
  			}else{
          this.lockButton = false;
  	            this.toastr.error('Please, upload your photo in png or jpeg format', 'Error!');
  			}
      }else{
        this.lockButton = true;
  			this._userService.updateRecruiter(this.identity.id, this.userNormal).subscribe(
  				response => {
  					this.lockButton = false;
  			        this.toastr.success('Your changes have been registered', 'Success!');
                if((this.identity.role == 'ROLE_RECRUITER'))
                  this._router.navigate(['inicio']);
  				},
  				error => {
  					var errorMessage = <any>error;

  			        if(errorMessage != null){
  			          var body = JSON.parse(error._body);
  			          this.alertMessage = body.message;
                  this.lockButton = false;
              		  this.toastr.error(this.alertMessage, 'Error!');
  			        }
  				}
  			);
      }
    }else{
  		if(this.filesToUpload){
  			let ext = this.filesToUpload[0].type;
  			console.log(ext);
  			this.lockButton = true;

  			if(ext == 'image/png' || ext == 'image/jpeg' || ext == 'image/jpg'){

          this._userService.deleteUserImage(this.identity.id).subscribe(
            response => {
                 // Aqui ya se borro la Photo del bucket, ahora hay que actualizar los datos nuevos primero
                 this._userService.updateUsuario(this.identity.id, this.userNormal).subscribe(
                  response => {
                        //Ya se actualizaron los datos, ahora a subir el nuevo file
                        this.makeFileRequest(this.url+'submit-user-s3/'+this.identity.id, [], this.filesToUpload).then(
            							(result: any) => {
            								  this.lockButton = false;
            			            		  this.toastr.success('Your changes have been registered', 'Success!');
                                    if(this.identity.role == 'ROLE_USER')
            	                			  this._router.navigate(['inicio']);

                                    if(this.identity.role == 'ROLE_ADMIN')
            	                			  this._router.navigate(['admin-profile']);
            							},
            							error => {
                                  this.lockButton = false;
            			            		  this.toastr.error('There was an error uploading your photo, check if your photo is on png format', 'Error!');
            							}
            						);
                  },
                  error => {
                    var errorMessage = <any>error;

                        if(errorMessage != null){
                          var body = JSON.parse(error._body);
                          this.alertMessage = body.message;
                           this.lockButton = false;
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
                   this.lockButton = false;
                     this.toastr.error(this.alertMessage, 'Error!');
                 }
            }
          );
  			}else{
          this.lockButton = false;
  	            this.toastr.error('Please, upload your photo in png or jpeg format', 'Error!');
  			}
  		}else{
  			//this.lockButton = true;
  			this._userService.updateUsuario(this.identity.id, this.userNormal).subscribe(
  				response => {
  					this.lockButton = false;
  			        this.toastr.success('Your changes have been registered', 'Success!');
                if(this.identity.role == 'ROLE_USER')
                  this._router.navigate(['inicio']);

                if(this.identity.role == 'ROLE_ADMIN')
                  this._router.navigate(['admin-profile']);
  				},
  				error => {
  					var errorMessage = <any>error;

  			        if(errorMessage != null){
  			          var body = JSON.parse(error._body);
  			          this.alertMessage = body.message;
                  this.lockButton = false;
              		  this.toastr.error(this.alertMessage, 'Error!');
  			        }
  				}
  			);
  		}
    }
	}

	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		//var token = this.token;

		return new Promise(function(resolve, reject){
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
			//xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
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
