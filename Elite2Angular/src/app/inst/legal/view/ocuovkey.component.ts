import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';



@Component({
  selector: 's4-ocuovkey',
  templateUrl: './ocuovkey.component.html',
  styleUrls: ['./ocuovkey.component.css']
})

export class OcuovkeyComponent implements OnInit {

  msglist = [];
  message = ' Invalid.';
  type = 'error';
  msgs: any[] = [];
  ocuovkeyCoumndef: any;
  ocuovkeyData: any;
  initialOcuovkeyData: any;
  @ViewChild('ocuovkeygrid', { static: true }) ocuovkeygrid: any;

  @ViewChild('dialog', { static: true }) dialog: DialogComponent;
  isDataUpdated: any;
  hideErd: boolean;
  constructor(
    public translateService: TranslateService
  ) { }
  ngOnInit() {
    this.loadColumnDefs();
    this.loadRowData();
  }

  loadColumnDefs() {
    this.ocuovkeyCoumndef = [
      { fieldName: this.translateService.translate('ocuovkey.datetype'), field: 'dateType', editable: false, datatype: 'text' },
      { fieldName: this.translateService.translate('ocuovkey.originaldate'), field: 'originalDate', editable: false, datatype: 'text' },
      { fieldName: this.translateService.translate('ocuovkey.override'), field: 'overrideDate', editable: true, datatype: 'date', cellEditable: this.canOverride },
      { fieldName: '', field: 'clearBtn', editable: true, datatype: 'hyperlink', onLaunchClick: this.onClearClick, isDisable: this.clearOverride, data: 'row', displayas: 'image', updateField: 'row', styleClass: 'ocuovkey-icon' },
      { field: 'key', datatype: 'text', hide: true },
    ];
  }

  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
     this.isDataUpdated =true;
    rowdata.validated = true;
    return rowdata;
  }

  loadRowData() {
    this.hideErd =this.dialog.data.hideErd
    if (this.dialog && this.dialog.data) {
      const ocuovkeyData: any = [];
      Object.keys(this.dialog.data).forEach(key => {
        if (this.hideErd && key === 'erd') {
          return; 
          
      }
        const keyDate = {};
        const dataTypeKeys = {
          'ped': 'Parole Eligibility Date',
          'erd': 'Earliest Release Date',
          'lrd': 'Latest Release Date',
          'red': 'Remission Eligibility Date'
        }
        Object.keys(dataTypeKeys).forEach(key1 => {
          if (key1 === key) {
            keyDate['dateType'] = dataTypeKeys[key1];
            keyDate['key'] = key;
            if (this.dialog.data['originalDates']) {
              keyDate['originalDate'] = this.dialog.data['originalDates'][key];
            }
            if (this.dialog.data['overrides']) {
              keyDate['overrideDate'] = this.dialog.data['overrides'][key];
              if (this.dialog.data['overrides'][key]) {
                keyDate['clearBtn'] = 'assets/images/delete-icon.png'
              }
            }
            ocuovkeyData.push(keyDate);
          }
        });
      })
      this.ocuovkeyData = ocuovkeyData;
      this.initialOcuovkeyData = JSON.parse(JSON.stringify(ocuovkeyData));
    } else {
      this.ocuovkeyData = [];
    }
  }
  save() {
    let returnObj = {};
    if (this.isDataUpdated) {
      this.ocuovkeyData.forEach(row => {
        if (['ped', 'lrd', 'erd','red'].includes(row['key'])) {
          if(row['overrideDate']) {
            returnObj[row['key']] = row['overrideDate'];
          } else {
            returnObj[row['key']] = '';
          }
        }
      })
    }
    this.dialog.close(JSON.parse(JSON.stringify(returnObj)));
  }

  onClearGrid = () => {
    this.isDataUpdated = false;
    this.ocuovkeyData = JSON.parse(JSON.stringify(this.initialOcuovkeyData));
    return true;
  }

  canOverride = (data: any, index: number, field: string): boolean => {
    if (this.dialog.data.sentenceType == 'CNCO') return true;
    if (this.dialog.data.sentenceType == 'CHLD') return false;
    if (data.key == 'ped') return true;
    if (!data.originalDate) return false;
    return true;
  }

  onClearClick = (event) => {
    if (event && event.overrideDate) {
      this.ocuovkeygrid.setColumnData('overrideDate', event.gridIndex, '');
      this.ocuovkeygrid.setColumnData('clearBtn', event.gridIndex, '');
    }
  }

  clearOverride = (data: any, index: number, field: string): boolean => {
    if (!data.overrideDate) return true;
    return false;
  }

  show(vldmsg, type?) {
    type = type ? type : 'warn';
    vldmsg = this.translateService.translate(vldmsg);
    const msgval = [{ message: vldmsg, type: type }];
    this.msgs = [...msgval];
  }

  close(): void {
    this.dialog.close(null);
  }
}

