import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  public measure: BehaviorSubject<string> = new BehaviorSubject<string>('');

  measureNext(value: string) {
    if (value && value.length > 0) {
      this.measure.next(value);
    }
  }
}
