import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservonicService {
  constructor() {}

  private passwords = new Subject<boolean>();
  private labels = new Subject<boolean>();

  passwordsChanged$ = this.passwords.asObservable();
  labelsChanged$ = this.labels.asObservable();

  passwordsChanged(change: boolean) {
    this.passwords.next(change);
  }

  labelsChanged(change: boolean) {
    this.labels.next(change);
  }
}
