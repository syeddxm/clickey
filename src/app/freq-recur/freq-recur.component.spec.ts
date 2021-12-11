import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreqRecurComponent } from './freq-recur.component';

describe('FreqRecurComponent', () => {
  let component: FreqRecurComponent;
  let fixture: ComponentFixture<FreqRecurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreqRecurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreqRecurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
