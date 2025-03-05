import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchbuttonComponent } from './launchbutton.component';

describe('LaunchbuttonComponent', () => {
  let component: LaunchbuttonComponent;
  let fixture: ComponentFixture<LaunchbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
