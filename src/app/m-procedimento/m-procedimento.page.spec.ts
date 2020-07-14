import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MProcedimentoPage } from './m-procedimento.page';

describe('MProcedimentoPage', () => {
  let component: MProcedimentoPage;
  let fixture: ComponentFixture<MProcedimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MProcedimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MProcedimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
