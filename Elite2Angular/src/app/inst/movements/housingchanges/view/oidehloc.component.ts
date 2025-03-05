import {
    Component, OnInit, OnDestroy, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidehlocService } from '@inst/movements/housingchanges/service/oidehloc.service';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { VHeaderBlockCommitBean } from '@inst/movement-external/beans/VHeaderBlockCommitBean';
import { ActivatedRoute, Router } from '@angular/router';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { OiinamesService } from '@inst/movement-external/service/oiinames.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OsiosearService } from '@common/offender-records/service/osiosear.service';
import {InjectOffenderService} from '@core/service/inject-offender.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
@Component({
    selector: 'app-oidehloc',
    templateUrl: './oidehloc.component.html'
})

export class OidehlocComponent implements OnInit, OnDestroy {
    // Variable declaration
    @ViewChild('grid',{static: true}) grid : any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    voffbkgData: VHeaderBlock[] = [];
    voffbkgDataTemp: VHeaderBlock[] = [];
    voffbkgModel: VHeaderBlock = new VHeaderBlock();
    selectedRowData:VHeaderBlock = new VHeaderBlock();
    voffbkgIndex = 0;
    voffbkgInsertList: VHeaderBlock[] = [];
    voffbkgUpdatetList: VHeaderBlock[] = [];
    voffbkgDeleteList: VHeaderBlock[] = [];
    voffbkgCommitModel: VHeaderBlockCommitBean = new VHeaderBlockCommitBean();
    nonAssocationDetails: VHeaderBlockCommitBean = new VHeaderBlockCommitBean();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    disabled: boolean;
    editable = true;
    vOffBkgReadOnly = false;
    sysPflReadOnly = false;
    rgassignmentreasonRg: any[] = [];
    routeUrl: string;
    reasonTitle = { code: 'Reason', description: 'Description' };
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    offenderObj: Offenders = new Offenders();
    clearFlag: boolean;
    launchFlag: boolean;
    namesFlag = false;
    retrieveFlag: boolean;
    prevFlag: boolean;
    nextFlag: boolean;
    checkFlag: boolean;
    lstOfVHeader: VHeaderBlock[];
    index = 0;
    offenderSelectFlag: boolean;
    resultcodes: any;
    withoutdata: boolean;
    noneditfields: boolean;
    vHeaderBlockModelTemp: VHeaderBlock = new VHeaderBlock();
    strMessage: string;
    oidehlocColumnDef: any[];
    allowUpdate:boolean;
    activeCheckbox: boolean;
    allowUpdateLoc :boolean;
    offenderMsg:string;
    constructor(private oidehlocFactory: OidehlocService, public translateService: TranslateService,
        private oiinamesFactory: OiinamesService, private activatedRoute: ActivatedRoute, private router: Router,
        public dialogService: DialogService, private offenderSearchService: OffenderSearchService, private injectOffenderService: InjectOffenderService,
        public osiosearFactory: OsiosearService) {
        // TODO initilize data members here..!
        this.lstOfVHeader = [];
        this.oidehlocColumnDef = [];
    }
    ngOnInit() {
        this.oidehlocFactory.checkFlag = true;
        this.display = true;
        this.withoutdata = true;
        this.clearFlag = true;
        this.launchFlag = true;
        this.disabled = true;
        this.retrieveFlag = true;
        this.prevFlag = true;
        this.nextFlag = true;
        this.offenderSelectFlag = true;
        this.noneditfields = true;
        //this.activeCheckbox=false;
        // TODO all initializations here
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.routeUrl = this.router.url;
        const rgassignmentreasonServiceObj = this.oidehlocFactory.rgAssignmentReasonRecordGroup();
        rgassignmentreasonServiceObj.subscribe(rgAssignmentReasonList => {
            if (rgAssignmentReasonList.length === 0) {
                this.rgassignmentreasonRg = [];
            } else {
                for (let i = 0; i < rgAssignmentReasonList.length; i++) {
                    this.rgassignmentreasonRg.push({
                        'text': rgAssignmentReasonList[i].code + ' - ' +
                        rgAssignmentReasonList[i].description, 'id': rgAssignmentReasonList[i].code
                    });
                }
            }
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }

        this.oidehlocColumnDef = [
            {
                fieldName: this.translateService.translate('common.select'),
                field: 'activeCheckbox', editable: true, datatype: 'checkbox', width: 150
              },
            {
                fieldName: this.translateService.translate('system-profile.off-id-code') , field: 'offenderIdDisplay', editable: false, width: 150,
                datatype: 'text', maxlength: 12
            },
            // {
            //     fieldName: this.translateService.translate('ABCD'), field: 'button', editable: true, width: 120, datatype: 'launchbutton', link: '/oiinamesdialog',
            //     onLaunchClick: this.onLaunchButtonClick, modal: true
            // },
            {
                fieldName: this.translateService.translate('oidehloc.lastname') , field: 'lastName', editable: false, width: 150,
                datatype: 'text', uppercase: 'false', maxlength: 150
            },
            {
                fieldName: this.translateService.translate('oidehloc.firstname'), field: 'firstName',
                editable: false, width: 150, datatype: 'text', 
            },
            {
                fieldName: this.translateService.translate('oidehloc.middlename'), field: 'middleName', editable: false, width: 100,
                 datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidehloc.dob'), field: 'birthDate', editable: false, width: 150, datatype: 'date'
               
            },
            {
                fieldName: this.translateService.translate('oidehloc.age'), field: 'age', editable: false,
                width: 150 ,datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('oidehloc.bkg12'), field: 'bookingNo', editable: false,
                width: 150,datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidehloc.location'), field: 'livingUnitDescription', editable: false,
                width: 150,datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidehloc.status'), field: 'statusDisplay', editable: false,
                width: 150,datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidehloc.inout'), field: 'inOutStatus', editable: false,
                width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidehloc.reason'), field: 'nbtAssignReason', editable: true,
                width: 150, datatype: 'lov', domain: 'CHG_HOUS_RSN'
            },
        ];
        
    }
    /** This function is used to display alert messages */
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
   

    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
      
            if (event.field === 'activeCheckbox' && event.data.activeCheckbox) {
                for(let i = 0; i < this.voffbkgData.length; i++){
                    if(event.data.offenderBookId != this.voffbkgData[i].offenderBookId && this.voffbkgData[i].activeCheckbox){
                        this.voffbkgData[i].activeCheckbox = false;
                        var rowNode = this.grid.gridOptions.api.getRowNode(i);
                        rowNode.setData(this.voffbkgData[i]);
                        this.allowUpdate=true;
                    }
                }
                rowdata.validated = true;
                return rowdata;
            } 
        
       
        rowdata.validated = true;
        return rowdata;
    }
    onCheckboxClear = () => {
    
        this.voffbkgExecuteQuery();
        return true;
    
    }
    onRowClickCheckbox(event){
        if(event.activeCheckbox){
            this.voffbkgModel=event;
        }
       
    }
 

    /** This function is used to clear the fields of VOffBkg Block */
    cancel() {
        this.display = true;
        this.launchFlag = false;
        this.clearFlag = true;
        this.voffbkgModel = new VHeaderBlock();
        this.disabled = true;
        this.namesFlag = false;
        this.retrieveFlag = false;
        this.prevFlag = true;
        this.nextFlag = true;
        this.lstOfVHeader = [];
        this.voffbkgData = [];
        this.voffbkgIndex = 0;
        this.index = 0;
        this.offenderSelectFlag = false;
        this.noneditfields = true;
        this.retrieveFlag = false;
    }
    /*** This function is used when any key is pressed in the fields of VOffBkg block */
    isInsertable() {
        this.clearFlag = false;
        if (!this.vHeaderBlockModel || !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
        if (this.offenderSelectFlag) {
            //this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
            return false;
        }
    }
    /** This function is called when Reason Lov is clicked */
    onLovMouseDown() {
        if (!this.vHeaderBlockModel && !this.vHeaderBlockModel.offenderBookId) {
            return false;
        }
    }
     /** This function is called when we select thr Reason Lov field */
    reasonChangeEvent() {
        this.clearFlag = false;
    }
    /**This function is used to display header block information */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            this.clearFlag = false;
            this.voffbkgModel = new VHeaderBlock();
            this.lstOfVHeader = [];
            this.voffbkgData = [];
            this.voffbkgIndex = 0;
            this.launchFlag = true;
            this.display = true;
            this.retrieveFlag = false;
            this.prevFlag = true;
            this.nextFlag = true;
            this.namesFlag = false;
            this.withoutdata = false;
            this.offenderSelectFlag = false;
            this.clearFlag = true;
            this.voffbkgExecuteQuery();
        } else {
            this.withoutdata = true;
            this.display = true;
            this.clearFlag = true;
            this.launchFlag = true;
            this.namesFlag = false;
            this.retrieveFlag = true;
            this.prevFlag = true;
            this.nextFlag = true;
            this.voffbkgModel = new VHeaderBlock();
            this.lstOfVHeader = [];
            this.voffbkgData = [];
            this.voffbkgIndex = 0;
            this.index = 0;
            this.noneditfields = true;
            this.offenderSelectFlag = false;
        }
    }
    /** This function is used to enable and disable launch button */
    enableLaunch() {
        if (!this.withoutdata && !this.offenderSelectFlag) {
            this.launchFlag = false;
        } else {
            this.launchFlag = true;
        }
    }
    /**This function retrieves the list of records based on the search parameters of VOffBkg block */
    voffbkgExecuteQuery() {
        this.voffbkgIndex = 0;
        if (this.voffbkgModel.offenderIdDisplay === this.vHeaderBlockModel.offenderIdDisplay) {
            this.prevFlag = true;
            this.nextFlag = true;
            this.offenderSelectFlag = false;
            this.show(this.translateService.translate('oidehloc.querycaused'), 'warn');
            return;
        }
        this.voffbkgModel =  new VHeaderBlock();
        this.voffbkgModel.agyLocId = this.vHeaderBlockModel.agyLocId;
        this.voffbkgModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.voffbkgModel.offenderIdDisplay = this.voffbkgModel.offenderIdDisplay;
        this.voffbkgModel.insertedFlag = false;
        const voffbkgResult = this.oidehlocFactory.
            vOffBkgExecuteQuery(this.voffbkgModel);
        voffbkgResult.subscribe(voffbkgList => {
            if (voffbkgList.length === 0) {
                this.voffbkgData = [];
                this.prevFlag = true;
                this.nextFlag = true;
                this.offenderSelectFlag = false;
                 this.retrieveFlag = false;
                this.show(this.translateService.translate('oidehloc.querycaused'), 'warn');
            } else {
                this.voffbkgData = voffbkgList;
                this.lstOfVHeader = voffbkgList;
                this.voffbkgModel = voffbkgList[0];
                this.launchFlag = true;
                this.prevFlag = false;
                this.display = false;
                this.noneditfields = false;
                this.offenderSelectFlag = true;
                this.clearFlag = false;
                this.retrieveFlag = true;
                if (voffbkgList.length > 1) {
                    this.nextFlag = false;
                }
            }
        });
    }
    /**
     * This function is used to navigate between records
     */
    butOffendersKeyNextItemTrigger() {
        if (this.lstOfVHeader.length === 0) {
            return;
        }
        this.clearFlag = false;
        this.offenderSelectFlag = true;
        if ((this.voffbkgIndex) < this.lstOfVHeader.length - 1) {
            this.voffbkgIndex = this.index + 1;
            this.voffbkgModel = this.lstOfVHeader[this.voffbkgIndex];
            this.index = this.index + 1;
            this.prevFlag = false;
        } else {
            this.show(this.translateService.translate('common.lastrecordof'), 'warn');
            this.nextFlag = true;
            this.prevFlag = false;
        }
    }
    /**
     * This function is used to navigate between records
     */
    butOffendersKeyPrevItemTrigger() {
        if (this.lstOfVHeader.length === 0) {
            return;
        }
        this.clearFlag = false;
        this.offenderSelectFlag = true;
        if (this.voffbkgIndex >= 1) {
            this.voffbkgIndex = this.voffbkgIndex - 1;
            this.index = this.voffbkgIndex;
            this.voffbkgModel = this.lstOfVHeader[this.voffbkgIndex];
            this.nextFlag = false;
        } else {
            this.prevFlag = true;
            this.nextFlag = false;
            this.show(this.translateService.translate('common.atfirstrecord'), 'warn');
        }
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
   
    oidehlocSavevoffbkgForm() {

        this.resultcodes = 0;
        this.voffbkgInsertList = [];
        this.voffbkgUpdatetList = []
        this.voffbkgCommitModel.insertList = [];
        this.voffbkgCommitModel.updateList = [];
        this.voffbkgCommitModel.deleteList = [];
        this.voffbkgCommitModel.updateList = [];
        this.voffbkgModel.nbtNonAssBProceed = false;
        this.voffbkgModel.nbtChkSecBProceed = false;
        this.voffbkgModel.nbtNonAssVProceed = false;

        if (this.voffbkgModel.activeCheckbox === false) {
            this.show(this.translateService.translate('oidehloc.pleaseselectoffender'), 'warn');
            return;
        }


        if (!this.voffbkgModel.offenderIdDisplay || !this.vHeaderBlockModel.offenderIdDisplay) {
            this.show(this.translateService.translate('oidehloc.cannotcommit'), 'error');
            return;
        }
        if (this.voffbkgModel.offenderId === this.vHeaderBlockModel.offenderId) {
            this.show(this.translateService.translate('oidehloc.cannotmoveoffenders'), 'error');
            return;
        }

        if (!this.voffbkgModel.offenderIdDisplay || !this.voffbkgModel.lastName || !this.voffbkgModel.firstName ||
            !this.voffbkgModel.bookingNo || !this.voffbkgModel.livingUnitDescription || !this.voffbkgModel.statusDisplay ||
            !this.voffbkgModel.inOutStatus) {
            this.show(this.translateService.translate('oidehloc.functionkeynotallowed'), 'error');
            return;
        } else {
            this.voffbkgUpdatetList.push(this.voffbkgModel);
        }

        if (this.vHeaderBlockModel.offenderBookId) {
            this.voffbkgInsertList.push(this.vHeaderBlockModel);
            this.voffbkgCommitModel.insertList = this.voffbkgInsertList;
        }

        if (this.voffbkgUpdatetList.length === 0) {
            return;
        }
        this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;

        const returndata = this.oidehlocFactory.nonAssocationOffendersList(this.voffbkgCommitModel);

        returndata.subscribe(data => {
            this.nonAssocationDetails = data;


            this.allowUpdateLoc = this.nonAssocationDetails.insertList[0].nbtNonAssBProceed;


            var updateLoc = (!this.allowUpdateLoc) ? this.translateService.translate('oidehloc.overrideLocation') : this.translateService.translate('oidehloc.doyouwanttoproced');

            this.offenderMsg = this.translateService.translate('oidehloc.nonassocationmsg');
            if (this.nonAssocationDetails.insertList[0].nonAssocationData === null && this.nonAssocationDetails.updateList[0].nonAssocationData === null &&
                this.nonAssocationDetails.insertList[0].gangConflitData === null && this.nonAssocationDetails.updateList[0].gangConflitData === null) {
                this.save();
            }
            else if ((this.nonAssocationDetails.insertList[0].nonAssocationData !== null || this.nonAssocationDetails.insertList[0].gangConflitData !== null) && (this.nonAssocationDetails.updateList[0].nonAssocationData === null && this.nonAssocationDetails.updateList[0].gangConflitData === null)) {
                var labelMsg;
                if(this.nonAssocationDetails.insertList[0].nonAssocationData !== null && this.nonAssocationDetails.insertList[0].gangConflitData !== null) {
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if (this.nonAssocationDetails.insertList[0].nonAssocationData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if(this.nonAssocationDetails.insertList[0].gangConflitData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } 
                
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        this.save();
                    } else {
                        return;
                    }
                });
            }
            else if ((this.nonAssocationDetails.insertList[0].nonAssocationData === null && this.nonAssocationDetails.insertList[0].gangConflitData === null) && (this.nonAssocationDetails.updateList[0].nonAssocationData !== null || this.nonAssocationDetails.updateList[0].gangConflitData !== null)) {
                var labelMsg;
                if(this.nonAssocationDetails.updateList[0].nonAssocationData !== null && this.nonAssocationDetails.updateList[0].gangConflitData !== null) {
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if (this.nonAssocationDetails.updateList[0].nonAssocationData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if(this.nonAssocationDetails.updateList[0].gangConflitData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } 
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        this.save();
                    } else {
                        return;
                    }
                });
            }
            else if ((this.nonAssocationDetails.insertList[0].nonAssocationData !== null || this.nonAssocationDetails.insertList[0].gangConflitData !== null) && (this.nonAssocationDetails.updateList[0].nonAssocationData !== null && this.nonAssocationDetails.updateList[0].gangConflitData === null)) {
                var labelMsg;
                if(this.nonAssocationDetails.insertList[0].nonAssocationData !== null && this.nonAssocationDetails.insertList[0].gangConflitData !== null) {
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if (this.nonAssocationDetails.insertList[0].nonAssocationData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if(this.nonAssocationDetails.insertList[0].gangConflitData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } 
                
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        const labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                        };
                        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.save();
                            } else {
                                return;
                            }
                        });
                    } else {
                        return;
                    }
                });
            }
            else if ((this.nonAssocationDetails.insertList[0].nonAssocationData !== null || this.nonAssocationDetails.insertList[0].gangConflitData !== null) && (this.nonAssocationDetails.updateList[0].nonAssocationData === null && this.nonAssocationDetails.updateList[0].gangConflitData !== null)) {
                var labelMsg;
                if(this.nonAssocationDetails.insertList[0].nonAssocationData !== null && this.nonAssocationDetails.insertList[0].gangConflitData !== null) {
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if (this.nonAssocationDetails.insertList[0].nonAssocationData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } else if(this.nonAssocationDetails.insertList[0].gangConflitData !== null){
                    labelMsg = {
                        label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                    };
                } 
                
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        const labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                        };
                        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.save();
                            } else {
                                return;
                            }
                        });
                    } else {
                        return;
                    }
                });
            }
            else if ((this.nonAssocationDetails.insertList[0].nonAssocationData !== null && this.nonAssocationDetails.insertList[0].gangConflitData === null) && (this.nonAssocationDetails.updateList[0].nonAssocationData !== null || this.nonAssocationDetails.updateList[0].gangConflitData !== null)) {
                const labelMsg = {
                    label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                         + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                };
                
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        
                        var labelMsg;
                        if(this.nonAssocationDetails.updateList[0].nonAssocationData !== null && this.nonAssocationDetails.updateList[0].gangConflitData !== null) {
                            labelMsg = {
                                label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                                + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                                proceedBtnDisabled: true
                            };
                        } else if (this.nonAssocationDetails.updateList[0].nonAssocationData !== null){
                            labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                            };
                        } else if(this.nonAssocationDetails.updateList[0].gangConflitData !== null){
                            labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                            };
                        } 
                        
                        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.save();
                            } else {
                                return;
                            }
                        });
                    } else {
                        return;
                    }
                });
            }
            else if ((this.nonAssocationDetails.insertList[0].nonAssocationData === null && this.nonAssocationDetails.insertList[0].gangConflitData !== null) && (this.nonAssocationDetails.updateList[0].nonAssocationData !== null || this.nonAssocationDetails.updateList[0].gangConflitData !== null)) {
                const labelMsg = {
                    label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                         + '\nGANG NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                        proceedBtnDisabled: true
                };
                
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        var labelMsg;
                        if(this.nonAssocationDetails.updateList[0].nonAssocationData !== null && this.nonAssocationDetails.updateList[0].gangConflitData !== null) {
                            labelMsg = {
                                label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                                + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                                proceedBtnDisabled: true
                            };
                        } else if (this.nonAssocationDetails.updateList[0].nonAssocationData !== null){
                            labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                            };
                        } else if(this.nonAssocationDetails.updateList[0].gangConflitData !== null){
                            labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                            };
                        } 
                        
                        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.save();
                            } else {
                                return;
                            }
                        });
                    } else {
                        return;
                    }
                });
            }
            else {
                const labelMsg = {
                    label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.insertList[0].lastName + ',' + this.nonAssocationDetails.insertList[0].firstName + ',' + this.nonAssocationDetails.insertList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.insertList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.insertList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                };
                
                this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                    if (result) {
                        const  labelMsg = {
                            label: this.offenderMsg.replace('The selected offender', 'The selected offender' + ' ' + this.nonAssocationDetails.updateList[0].lastName + ',' + this.nonAssocationDetails.updateList[0].firstName + ',' + this.nonAssocationDetails.updateList[0].offenderIdDisplay)
                            + '\nINDIVIDUAL NON-ASSOCIATION CONFLICTS:\n' + this.nonAssocationDetails.updateList[0].nonAssocationData + '\n\nGANG NON-ASSOCIATION CONFLICTS:\n'+ this.nonAssocationDetails.updateList[0].gangConflitData + '\n\n' + updateLoc, yesBtn: this.allowUpdateLoc, proceedWithNoConflictsBtn: false, cancelBtn: true,
                            proceedBtnDisabled: true
                        };
                        
                        this.dialogService.openLinkDialog('/OCUNAWRN', labelMsg, 50).subscribe(result => {
                            if (result) {
                                this.save();
                            } else {
                                return;
                            }
                        });
                    } else {
                        return;
                    }
                });
            }
        });

    }

    save(){
        const voffbkgSaveData = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
        voffbkgSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.vHeaderBlockModelTemp = new VHeaderBlock();
                this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                offbkGlobal.subscribe(list => {
                    if (list.length > 0) {
                        this.vHeaderBlockModel = list[0];
                        this.offenderSearchService.selectedOffender = list[0];
                    }
                });*/
                this.voffbkgModel = new VHeaderBlock();
                this.voffbkgData = [];
                this.display = true;
                this.nextFlag = true;
                this.prevFlag = true;
                this.retrieveFlag = false;
                this.clearFlag = false;
                this.offenderSelectFlag = false;
                return;
            } else if (data === 0) {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.voffbkgModel = new VHeaderBlock();
                this.voffbkgData = [];
                this.display = true;
                this.nextFlag = true;
                this.prevFlag = true;
                this.retrieveFlag = false;
                this.clearFlag = false;
                this.offenderSelectFlag = false;
                return;
            } else {
                this.strMessage = undefined;
                if (data === 100) {
                    this.strMessage = this.translateService.translate('oidehloc.yoccannotchange')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.details');
                    this.show(this.strMessage, 'error');
                    return;
                }
                if (data === 101) {
                    this.strMessage = this.translateService.translate('oidehloc.yoccannotchange')
                     + ' ' + this.voffbkgModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.details');
                    this.show(this.strMessage, 'error');
                    return;
                }
                if (data === 102) {
                    this.strMessage = this.translateService.translate('oidehloc.nonassociation')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.nonassociationoff');
                    this.show(this.strMessage, 'error');
                    return;
                }
                if (data === 103) {
                    this.strMessage = this.translateService.translate('oidehloc.nonassociation')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.nonassociationproceedoff');

                    const displayLabel = {
                        label: this.strMessage, yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', displayLabel, 50).subscribe(result => {
                        if (!result) {
                            this.retrieveFlag = false;
                            this.clearFlag = false;
                            this.display = false;
                            return;
                        } else {
                            this.display = true;
                            this.voffbkgModel.nbtNonAssBProceed = true;
                            this.voffbkgModel.isNonAssocOverriddenWarn='Y';
                            this.voffbkgModel.notification=this.strMessage;
                            this.voffbkgCommitModel.updateList = [];
                            this.voffbkgUpdatetList = [];
                            this.voffbkgUpdatetList.push(this.voffbkgModel);
                            this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                            const voffbkgSaveDataBkg = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                            voffbkgSaveDataBkg.subscribe(resultcode => {
                                if (resultcode === 1) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                                    this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                                    /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });*/
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                } else if (resultcode === 0) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                }
                                this.resultcodes = resultcode;

                                if (this.resultcodes === 104) {
                                    this.voffbkgModel.nbtNonAssBProceed = false;
                                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                                        + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                                    this.show(this.strMessage, 'error');
                                    return;
                                }
                                if (this.resultcodes === 106) {
                                    this.voffbkgModel.nbtNonAssBProceed = false;
                                    this.voffbkgModel.nbtChkSecBProceed = false;
                                    this.strMessage = this.translateService.translate('oidehloc.nonassociation')
                                    + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                                        + '    ' + this.translateService.translate('oidehloc.nonassociationoff');
                                    this.show(this.strMessage, 'error');
                                    return;
                                }
                                if (this.resultcodes === 108) {
                                    this.voffbkgModel.nbtNonAssBProceed = false;
                                    this.voffbkgModel.nbtChkSecBProceed = false;
                                    this.voffbkgModel.nbtNonAssVProceed = false;
                                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                                        + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                                    this.show(this.strMessage, 'error');
                                    return;
                                }
                                if (this.resultcodes === 105) {
                                    this.resultCodesOneZeroFive();
                                }
                                if (this.resultcodes === 107) {
                                    this.resultCodesOneZeroSeven();
                                }
                                if (this.resultcodes === 109) {
                                    this.resultCodesOneZeroNine();
                                }
                            });
                        }
                    });
                }
                if (data === 104 || this.resultcodes === 104) {
                    this.voffbkgModel.nbtNonAssBProceed = false;
                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                    this.show(this.strMessage, 'error');
                    return;
                }
                if (data === 105 || this.resultcodes === 105) {
                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.securitychkproceed');
                    const securitylabel = {
                        label: this.strMessage, yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', securitylabel, 50).subscribe(result => {
                        if (!result) {
                            this.retrieveFlag = false;
                            this.clearFlag = false;
                            this.display = false;
                            this.offenderSelectFlag = false;
                            this.voffbkgModel.nbtNonAssBProceed = false;
                            return;
                        } else {
                            this.display = true;
                            this.voffbkgModel.nbtChkSecBProceed = true;
                            this.voffbkgModel.notification=this.strMessage;
                            this.voffbkgCommitModel.updateList = [];
                            this.voffbkgUpdatetList = [];
                            this.voffbkgUpdatetList.push(this.voffbkgModel);
                            this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                            const voffbkgSaveDataSec = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                            voffbkgSaveDataSec.subscribe(resultsec => {
                                if (resultsec === 1) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                                     this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                                    /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });*/
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                } else if (resultsec === 0) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                }
                                this.resultcodes = resultsec;

                                if (this.resultcodes === 106) {
                                    this.voffbkgModel.nbtNonAssBProceed = false;
                                    this.voffbkgModel.nbtChkSecBProceed = false;
                                    this.strMessage = this.translateService.translate('oidehloc.nonassociation')
                                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                                     + '    ' + this.translateService.translate('oidehloc.nonassociationoff');
                                    this.show(this.strMessage, 'error');
                                    return;
                                }
                                if (this.resultcodes === 108) {
                                    this.voffbkgModel.nbtNonAssBProceed = false;
                                    this.voffbkgModel.nbtChkSecBProceed = false;
                                    this.voffbkgModel.nbtNonAssVProceed = false;
                                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                                     + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                                    this.show(this.strMessage, 'error');
                                    return;
                                }
                                if (this.resultcodes === 107) {
                                    this.resultCodesOneZeroSeven();
                                }
                                if (this.resultcodes === 109) {
                                    this.resultCodesOneZeroNine();
                                }
                            });
                        }
                    });
                }
                if (data === 106 || this.resultcodes === 106) {
                    this.voffbkgModel.nbtNonAssBProceed = false;
                    this.voffbkgModel.nbtChkSecBProceed = false;
                    this.strMessage = this.translateService.translate('oidehloc.nonassociation')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.nonassociationoff');
                    this.show(this.strMessage, 'error');
                    return;
                }
                if (data === 107 || this.resultcodes === 107) {
                    this.strMessage = this.translateService.translate('oidehloc.nonassociation') + ' ' + this.voffbkgModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.nonassociationproceedoff');
                    const nonassilabel = {
                        label: this.strMessage, yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', nonassilabel, 50).subscribe(result => {
                        if (!result) {
                            this.display = false;
                            this.retrieveFlag = false;
                            this.clearFlag = false;
                            this.offenderSelectFlag = false;
                            this.voffbkgModel.nbtChkSecBProceed = false;
                            this.voffbkgModel.nbtNonAssBProceed = false;
                            return;
                        } else {
                            this.display = true;
                            this.voffbkgModel.notification=this.strMessage;
                            this.voffbkgModel.nbtNonAssVProceed = true;
                            this.voffbkgCommitModel.updateList = [];
                            this.voffbkgUpdatetList = [];
                            this.voffbkgUpdatetList.push(this.voffbkgModel);
                            this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                            const voffbkgSaveDataNonAssi = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                            voffbkgSaveDataNonAssi.subscribe(resultnonassi => {
                                if (resultnonassi === 1) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                                     this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                } else if (resultnonassi === 0) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                }
                                this.resultcodes = resultnonassi;

                                if (this.resultcodes === 108) {
                                    this.voffbkgModel.nbtNonAssBProceed = false;
                                    this.voffbkgModel.nbtChkSecBProceed = false;
                                    this.voffbkgModel.nbtNonAssVProceed = false;
                                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                                     + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                                    this.show(this.strMessage, 'error');
                                    return;
                                }
                                if (this.resultcodes === 109) {
                                    this.resultCodesOneZeroNine();
                                }
                            });
                        }

                    });
                }
                if (data === 108 || this.resultcodes === 108) {
                    this.voffbkgModel.nbtNonAssBProceed = false;
                    this.voffbkgModel.nbtChkSecBProceed = false;
                    this.voffbkgModel.nbtNonAssVProceed = false;
                    this.strMessage = this.translateService.translate('oidehloc.securitychk')
                     + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                     + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                    this.show(this.strMessage, 'error');
                    return;
                }
                if (data === 109 || this.resultcodes === 109) {
                    this.strMessage = this.translateService.translate('oidehloc.securitychk') + ' ' + this.voffbkgModel.offenderIdDisplay
                        + '    ' + this.translateService.translate('oidehloc.securitychkproceed');
                    const labelsecchk = {
                        label: this.strMessage, yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', labelsecchk, 50).subscribe(result => {
                        if (!result) {
                            this.display = false;
                            this.retrieveFlag = false;
                            this.clearFlag = false;
                            this.offenderSelectFlag = false;
                            this.voffbkgModel.nbtChkSecBProceed = false;
                            this.voffbkgModel.nbtNonAssBProceed = false;
                            this.voffbkgModel.nbtNonAssVProceed = false;
                            return;
                        } else {
                            this.display = true;
                            this.voffbkgModel.notification=this.strMessage;
                            this.voffbkgModel.nbtChkSecVProceed = true;
                            this.voffbkgCommitModel.updateList = [];
                            this.voffbkgUpdatetList = [];
                            this.voffbkgUpdatetList.push(this.voffbkgModel);
                            this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                            const voffbkgSaveDataSecChk = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                            voffbkgSaveDataSecChk.subscribe(resultsecchk => {
                                if (resultsecchk === 1) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                                     this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                                    /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });*/
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                } else if (resultsecchk === 0) {
                                    this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                                    this.voffbkgModel = new VHeaderBlock();
                                    this.voffbkgData = [];
                                    this.display = true;
                                    this.nextFlag = true;
                                    this.prevFlag = true;
                                    this.retrieveFlag = false;
                                    this.clearFlag = false;
                                    this.offenderSelectFlag = false;
                                    return;
                                }
                            });
                        }

                    });
                }

            }
        });
        this.resultcodes = 0;
    }
    /** This function is called based on the result code before committing the record */
    resultCodesOneZeroFive() {
        this.strMessage = this.translateService.translate('oidehloc.securitychk') + ' ' + this.vHeaderBlockModel.offenderIdDisplay
            + '    ' + this.translateService.translate('oidehloc.securitychkproceed');
        const securitylabel = {
            label: this.strMessage, yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', securitylabel, 50).subscribe(result => {
            if (!result) {
                this.retrieveFlag = false;
                this.clearFlag = false;
                this.display = false;
                this.offenderSelectFlag = false;
                this.voffbkgModel.nbtNonAssBProceed = false;
                return;
            } else {
                this.display = true;
                this.voffbkgModel.nbtChkSecBProceed = true;
                this.voffbkgModel.notification=this.strMessage;
                this.voffbkgCommitModel.updateList = [];
                this.voffbkgUpdatetList = [];
                this.voffbkgUpdatetList.push(this.voffbkgModel);
                this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                const voffbkgSaveDataSec = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                voffbkgSaveDataSec.subscribe(resultsec => {
                    if (resultsec === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                         this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                                    /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });*/
                        this.voffbkgModel = new VHeaderBlock();
                        this.voffbkgData = [];
                        this.display = true;
                        this.nextFlag = true;
                        this.prevFlag = true;
                        this.retrieveFlag = false;
                        this.clearFlag = false;
                        this.offenderSelectFlag = false;
                        return;
                    } else if (resultsec === 0) {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                        this.voffbkgModel = new VHeaderBlock();
                        this.voffbkgData = [];
                        this.display = true;
                        this.nextFlag = true;
                        this.prevFlag = true;
                        this.retrieveFlag = false;
                        this.clearFlag = false;
                        this.offenderSelectFlag = false;
                        return;
                    }
                    this.resultcodes = resultsec;
                    if (this.resultcodes === 106) {
                        this.strMessage = this.translateService.translate('oidehloc.nonassociation')
                         + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                         + '    ' + this.translateService.translate('oidehloc.nonassociationoff');
                        this.show(this.strMessage, 'error');
                        return;
                    } else if (this.resultcodes === 108) {
                        this.voffbkgModel.nbtNonAssBProceed = false;
                        this.voffbkgModel.nbtChkSecBProceed = false;
                        this.voffbkgModel.nbtNonAssVProceed = false;
                        this.strMessage = this.translateService.translate('oidehloc.securitychk')
                         + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                         + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                        this.show(this.strMessage, 'error');
                        return;
                    } else if (this.resultcodes === 107) {
                        this.resultCodesOneZeroSeven();
                    } else if (this.resultcodes === 109) {
                        this.resultCodesOneZeroNine();
                    }
                });
            }
        });

    }
    /** This function is called based on the result code before committing the record */
    resultCodesOneZeroSeven() {
        this.strMessage = this.translateService.translate('oidehloc.nonassociation') + ' ' + this.voffbkgModel.offenderIdDisplay
            + '    ' + this.translateService.translate('oidehloc.nonassociationproceedoff');
        const nonassilabel = {
            label: this.strMessage, yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', nonassilabel, 50).subscribe(result => {
            if (!result) {
                this.display = false;
                this.retrieveFlag = false;
                this.clearFlag = false;
                this.offenderSelectFlag = false;
                this.voffbkgModel.nbtChkSecBProceed = true;
                this.voffbkgModel.nbtNonAssBProceed = false;
                return;
            } else {
                this.display = true;
                this.voffbkgCommitModel.insertList[0].notification=this.strMessage;
                this.voffbkgModel.nbtNonAssVProceed = true;
                this.voffbkgCommitModel.updateList = [];
                this.voffbkgUpdatetList = [];
                this.voffbkgUpdatetList.push(this.voffbkgModel);
                this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                const voffbkgSaveDataNonAssi = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                voffbkgSaveDataNonAssi.subscribe(resultnonassi => {
                    if (resultnonassi === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                         this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                                    /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });*/
                        this.voffbkgModel = new VHeaderBlock();
                        this.voffbkgData = [];
                        this.display = true;
                        this.nextFlag = true;
                        this.prevFlag = true;
                        this.retrieveFlag = false;
                        this.clearFlag = false;
                        this.offenderSelectFlag = false;
                        return;
                    } else if (resultnonassi === 0) {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                        this.voffbkgModel = new VHeaderBlock();
                        this.voffbkgData = [];
                        this.display = true;
                        this.nextFlag = true;
                        this.prevFlag = true;
                        this.retrieveFlag = false;
                        this.clearFlag = false;
                        this.offenderSelectFlag = false;
                        return;
                    }
                    this.resultcodes = resultnonassi;

                    if (this.resultcodes === 108) {
                        this.voffbkgModel.nbtNonAssBProceed = false;
                        this.voffbkgModel.nbtChkSecBProceed = false;
                        this.voffbkgModel.nbtNonAssVProceed = false;
                        this.strMessage = this.translateService.translate('oidehloc.securitychk')
                         + ' ' + this.vHeaderBlockModel.offenderIdDisplay
                         + '    ' + this.translateService.translate('oidehloc.securitychkoff');
                        this.show(this.strMessage, 'error');
                        return;
                    } else if (this.resultcodes === 109) {
                        this.resultCodesOneZeroNine();
                    }
                });
            }
        });

    }
    /** This function is called based on the result code before committing the record */
    resultCodesOneZeroNine() {
        this.strMessage = this.translateService.translate('oidehloc.securitychk') + ' ' + this.voffbkgModel.offenderIdDisplay
            + '    ' + this.translateService.translate('oidehloc.securitychkproceed');
        const labelsecchk = {
            label: this.strMessage, yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/oidehlocconfirmationpopup', labelsecchk, 50).subscribe(result => {
            if (!result) {
                this.display = false;
                this.retrieveFlag = false;
                this.clearFlag = false;
                this.offenderSelectFlag = false;
                this.voffbkgModel.nbtChkSecBProceed = false;
                this.voffbkgModel.nbtNonAssBProceed = false;
                this.voffbkgModel.nbtNonAssVProceed = false;
                return;
            } else {
                this.display = true;
                this.voffbkgCommitModel.insertList[0].notification=this.strMessage;
                this.voffbkgModel.nbtChkSecVProceed = true;
                this.voffbkgCommitModel.updateList = [];
                this.voffbkgUpdatetList = [];
                this.voffbkgUpdatetList.push(this.voffbkgModel);
                this.voffbkgCommitModel.updateList = this.voffbkgUpdatetList;
                const voffbkgSaveDataSecChk = this.oidehlocFactory.vOffBkgCommit(this.voffbkgCommitModel);
                voffbkgSaveDataSecChk.subscribe(resultsecchk => {
                    if (resultsecchk === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                         this.vHeaderBlockModelTemp = new VHeaderBlock();
                                    this.vHeaderBlockModelTemp.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
                                    this.vHeaderBlockModelTemp.agyLocId = this.vHeaderBlockModel.agyLocId;
                                    this.injectOffenderService.updateOffenderInContext(this.vHeaderBlockModel.offenderId);
                                    /*const offbkGlobal = this.osiosearFactory.offbkgGlobalQuery(this.vHeaderBlockModelTemp);
                                    offbkGlobal.subscribe(list => {
                                        if (list.length > 0) {
                                            this.vHeaderBlockModel = list[0];
                                            this.offenderSearchService.selectedOffender = list[0];
                                        }
                                    });*/
                        this.voffbkgModel = new VHeaderBlock();
                        this.voffbkgData = [];
                        this.display = true;
                        this.nextFlag = true;
                        this.prevFlag = true;
                        this.retrieveFlag = false;
                        this.clearFlag = false;
                        this.offenderSelectFlag = false;
                        return;
                    } else if (resultsecchk === 0) {
                        this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                        this.voffbkgModel = new VHeaderBlock();
                        this.voffbkgData = [];
                        this.display = true;
                        this.nextFlag = true;
                        this.prevFlag = true;
                        this.retrieveFlag = false;
                        this.clearFlag = false;
                        this.offenderSelectFlag = false;
                        return;
                    }
                });
            }
        });
    }

    syspflExecuteQuery() {
        const syspflResult = this.oidehlocFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(data => {
            if (data.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = data;
                this.syspflModel = data[0];
            }
        });
    }

    /*
        *  This event is used to set the Reason value in Schedule Court Movements Block.
        */
    onReasonChange() {
        this.clearFlag = false;
        this.voffbkgModel.nbtAssignReason = this.voffbkgModel.nbtAssignReason === undefined ? '' : undefined;
    }
    /** This function is called after name search dialog box closes */
    afterNamesDialogClose() {
        this.prevFlag = true;
        this.nextFlag = true;
        if (this.oidehlocFactory.nameLovData && this.oidehlocFactory.nameLovData.offenderIdDisplay) {
            this.retrieveFlag = true;
            if (this.oidehlocFactory.nameLovData.offenderIdDisplay) {
                this.offenderSelectFlag = false;
                this.voffbkgModel.offenderIdDisplay = this.oidehlocFactory.nameLovData.offenderIdDisplay;
                if (this.vHeaderBlockModel.offenderIdDisplay !== this.oidehlocFactory.nameLovData.offenderIdDisplay) {
                    if (this.oidehlocFactory.nameLovData.activeFlag === 'A') {
                        this.voffbkgModel.agyLocId = this.vHeaderBlockModel.agyLocId;
                        this.voffbkgModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                        this.voffbkgModel.offenderIdDisplay = this.voffbkgModel.offenderIdDisplay;
                        this.voffbkgModel.insertedFlag = false;
                        const voffbkgResult = this.oidehlocFactory.
                            vOffBkgExecuteQuery(this.voffbkgModel);
                        voffbkgResult.subscribe(voffbkgList => {
                            if (voffbkgList.length === 0) {
                                this.voffbkgData = [];
                                this.prevFlag = true;
                                this.nextFlag = true;
                                this.offenderSelectFlag = false;
                                this.retrieveFlag = false;
                                this.launchFlag = false;
                                this.oidehlocFactory.nameLovData = undefined;
                                this.show(this.translateService.translate('oidehloc.querycaused'), 'warn');
                            } else {
                                this.voffbkgData = voffbkgList;
                                this.lstOfVHeader = voffbkgList;
                                this.voffbkgModel = voffbkgList[0];
                                this.launchFlag = true;
                                this.prevFlag = true;
                                this.display = false;
                                this.noneditfields = false;
                                this.offenderSelectFlag = true;
                                this.retrieveFlag = false;
                                this.clearFlag = false;
                                if (voffbkgList.length > 1) {
                                    this.nextFlag = false;
                                }
                                this.oidehlocFactory.nameLovData = undefined;
                            }
                        });
                    } else {
                        this.retrieveFlag = false;
                        this.launchFlag = false;
                        this.oidehlocFactory.nameLovData = undefined;
                    }
                } else {
                    this.retrieveFlag = false;
                    this.launchFlag = false;
                    this.show(this.translateService.translate('oidehloc.querycaused'), 'error');
                    this.oidehlocFactory.nameLovData = undefined;
                }
            }
        } else {
            this.retrieveFlag = false;
            this.launchFlag = false;
            this.oidehlocFactory.nameLovData = undefined;
        }
    }
    ngOnDestroy() {
    }
   

    
}

