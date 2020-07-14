import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedimentoPage } from './procedimento.page';

describe('ProcedimentoPage', () => {
  let component: ProcedimentoPage;
  let fixture: ComponentFixture<ProcedimentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedimentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
