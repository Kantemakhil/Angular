import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCalendarComponent } from './weekcalendar.component';

describe('WeekCalendarComponent', () => {
  let component: WeekCalendarComponent;
  let fixture: ComponentFixture<WeekCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeekCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
