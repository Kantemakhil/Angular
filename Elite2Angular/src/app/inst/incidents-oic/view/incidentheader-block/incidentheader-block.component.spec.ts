import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentHeaderBlockComponent } from './incidentheader-block.component';

describe('IncidentHeaderBlockComponent', () => {
  let component: IncidentHeaderBlockComponent;
  let fixture: ComponentFixture<IncidentHeaderBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentHeaderBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentHeaderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
