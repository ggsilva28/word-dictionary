import { HomeComponent } from './../../pages/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';

import { WordsListComponent } from './words-list.component';

//API
import { WordsApiService } from '../../api/words-api.service';
import { UserFavoriteApiService } from './../../api/user-favorite-api.service';

//Services
import { EventService } from '../../services/event.service';

//Components
import { WordDetailComponent } from './../word-detail/word-detail.component';

//Mocks
import { wordsApiMock } from '../../../mocks/api/words-api.mock';
import { UserFavoriteApiMock } from '../../../mocks/api/user-favorite-api.mock';
import { EventMockService } from '../../../mocks/services/event.mock';

describe('WordsListComponent', () => {
  let component: WordsListComponent;
  let fixture: ComponentFixture<WordsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsListComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home/test', component: HomeComponent }
        ])
      ],
      providers: [
        { provide: WordsApiService, useValue: new wordsApiMock() },
        { provide: UserFavoriteApiService, useValue: new UserFavoriteApiMock() },
        { provide: EventService, useValue: new EventMockService() },
        { provide: MatDialog, useValue: { open: jest.fn(() => { }) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getData", () => {
    const spyWordsGet = jest.spyOn(component.wordsApi, 'get');
    const spyUserFavoriteGet = jest.spyOn(component.userFavoriteApi, 'getUserFavorite');
    const spyWordsHistory = jest.spyOn(component.wordsApi, 'getHistory');

    component.getFrom = 'all';
    component.getData();
    expect(spyWordsGet).toHaveBeenCalled();

    component.getFrom = 'favorites';
    component.getData();
    expect(spyUserFavoriteGet).toHaveBeenCalled();

    component.getFrom = 'history';
    component.getData();
    expect(spyWordsHistory).toHaveBeenCalled();

    component.getFrom = 'test';
    component.getData();
    expect(spyWordsGet).toHaveBeenCalled();
  });

  it("should call getWords", async () => {
    component.page = 0;
    const spy = jest.spyOn(component.wordsApi, "get");
    const spyUpdate = jest.spyOn(component, "updateDetails");

    await component.getWords();
    expect(spy).toHaveBeenCalled();
    expect(spyUpdate).toHaveBeenCalled();
  });

  it("should call updateDetails", () => {
    const spyPublish = jest.spyOn(component.event, "publish");
    const spyRouter = jest.spyOn(component.router, "navigate");

    component.updateDetails('test', 0);

    expect(component.selectedWord.word).toBe('test');
    expect(component.selectedWord.index).toBe(0);
    expect(spyPublish).toHaveBeenCalledWith('word-detail:show', 'test');
    expect(spyRouter).toHaveBeenCalledWith(['/home/test']);
  })

  it("should call openDetails", async () => {
    const spy = jest.spyOn(component.dialog, "open");
    const spyUpdate = jest.spyOn(component, "updateDetails");
    const spyIsMobile = jest.spyOn(component, "isMobile").mockReturnValue(true);

    await component.openDetails('test', 0);

    expect(spy).toHaveBeenCalled();
    expect(spyUpdate).toHaveBeenCalled();
  });

});
