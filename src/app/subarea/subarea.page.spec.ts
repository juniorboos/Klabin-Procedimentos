import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubareaPage } from './subarea.page';

describe('SubareaPage', () => {
  let component: SubareaPage;
  let fixture: ComponentFixture<SubareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubareaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
