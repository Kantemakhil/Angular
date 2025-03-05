import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffendersComponent } from './my-offenders.component';

describe('MyOffendersComponent', () => {
  let component: MyOffendersComponent;
  let fixture: ComponentFixture<MyOffendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOffendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOffendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
