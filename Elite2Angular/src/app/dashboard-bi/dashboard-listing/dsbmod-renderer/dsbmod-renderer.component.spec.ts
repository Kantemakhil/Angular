import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsbmodRendererComponent } from './dsbmod-renderer.component';

describe('DsbmodRendererComponent', () => {
  let component: DsbmodRendererComponent;
  let fixture: ComponentFixture<DsbmodRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsbmodRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsbmodRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
