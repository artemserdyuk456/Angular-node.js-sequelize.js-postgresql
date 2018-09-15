import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegComponent } from './form-reg.component';

describe('FormRegComponent', () => {
  let component: FormRegComponent;
  let fixture: ComponentFixture<FormRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
