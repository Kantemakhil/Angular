import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'grid-pinned-empty-renderer',
  template: ``,
})
export class GridPinnedEmptyRenderer implements ICellRendererAngularComp {
public params: any;
  public style: string;

  agInit(params: any): void {
    this.params = params;
    this.style = this.params.style;
  }

  refresh(): boolean {
    return false;
  }
}
