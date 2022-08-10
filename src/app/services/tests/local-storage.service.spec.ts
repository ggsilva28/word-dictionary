import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from '../local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should set and get value to local storage", () => {
    const key = "test";
    const value = "test value";
    service.set(key, value);
    expect(service.get(key)).toBe(value);
  });

  it("should set an object to local storage", () => {
    const key = "test";
    const value = { test: "test value" };
    service.set(key, value);
    expect(service.get(key)).toEqual(value);
  });

  it("should remove a value from local storage", () => {
    const key = "testKey";
    const value = "testValue";
    service.set(key, value);
    expect(service.get(key)).toEqual(value);
    service.remove(key);
    expect(service.get(key)).toBeNull();
  });

  it("should clear local storage", () => {
    const key = "testKey";
    const value = "testValue";
    service.set(key, value);
    expect(service.get(key)).toEqual(value);
    service.clear();
    expect(service.get(key)).toBeNull();
  });

});
