import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CProcedimentoPage } from './c-procedimento.page';

describe('CProcedimentoPage', () => {
  let component: CProcedimentoPage;
  let fixture: ComponentFixture<CProcedimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CProcedimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CProcedimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
