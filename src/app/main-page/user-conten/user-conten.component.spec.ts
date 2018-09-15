import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContenComponent } from './user-conten.component';

describe('UserContenComponent', () => {
  let component: UserContenComponent;
  let fixture: ComponentFixture<UserContenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
