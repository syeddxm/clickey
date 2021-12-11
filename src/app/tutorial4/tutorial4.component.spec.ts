import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tutorial4Component } from './tutorial4.component';

describe('Tutorial4Component', () => {
  let component: Tutorial4Component;
  let fixture: ComponentFixture<Tutorial4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tutorial4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tutorial4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
