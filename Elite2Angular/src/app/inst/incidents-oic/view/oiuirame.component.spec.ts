import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OiuirameComponent } from './oiuirame.component';

describe('OiuirameComponent', () => {
  let component: OiuirameComponent;
  let fixture: ComponentFixture<OiuirameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OiuirameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OiuirameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
