import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthComponent } from './auth.component';

//Services
import { AuthApiService } from './../../api/auth-api.service';

//Mocks
import { AuthApiMock } from './../../../mocks/api/auth-api.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AuthApiService, useValue: new AuthApiMock() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on init', () => {
    const spyAuth = jest.spyOn(component.authApi, 'getUser');

    component.ngOnInit();

    expect(spyAuth).toHaveBeenCalled();
  });
});
