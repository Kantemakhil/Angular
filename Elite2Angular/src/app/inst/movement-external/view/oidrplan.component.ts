import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidrplanService } from '@inst/movement-external/service/oidrplan.service';
import { ReleasePlans } from '@inst/movement-external/beans/ReleasePlans';
import { OffenderChecklistDetails } from '@inst/movement-external/beans/OffenderChecklistDetails';
import { ReleasePlansCommitBean } from '@inst/movement-external/beans/ReleasePlansCommitBean';
import { OffenderChecklistDetailsCommitBean } from '@inst/movement-external/beans/OffenderChecklistDetailsCommitBean';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { Router } from '@angular/router';
import { EoffenderService } from '@common/iwp/service/eoffender.service';
// import required bean declarations

@Component({
    selector: 'app-oidrplan',
    templateUrl: './oidrplan.component.html'
})

export class OidrplanComponent implements OnInit {
    conditionflagValue = false;
    valueChangeFlag: boolean;
    @ViewChild('checkListGrid', { static: false }) checkListGrid: any;
    @ViewChild('releaseplansgrid', { static: true }) releaseplansgrid: any;
    actionName: string;
    updatedMap: Map<number, any> = new Map();
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    releaseplansData: ReleasePlans[] = [];
    releaseplansDataTemp: ReleasePlans[] = [];
    releaseplansModel: ReleasePlans = new ReleasePlans();
    releaseplansIndex: number;
    releaseplansInsertList: ReleasePlans[] = [];
    releaseplansUpdateList: ReleasePlans[] = [];
    releaseplansDeleteList: ReleasePlans[] = [];
    releaseplansCommitModel: ReleasePlansCommitBean = new ReleasePlansCommitBean();
    employmnetTemp: any[] = [];
    housingTemp: any[] = [];
    offchecklistdetData: OffenderChecklistDetails[] = [];
    offchecklistdetDataTemp: OffenderChecklistDetails[] = [];
    offchecklistdetModel: OffenderChecklistDetails = new OffenderChecklistDetails();
    offchecklistdetIndex: number;
    offchecklistdetInsertList: OffenderChecklistDetails[] = [];
    offchecklistdetUpdateList: OffenderChecklistDetails[] = [];
    offchecklistdetDeleteList: OffenderChecklistDetails[] = [];
    offchecklistdetCommitModel: OffenderChecklistDetailsCommitBean = new OffenderChecklistDetailsCommitBean();
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    releasePlansColumnDef: any[];
    offChecklistDetColumnDef: any[];
    releasePlansReadOnly: boolean;
    offChecklistDetReadOnly: boolean;
    ctrlReadOnly: boolean;
    rgcasemanagersRg: any[] = [];
    rgparoleagentsRg: any[] = [];
    rgplanstatusRg: any[] = [];
    rgemploymentstatusRg: any[] = [];
    rgproposedhousingRg: any[] = [];
    rgproposedemploymentRg: any[] = [];
    rgchecklistansRg: any[] = [];
    caseLoadId: any;
    releaseInsert: boolean;
    offCheckListInsert: boolean;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    reasonLink: any;
    rootOffenderId: number;
    offenderBookId: number;
    housingReadOnly: boolean;
    releaseReadOnly: boolean;
    savedisabled: boolean;
    assessment: any;
    assessmentDate: any;
    condition: any;
    saveButdisabled: boolean;
    releaseTableIndex = -1;
    offchecklistTableIndex = -1;
    keyDatesReadOnly: boolean;
    occupantsReadOnly: boolean;
    conditionReadOnly: boolean;
    ckeckBoxReadOnly: boolean;
    profileLink: any;
    profileType: any;
    checkListDelete: boolean;
    readonlyRelease: boolean;
    proposedHouseReadOnly: boolean;
    releasePlanIndex: any;
    employmentPopReadOnly: boolean;
    employmentReadOnly: boolean;
    flag: boolean;
    saveFlag: boolean;
    apprvFlag: boolean;
    propHouseFlag = false;
    propEmploymentFlag = false;
    conditionFlag: boolean;
    housingLov: any;
    test: any;
    releaseDelete: boolean;
    selectedTabIndex = 0;
    tempFlag : boolean =false;
    description: any;

    constructor(private oidrplanFactory: OidrplanService,
        public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService,
        private sessionManager: UserSessionManager,
        private router: Router,
        public dialogService: DialogService,
        private eoffenderService: EoffenderService,) {
        this.releasePlansColumnDef = [];
        this.offChecklistDetColumnDef = [];
    }
    onGridReady(event) {
    }
    ngOnInit() {
        this.selectedTabIndex = 0;
        this.flag = false;
        this.saveFlag = false;
        this.apprvFlag = false;
        this.housingReadOnly = true;
        this.proposedHouseReadOnly = true;
        this.releaseReadOnly = true;
        this.savedisabled = true;
        this.saveButdisabled = true;
        this.keyDatesReadOnly = true;
        this.occupantsReadOnly = true;
        this.conditionReadOnly = true;
        this.ckeckBoxReadOnly = true;
        this.checkListDelete = false;
        this.readonlyRelease = true;
        this.employmentPopReadOnly = true;
        this.employmentReadOnly = true;
        this.releaseDelete = true;
        this.conditionFlag = false;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.releasePlansColumnDef = [
            {
                fieldName: this.translateService.translate('common.createdate'), field: 'createDateTime', editable: false,
                datatype: 'date', width: 150
            },
            {
                fieldName: this.translateService.translate('oidrplan.casemanager'), field: 'caseManagerId', editable: true,
                link: 'oidrplan/rgCaseManagersRecordGroup?caseLoadId=' + this.caseLoadId, datatype: 'lov', width: 200,
                codeTitle: 'Id', descTitle: 'Name',source: 'OUMPERSO', required: true
            },
            {
                fieldName: this.translateService.translate('oidrplan.paroleagent'), field: 'paroleAgentId', editable: true,
                link: 'oidrplan/rgParoleAgentsRecordGroup?caseLoadId=' + this.caseLoadId, datatype: 'lov', width: 200,
                codeTitle: 'Id', descTitle: 'Name',source:'OUMPERSO'
            },
            {
                fieldName: this.translateService.translate('oidrplan.planstatus'), field: 'planStatus', editable: true,
                 datatype: 'lov', width: 150,domain:'RPLAN_STS' //link: 'oidrplan/rgPlanStatusRecordGroup',
            },
            {
                fieldName: this.translateService.translate('oidrplan.lastupdated'), field: 'modifyDateTime',
                editable: false, datatype: 'date', width: 200
            },
            { fieldName: this.translateService.translate('oidrplan.updatedby'), field: 'updatedBy', editable: false, width: 150 },
        ];
        if (!this.vHeaderBlockModel) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
    }
    onOffenderChange(offender) {
        this.releaseplansData = [];
        this.offchecklistdetData = [];
        this.releaseplansModel = new ReleasePlans();
        this.offchecklistdetModel = new OffenderChecklistDetails();
        if (offender) {
            if (offender.offenderBookId) {
            this.conditionFlag = false;
            this.vHeaderBlockModel = offender;
            if (this.vHeaderBlockModel.rootOffenderId) {
                this.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
                this.releaseHousing();
            }
            if (this.vHeaderBlockModel.offenderBookId) {
                this.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                
            }
            this.oidrplanexecuteQuery();
        }
        } else {
            this.vHeaderBlockModel = new VHeaderBlock();
            this.conditionReadOnly = true;
            this.conditionFlag = true;
            this.releaseplansData = [];
            this.releaseplansModel = new ReleasePlans();
            this.offchecklistdetData = [];
            this.offchecklistdetModel = new OffenderChecklistDetails();
            this.saveButdisabled = true;
            this.releaseInsert = false;
            this.offCheckListInsert = false;
            this.housingReadOnly = true;
            this.releaseReadOnly = true;
            this.savedisabled = true;
            this.employmentPopReadOnly = true;
            this.employmentReadOnly = true;
            this.releaseplansModel.proposedHousing = '';
            this.releaseplansModel.addressType = '';
            this.releaseplansModel.housingComment = '';
            this.releaseplansModel.proposedEmployment = '';
            this.releaseplansModel.employmentComment = '';
            this.releaseplansModel.agentRecommend = '';
            this.proposedHouseReadOnly = true;
            this.propHouseFlag = false;
            this.propEmploymentFlag = false;
            this.occupantsReadOnly = true;
        }
    }
    valueChange(event) {
        if (this.valueChangeFlag) {
            if (event && event.listSeq) {
                this.updatedMap.set(Number(event.listSeq), event);
            }
        } else {
            this.valueChangeFlag = false;
        }
        if (event.profileCode !== event.profileCodeVal) {
            this.saveButdisabled = false;
        }
    }
    releaseEmployment() {
        const releasePlansServiceObj = this.oidrplanFactory.rgProposedEmploymentRecordGroup(this.offenderBookId);
        releasePlansServiceObj.subscribe(emplomentList => {
            if (emplomentList.length === 0) {
                this.employmnetTemp = [];
                this.employmentReadOnly = true;
                this.propEmploymentFlag = true;
                return;
            } else {
                this.employmentReadOnly = true;
                this.propEmploymentFlag = false;
                for (let i = 0; i < emplomentList.length; i++) {
                    this.employmnetTemp = [];
                    this.employmnetTemp.push({ 'text': emplomentList[i].addr });
                }
            }
        });
    }
    releaseHousing() {
        const staffmembersServiceObj = this.oidrplanFactory.rgProposedHousingRecordGroup(this.rootOffenderId);
        staffmembersServiceObj.subscribe(housingList => {
            if (housingList.length === 0) {
                this.housingTemp = [];
                this.housingReadOnly = true;
                this.proposedHouseReadOnly = true;
                this.propHouseFlag = true;
                this.occupantsReadOnly = true;
                return;
            } else {
                // this.occupantsReadOnly = false;
                this.propHouseFlag = false;
                this.housingReadOnly = false;
                this.proposedHouseReadOnly = true;
                for (let i = 0; i < housingList.length; i++) {
                    this.housingTemp = [];
                    this.housingTemp.push({ 'text': housingList[i].addr });
                }
            }
        });
    }
    onRowClickreleaseplans(event) {
        if (event) {
            if (event.conditions) {
                this.conditionflagValue = true;
              } else {
                  this.conditionflagValue = false;
              }
              this.eoffenderService.selectedRowData=event;
            if (this.releaseplansModel.releasePlanId && this.releaseplansModel.addressId) {
                this.occupantsReadOnly = false;
            } else {
                this.occupantsReadOnly = true;
            }
            if (event.releasePlanId === this.releaseplansModel.releasePlanId) {
                 return;
            }
            this.releaseplansModel = event;
           
            this.updatedMap.clear();
            if (this.releaseplansModel.releasePlanId) {
                 this.saveButdisabled = true;
                this.offCheckListInsert = true;
                this.releaseReadOnly = false;
                this.savedisabled = true;
                if (this.flag === true) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrplan.casemanagermustbeentered');
                    this.show();
                    return;
                }
                if (!this.savedisabled) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrplan.pleasesaveplease');
                    this.show();
                    if (this.apprvFlag === true) {
                        this.onPopup();
                    }
                    return;
                }
                this.offchecklistdetModel = new OffenderChecklistDetails();
                this.offchecklistdetModel.offenderChecklistId = this.releaseplansModel.releasePlanId;
                this.offchecklistdetExecuteQuery();
            } else if (!this.releaseplansModel.releasePlanId) {
                this.saveButdisabled = true;
                this.offCheckListInsert = false;
                this.releaseReadOnly = true;
                this.savedisabled = true;
                this.releaseplansModel.proposedHousing = '';
                this.releaseplansModel.addressType = '';
                this.releaseplansModel.housingComment = '';
                this.releaseplansModel.proposedEmployment = '';
                this.releaseplansModel.employmentComment = '';
                this.releaseplansModel.agentRecommend = '';
                this.occupantsReadOnly = true;
                this.conditionflagValue = false;
            }
        } else {
            this.occupantsReadOnly = true;
            this.eoffenderService.selectedRowData=null;
            this.offchecklistdetModel = new OffenderChecklistDetails();
            this.releaseplansModel =new  ReleasePlans();
            this.offchecklistdetData = [];
            this.conditionflagValue = false;
        }
    }
    onButKeyDatesclick() {
    }
    allowNumbers(event) {
    }
    onButOccupantsclick() {
    }
    onButConditionsclick() {
    }
    onRowClickoffchecklistdet(event) {
        if (event) {
            this.offchecklistdetModel = event;
            if (this.saveFlag === true) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrplan.pleasesavereleaseplanblock');
                this.show();
                if (this.apprvFlag === true) {
                    this.onPopup();
                }
                return;
            }
        }
    }
    clickCheckList() {
        if (this.saveFlag === true) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrplan.pleasesavereleaseplanblock');
            this.show();
            if (this.apprvFlag === true) {
                this.onPopup();
            }
            return;
        }
    }
    onPopup() {
        const serviceObj = this.oidrplanFactory.rpReadyForApproval(this.releaseplansModel);
        serviceObj.subscribe(data => {
            if (data.description!=null) {
                const Dialogdata = {
                    label: data.description, yesBtn: true, noBtn: false, allowLineGap: true,
                    yesLabel: this.translateService.translate('common.ok')
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', Dialogdata, 50).subscribe(result => {
                    if (result) {
                        this.tempFlag=true;
                        return;
                    }
                });
            }
            else {
                this.tempFlag=false;
            }
        });
    }
    onButOkclick() {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onGridInsert = () => {
        this.housingReadOnly = true;
        this.employmentPopReadOnly = true;
        for (let i = 0; i < this.releaseplansData.length; i++) {
            if (!this.releaseplansData[i].caseManagerId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidrplan.casemanagermustbeentered');
                this.show();
                return;
            }
        }
        this.releaseDelete = false;
        if (this.releaseplansModel.releasePlanId) {
            this.flag = true;
        }
        if (this.saveFlag === true) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrplan.pleasesaveplease');
            this.show();
            return;
        }
        return { createDateTime: DateFormat.getDate(), modifyDateTime: DateFormat.getDate() };
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    getDialogData(event) {
        if (event) {
            this.releaseplansModel.proposedHousing = event.proposedHousing;
            this.savedisabled = false;
        }
    }
    getProposedHousingData(event) {
        if (event) {
            this.releaseplansModel.proposedEmployment = event.proposedEmployment;
            this.releaseplansModel.employSeq = event.employSeq;
            this.savedisabled = false;
        }
    }
    isInsertable() {
            this.updatedMap.set(Number(this.offchecklistdetModel.listSeq), this.offchecklistdetModel);
        if (this.offchecklistdetModel.commentText || this.offchecklistdetModel.profileCode) {
            this.saveButdisabled = false;
        } else {
            this.saveButdisabled = true;
        }
    }
    onGridDelete = () => {
        if (this.releaseplansModel.housingComment || this.releaseplansModel.proposedEmployment || this.releaseplansModel.employmentStatus
            || this.releaseplansModel.employmentComment || this.releaseplansModel.agentRecommend || this.offchecklistdetModel.profileCode) {
            this.type = 'info';
            this.message = this.translateService.translate('oidmhist.cannotdeletemaster');
            this.show();
            return;
        }
        this.releaseInsert = false;
        this.releaseDelete = false;
        return true;
    }
    onGridClear = () => {
        this.releaseInsert = true;
        this.saveFlag = false;
        this.flag = false;
        this.apprvFlag = false;
        this.releaseDelete = true;
        this.releaseHousing();
        this.releaseHousing();
        this.oidrplanexecuteQuery();
        return true;
    }
    oidrplanSavereleaseplansForm(event) {
        this.releaseplansInsertList = event.added;
        for (let i = 0; i < this.releaseplansInsertList.length; i++) {
            if (this.releaseplansInsertList[i].planStatus === 'APPRV') {
                this.onPopup();
                if (this.tempFlag) {
                    return;
                }
            }
        }
        this.releaseplansUpdateList = event.updated;
        for (let i = 0; i < this.releaseplansUpdateList.length; i++) {
            if (this.releaseplansUpdateList[i].planStatus === 'APPRV') {
                this.onPopup();
                if (this.tempFlag) {
                    return;
                }
            }
        }

        this.releaseplansDeleteList = event.removed;
        this.releaseplansCommitModel.insertList = [];
        this.releaseplansCommitModel.updateList = [];
        this.releaseplansCommitModel.deleteList = [];
        if (this.releaseplansInsertList.length > 0 || this.releaseplansUpdateList.length > 0) {
            for (let i = 0; i < this.releaseplansInsertList.length; i++) {
                if (!this.releaseplansInsertList[i].caseManagerId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrplan.casemanagermustbeentered');
                    this.show();
                    return;
                }
                this.releaseplansInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.releaseplansInsertList[i].rootOffenderId = this.vHeaderBlockModel.rootOffenderId;
                this.releaseplansInsertList[i].createDateTime = DateFormat.getDate();
                this.releaseplansInsertList[i].createUserId = this.sessionManager.getId();
                this.releaseplansInsertList[i].updatedBy = this.sessionManager.getId();
                this.releaseplansInsertList[i].modifyDateTime = DateFormat.getDate();
            }
            for (let i = 0; i < this.releaseplansUpdateList.length; i++) {
                if (!this.releaseplansUpdateList[i].caseManagerId) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidrplan.casemanagermustbeentered');
                    this.show();
                    return;
                }
            }
            this.releaseplansCommitModel.insertList = this.releaseplansInsertList;
            this.releaseplansCommitModel.updateList = this.releaseplansUpdateList;
        }
        if (this.releaseplansDeleteList.length > 0) {
            for (let i = 0; i < this.releaseplansDeleteList.length; i++) {
            }
            this.releaseplansCommitModel.deleteList = this.releaseplansDeleteList;
        }
        const releaseplansSaveData = this.oidrplanFactory.releasePlansCommit(this.releaseplansCommitModel);
        releaseplansSaveData.subscribe(data => {
            if (data > 0) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.oidrplanexecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.oidrplanexecuteQuery();
                return;
            }
        });
    }

    onButSave() {
        this.releaseplansInsertList = [];
        this.releaseplansUpdateList = [];
        this.releaseplansDeleteList = [];
        if (this.releaseplansModel.planStatus === 'APPRV') {
            this.onPopup();
            if (this.tempFlag) {
                return;
            }
        }
        this.releaseplansUpdateList.push(this.releaseplansModel);
        this.releaseplansCommitModel.updateList = this.releaseplansUpdateList;
        if (!this.savedisabled) {
            const releaseplansSaveData = this.oidrplanFactory.releasePlansCommit(this.releaseplansCommitModel);
            releaseplansSaveData.subscribe(data => {
                if (data > 0) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.savedisabled = true;
                    return;
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }
    }
    // execute query
    oidrplanexecuteQuery() {
        this.releaseplansModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.oidrplanFactory.
            releasePlansExecuteQuery(this.releaseplansModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.releaseInsert = true;
                this.housingReadOnly = true;
                this.releaseReadOnly = true;
                this.savedisabled = true;
                this.offCheckListInsert = false;
                this.releaseDelete = false;
                this.keyDatesReadOnly = true;
                this.conditionFlag = true;
                this.conditionReadOnly = true;
                this.releaseplansModel =new ReleasePlans();
                this.releaseplansData = [];
                this.occupantsReadOnly = true;
                this.employmentPopReadOnly = true;
            } else {
                data.forEach(element => {
                    element.conditions = element.conditions === 'Y' ? true : false;
                });
                this.releaseplansDataTemp = JSON.parse(JSON.stringify(data));
                this.releaseplansData = data;
                this.releaseplansModel = this.releaseplansData[0];
                this.releasePlanIndex = data.length;
                this.releaseInsert = true;
                this.releaseReadOnly = false;
                this.savedisabled = true;
                this.offCheckListInsert = false;
                this.saveFlag = false;
                this.flag = false;
                this.apprvFlag = false;
                this.releaseDelete = true;
                this.releaseTableIndex = 0;
                this.keyDatesReadOnly = false;
                this.conditionFlag = false;
                this.conditionReadOnly = false;
                this.housingReadOnly = false;
                this.employmentPopReadOnly = false;
                this.releaseEmployment();
                if (this.releaseplansModel.releasePlanId) {
                    this.offchecklistdetModel = new OffenderChecklistDetails();
                    this.offchecklistdetModel.offenderChecklistId = this.releaseplansModel.releasePlanId;
                    this.offchecklistdetExecuteQuery();
                }
            }
        });
    }
    offchecklistdetExecuteQuery() {
        const offchecklistdetResult = this.oidrplanFactory.offChecklistDetExecuteQuery(this.offchecklistdetModel);
        offchecklistdetResult.subscribe(data => {
            if (data.length === 0) {
                this.offchecklistdetData = [];
                this.valueChangeFlag = false;
            } else {
                data.forEach(element => {
                    if (element.updateAllowedFlag === 'N') {
                        element.readonly = true;
                    } else if (element.codevalueType === 'CODE' && element.count === 0) {
                        element.readonly = true;
                    }
                });
                this.offchecklistdetData = data;
                this.offchecklistdetModel = data[0];
                this.offchecklistTableIndex = 0;
                this.saveButdisabled = true;
                this.valueChangeFlag = true;
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oidrplanSaveoffchecklistdetForm(event) {
        this.offchecklistdetInsertList = event.added;
        this.offchecklistdetUpdateList = event.updated;
        this.offchecklistdetDeleteList = event.removed;
        this.offchecklistdetCommitModel.insertList = [];
        this.offchecklistdetCommitModel.updateList = [];
        this.offchecklistdetCommitModel.deleteList = [];
        if (this.offchecklistdetInsertList.length > 0 || this.offchecklistdetUpdateList.length > 0) {
            for (let i = 0; i < this.offchecklistdetUpdateList.length; i++) {
            }
            this.offchecklistdetCommitModel.insertList = this.offchecklistdetInsertList;
            this.offchecklistdetCommitModel.updateList = this.offchecklistdetUpdateList;
        }
        if (this.offchecklistdetDeleteList.length > 0) {
            for (let i = 0; i < this.offchecklistdetDeleteList.length; i++) {
            }
            this.offchecklistdetCommitModel.deleteList = this.offchecklistdetDeleteList;
        }
        const offchecklistdetSaveData = this.oidrplanFactory.offChecklistDetCommit(this.offchecklistdetCommitModel);
        offchecklistdetSaveData.subscribe(data => {
            if (data > 0) {
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offchecklistdetExecuteQuery();
                return;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.offchecklistdetExecuteQuery();
                return;
            }
        });
    }
    onCheckListSave(event) {
       
        this.offchecklistdetInsertList = [];
        this.offchecklistdetUpdateList = [];
        this.offchecklistdetDeleteList = [];
        this.updatedMap.forEach(element => {
            this.offchecklistdetUpdateList.push(element);
        });

        if (!this.offchecklistValidation(this.offchecklistdetUpdateList)) {
			return;
		}

        this.offchecklistdetCommitModel.updateList = this.offchecklistdetUpdateList;
        if (!this.saveButdisabled) {
            const offchecklistdetSaveData = this.oidrplanFactory.offChecklistDetCommit(this.offchecklistdetCommitModel);
            offchecklistdetSaveData.subscribe(checklistData => {
                if (checklistData > 0) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.show();
                    this.offchecklistdetExecuteQuery();
                    return;
                } else {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    this.offchecklistdetExecuteQuery();
                    return;
                }
            });
        }
    }
   
    itemGenerator = (event) => {
        this.releasePlanIndex = 0;
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.data.caseManagerId) {
            this.saveFlag = true;
            this.flag = false;
        }
        if (event.oldValue !== event.newValue) {
            if (event.field === 'planStatus') {
                if (event.data.planStatus) {
                    if (event.data.planStatus === 'APPRV') {
                        this.onPopup();
                        this.apprvFlag = true;
                    }
                }
            }
            rowdata.validated = true;
        }
        return rowdata;
    }
    clickApprove() {
        if (this.apprvFlag === true) {
            this.onPopup();
        }
    }
    clickProposedHousing() {
        if (this.propHouseFlag === true) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.listofvalues');
            this.show();
            return;
        }
    }
    clickProposedEmployment() {
        if (this.propEmploymentFlag === true) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.listofvalues');
            this.show();
            return;
        }
    }
    onKeyDatesBtnclick = () => {
        if (this.releaseplansModel.releasePlanId) {
            this.oidrplanFactory.launchFlag = true;
            this.oidrplanFactory.exitFlag = true;
            this.router.navigate(['/OCDLEGLS']);
        } else {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrplan.pleasecalloidsenkd');
            this.show();
            return;
        }
    }
    setDescription(event) {
        this.oidrplanexecuteQuery();
    }
    conditionsValidation() {
        if (this.conditionFlag === true) {
              this.type = 'warn';
              this.message = this.translateService.translate('oidrplan.youmustsavethechanges');
              this.show();
              return;
        }
  }
  get conditionBtnDisable() {
    if(this.releaseplansgrid.addedMap.size> 0 || this.releaseplansgrid.removedMap.size>0
        || this.releaseplansgrid.updatedMap.size > 0 || this.releaseplansData.length == 0){
            return true;
        }
      if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId) {
        return false;
      }
      return true;
  }
  setDisableCode(event) {
     if (this.offchecklistdetModel.updateAllowedFlag === 'N') {
        return true;
     } else if (event.count === 0) {
        return true;
      }
      return false;
    }
    setDisableText(event) {
        if (this.offchecklistdetModel.updateAllowedFlag === 'N') {
            return true;
         }
          return false;
    }
    isEnable() {
      this.savedisabled = false;
    }
    statusChange(event) {
        if (event) {
            this.savedisabled = false;
        }
    }
    onCondLaunchClick = () => {
        const Dialogdata = {
            category: 'RELEASE', offenderBookId: this.vHeaderBlockModel.offenderBookId, line: 1,
            releasePlanId : this.releaseplansModel.releasePlanId
        };
        this.dialogService.openLinkDialog('/OCUCONDI', Dialogdata, 50).subscribe(result => {
            if (result ) {
                this.conditionflagValue = true;
            } else {
                this.conditionflagValue = false;
            }
        });
    }
    whenTabChangedTrigger(event) {
        if (event.index !== 0 && !this.savedisabled ) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidrplan.pleasesaveplease');
            this.show();
             setTimeout(() => { this.selectedTabIndex = 0; }, 0);
            return;
        }
    }

    get disableKeyDateButton(){
        if(this.releaseplansModel.releasePlanId){
            return false;
        } else {
            return true;
        }
    }


    offchecklistValidation(offchecklistdetData: any) {
        const is = { valid: true };
	    for ( let i = 0; i <   this.offchecklistdetData.length; i++ ) {
        if ( this.offchecklistdetData[i].mandatoryFlag==='N' && !this.offchecklistdetData[i]['profileCode']) {
               this.type = 'warn';
                this.message = this.translateService.translate(this.offchecklistdetData[i]['description']+' must be entered');
                this.show();
                return;
        }
    }
		return is.valid;
    }

    ngOnDestroy(){
        if(!this.router.url.includes('/EOFFENDER')){
            this.eoffenderService.selectedRowData=null;
        }
       
    }

}
