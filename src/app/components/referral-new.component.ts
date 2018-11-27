import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { GLOBALSOCKET } from '../services/globalsocket';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { ReferralService } from '../services/referral.service';
import { User } from '../models/user';
import { Referral } from '../models/referral';

import { ToastrService } from 'ngx-toastr';
import io from "socket.io-client";
import * as $ from 'jquery';

@Component({
  selector: 'app-newreferral',
  templateUrl: '../views/referralnew.html',
  providers: [UserService, ReferralService, NotificationService]
})

export class NewReferralComponent implements OnInit{
  @ViewChild('politica') public politicaModal;
	public titulo: string;
  public anotherPuesto: string;
  public anotherPuestoDos: string;
  public candidateStatus: string;
	public url: string;
	public identity;
  	public token;
  	public user: User;
  	public referral: Referral;
	public errorMessage;
	public alertMessage;

	public lockButton: boolean;
  public lockButtonLocation: boolean;
  public lockButtonRecruiter: boolean;
  public lockButtonArea: boolean;
  public lockButtonAreaDos: boolean;
  public lockButtonPosition: boolean;
  public lockButtonPositionDos: boolean;
  public lockButtonOther: boolean;
  public lockButtonOtherDos: boolean;
  public lockButtonGenrer: boolean;
  public lockButtonEnglish: boolean;
  public lockButtonCareer: boolean;
  public lockButtonUniversity: boolean;
  public lockButtonState: boolean;

  public privacyStatus: boolean;

  public anotherPosition: boolean;
  public anotherPositionDos: boolean;

	public selectedFiles: FileList;

  private urlNoti: string; //= 'https://reward-referral-program.herokuapp.com';//'http://localhost:8000';
  private socket;

  locationList = [];
  selectedLocation = [];
  settings = {};

  recruiterList = [];
  selectedRecruiter = [];
  settingsRecruiter = {};

  areaList = [];
  selectedArea = [];
  settingsArea = {};

  puestoList = [];
  selectedPuesto = [];
  settingsPuesto = {};

  areaListDos = [];
  selectedAreaDos = [];
  settingsAreaDos = {};

  puestoListDos = [];
  selectedPuestoDos = [];
  settingsPuestoDos = {};

  generoList = [];
  selectedGenero = [];
  settingsGenero = {};

  englishList = [];
  selectedEnglish = [];
  settingsEnglish = {};

  itemListUniversidades = [];
  selectedItemsUniversidades = [];
  settingSitiosUniversidades = {};

  itemListCarrera = [];
  selectedItemsCarrera = [];
  settingSitiosCarrera = {};

  itemListEstado = [];
  selectedItemsEstado = [];
  settingSitiosEstado = {};

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    	private _userService: UserService,
    	private _referralService: ReferralService,
      private _notificationService: NotificationService,
    	private toastr: ToastrService
	){
		this.url = GLOBAL.url;
    this.anotherPosition = false;
    this.anotherPuesto = '';
		this.titulo = 'Create Referral';
		this.user = new User('','','','','');
  	this.referral = new Referral('','','','',null,'','','','','','','','',null,'','','','','','','','','','');
    this.urlNoti = GLOBALSOCKET.urldevelopment;
    this.candidateStatus = null
  		//this.url = GLOBALSOCKET.urlproduction;
	}

	ngOnInit(){
    this.socket = io.connect(this.urlNoti);
    this.locationList = [
      { "id": 1, "itemName": "San Luis Potosi" },
      { "id": 2, "itemName": "Querétaro" },
      { "id": 3, "itemName": "Silao" },
      { "id": 4, "itemName": "Hermosillo" },
      { "id": 5, "itemName": "Puebla" },
      { "id": 6, "itemName": "Santa Fé" }
    ];

    this.selectedLocation = [];

    this.settings = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };


    this.generoList = [
      { "id": 1, "itemName": "Man" },
      { "id": 2, "itemName": "Woman" }
    ];

    this.selectedGenero = [];

    this.settingsGenero = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };

    /*Configuraciones para Universidades starts*/
    this.itemListUniversidades = [
      {"id":1,"itemName":"UDLAP"},
      {"id":2,"itemName":"UPAEP"},
      {"id":3,"itemName":"ITESM"},
      {"id":4,"itemName":"BUAP"},
      {"id":5,"itemName":"IBERO"},
      {"id":6,"itemName":"ITP"},
      {"id":7,"itemName":"UVM"},
      {"id":8,"itemName":"UNAM"},
      {"id":9,"itemName":"IPN"},
      {"id":10,"itemName":"La Salle"},
      {"id":11,"itemName":"ITH"},
      {"id":12,"itemName":"ITS"},
      {"id":13,"itemName":"Universidad Autónoma de Coahuila"},
      {"id":14,"itemName":"Instituto Tecnológico de SLP"},
      {"id":15,"itemName":"Universidad Tecnológica SLP"},
      {"id":16,"itemName":"Universidad Autónoma de SLP"},
      {"id":17,"itemName":"ITQ"},
      {"id":18,"itemName":"Instituto Tecnológico Superior de Irapuato"},
      {"id":19,"itemName":"Instituto Tecnológico de León"},
      {"id":20,"itemName":"Universidad la Salle Bajio"},
      {"id":21,"itemName":"Universidad Tecnológica de Puebla"},
      {"id":22,"itemName":"UPSLP"},
      {"id":23,"itemName":"Tec Milenio"},
      {"id":24,"itemName":"Madero"},
      {"id":25,"itemName":"Otra"}
    ];

    this.selectedItemsUniversidades = [];

    this.settingSitiosUniversidades = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };
    /*Configuraciones para Universidades ends*/

    /*Configuraciones para Carreras starts*/
    this.itemListCarrera = [
      {"id":1,"itemName":"Ing. Sistemas Computacionales"},
      {"id":2,"itemName":"Ing. En Logistica"},
      {"id":3,"itemName":"Administracion de empresas"},
      {"id":4,"itemName":"Banca e Inversiones"},
      {"id":5,"itemName":"Mercadotecnia"},
      {"id":6,"itemName":"Administración de hoteles y restaurantes"},
      {"id":7,"itemName":"Negocios internacionales"},
      {"id":8,"itemName":"Economía"},
      {"id":9,"itemName":"Contaduría pública"},
      {"id":11,"itemName":"Animación digital"},
      {"id":12,"itemName":"Diseño de información visual"},
      {"id":13,"itemName":"Comunicaciones"},
      {"id":14,"itemName":"Diseño"},
      {"id":15,"itemName":"Derecho"},
      {"id":16,"itemName":"Ingeniería ambiental"},
      {"id":17,"itemName":"Ingeniería civil"},
      {"id":18,"itemName":"Ingeniería en electrónica"},
      {"id":20,"itemName":"Ingeniería industrial"},
      {"id":21,"itemName":"Ingeniería mecánica"},
      {"id":22,"itemName":"Ingeniería en mecatrónica"},
      {"id":23,"itemName":"Ingeniería química"},
      {"id":24,"itemName":"Psicología"},
      {"id":25,"itemName":"Relaciones internacionales"},
      {"id":26,"itemName":"Actuaría"},
      {"id":27,"itemName":"Tecnologías de la información"},
      {"id":28,"itemName":"Finanzas"},
      {"id":29,"itemName":"Publicidad"},
      {"id":30,"itemName":"Ingeniería en diseño automotriz"},
      {"id":31,"itemName":"Fisica"},
      {"id":32,"itemName":"Robótica"},
      {"id":33,"itemName":"Ingeniería en desarrollo sustentable"},
      {"id":34,"itemName":"Ingeniería textil"},
      {"id":35,"itemName":"Pedagogía"},
      {"id":36,"itemName":"Turismo"},
      {"id":37,"itemName":"Ingeniería en gestión empresarial"},
      {"id":38,"itemName":"Licenciatura en lenguas"},
      {"id":39,"itemName":"Licenciatura en matemática aplicada"}
    ];

    this.selectedItemsCarrera = [];

    this.settingSitiosCarrera = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };
    /*Configuraciones para Carreras ends*/

    /*Configuraciones para Estado starts*/
    this.itemListEstado = [
      {"id":1,"itemName":"Aguascalientes"},
      {"id":2,"itemName":"Baja California"},
      {"id":3,"itemName":"Baja California Sur"},
      {"id":4,"itemName":"Campeche"},
      {"id":5,"itemName":"Coahuila"},
      {"id":6,"itemName":"Colima"},
      {"id":7,"itemName":"Chiapas"},
      {"id":8,"itemName":"Chihuahua"},
      {"id":9,"itemName":"Distrito Federal"},
      {"id":10,"itemName":"Durango"},
      {"id":11,"itemName":"Guanajuato"},
      {"id":12,"itemName":"Guerrero"},
      {"id":13,"itemName":"Hidalgo"},
      {"id":14,"itemName":"Jalisco"},
      {"id":15,"itemName":"México"},
      {"id":16,"itemName":"Michoacán"},
      {"id":17,"itemName":"Morelos"},
      {"id":18,"itemName":"Nayarit"},
      {"id":19,"itemName":"Nuevo León"},
      {"id":20,"itemName":"Oaxaca"},
      {"id":21,"itemName":"Puebla"},
      {"id":22,"itemName":"Querétaro"},
      {"id":23,"itemName":"Quintana Roo"},
      {"id":24,"itemName":"San Luis Potosí"},
      {"id":25,"itemName":"Sinaloa"},
      {"id":26,"itemName":"Sonora"},
      {"id":27,"itemName":"Tabasco"},
      {"id":29,"itemName":"Tamaulipas"},
      {"id":30,"itemName":"Tlaxcala"},
      {"id":31,"itemName":"Veracruz"},
      {"id":32,"itemName":"Yucatán"},
      {"id":33,"itemName":"Zacatecas"}
    ];

    this.selectedItemsEstado = [];

    this.settingSitiosEstado = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };
    /*Configuraciones para Estado ends*/

    this.englishList = [
      { "id": 1, "itemName": "Basic" },
      { "id": 2, "itemName": "Intermediate" },
      { "id": 3, "itemName": "Advanced" }
    ];

    this.selectedEnglish = [];

    this.settingsEnglish = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };


    this.recruiterList = [];

    this.selectedRecruiter = [];

    this.settingsRecruiter = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };


    this.areaList = [
      { "id": 1, "itemName": "Communication" },
      { "id": 2, "itemName": "FES" },
      { "id": 3, "itemName": "Finance" },
      { "id": 4, "itemName": "General Services" },
      { "id": 5, "itemName": "Human Resources" },
      { "id": 6, "itemName": "HSE" },
      { "id": 7, "itemName": "Industrial" },
      { "id": 8, "itemName": "IT" },
      { "id": 9, "itemName": "Legal" },
      { "id": 10, "itemName": "Marketing" },
      { "id": 11, "itemName": "ME" },
      { "id": 12, "itemName": "Operations/Production" },
      { "id": 13, "itemName": "PC&L" },
      { "id": 14, "itemName": "Purchasing" },
      { "id": 15, "itemName": "Quality" },
      { "id": 16, "itemName": "Sales" },
      { "id": 17, "itemName": "Supplier Quality" },
      { "id": 18, "itemName": "Other" },
    ];

    this.selectedArea = [];

    this.settingsArea = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    this.puestoList = [];

    this.selectedPuesto = [];

    this.settingsPuesto = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    this.areaListDos = [
      { "id": 1, "itemName": "Communication" },
      { "id": 2, "itemName": "FES" },
      { "id": 3, "itemName": "Finance" },
      { "id": 4, "itemName": "General Services" },
      { "id": 5, "itemName": "Human Resources" },
      { "id": 6, "itemName": "HSE" },
      { "id": 7, "itemName": "Industrial" },
      { "id": 8, "itemName": "IT" },
      { "id": 9, "itemName": "Legal" },
      { "id": 10, "itemName": "Marketing" },
      { "id": 11, "itemName": "ME" },
      { "id": 12, "itemName": "Operations/Production" },
      { "id": 13, "itemName": "PC&L" },
      { "id": 14, "itemName": "Purchasing" },
      { "id": 15, "itemName": "Quality" },
      { "id": 16, "itemName": "Sales" },
      { "id": 17, "itemName": "Supplier Quality" },
      { "id": 18, "itemName": "Other" },
    ];

    this.selectedAreaDos = [];

    this.settingsAreaDos = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    this.puestoListDos = [];

    this.selectedPuestoDos = [];

    this.settingsPuestoDos = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

		console.log('referral-new.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.lockButton = false;

  		$(document).ready(function(){
  			$(".form").on("change", ".file-upload-field", function(){
	            $(this).parent(".file-upload-wrapper").attr("data-text",
			    $(this).val().replace(/.*(\/|\\)/, '') );
	        });
		});
	}
  //Aqui seleccionamos la location
  onItemSelect(item: any) {
  this.lockButtonLocation = true;
    //console.log(item);
    //this.selectedRecruiter = null;
    if(item.id == 1){
      this.recruiterList = [
        { "id": 1, "itemName": "Roberto Cortes" },
        { "id": 2, "itemName": "Julio Velazquez" }
      ];
    }

    if(item.id == 2 || item.id == 3 || item.id == 4){
      this.recruiterList = [
        { "id": 2, "itemName": "Julio Velazquez" },
        { "id": 3, "itemName": "Fernanda Santa Rosa" }
      ];
    }

    if(item.id == 5 || item.id == 6){
      this.recruiterList = [
        { "id": 4, "itemName": "Rosario Contreras" },
        { "id": 5, "itemName": "Evelyn Hernandez" }
      ];
    }
    //console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    this.lockButtonLocation = false;
    this.recruiterList = [];
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
  onDeSelectAll(items: any) {
    //console.log(items);
  }


  onRecruiterSelect(item: any) {
    this.lockButtonRecruiter = true;
    console.log(item);
    //console.log(this.selectedRecruiter);
  }

  OnRecruiterDeSelect(item: any) {
    this.lockButtonRecruiter = false;
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllRecruiter(items: any) {
    //console.log(items);
  }
  onDeSelectAllRecruiter(items: any) {
    //console.log(items);
  }


  onAreaSelect(item: any) {
    this.anotherPosition = false;
    this.anotherPuesto = '';
    this.lockButtonArea = true;

    if(item.id == 1){
      this.puestoList = [
        { "id": 1, "itemName": "Communication Specialist level 2" },
        { "id": 2, "itemName": "Communication Specialist level 3" }
      ];
    }

    if(item.id == 2){
      this.puestoList = [
        { "id": 1, "itemName": "Site FES" }
      ];
    }

    if(item.id == 3){
      this.puestoList = [
        { "id": 1, "itemName": "Consolidation Specialist Level 2" },
        { "id": 2, "itemName": "Internal Auditor Level 2" },
        { "id": 3, "itemName": "Cost Analyst Level 2" },
        { "id": 4, "itemName": "Assistant Controller" },
        { "id": 5, "itemName": "Treasury Specialist Level 2" },
        { "id": 6, "itemName": "Assistant Plant Controller Level 1" },
        { "id": 7, "itemName": "Accounting Supervisor Level 2" },
        { "id": 8, "itemName": "Accountant" }
      ];
    }

    if(item.id == 4) {
      this.puestoList = [
        { "id": 1, "itemName": "Assistant" }
      ];
    }

    if(item.id == 5){
      this.puestoList = [
        { "id": 1, "itemName": "Country C&B Level 2" },
        { "id": 2, "itemName": "Country/Division/Region Reporting Manager" },
        { "id": 3, "itemName": "Payroll Supervisor Level 2" },
        { "id": 4, "itemName": "Plant HR Generalist" },
        { "id": 5, "itemName": "Plant Training/Communication Specialist" },
        { "id": 6, "itemName": "Plant HR Reporting/Administration Specialist" }
      ];
    }

    if(item.id == 6){
      this.puestoList = [
        { "id": 1, "itemName": "Plant HSE Specialist" }
      ];
    }

    if(item.id == 7){
      this.puestoList = [
        { "id": 1, "itemName": "Industrial Strategy Engineer" }
      ];
    }

    if(item.id == 8){
      this.puestoList = [
        { "id": 1, "itemName": "IT Local system Administrator" },
        { "id": 2, "itemName": "IT Central System Specialist" },
        { "id": 3, "itemName": "IT Developer Level 2" },
        { "id": 4, "itemName": "IT Analyst - Support" }
      ];
    }

    if(item.id == 9){
      this.puestoList = [
        { "id": 1, "itemName": "Para - Legal" }
      ];
    }

    if(item.id == 10){
      this.puestoList = [
        { "id": 1, "itemName": "Marketing Analyst" }
      ];
    }

    if(item.id == 11){
      this.puestoList = [
        { "id": 1, "itemName": "Prototype Engineer" },
        { "id": 2, "itemName": "Process Engineer Level 1" },
        { "id": 3, "itemName": "Process Engineer Level 2" },
        { "id": 4, "itemName": "Plant Program/Launch Team Leader Level 2" },
        { "id": 5, "itemName": "Engineering Change Coordinator" }
      ];
    }

    if(item.id == 12){
      this.puestoList = [
        { "id": 1, "itemName": "Maintenance Engineer" },
        { "id": 2, "itemName": "Supervisor Level 1" },
        { "id": 3, "itemName": "Supervisor Level 2" }
      ];
    }

    if(item.id == 13){
      this.puestoList = [
        { "id": 1, "itemName": "Program Logistics Engineer Level 2" },
        { "id": 2, "itemName": "Plant Material Planner" },
        { "id": 3, "itemName": "Plant PC&L Customer Contact" },
        { "id": 4, "itemName": "Plant PC&L Supervisor Level 1" },
        { "id": 5, "itemName": "Plant PC&L Supervisor Level 2" },
        { "id": 6, "itemName": "Plant Engineer Change Coordinator" },
        { "id": 7, "itemName": "Plant PC&L Improvement Coordinator" },
        { "id": 8, "itemName": "Plant Traffic Scheduler" }
      ];
    }

    if(item.id == 14){
      this.puestoList = [
        { "id": 1, "itemName": "Commodity Buyer 2" },
        { "id": 2, "itemName": "Series Buyer Level 1" },
        { "id": 3, "itemName": "Series Buyer Level 2" },
        { "id": 4, "itemName": "Program Buyer Level 3" },
        { "id": 5, "itemName": "NPP Commodity Buyer Level 2" },
        { "id": 6, "itemName": "NPP Commodity Buyer Level 3" },
        { "id": 7, "itemName": "NPP Regional Buyer Level 1" },
        { "id": 8, "itemName": "NPP Regional Buyer Level 2" }
      ];
    }

    if(item.id == 15){
      this.puestoList = [
        { "id": 1, "itemName": "Group Audit Engineer Level 2" },
        { "id": 2, "itemName": "Site Quality Manager" },
        { "id": 3, "itemName": "Plant Laboratory Leader" },
        { "id": 4, "itemName": "Plant Quality Management System" },
        { "id": 5, "itemName": "Plant Production Quality Engineer Level 1" },
        { "id": 6, "itemName": "Plant Production Quality Engineer Level 2" }
      ];
    }

    if(item.id == 16){
      this.puestoList = [
        { "id": 1, "itemName": "Sales Engineer Level 2" },
        { "id": 2, "itemName": "Sales Engineer Level 3" }
      ];
    }

    if(item.id == 17){
      this.puestoList = [
        { "id": 1, "itemName": "Supplier Quality Development Engineer" },
        { "id": 2, "itemName": "Advanced Supplier Quality Level 2" },
        { "id": 3, "itemName": "Plant SQA Level 1" },
        { "id": 4, "itemName": "Plant SQA Level 2" }
      ];
    }

    if(item.id == 18){
      this.anotherPosition = true;
      this.lockButtonOther = true;
    }

    //console.log(this.selectedItems);
  }

  OnAreaDeSelect(item: any) {
    this.lockButtonArea = false;
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllArea(items: any) {
    //console.log(items);
  }
  onDeSelectAllArea(items: any) {
    //console.log(items);
  }


  onPuestoSelect(item: any) {
    this.lockButtonPosition = true;
    console.log(item);
    //console.log(this.selectedItems);
  }

  OnPuestoDeSelect(item: any) {
    this.lockButtonPosition = false;
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllPuesto(items: any) {
    //console.log(items);
  }
  onDeSelectAllPuesto(items: any) {
    //console.log(items);
  }


  onAreaSelectDos(item: any) {
    this.anotherPositionDos = false;
    this.anotherPuestoDos = '';
    this.lockButtonAreaDos = true;

    if(item.id == 1){
      this.puestoListDos = [
        { "id": 1, "itemName": "Communication Specialist level 2" },
        { "id": 2, "itemName": "Communication Specialist level 3" }
      ];
    }

    if(item.id == 2){
      this.puestoListDos = [
        { "id": 1, "itemName": "Site FES" }
      ];
    }

    if(item.id == 3){
      this.puestoListDos = [
        { "id": 1, "itemName": "Consolidation Specialist Level 2" },
        { "id": 2, "itemName": "Internal Auditor Level 2" },
        { "id": 3, "itemName": "Cost Analyst Level 2" },
        { "id": 4, "itemName": "Assistant Controller" },
        { "id": 5, "itemName": "Treasury Specialist Level 2" },
        { "id": 6, "itemName": "Assistant Plant Controller Level 1" },
        { "id": 7, "itemName": "Accounting Supervisor Level 2" },
        { "id": 8, "itemName": "Accountant" }
      ];
    }

    if(item.id == 4) {
      this.puestoListDos = [
        { "id": 1, "itemName": "Assistant" }
      ];
    }

    if(item.id == 5){
      this.puestoListDos = [
        { "id": 1, "itemName": "Country C&B Level 2" },
        { "id": 2, "itemName": "Country/Division/Region Reporting Manager" },
        { "id": 3, "itemName": "Payroll Supervisor Level 2" },
        { "id": 4, "itemName": "Plant HR Generalist" },
        { "id": 5, "itemName": "Plant Training/Communication Specialist" },
        { "id": 6, "itemName": "Plant HR Reporting/Administration Specialist" }
      ];
    }

    if(item.id == 6){
      this.puestoListDos = [
        { "id": 1, "itemName": "Plant HSE Specialist" }
      ];
    }

    if(item.id == 7){
      this.puestoListDos = [
        { "id": 1, "itemName": "Industrial Strategy Engineer" }
      ];
    }

    if(item.id == 8){
      this.puestoListDos = [
        { "id": 1, "itemName": "IT Local system Administrator" },
        { "id": 2, "itemName": "IT Central System Specialist" },
        { "id": 3, "itemName": "IT Developer Level 2" },
        { "id": 4, "itemName": "IT Analyst - Support" }
      ];
    }

    if(item.id == 9){
      this.puestoListDos = [
        { "id": 1, "itemName": "Para - Legal" }
      ];
    }

    if(item.id == 10){
      this.puestoListDos = [
        { "id": 1, "itemName": "Marketing Analyst" }
      ];
    }

    if(item.id == 11){
      this.puestoListDos = [
        { "id": 1, "itemName": "Prototype Engineer" },
        { "id": 2, "itemName": "Process Engineer Level 1" },
        { "id": 3, "itemName": "Process Engineer Level 2" },
        { "id": 4, "itemName": "Plant Program/Launch Team Leader Level 2" },
        { "id": 5, "itemName": "Engineering Change Coordinator" }
      ];
    }

    if(item.id == 12){
      this.puestoListDos = [
        { "id": 1, "itemName": "Maintenance Engineer" },
        { "id": 2, "itemName": "Supervisor Level 1" },
        { "id": 3, "itemName": "Supervisor Level 2" }
      ];
    }

    if(item.id == 13){
      this.puestoListDos = [
        { "id": 1, "itemName": "Program Logistics Engineer Level 2" },
        { "id": 2, "itemName": "Plant Material Planner" },
        { "id": 3, "itemName": "Plant PC&L Customer Contact" },
        { "id": 4, "itemName": "Plant PC&L Supervisor Level 1" },
        { "id": 5, "itemName": "Plant PC&L Supervisor Level 2" },
        { "id": 6, "itemName": "Plant Engineer Change Coordinator" },
        { "id": 7, "itemName": "Plant PC&L Improvement Coordinator" },
        { "id": 8, "itemName": "Plant Traffic Scheduler" }
      ];
    }

    if(item.id == 14){
      this.puestoListDos = [
        { "id": 1, "itemName": "Commodity Buyer 2" },
        { "id": 2, "itemName": "Series Buyer Level 1" },
        { "id": 3, "itemName": "Series Buyer Level 2" },
        { "id": 4, "itemName": "Program Buyer Level 3" },
        { "id": 5, "itemName": "NPP Commodity Buyer Level 2" },
        { "id": 6, "itemName": "NPP Commodity Buyer Level 3" },
        { "id": 7, "itemName": "NPP Regional Buyer Level 1" },
        { "id": 8, "itemName": "NPP Regional Buyer Level 2" }
      ];
    }

    if(item.id == 15){
      this.puestoListDos = [
        { "id": 1, "itemName": "Group Audit Engineer Level 2" },
        { "id": 2, "itemName": "Site Quality Manager" },
        { "id": 3, "itemName": "Plant Laboratory Leader" },
        { "id": 4, "itemName": "Plant Quality Management System" },
        { "id": 5, "itemName": "Plant Production Quality Engineer Level 1" },
        { "id": 6, "itemName": "Plant Production Quality Engineer Level 2" }
      ];
    }

    if(item.id == 16){
      this.puestoListDos = [
        { "id": 1, "itemName": "Sales Engineer Level 2" },
        { "id": 2, "itemName": "Sales Engineer Level 3" }
      ];
    }

    if(item.id == 17){
      this.puestoListDos = [
        { "id": 1, "itemName": "Supplier Quality Development Engineer" },
        { "id": 2, "itemName": "Advanced Supplier Quality Level 2" },
        { "id": 3, "itemName": "Plant SQA Level 1" },
        { "id": 4, "itemName": "Plant SQA Level 2" }
      ];
    }

    if(item.id == 18){
      this.anotherPositionDos = true;
      this.lockButtonOtherDos = true;
    }

    //console.log(this.selectedItems);
  }

  OnAreaDeSelectDos(item: any) {
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllAreaDos(items: any) {
    //console.log(items);
  }
  onDeSelectAllAreaDos(items: any) {
    //console.log(items);
  }


  onPuestoSelectDos(item: any) {
    this.lockButtonPositionDos = true;
    console.log(item);
    //console.log(this.selectedItems);
  }

  OnPuestoDeSelectDos(item: any) {
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllPuestoDos(items: any) {
    //console.log(items);
  }
  onDeSelectAllPuestoDos(items: any) {
    //console.log(items);
  }


  onGeneroSelect(item: any) {
    this.lockButtonGenrer = true;
  }

  OnGeneroDeSelect(item: any) {
    this.lockButtonGenrer = false;
  }
  onSelectAllGenero(items: any) {

  }
  onDeSelectAllGenero(items: any) {

  }

  /*Carreras Functions*/
  onCareerSelect(item: any) {
    this.lockButtonCareer = true;
  }

  OnCareerDeSelect(item: any) {
    this.lockButtonCareer = false;
  }
  onSelectAllCareer(items: any) {

  }
  onDeSelectAllCareer(items: any) {

  }
  /*Carreras Functions ends*/

  /*Universidades Functions*/
  onUniversitySelect(item: any) {
    this.lockButtonUniversity = true;
  }

  OnUniversityDeSelect(item: any) {
    this.lockButtonUniversity = false;
  }
  onSelectAllUniversity(items: any) {

  }
  onDeSelectAllUniversity(items: any) {

  }
  /*Universidades Functions ends*/

  /*Estado Functions*/
  onEstadoSelect(item: any) {
    this.lockButtonState = true;
  }

  OnEstadoDeSelect(item: any) {
    this.lockButtonState = false;
  }
  onSelectAllEstado(items: any) {

  }
  onDeSelectAllEstado(items: any) {

  }
  /*Estado Functions ends*/

  onEnglishSelect(item: any) {
    this.lockButtonEnglish = true;
    console.log(item);
    //console.log(this.selectedItems);
  }

  OnEnglishDeSelect(item: any) {
    this.lockButtonEnglish = false;
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllEnglish(items: any) {
    //console.log(items);
  }
  onDeSelectAllEnglish(items: any) {
    //console.log(items);
  }

  policyPrivacy(){
    this.politicaModal.show();
  }

  statusOfCandidate(value: string){
    this.candidateStatus = value;
    this.referral.lastposition = this.candidateStatus;
  }

	upload(value: boolean) {
    console.log(this.referral);
  if(value){
    if(this.anotherPosition == true){
      if(this.anotherPuesto != ''){
        this.referral.localidadrecruiter = this.selectedLocation[0].itemName;
        this.referral.idrecruiters = this.selectedRecruiter[0].id;
        this.referral.areaposition = 'Other';
        this.referral.nameposition = this.anotherPuesto;
        this.referral.genero = this.selectedGenero[0].itemName;
        this.referral.englishlevelstring = this.selectedEnglish[0].itemName;
        this.referral.career = this.selectedItemsCarrera[0].itemName;
        this.referral.university = this.selectedItemsUniversidades[0].itemName;
        this.referral.estadoresidencia = this.selectedItemsEstado[0].itemName;

        if(this.anotherPositionDos == true){
          if(this.anotherPuestoDos != ''){
            this.referral.areapositiondos = 'Other area dos';
            this.referral.namepositiondos = this.anotherPuestoDos;

            if(this.filesToUpload){
        			let ext = this.filesToUpload[0].type;
        			this.lockButton = true;

        			if(ext == 'application/pdf'){
        				this._referralService.createReferral(this.referral, this.identity.id).subscribe(
        					response => {
        						let idRefe = response.id;
                    //console.log(response);
        						this.makeFileRequest(this.url+'sign-s3/'+idRefe, [], this.filesToUpload).then(
        							(result: any) => {
        								  this.lockButton = false;
        			            		  this.toastr.success('Your referral has been registered', 'Success!');
                                let sendInfo;
                                sendInfo = {
                                    contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                                    idrecruiters: this.selectedRecruiter[0].id
                                  };
                                this._notificationService.createRecruNotification(sendInfo, this.socket);
        	                			  this._router.navigate(['referrals']);
        							},
        							error => {
        						          //this.alertMessage = body.message;
        			            		  this.toastr.error('There was an error uploading the CV', 'Error!');
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
        			}else{
        	            this.toastr.error('Please, upload CV in PDF format', 'Error!');
        			}
        		}else{
        			this.lockButton = true;
        			this._referralService.createReferral(this.referral, this.identity.id).subscribe(
        				response => {
        					this.lockButton = false;
        			        this.toastr.success('Your referral has been registered', 'Success!');
                      let sendInfo;
                      sendInfo = {
                          contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                          idrecruiters: this.selectedRecruiter[0].id
                        };
                      this._notificationService.createRecruNotification(sendInfo, this.socket);
        			        this._router.navigate(['referrals']);
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

          }else{
            this.toastr.warning('Type the other second position not registered', 'Error!');
          }
        }else{
          if(this.selectedAreaDos.length > 0){
              this.referral.areapositiondos = this.selectedAreaDos[0].itemName;
          }

          if(this.selectedPuestoDos.length > 0){
              this.referral.namepositiondos = this.selectedPuestoDos[0].itemName;
          }

          if(this.filesToUpload){
      			let ext = this.filesToUpload[0].type;
      			this.lockButton = true;

      			if(ext == 'application/pdf'){
      				this._referralService.createReferral(this.referral, this.identity.id).subscribe(
      					response => {
      						let idRefe = response.id;
                  //console.log(response);
      						this.makeFileRequest(this.url+'sign-s3/'+idRefe, [], this.filesToUpload).then(
      							(result: any) => {
      								  this.lockButton = false;
      			            		  this.toastr.success('Your referral has been registered', 'Success!');
                              let sendInfo;
                              sendInfo = {
                                  contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                                  idrecruiters: this.selectedRecruiter[0].id
                                };
                              this._notificationService.createRecruNotification(sendInfo, this.socket);
      	                			  this._router.navigate(['referrals']);
      							},
      							error => {
      						          //this.alertMessage = body.message;
      			            		  this.toastr.error('There was an error uploading the CV', 'Error!');
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
      			}else{
      	            this.toastr.error('Please, upload CV in PDF format', 'Error!');
      			}
      		}else{
      			this.lockButton = true;
      			this._referralService.createReferral(this.referral, this.identity.id).subscribe(
      				response => {
      					this.lockButton = false;
      			        this.toastr.success('Your referral has been registered', 'Success!');
                    let sendInfo;
                    sendInfo = {
                        contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                        idrecruiters: this.selectedRecruiter[0].id
                      };
                    this._notificationService.createRecruNotification(sendInfo, this.socket);
      			        this._router.navigate(['referrals']);
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
      }else{
        this.toastr.warning('Type the other position not registered', 'Error!');
      }
    }else{
      this.referral.localidadrecruiter = this.selectedLocation[0].itemName;
      this.referral.idrecruiters = this.selectedRecruiter[0].id;
      this.referral.areaposition = this.selectedArea[0].itemName;
      this.referral.nameposition = this.selectedPuesto[0].itemName;
      this.referral.genero = this.selectedGenero[0].itemName;
      this.referral.englishlevelstring = this.selectedEnglish[0].itemName;
      this.referral.career = this.selectedItemsCarrera[0].itemName;
      this.referral.university = this.selectedItemsUniversidades[0].itemName;
      this.referral.estadoresidencia = this.selectedItemsEstado[0].itemName;

      if(this.anotherPositionDos == true){
        if(this.anotherPuestoDos != ''){
          this.referral.areapositiondos = 'Other area dos';
          this.referral.namepositiondos = this.anotherPuestoDos;

          if(this.filesToUpload){
      			let ext = this.filesToUpload[0].type;
      			this.lockButton = true;

      			if(ext == 'application/pdf'){
      				this._referralService.createReferral(this.referral, this.identity.id).subscribe(
      					response => {
      						let idRefe = response.id;
                  //console.log(response);
      						this.makeFileRequest(this.url+'sign-s3/'+idRefe, [], this.filesToUpload).then(
      							(result: any) => {
      								  this.lockButton = false;
      			            		  this.toastr.success('Your referral has been registered', 'Success!');
                              let sendInfo;
                              sendInfo = {
                                  contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                                  idrecruiters: this.selectedRecruiter[0].id
                                };
                              this._notificationService.createRecruNotification(sendInfo, this.socket);
      	                			  this._router.navigate(['referrals']);
      							},
      							error => {
      						          //this.alertMessage = body.message;
      			            		  this.toastr.error('There was an error uploading the CV', 'Error!');
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
      			}else{
      	            this.toastr.error('Please, upload CV in PDF format', 'Error!');
      			}
      		}else{
      			this.lockButton = true;
      			this._referralService.createReferral(this.referral, this.identity.id).subscribe(
      				response => {
      					this.lockButton = false;
      			        this.toastr.success('Your referral has been registered', 'Success!');
                    let sendInfo;
                    sendInfo = {
                        contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                        idrecruiters: this.selectedRecruiter[0].id
                      };
                    this._notificationService.createRecruNotification(sendInfo, this.socket);
      			        this._router.navigate(['referrals']);
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
        }else{
          this.toastr.warning('Type the other second position not registered', 'Error!');
        }
      }else{
        if(this.selectedAreaDos.length > 0){
            this.referral.areapositiondos = this.selectedAreaDos[0].itemName;
        }

        if(this.selectedPuestoDos.length > 0){
            this.referral.namepositiondos = this.selectedPuestoDos[0].itemName;
        }

        if(this.filesToUpload){
          let ext = this.filesToUpload[0].type;
          this.lockButton = true;

          if(ext == 'application/pdf'){
            this._referralService.createReferral(this.referral, this.identity.id).subscribe(
              response => {
                let idRefe = response.id;
                //console.log(response);
                this.makeFileRequest(this.url+'sign-s3/'+idRefe, [], this.filesToUpload).then(
                  (result: any) => {
                      this.lockButton = false;
                            this.toastr.success('Your referral has been registered', 'Success!');
                            let sendInfo;
                            sendInfo = {
                                contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                                idrecruiters: this.selectedRecruiter[0].id
                              };
                            this._notificationService.createRecruNotification(sendInfo, this.socket);
                              this._router.navigate(['referrals']);
                  },
                  error => {
                          //this.alertMessage = body.message;
                            this.toastr.error('There was an error uploading the CV', 'Error!');
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
          }else{
                  this.toastr.error('Please, upload CV in PDF format', 'Error!');
          }
        }else{
          this.lockButton = true;
          this._referralService.createReferral(this.referral, this.identity.id).subscribe(
            response => {
              this.lockButton = false;
                  this.toastr.success('Your referral has been registered', 'Success!');
                  let sendInfo;
                  sendInfo = {
                      contenido: 'User ' + this.identity.nombre + ' has added a new referral!',
                      idrecruiters: this.selectedRecruiter[0].id
                    };
                  this._notificationService.createRecruNotification(sendInfo, this.socket);
                  this._router.navigate(['referrals']);
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
    }
  }else{
    this.politicaModal.hide();
  }

		/**/
		/**/
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

	selectFile(event) {
	    this.selectedFiles = event.target.files;
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
