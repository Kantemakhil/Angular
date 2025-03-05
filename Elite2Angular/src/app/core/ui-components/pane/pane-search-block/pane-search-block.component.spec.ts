import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneSearchcBlockComponent } from './pane-search-block.component';

describe('PaneSearchcBlockComponent', () => {
  let component: PaneSearchcBlockComponent;
  let fixture: ComponentFixture<PaneSearchcBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaneSearchcBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneSearchcBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
