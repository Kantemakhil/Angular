import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsiosearComponent } from './osiosear.component';

describe('OsiosearComponent', () => {
  let component: OsiosearComponent;
  let fixture: ComponentFixture<OsiosearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsiosearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsiosearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
