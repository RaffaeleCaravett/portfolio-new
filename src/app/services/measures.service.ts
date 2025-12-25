import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  public measure: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  measureNext(valueHeight: string, valueWidth: string) {
    if (valueHeight && valueHeight.length > 0 && valueWidth && valueWidth.length > 0) {
      this.measure.next([valueHeight, valueWidth]);
    }
  }
}
