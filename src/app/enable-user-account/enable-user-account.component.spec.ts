import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableUserAccountComponent } from './enable-user-account.component';

describe('EnableUserAccountComponent', () => {
  let component: EnableUserAccountComponent;
  let fixture: ComponentFixture<EnableUserAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableUserAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
