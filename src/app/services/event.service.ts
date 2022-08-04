import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription, filter, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public observable: Observable<any>
  public observer!: Observer<any>

  constructor(
  ) {
    this.observable = Observable.create((observer: Observer<any>) => {
      this.observer = observer
    }).pipe(share());
  }

  subscribe(eventName: string, callback: any) {
    const subscriber: Subscription = this.observable.pipe(
      filter((event: any) => {
        return event.name === eventName
      }
      )
    ).subscribe(callback);

    return subscriber;
  }

  publish(eventName: string, data: any) {
    this.observer.next({
      name: eventName,
      data: data
    });
  }

  unsubscribe(subscriber: Subscription) {
    subscriber.unsubscribe();
  }
}
