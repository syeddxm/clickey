import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QwertyRecurComponent } from './qwerty-recur.component';

describe('QwertyRecurComponent', () => {
  let component: QwertyRecurComponent;
  let fixture: ComponentFixture<QwertyRecurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QwertyRecurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QwertyRecurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
