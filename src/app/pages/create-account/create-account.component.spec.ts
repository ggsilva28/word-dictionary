import { HomeComponent } from './../home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateAccountComponent } from './create-account.component';

//Services
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from '../../api/auth-api.service';

//Mocks
import { ToastrMockService } from './../../../mocks/services/toastr.mock';
import { AuthApiMock } from './../../../mocks/api/auth-api.mock';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent }
        ]),
        ReactiveFormsModule
      ],
      providers: [
        { provide: ToastrService, useValue: new ToastrMockService() },
        { provide: AuthApiService, useValue: new AuthApiMock() },
        UntypedFormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call submit success", async () => {
    component.form = new UntypedFormBuilder().group({
      email: ['test@email.com', Validators.required],
      password: ['123456', Validators.required],
      name: ['Test', Validators.required]
    });

    const response = {
      token: 'token',
      user: {
        id: 1,
        name: 'Test',
        email: '',
      }
    }

    const spyAuthLogin = jest.spyOn(component.authApi, 'createAccount').mockResolvedValue({
      isOk: true,
      code: 200,
      message: 'login.success',
      data: response
    });
    const spyAuthSave = jest.spyOn(component.authApi, 'save');
    const spyRouterNavigate = jest.spyOn(component.router, 'navigate');
    const spyToastrSuccess = jest.spyOn(component.toastr, 'success');

    await component.submit();

    expect(spyAuthSave).toHaveBeenCalledWith(response.user, response.token);
    expect(spyAuthLogin).toHaveBeenCalledWith({
      email: 'test@email.com',
      password: '123456',
      name: 'Test'
    });
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/home']);
    expect(spyToastrSuccess).toHaveBeenCalledWith('Conta criada. Seja bem-vindo!');
  })

  it("should call submit error", async () => {
    component.form = new UntypedFormBuilder().group({
      email: ['test@email.com', Validators.required],
      password: ['123456', Validators.required],
      name: ['Test', Validators.required]
    });

    jest.spyOn(component.authApi, 'createAccount').mockResolvedValue({
      isOk: false,
      code: 400,
      message: 'user.not_found',
    });

    const spyToastrError = jest.spyOn(component.toastr, 'error');

    await component.submit();
    expect(spyToastrError).toHaveBeenCalledWith(component.authApi.messages('user.not_found'));
  })
});
