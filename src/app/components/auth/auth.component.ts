import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { AuthApiService } from 'src/app/api/auth-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public authApi: AuthApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
