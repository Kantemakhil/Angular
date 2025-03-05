import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { IEPLevelBean } from "@inst/visits-management/beans/ieplevelbean";
import { IEPLevelCommitBean } from '@inst/visits-management/beans/IepLevelCommitBean';
import { OimieplvService } from '@inst/visits-management/service/oimieplv.service';
import { DialogService } from '@core/ui-components/dialog/dialog.service';



@Component({
  selector: 'app-oimieplv',
  templateUrl: './oimieplv.component.html'
})

export class OimieplvComponent implements OnInit {

  msgs: any[] = [];
  iepColumnDef: any[];
  iepRowData: IEPLevelBean[] = [];
  enableInsertFirstGrid: boolean;
  disabled: boolean;
  tableIndex = -1;
  iepLevelInsertList: IEPLevelBean[] = [];
  iepLevelUpdateList: IEPLevelBean[] = [];
  iepLevelDeleteList: IEPLevelBean[] = [];
  iepCommitBean: IEPLevelCommitBean = new IEPLevelCommitBean();
  tempFalg: string;
  message = ' Invalid.';
  type = 'error';
  msglist = [];
  @ViewChild('grid', { static: true }) iepLevelGrid: any;
  duplicateFlag: boolean;
  deleteButton: boolean;
  checkIndex: number = -1;
  flag: boolean = false;
  resetGrid: boolean;

 constructor(public translateService: TranslateService, public oimieplvService: OimieplvService,public dialogService: DialogService) {
    this.iepColumnDef = [];
    this.iepRowData = [];

  }

  ngOnInit() {
    this.getProfileValue() 
    this.getAllIepLevelcodes();
    this.enableInsertFirstGrid = true;
    this.iepColumnDef = [

      {
        fieldName: this.translateService.translate('oimieplv.iepLevelCode'), datatype: 'text', field: 'iepLevelCode', cellEditable: this.canCellEdit,
        width: 150, required: true, maxlength: 12
      },
      {
        fieldName: this.translateService.translate('oimieplv.iepLeveldescription'), datatype: 'text', field: 'iepLeveldescription', editable: true,
        width: 150, required: true, maxlength: 40, uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('oimieplv.sequence'), datatype: 'number', field: 'sequence', editable: true,
        width: 150, whole: true,
      },
      {
        fieldName: this.translateService.translate('oimieplv.reviewDays'), datatype: 'number', field: 'reviewDays', editable: true,
        width: 150, required: true, whole: true,
      },
      {
        fieldName: this.translateService.translate('oimieplv.intakeIEP'), datatype: 'checkbox', field: 'intakeIpe', editable: true,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oimieplv.canteenLimit'), datatype: 'number', field: 'canteenLimit', editable: true,
        width: 150, whole: true,
      },
      {
        fieldName: this.translateService.translate('oimieplv.activeFlag'), datatype: 'checkbox', field: 'activeFlag', editable: true,
        width: 150
      },
      {
        fieldName: this.translateService.translate('oimieplv.expiryDate'), datatype: 'date', field: 'expiryDate', editable: false,
        width: 150
      }
    ];

  }

  show() {
    this.msglist = [];
    this.msglist.push({ message: this.message, type: this.type });
    this.msgs = [...this.msglist];
  }
  validateRowData = (event) => {
    const rowdata = new ValidateRowReturn();
    const index = event.rowIndex;
    rowdata.validated = true;
    if (event && event.field === 'activeFlag') {
       if (event.data.intakeIpe && !event.data.activeFlag) { 
         const data = {
                       label: this.translateService.translate('oimieplv.deactivatingintakeiep'), yesBtn: true,
                         yesLabel: 'Yes', noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
          if (result) {
        this.iepLevelGrid.setColumnData('intakeIpe', index, false);

           }
          else {
        this.iepLevelGrid.setColumnData('activeFlag', index, true);
           }
        });
      }

      (event.data.activeFlag) ? this.iepLevelGrid.setColumnData('expiryDate', index, null) :
        this.iepLevelGrid.setColumnData('expiryDate', index, DateFormat.getDate());
    }

    let count = 0;
    if (event && event.field === 'intakeIpe') {
       if (event.data.intakeIpe && !event.data.activeFlag) { 
         this.type = 'warn';
        this.message = this.translateService.translate('oimieplv.cannotgiveintakeforinactiveiep');
        this.show();
        this.iepLevelGrid.setColumnData('intakeIpe', index, false);
      }

      for (let i = 0; i < this.iepRowData.length; i++) {
        if (this.iepRowData[i].intakeIpe) {
          count = count + 1;
        }
      }
      if (count > 1) {
        this.iepLevelGrid.setColumnData('intakeIpe', event.rowIndex, false);
        this.type = 'warn';
        this.message = this.translateService.translate('oimieplv.onlyonedefaultiepshouldbechecked');
        this.show();
        rowdata.validated = true;
        return rowdata;
      }
    }
      return rowdata;
    }


    onGridReady = () => {
      return {
        activeFlag: true
      }
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
      if (!data.createDatetime) {
        return true;
      } else {
        return false;
      }
    }
    iepLevelSave(event) {
      this.duplicateFlag = true;
      this.iepRowData.forEach((element, index) => {
        this.iepRowData.forEach((element2, index2) => {
          if (element.iepLevelCode === element2.iepLevelCode && index !== index2) {
            this.type = 'warn';
            this.message = this.translateService.translate('oimieplv.iepLevelCodeShouldNotDuplicate');
            this.show();
            this.duplicateFlag = false;
            return;
          }

        });
      });
      if (this.duplicateFlag) {
        this.iepLevelInsertList = [];
        this.iepLevelUpdateList = [];
        this.iepLevelDeleteList = [];
        this.iepLevelInsertList = event.added;
        this.iepLevelUpdateList = event.updated;
        this.iepLevelDeleteList = event.removed;

        this.iepCommitBean.insertList = [];
        this.iepCommitBean.updateList = [];
        this.iepCommitBean.deleteList = [];


          if (this.iepLevelInsertList.length > 0) {
            for (let i = 0; i < this.iepLevelInsertList.length; i++) {
              if (!this.iepLevelInsertList[i].iepLevelCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimieplv.iepLevelCodeManditateField');
                this.show();
                return;
              }
              if (!this.iepLevelInsertList[i].iepLeveldescription) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimieplv.iepLeveldescriptionManditateField');
                this.show();
                return;
              }
             
              this.iepLevelInsertList[i].intakeIpe = (this.iepLevelInsertList[i].intakeIpe) ? 'Y' : 'N';
              this.iepLevelInsertList[i].activeFlag = (this.iepLevelInsertList[i].activeFlag) ? 'Y' : 'N';
              this.iepLevelInsertList[i].expiryDate = (this.iepLevelInsertList[i].activeFlag === undefined || this.iepLevelInsertList[i].activeFlag === 'N') ? DateFormat.getDate() : null;
            }
            this.iepCommitBean.insertList = this.iepLevelInsertList;
          }
          if (this.iepLevelUpdateList.length > 0) {
            for (let i = 0; i < this.iepLevelUpdateList.length; i++) {
              if (!this.iepLevelUpdateList[i].iepLevelCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimieplv.iepLevelCodeManditateField');
                this.show();
                return;
              }
              if (!this.iepLevelUpdateList[i].iepLeveldescription) {
                this.type = 'warn';
                this.message = this.translateService.translate('oimieplv.iepLeveldescriptionManditateField');
                this.show();
                return;
              }
              
              this.iepLevelUpdateList[i].intakeIpe = (this.iepLevelUpdateList[i].intakeIpe) ? 'Y' : 'N';
              this.iepLevelUpdateList[i].activeFlag = (this.iepLevelUpdateList[i].activeFlag) ? 'Y' : 'N';
              this.iepLevelUpdateList[i].expiryDate = (this.iepLevelUpdateList[i].activeFlag === undefined || this.iepLevelUpdateList[i].activeFlag === 'N') ? DateFormat.getDate() : null;
            }
            this.iepCommitBean.updateList = this.iepLevelUpdateList;
          }

          if (this.iepLevelDeleteList.length > 0) {
            this.iepCommitBean.deleteList = this.iepLevelDeleteList;
          }

          const obj = this.oimieplvService.iepLevelCommit(this.iepCommitBean);

          obj.subscribe(data => {
            if (data === 1) {
              this.type = 'success';
              this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
              this.show();
              this.getAllIepLevelcodes();
              return;
            } else if (data === 2) {
              this.type = 'error';
              this.message = this.translateService.translate('oimieplv.cannotInactive');
              this.show();
              this.getAllIepLevelcodes();
              return;
            }
            else if (data === 3) {
              this.type = 'error';
              this.message = this.translateService.translate('oimieplv.cannotDelete');
              this.show();
              this.getAllIepLevelcodes();
              return;
            }
            else {
              this.type = 'error';
              this.message = this.translateService.translate('common.addupdateremoverecordfailed');
              this.show();
              this.getAllIepLevelcodes();
              return;
            }
          });
        }
      }

      onGridClear = () => {
        this.duplicateFlag = false;
        this.getAllIepLevelcodes();
        return true;
      }

      getAllIepLevelcodes() {
        const obj = this.oimieplvService.getAllIepRecords();
        obj.subscribe(data => {
          if (data.length == 0) {
            this.deleteButton = false;
            this.iepRowData = [];
          }
          else {
            data.forEach(ele => {
              ele.activeFlag = (ele.activeFlag === 'Y') ? true : false;
              ele.intakeIpe = (ele.intakeIpe === 'Y') ? true : false;
            })
            this.iepRowData = data;
            this.deleteButton = true;
            this.tableIndex = 0;
          }
        });
      }


  onGridDelete = (event) => {
    if (event && event[event.length - 1].intakeIpe) {
      this.type = 'warn';
      this.message = this.translateService.translate('oimieplv.cannotdeletedefaultiep');
      this.show();
      return false;
    }
    return true;
  }

  getProfileValue() {
    const profileValue = this.oimieplvService.getSystemProfileValue();
    profileValue.subscribe(data => {
      this.iepColumnDef[3]['required'] = (data === 'Y' || data === 'y'? true : false)
      this.resetGrid = false;
      setTimeout(() => {
        this.resetGrid = true;
      }, 0);
    })
  }


    }


