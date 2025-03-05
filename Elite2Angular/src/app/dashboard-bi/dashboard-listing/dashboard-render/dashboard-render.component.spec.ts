import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRenderComponent } from './dashboard-render.component';

describe('DashboardRenderComponent', () => {
  let component: DashboardRenderComponent;
  let fixture: ComponentFixture<DashboardRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
