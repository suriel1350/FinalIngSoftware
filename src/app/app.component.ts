import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';

declare var M:any;
//import { TokenToCheck } from './models/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Referrals';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  //public tokenreg: TokenToCheck;
  public errorMessage;
  public alertRegister;
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
  	this.user = new User('','','','','');
  	this.user_register = new User('','','','','');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

}
