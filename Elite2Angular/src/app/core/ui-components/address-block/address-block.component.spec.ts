import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressblockComponent } from './address-block.component';

describe('AddressblockComponent', () => {
  let component: AddressblockComponent;
  let fixture: ComponentFixture<AddressblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
