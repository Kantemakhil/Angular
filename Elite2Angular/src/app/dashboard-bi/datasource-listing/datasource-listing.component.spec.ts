import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceListingComponent } from './datasource-listing.component';

describe('DatasourceListingComponent', () => {
  let component: DatasourceListingComponent;
  let fixture: ComponentFixture<DatasourceListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
