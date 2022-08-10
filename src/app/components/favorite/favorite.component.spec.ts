import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteComponent } from './favorite.component';

//API
import { UserFavoriteApiService } from '../../api/user-favorite-api.service';
import { AuthApiService } from '../../api/auth-api.service';
import { WordsApiService } from '../../api/words-api.service';

//Services
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';

//Mocks
import { UserFavoriteApiMock } from '../../../mocks/api/user-favorite-api.mock';
import { AuthApiMock } from '../../../mocks/api/auth-api.mock';
import { wordsApiMock } from '../../../mocks/api/words-api.mock';
import { EventMockService } from '../../../mocks/services/event.mock';
import { ToastrMockService } from './../../../mocks/services/toastr.mock';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      providers: [
        { provide: UserFavoriteApiService, useValue: new UserFavoriteApiMock() },
        { provide: AuthApiService, useValue: new AuthApiMock() },
        { provide: WordsApiService, useValue: new wordsApiMock() },
        { provide: EventService, useValue: new EventMockService() },
        { provide: ToastrService, useValue: new ToastrMockService() },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call favorite", async () => {
    const spyAdd = jest.spyOn(component.userFavoriteApi, "addUserFavorite");
    const spyUpdate = jest.spyOn(component.wordsApi, "updateOnWordAPIHistory");
    const spySuccess = jest.spyOn(component, "success");
    component.word = 'test';
    component.fav = false;

    await component.favorite();

    expect(spyAdd).toHaveBeenCalledWith('test');
    expect(spyUpdate).toHaveBeenCalledWith('test', { isFavorite: true });
    expect(spySuccess).toHaveBeenCalledWith('Word added to favorites');
  });

  it("should call unfavorite", async () => {
    const spyDelete = jest.spyOn(component.userFavoriteApi, "deleteUserFavorite");
    const spyUpdate = jest.spyOn(component.wordsApi, "updateOnWordAPIHistory");
    const spySuccess = jest.spyOn(component, "success");
    component.word = 'test';
    component.fav = true;

    await component.unfavorite();

    expect(spyDelete).toHaveBeenCalledWith('test');
    expect(spyUpdate).toHaveBeenCalledWith('test', { isFavorite: false });
    expect(spySuccess).toHaveBeenCalledWith('Word removed from favorites');
  });

  it("should call success", () => {
    const spyPublish = jest.spyOn(component.event, "publish");
    const spyToastr = jest.spyOn(component.toastr, "success");
    component.success('test');

    expect(spyPublish.mock.calls).toEqual([['word-list:fav-update'], ['word-detail:update']]);
    expect(spyToastr).toHaveBeenCalledWith('test');
  });

});
