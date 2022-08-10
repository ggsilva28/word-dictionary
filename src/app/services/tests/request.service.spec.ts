import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RequestService } from '../request.service';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call get", () => {
    const spy = jest.spyOn(service.http, 'get')
    service.get("myUrl");
    expect(spy).toHaveBeenCalled();
  });

  it("should call post", () => {
    const spy = jest.spyOn(service.http, 'post')
    service.post("myUrl");
    expect(spy).toHaveBeenCalled();
  });

  it("should call put", () => {
    const spy = jest.spyOn(service.http, 'put')
    service.put("myUrl");
    expect(spy).toHaveBeenCalled();
  });

  it("should call delete", () => {
    const spy = jest.spyOn(service.http, 'delete')
    service.delete("myUrl");
    expect(spy).toHaveBeenCalled();
  });

});
