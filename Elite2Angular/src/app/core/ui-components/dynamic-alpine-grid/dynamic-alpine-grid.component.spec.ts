import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAlpineGridComponent } from './dynamic-alpine-grid.component';

describe('DynamicAlpineGridComponent', () => {
  let component: DynamicAlpineGridComponent;
  let fixture: ComponentFixture<DynamicAlpineGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicAlpineGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAlpineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
