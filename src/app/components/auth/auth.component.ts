import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { AuthApiService } from '../../api/auth-api.service';

//Interfaces
import { IUser } from './../../interfaces/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public user?: IUser;

  constructor(
    public authApi: AuthApiService,
    public router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.authApi.getUser();
  }

}
