import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceRenderComponent } from './datasource-render.component';

describe('DatasourceRenderComponent', () => {
  let component: DatasourceRenderComponent;
  let fixture: ComponentFixture<DatasourceRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
