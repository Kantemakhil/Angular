import { Component, OnInit, ViewChild } from '@angular/core';
import { OimallowService } from '../service/oimallow.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { Allowances } from '../beans/Allowances';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AllowancesCommitBean } from '../beans/AllowancesCommitBean';

@Component({
	selector: 'app-oimallow',
	templateUrl: './oimallow.component.html'
})

export class OimallowComponent implements OnInit {
    @ViewChild('grid') grid: any;
    
    msgs: any[] = [];
    type: any;
    message: any;
    allowancesColumnDef: any[];
    allowancesData: Allowances[] = [];
    allowanceIndex: number;
    enableInsert: boolean;
    duplicateFlag:boolean;
    allowancesInsertList: Allowances[] = [];
    allowancesUpdateList: Allowances[] = [];
    allowancesCommitModel: AllowancesCommitBean = new AllowancesCommitBean();
    allowanceType: string;
    allowancesModel: Allowances = new Allowances();


    constructor(private oimallowFactory: OimallowService, public translateService: TranslateService,
        private sessionManager: UserSessionManager) {
 
     }

    ngOnInit(): void {

        this.enableInsert = true;
        this.allowancesColumnDef = [
            {
                fieldName: this.translateService.translate('oimallow.allowancetype'), field: 'allowanceType', datatype: 'lov',
                domain: 'ALLOWANCE', cellEditable: this.canAllowanceEdit, width: 150, required: true
            },
            {
                fieldName: this.translateService.translate('oimallow.unit'), field: 'unit', datatype: 'lov',
                link: 'oimallow/getUnit', cellEditable: this.canAllowanceEdit, width: 150, required: true
            },
            {
                fieldName: this.translateService.translate('oimallow.maxunit'), datatype: 'number', field: 'maxUnit', editable: true,
                width: 150,  required: true, maxValue: '24', whole: true, minValue: '1', format: '1.2-2',
            },
            {
                fieldName: this.translateService.translate('oimallow.rate'), datatype: 'number', field: 'rate', editable: true,
                width: 150, required: true, whole: true,minValue: '0', format: '1.2-2', maxValue: 999999999.99
            },
            {
                fieldName: this.translateService.translate('oimallow.sunflag'), datatype: 'checkbox', field: 'sundayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.monflag'), datatype: 'checkbox', field: 'mondayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.tueflag'), datatype: 'checkbox', field: 'tuesdayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.wedflag'), datatype: 'checkbox', field: 'wednesdayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.thuflag'), datatype: 'checkbox', field: 'thursdayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.friflag'), datatype: 'checkbox', field: 'fridayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.satflag'), datatype: 'checkbox', field: 'saturdayFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.active'), datatype: 'checkbox', field: 'activeFlag', editable: true,
                width: 150
            },
            {
                fieldName: this.translateService.translate('oimallow.expirydate'), datatype: 'date', field: 'expiryDate', editable: false,
                width: 150
            },
        ];

        this.allowancesExecuteQuery()

    }
    
    
    saveAllowancesData(event) {

        this.duplicateFlag = true;
        this.allowancesData.forEach((element, index) => {
          this.allowancesData.forEach((element2, index2) => {
            if (element.allowanceType === element2.allowanceType && index !== index2) {
                this.show(this.translateService.translate('oimallow.allowancetypeshouldnotduplicate'), 'warn');
              this.duplicateFlag = false;
              return;
            }
          });
        });
        if (this.duplicateFlag) {
        this.allowancesInsertList = event.added
        this.allowancesUpdateList = event.updated

        this.allowancesCommitModel.insertList = [];
        this.allowancesCommitModel.updateList = [];

        if (this.allowancesInsertList.length > 0) {
            for (let i = 0; i < this.allowancesInsertList.length; i++) {
                this.allowancesInsertList[i].createDatetime = DateFormat.getDate();
                this.allowancesInsertList[i].activeFlag = this.allowancesInsertList[i].activeFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].sundayFlag = this.allowancesInsertList[i].sundayFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].mondayFlag = this.allowancesInsertList[i].mondayFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].tuesdayFlag = this.allowancesInsertList[i].tuesdayFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].wednesdayFlag = this.allowancesInsertList[i].wednesdayFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].thursdayFlag = this.allowancesInsertList[i].thursdayFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].fridayFlag = this.allowancesInsertList[i].fridayFlag ? 'Y' : 'N';
                this.allowancesInsertList[i].saturdayFlag = this.allowancesInsertList[i].saturdayFlag ? 'Y' : 'N';
                
            }
            this.allowancesCommitModel.insertList = this.allowancesInsertList;
        }
        if (this.allowancesUpdateList.length > 0) {

            for (let i = 0; i < this.allowancesUpdateList.length; i++) {
                this.allowancesUpdateList[i].modifyDatetime = DateFormat.getDate();
                this.allowancesUpdateList[i].activeFlag = this.allowancesUpdateList[i].activeFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].sundayFlag = this.allowancesUpdateList[i].sundayFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].mondayFlag = this.allowancesUpdateList[i].mondayFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].tuesdayFlag = this.allowancesUpdateList[i].tuesdayFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].wednesdayFlag = this.allowancesUpdateList[i].wednesdayFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].thursdayFlag = this.allowancesUpdateList[i].thursdayFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].fridayFlag = this.allowancesUpdateList[i].fridayFlag ? 'Y' : 'N';
                this.allowancesUpdateList[i].saturdayFlag = this.allowancesUpdateList[i].saturdayFlag ? 'Y' : 'N';
            }
            this.allowancesCommitModel.updateList = this.allowancesUpdateList;
        }

        const linkedOffSaveData = this.oimallowFactory.allowancesCommit(this.allowancesCommitModel);
        linkedOffSaveData.subscribe(data => {
            if (data === 1) {
                this.allowancesExecuteQuery();
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
        }
    }

    allowancesExecuteQuery() {
        const allowancesObj = this.oimallowFactory.allowancesExecuteQuery();
        allowancesObj.subscribe(data => {
            if (data.length === 0) {
                this.allowancesData = [];
                this.allowanceIndex = -1;
            } else {
                this.allowanceIndex = 0;
                this.allowancesData = data;
                this.allowancesModel = data[0];

                data.forEach(ele => {
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : false;
                    ele.sundayFlag = ele.sundayFlag === 'Y' ? true : false;
                    ele.mondayFlag = ele.mondayFlag === 'Y' ? true : false;
                    ele.tuesdayFlag = ele.tuesdayFlag === 'Y' ? true : false;
                    ele.wednesday = ele.wednesday === 'Y' ? true : false;
                    ele.thursdayFlag = ele.thursdayFlag === 'Y' ? true : false;
                    ele.fridayFlag = ele.fridayFlag === 'Y' ? true : false;
                    ele.saturdayFlag = ele.saturdayFlag === 'Y' ? true : false;
                });
            }
        });
    }

    validateRowData = (event) => {

        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    onGridInsert = () => {
        return { activeFlag: true };
    }

    canAllowanceEdit = (data: any, index: number, field: string): boolean => {
        if (!data.allowanceType || !data.unit) {
            return true;
        } else {
            return false;
        }
    }

    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
}