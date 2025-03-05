import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { ITooltipParams } from '@ag-grid-enterprise/all-modules';
import { Component, OnInit } from '@angular/core';
import { DateFormat } from '../datepicker/dateFormat';
import { TimeFormat } from '../time/timeFormat';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'cell-tooltip',
  template: ` <div class="grid-cell-tooltip" *ngIf="left > 0 && top > 0 && showTooltip" [ngStyle]="{'left': left+'px' , 'top' : top+'px' }">
    {{ value }} </div>`,
  styles: [
    `
      :host {
        width: 150px;
        height: 70px;
        pointer-events: none;
        transition: opacity 1s;
      }

      .grid-cell-tooltip{
        background-color: gray;
        position: fixed;
        padding: 10px;
        border-radius: 5px;
      }
    `,
  ],
})
export class GridCellTooltipComponent implements OnInit, ITooltipAngularComp {
  private params!: ITooltipParams;
  public rowData!: any;
  public value:any = '';
  left = 0;
  top = 0;
  showTooltip:boolean = false;

  ngOnInit() {
    fromEvent(document.body, 'mousemove').subscribe(e => {
        this.left = e['pageX'] + 20;
        this.top = e['pageY'] + 20;
    })
  }

  agInit(params: { color: string } & ITooltipParams): void {
    this.showTooltip = false;
    let cellVal = params.value;
    this.params = params;
    this.rowData = params.api!.getDisplayedRowAtIndex(params.rowIndex!)!.data;
    let dataType = params.colDef['coltype'];
    if(dataType == 'date'){
      this.value = DateFormat.getDate(cellVal);
    }
    else if(dataType == 'time'){
        this.value = TimeFormat.format(cellVal);
    }
    else if(dataType == 'hyperlink' || dataType == 'checkbox' || dataType == 'lov'){
        this.showTooltip = false;
        this.left = 0;
        this.top = 0;
        return;
    }
    else{
        this.value = cellVal;
    }
    this.showTooltip = true;
  }
}