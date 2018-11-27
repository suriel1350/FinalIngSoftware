import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit{
	public titulo: string;
	public identity;
  	public token;
  	public user: User;
	public errorMessage;
	public alertRegister;

	public loginRecruiter: boolean;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private toastr: ToastrService
	){
		this.titulo = 'Login';
    this.loginRecruiter = false;
		this.user = new User('','','','','');


	}

	ngOnInit(){
		console.log('login.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
	}

	public onSubmit(){
		//console.log(this.user);
	    //localStorage.setItem('contrasenia', this.user.password);
	  	//Conseguir los datos del usuario identificado
	  	this._userService.signup(this.user).subscribe(
	  		response => {
	  			let identity = response.user;
	        	//console.log(response.user);
	  			this.identity = identity;

	  			if(!this.identity.id){
	  				alert("El usuario no está correctamente identificado");
	  			}else{
	  				// Crear elemento en el local Storage para tener al usuario sesión
	  				localStorage.setItem('identidad', JSON.stringify(identity));
	  				//this._chatService.userOnline(identity.id);

	  				//Conseguir el token para enviarlo a cada peticion http

	  				this._userService.signup(this.user, 'true').subscribe(
				  		response => {
				  			let token = response.token;
				  			this.token = token;

				  			if(this.token.length <= 0){
				  				alert("El token no se ha generado");
				  			}else{
				  				// Crear elemento en el local Storage para tener token disponible
	  							localStorage.setItem('tokenrecomendado', token);
	  							this.user = new User('','','','','');
	                			this._router.navigate(['inicio']);
				  			}
				  		},
				  		error => {
				  			var errorMessage = <any>error;

				  			if(errorMessage!=null){
				  				var body = JSON.parse(error._body);
				  				this.errorMessage = body.message;
	                			this.toastr.error(this.errorMessage, 'Error!');
				  				console.log(error);
				  			}
				  		}
				  	);
	  			}
	  		},
	  		error => {
	  			var errorMessage = <any>error;

	  			if(errorMessage!=null){
	  				var body = JSON.parse(error._body);
	  				this.errorMessage = body.message;
	                this.toastr.error(this.errorMessage, 'Error!');
	  				console.log(error);
	  			}
	  		}
	  	);
	}

  public onSubmitRecruiter(){

    this._userService.signupRecruiter(this.user).subscribe(
      response => {
        let identity = response.recruiter;
          //console.log(response.user);
        this.identity = identity;

        if(!this.identity.id){
          alert("El usuario no está correctamente identificado");
        }else{
          // Crear elemento en el local Storage para tener al usuario sesión
          localStorage.setItem('identidad', JSON.stringify(identity));
          //this._chatService.userOnline(identity.id);

          //Conseguir el token para enviarlo a cada peticion http

          this._userService.signupRecruiter(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert("El token no se ha generado");
              }else{
                // Crear elemento en el local Storage para tener token disponible
                localStorage.setItem('tokenrecomendado', token);
                this.user = new User('','','','','');
                      this._router.navigate(['inicio']);
              }
            },
            error => {
              var errorMessage = <any>error;

              if(errorMessage!=null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                      this.toastr.error(this.errorMessage, 'Error!');
                console.log(error);
              }
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage!=null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
                this.toastr.error(this.errorMessage, 'Error!');
          console.log(error);
        }
      }
    );
  }

  enableRecruiter(){
    this.loginRecruiter = true;
    this.user = new User('','','','','');

  }

  enableLogin(){
    this.loginRecruiter = false;
    this.user = new User('','','','','');

    this._router.navigate(['login']);

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
