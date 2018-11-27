import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ReferralService } from '../services/referral.service';
import { UserScores } from '../models/userscores';
import { UserNormal } from '../models/usernormal';
import { GLOBAL } from '../services/global';

import { User } from '../models/user';
import { Referral } from '../models/referral';

import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';

@Component({
  selector: 'app-editreferral',
  templateUrl: '../views/referral-edit.html',
  providers: [UserService, ReferralService]
})

export class EditReferralComponent implements OnInit{
	public titulo: string;
  public anotherPuesto: string;
  public anotherPuestoDos: string;
	public url: string;

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
  public lockButtonCandidateStatus: boolean;
  public lockButtonCareer: boolean;
  public lockButtonUniversity: boolean;
  public lockButtonState: boolean;

  public anotherPosition: boolean;
  public anotherPositionDos: boolean;

	public identity;
  	public token;
  	public user: User;
    public referral: Referral;
  	public userNormal: UserNormal;
  	public userScore: UserScores[] = [];
	public errorMessage;
	public alertMessage;

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

  candidateStatusList = [];
  selectedCandidateStatus = [];
  settingsCandidateStatus = {};

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
    	private toastr: ToastrService
	){
		this.titulo = 'Edit my referral';
		this.lockButton = false;
    this.anotherPosition = false;
    this.anotherPuesto = '';
		this.user = new User('','','','','');
    this.referral = new Referral('','','','',null,'','','','','','','','',null,'','','','','','','','','','');
		this.userNormal = new UserNormal('','','','','',null,'','','','','');
		this.url = GLOBAL.url;
	}

	ngOnInit(){
    /* #############  Location  #####################*/
    this.locationList = [
      { "id": 1, "itemName": "San Luis Potosi" },
      { "id": 2, "itemName": "Querétaro" },
      { "id": 3, "itemName": "Silao" },
      { "id": 4, "itemName": "Hermosillo" },
      { "id": 5, "itemName": "Puebla" },
      { "id": 6, "itemName": "Santa Fé" }
    ];

    //this.selectedLocation = [];

    this.settings = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    /* #############  Genero  #####################*/
    this.generoList = [
      { "id": 1, "itemName": "Man" },
      { "id": 2, "itemName": "Woman" }
    ];

    //this.selectedGenero = [];

    this.settingsGenero = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };

    /* #############  English  #####################*/
    this.englishList = [
      { "id": 1, "itemName": "Basic" },
      { "id": 2, "itemName": "Intermediate" },
      { "id": 3, "itemName": "Advanced" }
    ];

    //this.selectedGenero = [];

    this.settingsEnglish = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };

    /*#############Universidades starts#############*/
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

    this.settingSitiosUniversidades = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };
    /*#############Universidades ends#############*/

    /*#############Carreras starts#############*/
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

    this.settingSitiosCarrera = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };
    /*#############Carreras ends#############*/

    /*#############Estado starts#############*/
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

    this.settingSitiosEstado = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };
    /*#############Estado ends#############*/

      /* #############  Candidate Status  #####################*/
    this.candidateStatusList = [
      { "id": 1, "itemName": "Trainee" },
      { "id": 2, "itemName": "Recommended" }
    ];

    //this.selectedGenero = [];

    this.settingsCandidateStatus = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass new-referral-select"
    };


    /* #############  Recruiter  #####################*/
    this.recruiterList = [];

    //this.selectedRecruiter = [];

    this.settingsRecruiter = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    /* #############  Area  #####################*/
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

    //this.selectedArea = [];

    this.settingsArea = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    /* #############  Puesto  #####################*/
    this.puestoList = [];

    //this.selectedPuesto = [];

    this.settingsPuesto = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    /* #############  Area Dos #####################*/
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
      { "id": 18, "itemName": "Other area dos" },
    ];

    //this.selectedArea = [];

    this.settingsAreaDos = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    /* #############  Puesto Dos #####################*/
    this.puestoListDos = [];

    //this.selectedPuesto = [];

    this.settingsPuestoDos = {
      singleSelection: true,
      text: "--------------------------------------------",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };


		console.log('referral-edit.component cargado');
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();

  		if(this.identity){
  			$(document).ready(function(){
	  			$(".form").on("change", ".file-upload-field", function(){
		            $(this).parent(".file-upload-wrapper").attr("data-text",
				    $(this).val().replace(/.*(\/|\\)/, '') );
		        });
			});
  			this.getReferral();
  		}
	}

  //Aqui seleccionamos la location
  onItemSelect(item: any) {
  this.lockButtonLocation = true;

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
    this.lockButtonAreaDos = false;
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
    this.lockButtonPositionDos = false;
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
    console.log(item);
    //console.log(this.selectedItems);
  }

  OnGeneroDeSelect(item: any) {
    this.lockButtonGenrer = false;
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllGenero(items: any) {
    //console.log(items);
  }
  onDeSelectAllGenero(items: any) {
    //console.log(items);
  }

  onEnglishSelect(item: any) {
    this.lockButtonEnglish = true;
  }

  OnEnglishDeSelect(item: any) {
    this.lockButtonEnglish = false;
  }
  onSelectAllEnglish(items: any) {

  }
  onDeSelectAllEnglish(items: any) {

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

  /*Status Candidate Funcionts*/
  onCandidateStatusSelect(item: any) {
    this.lockButtonCandidateStatus = true;
    //console.log(item);
    //console.log(this.selectedItems);
  }

  OnECandidateStatusDeSelect(item: any) {
    this.lockButtonCandidateStatus = false;
    //console.log(item);
    //console.log(this.selectedItems);
  }
  onSelectAllCandidateStatus(items: any) {
    //console.log(items);
  }
  onDeSelectAllCandidateStatus(items: any) {
    //console.log(items);
  }

	getReferral(){
    this._route.params.forEach((params: Params) => {
        let idReferral = params['idReferral'];

        this._referralService.getReferral(idReferral, this.identity.id).subscribe(
          response => {
              //console.log(response.nombre);
              this.referral = response;

              for(var i in this.locationList){
                if(response.localidadrecruiter == this.locationList[i].itemName){
                  this.lockButtonLocation = true;
                  this.selectedLocation = [{ "id": this.locationList[i].id, "itemName": this.locationList[i].itemName },];
                }
              }

              this.onItemSelect(this.selectedLocation[0]);

              for(var i in this.recruiterList){
                if(response.idrecruiters == this.recruiterList[i].id){
                  this.lockButtonRecruiter = true;
                  this.selectedRecruiter = [{ "id": this.recruiterList[i].id, "itemName": this.recruiterList[i].itemName },];
                }
              }

              /*Area 1*/
              for(var i in this.areaList){
                if(response.areaposition == this.areaList[i].itemName){
                  this.lockButtonArea = true;
                  this.selectedArea = [{ "id": this.areaList[i].id, "itemName": this.areaList[i].itemName },];
                }
              }
              this.onAreaSelect(this.selectedArea[0]);
              /*Ends area 1*/

              /*Area 2*/
                for(var i in this.areaListDos){
                  if(response.areapositiondos == this.areaListDos[i].itemName){
                    this.lockButtonAreaDos = true;
                    this.selectedAreaDos = [{ "id": this.areaListDos[i].id, "itemName": this.areaListDos[i].itemName },];
                  }
                }
                this.onAreaSelectDos(this.selectedAreaDos[0]);
              /*Ends Area 2*/

              /*Puesto 2*/
              for(var i in this.puestoListDos){
                if(response.namepositiondos == this.puestoListDos[i].itemName){
                  this.lockButtonPositionDos = true;
                  this.selectedPuestoDos = [{ "id": this.puestoListDos[i].id, "itemName": this.puestoListDos[i].itemName },];
                }
              }
              if(this.selectedPuestoDos.length == 0){
                this.anotherPuestoDos = response.namepositiondos;
              }
              /*Ends puesto 2*/

              /*Puesto 1*/
              for(var i in this.puestoList){
                if(response.nameposition == this.puestoList[i].itemName){
                  this.lockButtonPosition = true;
                  this.selectedPuesto = [{ "id": this.puestoList[i].id, "itemName": this.puestoList[i].itemName },];
                }
              }
              if(this.selectedPuesto.length == 0){
                this.anotherPuesto = response.nameposition;
              }
              /*Ends Puesto 1*/

              for(var i in this.generoList){
                if(response.genero == this.generoList[i].itemName){
                  this.lockButtonGenrer = true;
                  this.selectedGenero = [{ "id": this.generoList[i].id, "itemName": this.generoList[i].itemName },];
                }
              }

              for(var i in this.englishList){
                if(response.englishlevelstring == this.englishList[i].itemName){
                  this.lockButtonEnglish = true;
                  this.selectedEnglish = [{ "id": this.englishList[i].id, "itemName": this.englishList[i].itemName },];
                }
              }

              for(var i in this.candidateStatusList){
                if(response.lastposition == this.candidateStatusList[i].itemName){
                  this.lockButtonCandidateStatus = true;
                  this.selectedCandidateStatus = [{ "id": this.candidateStatusList[i].id, "itemName": this.candidateStatusList[i].itemName },];
                }
              }

              for(var i in this.itemListUniversidades){
                if(response.university == this.itemListUniversidades[i].itemName){
                  this.lockButtonUniversity = true;
                  this.selectedItemsUniversidades = [{ "id": this.itemListUniversidades[i].id, "itemName": this.itemListUniversidades[i].itemName },];
                }
              }

              for(var i in this.itemListCarrera){
                if(response.career == this.itemListCarrera[i].itemName){
                  this.lockButtonCareer = true;
                  this.selectedItemsCarrera = [{ "id": this.itemListCarrera[i].id, "itemName": this.itemListCarrera[i].itemName },];
                }
              }

              for(var i in this.itemListEstado){
                if(response.estadoresidencia == this.itemListEstado[i].itemName){
                  this.lockButtonState = true;
                  this.selectedItemsEstado = [{ "id": this.itemListEstado[i].id, "itemName": this.itemListEstado[i].itemName },];
                }
              }

              //console.log(this.referral);
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
    });
	}

	onSubmit(){

    if(this.anotherPosition == true){
      if(this.anotherPuesto != ''){
        this.referral.localidadrecruiter = this.selectedLocation[0].itemName;
        this.referral.idrecruiters = this.selectedRecruiter[0].id;
        this.referral.areaposition = 'Other';
        this.referral.nameposition = this.anotherPuesto;
        this.referral.genero = this.selectedGenero[0].itemName;
        this.referral.career = this.selectedItemsCarrera[0].itemName;
        this.referral.university = this.selectedItemsUniversidades[0].itemName;
        this.referral.estadoresidencia = this.selectedItemsEstado[0].itemName;
        this.referral.lastposition =this.selectedCandidateStatus[0].itemName;
        if(this.selectedEnglish.length > 0){
          this.referral.englishlevelstring = this.selectedEnglish[0].itemName;
        }

        if(this.anotherPositionDos == true){
          if(this.anotherPuestoDos != ''){
            this.referral.areapositiondos = 'Other area dos';
            this.referral.namepositiondos = this.anotherPuestoDos;

            this._route.params.forEach((params: Params) => {
                let idReferral = params['idReferral'];

            		if(this.filesToUpload){
            			let ext = this.filesToUpload[0].type;
            			//console.log(ext);
            			this.lockButton = true;

            			if(ext == 'application/pdf'){

                    this._referralService.deleteReferralCV(idReferral).subscribe(
                      response => {
                           // Aqui ya se borro el CV del bucket, ahora hay que actualizar los datos nuevo primero
                           this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
                     				response => {
                     					    //Ya se actualizaron los datos, ahora a subir el nuevo file
                                  this.makeFileRequest(this.url+'sign-s3/'+idReferral, [], this.filesToUpload).then(
                      							(result: any) => {
                      								  this.lockButton = false;
                      			            		  this.toastr.success('Your changes have been registered', 'Success!');
                      	                			  this._router.navigate(['see-referrals']);
                      							},
                      							error => {
                      						          //this.alertMessage = body.message;
                                            this.lockButton = false;
                      			            		  this.toastr.error('There was an error uploading your photo', 'Error!');
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
            	            this.toastr.error('Please, upload CV in pdf format', 'Error!');
            			}
            		}else{
            			this.lockButton = true;
            			this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
            				response => {
            					this.lockButton = false;
            			        this.toastr.success('Your changes have been registered', 'Success!');
            			        this._router.navigate(['see-referrals']);
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
            });
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

          this._route.params.forEach((params: Params) => {
              let idReferral = params['idReferral'];

              if(this.filesToUpload){
                let ext = this.filesToUpload[0].type;
                //console.log(ext);
                this.lockButton = true;

                if(ext == 'application/pdf'){

                  this._referralService.deleteReferralCV(idReferral).subscribe(
                    response => {
                         // Aqui ya se borro el CV del bucket, ahora hay que actualizar los datos nuevo primero
                         this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
                          response => {
                                //Ya se actualizaron los datos, ahora a subir el nuevo file
                                this.makeFileRequest(this.url+'sign-s3/'+idReferral, [], this.filesToUpload).then(
                                  (result: any) => {
                                      this.lockButton = false;
                                            this.toastr.success('Your changes have been registered', 'Success!');
                                              this._router.navigate(['see-referrals']);
                                  },
                                  error => {
                                          //this.alertMessage = body.message;
                                          this.lockButton = false;
                                            this.toastr.error('There was an error uploading your photo', 'Error!');
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
                        this.toastr.error('Please, upload CV in pdf format', 'Error!');
                }
              }else{
                this.lockButton = true;
                this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
                  response => {
                    this.lockButton = false;
                        this.toastr.success('Your changes have been registered', 'Success!');
                        this._router.navigate(['see-referrals']);
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
          });


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
      this.referral.career = this.selectedItemsCarrera[0].itemName;
      this.referral.university = this.selectedItemsUniversidades[0].itemName;
      this.referral.estadoresidencia = this.selectedItemsEstado[0].itemName;
      this.referral.lastposition =this.selectedCandidateStatus[0].itemName;
      if(this.selectedEnglish.length > 0){
        this.referral.englishlevelstring = this.selectedEnglish[0].itemName;
      }

      if(this.anotherPositionDos == true){
        if(this.anotherPuestoDos != ''){
          this.referral.areapositiondos = 'Other area dos';
          this.referral.namepositiondos = this.anotherPuestoDos;

          this._route.params.forEach((params: Params) => {
              let idReferral = params['idReferral'];

          		if(this.filesToUpload){
          			let ext = this.filesToUpload[0].type;
          			console.log(ext);
          			this.lockButton = true;

          			if(ext == 'application/pdf'){

                  this._referralService.deleteReferralCV(idReferral).subscribe(
                    response => {
                         // Aqui ya se borro el CV del bucket, ahora hay que actualizar los datos nuevo primero
                         this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
                   				response => {
                   					    //Ya se actualizaron los datos, ahora a subir el nuevo file
                                this.makeFileRequest(this.url+'sign-s3/'+idReferral, [], this.filesToUpload).then(
                    							(result: any) => {
                    								  this.lockButton = false;
                    			            		  this.toastr.success('Your changes have been registered', 'Success!');
                    	                			  this._router.navigate(['see-referrals']);
                    							},
                    							error => {
                    						          //this.alertMessage = body.message;
                                          this.lockButton = false;
                    			            		  this.toastr.error('There was an error uploading your photo', 'Error!');
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
          	            this.toastr.error('Please, upload CV in pdf format', 'Error!');
          			}
          		}else{
          			this.lockButton = true;
          			this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
          				response => {
          					this.lockButton = false;
          			        this.toastr.success('Your changes have been registered', 'Success!');
          			        this._router.navigate(['see-referrals']);
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
          });

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

        this._route.params.forEach((params: Params) => {
            let idReferral = params['idReferral'];

        		if(this.filesToUpload){
        			let ext = this.filesToUpload[0].type;
        			console.log(ext);
        			this.lockButton = true;

        			if(ext == 'application/pdf'){

                this._referralService.deleteReferralCV(idReferral).subscribe(
                  response => {
                       // Aqui ya se borro el CV del bucket, ahora hay que actualizar los datos nuevo primero
                       this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
                 				response => {
                 					    //Ya se actualizaron los datos, ahora a subir el nuevo file
                              this.makeFileRequest(this.url+'sign-s3/'+idReferral, [], this.filesToUpload).then(
                  							(result: any) => {
                  								  this.lockButton = false;
                  			            		  this.toastr.success('Your changes have been registered', 'Success!');
                  	                			  this._router.navigate(['see-referrals']);
                  							},
                  							error => {
                  						          //this.alertMessage = body.message;
                                        this.lockButton = false;
                  			            		  this.toastr.error('There was an error uploading your photo', 'Error!');
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
        	            this.toastr.error('Please, upload CV in pdf format', 'Error!');
        			}
        		}else{
        			this.lockButton = true;
        			this._referralService.updateReferral(idReferral, this.identity.id, this.referral).subscribe(
        				response => {
        					this.lockButton = false;
        			        this.toastr.success('Your changes have been registered', 'Success!');
        			        this._router.navigate(['see-referrals']);
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
        });
      }

    }


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

	logout(){
	  	localStorage.removeItem('identidad');
	    localStorage.removeItem('tokenrecomendado');
	  	localStorage.clear();
	  	this.identity = null;
	  	this.token = null;
	    this._router.navigate(['/login']);
	}
}
