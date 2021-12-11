import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tutorial2Component } from './tutorial2.component';

describe('Tutorial2Component', () => {
  let component: Tutorial2Component;
  let fixture: ComponentFixture<Tutorial2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tutorial2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tutorial2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
