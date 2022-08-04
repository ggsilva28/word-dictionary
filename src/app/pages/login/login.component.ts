import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Services
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.valid) {
      this.loading = true;
      const response = await this.authService.login(this.form.value.email, this.form.value.password)
      this.loading = false;

      if (response.isOk) {
        this.authService.save(response.data.user, response.data.token);
        // this.toastr.success('Bem-vindo!');
        this.router.navigate(['/home']);
      } else {
        // this.toastr.error(this.authService.messages(response.message));
      }

    } else {
      // this.toastr.error('Preencha todos os campos corretamente');
    }

  }
}
