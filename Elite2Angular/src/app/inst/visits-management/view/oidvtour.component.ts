import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidvtourService } from '@inst/visits-management/service/oidvtour.service';
import { VisitingGroups } from '@visitsbeans/VisitingGroups';
import { VisitingMembers } from '@visitsbeans/VisitingMembers';
import { VisitingGroupsCommitBean } from '@visitsbeans/VisitingGroupsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { VisitingMembersCommitBean } from '@visitsbeans/VisitingMembersCommitBean';
// import required bean declarations

@Component({
    selector: 'app-oidvtour',
    templateUrl: './oidvtour.component.html'
})

export class OidvtourComponent implements OnInit {
    // Variable declaration
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    visitinggroupsData: VisitingGroups[] = [];
    visitinggroupsDataTemp: VisitingGroups[] = [];
    visitinggroupsModel: VisitingGroups = new VisitingGroups();
    visitinggroupModelBean: VisitingGroups = new VisitingGroups();
    visitinggroupsCommitModel: VisitingGroupsCommitBean = new VisitingGroupsCommitBean();
    visitinggroupsIndex = 0;
    visitinggroupsInsertList: VisitingGroups[] = [];
    visitinggroupsUpdatetList: VisitingGroups[] = [];
    visitinggroupsDeleteList: VisitingGroups[] = [];
    visitingmembersModel: VisitingMembers = new VisitingMembers();
    visitingmembersIndex: number;
    visitingmembersInsertList: VisitingMembers[] = [];
    visitingmembersUpdatetList: VisitingMembers[] = [];
    visitingmembersDeleteList: VisitingMembers[] = [];
    visitingmembersData: VisitingMembers[] = [];
    visitingmembersDataTemp: VisitingMembers[] = [];
    visitingmembersCommitModel: VisitingMembersCommitBean = new VisitingMembersCommitBean();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    vOffAuthVisColumnDef: any[];
    offCaseNrColumnDef: any[];
    offAuthVisitOffColumnDef: any[];
    teamsColumnDef: any[];
    offAuthVisitorsColumnDef: any[];
    perIdentColumnDef: any[];
    profilesColumnDef: any[];
    perEmpColumnDef: any[];
    offVisitRestColumnDef: any[];
    perAddrColumnDef: any[];
    offenderGrievancesColumnDef: any[];
    offenderGrievanceTxnsColumnDef: any[];
    offNotesColumnDef: any[];
    visitingMembersColumnDef: any[];
    visitingGroupsColumnDef: any[];
    offCntPerColumnDef: any[];
    bedAhColumnDef: any[];
    resBlColumnDef: any[];
    contactsColumnDef: any[];
    offCntPerReadOnly: boolean;
    perAddrReadOnly: boolean;
    perIdentReadOnly: boolean;
    perInfoReadOnly: boolean;
    perEmpReadOnly: boolean;
    vOffAuthVisReadOnly: boolean;
    contactsReadOnly: boolean;
    offCaseNoteReadOnly: boolean;
    amendNoteReadOnly: boolean;
    personsReadOnly: boolean;
    offCaseNrReadOnly: boolean;
    profilesReadOnly: boolean;
    srchCtrlReadOnly: boolean;
    teamsReadOnly: boolean;
    butCtrlReadOnly: boolean;
    crtMvTmpReadOnly: boolean;
    bedAhReadOnly: boolean;
    offNotesReadOnly: boolean;
    cntlReadOnly: boolean;
    vOffBkgReadOnly: boolean;
    sysPflReadOnly: boolean;
    offenderGrievancesReadOnly: boolean;
    offenderGrievanceTxnsReadOnly: boolean;
    agencyCountsReadOnly: boolean;
    subRemCntReadOnly: boolean;
    resBlReadOnly: boolean;
    offVisitRestReadOnly: boolean;
    offAuthVisitorsReadOnly: boolean;
    imageVisitReadOnly: boolean;
    offAuthVisitOffReadOnly: boolean;
    imagesOffReadOnly: boolean;
    nbtQueryBlkReadOnly: boolean;
    visitingGroupsReadOnly: boolean;
    visitingMembersReadOnly: boolean;
    rggrouppurposRg: any[] = [];
    rgidtypeRg: any[] = [];
    rgstaffmembersRg: any[] = [];
    rgagencylocationsRg: any[] = [];
    caseloadType: string;
    caseloadId: string;
    facilityLink: string;
    selected = -1;
    selectedvisitingMembers = -1;
    groupFlag: boolean;
    attendFlag: boolean;
    purposeTitles = { 'code': 'CODE', 'description': 'DESCRPTION' };
    approvedTitles = { 'description': 'NAME', 'code': 'ID' };
    searchDisabled: boolean;
    clearDisabled: boolean;
    variableDisable: boolean;
    constructor(private oidvtourFactory: OidvtourService, public sessionManager: UserSessionManager,
        private offenderSearchService: OffenderSearchService, public translateService: TranslateService) {
        // TODO initilize data members here..!
        this.vOffAuthVisColumnDef = [];
        this.offCaseNrColumnDef = [];
        this.offAuthVisitOffColumnDef = [];
        this.teamsColumnDef = [];
        this.offAuthVisitorsColumnDef = [];
        this.perIdentColumnDef = [];
        this.profilesColumnDef = [];
        this.perEmpColumnDef = [];
        this.offVisitRestColumnDef = [];
        this.perAddrColumnDef = [];
        this.offenderGrievancesColumnDef = [];
        this.offenderGrievanceTxnsColumnDef = [];
        this.offNotesColumnDef = [];
        this.visitingMembersColumnDef = [];
        this.visitingGroupsColumnDef = [];
        this.offCntPerColumnDef = [];
        this.bedAhColumnDef = [];
        this.resBlColumnDef = [];
        this.contactsColumnDef = [];
    }
    ngOnInit() {
        this.groupFlag = false;
        this.attendFlag = false;
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.variableDisable = false;
        this.facilityLink = 'oidvtour/rgAgencyLocationsRecordGroup?caseloadId=' + this.caseloadId + '&caseloadType='
            + this.caseloadType;
        this.visitingGroupsColumnDef = [
            {
                fieldName: this.translateService.translate('oidvtour.date') + '*', field: 'visitDate', editable: true,
                width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oidvtour.start') + '*', field: 'startTime',
                editable: true, width: 150, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oidvtour.end'), field: 'endTime',
                editable: true, width: 150, datatype: 'time'
            },
            {
                fieldName: this.translateService.translate('oidvtour.group'), field: 'groupName', editable: true,
                width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('oidvtour.visitors'), field: 'noVisitors', editable: true, width: 150,
                datatype: 'number', maxValue: 999, whole: true
            },
            {
                fieldName: this.translateService.translate('oidvtour.purpose'), field: 'groupPurposeTemp',
                editable: true, width: 150, domain: 'GROUP_PURPOS',
                optionWidth: 300, datatype: 'lov', titles: this.purposeTitles
            },
            {
                fieldName: this.translateService.translate('oidvtour.approved'), field: 'approvedById',
                editable: true, width: 150, link: 'oidvtour/rgStaffMembersRecordGroup',
                optionWidth: 300, datatype: 'lov', titles: this.approvedTitles,source:'OUMPERSO'
            },
            {
                fieldName: this.translateService.translate('oidvtour.escorted'), field: 'escortedById',
                editable: true, width: 150, datatype: 'lov',
                link: 'oidvtour/rgStaffMembersRecordGroup', titles: this.approvedTitles,source:'OUMPERSO'
            },
            {
                fieldName: this.translateService.translate('oidvtour.comment'), field: 'commentText', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', maxlength:'240'
            },
        ];
        this.visitingMembersColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.name-last') + '*', field: 'lastName',
                editable: true, width: 150, datatype: 'text', maxlength:'32'
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1') + '*', field: 'firstName',
                editable: true, width: 150, datatype: 'text', maxlength:'32'
            },
            { fieldName: this.translateService.translate('oidvtour.dob'), field: 'dob', editable: true, width: 150, datatype: 'date' },
            {
                fieldName: this.translateService.translate('oidvtour.idtype'), field: 'idType', editable: true,
                width: 300, datatype: 'lov', domain: 'ID_TYPE',
                titles: this.purposeTitles
            },
            {
                fieldName: this.translateService.translate('oidvtour.id'), field: 'identifier', editable: true,
                width: 150, datatype: 'text', mask: this.getMask,maxlength:'32'
            },
            {
                fieldName: this.translateService.translate('oidvtour.comment'), field: 'commentText', editable: true,
                width: 150, datatype: 'text', uppercase: 'false', maxlength:'240'
            },
            {
                fieldName: this.translateService.translate('oidvtour.verified'), field: 'verifiedFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
        ];
        this.selected = -1;
        this.selectedvisitingMembers = -1;
    }
    show(vldmsg, type?) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    onRowClickvisitinggroups(event) {
        this.visitinggroupsModel = new VisitingGroups();
        if (event) {
            this.visitinggroupsModel = event;
            if (this.visitinggroupsModel.groupId) {
                this.attendFlag = true;
                //this.visitingmembersModel.groupId = this.visitinggroupsModel.groupId;
                this.oidvtourPopulateDetails();
            } else {
                this.attendFlag = false;
            }
            this.visitingmembersData = [];
            this.visitingmembersModel = new VisitingMembers();
        } else {
            this.visitingmembersData = [];
            this.visitingmembersModel = new VisitingMembers();
            this.attendFlag = false;
        }
    }
    clear() {
        this.visitinggroupsData = [];
        this.visitingmembersData = [];
        this.visitinggroupModelBean = new VisitingGroups();
        this.groupFlag = false;
        this.attendFlag = false;
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.variableDisable = false;
    }
    getMask = (index, col, data) => {
        if (data['idType'] === 'SSN') {
            return {
                mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                placeholderChar: ' '
            };
        }

    }
    oidvtourexecuteQueryRetrieve(date?) {
        /* if (date) {
            if (date.lastValue === '0_/__/____') {
                this.show(this.translateService.translate('common.leapyearnotallowed'), 'warn');
                this.clearDisabled = false;
                return;
            }
            if (String(date.lastValue).indexOf('_') >= 0 && date.value === null) {
                this.show(this.translateService.translate('common.datemustbeentervalidformat'), 'warn');
                this.clearDisabled = false;
                return;
            }
        } */
        this.visitinggroupsModel.agyLocId = this.visitinggroupModelBean.agyLocId;
        this.visitinggroupsModel.startTime = this.visitinggroupModelBean.startTime;
        this.visitinggroupsModel.visitDate = this.visitinggroupModelBean.visitDate;
        this.visitinggroupsModel.endTime = this.visitinggroupModelBean.endTime;
        if (!this.visitinggroupsModel.agyLocId) {
            this.show(this.translateService.translate('oidvtour.facilitymust'), 'warn');
            return;
        }
        if (this.visitinggroupModelBean.startTime && this.visitinggroupModelBean.endTime) {
            const startTime = DateFormat.getDate(DateFormat.getDate(this.visitinggroupModelBean.startTime).setSeconds(0));
            const endTime = DateFormat.getDate(DateFormat.getDate(this.visitinggroupModelBean.endTime).setSeconds(0));
            if (DateFormat.compareTime(startTime, endTime) === 1) {
                this.show(this.translateService.translate('oidvtour.visitend'), 'warn');
                return;
            }
        }
        const serviceObj = this.oidvtourFactory.visitingGroupsExecuteQuery(this.visitinggroupModelBean);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.visitinggroupsData = [];
                this.visitingmembersData = [];
                this.searchDisabled = false;
                this.clearDisabled = false;
                this.variableDisable = false;
                this.show(this.translateService.translate('common.querycaused'), 'warn');
                return;
            } else {
                this.visitinggroupsData = data;
                this.visitinggroupsModel = this.visitinggroupsData[0];
                this.selected = 0;
                this.onRowClickvisitinggroups(this.visitinggroupsModel);
                this.groupFlag = true;
                this.searchDisabled = true;
                this.clearDisabled = false;
                this.variableDisable = true;
            }
        });
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    oidvtourPopulateDetails() {
        this.visitingmembersModel.groupId = this.visitinggroupsModel.groupId;
        const serviceObj = this.oidvtourFactory.visitingMembersExecuteQuery(this.visitingmembersModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.visitingmembersData = [];
            }
            for (let i = 0; i < data.length; i++) {
                data[i].verifiedFlag = data[i].verifiedFlag === 'Y' ? true : false;
            }
            this.visitingmembersData = data;
            this.selectedvisitingMembers = 0;
        });
    }
    onGroupInsert = () => {
        this.visitingmembersData = [];
        this.visitingmembersModel = new VisitingMembers();
        if (!this.visitinggroupModelBean.agyLocId) {
            this.show(this.translateService.translate('oidvtour.facilitymust'), 'warn');
            return;
        }
        if (this.visitinggroupsData.length > 0) {
            if (!this.visitinggroupsData[this.visitinggroupsData.length - 1].visitDate) {
                this.show(this.translateService.translate('oidvtour.datemustbeentered'), 'warn');
                return;
            }
            if (!this.visitinggroupsData[this.visitinggroupsData.length - 1].startTime) {
                this.show(this.translateService.translate('oidvtour.startmustbeentered'), 'warn');
                return;
            }
        }
        if (this.visitinggroupsData.length > 0) {
            if (!this.visitinggroupsData[this.visitinggroupsData.length - 1].visitDate) {
                this.show(this.translateService.translate('oidvtour.datemustbeentered'), 'warn');
                return;
            }
            if (!this.visitinggroupsData[this.visitinggroupsData.length - 1].startTime) {
                this.show(this.translateService.translate('oidvtour.startmustbeentered'), 'warn');
                return;
            }
        }
        return {
            visitDate: DateFormat.getDate(), startTime: '', endTime: '', groupName: '', noVisitors: '', groupPurposeTemp: '',
             commentText: ''
        };
    }

    onGroupDelete = () => {
        if (this.visitingmembersData.length > 0) {
            this.show(this.translateService.translate('oidvtour.cannotdeletemaster'), 'warn');
            return;
        }
        return {
            date: DateFormat.getDate()
        };
    }
    onPersonAttendingInsert = () => {
        if (!this.visitinggroupsModel.groupId) {
            this.show(this.translateService.translate('oidvtour.youcannotcreaterecords'), 'warn');
            return;
        }
        if (this.visitingmembersData.length > 0) {
            if (!this.visitingmembersData[this.visitingmembersData.length - 1].lastName) {
                this.show(this.translateService.translate('oidvtour.lastnamemustbeentered'), 'warn');
                return;
            }
            if (!this.visitingmembersData[this.visitingmembersData.length - 1].firstName) {
                this.show(this.translateService.translate('oidvtour.firstnamemustbeentered'), 'warn');
                return;
            }
        }

        return {
            date: DateFormat.getDate()
        };
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    oidvtourSavevisitinggroupsForm(event) {
        this.visitinggroupsInsertList = event.added;
        this.visitinggroupsUpdatetList = event.updated;
        this.visitinggroupsDeleteList = event.removed;
        this.visitinggroupsCommitModel.insertList = [];
        this.visitinggroupsCommitModel.updateList = [];
        this.visitinggroupsCommitModel.deleteList = [];
        if (this.visitinggroupsInsertList.length > 0) {
            for (let i = 0; i < this.visitinggroupsInsertList.length; i++) {
                if (!this.visitinggroupsInsertList[i].visitDate) {
                    this.show(this.translateService.translate('oidvtour.datemustbeentered'), 'warn');
                    return;
                }
                if (!this.visitinggroupsInsertList[i].startTime) {
                    this.show(this.translateService.translate('oidvtour.startmustbeentered'), 'warn');
                    return;
                }
                if (this.visitinggroupsInsertList[i].endTime && DateFormat.compareDateTime(DateFormat.getDate(this.visitinggroupsInsertList[i].startTime),
                    DateFormat.getDate(this.visitinggroupsInsertList[i].endTime)) === 1) {
                    this.show(this.translateService.translate('oidvtour.visitendtimemustbegreater'), 'warn');
                    return;
                }
                if (this.visitinggroupsInsertList[i].endTime && DateFormat.compareTime(DateFormat.getDate(this.visitinggroupsInsertList[i].startTime),
                    DateFormat.getDate(this.visitinggroupsInsertList[i].endTime)) === 1) {
                    this.show(this.translateService.translate('oidvtour.visitendtimemustbegreater'), 'warn');
                    return;
                }
                this.visitinggroupsInsertList[i].agyLocId = this.visitinggroupModelBean.agyLocId;
                this.visitinggroupsInsertList[i].createDatetime = DateFormat.getDate();
                this.visitinggroupsInsertList[i].modifyUserId = this.sessionManager.getId();
                this.visitinggroupsInsertList[i].modifyDatetime = DateFormat.getDate();
            }
        }
        if (this.visitinggroupsUpdatetList.length > 0) {
            for (let i = 0; i < this.visitinggroupsUpdatetList.length; i++) {
                if (!this.visitinggroupsUpdatetList[i].visitDate) {
                    this.show(this.translateService.translate('oidvtour.datemustbeentered'), 'warn');
                    return;
                }
                if (!this.visitinggroupsUpdatetList[i].startTime) {
                    this.show(this.translateService.translate('oidvtour.startmustbeentered'), 'warn');
                    return;
                }
                if (this.visitinggroupsUpdatetList[i].endTime && DateFormat.compareTime(DateFormat.getDate(this.visitinggroupsUpdatetList[i].startTime),
                    DateFormat.getDate(this.visitinggroupsUpdatetList[i].endTime)) === 1) {
                    this.show(this.translateService.translate('oidvtour.visitendtimemustbegreater'), 'warn');
                    return;
                }
            }
        }
        this.visitinggroupsCommitModel.insertList = this.visitinggroupsInsertList;
        this.visitinggroupsCommitModel.updateList = this.visitinggroupsUpdatetList;
        if (this.visitinggroupsDeleteList.length > 0) {
            for (let i = 0; i < this.visitinggroupsDeleteList.length; i++) {
            }
            this.visitinggroupsCommitModel.deleteList = this.visitinggroupsDeleteList;
        }
        const visitinggroupsSaveData = this.oidvtourFactory.visitingGroupsCommit(this.visitinggroupsCommitModel);
        visitinggroupsSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.oidvtourexecuteQueryRetrieve();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    oidvtourSavevisitingmembersForm(event) {
        this.visitingmembersInsertList = event.added;
        this.visitingmembersUpdatetList = event.updated;
        this.visitingmembersDeleteList = event.removed;
        this.visitingmembersCommitModel.insertList = [];
        this.visitingmembersCommitModel.updateList = [];
        this.visitingmembersCommitModel.deleteList = [];
        if (this.visitingmembersInsertList.length > 0) {
            for (let i = 0; i < this.visitingmembersInsertList.length; i++) {
                this.visitingmembersInsertList[i].groupId = this.visitinggroupsModel.groupId;
                this.visitingmembersInsertList[i].createUserId = this.sessionManager.getId();
                this.visitingmembersInsertList[i].createDatetime = DateFormat.getDate();
                this.visitingmembersInsertList[i].modifyUserId = this.sessionManager.getId();
                this.visitingmembersInsertList[i].modifyDatetime = DateFormat.getDate();
                if (!this.visitingmembersInsertList[i].lastName) {
                    this.show(this.translateService.translate('oidvtour.lastnamemustbeentered'), 'warn');
                    return;
                }
                if (!this.visitingmembersInsertList[i].firstName) {
                    this.show(this.translateService.translate('oidvtour.firstnamemustbeentered'), 'warn');
                    return;
                }
                if (this.visitingmembersInsertList[i].identifier && this.visitingmembersInsertList[i].idType === 'SSN') {
                    if (this.visitingmembersInsertList[i].identifier.trim().length < 11) {
                        this.show(this.translateService.translate('oidvtour.ssnformat'), 'warn');
                        return;
                    }
                }
                if (this.visitingmembersInsertList[i].verifiedFlag) {
                    this.visitingmembersInsertList[i].verifiedFlag = 'Y';
                } else {
                    this.visitingmembersInsertList[i].verifiedFlag = 'N';
                }
            }
        }
        if (this.visitingmembersUpdatetList.length > 0) {
            for (let i = 0; i < this.visitingmembersUpdatetList.length; i++) {
                if (!this.visitingmembersUpdatetList[i].lastName) {
                    this.show(this.translateService.translate('oidvtour.lastnamemustbeentered'), 'warn');
                    return;
                }
                if (!this.visitingmembersUpdatetList[i].firstName) {
                    this.show(this.translateService.translate('oidvtour.firstnamemustbeentered'), 'warn');
                    return;
                }
                if (this.visitingmembersUpdatetList[i].identifier && this.visitingmembersUpdatetList[i].idType === 'SSN') {
                    if (this.visitingmembersUpdatetList[i].identifier.trim().length < 11) {
                        this.show(this.translateService.translate('oidvtour.ssnformat'), 'warn');
                        return;
                    }
                }
                if (this.visitingmembersUpdatetList[i].verifiedFlag) {
                    this.visitingmembersUpdatetList[i].verifiedFlag = 'Y';
                } else {
                    this.visitingmembersUpdatetList[i].verifiedFlag = 'N';
                }
            }
        }
        this.visitingmembersCommitModel.insertList = this.visitingmembersInsertList;
        this.visitingmembersCommitModel.updateList = this.visitingmembersUpdatetList;

        if (this.visitingmembersDeleteList.length > 0) {
            for (let i = 0; i < this.visitingmembersDeleteList.length; i++) {
            }
            this.visitingmembersCommitModel.deleteList = this.visitingmembersDeleteList;
        }
        const visitingmembersSaveData = this.oidvtourFactory.visitingMembersCommit(this.visitingmembersCommitModel);
        visitingmembersSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                //this.oidvtourexecuteQueryRetrieve();
                this.oidvtourPopulateDetails();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
            }
        });
    }

    // executequery
    oidvtourexecuteQuery() {
        const serviceObj = this.oidvtourFactory.visitingGroupsExecuteQuery(this.visitinggroupsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                this.visitinggroupsData = data;
                this.visitinggroupsModel = this.visitinggroupsData[0];
            }
        });
    }

    isInsertable(date?) {
        if (this.visitinggroupModelBean.agyLocId || this.visitinggroupModelBean.visitDate
            || this.visitinggroupModelBean.startTime || this.visitinggroupModelBean.endTime || this.variableDisable) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
    }

    onFacilityBlur() {
        if (!this.visitinggroupModelBean.agyLocId) {
            this.visitinggroupModelBean.agyLocId = this.visitinggroupModelBean.agyLocId === '' ? undefined : '';
        }
    }
}
