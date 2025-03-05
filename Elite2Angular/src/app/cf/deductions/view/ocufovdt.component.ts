import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OcufovdtService } from '../service/ocufovdt.service';
import { FeeOverrideDetails } from '../beans/FeeOverrideDetails';
import { FeeOverrideDetailsCommitBean } from '../beans/FeeOverrideDetailsCommitBean';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { FeeAccountProfiles } from '../beans/FeeAccountProfiles';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { AmountFormatUtil } from '@common/utility/amountFormatUtil';

@Component({
    selector: 'app-ocufovdt',
    templateUrl: './ocufovdt.component.html'
})

export class OcufovdtComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('fodGrid', { static: true }) fodGrid: any;
    msgs: any[] = [];
    feeOverdDetColumnDef: any[] = [];
    fodData: FeeOverrideDetails[] = [];
    fodDataTemp: FeeOverrideDetails[] = [];
    fodInsertList: FeeOverrideDetails[] = [];
    fodUpdateList: FeeOverrideDetails[] = [];
    fodDeleteList: FeeOverrideDetails[] = [];
    fodModel: FeeOverrideDetails = new FeeOverrideDetails();
    fodCommitModel: FeeOverrideDetailsCommitBean = new FeeOverrideDetailsCommitBean();
    fodIndex: number;
    feeActProfiles: FeeAccountProfiles = new FeeAccountProfiles();
    feeActProfInput: FeeAccountProfiles = new FeeAccountProfiles();
    systemProfModel: SystemProfiles = new SystemProfiles();
    insertFodGridData: boolean;
    //deleteFodGridData: boolean;
    addedByName: any;
    insertAllowedTrue: boolean;
    billEndDay: number;
    billingCycleEndDate: Date;
    billingCycleStartDate: Date;

    constructor(private ocufovdtFactory: OcufovdtService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService, private amountFormat: AmountFormatUtil) {

    }
    ngOnInit() {
        //this.deleteFodGridData = false;
        this.insertAllowedTrue = true;
        this.feeOverdDetColumnDef = [];
        this.feeOverdDetColumnDef = [
            {
                fieldName: this.translateService.translate('ocufovdt.overridetype'), field: 'overrideType', editable: true,
                datatype: 'lov', width: 150, domain: 'CF_FOV_TYP', cellEditable: this.canAlertEditOvrrydeType
            },
            {
                fieldName: this.translateService.translate('ocufovdt.overridestartdate'), datatype: 'date',
                field: 'overrideStartDate', editable: true, width: 150, cellEditable: this.canAlertEdit
            },

            {
                fieldName: this.translateService.translate('ocufovdt.overrideenddate'), field: 'overrideEndDate', datatype: 'date',
                editable: true, width: 150, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('ocufovdt.priorityindicator'), field: 'priorityIndicator', editable: true,
                datatype: 'number', maxValue: '999', whole: true, minValue: '0', cellEditable: this.canAlertEditPriorityInd
            },
            {
                fieldName: this.translateService.translate('ocufovdt.overrideamount'), field: 'overrideAmount', editable: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, rightAlign: true,strictFP: true, whole: true, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('common.comments'), field: 'commentText', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', cellEditable: this.canAlertEdit, maxlength: 240
            },
            {
                fieldName: this.translateService.translate('ocufovdt.addedby'), field: 'addedBy',
                datatype: 'text', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('common.date'), field: 'addedDate', editable: false,
                datatype: 'date', width: 150
            },
        ];

        this.feeActProfInput.feeCode = this.dialog.data.feeCode;
        this.feeActProfInput.frequencyCode = this.dialog.data.frequencyCode;
        this.feeActProfInput.caseloadId = this.dialog.data.caseloadId;
        this.feeActProfiles.amount = this.dialog.data.amount;

        this.getBillEndDayProfValue();
        this.sysPflExecuteQuery();
        this.getAddedByName();
        this.feeActExecuteQuery();
        this.feeOverdDetExecuteQuery();
    }

    canAlertEditOvrrydeType = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime && this.insertAllowedTrue) {
            if (data && data.overrideEndDate) {
                if (DateFormat.compareDateTime(DateFormat.getDate()
                    , DateFormat.getDate(data.overrideEndDate)) === -1) {
                    return true;
                } else {
                    return false;
                }
            }
        } else if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }

    }

    
    canAlertEditPriorityInd = (data: any, index: number, field: string): boolean => {
        if (data.overrideType && data.overrideType === 'CRT' && data.billGeneratedFlag !=='Y') {
            return true;
        } else {
            return false;
        }

    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime && this.insertAllowedTrue && data.billGeneratedFlag !== 'Y') {
            return true;
        } else if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }

    }

    getAddedByName() {
        this.ocufovdtFactory.getAddedByName().subscribe(data => {
            this.addedByName = data;

        });
    }
    sysPflExecuteQuery() {
        this.ocufovdtFactory.sysPflExecuteQuery().subscribe(data => {
            if (data > 0) {
                if (this.dialog.data.feeActStatus !== 'S' && this.dialog.data.feeActStatus !== 'C' && this.dialog.data.isInsertEnable !== 'N') {
                    this.insertFodGridData = true;
                    this.insertAllowedTrue = true;

                } else {
                    this.insertFodGridData = false;
                    this.insertAllowedTrue = false;
                }
            } else {
                this.insertAllowedTrue = false;
            }

        });
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    isNull(value) {
        return value === null || value === undefined || value === '';
    }

    onRowClickFod(event) {
        if (event) {
            this.fodModel = event;
            // if (this.fodModel.createDatetime && this.insertAllowedTrue) {
            //     this.deleteFodGridData = true;
            // } else {
            //     this.deleteFodGridData = false;
            // }


            if (event.overrideType && event.overrideType == 'CRT') {
                this.fodGrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['overrideEndDate'].includes(obj.colId)) {
                        obj.colDef.headerClass = 'header-col';
                        this.fodGrid.gridApi.refreshHeader();
                    }
                });
            } else {
                this.fodGrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['overrideEndDate'].includes(obj.colId)) {
                        obj.colDef.headerClass = '';
                        this.fodGrid.gridApi.refreshHeader();
                    }
                });
            }
        }
    }

    feeActExecuteQuery() {
        const result = this.ocufovdtFactory.feeActExecuteQuery(this.feeActProfInput);
        result.subscribe(data => {
            if (data.length === 0) {
                this.feeActProfiles = new FeeAccountProfiles();
            } else {
                this.feeActProfiles = data;

                this.feeActProfiles.amountString =  String(this.amountFormat.amountFormat(this.dialog.data.amount));
                //  this.feeActProfiles.amount = this.dialog.data.amount;
                this.feeActProfiles.effectiveDate = this.dialog.data.effectiveDate;
                this.feeActProfiles.statusEffectiveDate = this.dialog.data.statusEffectiveDate;
                this.feeActProfiles.expiryDate = this.dialog.data.expiryDate;
                this.feeActProfiles.nonBillableStatus = this.dialog.data.nonBillableStatus;
                this.feeActProfiles.startDate = this.dialog.data.startDate;
                this.feeActProfiles.frequencyCode = this.dialog.data.frequencyCode;
                this.feeActProfiles.frequencyType = this.dialog.data.frequencyType;
            }
        });
    }

    feeOverdDetExecuteQuery() {
        this.fodModel.offenderFeeId = this.dialog.data.offenderFeeId;
        const result = this.ocufovdtFactory.feeOverdDetExecuteQuery(this.fodModel);
        result.subscribe(data => {
            if (data.length === 0) {
                this.fodData = [];
            } else {
                this.fodData = data;
                this.fodData.forEach(element => {
                    element.overrideTypeDb = element.overrideType;
                    });
                this.fodModel = data[0];
                this.fodIndex = 0;
            }
        });
    }

    onFodInsert = () => {
        this.fodModel = new FeeOverrideDetails();
        return { addedBy: this.addedByName, addedDate: DateFormat.getDate() };
    }

    onFodDelete = () => {
        return true;
    }

    onFodClear = () => {
        this.feeOverdDetExecuteQuery();
        return true;
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = this.fodData.indexOf(event.data);
        if (event.field === 'overrideStartDate') {
            if (event.data.overrideStartDate) {
                if (event.data.overrideType === 'CTY') {
                    this.oicOfnCheckoverLapping(event.data);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            rowdata.validated = true;
            return rowdata;
        }


        if (event.field === 'overrideType') {
            if (event.data.overrideType && event.data.overrideType == 'CRT') {
                this.fodGrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['overrideEndDate'].includes(obj.colId)) {
                        obj.colDef.headerClass = 'header-col';
                        this.fodGrid.gridApi.refreshHeader();
                    }
                });
            } else {
                this.fodGrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['overrideEndDate'].includes(obj.colId)) {
                        obj.colDef.headerClass = '';
                        this.fodGrid.gridApi.refreshHeader();
                    }
                });
            }
            if (event.data.overrideType && event.data.overrideType == 'CTY') {
                this.fodGrid.setColumnData('priorityIndicator', rowIndex, undefined);
                rowdata.validated = true;
                 return rowdata;
            }
            
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    oicOfnCheckoverLapping(object) {
        object.feeId = this.dialog.data.feeId;
        const serviceObj = this.ocufovdtFactory.feeOverCheckoverLapping(object);
        serviceObj.subscribe(data => {

            if (data && this.fodModel.overrideStartDate && data.overrideEndDate) {
                if (DateFormat.compareDateTime(DateFormat.getDate(this.fodModel.overrideStartDate)
                    , DateFormat.getDate(data.overrideEndDate)) === 1) {
                    this.show('ocufovdt.countyfeeoverlapmessage', 'warn');
                    return;
                }
            }

        })
    }


    validateFod() {
        this.fodDataTemp = [];
        this.fodGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.fodDataTemp.push(v);
            }
        );
        this.fodGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.fodDataTemp.push(v);
            }
        );
        const isvalid = { valid: true };
        if (this.fodDataTemp && Array.isArray(this.fodDataTemp)) {
            this.fodDataTemp.forEach(ele => {
                if (this.isNull(ele.overrideType)) {
                    this.show('ocufovdt.overridetypemustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.overrideStartDate)) {
                    this.show('ocufovdt.overridestartdatemustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (ele.overrideType === 'CRT' && this.isNull(ele.overrideEndDate)) {
                    this.show('ocufovdt.overridenddatemandatory');
                    isvalid.valid = false;
                    return;
                }
               /*  if ( ele.overrideEndDate && DateFormat.compareDateTime(DateFormat.getDate(ele.overrideEndDate), DateFormat.getDate()) === -1) {
                    this.show('ocufovdt.greaterthancurrentdate');
                    isvalid.valid = false;
                    return;
                } */
                
                if (this.isNull(ele.overrideAmount)) {
                    this.show('ocufovdt.overrideamountmustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (ele.overrideStartDate && ele.overrideEndDate && DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate), DateFormat.getDate(ele.overrideStartDate)) === -1) {
                    this.show('ocufovdt.overridestartdatemustbeearlierthanorequaltooverrideenddate');
                    isvalid.valid = false;
                    return;
                }
                if ( ele.overrideStartDate && this.feeActProfiles.effectiveDate && this.feeActProfiles.nonBillableStatus === 'Y' && DateFormat.compareDate(DateFormat.getDate(ele.overrideStartDate),
                     DateFormat.getDate(this.feeActProfiles.effectiveDate)) === -1) {
                    this.show('ocufovdt.overridestartdatecannotbeearlierthaneffectivedate');
                    isvalid.valid = false;
                    return;
                }

                if ( ele.overrideStartDate && this.feeActProfiles.startDate && this.feeActProfiles.nonBillableStatus === 'N' && DateFormat.compareDate(DateFormat.getDate(ele.overrideStartDate),
                     DateFormat.getDate(this.feeActProfiles.startDate)) === -1) {
                    this.show('ocufovdt.overridestartdatecannotbeearlierthanstartDate');
                    isvalid.valid = false;
                    return;
                }
                if ( ele.overrideStartDate && this.feeActProfiles.expiryDate && DateFormat.compareDate(DateFormat.getDate(ele.overrideStartDate),
                     DateFormat.getDate(this.feeActProfiles.expiryDate)) === 1) {
                    this.show('ocufovdt.startdatelessthanexpirydatefees');
                    isvalid.valid = false;
                    return;
                }
                if ( ele.overrideEndDate && ele.overrideStartDate && (DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate), DateFormat.getDate(ele.overrideStartDate)) <= 0) && this.feeActProfiles.frequencyType !=='ONE') {
                    this.show('ocufovdt.overrideenddatemustbeafteroverridestartdate');
                    isvalid.valid = false;
                    return;
                }

                if ( ele.overrideEndDate && ele.overrideStartDate && (DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate), DateFormat.getDate(ele.overrideStartDate)) !== 0) && this.feeActProfiles.frequencyType ==='ONE') {
                    this.show('ocufovdt.overrideendstartdatemussamenew');
                    isvalid.valid = false;
                    return;
                }

                if ( ele.overrideEndDate && this.feeActProfiles.expiryDate && DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate), DateFormat.getDate(this.feeActProfiles.expiryDate)) === 1) {
                    this.show('ocufovdt.lessthanexpirydatefees');
                    isvalid.valid = false;
                    return;
                }

                if( ele.overrideEndDate && DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate),DateFormat.getDate()) < 0 ){
                    if(!(DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate),DateFormat.getDate(this.billingCycleStartDate)) >= 0 && 
                     DateFormat.compareDate(DateFormat.getDate(ele.overrideEndDate),DateFormat.getDate(this.billingCycleEndDate)) <= 0)){
                        this.show('ocufovdt.billenddatewithincurrentbillingcycle');
                        isvalid.valid = false;
                        return;
                     }
                }
            });

        }
        return isvalid.valid;
    }

    validateOverlapDateRanges() {
        const isvalid = { valid: true };
        if (this.fodInsertList.length > 0 || this.fodUpdateList.length > 0) {
            for (let j = 0; j < this.fodData.length; j++) {
                const rowIndex = this.fodData.indexOf(this.fodData[j]);
                const ele = this.fodData[j];
                for (let i = 0; i < this.fodData.length; i++) {
                    if (rowIndex != i && ele.overrideType === 'CTY'  && this.fodData[i].overrideType === 'CTY') {
                            if(this.courtFeeDateOverlap(ele.overrideStartDate, ele.overrideEndDate, this.fodData[i].overrideStartDate, this.fodData[i].overrideEndDate)){

                                this.show('ocufovdt.countyfeeoverlapmessage');
                                isvalid.valid = false;
                                return;
                            }
                    }
                    if (rowIndex != i && ele.overrideType === 'CRT' && this.fodData[i].overrideType === 'CRT') {
                        if (this.courtFeeDateOverlap(ele.overrideStartDate, ele.overrideEndDate, this.fodData[i].overrideStartDate, this.fodData[i].overrideEndDate)) {
                            if (!ele.priorityIndicator || !this.fodData[i].priorityIndicator) {
                                this.show('ocufovdt.pleaseenterbillingpriority');
                                isvalid.valid = false;
                                return;
                            } else if (Number(ele.priorityIndicator) === Number(this.fodData[i].priorityIndicator)) {
                                this.show('ocufovdt.pleasesetdifferentpriorityindicator');
                                isvalid.valid = false;
                                return;
                            }
                        }
                    }

                    if (rowIndex != i && ele.overrideType === 'CTY' && this.fodData[i].overrideType === 'CRT') {
                        if(this.courtFeeDateOverlap(ele.overrideStartDate, ele.overrideEndDate, this.fodData[i].overrideStartDate, this.fodData[i].overrideEndDate)){
                            this.show('ocufovdt.countyandcourtoverlapmessages');
                            isvalid.valid = false;
                            return;
                        }
                    }

                    if (rowIndex != i && ele.overrideType === 'CRT' && this.fodData[i].overrideType === 'CTY') {
                        if(this.courtFeeDateOverlap(ele.overrideStartDate, ele.overrideEndDate, this.fodData[i].overrideStartDate, this.fodData[i].overrideEndDate)){
                            this.show('ocufovdt.countyandcourtoverlapmessages');
                            isvalid.valid = false;
                            return;
                        }
                    }
                }
            }

        }
        return isvalid.valid;
    }


    savePopupData(event){
        this.fodInsertList = event.added;
        this.fodUpdateList = event.updated;
        this.fodDeleteList = event.removed;
        this.fodCommitModel.insertList = [];
        this.fodCommitModel.updateList = [];
        this.fodCommitModel.deleteList = [];
        if (!this.validateFod()) {
            return;
        }
        if (!this.validateOverlapDateRanges()) {
            return;
        }    
        if (this.fodInsertList.length > 0) {
            this.fodInsertList.forEach(ele => {
                ele.createDatetime = DateFormat.getDate();
                ele.modifyDatetime = DateFormat.getDate();
                ele.createUserId = this.sessionManager.getId();
                ele.modifyUserId = this.sessionManager.getId();
                ele.overrideAmount = Number(ele.overrideAmount);
                ele.offenderFeeId = this.dialog.data.offenderFeeId;
            });
            this.fodCommitModel.insertList = this.fodInsertList;
        }
        if (this.fodUpdateList.length > 0) {
            this.fodUpdateList.forEach(ele => {
                ele.createDatetime = DateFormat.getDate();
                ele.modifyDatetime = DateFormat.getDate();
                ele.createUserId = this.sessionManager.getId();
                ele.modifyUserId = this.sessionManager.getId();
                ele.overrideAmount = Number(ele.overrideAmount);
                ele.offenderFeeId = this.dialog.data.offenderFeeId;
            });
            this.fodCommitModel.updateList = this.fodUpdateList;
        }
        if (this.fodDeleteList.length > 0) {
            this.fodDeleteList.forEach(ele => {
            });
            this.fodCommitModel.deleteList = this.fodDeleteList;
        }
        const isvalid = { valid: true };
        const cslddpSaveData = this.ocufovdtFactory.feeOverdDetCommit(this.fodCommitModel);
        cslddpSaveData.subscribe(data => {
            if (String(data) === '1') {
                const lockFlagMessage = {
                    label: this.translateService.translate('common.addupdateremoverecordsuccess'), yesBtn: true, yesLabel: 'OK'
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', lockFlagMessage, 20).subscribe(result => {
                     if (result) {                       
                        this.dialog.close(null);                      
                    }   
                });
            } else {
                this.show('common.addupdateremoverecordfailed', 'error');
                this.feeOverdDetExecuteQuery();
                isvalid.valid = false;
                return;
            }
        });
        
        return isvalid.valid;
    }




    saveFeeOverdDet(event) {
        this.fodInsertList = event.added;
        this.fodUpdateList = event.updated;
        this.fodDeleteList = event.removed;
        this.fodCommitModel.insertList = [];
        this.fodCommitModel.updateList = [];
        this.fodCommitModel.deleteList = [];

        if (!this.validateFod()) {
            return;
        }
        if (!this.validateOverlapDateRanges()) {
            return;
        }

        if (this.fodInsertList.length > 0) {
            this.fodInsertList.forEach(ele => {
                ele.createDatetime = DateFormat.getDate();
                ele.modifyDatetime = DateFormat.getDate();
                ele.createUserId = this.sessionManager.getId();
                ele.modifyUserId = this.sessionManager.getId();
                ele.overrideAmount = Number(ele.overrideAmount);
                ele.offenderFeeId = this.dialog.data.offenderFeeId;
                if(ele.overrideStartDate){
                    ele.overrideStartDate = DateFormat.getDate(ele.overrideStartDate);
                }
                if(ele.overrideEndDate){
                    ele.overrideEndDate = DateFormat.getDate(ele.overrideEndDate);
                }
                if(ele.addedDate){
                    ele.addedDate = DateFormat.getDate(ele.addedDate);
                }
            });
            this.fodCommitModel.insertList = this.fodInsertList;
        }
        if (this.fodUpdateList.length > 0) {
            this.fodUpdateList.forEach(ele => {
                ele.createDatetime = DateFormat.getDate();
                ele.modifyDatetime = DateFormat.getDate();
                ele.createUserId = this.sessionManager.getId();
                ele.modifyUserId = this.sessionManager.getId();
                ele.overrideAmount = Number(ele.overrideAmount);
                ele.offenderFeeId = this.dialog.data.offenderFeeId;
                if(ele.overrideStartDate){
                    ele.overrideStartDate = DateFormat.getDate(ele.overrideStartDate);
                }
                if(ele.overrideEndDate){
                    ele.overrideEndDate = DateFormat.getDate(ele.overrideEndDate);
                }
                if(ele.addedDate){
                    ele.addedDate = DateFormat.getDate(ele.addedDate);
                }
            });
            this.fodCommitModel.updateList = this.fodUpdateList;
        }
        if (this.fodDeleteList.length > 0) {
            this.fodDeleteList.forEach(ele => {
                if(ele.overrideStartDate){
                    ele.overrideStartDate = DateFormat.getDate(ele.overrideStartDate);
                }
                if(ele.overrideEndDate){
                    ele.overrideEndDate = DateFormat.getDate(ele.overrideEndDate);
                }
                if(ele.addedDate){
                    ele.addedDate = DateFormat.getDate(ele.addedDate);
                }
            });
            this.fodCommitModel.deleteList = this.fodDeleteList;
        }
        if (this.fodCommitModel.updateList.length > 0) {
            for (let i = 0; i < this.fodCommitModel.updateList.length; i++) {
                if (this.fodCommitModel.updateList[i].overrideTypeDb !== this.fodCommitModel.updateList[i].overrideType && this.fodCommitModel.updateList[i].billGeneratedFlag === 'Y') {
                    const lockFlagMessage = {
                        label: this.translateService.translate('ocufovdt.billalreadygenerateddoyouwanttochange'), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 55).subscribe(result => {
                        if (!result) {
                            return;
                        } else {
                            this.finalSave();
                        }
                    });
                }else{
                    this.finalSave();
                }
            } 
        } else {
            this.finalSave();
        }
    }
    
finalSave(){
    const cslddpSaveData = this.ocufovdtFactory.feeOverdDetCommit(this.fodCommitModel);
    cslddpSaveData.subscribe(data => {
        if (String(data) === '1') {
            this.show('common.addupdateremoverecordsuccess', 'success');
            this.feeOverdDetExecuteQuery();
        } else {
            this.show('common.addupdateremoverecordfailed', 'error');
            this.feeOverdDetExecuteQuery();
        }
    });
}
    onButExitclick() {
        if(this.fodGrid.addedMap.size > 0 || this.fodGrid.updatedMap.size > 0 || this.fodGrid.removedMap.size > 0) {       
            const lockFlagMessage = {
                label: this.translateService.translate('ocufovdt.savediscardchanges'), yesBtn: true, noBtn: true, cancelBtn: true 
            };
            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', lockFlagMessage, 55).subscribe(result => {
                if(result === null){
                    return;
                } else if (!result) {
                    this.dialog.close(null);
                    return;
                   
                } else {                
                    const event = { added: [], removed: [], updated: [] };
                    if (this.fodGrid) {
                        const added = [];
                        if (this.fodGrid.addedMap.size > 0) {
                            this.fodGrid.addedMap.forEach((value) => {
                                added.push(value);
                            });
                        }
                        const removed = [];
                        this.fodGrid.removedMap.forEach((value) => {
                            removed.push(value);
                        });
                        const updated = [];
                        this.fodGrid.updatedMap.forEach((value) => {
                            updated.push(value);
                        });
                        event.added = added;
                        event.removed = removed;
                        event.updated = updated;
                        this.savePopupData(event);
                    }
                    
                }         
            });
        
    }else {
        this.dialog.close(null);
    }
    // if(this.fodGrid.addedMap.size === 0 && this.fodGrid.updatedMap.size  === 0  && this.fodGrid.removedMap.size  === 0 ) {
    //     this.dialog.close(null);
    // }
}

    courtFeeDateOverlap(aStartDate: DateFormat, aEndDate: DateFormat, bStartDate: DateFormat, bEndDate: DateFormat): boolean {
        var a = (aStartDate && bStartDate ) ?  DateFormat.compareDate(DateFormat.getDate(aStartDate), DateFormat.getDate(bStartDate)) : undefined;
        var b = (bStartDate && aEndDate ) ?  DateFormat.compareDate(DateFormat.getDate(bStartDate), DateFormat.getDate(aEndDate)) : undefined;
        var c = (aStartDate && bEndDate ) ?  DateFormat.compareDate(DateFormat.getDate(aStartDate), DateFormat.getDate(bEndDate)) : undefined;
        var d = (bEndDate && aEndDate ) ?  DateFormat.compareDate(DateFormat.getDate(bEndDate), DateFormat.getDate(aEndDate)) : undefined;;
        var e = (bStartDate && aStartDate ) ?  DateFormat.compareDate(DateFormat.getDate(bStartDate), DateFormat.getDate(aStartDate)) : undefined;;
        var f = (aEndDate && bEndDate ) ?  DateFormat.compareDate(DateFormat.getDate(aEndDate), DateFormat.getDate(bEndDate)) : undefined;
        if (a < 1 && b < 1) {
            return true;
        } else if (c < 1 && d < 1) {
            return true;
        } else if (e < 1 && f < 1) {
            return true;
        }
        return false;
    }

    get deleteFodGridData (){
        if(this.fodModel.createDatetime && (this.fodModel.billGeneratedFlag === 'N' || this.fodModel.billGeneratedFlag ===null)  && this.insertAllowedTrue){
            return true;
        } else {
            return false;
        }
    }

     onfeeOverridehistoryClick = () => {
    
   this.dialogService.openLinkDialog('/OCUFOVHT',this.fodModel, 80).subscribe(result => {
     });
     }

     get childButtonDisable(){
        if(this.fodModel.createDatetime){
        return false;
        } else {
          return true;  
        }
    }

    getBillEndDayProfValue(){
        this.ocufovdtFactory.getbillEndDayPfVal().subscribe(data => {
            if(data){
                let currentDate = DateFormat.getDate().getDate();
                if(Number(data) >= currentDate){
                    this.billEndDay = Number(data)+1;
                    this.billingCycleStartDate = DateFormat.getDate();
                    this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setMonth(DateFormat.getDate().getMonth() - 1));
                    this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setDate(this.billEndDay));
                    let date1 = DateFormat.getDate(this.billingCycleStartDate).getTime();
                    var ms = date1 + (30 * 86400000);
                    var endDate = DateFormat.getDate(ms);
                    this.billingCycleEndDate = endDate;
                }else{
                    this.billEndDay = Number(data)+1;
                    this.billingCycleStartDate = DateFormat.getDate();
                    this.billingCycleStartDate = DateFormat.getDate(this.billingCycleStartDate.setDate(this.billEndDay));
                    let date1 = DateFormat.getDate(this.billingCycleStartDate).getTime();
                    var ms = date1 + (29 * 86400000);
                    var endDate = DateFormat.getDate(ms);
                    this.billingCycleEndDate = endDate;

                }
            }else{
                this.billEndDay = undefined;
            }
        });
    }
}
