import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentSearchComponent } from './incident-search.component';

describe('IncidentSearchComponent', () => {
  let component: IncidentSearchComponent;
  let fixture: ComponentFixture<IncidentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentSearchComponent ]
    })
    
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
