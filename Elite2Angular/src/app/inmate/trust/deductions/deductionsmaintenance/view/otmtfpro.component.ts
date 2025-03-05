import { Component, OnInit, ViewChild } from '@angular/core';


import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OtmtfproFmbBeanCommitBean } from '@inmate/trust/deductions/deductionsmaintenance/beans/OtmtfproFmbBeanCommitBean';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OtmtfproFmbBean } from '../beans/OtmtfproFmbBean';
import { OtmtfproService } from '../service/otmtfpro.service';

@Component({
    selector: 'app-otmtfpro',
    templateUrl: './otmtfpro.component.html'
})

export class OtmtfproComponent implements OnInit {
    index: number;
    @ViewChild('grid', { static: true }) grid: any;
    @ViewChild('firstGrid', { static: true }) firstGrid: any;
    isFirstLovCall = true;
    msgs: any[] = [];
    feeTypeLink = '';
    dedToLink = '';
    disbusLink = '';
    caseloadType: string;
    caseloadId: string;
    feeTypeTitles: {};
    dedToTitles: {};
    disbuTitles: {};
    mode = '';
    seldeductionData: OtmtfproFmbBean[] = [];
    cslddpModel: OtmtfproFmbBean = new OtmtfproFmbBean();
    cslddpData: OtmtfproFmbBean[] = [];
    cslddpInsertList: OtmtfproFmbBean[] = [];
    cslddpUpdatetList: OtmtfproFmbBean[] = [];
    cslddpDeleteList: OtmtfproFmbBean[] = [];
    cslddpCommitModel: OtmtfproFmbBeanCommitBean = new OtmtfproFmbBeanCommitBean();
    csldddData: any[] = [];
    csldddInsertList: OtmtfproFmbBean[] = [];
    csldddUpdatetList: OtmtfproFmbBean[] = [];
    isDynamicBinding: boolean;
    csldddDeleteList: OtmtfproFmbBean[] = [];
    csldddCommitModel: OtmtfproFmbBeanCommitBean = new OtmtfproFmbBeanCommitBean();
    csldDdColumnDef: any[];
    seldeductionColumnDef: any[];
    deleteDisable: boolean;
    seldeductionIndex: number;
    csldDdInsert: boolean;
    isDeleteEnable: boolean;
    expiryFlag: boolean;
    constructor(private otmtfproFactory: OtmtfproService,
        private sessionManager: UserSessionManager,
        private translateService: TranslateService,
        private dialogService: DialogService) {
    }
    ngOnInit() {
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.otmtfproexecuteQuery();
        this.csldDdInsert = false;
        this.isDeleteEnable = false;
        this.feeTypeLink = `otmtfpro/cgfkCsldDpDeductionTypeRecordGroup?caseloadType=${this.caseloadType}`;
        this.dedToLink = `otmtfpro/cgfkCsldDpAccountCodeRecordGroup?caseloadType=${this.caseloadType}`;
        this.disbusLink = `otmtfpro/cgfkCsldDdReceiptTxnTypeRecordGroup?caseloadType=${this.caseloadType}`;
        this.feeTypeTitles = { code: this.trMsg('Transaction Fee Type'), description: this.trMsg('Deduction Desc') };
        this.dedToTitles = { code: this.trMsg('Credit Deduction To'), description: this.trMsg('Account Name') };
        this.disbuTitles = { description: 'Description' };


        this.csldDdColumnDef = [
            {
                fieldName: this.trMsg('otmtfpro.dedondistpe', '*'), field: 'csldDdreceiptTxnType', editable: true, width: 150,
                datatype: 'lov', link: this.disbusLink, titles: this.disbuTitles, cellEditable: this.canGridEdit ,source:'OCMTRANS'
            },
            {
                fieldName: this.trMsg('otmtfpro.perc'), field: 'csldDdpercentage', cellEditable: this.canGridEdit,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, editable: true
            },
            {
                fieldName: this.trMsg('otmtfpro.fltrte'), field: 'csldDdflatRate', cellEditable: this.canGridEdit,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, editable: true
            },
        ];

        this.seldeductionColumnDef = [
            {
                fieldName: this.trMsg('otmtfpro.trnsfetpe'), field: 'csldDpdeductionType', required: true, editable: true, width: 150,
                datatype: 'lov', link: this.feeTypeLink,source:'OCMDEDUT'
            },
            {
                fieldName: this.trMsg('otmtfpro.crdtdedto'), field: 'csldDpaccountCode2', required: true, editable: true, width: 150,
                datatype: 'lov', link: this.dedToLink,source:'OCMCOACT'
            },
            {
                fieldName: this.trMsg('otmtfpro.effec'), field: 'csldDpeffectiveDate', required: true, editable: true, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.trMsg('common.active'), field: 'csldDpactiveFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.trMsg('otmtfpro.expry'), field: 'csldDpexpiryDate', editable: false, width: 150,
                datatype: 'date'
            },
            {
                fieldName: this.trMsg('otmtfpro.fralofndr'), field: 'csldDpfoAlAllOffenderFlag', editable: true, width: 150,
                datatype: 'checkbox'
            },
            {
                fieldName: this.trMsg('otmtfpro.clrpyblto'), field: 'csldDppayeeCorporateId', editable: false, datatype: 'number',
            },
            {
                fieldName: '', field: 'button', datatype: 'launchbutton', editable: true, width: 100, data: 'row', updateField: 'row',
                modal: true, dialogWidth: 70, onLaunchClick: this.staffNameLaunch
            },
            {
                fieldName: "", field: 'csldDpdspCorporateName', editable: false, datatype: 'text', width: 150,whole:true
            },
        ]

    }

    /**
      * This function displays the messages
      */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    allowNumbers(event) {
    }
    onRowClickcslddd(event) {
    }
    gridValidations1(event) {
        const validation = { isValid: true };
        event.forEach(ele => {
            if (!ele.csldDpdeductionType) {
                this.show('otmtfpro.trnstypmstbeente');
                return false;
            }
            if (!ele.csldDpaccountCode2) {
                this.show('otmtfpro.crdtdedtomstbeentr');
                return false;
            }
            if (!ele.csldDpeffectiveDate) {
                this.show('otmtfpro.eftedtemstbeentr');
                return false;
            }
        });
        return validation.isValid;
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    otmtfproPopulateDetails() {
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmtfproSavecslddpForm(event) {
        this.cslddpInsertList = event.added;
        this.cslddpUpdatetList = event.updated;
        this.cslddpDeleteList = event.removed;
        this.cslddpCommitModel.insertList = [];
        this.cslddpCommitModel.updateList = [];
        this.cslddpCommitModel.deleteList = [];

        if (this.cslddpInsertList.length > 0) {
            for (let i = 0; i < this.cslddpInsertList.length; i++) {
                this.cslddpInsertList[i].csldDpcaseloadId = this.caseloadId;
                this.cslddpInsertList[i].csldDpfoAlAllOffenderFlag = this.cslddpInsertList[i].csldDpfoAlAllOffenderFlag ? 'Y' : 'N';
                this.cslddpInsertList[i].csldDpaccountCode = Number(this.cslddpInsertList[i].csldDpaccountCode2);

                if (this.cslddpInsertList[i].csldDpeffectiveDate&&(DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].csldDpeffectiveDate), DateFormat.getDate()) === -1)) {
                    this.show(this.translateService.translate('otmtfpro.warndateenteredmustbegreaterorequaltothecurrentdate'));
                    return;
                }
                if (this.cslddpInsertList[i].csldDpexpiryDate && this.cslddpInsertList[i].csldDpeffectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpInsertList[i].csldDpeffectiveDate), DateFormat.getDate(this.cslddpInsertList[i].csldDpexpiryDate)) === 1) {
                    this.show('common.effectieexpirydatevalidation');
                    return false;
                }
                if (this.cslddpInsertList[i].csldDpactiveFlag) {
                    this.cslddpInsertList[i].csldDpactiveFlag = 'Y';
              } else {
                    this.cslddpInsertList[i].csldDpactiveFlag = 'N';
              }
            }
        }
        if (this.cslddpUpdatetList.length > 0) {
            for (let i = 0; i < this.cslddpUpdatetList.length; i++) {
                if (this.expiryFlag) {
                    this.show(this.translateService.translate('otmtfpro.warndateenteredmustbegreaterorequaltothecurrentdate'));
                    return;
                }
                if (this.cslddpUpdatetList[i].csldDpexpiryDate && this.cslddpUpdatetList[i].csldDpeffectiveDate && DateFormat.compareDate(DateFormat.getDate(this.cslddpUpdatetList[i].csldDpeffectiveDate), DateFormat.getDate(this.cslddpUpdatetList[i].csldDpexpiryDate)) === 1) {
                    this.show('common.effectieexpirydatevalidation');
                    return false;
                }
                if (this.cslddpUpdatetList[i].csldDpactiveFlag) {
                    this.cslddpUpdatetList[i].csldDpactiveFlag = 'Y';
              } else {
                    this.cslddpUpdatetList[i].csldDpactiveFlag = 'N';
              }
              if( this.cslddpUpdatetList[i].csldDpfoAlAllOffenderFlag){
                this.cslddpUpdatetList[i].csldDpfoAlAllOffenderFlag ='Y'
              }else{
                this.cslddpUpdatetList[i].csldDpfoAlAllOffenderFlag ='N'
              }
                
            }
        }
        this.cslddpCommitModel.insertList = this.cslddpInsertList;
        this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
        this.cslddpCommitModel.deleteList = this.cslddpDeleteList;

        const cslddpSaveData = this.otmtfproFactory.csldDpCommit(this.cslddpCommitModel);
        cslddpSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            }
            else if (data === 2) {
                this.show('otmtfpro.rwardyexst', 'warn');
            } else {
                if (event.added.length === 0 && event.updated.length === 0 && event.removed.length > 0) {
                    this.show('otmtfpro.unabltodelte', 'error');
                } else {
                    this.show('common.addupdateremoverecordfailed', 'error');
                }
            }
            this.otmtfproexecuteQuery(true);
        });
    }
    // execute query
    otmtfproexecuteQuery(afterCommit?) {
        this.index = 0;
        const reqData = {
            csldDpcaseloadId: this.caseloadId
        }
        this.otmtfproFactory.csldDpExecuteQuery(reqData).subscribe(resData => {
            if (resData && resData.length > 0) {
                resData.forEach(ele => {
                    ele.isSaved = true;
                    ele.csldDpactiveFlag = ele.csldDpactiveFlag !== 'Y' ? null : ele.csldDpactiveFlag;
                    ele.csldDpfoAlAllOffenderFlag = ele.csldDpfoAlAllOffenderFlag !== 'Y' ? null : ele.csldDpfoAlAllOffenderFlag;
                    ele['button'] = '...';
                });
                this.seldeductionData = resData;
                this.isDynamicBinding = true;
                this.deleteDisable = false;
                if (afterCommit) {
                    const selectedData = this.cslddpData.filter(ele => {
                        return ele.csldDpdeductionType === this.cslddpModel.csldDpdeductionType;
                    });
                    if (selectedData && selectedData.length > 0) {
                        this.index = this.cslddpData.indexOf(selectedData[0]);
                    }
                }
                this.cslddpModel = this.cslddpData[this.index];
                this.csldddExecuteQuery(this.cslddpModel);
                this.seldeductionIndex = 0;
            } else {
                this.deleteDisable = true;
                this.cslddpData = [];
                this.cslddpModel = new OtmtfproFmbBean();
                this.seldeductionData = [];
                this.show('common.querycaused');

            }
        });
    }

    staffNameLaunch = (event) => {
        if (event) {
            this.dialogService.openLinkDialog('/OTUCPAYE', 80).subscribe(result => {
                const index = this.seldeductionData.indexOf(event);
                this.firstGrid.setColumnData('csldDppayeeCorporateId', index, result.corporateId);
                this.firstGrid.setColumnData('csldDpdspCorporateName', index, result.corpName);
            });
        }
    }
    onRowClickseldeduction(event) {
        if (event && event.createUserId) {
            this.isDeleteEnable = true;
            this.cslddpModel = new OtmtfproFmbBean();
            if (event && event.csldDpcaseloadId && event.csldDpdeductionType) {
                this.cslddpModel = event;
                if (this.cslddpModel.csldDpdeductionType) {
                    this.csldDdInsert = true;
                }
                this.csldddExecuteQuery(this.cslddpModel);
            } else {
                this.cslddpData = [];
            }
        } else {
            this.isDeleteEnable = false;
            this.csldDdInsert = false;
            this.csldddData = [];
        }
    }

    /*
    * This function converts the given date from MM/dd/yyyy to
    * yyyy/MM/dd format, If input data is not as expected
    * format then it will return input value
    */

    csldddExecuteQuery(event) {
        const reqData = { csldDddeductionType: event.csldDpdeductionType, csldDdcaseloadId: this.caseloadId };
        const csldddResult = this.otmtfproFactory.
            csldDdExecuteQuery(reqData);
        csldddResult.subscribe(csldddResultList => {
            if (csldddResultList.length === 0) {
                this.csldddData = [];
            } else {
                this.csldddData = csldddResultList;
            }
        });
    }
    canGridEdit = (data: any, index: number, field: string): boolean => {
        if (field === 'csldDdreceiptTxnType') {
            if (data.csldDdmodifyDate) {
                return false;
            } else {
                return true;
            }
        } return true;
    }

    isDuplicate() {
        const rowData = this.csldddData;
        const validation = { isValid: true };
        rowData.forEach(ele => {
            const repeat = rowData.filter(dup => ele.csldDdreceiptTxnType === dup.csldDdreceiptTxnType);
            if (repeat && repeat.length > 1) {
                const msg = this.trMsg('otmtfpro.disbursalrdyexst').replace('%csldDdreceiptTxnType%', ele.csldDdreceiptTxnType)
                    .replace('%csldDpdeductionType%', this.cslddpModel.csldDpdeductionType).replace('%caseloadId%', this.caseloadId);
                this.show(msg);
                validation.isValid = false;
                return;
            }
        });
        return validation.isValid;
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otmtfproSavecsldddForm(event) {
        if (!this.gridValidations(this.csldddData)) {
            return null;
        }
        this.csldddInsertList = event.added;
        this.csldddUpdatetList = event.updated;
        this.csldddDeleteList = event.removed;
        this.csldddCommitModel.insertList = [];
        this.csldddCommitModel.updateList = [];
        this.csldddCommitModel.deleteList = [];
        if (this.csldddInsertList) {
            this.csldddInsertList.forEach(ele => {
                ele.csldDdcaseloadId = this.caseloadId;
                ele.csldDddeductionType = this.cslddpModel.csldDpdeductionType;
            });
        }
        this.csldddCommitModel.insertList = this.csldddInsertList;
        this.csldddCommitModel.updateList = this.csldddUpdatetList;
        this.csldddCommitModel.deleteList = this.csldddDeleteList;

        const csldddSaveData = this.otmtfproFactory.csldDdCommit(this.csldddCommitModel);
        csldddSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
            this.csldddExecuteQuery(this.cslddpModel);
        });
    }

    entryValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        if (event.field === 'csldDdreceiptTxnType' && event.newValue) {
            this.isDuplicate();
        }
        if (event.field === 'csldDdpercentage' && event.newValue &&
            (Number(event.newValue) < 0 || Number(event.newValue) > 100)) {
            this.show('otmtfpro.mstbeinrange');
            this.grid.setColumnData('csldddData', index, null);
        }
        const fields = ['csldDdpercentage', 'csldDdflatRate'];
        if (fields.includes(event.field) && event.newValue && (event.data && event.data.csldDdpercentage && event.data.csldDdflatRate)) {
            this.show('otmtfpro.nlypercrfltrte');
        }

        rowdata.validated = true;
        return rowdata;
    }

    isNull = (value) => {
        return !(!!value || String(value) === '0');
    }

    gridValidations(data: any[]) {
        const validation = { isValid: true };
        data.forEach(ele => {
            if (!ele.csldDdreceiptTxnType) {
                this.show('otmtfpro.dedondistyeenter');
                validation.isValid = false;
                return;
            }
            if (!this.isDuplicate()) {
                validation.isValid = false;
                return;
            }

            if (ele.csldDdpercentage && (ele.csldDdpercentage < 0 || Number(ele.csldDdpercentage) > 100)) {
                this.show('otmtfpro.mstbeinrange');
                validation.isValid = false;
                return;
            }
            if (!this.isNull(ele.csldDdpercentage) && !this.isNull(ele.csldDdflatRate)) {
                this.show('otmtfpro.nlypercrfltrte');
                validation.isValid = false;
                return;
            }
            if (this.isNull(ele.csldDdpercentage) && this.isNull(ele.csldDdflatRate)) {
                this.show('otmtfpro.etrprenorfltrte');
                validation.isValid = false;
                return;
            }
        });
        return validation.isValid;
    }

    set dspCorporateName(value: string) {

    }

    onGridInsert = () => {
        if (!this.cslddpModel['isSaved']) {
            this.show('otmtfpro.ucntcrtwoprnt');
            return null;
        }
        if (!this.gridValidations(this.csldddData)) {
            return null;
        } else {
            return {};
        }
    }
    validateRowDataFirstGrid = (event) => {
        const rowdata = new ValidateRowReturn();
        this.expiryFlag=false;
        rowdata.validated = true;
        const index = event.rowIndex;
        if (event.field === 'csldDpdeductionType') {
            this.isDuplicateFirstGrid();
        }
        if (event.field === 'csldDpeffectiveDate' && event.data.csldDpeffectiveDate) {
            if (DateFormat.compareDate(event.data.csldDpeffectiveDate, DateFormat.getDate()) === -1) {
                this.expiryFlag=true;
                this.show(this.translateService.translate('otmtfpro.warndateenteredmustbegreaterorequaltothecurrentdate'));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'csldDpactiveFlag') {
            if (event.data.csldDpactiveFlag) {
                this.firstGrid.setColumnData('csldDpexpiryDate', index, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.csldDpactiveFlag) {
                this.firstGrid.setColumnData('csldDpexpiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (event.field === 'csldDpexpiryDate') {
            if (DateFormat.compareDate(DateFormat.getDate(event.data.csldDpeffectiveDate), DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0))) === 1) {
                this.show(`common.effectieexpirydatevalidation`);
            }
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    onGridReady = () => {
        this.csldDdInsert = false;
        return {
            button: '...', csldDpactiveFlag: true
        };
    }
    onGridClear = () => {
        this.otmtfproexecuteQuery();
        return true;
    }
    isDuplicateFirstGrid() {
        const rowData = this.seldeductionData;
        const validation = { isValid: true };
        rowData.forEach(ele => {
            const repeat = rowData.filter(dup => ele.csldDpdeductionType === dup.csldDpdeductionType);
            if (repeat && repeat.length > 1) {
                this.show('otmtfpro.rwardyexst');
                validation.isValid = false;
                return;
            }
        });
        return validation.isValid;
    }
    onGridDelete = () => {
        if (this.csldddData && this.csldddData.length > 0) {
            this.show(this.translateService.translate('otmtfpro.deleteValidation'));
            return;
        }
        return true;
    }
}
