import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fruit } from './fruit';

describe('Fruit', () => {
  let component: Fruit;
  let fixture: ComponentFixture<Fruit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fruit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fruit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
