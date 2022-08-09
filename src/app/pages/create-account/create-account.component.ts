import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Services
import { AuthApiService } from 'src/app/api/auth-api.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})

export class CreateAccountComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.valid) {
      this.loading = true;
      const response = await this.authApi.createAccount(this.form.value)
      this.loading = false;

      if (response.isOk) {
        this.authApi.save(response.data.user, response.data.token);
        // this.toastr.success('Conta criada. Seja bem-vindo!');
        this.router.navigate(['/home']);
      } else {
        // this.toastr.error(this.authService.messages(response.message));
      }

    } else {
      // this.toastr.error('Preencha todos os campos corretamente');
    }

  }
}
