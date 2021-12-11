import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreqScanComponent } from './freq-scan.component';

describe('FreqScanComponent', () => {
  let component: FreqScanComponent;
  let fixture: ComponentFixture<FreqScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreqScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreqScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
