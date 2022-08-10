import { TestBed } from '@angular/core/testing';

import { EventService } from '../event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should subscribe and publish an event", () => {
    const event = "test";
    const callback = jest.fn();
    service.subscribe(event, callback);
    service.publish(event);
    expect(callback).toHaveBeenCalled();
  })

  it("should unsubscribe from an event", () => {
    const event = "test";
    const callback = jest.fn();
    service.subscribe(event, callback);
    service.destroy(event);
    service.publish(event);
    expect(callback).not.toHaveBeenCalled();
  })

});
