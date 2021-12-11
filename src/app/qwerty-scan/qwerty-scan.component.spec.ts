import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QwertyScanComponent } from './qwerty-scan.component';

describe('QwertyScanComponent', () => {
  let component: QwertyScanComponent;
  let fixture: ComponentFixture<QwertyScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QwertyScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QwertyScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
