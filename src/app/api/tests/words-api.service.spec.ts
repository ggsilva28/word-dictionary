import { TestBed } from '@angular/core/testing';

import { WordsApiService } from '../words-api.service';

//Services
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';

//Utils
import { keys } from '../../utils/keys.enum';

//Mocks
import { RequestMockService } from './../../../mocks/services/request.mock';
import { LocalStorageMockService } from './../../../mocks/services/local-storage.mock';

describe('WordsApiService', () => {
  let service: WordsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RequestService, useValue: new RequestMockService() },
        { provide: LocalStorageService, useValue: new LocalStorageMockService() },
      ]
    });
    service = TestBed.inject(WordsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call get", () => {
    const spy = jest.spyOn(service.request, 'get')

    service.get(100, 0);

    expect(spy).toHaveBeenCalledWith('/words/list?offset=0&limit=100');
  });

  it("should get word from storage", async () => {
    const spySave = jest.spyOn(service, 'saveToHistory').mockImplementation(async () => { });
    const spyGetStorage = jest.spyOn(service.localStorage, 'get').mockResolvedValue({
      test: { word: 'test' }
    })
    const word = 'test'

    const data = await service.getWord(word)

    expect(spySave).toHaveBeenCalledWith(word);
    expect(spyGetStorage).toHaveBeenCalledWith(keys.WORD_API);
    expect(data).toEqual({ word: 'test' });
  })

  it("should get word from api", async () => {
    const spySave = jest.spyOn(service, 'saveToHistory').mockImplementation(async () => { });
    const spyGetStorage = jest.spyOn(service.localStorage, 'get').mockResolvedValue(null)
    const spyGet = jest.spyOn(service.request, 'get').mockResolvedValue({
      isOk: true,
      code: 200,
      message: 'OK',
      data: { word: 'test' }
    })
    const word = 'test'

    const data = await service.getWord(word)

    expect(spySave).toHaveBeenCalledWith(word);
    expect(spyGetStorage).toHaveBeenCalledWith(keys.WORD_API);
    expect(spyGet).toHaveBeenCalledWith(`/words/detail/${word}`);
    expect(data).toEqual({
      isOk: true,
      code: 200,
      message: 'OK',
      data: { word: 'test' }
    });
  });

  it("should call saveToHistory", async () => {
    const spyGet = jest.spyOn(service.localStorage, 'get').mockResolvedValue(['test'])
    const spy = jest.spyOn(service.localStorage, 'set')

    await service.saveToHistory('test2');

    expect(spyGet).toHaveBeenCalledWith(keys.HISTORY);
    expect(spy).toHaveBeenCalledWith(keys.HISTORY, ['test', 'test2']);
  });

  it("should call saveToHistory with repeated word", async () => {
    jest.spyOn(service.localStorage, 'get').mockResolvedValue(['test', 'test2'])
    const spy = jest.spyOn(service.localStorage, 'set')

    await service.saveToHistory('test2');

    expect(spy).not.toHaveBeenCalled();
  });

  it("should call updateOnWordAPIHistory", async () => {
    const spyGet = jest.spyOn(service.localStorage, 'get').mockResolvedValue({
      test: { word: 'test', data: { isFavorite: false } }
    })
    const spy = jest.spyOn(service.localStorage, 'set')

    await service.updateOnWordAPIHistory('test', { isFavorite: true });

    expect(spyGet).toHaveBeenCalledWith(keys.WORD_API);
    expect(spy).toHaveBeenCalledWith(keys.WORD_API, {
      test: { word: 'test', data: { isFavorite: true } }
    });
  });

  it("should call getHistory", async () => {
    const spy = jest.spyOn(service.localStorage, 'get').mockResolvedValue(['test'])
    const data = await service.getHistory();

    expect(spy).toHaveBeenCalledWith(keys.HISTORY);
    expect(data).toEqual({
      isOk: true,
      data: {
        results: ['test']
      }
    });
  });

});
