import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { GLOBALSOCKET } from '../services/globalsocket';
import { NotificationService } from '../services/notification.service';
import { ReferralService } from '../services/referral.service';
import { ExcelService } from '../services/excel.service';
import { Referral } from '../models/referral';
import { Proceso } from '../models/proceso';
import { User } from '../models/user';
import { DatosExcel } from '../models/datosexcel';
import { UserNormal } from '../models/usernormal';

import { ToastrService } from 'ngx-toastr';
import io from "socket.io-client";

@Component({
  selector: 'app-referralssee',
  templateUrl: '../views/referralssee.html',
  providers: [UserService, ReferralService, NotificationService, ExcelService]
})

export class ReferralShowComponent implements OnInit{
  @ViewChild('content') public contentModal;
  @ViewChild('status') public statusModal;
  public name: string;


	public titulo: string;
	public identity;
  	public token;
  	public user: User;
    public userNormal: UserNormal;
    public referral: Referral[] = [];
  	public referralTrainee: Referral[] = [];
    public proceso: Proceso[] = [];
    public datosexcel: DatosExcel[] = [];
  	public procesoModalReferral: Proceso;
	public errorMessage;
	public alertMessage;
	public s1: boolean;
	public s2: boolean;
	public s3: boolean;
	public s4: boolean;
	public s5: boolean;
	public s6: boolean;
	public s7: boolean;
	public s8: boolean;

  public bonusSeis: boolean;
  public bonusTres: boolean;

  public lockButtonReport: boolean;

  private url: string; //= 'https://reward-referral-program.herokuapp.com';//'http://localhost:8000';
  private socket;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private _referralService: ReferralService,
      private _notificationService: NotificationService,
    	private toastr: ToastrService,
      private excelService:ExcelService
	){
		this.titulo = 'My Referrals';
		this.s1 = false; this.s2 = false; this.s3 = false; this.s4 = false;
		this.s5 = false; this.s6 = false; this.s7 = false; this.s8 = false;
    this.userNormal = new UserNormal('','','','','',null,'','','','','');
		this.user = new User('','','','','');
    this.procesoModalReferral = new Proceso('',null,null,null,null,null,null,null,null,null,null,'');
    this.url = GLOBALSOCKET.urldevelopment;
		//this.url = GLOBALSOCKET.urlproduction;
	}

	ngOnInit(){
		console.log('referrals-show.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

      this.socket = io.connect(this.url);

  		if(this.identity)
  			this.getMyRef();
	}

  showStatus(idRefe:string){
    this._referralService.getReferralWithProcess(idRefe, this.identity.id).subscribe(
      response => {
          this.procesoModalReferral = response.idrecomendados[0];
          this.statusModal.show();
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
    //this.statusModal.show();
  }

  show(value:string){
      this._userService.getUsuario(value).subscribe(
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

      this.contentModal.show();
  }

  deleteReferral(idRe){
    this._referralService.deleteReferral(idRe).subscribe(
			response => {

        this.toastr.success('You have deleted a referral', 'Success!');
        this.referral = [];
        this.proceso = [];
        this.getMyRef();

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

	getMyRef(){
		//getReferrals
    if(this.identity.role == 'ROLE_RECRUITER'){
      this.referral = [];
      this._referralService.getRecruiterReferrals(this.identity.id).subscribe(
        response => {
          //this.referral = response;

          for (var i in response) {
            if(response[i].lastposition == 'Recommended'){
              //console.log(response[i]);
              this.referral.push(response[i]);
              this.proceso.push(response[i].idrecomendados[0]);
            }

            if(response[i].lastposition == 'Trainee'){
              this.referralTrainee.push(response[i]);
            }
            //this.proceso.push(response[i].idrecomendados[0]);
          }
          //console.log(this.proceso[0].idrecomendados);
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
  		this._referralService.getReferrals(this.identity.id).subscribe(
  			response => {
  				this.referral = response;
  				for (var i in response) {
  					//console.log(response[i].idrecomendados[0]);
  					this.proceso.push(response[i].idrecomendados[0]);
  				}
  				//console.log(this.proceso[0].idrecomendados);
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

	addStatus(numCheck, ind, e, idUs, nameCandi){
		let body;
    let sendInfo;
    let statusNot;

		if(e.target.checked){ // 100
      statusNot = 1;
			if(numCheck == 1){
				body = {
			      	etapa1: true
			    };

        sendInfo = {
            contenido: 'Profile validation approved for candidate ' + nameCandi + ', you get 100 points!',
            idusuarios: idUs
          };
			}

			if(numCheck == 2){
				body = {
			      	etapa2: true
			    };

        sendInfo = {
            contenido: 'Interview TalentHub approved for candidate ' + nameCandi + ', you get 100 points!',
            idusuarios: idUs
          };
			}

			if(numCheck == 3){
				body = {
			      	etapa3: true
			    };

        sendInfo = {
            contenido: 'Interview Hiring Manager approved for candidate ' + nameCandi + ', you get 100 points!',
            idusuarios: idUs
          };
			}

			if(numCheck == 4){
				body = {
			      	etapa4: true
			    };

        sendInfo = {
            contenido: 'Interview N+2 approved for candidate ' + nameCandi + ', you get 100 points!',
            idusuarios: idUs
          };
			}

			if(numCheck == 5){
				body = {
			      	etapa5: true
			    };

        sendInfo = {
            contenido: 'Job Offer has been approved for candidate ' + nameCandi + ', you get 100 points!',
            idusuarios: idUs
          };
			}

			if(numCheck == 6){
				body = {
			      	etapa6: true
			    };

        sendInfo = {
            contenido: 'Candidate Job Offer Acceptance has been approved for candidate ' + nameCandi + ', you get 100 points!',
            idusuarios: idUs
          };
			}

      /*Aqui se agregara el bonus de 3 meses para el candidato*/
			if(numCheck == 7){
				body = {
			      	etapa7: true,
              bonustresmeses: '5000'
			    };

        sendInfo = {
            contenido: 'Seniority 3 Months has been approved for candidate ' + nameCandi + ', you get 200 points!',
            idusuarios: idUs
          };
			}

      /*Aqui se agregara el bonus de 6 meses para el candidato*/
			if(numCheck == 8){
				body = {
			      	etapa8: true,
              bonusseismeses: '10000'
			    };

        sendInfo = {
            contenido: 'Seniority 6 Months has been approved for candidate ' + nameCandi + ', you get 200 points!',
            idusuarios: idUs
          };
			}
      /*Bonus 3 meses
      if(numCheck == 30){
				body = {
			      	bonustresmeses: true
			    };

        sendInfo = {
            contenido: 'You have gotten a bonus for 5,000 MXN due to the candidate ' + nameCandi + ' is in 3 Months!',
            idusuarios: idUs
          };
			}
      //Bonus 6 meses
      if(numCheck == 60){
				body = {
			      	bonusseismeses: true
			    };

        sendInfo = {
            contenido: 'You have gotten a bonus for 10,000 MXN due to the candidate ' + nameCandi + ' is in 6 Months!',
            idusuarios: idUs
          };
			}*/
		}else{
			//console.log("0");
      statusNot = 0;
			if(numCheck == 1){
				body = {
			      	etapa1: false
			    };
			}

			if(numCheck == 2){
				body = {
			      	etapa2: false
			    };
			}

			if(numCheck == 3){
				body = {
			      	etapa3: false
			    };
			}

			if(numCheck == 4){
				body = {
			      	etapa4: false
			    };
			}

			if(numCheck == 5){
				body = {
			      	etapa5: false
			    };
			}

			if(numCheck == 6){
				body = {
			      	etapa6: false
			    };
			}

			if(numCheck == 7){
				body = {
			      	etapa7: false,
              bonustresmeses: null
			    };
			}

			if(numCheck == 8){
				body = {
			      	etapa8: false,
              bonusseismeses: null
			    };
			}

      /*if(numCheck == 30){
				body = {
			      	bonustresmeses: false
			    };
			}

      if(numCheck == 60){
				body = {
			      	bonusseismeses: false
			    };
			}*/
		}

		this._referralService.addPoints(body, ind).subscribe(
			response => {
				this._referralService.addTotal(ind).subscribe(
					response => {

            //StatusNot es para saber si se agregan puntos o no por el reclutador
            this._userService.getUserReferrals(idUs).subscribe(
              response => {
                  let totalUserPoints = 0;
                  for(var i in response){
                    totalUserPoints = totalUserPoints + response[i].idrecomendados[0].total;
                  }

                  let points_to_updt = {
          			       totalpoints: totalUserPoints
          			  };

                  this._referralService.updateUserPoints(idUs, points_to_updt).subscribe(
                    response => {
                      this.toastr.success(response.message, 'Success!');
                      let infoUpdat = {
              			     idusuarios: idUs
              			  };
                      this._notificationService.updateUserPoints(infoUpdat, this.socket);

                      if(statusNot == 1)
                        this._notificationService.createUserNotification(sendInfo, this.socket);

                      this.referral = [];
          						this.proceso = [];
          						this.getMyRef();
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

  generateReportExcel(){
    this.datosexcel = [];
    this.lockButtonReport = true;
    this._referralService.getExcelDataReferralsAndRecruiters().subscribe(
      responseOne => {
        for(var i in responseOne){
          let aux = new DatosExcel(responseOne[i].id, responseOne[i].nombre, responseOne[i].lastname,
            responseOne[i].email, responseOne[i].phone, responseOne[i].area, responseOne[i].experience,
            responseOne[i].estadoresidencia, responseOne[i].career, responseOne[i].university,
            responseOne[i].englishlevelstring, responseOne[i].genero, responseOne[i].areaposition,
            responseOne[i].nameposition, responseOne[i].areapositiondos, responseOne[i].namepositiondos,
            responseOne[i].createdAt, responseOne[i].localidadrecruiter, responseOne[i].Recruiter.nombre,
            responseOne[i].Recruiter.secondlastname, responseOne[i].Recruiter.email,
            responseOne[i].User.nombre, responseOne[i].User.firstlastname + ' ' + responseOne[i].User.secondlastname,
            responseOne[i].User.email, responseOne[i].User.phone, responseOne[i].User.status,
            responseOne[i].lastposition
          );
          //console.log(aux);
          this.datosexcel.push(aux);
        }
        this.excelService.exportAsExcelFile(this.datosexcel, 'reporte-referidos');
        this.lockButtonReport = false;
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

	logout(){
	  	localStorage.removeItem('identidad');
	    localStorage.removeItem('tokenrecomendado');
	  	localStorage.clear();
	  	this.identity = null;
	  	this.token = null;
	    this._router.navigate(['/login']);
	  }
}
