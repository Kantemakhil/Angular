import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceCreateComponent } from './datasource-create.component';

describe('DatasourceCreateComponent', () => {
  let component: DatasourceCreateComponent;
  let fixture: ComponentFixture<DatasourceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
