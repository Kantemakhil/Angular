import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmateIntakeSummaryComponent } from './inmate-intake-summary.component';

describe('InmateIntakeSummaryComponent', () => {
  let component: InmateIntakeSummaryComponent;
  let fixture: ComponentFixture<InmateIntakeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmateIntakeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmateIntakeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
