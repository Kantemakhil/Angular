import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FivelmenuComponent } from './fivelmenu.component';

describe('FivelmenuComponent', () => {
  let component: FivelmenuComponent;
  let fixture: ComponentFixture<FivelmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FivelmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FivelmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
