import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Services
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from 'src/app/api/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: UntypedFormGroup;
  public loading: boolean = false;
  public hide = true;

  constructor(
    private fb: UntypedFormBuilder,
    private authApi: AuthApiService,
    private router: Router,
    private toastr: ToastrService
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
      const response = await this.authApi.login(this.form.value.email, this.form.value.password)
      this.loading = false;
      console.log(response);

      if (response.isOk) {
        this.authApi.save(response.data.user, response.data.token);
        this.toastr.success('Welcome!');
        this.router.navigate(['/home']);
      } else {
        this.toastr.error(this.authApi.messages(response.message));
      }

    } else {
      this.toastr.error('Fill all fields!');
    }

  }
}
