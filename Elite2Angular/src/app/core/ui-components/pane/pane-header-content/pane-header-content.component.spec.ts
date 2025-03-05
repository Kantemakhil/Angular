import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneHeaderContentComponent } from './pane-header-content.component';

describe('PaneHeaderContentComponent', () => {
  let component: PaneHeaderContentComponent;
  let fixture: ComponentFixture<PaneHeaderContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneHeaderContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneHeaderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
