import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OciiplanService } from '../service/ociiplan.service';
import { CasePlans } from '@inst/casemanagement/beans/CasePlans';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Router } from '@angular/router';
import { OcdiplanService } from '@inst/casemanagement/service/ocdiplan.service';
import { VHeaderBlock } from '@common/beans/VHeaderBlock';

@Component({
    selector: 'app-ociiplan',
    templateUrl: './ociiplan.component.html'
})

export class OciiplanComponent implements OnInit {
    // Variable declaration
    msgs: any[] = [];
    caseplansData: CasePlans[] = [];
    caseplansModel: CasePlans = new CasePlans();
    @ViewChild('ociiplanForm', {static: true}) form: any;
    casePlansColumnDef: any[];
    comunityLoc = 'None';
    custLoc = 'None';
    selected = -1;
    selectedRow: any;
    clearFlag = true;
    disableGoBut: boolean;
    descriptionReadonly: boolean;
    verfiedTitle = { 'description': 'Verified' };
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    constructor(private ociiplanFactory: OciiplanService,
        private ocdiplanFactory: OcdiplanService,
        private sessionManager: UserSessionManager,
        private translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private router: Router) {
        this.casePlansColumnDef = [];
    }
    ngOnInit() {
        this.disableGoBut = false;
        this.custLoc = 'ociiplan/rgInstAgyLocRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        this.comunityLoc = '/ociiplan/comInstAgyLocRecordGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        this.caseplansModel.verifiedFlag = 'Both';
        if (this.ocdiplanFactory.butExitCasePlanFlag) {
            this.ocdiplanFactory.butExitCasePlanFlag = false;
            this.ok();
        }
        this.casePlansColumnDef = [
            { fieldName: this.trMsg('ociiplan.offender'), field: 'offenderName', editable: false, width: 150 },
            { fieldName: this.trMsg('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.custodiallocation'), field: 'instCalAgyLocId', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.cpowner'), field: 'cpOwnerName', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.cnofficer'), field: 'instStaffName', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.communityloc'), field: 'calAgyLocId', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.officer'), field: 'commStaffName', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.nextreviewdate'), field: 'nextReviewDate', datatype: 'date', editable: false, width: 150 },
            { fieldName: this.trMsg('common.verified'), field: 'verifiedFlag', datatype: 'checkbox', editable: false, width: 150 },
            { fieldName: this.trMsg('ociiplan.lastPcoCaseNote'), field: 'lastPcoDate', datatype: 'date', editable: false, width: 150 },

        ];

        this.form.valueChanges.subscribe(data => {
           /*  if (this.caseplansData.length > 0) {
                this.caseplansData = [];
            } */
            const keys = Object.keys(data);
            const validator = { validate: true, count: 0 };
            do {
                if (data[keys[validator.count]]) {
                    if (keys[validator.count] === 'selverified') {
                        if (data[keys[validator.count]] !== 'Both') {
                            validator.validate = true;
                            this.clearFlag = false;
                            validator.count++;
                        } else {
                            validator.validate = false;
                            this.clearFlag = true;
                        }

                    } else {
                        validator.validate = false;
                        this.clearFlag = false;
                    }
                } else {
                    this.clearFlag = true;
                    validator.count++;
                }
            } while (validator.validate && validator.count < keys.length);
        });
        setTimeout(ele => {
        if (this.ociiplanFactory.caseplansData.length > 0) {
                this.caseplansModel = this.ociiplanFactory.caseplansModel;
                // this.caseplansData = this.ociiplanFactory.caseplansData;
                this.caseplansExecuteQuery();
                this.ociiplanFactory.caseplansData = [];
                this.ociiplanFactory.caseplansModel = new CasePlans();
        }
    }, 10);

    }
    onRowClickcaseplans(event) {
        this.selectedRow = event;
    }

    get disabledCasePlan() {
        if (this.caseplansData.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    onButCasePlanclick() {
        if (this.selectedRow) {
            const caseLoadType = this.sessionManager.currentCaseLoadType;
            this.ociiplanFactory.ociiplanTagMainGetOffender(this.sessionManager.currentCaseLoad,
                 caseLoadType, this.selectedRow.offenderIdDisplay)
                .subscribe(data => {
                    if (!data) {
                        this.show('ociiplan.youcannotaccess');
                        this.ociiplanFactory.butExitCasePlanFlag = false;
                        return;
                    } else {
                        /* const offender = { offenderIdDisplay: this.selectedRow.offenderIdDisplay,
                             offenderBookId: this.selectedRow.offenderBookId, }; */
                            this.vHeaderBlockModel = new VHeaderBlock();
		                    this.vHeaderBlockModel.offenderIdDisplay = this.selectedRow.pOffenderIdDisplay;
		                    this.vHeaderBlockModel.offenderBookId = this.selectedRow.offenderBookId;
		                    this.vHeaderBlockModel.agyLocId = this.sessionManager.currentCaseLoad;
                        this.ociiplanFactory.offbkgGlobalQuery(this.vHeaderBlockModel).subscribe(resData => {
                            if (resData) {
                                this.vHeaderBlockModel = resData[0];
                                this.offenderSearchService.selectedOffender = this.vHeaderBlockModel;
                                this.ociiplanFactory.caseplansModel = this.caseplansModel;
                                this.ociiplanFactory.caseplansData = this.caseplansData;
                                this.ociiplanFactory.selectedRow = this.caseplansData.indexOf(this.selectedRow);
                                this.ociiplanFactory.butExitCasePlanFlag = true;
                                this.router.navigate(['/OCDIPLAN']);
                            }
                        });
                    }
                });
        } else {
            this.show('ociiplan.pleaseselectanoffenerfirst');
            this.ociiplanFactory.butExitCasePlanFlag = false;
            return;
        }
    }
    ok() {
        this.caseplansExecuteQuery();
        this.disableGoBut = true;
    }
    no() {
        this.caseplansModel = new CasePlans();
        this.caseplansModel.calAgyLocId = this.caseplansModel.calAgyLocId === undefined ? '' : undefined;
        this.caseplansModel.instCalAgyLocId = this.caseplansModel.instCalAgyLocId === undefined ? '' : undefined;
        this.caseplansModel.verifiedFlag = 'Both';
        this.caseplansData = [];
        this.selectedRow = undefined;
        this.selected = -1;
        this.disableGoBut = false;
        this.descriptionReadonly = false;
        this.caseplansModel.verifiedFlag=undefined;
    }
    clearDisableFun() {
        if (this.caseplansModel.fromDate ||
            this.caseplansModel.nextReviewDate ||
            this.caseplansModel.calAgyLocId ||
            this.caseplansModel.instCalAgyLocId ||
            this.caseplansModel.verifiedFlag || this.caseplansData.length>0) {
            return false;
        }
        return true;
    }

    
    cancel() {

       /*  if (this.caseplansData.length > 0) {
            this.caseplansData = [];
        } */

        if (!this.caseplansModel.fromDate) {
            this.caseplansModel.fromDate = this.caseplansModel.fromDate === undefined ? null : undefined;
        }

        if (!this.caseplansModel.nextReviewDate) {
            this.caseplansModel.nextReviewDate = this.caseplansModel.nextReviewDate === undefined ? null : undefined;
        }

        if (!this.caseplansModel.calAgyLocId) {
            this.caseplansModel.calAgyLocId = this.caseplansModel.calAgyLocId === undefined ? '' : undefined;
        }

        if (!this.caseplansModel.instCalAgyLocId) {
            this.caseplansModel.instCalAgyLocId = this.caseplansModel.instCalAgyLocId === undefined ? '' : undefined;
        }

        if (!this.caseplansModel.verifiedFlag) {
            this.caseplansModel.verifiedFlag = this.caseplansModel.verifiedFlag === undefined ? '' : undefined;
        }


    }
    onOffenderChange(offender) {
    }
    caseplansExecuteQuery() {
        const caseplansResult = this.ociiplanFactory.
            casePlansExecuteQuery(this.caseplansModel);
        caseplansResult.subscribe(caseplansResultList => {
            if (caseplansResultList.length === 0) {
                this.caseplansData = [];
                this.show('common.querycaused');
                this.disableGoBut=false;
                // this.descriptionReadonly = true;
            } else {
                caseplansResultList.forEach(element => {
                    element.verifiedFlag = element.verifiedFlag === 'Y' ? element.verifiedFlag : null;
                });
                this.caseplansData = caseplansResultList;
                if (this.ociiplanFactory.selectedRow) {
                    this.selected = this.ociiplanFactory.selectedRow;
                    this.ociiplanFactory.selectedRow = 0;
                } else {
                this.selected = 0;
                }
                this.clearFlag = false;
                this.descriptionReadonly = true;
            }
        });
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    trMsg(msg, astr?) {
        return astr ? this.translateService.translate(msg).concat(astr) : this.translateService.translate(msg);
    }

    checkVal(event) {
        if (event && event.innerOptions) {
            if (event.innerOptions.length === 0) {
               // this.show('List of Values contains no entries.');
            }
        }
    }

    nextReviewDateFromKeyListvalTrigger() {
    }

    nextReviewDateFromToKeyListvalTrigger() {
    }

    nbtComLocDescWhenValidateItemTrigger() {

    }

    comLocLovWhenButtonPressedTrigger() {
    }

    nbtInstLocDescWhenValidateItemTrigger() {
    }

    instLocLovWhenButtonPressedTrigger() {
    }

    verifiedLovWhenButtonPressedTrigger() {
    }

    ctlBlkOnErrorTrigger() {
    }

    ctlBlkKeyExeqryTrigger() {
    }

    ctlBlkKeyEntqryTrigger() {
    }

    ctlBlkWhenNewBlockInstanceTrigger() {
    }

    butCasePlanWhenButtonPressedTrigger() {
    }

    casePlansOnErrorTrigger() {
    }

    casePlansPreQueryTrigger() {
    }

    casePlansPostQueryTrigger() {
    }

    casePlansKeyEntqryTrigger() {
    }

    casePlansKeyExeqryTrigger() {
    }

    butOffendersWhenButtonPressedTrigger() {
    }

    butOffendersKeyNextItemTrigger() {
    }

    butOffendersKeyPrevItemTrigger() {
    }

    butWorksWhenButtonPressedTrigger() {
    }

    butWorksKeyNextItemTrigger() {
    }

    butWorksKeyPrevItemTrigger() {
    }

    butCalendarWhenButtonPressedTrigger() {
    }

    butCalendarKeyNextItemTrigger() {
    }

    butCalendarKeyPrevItemTrigger() {
    }

    butOffUpdatesWhenButtonPressedTrigger() {
    }

    butOffUpdatesKeyNextItemTrigger() {
    }

    butOffUpdatesKeyPrevItemTrigger() {
    }

    butDetailWhenButtonPressedTrigger() {
    }

    butDetailKeyNextItemTrigger() {
    }

    butDetailKeyPrevItemTrigger() {
    }

    mymenuOnErrorTrigger() {
    }

    ociiplanI___itemTrigger() {
    }

    ociiplanKeyListvalTrigger() {
    }

    ociiplanWhenButtonPressedTrigger() {
    }

    ociiplanI_navigateTrigger() {
    }

    ociiplanKeyExitTrigger() {
    }

    ociiplanKeyNxtblkTrigger() {
    }

    ociiplanKeyPrvblkTrigger() {
    }

    ociiplanPostFormTrigger() {
    }

    ociiplanPreBlockTrigger() {
    }

    ociiplanPreFormTrigger() {
    }

    ociiplanPreTextItemTrigger() {
    }

    ociiplanPostTextItemTrigger() {
    }

    ociiplanWhenNewRecordInstanceTrigger() {
    }

    ociiplanWhenNewFormInstanceTrigger() {
    }

    ociiplanWhenNewBlockInstanceTrigger() {
    }

    ociiplanWhenNewItemInstanceTrigger() {
    }

    ociiplanI____queryTrigger() {
    }

    ociiplanKeyEntqryTrigger() {
    }

    ociiplanKeyExeqryTrigger() {
    }

    ociiplanPostQueryTrigger() {
    }

    ociiplanPreQueryTrigger() {
    }

    ociiplanITransactionalTrigger() {
    }

    ociiplanKeyCommitTrigger() {
    }

    ociiplanOnInsertTrigger() {
    }

    ociiplanOnUpdateTrigger() {
    }

    ociiplanPreInsertTrigger() {
    }

    ociiplanPreUpdateTrigger() {
    }

    ociiplanIValidationTrigger() {
    }

    ociiplanOnErrorTrigger() {
    }

    ociiplanWhenValidateItemTrigger() {
    }

    ociiplanWhenValidateRecordTrigger() {
    }

    ociiplanI__variousTrigger() {
    }

    ociiplanKeyHelpTrigger() {
    }

    ociiplanI__windowTrigger() {
    }

    ociiplanWhenWindowActivatedTrigger() {
    }

    ociiplanWhenWindowClosedTrigger() {
    }

    ociiplanOnMessageTrigger() {
    }

    ociiplanPostDatabaseCommitTrigger() {
    }
    /*
     * This function executed when cgte$checkConstraintVio
    * fired
    */
    cgte$checkConstraintVio() {
    }

    /*
     * This function executed when createLibraryGlobals
    * fired
    */
    createLibraryGlobals() {
    }

    /*
     * This function executed when checkBlockErrors
    * fired
    */
    checkBlockErrors() {
        // ;
    }

    /*
     * This function executed when defineWhereClause
    * fired
    */
    defineWhereClause() {
    }

    /*
     * This function executed when exeqryValidation
    * fired
    */
    exeqryValidation() {
    }

    /*
     * This function executed when createLibraryGlobalsBak
    * fired
    */
    createLibraryGlobalsBak() {
    }

}
