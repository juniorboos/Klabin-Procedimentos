import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSubareaPage } from './c-subarea.page';

describe('CSubareaPage', () => {
  let component: CSubareaPage;
  let fixture: ComponentFixture<CSubareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSubareaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSubareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
