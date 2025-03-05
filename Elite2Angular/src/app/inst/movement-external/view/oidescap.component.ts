import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidescapService } from '@inst/movement-external/service/oidescap.service';
import { OffenderEscapes } from '@instmovementexternalbeans/OffenderEscapes';
import { OffenderEscapesCommitBean } from '@instmovementexternalbeans/OffenderEscapesCommitBean';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { OmuerrcoService } from '@inst/movement-external/service/omuerrco.service';
import { TimeFormat } from '@ui-components/time/timeFormat';
import { Router } from '@angular/router';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-oidescap',
    templateUrl: './oidescap.component.html'
})

export class OidescapComponent implements OnInit, OnDestroy {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offescData: OffenderEscapes[] = [];
    offescDataTemp: OffenderEscapes[] = [];
    offescModel: OffenderEscapes = new OffenderEscapes();
    voffescModel: OffenderEscapes = new OffenderEscapes();
    offescIndex = 0;
    offescInsertList: OffenderEscapes[] = [];
    offescUpdateList: OffenderEscapes[] = [];
    offescDeleteList: OffenderEscapes[] = [];
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
    disabled: boolean;
    editable = true;
    vhbColumnDef: any[];
    ctlLstColumnDef: any[];
    offAllSchColumnDef: any[];
    ctlUnColumnDef: any[];
    ctlBlkReadOnly = false;
    ctlLstReadOnly = false;
    ctlUnReadOnly = false;
    titleBlockReadOnly = false;
    offRelDetailsReadOnly = false;
    queryCtrlReadOnly = false;
    batchAddReadOnly = false;
    offAllSchReadOnly = false;
    cancelReadOnly = false;
    qryBlkReadOnly = false;
    vhbReadOnly = false;
    commonBlkReadOnly = false;
    dummyBlkReadOnly = false;
    offEscReadOnly = false;
    sysPflReadOnly = false;
    cgfkOffEscEscapeAgyLocIdRg: any[] = [];
    cgfkOffEscEscapeEscortCodRg: any[] = [];
    cgfkOffEscEscapeCircumstanRg: any[] = [];
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    offenderObj: Offenders = new Offenders();
    nextFlag: boolean;
    prevFlag: boolean;
    offescCommitModel: OffenderEscapesCommitBean = new OffenderEscapesCommitBean();
    cgfkOffescsecuritybreachcRg: any[] = [];
    cgfkOffescarrestagycodeRg: any[] = [];
    lstOfOffEsc: OffenderEscapes[];
    index = 0;
    recordSaved: boolean;
    verifySave: boolean;
    saveFlag: boolean;
    escapeAgyFlag: boolean;
    escapeEscortFlag = false;
    escapeCircumFlag = false;
    recordCompletionFlag = false;
    addFlag: boolean;
    maxEscapeDate: any;
    deleteFlag: boolean;
    clearFlag: boolean;
    recordOf: string;
    custodyTitle = { code: 'From Custody:', description: 'Description' };
    locnTitle = { code: 'From Locn:', description: 'Description:' };
    circumstanceTitle = { code: 'Circumstance:', description: 'Description' };
    constructor(private oidescapFactory: OidescapService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private omuerrcoFactory: OmuerrcoService, private router: Router,
        public dialogService: DialogService) {
        this.vhbColumnDef = [];
        this.ctlLstColumnDef = [];
        this.offAllSchColumnDef = [];
        this.ctlUnColumnDef = [];
        this.lstOfOffEsc = [];


    }

    ngOnInit() {
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.nextFlag = true;
        this.prevFlag = true;
        this.display = true;
        this.recordSaved = false;
        this.verifySave = false;
        this.escapeAgyFlag = false;
        this.addFlag = true;
        this.deleteFlag = true;
        this.clearFlag = true;
        const cgfkOffescescapeagylocidServiceObj = this.oidescapFactory.cgfkOffEscEscapeAgyLocIdRecordGroup();
        cgfkOffescescapeagylocidServiceObj.subscribe(cgfkOffEscEscapeAgyLocIdList => {
            if (cgfkOffEscEscapeAgyLocIdList.length === 0) {
                this.cgfkOffEscEscapeAgyLocIdRg = [];
            } else {
                for (let i = 0; i < cgfkOffEscEscapeAgyLocIdList.length; i++) {
                    this.cgfkOffEscEscapeAgyLocIdRg.push({
                        'text':
                        cgfkOffEscEscapeAgyLocIdList[i].description, 'id': cgfkOffEscEscapeAgyLocIdList[i].code
                    });
                }
            }
        });
        const cgfkOffescescapeescortcodServiceObj = this.oidescapFactory.cgfkOffEscEscapeEscortCodRecordGroup();
        cgfkOffescescapeescortcodServiceObj.subscribe(cgfkOffEscEscapeEscortCodList => {
            if (cgfkOffEscEscapeEscortCodList.length === 0) {
                this.cgfkOffEscEscapeEscortCodRg = [];
            } else {
                for (let i = 0; i < cgfkOffEscEscapeEscortCodList.length; i++) {
                    this.cgfkOffEscEscapeEscortCodRg.push({
                        'text':
                        cgfkOffEscEscapeEscortCodList[i].description, 'id': cgfkOffEscEscapeEscortCodList[i].code
                    });
                }
            }
        });
        const cgfkOffescescapecircumstanServiceObj = this.oidescapFactory.cgfkOffEscEscapeCircumstanRecordGroup();
        cgfkOffescescapecircumstanServiceObj.subscribe(cgfkOffEscEscapeCircumstanList => {
            if (cgfkOffEscEscapeCircumstanList.length === 0) {
                this.cgfkOffEscEscapeCircumstanRg = [];
            } else {
                for (let i = 0; i < cgfkOffEscEscapeCircumstanList.length; i++) {
                    this.cgfkOffEscEscapeCircumstanRg.push({
                        'text':
                        cgfkOffEscEscapeCircumstanList[i].description, 'id': cgfkOffEscEscapeCircumstanList[i].code
                    });
                }
            }
        });

        const cgfkOffescsecuritybreachcServiceObj = this.oidescapFactory.cgfkOffEscSecurityBreachCRecordGroup();
        cgfkOffescsecuritybreachcServiceObj.subscribe(cgfkOffescsecuritybreachcList => {
            if (cgfkOffescsecuritybreachcList.length === 0) {
                this.cgfkOffescsecuritybreachcRg = [];
            } else {
                for (let i = 0; i < cgfkOffescsecuritybreachcList.length; i++) {
                    this.cgfkOffescsecuritybreachcRg.push({
                        'text':
                        cgfkOffescsecuritybreachcList[i].description, 'id': cgfkOffescsecuritybreachcList[i].code
                    });
                }
            }
        });
        const cgfkOffescarrestagycodeServiceObj = this.oidescapFactory.cgfkOffEscArrestAgyCodeRecordGroup();
        cgfkOffescarrestagycodeServiceObj.subscribe(cgfkOffescarrestagycodeList => {
            if (cgfkOffescarrestagycodeList.length === 0) {
                this.cgfkOffescarrestagycodeRg = [];
            } else {
                for (let i = 0; i < cgfkOffescarrestagycodeList.length; i++) {
                    this.cgfkOffescarrestagycodeRg.push({
                        'text':
                        cgfkOffescarrestagycodeList[i].description, 'id': cgfkOffescarrestagycodeList[i].code
                    });
                }
            }
        });
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.offescModel = new OffenderEscapes();
            this.offescModel.record = 1;
            this.offescModel.totalRecords = 1;
            this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }

    }

    cancel() {
        this.offescData = [];
        this.prevFlag = true;
        this.nextFlag = true;
        this.display = false;
        this.saveFlag = true;
        this.lstOfOffEsc = [];
        this.index = 0;
        this.offescIndex = 0;
        this.voffescModel = new OffenderEscapes();
        this.offescModel = new OffenderEscapes();
        this.offescModel.record = 1;
        this.offescModel.totalRecords = 1;
        this.offescModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
        this.lstOfOffEsc.push(this.offescModel);
        this.verifySave = false;
        this.escapeAgyFlag = false;
        this.escapeEscortFlag = false;
        this.escapeCircumFlag = false;
        this.addFlag = false;
        this.offescDeleteList = [];
        this.deleteFlag = true;
        this.clearFlag = false;

    }


    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    isInsertable() {
        this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
        return false;
    }

    checkToSaveInsert() {
        this.verifySave = true;
        this.saveFlag = false;
        this.offescModel.updatedFlag = 'updated';
    }

    cannotUpdate(event) {
        this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
        return false;
    }
    keyPressTimes() {
        this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
        return false;
    }
    inCompanyFlagWhenCheckboxChangedTrigger(event) {
        if (this.voffescModel.escapeId) {
            if (this.verifySave) {
                this.saveFlag = false;
                this.offescModel.updatedFlag = 'updated';
            } else {
                this.verifySave = true;
                this.offescModel.updatedFlag = 'updated';
                this.saveFlag = false;
            }

        }
    }
    addOffenderEscapeRecord() {
        if(this.vHeaderBlockModel && this.vHeaderBlockModel.statusDisplay === '[Closed]' || this.vHeaderBlockModel.statusDisplay ===  'Inactive'){
            this.show(this.translateService.translate('common.youcannotcreaterecordshere'), 'warn');
            return;
        }

        if (!this.offescModel.escapeDate && !this.offescModel.escapeTime && !this.offescModel.escapeId) {
            this.show(this.translateService.translate('oidescap.enterorremoved'), 'warn');
            return;
        }
        if (!this.offescModel.escapeDate || !this.offescModel.escapeTime) {
            this.show(this.translateService.translate('oidescap.escapedatetime'), 'info');
            return false;
        }
        if (this.saveFlag) {
            this.saveFlag = true;
        } else {
            this.saveFlag = false;
        }
        this.escapeCircumFlag = false;
        this.escapeEscortFlag = false;
        this.escapeAgyFlag = false;
        this.offescModel = new OffenderEscapes();
        this.offescModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const totalLen = this.lstOfOffEsc.length;
        this.offescModel.record = totalLen + 1;
        this.offescModel.totalRecords = totalLen + 1;
        this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
        this.escapeCircumFlag = false;
        this.escapeEscortFlag = false;
        this.escapeAgyFlag = false;
        if (!this.offescModel.escapeAgyLocId) {
            this.escapeAgyFlag = true;
        }
        if (!this.offescModel.escapeEscortCode) {
            this.escapeEscortFlag = true;
        }
        if (!this.offescModel.escapeCircumstanceCode) {
            this.escapeCircumFlag = true;
        }
        this.lstOfOffEsc.push(this.offescModel);
        this.addFlag = false;
        this.deleteFlag = false;
        this.offescIndex = totalLen;
        if (this.lstOfOffEsc.length > 1) {
            this.prevFlag = false;
        }
    }
    /*
     * This method used to get the data from SearchBlock
     *
     */
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offenderObj.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offenderObj.offenderId = this.vHeaderBlockModel.offenderId;
            this.vHeaderBlockOffender = this.vHeaderBlockModel;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.display = false;
                this.saveFlag = true;
                this.verifySave = false;
                this.escapeAgyFlag = false;
                this.escapeEscortFlag = false;
                this.escapeCircumFlag = false;
                this.offescDeleteList = [];
                this.lstOfOffEsc = [];
                this.deleteFlag = true;
                this.offescExecuteQuery();
            }
        } else {
            this.lstOfOffEsc = [];
            this.offescData = [];
            this.offescModel = new OffenderEscapes();
            this.prevFlag = true;
            this.nextFlag = true;
            this.display = true;
            this.saveFlag = true;
            this.offescIndex = 0;
            this.offescModel.record = 1;
            this.offescModel.totalRecords = 1;
            this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
            this.verifySave = false;
            this.escapeAgyFlag = false;
            this.escapeEscortFlag = false;
            this.escapeCircumFlag = false;
            this.addFlag = false;
            this.maxEscapeDate = undefined;
            this.offescDeleteList = [];
            this.deleteFlag = true;

        }
    }

    offescExecuteQuery() {
        this.offescModel = new OffenderEscapes();
        this.voffescModel = new OffenderEscapes();
        this.offescModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offescModel.nbtOffenderId = this.vHeaderBlockModel.offenderId;
        this.offescModel.offenderIdDisplay = this.vHeaderBlockModel.offenderIdDisplay;
        this.offescIndex = 0;
        this.index = 0;
        this.addFlag = true;
        this.prevFlag = true;
        this.nextFlag = true;
        this.saveFlag = true;
        this.maxEscapeDate = undefined;
        this.lstOfOffEsc = [];
        const offescResult = this.oidescapFactory.offEscExecuteQuery(this.offescModel);
        offescResult.subscribe(offescResultList => {
            if (offescResultList.length === 0) {
                this.offescData = [];
                this.lstOfOffEsc = [];
                this.offescModel = new OffenderEscapes();
                this.offescModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offescModel.record = 1;
                this.offescModel.totalRecords = 1;
                this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
                this.escapeCircumFlag = false;
                this.escapeEscortFlag = false;
                this.escapeAgyFlag = false;
                this.maxEscapeDate = undefined;
                if (!this.offescModel.escapeAgyLocId) {
                    this.escapeAgyFlag = true;
                }
                if (!this.offescModel.escapeEscortCode) {
                    this.escapeEscortFlag = true;
                }
                if (!this.offescModel.escapeCircumstanceCode) {
                    this.escapeCircumFlag = true;
                }
                this.lstOfOffEsc.push(this.offescModel);
                this.addFlag = false;
                this.saveFlag = true;
                this.verifySave = false;
                this.deleteFlag = true;
                this.clearFlag = false;
            } else {
                this.addFlag = false;
                const totalLength = offescResultList.length;
                for (let i = 0; i < offescResultList.length; i++) {
                    offescResultList[i].inCompanyFlag = offescResultList[i].inCompanyFlag === 'Y' ? true : false;
                    offescResultList[i].adjustSentenceFlag = offescResultList[i].adjustSentenceFlag === 'Y' ? true : false;

                    if (offescResultList[i].securityBreachCode) {
                        const assignedSecBreach = this.cgfkOffescsecuritybreachcRg.find(security =>
                            security.id === offescResultList[i].securityBreachCode);
                        offescResultList[i].drvSecurityBreachCode = assignedSecBreach.text;
                    }
                    if (offescResultList[i].arrestAgyCode) {
                        const assignedArrest = this.cgfkOffescarrestagycodeRg.find(arrest =>
                            arrest.id === offescResultList[i].arrestAgyCode);
                        offescResultList[i].drvArrestAgyCode = assignedArrest.text;
                    }
                    if (offescResultList[i].escapeTime) {
                        offescResultList[i].escapeTime = DateFormat.getDate(offescResultList[i].escapeTime);
                    }
                    if (offescResultList[i].recpatureTime) {
                        offescResultList[i].recpatureTime = DateFormat.getDate(offescResultList[i].recpatureTime);
                    }
                    if (offescResultList[i].lastSeenTime) {
                        offescResultList[i].lastSeenTime = DateFormat.getDate(offescResultList[i].lastSeenTime);
                    }
                    if (offescResultList[i].readmissionTime) {
                        offescResultList[i].readmissionTime = DateFormat.getDate(offescResultList[i].readmissionTime);
                    }

                    offescResultList[i].updatedFlag = undefined;
                    offescResultList[i].datesModFlag = undefined;
                    offescResultList[i].returnFlag = undefined;
                }
                this.offescData = offescResultList;
                this.lstOfOffEsc = offescResultList;
                this.offescModel = offescResultList[0];
                this.voffescModel = offescResultList[0];
                this.escapeCircumFlag = false;
                this.escapeEscortFlag = false;
                this.escapeAgyFlag = false;
                if (!this.offescModel.escapeAgyLocId) {
                    this.escapeAgyFlag = true;
                }
                if (!this.offescModel.escapeEscortCode) {
                    this.escapeEscortFlag = true;
                }
                if (!this.offescModel.escapeCircumstanceCode) {
                    this.escapeCircumFlag = true;
                }
                if (offescResultList.length > 1) {
                    this.nextFlag = false;
                }

                this.offescModel.record = 1;
                this.offescModel.totalRecords = totalLength;
                this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
                this.verifySave = false;
                this.saveFlag = true;
                this.deleteFlag = false;
                this.clearFlag = false;

                const maxEscapeDate = this.oidescapFactory.getMaxEscapeDate(this.vHeaderBlockModel.offenderBookId);
                maxEscapeDate.subscribe(maxEscapeDateResult => {
                    if (maxEscapeDateResult !== null) {
                        this.maxEscapeDate = DateFormat.getDate(maxEscapeDateResult);
                    }
                });
            }

        });
    }

    oidescapDeleteoffescForm() {

        this.offescModel.updatedFlag = 'deleted';

        if (this.offescModel.escapeId) {
            this.verifySave = true;
            this.saveFlag = false;
            this.offescDeleteList.push(this.offescModel);
        }

        this.lstOfOffEsc.splice(this.offescIndex, 1);

        const totalLength = this.lstOfOffEsc.length;
        if (totalLength > 1 && this.offescIndex < totalLength) {
            this.index = this.index - 1;
            this.offescIndex = this.offescIndex - 1;
            this.butOffendersKeyNextItemTrigger();
        } else if (totalLength === 0) {
            this.offescModel = new OffenderEscapes();
            this.offescModel.record = this.offescIndex + 1;
            this.offescModel.totalRecords = this.offescIndex + 1;
            this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
            this.prevFlag = true;
            this.nextFlag = true;
        } else if (totalLength === 1) {
            this.offescIndex = 1;
            this.butOffendersKeyPrevItemTrigger();
        } else {
            this.butOffendersKeyPrevItemTrigger();
        }
    }

    butOffendersKeyNextItemTrigger() {
        if (this.lstOfOffEsc.length === 0) {
            return;
        }
        if (!this.offescModel.escapeDate && !this.offescModel.escapeTime && this.offescModel.escapeId) {
            this.show(this.translateService.translate('oidescap.enterorremoved'), 'warn');
            return;
        } else {
            this.voffescModel = this.lstOfOffEsc[this.offescIndex];
            if (this.voffescModel && !this.voffescModel.escapeDate && !this.voffescModel.escapeTime && this.voffescModel.escapeId) {
                this.show(this.translateService.translate('oidescap.enterorremoved'), 'warn');
                return;
            }
        }
        if (this.offescModel.escapeId && (!this.offescModel.escapeDate || !this.offescModel.escapeTime)) {
            this.show(this.translateService.translate('oidescap.escapedatetime'), 'info');
            return false;
        }
        if ((this.offescIndex) < this.lstOfOffEsc.length - 1) {
            this.offescIndex = this.index + 1;
            this.offescModel = this.lstOfOffEsc[this.offescIndex];
            this.offescModel.record = this.offescIndex + 1;
            this.offescModel.totalRecords = this.lstOfOffEsc.length;
            this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
            this.index = this.index + 1;
            this.prevFlag = false;
            if (this.saveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            this.escapeCircumFlag = false;
            this.escapeEscortFlag = false;
            this.escapeAgyFlag = false;
            if (!this.offescModel.escapeAgyLocId) {
                this.escapeAgyFlag = true;
            }
            if (!this.offescModel.escapeEscortCode) {
                this.escapeEscortFlag = true;
            }
            if (!this.offescModel.escapeCircumstanceCode) {
                this.escapeCircumFlag = true;
            }
        } else {
            this.show(this.translateService.translate('common.lastrecordof'), 'warn');
            this.nextFlag = true;
            this.prevFlag = false;
        }

        if (this.offescModel.record === 1 && this.offescModel.totalRecords === 1) {
            this.nextFlag = true;
            this.prevFlag = true;
        }

    }

    butOffendersKeyPrevItemTrigger() {
        if (this.lstOfOffEsc.length === 0) {
            return;
        }
        if (!this.offescModel.escapeDate && !this.offescModel.escapeTime && this.offescModel.escapeId) {
            this.show(this.translateService.translate('oidescap.enterorremoved'), 'warn');
            return;
        } else {
            this.voffescModel = this.lstOfOffEsc[this.offescIndex];
            if (this.voffescModel && !this.voffescModel.escapeDate && !this.voffescModel.escapeTime && this.voffescModel.escapeId) {
                this.show(this.translateService.translate('oidescap.enterorremoved'), 'warn');
                return;
            }
        }
        if (this.offescModel.escapeId && (!this.offescModel.escapeDate || !this.offescModel.escapeTime)) {
            this.show(this.translateService.translate('oidescap.escapedatetime'), 'info');
            return false;
        }


        if (this.offescIndex >= 1) {
            this.offescIndex = this.offescIndex - 1;
            this.index = this.offescIndex;
            this.offescModel = this.lstOfOffEsc[this.offescIndex];
            this.offescModel.record = this.offescIndex + 1;
            this.offescModel.totalRecords = this.lstOfOffEsc.length;
            this.recordOf = this.offescModel.record + '/' +  this.offescModel.totalRecords;
            if (this.saveFlag) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            this.nextFlag = false;
            this.escapeCircumFlag = false;
            this.escapeEscortFlag = false;
            this.escapeAgyFlag = false;
            if (!this.offescModel.escapeAgyLocId) {
                this.escapeAgyFlag = true;
            }
            if (!this.offescModel.escapeEscortCode) {
                this.escapeEscortFlag = true;
            }

            if (!this.offescModel.escapeCircumstanceCode) {
                this.escapeCircumFlag = true;
            }
        } else {
            this.prevFlag = true;
            this.nextFlag = false;
            this.show(this.translateService.translate('common.atfirstrecord'), 'warn');
        }

        if (this.offescModel.record === 1 && this.offescModel.totalRecords === 1) {
            this.nextFlag = true;
            this.prevFlag = true;
        }
    }

       /**
    	 *  This function will be executed when commit event is
    	* fired
    	*/
    oidescapSaveoffescForm() {
        this.offescInsertList = [];
        this.offescUpdateList = [];
        this.offescCommitModel.insertList = [];
        this.offescCommitModel.updateList = [];
        this.offescCommitModel.deleteList = [];
        if (this.lstOfOffEsc.length > 0) {

            for (let i = 0; i < this.lstOfOffEsc.length; i++) {
                if (this.lstOfOffEsc[i].escapeId && this.lstOfOffEsc[i].updatedFlag && this.lstOfOffEsc[i].updatedFlag === 'updated') {
                    this.offescUpdateList.push(this.lstOfOffEsc[i]);
                } else if (!this.lstOfOffEsc[i].escapeId) {
                    this.offescInsertList.push(this.lstOfOffEsc[i]);
                }
            }

        }
        if (this.offescInsertList.length > 0) {
            for (let i = 0; i < this.offescInsertList.length; i++) {
                if (!this.offescInsertList[i].escapeDate && !this.offescInsertList[i].escapeTime) {
                    this.show(this.translateService.translate('oidescap.escapedatetime'), 'info');
                    return false;
                }
                if (!this.offescInsertList[i].escapeTime || !this.offescInsertList[i].escapeDate) {
                    this.show(this.translateService.translate('oidescap.timevalidation'), 'info');
                    return false;
                }
                this.offescInsertList[i].escapeDate = DateFormat.getDate(this.offescInsertList[i].escapeDate);
                if (this.maxEscapeDate === null || this.maxEscapeDate === undefined) {

                    if (DateFormat.compareDate(this.offescInsertList[i].escapeDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                        return false;
                    }
                } else {
                    if (DateFormat.getDate(this.offescInsertList[i].escapeDate) >= this.maxEscapeDate) {
                        this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                        return false;
                    }
                }
                if (DateFormat.compareDate(this.offescInsertList[i].escapeDate, DateFormat.getDate()) === 0) {
                    if (DateFormat.compareTime(this.offescInsertList[i].escapeTime, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                        return false;
                    }
                }
                if (this.offescInsertList[i].lastSeenDate) {
                    this.offescInsertList[i].lastSeenDate = DateFormat.getDate(this.offescInsertList[i].lastSeenDate);
                    if (DateFormat.compareDate(this.offescInsertList[i].lastSeenDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidescap.lastseendatevalidation'), 'info');
                        return false;
                    }
                }
                if (this.offescInsertList[i].escapeDate) {
                    this.offescInsertList[i].escapeTime = TimeFormat.parse(TimeFormat.format(this.offescInsertList[i].escapeTime),
                        this.offescInsertList[i].escapeDate);
                }
                if (this.offescInsertList[i].lastSeenTime) {
                    this.offescInsertList[i].lastSeenTime = TimeFormat.parse(TimeFormat.format(this.offescInsertList[i].lastSeenTime),
                        this.offescInsertList[i].escapeDate);
                }
                this.offescInsertList[i].escapeDate = DateFormat.getDate(this.offescInsertList[i].escapeDate.setHours(this.offescInsertList[i].escapeTime.getHours(),this.offescInsertList[i].escapeTime.getSeconds(),0,0));
            }
        }
        if (this.offescUpdateList.length > 0) {
            for (let i = 0; i < this.offescUpdateList.length; i++) {
                if (!this.offescUpdateList[i].escapeDate && !this.offescUpdateList[i].escapeTime) {
                    this.show(this.translateService.translate('oidescap.escapedatetime'), 'info');
                    return false;
                }
                if (!this.offescUpdateList[i].escapeTime || !this.offescUpdateList[i].escapeDate) {
                    this.show(this.translateService.translate('oidescap.timevalidation'), 'info');
                    return false;
                }
                this.offescUpdateList[i].escapeDate = DateFormat.getDate(this.offescUpdateList[i].escapeDate);

                if (this.offescUpdateList[i].datesModFlag) {
                    if (DateFormat.compareDate(this.offescUpdateList[i].escapeDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                        return false;
                    }

                    if (DateFormat.compareDate(this.offescUpdateList[i].escapeDate, DateFormat.getDate()) === 0) {
                        if (DateFormat.compareTime(this.offescUpdateList[i].escapeTime, DateFormat.getDate()) === 1) {
                            this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                            return false;
                        }
                    }
                    if (this.maxEscapeDate === null || this.maxEscapeDate === undefined) {

                        if (DateFormat.compareDate(this.offescUpdateList[i].escapeDate, DateFormat.getDate()) === 1) {
                            this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                            return false;
                        }
                    } else {
                        if (DateFormat.getDate(this.offescUpdateList[i].escapeDate) >= this.maxEscapeDate) {
                            this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                            return false;
                        }
                    }

                }

                if (this.offescUpdateList[i].lastSeenDate) {
                    this.offescUpdateList[i].lastSeenDate = DateFormat.getDate(this.offescUpdateList[i].lastSeenDate);
                    if (DateFormat.compareDate(this.offescUpdateList[i].lastSeenDate, DateFormat.getDate()) === 1) {
                        this.show(this.translateService.translate('oidescap.lastseendatevalidation'), 'info');
                        return false;
                    }
                }
                if (this.offescUpdateList[i].recaptureDate) {
                    this.offescUpdateList[i].recaptureDate = DateFormat.getDate(this.offescUpdateList[i].recaptureDate);
                    if (DateFormat.getDate(this.offescUpdateList[i].escapeDate) >
                             DateFormat.getDate(this.offescUpdateList[i].recaptureDate)) {
                        this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                    }
                    if (this.offescUpdateList[i].recpatureTime) {
                        if (DateFormat.compareDate(this.offescUpdateList[i].recaptureDate, this.offescUpdateList[i].escapeDate) === 0) {
                            if (DateFormat.compareTime(this.offescUpdateList[i].escapeTime, this.offescUpdateList[i].recpatureTime) === 1) {
                                this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'error');
                                return false;
                            }
                        }
                    }
                }
                if (this.offescUpdateList[i].escapeDate) {
                    this.offescUpdateList[i].escapeTime = TimeFormat.parse(TimeFormat.format(this.offescUpdateList[i].escapeTime),
                        this.offescUpdateList[i].escapeDate);
                }

                if (this.offescUpdateList[i].lastSeenTime) {
                    this.offescUpdateList[i].lastSeenTime = TimeFormat.parse(TimeFormat.format(this.offescUpdateList[i].lastSeenTime),
                        this.offescUpdateList[i].escapeDate);
                }
            }
        }


        this.offescCommitModel.insertList = this.offescInsertList;
        this.offescCommitModel.updateList = this.offescUpdateList;

        if (this.offescDeleteList.length > 0) {
            this.offescCommitModel.deleteList = this.offescDeleteList;
        }
        const offescSaveData = this.oidescapFactory.offEscCommit(this.offescCommitModel);
        offescSaveData.subscribe(data => {
            if (data >= 1) {
                if (data > 1) {
                    this.offescModel.escapeId = data;
                    this.lstOfOffEsc.push(this.offescModel[this.offescIndex]);
                }
                if (this.recordCompletionFlag) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.verifySave = false;
                    this.omuerrcoFactory.data = this.offescModel;
                    this.router.navigate(['/OMUERRCO']);
                    // const dataConfirm = {
                    //     label: this.translateService.translate('common.addupdateremoverecordsuccess'), yesBtn: true
                    // };
                    // this.dialogService.openLinkDialog('/oidstwjudelnotifipopup', dataConfirm, 50).subscribe(result => {
                    //     if (result) {
                    //         this.verifySave = false;
                    //         this.omuerrcoFactory.data = this.offescModel;
                    //         this.router.navigate(['/OMUERRCO']);
                    //     }
                    // });
                } else {
                    this.recordCompletionFlag = false;
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    this.offescExecuteQuery();
                    this.verifySave = false;
                }
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'error');
                this.offescExecuteQuery();
            }
        });
    }

    setType() {
        if (this.offescModel.escapeAgyLocId || this.offescModel.escapeAgyLocId === undefined) {
            if (this.escapeAgyFlag) {
                this.verifySave = true;
                this.saveFlag = false;
                this.offescModel.updatedFlag = 'updated';
            } else {
                this.escapeAgyFlag = true;
            }
        }
    }

    isDateChanged(event) {
        if (event) {
            this.saveFlag = false;
            this.offescModel.updatedFlag = 'updated';
            this.verifySave = true;
            this.offescModel.datesModFlag = true;
            if (this.maxEscapeDate === null || this.maxEscapeDate === undefined) {

                if (DateFormat.getDate(event) > DateFormat.getDate()) {
                    this.show(this.translateService.translate('oidescap.escapedatevalid'), 'warn');
                    return;
                }
            } else {
                if (DateFormat.getDate(event) > this.maxEscapeDate) {
                    this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                    return;
                }
            }
            if (this.offescModel.recaptureDate) {
                if (DateFormat.getDate(event) >= DateFormat.getDate(this.offescModel.recaptureDate)) {
                    this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                    return;
                }
            }
            if (this.offescModel.recpatureTime) {
                if (DateFormat.compareDate(DateFormat.getDate(this.offescModel.recaptureDate), DateFormat.getDate(event)) === 0) {
                    if (DateFormat.compareTime(this.offescModel.escapeTime, this.offescModel.recpatureTime) === 1) {
                        this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                        return;
                    }
                }
            }

        }
    }
    isLastSeenDateChanged(event) {
        if (event) {
            if (DateFormat.getDate(event) > DateFormat.getDate()) {
                this.show(this.translateService.translate('oidescap.lastseendatevalidation'), 'warn');
            }
            this.saveFlag = false;
            this.verifySave = true;
            this.offescModel.updatedFlag = 'updated';
        }
    }


    isTimeChanged() {
        this.saveFlag = false;
        this.verifySave = true;
        this.offescModel.updatedFlag = 'updated';
    }

    escapeEscortCodeWhenValidateItemTrigger() {

        if (this.offescModel.escapeEscortCode || this.offescModel.escapeEscortCode === undefined) {
            if (this.escapeEscortFlag) {
                this.verifySave = true;
                this.saveFlag = false;
                this.offescModel.updatedFlag = 'updated';
                return;
            } else {
                this.escapeEscortFlag = true;
            }

        }

    }
    escapeCircumstanceCodeWhenValidateItemTrigger() {

        if (this.offescModel.escapeCircumstanceCode || this.offescModel.escapeCircumstanceCode === undefined) {
            if (this.escapeCircumFlag) {
                this.verifySave = true;
                this.saveFlag = false;
                this.offescModel.updatedFlag = 'updated';
                return;
            } else {
                this.escapeCircumFlag = true;
            }

        }


    }
    oidescapSaveAlloffescForm() {
        if (this.verifySave) {
            if (!this.offescModel.escapeDate && !this.offescModel.escapeTime) {
                this.show(this.translateService.translate('oidescap.escapedatetime'), 'info');
                return false;
            }
            if (!this.offescModel.escapeTime || !this.offescModel.escapeDate) {
                this.show(this.translateService.translate('oidescap.timevalidation'), 'info');
                return false;
            }
            this.offescModel.escapeDate = DateFormat.getDate(this.offescModel.escapeDate);
            if (this.maxEscapeDate === null || this.maxEscapeDate === undefined) {

                if (DateFormat.compareDate(this.offescModel.escapeDate, DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                    return false;
                }
            } else {
                if (DateFormat.getDate(this.offescModel.escapeDate) >= this.maxEscapeDate) {
                    this.show(this.translateService.translate('oidescap.escaperecapturedate'), 'warn');
                    return false;
                }
            }
            if (DateFormat.compareDate(this.offescModel.escapeDate, DateFormat.getDate()) === 0) {
                if (DateFormat.compareTime(this.offescModel.escapeTime, DateFormat.getDate()) === 1) {
                    this.show(this.translateService.translate('oidescap.escapedatevalid'), 'info');
                    return false;
                }
            }
            this.recordCompletionFlag = true;
            this.offescModel.returnFlag = true;
            this.oidescapSaveoffescForm();
        } else {
            this.omuerrcoFactory.data = this.offescModel;
            this.router.navigate(['/OMUERRCO']);
        }
    }

    ngOnDestroy(): void {
        this.omuerrcoFactory.data = this.offescModel;
        this.oidescapFactory.data = undefined;
        if (this.verifySave) {
            this.oidescapSaveoffescForm();
        }

    }

    get clearFlagOne() {
        if (this.offescModel.escapeDate ||
            this.offescModel.escapeTime ||
            this.offescModel.dspEscapeReason ||
            this.offescModel.escapeEscortCode ||
            this.offescModel.escapeAgyLocId ||
            this.offescModel.escapeCircumstanceCode ||
            this.offescModel.incidentNumber ||
            this.offescModel.escapeCommentText ||
            this.offescModel.lastSeenDate ||
            this.offescModel.lastSeenTime ||
            this.offescModel.inCompanyFlag ||
            this.offescModel.adjustSentenceFlag ||
            this.offescModel.escapeRegistrationRef) {
            return false;
        }
        return true;
    }
}
