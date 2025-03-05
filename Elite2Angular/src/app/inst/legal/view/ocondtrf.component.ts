import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderAllocationsSentences } from '../beans/OffenderAllocationsSentences';
import { OffenderCondTransfer } from '../beans/OffenderCondTransfer';
import { OffenderCondTransferCommitBean } from '../beans/OffenderCondTransferCommitBean';
import { OcondawaitService } from '../service/ocondawait.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';

@Component({
    selector: 'S4-ocondtrf',
    templateUrl: './ocondtrf.component.html'
})
export class OcondtrfComponent implements OnInit {
    @ViewChild('condtionsGrid', { static: true }) condtionsGrid: any;
    msgs: any[] = [];
    agencyCountTypesModel: any;

    locationLink: String;
    staffMemberLink: String;
    teamLink: String;
    teamMemLink: String;

    offendersColDef: any[];
    sentencesColumnDef: any[];
    conditionsColDef: any[];

    offendersData: any[] = [];
    sentencesData: any[] = [];
    conditionsData: OffenderCondTransfer[] = [];
    offenderSentenceData: OffenderAllocationsSentences[] = [];
    offenderSentenceModel: OffenderAllocationsSentences = new OffenderAllocationsSentences();
    conditionsModel: OffenderCondTransfer = new OffenderCondTransfer();
    offAllocatSentenceSearchBean: OffenderAllocationsSentences = new OffenderAllocationsSentences();
    offenderCondTransferInsertList: OffenderCondTransfer[] = [];
    offenderCondTransferUpdatetList: OffenderCondTransfer[] = [];
    offenderCondTransferDeleteList: OffenderCondTransfer[] = [];
    offenderCondTransferCommitModel: OffenderCondTransferCommitBean = new OffenderCondTransferCommitBean();
    offendersColumnDef: any[];
    locationValue: string;
    teamId: any;
    selectedConditionIndex: number;
    selectedSentenceIndex: number;
    searchDisabled: boolean = false;
    clearDisabled: boolean = true;
    toStaffId: any;
    toTeamId: any;
    toTeamMemberId: any;
    toAgyLocId: any;
    selectAll: any;
    teamCode: any;
    numberOfOffenders: number;
    applyToAllDisable: boolean;
    lovTitles = { description: this.translateService.translate('common.description') , teamCode: this.translateService.translate('ocondtrf.teamcode') };
    trnsfrTeamLink: string;
    constructor(public sessionManager: UserSessionManager, public translateService: TranslateService, private ocondawaitFactory: OcondawaitService) {
        this.offendersColumnDef = [];
        this.sentencesColumnDef = [];
        this.conditionsColDef = [];
    }

    ngOnInit(): void {
        this.applyToAllDisable = true;
        this.offenderSentenceData = [];
        this.locationLink = '/ocondawait/rgLocationRecGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        this.staffMemberLink = '/ocondawait/getStaffDetails?caseLoadId=' + this.sessionManager.currentCaseLoad;
        this.offendersColumnDef = [
            {
                fieldName: this.translateService.translate('system-profile.off-id-code'), field: 'offenderIdDisplay', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.name-last'), field: 'lastName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('system-profile.name-given-1'), field: 'firstName', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocondawait.sentenceType'), field: 'commenceType', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/populateSentType?sentCategory=',
                parentField: 'orderType'
            },
            {
                fieldName: this.translateService.translate('ocondtrf.matter'), field: 'matter', editable: false, width: 150, datatype: 'text'
            },

        ];
        this.conditionsColDef = [
            {
                fieldName: this.translateService.translate('ocondtrf.select'), field: 'transferFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocondtrf.conditiondescription'), field: 'description', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocondtrf.assignedteam'), field: 'teamId', editable: false, width: 150, datatype: 'lov',
                link: '/ocondawait/rgTransferTeamRecGroup?caseLoadId=', parentField: 'parentField',titles: this.lovTitles
            },
            {
                fieldName: this.translateService.translate('ocondtrf.assignedofficer'), field: 'officersName', editable: false, width: 150,// datatype: 'lov', link: this.staffMemberLink
            },
            {
                fieldName: this.translateService.translate('ocondtrf.legaltext'), field: 'legalTextButton', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'launch', data: 'row', updateField: 'row', link: 'CONDLEGALTEXT'

            },
            {
                fieldName: this.translateService.translate('ocondtrf.toanotherstaffmember'), field: 'toStaffId', editable: true, width: 150, datatype: 'lov',
                link: '/ocondawait/getStaffDetails?caseLoadId=' + this.sessionManager.currentCaseLoad,//cellEditable: this.cellEdit
            },
            {
                fieldName: this.translateService.translate('ocondtrf.toanotherteam'), field: 'toTeamId', editable: true, width: 150, datatype: 'lov',
                link: '/ocondawait/rgTransferTeamRecGroup?caseLoadId=', parentField: 'parentField',//cellEditable: this.cellEdit
            },
            {
                fieldName: this.translateService.translate('ocondtrf.toanotherteammember'), field: 'toTeamMemberId', editable: true, width: 150, datatype: 'lov',
                link: '/ocondawait/getTeamMemberDetails?teamId=', parentField: 'toTeamId',//cellEditable: this.cellEdit
            },
            {
                fieldName: this.translateService.translate('ocondtrf.toanotherlocation'), field: 'toAgyLocId', editable: true, width: 150, datatype: 'lov',
                link: this.locationLink
            },
            {
                fieldName: '', field: 'parentField', hide: true
            },
            {
                fieldName: '', field: 'longCommentText', hide: true

            },

        ]
    }

    cellEdit = (data: any, index: number, field: string): boolean => {
        if(field == 'toStaffId' &&! this.offAllocatSentenceSearchBean.staffId){
            return false;
        }else if(field == 'toTeamId' && !this.offAllocatSentenceSearchBean.teamId){
            return false;
        }else if(field == 'toTeamMemberId' && !this.offAllocatSentenceSearchBean.teamMemberId){
            return false;
        }
        return true;
    }

    locationCodeChange(event) {
        if (event) {
            this.teamLink = '/ocondawait/rgTeamRecGroup?caseLoadId=' + this.offAllocatSentenceSearchBean.agyLocId;
            this.trnsfrTeamLink = '/ocondawait/rgTransferTeamRecGroup?caseLoadId=' + this.offAllocatSentenceSearchBean.agyLocId;
            this.clearDisabled = false;
        } else {
            this.teamLink = undefined;
            this.teamId = undefined;
            this.clearDisabled = true;
        }
    }
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    getAssignedConditions() {
        this.ocondawaitFactory.getAssignedConditions(this.offenderSentenceModel).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(e => {
                    e['legalTextButton'] = '';
                    e.staffId = e.staffId ? String(e.staffId) : String(e.toStaffId);
                    e['parentField'] = this.offAllocatSentenceSearchBean.agyLocId;
                    e.teamId = e.teamId ? String(e.teamId) : String(e.toTeamId);
                    e.toAgyLocId = undefined; 
                });
                this.conditionsData = data;
                this.selectedConditionIndex = 0;
                this.applyToAllDisable = false;
            } else {
                this.conditionsData = [];
                this.conditionsModel = new OffenderCondTransfer();
                this.applyToAllDisable = true;
            }
        });
    }

    onConditonsRowClicked(event) {
        if (event) {
            this.conditionsModel = event;
        } else {
            this.conditionsModel = new OffenderCondTransfer();
        }
    }
    onOffSentencesRowClicked(event) {
        this.selectAll = false;
        this.toStaffId = undefined;
        this.toTeamId = undefined;
        this.toTeamMemberId = undefined;
        this.toAgyLocId = undefined;
        if (event) {
            this.offenderSentenceModel = event;
            this.offenderSentenceModel.caseLoadId = this.offAllocatSentenceSearchBean.agyLocId;
            if(this.offAllocatSentenceSearchBean.staffId){
                this.offenderSentenceModel.staffId = Number(this.offAllocatSentenceSearchBean.staffId);
            }
            if(this.offAllocatSentenceSearchBean.teamId){
                this.offenderSentenceModel.teamId = Number(this.offAllocatSentenceSearchBean.teamId);
            }
            if(this.offAllocatSentenceSearchBean.teamMemberId){
                this.offenderSentenceModel.teamMemberId = Number(this.offAllocatSentenceSearchBean.teamMemberId);
            }
            
            this.getAssignedConditions();
        } else {
            this.offenderSentenceModel = new OffenderAllocationsSentences();
        }
    }

    teamCodeChange(event) {
        if (event) {
            this.offAllocatSentenceSearchBean.teamId = event.teamId;
        } else {
            this.offAllocatSentenceSearchBean.teamId = undefined;
        }

    }


    onButClearCountclick() {

    }
    retrieve() {
        const payLoad = {};
        payLoad['moduleName'] = 'OCONDTRF';
        payLoad['caseLoadId'] = this.offAllocatSentenceSearchBean.agyLocId;
        payLoad['staffId'] = this.offAllocatSentenceSearchBean.staffId;
        payLoad['teamMemberId'] = this.offAllocatSentenceSearchBean.teamMemberId;
        payLoad['teamId'] = this.offAllocatSentenceSearchBean.teamId;
        this.ocondawaitFactory.getAssignedCondOffenders(payLoad).subscribe(data => {
            if (data && data.length > 0) {
                const offenderBookId = [];
                var numberOfOffenders = 0;
                data.forEach(e => {
                    const findOffenders = offenderBookId.find(ele => ele == e.offenderBookId)
                    if(!findOffenders){
                        offenderBookId.push(e.offenderBookId);
                        numberOfOffenders += 1;
                    }
                });
                this.numberOfOffenders = numberOfOffenders;
                this.offenderSentenceData = data;
                this.offenderSentenceModel = data[0];
                this.selectedSentenceIndex = 0;
                this.searchDisabled = true;
            } else {
                this.show('common.querycaused');
                this.offenderSentenceData = [];
                this.conditionsData = [];
                this.offenderSentenceModel = new OffenderAllocationsSentences();
                this.conditionsModel = new OffenderCondTransfer();
                this.searchDisabled = false;
                this.numberOfOffenders = undefined;
            }
        });

    }
    offenderCondTransferSaveForm(event) {
        this.offenderCondTransferInsertList = event.updated;
        this.offenderCondTransferDeleteList = event.removed;
        this.offenderCondTransferCommitModel.insertList = [];
        this.offenderCondTransferCommitModel.updateList = [];
        this.offenderCondTransferCommitModel.deleteList = [];
        let selectedCondCount = this.conditionsData.filter(e => e.transferFlag).length;
        if (selectedCondCount === 0) {
            this.show('ocondtrf.pleaseselectatleastonecondition', 'warn');
            return;
        }
        if (this.offenderCondTransferInsertList.length > 0) {
            for (let i = 0; i < this.offenderCondTransferInsertList.length; i++) {
                if (this.offenderCondTransferInsertList[i].transferFlag) {
                    if (!this.offenderCondTransferInsertList[i].toStaffId && !this.offenderCondTransferInsertList[i].toAgyLocId &&
                        !this.offenderCondTransferInsertList[i].toTeamId && !this.offenderCondTransferInsertList[i].toTeamMemberId) {
                            if(this.toStaffId || this.toTeamId || this.toTeamMemberId || this.toAgyLocId){
                                this.show(this.translateService.translate('ocondtrf.applytoallvalidation'));
                                return;
                            }else{  
                                this.show('ocondtrf.pleaseselectanyoneassignee', 'warn');
                                return;
                            }
                    }
                    if (this.offenderCondTransferInsertList[i].toStaffId) {
                        if(this.offAllocatSentenceSearchBean.staffId == this.offenderCondTransferInsertList[i].toStaffId){
                            this.show('ocondtrf.assignedtosamestaffmember', 'warn');
                            return;
                        }

                        this.offenderCondTransferInsertList[i].toStaffId = Number(this.offenderCondTransferInsertList[i].toStaffId);
                        this.offenderCondTransferInsertList[i].toTeamId = undefined;
                        this.offenderCondTransferInsertList[i].toTeamMemberId = undefined;
                        this.offenderCondTransferInsertList[i].staffId = undefined;
                        this.offenderCondTransferInsertList[i].teamId = undefined;
                        this.offenderCondTransferInsertList[i].teamMemberId = undefined;

                    } else if (this.offenderCondTransferInsertList[i].toTeamId) {
                        this.offenderCondTransferInsertList[i].rcvdFromTeam = (this.offenderCondTransferInsertList[i].teamId && Number(this.offenderCondTransferInsertList[i].teamId)) != 0 ? Number(this.offenderCondTransferInsertList[i].teamId) : undefined;
                        this.offenderCondTransferInsertList[i].staffId = undefined;
                        this.offenderCondTransferInsertList[i].teamId = undefined;
                        this.offenderCondTransferInsertList[i].teamMemberId = undefined;
                        this.offenderCondTransferInsertList[i].toStaffId = undefined;

                        if (this.offenderCondTransferInsertList[i].toTeamMemberId) {
                            this.offenderCondTransferInsertList[i].toTeamMemberId = Number(this.offenderCondTransferInsertList[i].toTeamMemberId);
                        } else {
                            if(this.offAllocatSentenceSearchBean.teamId == this.offenderCondTransferInsertList[i].toTeamId && !this.offenderCondTransferInsertList[i].toTeamMemberId){
                                this.show('ocondtrf.assignedtosameteam', 'warn');
                                return;
                            }
                            this.offenderCondTransferInsertList[i].toTeamMemberId = undefined;
                        }
                    } else {
                        this.offenderCondTransferInsertList[i].toStaffId = undefined;
                        this.offenderCondTransferInsertList[i].toTeamId = undefined;
                        this.offenderCondTransferInsertList[i].toTeamMemberId = undefined;
                        this.offenderCondTransferInsertList[i].staffId = undefined;
                        this.offenderCondTransferInsertList[i].teamId = undefined;
                        this.offenderCondTransferInsertList[i].teamMemberId = undefined;
                    }
                    if (!this.offenderCondTransferInsertList[i].toAgyLocId) {
                        this.offenderCondTransferInsertList[i].toAgyLocId = this.offAllocatSentenceSearchBean.agyLocId;
                        this.offenderCondTransferInsertList[i].agyLocId = undefined;
                    }else{
                        if(this.offAllocatSentenceSearchBean.agyLocId === this.offenderCondTransferInsertList[i].toAgyLocId){
                            this.show('ocondtrf.assignedtosamelocation');
                            return;
                        }
                        this.offenderCondTransferInsertList[i].rcvdFromLoc = this.offAllocatSentenceSearchBean.agyLocId;
                        this.offenderCondTransferInsertList[i].agyLocId = undefined;
                    }

                    this.offenderCondTransferInsertList[i].parentCondTransferId = this.offenderCondTransferInsertList[i].conTransferId;
                    this.offenderCondTransferInsertList[i].offenderBookId = this.offenderSentenceModel.offenderBookId;
                    if((this.offenderCondTransferInsertList[i].toTeamId && this.offenderCondTransferInsertList[i].toTeamMemberId) || 
                         this.offenderCondTransferInsertList[i].toStaffId){
                        this.offenderCondTransferInsertList[i].condiStatus = 'ASSIGNED';
                    }else{
                        this.offenderCondTransferInsertList[i].condiStatus = 'TRANSFERRED';
                    }
                    this.offenderCondTransferInsertList[i].moduleId = 'OCONDTRF'
                    this.offenderCondTransferCommitModel.insertList.push(this.offenderCondTransferInsertList[i]);
                }
            }
        }
        const sencalcSaveData = this.ocondawaitFactory.offenderCondTransferSaveForm(this.offenderCondTransferCommitModel);
        sencalcSaveData.subscribe(data => {
            if (data[0] && data[0].listSeq === 1) {
                this.toStaffId = undefined;
                this.toTeamId = undefined;
                this.toTeamMemberId = undefined;
                this.toAgyLocId = undefined;
                this.selectAll = false;
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                if (this.offenderCondTransferCommitModel.insertList.length === this.conditionsData.length) {
                    this.retrieve();
                } else {
                    this.getAssignedConditions();
                }
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }

    clear() {
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.offenderSentenceData = [];
        this.conditionsData = [];
        this.offenderSentenceModel = new OffenderAllocationsSentences();
        this.conditionsModel = new OffenderCondTransfer();
        this.offAllocatSentenceSearchBean = new OffenderAllocationsSentences();
        this.toStaffId = undefined;
        this.toTeamId = undefined;
        this.toTeamMemberId = undefined;
        this.toAgyLocId = undefined;
        this.selectAll = false;
        this.numberOfOffenders = undefined;
        this.applyToAllDisable = true;
    }

    get staffMemberReadOnly() {
        if (this.searchDisabled || (this.offAllocatSentenceSearchBean && !this.offAllocatSentenceSearchBean.agyLocId)) {
            return true;
        } else if (!this.offAllocatSentenceSearchBean.teamId) {
            return false;
        }
        return true;
    }

    get teamIdrReadOnly() {
        if (this.searchDisabled || (this.offAllocatSentenceSearchBean && !this.offAllocatSentenceSearchBean.agyLocId)) {
            return true;
        } else if (!this.offAllocatSentenceSearchBean.staffId) {
            return false;
        }
        return true;
    }

    onApplyToAllClick() {
        let selectedCondCount = 0;
        if (!this.toStaffId && !this.toAgyLocId &&
            !this.toTeamId && !this.toTeamMemberId) {
            this.show('ocondtrf.pleaseselectanyoneassignee', 'warn');
            return;
        }
        this.conditionsData.forEach((e, i) => {
            if (e.transferFlag) {
                selectedCondCount += 1;
                this.condtionsGrid.setColumnData('toStaffId', i, this.toStaffId);
                this.condtionsGrid.setColumnData('toTeamId', i, this.toTeamId);
                setTimeout(() => {
                    this.condtionsGrid.setColumnData('toTeamMemberId', i, this.toTeamMemberId);
                }, 1);
                this.condtionsGrid.setColumnData('toAgyLocId', i, this.toAgyLocId);
            }
        });
        if (selectedCondCount === 0) {
            this.show('ocondtrf.pleaseselectatleastonecondition', 'warn');
            return;
        }
        this.applyToAllDisable = true;
    }


    selectAllChkboxChange(event) {
        if (event.checked) {
            this.conditionsData.forEach((e, i) => {
                this.condtionsGrid.setColumnData('transferFlag', i, event.checked);
            });
        } else {
            this.conditionsData.forEach((e, i) => {
                this.condtionsGrid.setColumnData('transferFlag', i, event.checked);
            });
        }
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'transferFlag') {
            if (!event.data.transferFlag) {
                this.condtionsGrid.setColumnData('toStaffId', event.rowIndex, undefined);
                this.condtionsGrid.setColumnData('toTeamId', event.rowIndex, undefined);
                this.condtionsGrid.setColumnData('toTeamMemberId', event.rowIndex, undefined);
                this.condtionsGrid.setColumnData('toAgyLocId', event.rowIndex, undefined);
            }
            let transferFlagCount = this.conditionsData.filter(e => e.transferFlag).length;
            if (transferFlagCount === this.conditionsData.length) {
                this.selectAll = true;
            } else {
                this.selectAll = false;
            }
            rowdata.validated = true;
            return rowdata;
        }

        if(event.field === 'toStaffId' && event.data.toStaffId){
            this.condtionsGrid.setColumnData('toTeamId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toTeamMemberId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toAgyLocId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }else if(event.field === 'toTeamId' && event.data.toTeamId){
            this.condtionsGrid.setColumnData('toStaffId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toTeamMemberId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toAgyLocId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }else if(event.field === 'toTeamMemberId' && event.data.toTeamMemberId){
            this.condtionsGrid.setColumnData('toStaffId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toAgyLocId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }else if(event.field === 'toAgyLocId' && event.data.toAgyLocId){
            this.condtionsGrid.setColumnData('toStaffId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toTeamId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('toTeamMemberId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    onGridClear = () => {
        this.selectAll = false;
        this.toStaffId = undefined;
        this.toTeamId = undefined;
        this.toTeamMemberId = undefined;
        this.toAgyLocId = undefined;
        this.applyToAllDisable = false;
        this.getAssignedConditions();
        return true;
    }

    onAssignLocationCodeChange(event){
        if(event && this.toAgyLocId === this.offAllocatSentenceSearchBean.agyLocId){
            this.toAgyLocId = undefined;
            this.show('ocondtrf.assignedtosamelocation');
            return;
        }
    }

    onLovChange(event,fieldName){
        this.applyToAllDisable = false;
        if(fieldName == 'toStaffId' && event){
            this.toTeamId = undefined;
            this.toTeamMemberId = undefined;
            this.toAgyLocId = undefined;
        }else if(fieldName == 'toTeamId' && event){
            this.toStaffId = undefined;
            this.toTeamMemberId = undefined;
            this.toAgyLocId = undefined;  
        }else if(fieldName == 'toTeamMemberId' && event){
            this.toAgyLocId = undefined;
            this.toStaffId = undefined;
        }else if(fieldName == 'toAgyLocId' && event){
            this.toStaffId = undefined;
            this.toTeamMemberId = undefined;
            this.toTeamId = undefined;  
            if(event && this.toAgyLocId === this.locationValue && event){
                this.toAgyLocId = undefined;
                this.show('ocondawait.assignedtosamelocation');
                return;
            }
        }
    }

}
