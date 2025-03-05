import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneActionsComponent } from './pane-actions.component';

describe('PaneActionsComponent', () => {
  let component: PaneActionsComponent;
  let fixture: ComponentFixture<PaneActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
