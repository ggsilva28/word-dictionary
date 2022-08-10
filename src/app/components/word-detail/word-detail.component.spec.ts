import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { WordDetailComponent } from './word-detail.component';

//API
import { WordsApiService } from '../../api/words-api.service';

//Services
import { EventService } from '../../services/event.service';

//Mocks
import { wordsApiMock } from '../../../mocks/api/words-api.mock';
import { EventMockService } from '../../../mocks/services/event.mock';


describe('WordDetailComponent', () => {
  let component: WordDetailComponent;
  let fixture: ComponentFixture<WordDetailComponent>;

  const dataWord = {
    word: 'test',
    phonetics: [
      {
        text: 'test',
        audio: ''
      }
    ],
    meanings: [
      {
        definitions: [
          {
            definition: 'test'
          }
        ]
      }
    ],
    license: {
      name: 'test',
      url: ''
    },
    sourceUrls: []
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordDetailComponent],
      providers: [
        { provide: WordsApiService, useValue: new wordsApiMock() },
        { provide: EventService, useValue: new EventMockService() },
        { provide: MatDialogRef, useValue: { close: jest.fn(() => { }) } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("should call getWord", async () => {
    const data = dataWord;
    const spy = jest.spyOn(component.wordsApi, "getWord").mockResolvedValue({
      isOk: true,
      data: data
    });
    component.word = 'test';

    await component.getWord();

    expect(spy).toHaveBeenCalledWith('test');
    expect(component.wordData).toEqual(data);
    expect(component.error).toBeFalsy();
  });

  it("should call getWord and set error", async () => {
    jest.spyOn(component.wordsApi, "getWord").mockResolvedValue({
      isOk: false,
      data: {}
    });
    component.word = 'test';

    await component.getWord();

    expect(component.error).toBeTruthy();
  });

  it("should call getPhonetics", () => {
    const data = dataWord;
    component.wordData = data;

    const result = component.getPhonetics();

    expect(result).toEqual([{ text: 'test', audio: null }]);
  });

  it("should call getDefinition", () => {
    const data = dataWord;
    component.wordData = data;

    const result = component.getDefinition(data.meanings[0].definitions);

    expect(result).toEqual('test');
  });

  it("should call prev", () => {
    const spy = jest.spyOn(component.event, "publish");

    component.prev();

    expect(spy).toHaveBeenCalledWith('word-detail:prev');
  });

  it("should call next", () => {
    const spy = jest.spyOn(component.event, "publish");

    component.next();

    expect(spy).toHaveBeenCalledWith('word-detail:next');
  });

  it("should call close", () => {
    const spy = jest.spyOn(component.dialogRef, "close");

    component.close();

    expect(spy).toHaveBeenCalled();
  });
});
