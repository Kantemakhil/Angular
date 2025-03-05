import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OiishlogService } from '../service/oiishlog.service';
import { AgencyShiftLogs } from '@instshiftlogsbeans/AgencyShiftLogs';
import { AgencyShiftLogsCommitBean } from '@instshiftlogsbeans/AgencyShiftLogsCommitBean';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-oiishlog',
    templateUrl: './oiishlog.component.html'
})

export class OiishlogComponent implements OnInit {
    retBtnDisable: boolean;
    msgs: any[] = [];
    agyshilData: AgencyShiftLogs[] = [];
    agyshilDataTemp: AgencyShiftLogs[] = [];
    agyshilModel: AgencyShiftLogs = new AgencyShiftLogs();
    agyshilModelTemp: AgencyShiftLogs = new AgencyShiftLogs();
    agyshilIndex = 0;
    agyshilInsertList: AgencyShiftLogs[] = [];
    agyshilUpdateList: AgencyShiftLogs[] = [];
    agyshilDeleteList: AgencyShiftLogs[] = [];
    agyshil1Data: AgencyShiftLogs[] = [];
    agyshil1DataTemp: AgencyShiftLogs[] = [];
    agyshil1Model: AgencyShiftLogs = new AgencyShiftLogs();
    agyshil1Index = 0;
    agyshil1InsertList: AgencyShiftLogs[] = [];
    agyshil1UpdatetList: AgencyShiftLogs[] = [];
    agyshil1DeleteList: AgencyShiftLogs[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    agyShilColumnDef: any[];
    criteriaBlockReadOnly = false;
    agyShilReadOnly = false;
    agyShil1ReadOnly = false;
    cgfkAgyshilagyactivitycodRg: any[] = [];
    rgagencyRg: any[] = [];
    rglocationRg: any[] = [];
    rgstaffRg: any[] = [];
    caseLoadId: any;
    index = 0;
    agyshilCommitModel: AgencyShiftLogsCommitBean = new AgencyShiftLogsCommitBean();
    facilityTitle = { code: 'Place]', description: 'Description' };
    shiftLogSeq: number;
    fromDate: Date;
    toDate: Date;
    agencyDesc: string;
    locationDesc: string;
    lastName: string;
    activityDesc: string;
    reportingLink: any;
    facilityLink: any;
    locationLink: any;
    activityLink: any;
    fromFlag: boolean;
    toFlag: boolean;
    tableIndex: any;
    constructor(private oiishlogFactory: OiishlogService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        private activatedRoute: ActivatedRoute, private router: Router,
        public dialogService: DialogService) {
        this.agyShilColumnDef = [];

    }
    ngOnInit() {
        this.facilityLink = 'oiishlog/rgAgencyRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.reportingLink = 'oiishlog/rgStaffRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.activityLink = 'oiishlog/cgfkAgyShilAgyActivityCodRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.locationLink = 'oiishlog/rgLocationRecordGroup?agyLocId=' + 'NONE';
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.fromFlag = false;
        this.toFlag = false;
        this.disabled = false;
        this.agyShilColumnDef = [
            {
                fieldName: this.translateService.translate('oiishlog.date'), field: 'logDate',
                editable: false, width: 150, datatype: 'date', maxlength: 11
            },
            {
                fieldName: this.translateService.translate('oiishlog.time'), maxlength: 5,
                field: 'logTime', editable: false, width: 150, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oiishlog.log'),
                field: 'shiftLogSeq', editable: false, width: 150, datatype: 'text', maxlength: 240

            },
            {
                fieldName: this.translateService.translate('system-profile.inst-agency'), datatype: 'lov'
                , link: 'oiishlog/rgAgencyRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad,
                field: 'dspAgyLocId4', editable: false, width: 250, maxlength: 240, source: 'OUMAGLOC'
            },
            {
                fieldName: this.translateService.translate('oiishlog.location'),
                field: 'dspAgyLocId3', editable: false, width: 250, datatype: 'lov', maxlength: 240,
                link: 'oiishlog/rgLocationRecordGroup?agyLocId=', parentField: 'dspAgyLocId4', source: 'OIMULOCA'
            },
            {
                fieldName: this.translateService.translate('oiishlog.activity'),
                link: 'oiishlog/cgfkAgyShilAgyActivityCodRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad,
                field: 'agyActivityCode', editable: false, width: 150, datatype: 'lov', maxlength: 240
            },
            {
                fieldName: '', field: 'idbutton', datatype: 'launchbutton', link: '/oiishlogdetailspopup', editable: true, width: 130,
                data: 'row', updateField: 'row', modal: true, dialogWidth: 50, onLaunchClick: this.onDetailsLauchEdit
            },
            {
                fieldName: this.translateService.translate('oiishlog.reportedby'), optionWidth: 350,
                link: 'oiishlog/rgStaffRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad,
                field: 'dspLastName', editable: false, width: 150, datatype: 'lov', maxlength: 240, source: 'OIMPERSO'
            }
        ];

        const cgfkAgyshilagyactivitycodServiceObj = this.oiishlogFactory.cgfkAgyShilAgyActivityCodRecordGroup(this.caseLoadId);
        cgfkAgyshilagyactivitycodServiceObj.subscribe(cgfkAgyshilagyactivitycodList => {
            if (cgfkAgyshilagyactivitycodList.length === 0) {
                this.cgfkAgyshilagyactivitycodRg = [];
            } else {
                for (let i = 0; i < cgfkAgyshilagyactivitycodList.length; i++) {
                    this.cgfkAgyshilagyactivitycodRg.push({
                        'text': cgfkAgyshilagyactivitycodList[i].code + ' - ' +
                            cgfkAgyshilagyactivitycodList[i].description, 'id': cgfkAgyshilagyactivitycodList[i].code
                    });
                }
            }
        });
        const rgagencyServiceObj = this.oiishlogFactory.rgAgencyRecordGroup(this.caseLoadId);
        rgagencyServiceObj.subscribe(rgagencyList => {
            if (rgagencyList.length === 0) {
                this.rgagencyRg = [];
            } else {
                for (let i = 0; i < rgagencyList.length; i++) {
                    this.rgagencyRg.push({
                        'text': rgagencyList[i].code + ' - ' +
                            rgagencyList[i].description, 'id': rgagencyList[i].code
                    });
                }
            }
        });
        const rgstaffServiceObj = this.oiishlogFactory.rgStaffRecordGroup(this.caseLoadId);
        rgstaffServiceObj.subscribe(rgstaffList => {
            if (rgstaffList.length === 0) {
                this.rgstaffRg = [];
            } else {
                for (let i = 0; i < rgstaffList.length; i++) {
                    this.rgstaffRg.push({
                        'text': rgstaffList[i].code + ' - ' +
                            rgstaffList[i].description, 'id': rgstaffList[i].code
                    });
                }
            }
        });
        this.fromDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
        this.toDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickagyshil(event) {
    } onDetailsLauchEdit = (event) => {
        if (!event.observationDetails) {
            this.show(this.translateService.translate('oiishlog.detailsarenotentered'),'warn');
            return false;
        } else {

            return true;
        }

    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oiishlogPopulateDetails() {
        this.agyshilModel = this.agyshilData[this.index];
        const serviceObj = this.oiishlogFactory.
            agyShil1ExecuteQuery(this.agyshilModel);
        serviceObj.subscribe(data => {
            if (data !== undefined && data.errorMessage.length > 0) {
            } else {
                this.agyshil1Data = data;
            }
        });
    }
    facilityWhenValidationItemTrigger() {
        this.locationLink = 'oiishlog/rgLocationRecordGroup?agyLocId=' + this.agencyDesc;
        const rglocationServiceObj = this.oiishlogFactory.rgLocationRecordGroup(this.agencyDesc);
        rglocationServiceObj.subscribe(rglocationList => {
            if (rglocationList.length === 0) {
                this.rglocationRg = [];
            } else {
                for (let i = 0; i < rglocationList.length; i++) {
                    this.rglocationRg.push({
                        'text': rglocationList[i].code + ' - ' +
                            rglocationList[i].description, 'id': rglocationList[i].code
                    });
                }
            }
        });
    }
    onLovMouseDown() {
        if (this.fromDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.fromDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oiishlog.fromdatecannotbegthancurdate'), 'error');
                this.toFlag = true;
                this.disabled = true;
                this.fromFlag = false;
                return;
            }
        }
        if (this.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.toDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oiishlog.todatecannotbegthancurdate'), 'error');
                this.fromFlag = true;
                this.disabled = true;
                this.toFlag = false;
                return;
            }
        }
        if (this.toDate && this.fromDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.fromDate), DateFormat.getDate(this.toDate)) === 1) {
                this.show(this.translateService.translate('oiishlog.fromdatecannotbegthantodate'), 'error');
                this.fromFlag = true;
                this.disabled = true;
                this.toFlag = false;
                return;
            }
        }
        this.toFlag = false;
        this.disabled = false;
        this.fromFlag = false;
    }
    fromDateClick() {
        if (!this.fromFlag) {
            return;
        } else {
            this.onLovMouseDown();
        }
    }
    toDateClick() {
        if (!this.toFlag) {
            return;
        } else {
            this.onLovMouseDown();
        }
    }
    onLocMouseDown() {
        this.onLovMouseDown();
        if (!this.disabled) {
            if (this.rglocationRg.length === 0) {
                // this.show(this.translateService.translate('oiishlog.listofvaluescontains'), 'error');
                return false;
            }
        }
    }
    oiishlogOnClearDetailsTrigger() {
        this.toFlag = false;
        this.disabled = false;
        this.fromFlag = false;
        this.agyshilData = [];
        this.agyshilModel = new AgencyShiftLogs();
        this.agyshilModelTemp = new AgencyShiftLogs();
        this.shiftLogSeq = undefined;
        this.fromDate = undefined;
        this.toDate = undefined;
        this.agencyDesc = undefined;
        this.activityDesc = undefined;
        this.locationDesc = undefined;
        this.lastName = undefined;
        this.fromDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
        this.toDate = DateFormat.parse(DateFormat.format(DateFormat.getDate()));
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    oiishlogSaveagyshilForm(event) {
        this.agyshilInsertList = event.added;
        this.agyshilUpdateList = event.updated;
        this.agyshilDeleteList = event.removed;
        this.agyshilCommitModel.insertList = [];
        this.agyshilCommitModel.updateList = [];
        this.agyshilCommitModel.deleteList = [];
        if (this.agyshilInsertList.length > 0) {
            for (let i = 0; i < this.agyshilInsertList.length; i++) {
            }
            if (this.agyshilUpdateList.length > 0) {
                for (let i = 0; i < this.agyshilUpdateList.length; i++) {
                }
            }
            this.agyshilCommitModel.insertList = this.agyshilInsertList;
            this.agyshilCommitModel.updateList = this.agyshilUpdateList;
        }
        if (this.agyshilDeleteList.length > 0) {
            for (let i = 0; i < this.agyshilDeleteList.length; i++) {
            }
            this.agyshilCommitModel.deleteList = this.agyshilDeleteList;
        }
        const agyshilSaveData = this.oiishlogFactory.agyShilCommit(this.agyshilCommitModel);
        agyshilSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }
    oiishlogexecuteQuery(fDate?, tDate?) {
        if (fDate) {
            if (String(fDate.lastValue).indexOf('_') >= 0 && fDate.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.fromDate = undefined
                return;
            }
        }
        if (tDate) {
            if (String(tDate.lastValue).indexOf('_') >= 0 && tDate.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.toDate = undefined
                return;
            }
        }
        this.onLovMouseDown();
        if (!this.disabled && !this.fromFlag && !this.toFlag) {
            this.agyshilModelTemp = new AgencyShiftLogs();
            this.agyshilModelTemp.logDate = this.fromDate;
            this.agyshilModelTemp.logTime = this.toDate;
            this.agyshilModelTemp.dspAgyLocId4 = this.agencyDesc;
            this.agyshilModelTemp.dspAgyLocId3 = this.locationDesc;
            if (this.lastName) {
                this.agyshilModelTemp.staffId = Number(this.lastName);
            }
            this.agyshilModelTemp.globalCaseLoadId = this.caseLoadId;
            if (this.agyshilModelTemp.logDate) {
                this.agyshilModelTemp.logDate = DateFormat.getDate(this.agyshilModelTemp.logDate);
            }
            if (this.agyshilModelTemp.logTime) {
                this.agyshilModelTemp.logTime = DateFormat.getDate(this.agyshilModelTemp.logTime);
            }
            this.agyshilModelTemp.shiftLogSeq = this.shiftLogSeq;
            this.agyshilModelTemp.agyActivityCode = this.activityDesc;
            const serviceObj = this.oiishlogFactory.
                agyShilExecuteQuery(this.agyshilModelTemp);
            serviceObj.subscribe(agyshilResultList => {
                if (agyshilResultList.length === 0) {
                    this.agyshilData = [];
                    this.agyshilModel = new AgencyShiftLogs();
                    this.show(this.translateService.translate('oiishlog.querycaused'), 'warn');
                } else {
                    this.agyshilModel = new AgencyShiftLogs();
                    for (let i = 0; i < agyshilResultList.length; i++) {
                        if (agyshilResultList[i].logDate) {
                            agyshilResultList[i].logDate = DateFormat.getDate(agyshilResultList[i].logDate);
                        }
                        if (agyshilResultList[i].logTime) {
                            agyshilResultList[i].logTime = DateFormat.getDate(agyshilResultList[i].logTime);
                        }
                        if (agyshilResultList[i].staffId) {
                            agyshilResultList[i].dspLastName = agyshilResultList[i].staffId;
                        }
                        agyshilResultList[i].idbutton = this.translateService.translate('oiishlog.btnDetail');
                    }
                    this.agyshilData = agyshilResultList;
                    this.agyshilModel = this.agyshilData[0];
                    this.tableIndex = 0;
                }
            });
        }
    }
    agyshil1ExecuteQuery() {
        const agyshil1Result = this.oiishlogFactory.agyShil1ExecuteQuery(this.agyshil1Model);
        agyshil1Result.subscribe(agyshil1ResultList => {
            if (agyshil1ResultList.length === 0) {
                this.agyshil1Data = [];
            } else {
                this.agyshil1Data = agyshil1ResultList;
                this.agyshil1Model = agyshil1ResultList[0];
            }
        });
    }
    fromDateWhenValidateItemTrigger(event) {
        if (event) {
            if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oiishlog.fromdatecannotbegthancurdate'), 'error');
                this.toFlag = true;
                this.disabled = true;
                this.fromFlag = false;
                return;
            }
        }
        if (this.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.toDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oiishlog.todatecannotbegthancurdate'), 'error');
                this.fromFlag = true;
                this.disabled = true;
                this.toFlag = false;
                return;
            }
        }
        if (event && this.toDate) {
            if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate(this.toDate)) === 1) {
                this.show(this.translateService.translate('oiishlog.fromdatecannotbegthantodate'), 'error');
                this.fromFlag = true;
                this.disabled = true;
                this.toFlag = false;
                return;
            }
        }
        this.toFlag = false;
        this.disabled = false;
        this.fromFlag = false;
    }
    toDateWhenValidateItemTrigger(event) {
        if (this.fromDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.fromDate), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oiishlog.fromdatecannotbegthancurdate'), 'error');
                this.toFlag = true;
                this.disabled = true;
                this.fromFlag = false;
                return;
            }
        }
        if (event) {
            if (DateFormat.compareDate(DateFormat.getDate(event), DateFormat.getDate()) === 1) {
                this.show(this.translateService.translate('oiishlog.todatecannotbegthancurdate'), 'error');
                this.toFlag = false;
                this.disabled = true;
                this.fromFlag = true;
                return;
            }
        }
        if (this.fromDate && event) {
            if (DateFormat.compareDate(DateFormat.getDate(this.fromDate), DateFormat.getDate(event)) === 1) {
                this.show(this.translateService.translate('oiishlog.fromdatecannotbegthantodate'), 'error');
                this.toFlag = false;
                this.disabled = true;
                this.fromFlag = true;
                return;
            }
        }
        this.toFlag = false;
        this.disabled = false;
        this.fromFlag = false;
    }

    reportedbyBlur() {
        if (!this.lastName) {
            this.lastName = this.lastName === undefined ? '' : undefined;
        }
    }

    activityDescBlur() {
        if (!this.activityDesc) {
            this.activityDesc = this.activityDesc === undefined ? '' : undefined;
        }
    }

    locationDescBlur() {
        if (!this.locationDesc) {
            this.locationDesc = this.locationDesc === undefined ? '' : undefined;
        }
    }

    agencyDescBlur() {
        if (!this.agencyDesc) {
            this.agencyDesc = this.agencyDesc === undefined ? '' : undefined;
        }
    }
    get allReadonly() {
        if (this.agyshilData.length > 0) {
            this.retBtnDisable = true;
            return true;
        }
        this.retBtnDisable = false;
        return false;
    }

}
