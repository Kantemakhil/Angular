import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcmserviService } from '../service/ocmservi.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ProgramServices } from '@inst/institutional-activities/maintenance/beans/ProgramServices';
import { ProgramServicesCommitBean } from '@inst/institutional-activities/maintenance/beans/ProgramServicesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
// import required bean declarations

@Component({
    selector: 'app-ocmservi',
    templateUrl: './ocmservi.component.html',
})

export class OcmserviComponent implements OnInit {
    // Variable declaration
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    prgsrvData: ProgramServices[] = [];
    prgsrvDataTemp: ProgramServices[] = [];
    prgsrvModel: ProgramServices = new ProgramServices();
    prgsrvModelData: ProgramServices = new ProgramServices();
    alertbean: ProgramServices = new ProgramServices();
    prgsrvIndex = 0;
    prgsrvInsertList: ProgramServices[] = [];
    prgsrvUpdateList: ProgramServices[] = [];
    prgsrvDeleteList: ProgramServices[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    prgSrvColumnDef: any[];
    obeReadOnly = false;
    prgSrvReadOnly = false;
    butCtrlReadOnly = false;
    rgpscategoryRg: any[] = [];
    rgfunctiontypeRg: any[] = [];
    tableIndex = -1;
    activeFlag: boolean;
    expiryDate: Date;
    prgsrvCommitModel: ProgramServicesCommitBean = new ProgramServicesCommitBean();
    txnUsageTitle = {
        'description': this.translateService.translate('common.description'),
        'code': this.translateService.translate('common.code')
    };
    functionTitle = {
        'description': this.translateService.translate('ocmservi.teamfunction'),
        'code': this.translateService.translate('common.code')
    };
    namesReadOnly: boolean;
    ckeckboxReadOnly: boolean;
    retriveDisable: boolean;
    clearDisable: boolean;
    savedisabled: boolean;
    clearDisableOne: boolean;
    alertDelete: boolean;
    disabledFlag: boolean;
    message = ' Invalid.';
    type = 'error';
    launchBtnFlag: boolean;
    phasesLaunchBtnFlag : boolean;
    constructor(private ocmserviFactory: OcmserviService, public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.prgSrvColumnDef = [];
    }
    ngOnInit() {
        this.tableIndex = -1;
        this.activeFlag = undefined;
        this.namesReadOnly = false;
        this.ckeckboxReadOnly = false;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.launchBtnFlag = true;
        this.savedisabled = true;
        this.clearDisableOne = true;
        this.disabledFlag = true;
        this.phasesLaunchBtnFlag = true;
        this.prgSrvColumnDef = [
            {
                fieldName: this.translateService.translate('common.code') + '*', field: 'programCode', maxlength: '40',
                editable: true, width: 150, datatype: 'text', uppercase: 'true', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.description') + '*', field: 'description', editable: true,
                maxlength: '40', datatype: 'text', width: 150, uppercase: 'false',
            },
            {
                fieldName: this.translateService.translate('common.category') + '*', field: 'programCategory',
                editable: true, width: 150, datatype: 'lov', domain: 'PS_CATEGORY', cellEditable: this.canCellEdit,
                titles: this.txnUsageTitle
            },
            {
                fieldName: this.translateService.translate('ocmservi.teamfunction'), field: 'functionType', editable: true, width: 150,
                datatype: 'lov', domain: 'FUNCTION', titles: this.functionTitle
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
        ];
        this.prgSrvExecuteQuery();
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
    clearQuery() {
        this.prgsrvData = [];
        this.prgsrvModel = new ProgramServices();
        this.prgsrvModelData = new ProgramServices();
        this.alertbean = new ProgramServices();
        this.expiryDate = undefined;
        this.activeFlag = undefined;
        this.namesReadOnly = false;
        this.ckeckboxReadOnly = false;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.savedisabled = true;
        this.clearDisableOne = true;
        this.disabledFlag = true;
        this.alertDelete = false;
        this.launchBtnFlag = true;
        this.phasesLaunchBtnFlag = true;
    }
    isInsertableOne() {
        if (this.prgsrvModelData.programCode || this.prgsrvModelData.description || this.prgsrvModelData.programCategory
        || this.prgsrvModelData.functionType || this.expiryDate || this.namesReadOnly) {
        this.clearDisable = false;
        } else {
        this.clearDisable = true;
        }
        }
    onRowClickprgsrv(event) {
        if (event) {
            this.prgsrvModel = event;
            this.disabledFlag = false;
            if (this.prgsrvModel.programId) {
                this.savedisabled = true;
                this.alertDelete = true;
            } else {
                this.savedisabled = true;
                this.alertDelete = false;
            }
            if (this.prgsrvModel.commentText) {
                this.clearDisableOne = false;
            } else {
                this.clearDisableOne = true;
            }
            this.alertbean = new ProgramServices();
            this.alertbean = event;
        } else {
            this.disabledFlag = true;
        }

        if(this.prgsrvModel.programCategory === 'ACP'){
            this.phasesLaunchBtnFlag = false;
        }
        else{
            this.phasesLaunchBtnFlag = true;
        }
    }
    onRelationshipBlur() {
        if (!this.prgsrvModelData.programCategory) {
            this.prgsrvModelData.programCategory = this.prgsrvModelData.programCategory === '' ? undefined : '';
          }
    }
    onRelationshipBlurOne() {
        if (!this.prgsrvModelData.functionType) {
            this.prgsrvModelData.functionType = this.prgsrvModelData.functionType === '' ? undefined : '';
          }
    }
    onGridClear = () => {
        if (this.prgsrvModel.programId) {
            this.prgSrvExecuteQuery();
        }
        return true;
    }
    cancel() {
        this.alertbean = new ProgramServices();
        this.clearDisableOne = true;
        if (this.prgsrvModel.commentText) {
            this.savedisabled = false;
        } else {
            this.savedisabled = true;
        }
    }

    /**
  *  This function will be executed when we edit grid row data under Affiliation Block
  */
    canCellEdit = (data: any, index: number, field: string): boolean => {
        if (data.programId && (field === 'programCode' || field === 'description' || field === 'programCategory')) {
            return false;
        }
        if (field === 'expiryDate' && data.activeFlag) {
            return false;
        } else {
            return true;
        }
    }
    
    prgSrvExecuteQuery() {
        // if (date) {
        //     if (date.lastValue === '0_/__/____') {
        //       this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
        //       this.clearDisable = false;
        //       return;
        //     }
        //     if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
        //       this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
        //       this.clearDisable = false;
        //       return;
        //     }
        //   }
        // this.tableIndex = -1;

        // if (this.expiryDate) {
        //     this.prgsrvModelData.expiryDate = this.expiryDate;
        // } else {
        //     this.prgsrvModelData.expiryDate = null;
        // }
        
        const reqData = JSON.parse(JSON.stringify(this.prgsrvModelData));
        reqData.activeFlag = this.activeFlag;
        const prgsrvResult = this.ocmserviFactory.
            prgSrvExecuteQuery(reqData);
        prgsrvResult.subscribe(prgsrvResultList => {
            if (prgsrvResultList.length === 0) {
                this.prgsrvData = [];
                this.show('common.querycaused');
                return;
            } else {
                prgsrvResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.prgsrvData = prgsrvResultList;
                this.prgsrvModel = prgsrvResultList[0];
                this.namesReadOnly = true;
                this.ckeckboxReadOnly = true;
                this.retriveDisable = true;
                this.clearDisable = false;
                this.launchBtnFlag = false;
                this.tableIndex = 0;
            }
        });
    }

    ocmserviValidations() {
        const is = { valid: true };
        const uwActiveCount = { numOfCheck: 0, totAmt: 0 };
        this.prgsrvData.forEach(data => {
            if (is.valid) {
                if (!data.programCode) {
                    this.show('common.codemustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.description) {
                    this.show('common.descriptionmustbeentered');
                    is.valid = false;
                    return;
                }
                if (!data.programCategory) {
                    this.show('common.categorymustbeentered');
                    is.valid = false;
                    return;
                }
                if (data.programCategory === 'UW' && data.activeFlag) {
                    uwActiveCount.numOfCheck++;
                    if(uwActiveCount.numOfCheck >1){
                        this.show('ocmservi.atatimeonlyonecommunityserviceshouldbeactive', 'warn');
                        is.valid = false;
                        this.prgSrvExecuteQuery();
                    return;
                    }
                }
            }
        });
        return is.valid;
    }


    /**
      *  This function will be executed when commit event is
     * fired
     */
    ocmserviSaveprgsrvForm(event) {
        if (!this.ocmserviValidations()) {
            return;
        }
        this.prgsrvInsertList = event.added;
        this.prgsrvUpdateList = event.updated;
        this.prgsrvDeleteList = event.removed;
        this.prgsrvCommitModel.insertList = [];
        this.prgsrvCommitModel.updateList = [];
        this.prgsrvCommitModel.deleteList = [];
        if (this.prgsrvInsertList.length > 0 || this.prgsrvUpdateList.length > 0) {
            for (let i = 0; i < this.prgsrvInsertList.length; i++) {
                if (!this.prgsrvInsertList[i].programCode) {
                    this.show('ocmservi.thisprogramservicealreadyexists', 'warn');
                    return;
                }
                const index=this.prgsrvData.indexOf(this.prgsrvInsertList[i]);
                for(let j=0;j<this.prgsrvData.length;j++){
                    if(index != j && this.prgsrvData[j].programCode === this.prgsrvInsertList[i].programCode){
                        this.show('ocmservi.thiscodehasalreadybeendefined', 'warn');
                        return; 
                    }
                }
                if (!this.prgsrvInsertList[i].description) {
                    this.show('ocmservi.thisprogramservicealreadyexists', 'warn');
                    return;
                }
                if (!this.prgsrvInsertList[i].programCategory) {
                    this.show('ocmservi.thisprogramservicealreadyexists', 'warn');
                    return;
                }
                this.prgsrvInsertList[i].activeFlag = this.prgsrvInsertList[i].activeFlag ? 'Y' : 'N';
            }
            for (let i = 0; i < this.prgsrvUpdateList.length; i++) {
                this.prgsrvUpdateList[i].activeFlag = this.prgsrvUpdateList[i].activeFlag ? 'Y' : 'N';
            }
            this.prgsrvCommitModel.insertList = this.prgsrvInsertList;
            this.prgsrvCommitModel.updateList = this.prgsrvUpdateList;
        }
        if (this.prgsrvDeleteList.length > 0) {
            for (let i = 0; i < this.prgsrvDeleteList.length; i++) {
            }
            this.prgsrvCommitModel.deleteList = this.prgsrvDeleteList;
        }
        const prgsrvSaveData = this.ocmserviFactory.prgSrvCommit(this.prgsrvCommitModel);
        prgsrvSaveData.subscribe(data => {
            if (String(data.errorMessage).indexOf('PROGRAM_SERVICES_PK') > 0) {
                this.show('ocmservi.recordalreadyexists');
            }
            if (String(data.errorMessage).indexOf('PROGRAM_SERVICES_UK1') > 0) {
                this.show('ocmservi.recordalreadyexistswiththiscode');
            }
            if (data && data.sealFlag === '1') {
                this.savedisabled = true;
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.prgSrvExecuteQuery();
            } else if (data && data.sealFlag === '3') {
                this.show('ocmservi.theunpaidwork', 'warn');
            } else if (data && data.sealFlag === '4') {
                this.show('ocmservi.thisprogramservicealreadyexists', 'warn');
            } else if (data && data.sealFlag === '5') {
                this.show('ocmservi.thiscodehasalreadybeendefined', 'warn');
            } else if (data && data.sealFlag && data.activeFlag === 'S') {
                this.message = this.translateService.translate('common.recordcannotbedeletedparent');
                this.message = String(this.message).replace('%tablename%', data.sealFlag);
                this.show(this.message);
            } else if (data && data.sealFlag && data.activeFlag === 'D') {
                this.message = this.translateService.translate('ocmservi.recorddelete');
                this.message = String(this.message).replace('%NAME%', data.sealFlag);
                this.show(this.message);
            } else {
                this.savedisabled = false;
                this.show('common.addupdateremoverecordfailed');
            }
        });
    }
    isInsertable() {
        if (this.alertbean.commentText) {
            this.savedisabled = false;
            this.clearDisableOne = false;
        } else {
            this.savedisabled = false;
            this.clearDisableOne = true;
        }
    }
/**
     * updation of Details Block
     */
    onButSave() {
        this.prgsrvUpdateList = [];
        this.prgsrvCommitModel.insertList = [];
        this.prgsrvCommitModel.updateList = [];
        if (this.expiryDate) {
            this.alertbean.expiryDate = DateFormat.getDate(this.expiryDate);
        }
        this.alertbean.activeFlag = this.alertbean.activeFlag ? 'Y' : 'N';
        this.prgsrvUpdateList.push(this.alertbean);
        this.prgsrvCommitModel.updateList = this.prgsrvUpdateList;
        if (!this.prgsrvData[this.prgsrvData.length - 1].programId) {
            this.show('ocdalert.pleasesavetheaboverecords');
            this.savedisabled = true;
            return;
         }
        if (!this.savedisabled) {
            const alertSaveData = this.ocmserviFactory.prgSrvCommit(this.prgsrvCommitModel);
            alertSaveData.subscribe(alertSaveResult => {
                if (alertSaveResult && alertSaveResult.sealFlag === '1') {
                    this.savedisabled = true;
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    return;
                }
            });
        }
    }

    get phaseBtnDisable() {
        if (this.prgsrvData.length !== 0 && this.prgsrvModel && this.prgsrvModel.programCategory === 'ACP') {
            return false;
        } else {
            return true;
        }
    }
    validateRowData = (event) => {
        
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'activeFlag') {
            if (event.field === 'activeFlag' && !(event.data.activeFlag)) {
                this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            } else {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /*
    *  This event is used to insert the data in Affiliation Block.
    */
    onGridInsert = () => {
        if (!this.ocmserviValidations()) {
            return false;
        }
        return {
            description: '', stgId: '', programCategory: '', programCode: '', teamFunction: '', activeFlag: true, expiryDate: ''
        };
    }


    /**
  *  This function will be executed when we click on validation button
  *
  */
    onbutLaunchClick = () => {
        if (!this.prgsrvModel.programId) {
            return false;
        }
        return true;
    }
    // butProgramCategoryWhenButtonPressedTrigger() {
    //     //TODO go_item('prg_srv.nbt_category_description');
    //     //TODO do_key('list_values');
    // }

    // nbtFunctionTypeDescWhenValidateItemTrigger() {
    //     if ( prgSrvModel.nbtFunctionTypeDesc = null ) {
    //         if ( systemModel.recordStatus === 'new' ) {
    //             //TODO return;
    //         }
    //         //TODO 
    //         //TODO prg_srv.function_type = null;
    //     }
    // }

    // nbtFunctionTypeDescKeyListvalTrigger() {
    //     //TODO  this.listValues();
    //     //TODO  this.nextItem();
    // }

}
