import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithSocialNetworkComponent } from './login-with-social-network.component';

describe('LoginWithSocialNetworkComponent', () => {
  let component: LoginWithSocialNetworkComponent;
  let fixture: ComponentFixture<LoginWithSocialNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithSocialNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithSocialNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
