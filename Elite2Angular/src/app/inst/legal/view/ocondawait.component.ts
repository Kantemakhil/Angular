import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OffenderAllocationsSentences } from '../beans/OffenderAllocationsSentences';
import { OffenderCondTransfer } from '../beans/OffenderCondTransfer';
import { OffenderCondTransferCommitBean } from '../beans/OffenderCondTransferCommitBean';
import { OffenderSentConditions } from '../beans/OffenderSentConditions';
import { OcondawaitService } from '../service/ocondawait.service';

@Component({
    selector: 'S4-ocondawait',
    templateUrl: './ocondawait.component.html'
})
export class OcondawaitComponent implements OnInit {
    @ViewChild('condtionsGrid', { static: true }) condtionsGrid: any;
    msgs: any[] = [];
    offendersColumnDef: any[];
    conditionsColumnDef: any[];
    offenderSentenceData: OffenderAllocationsSentences[] = [];
    offenderSentenceModel: OffenderAllocationsSentences = new OffenderAllocationsSentences();
    conditionsData: OffenderSentConditions[] = [];
    conditionsDataTemp: OffenderSentConditions[] = [];
    conditionsModel: OffenderSentConditions = new OffenderSentConditions();
    teamCode: string;
    locationValue: string;
    locationLovLink: String;
    teamLink: string;
    selectedSentenceIndex: number;
    selectedConditionIndex: number;
    searchDisabled: boolean = false;
    clearDisabled: boolean = true;
    selectAll: boolean;
    staffId: any;
    assignedTeamId: any;
    teamMemberId: any;
    assignStaffMember: any;
    offenderCondTransferInsertList: OffenderCondTransfer[] = [];
    offenderCondTransferUpdatetList: OffenderCondTransfer[] = [];
    offenderCondTransferDeleteList: OffenderCondTransfer[] = [];
    offenderCondTransferCommitModel: OffenderCondTransferCommitBean = new OffenderCondTransferCommitBean();
    toAgyLocId: any;
    searchTeamId: any
    numberOfOffenders: number;
    lovTitles = { description: this.translateService.translate('ocondawait.description'), teamCode: this.translateService.translate('ocondawait.teamcode') };
    applyToAllDisable: boolean;
    constructor(public sessionManager: UserSessionManager, public translateService: TranslateService,
        private ocondawaitFactory: OcondawaitService) {
        this.offendersColumnDef = [];
        this.conditionsColumnDef = [];
    }

    ngOnInit(): void {
        this.applyToAllDisable = true;
        this.offenderSentenceData = [];
        this.locationLovLink = '/ocondawait/rgLocationRecGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
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
            // {
            //     fieldName: this.translateService.translate('Incoming Transfer'),field: 'incomeTransfer', editable: false, width: 150, datatype: 'checkbox'
            // },
            {
                fieldName: this.translateService.translate('ocondawait.sentenceType'), field: 'commenceType', editable: false, width: 150, datatype: 'lov', link: 'ocmpconf/populateSentType?sentCategory=',
                parentField: 'orderType'
            },
            {
                fieldName: this.translateService.translate('ocondawait.matter'), field: 'matter', editable: false, width: 150, datatype: 'text'
            },

        ];
        this.conditionsColumnDef = [
            {
                fieldName: this.translateService.translate('ocondawait.select'), field: 'transferFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocondawait.conditiondescription'), field: 'description', editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocondawait.assignedTeam'), field: 'assignedTeamId', editable: false, width: 150, datatype: 'lov',
                link: '/ocondawait/rgTeamRecGroup?caseLoadId=', parentField: 'parentField', titles: this.lovTitles
            },
            {
                fieldName: this.translateService.translate('ocondawait.legaltext'), field: 'legalTextButton', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'launch', data: 'row', updateField: 'row', link: 'CONDLEGALTEXT'

            },
            {
                fieldName: this.translateService.translate('ocondawait.receivedfromteam'), field: 'rcvdFromTeam', editable: false, width: 150, datatype: 'lov',
                link: '/ocondawait/rgTeamRecGroup?caseLoadId=', parentField: 'parentField', titles: this.lovTitles
            },
            {
                fieldName: this.translateService.translate('ocondawait.receivedfromlocation'), field: 'rcvdFromLoc', editable: false, width: 150, datatype: 'lov',
                link: this.locationLovLink
            },
            {
                fieldName: this.translateService.translate('ocondawait.staffmember'), field: 'staffId', editable: true, width: 150, datatype: 'lov',
                link: '/ocondawait/getStaffDetails?caseLoadId=' + this.sessionManager.currentCaseLoad
            },
            {
                fieldName: this.translateService.translate('ocondawait.team'), field: 'teamId', editable: true, width: 150, datatype: 'lov',
                link: '/ocondawait/rgTeamRecGroup?caseLoadId=', parentField: 'parentField', titles: this.lovTitles,//cellEditable: this.teamMemberEdit
            },
            {
                fieldName: this.translateService.translate('ocondawait.teammember'), field: 'teamMemberId', editable: true, width: 150, datatype: 'lov',
                link: '/ocondawait/getTeamMemberDetails?teamId=', parentField: 'teamId', //cellEditable: this.teamMemberEdit
            },
            {
                fieldName: this.translateService.translate('ocondawait.anotherlocation'), field: 'agyLocId', editable: true, width: 150, datatype: 'lov',
                link: this.locationLovLink
            },
            {
                fieldName: '', field: 'parentField', hide: true
            },
            {
                fieldName: '', field: 'assgnTeamCount', hide: true
            },
            {
                fieldName: '', field: 'longCommentText', hide: true
            },

        ]
    }

    teamMemberEdit = (data: any, index: number, field: string): boolean => {
        if (field == 'teamMemberId' && this.searchTeamId) {
            return true;
        } else if (field == 'teamId' && !this.searchTeamId) {
            return true;
        }
        return false;
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    locationCodeChange(event) {
        if (event) {
            this.clearDisabled = false;
            this.teamLink = '/ocondawait/rgTeamRecGroup?caseLoadId=' + this.locationValue;
        } else {
            this.teamLink = undefined;
            this.teamCode = undefined;
            this.clearDisabled = true;
        }
    }

    onLocationBlur() {
        if (!this.locationValue || this.locationValue === '') {
            this.locationValue = undefined;
        }
    }

    onTeamBlur() {
        if (!this.teamCode || this.teamCode === '') {
            this.teamCode = undefined;
        }
    }

    getSentenceData() {
        if (!this.locationValue) {
            this.show(this.translateService.translate('common.locationmust'), 'warn');
            return
        }
        const payLoad = {};
        payLoad['moduleName'] = 'OCONDAWAIT';
        payLoad['caseLoadId'] = this.locationValue;
        if (this.searchTeamId) {
            payLoad['teamId'] = Number(this.searchTeamId);
        }
        this.ocondawaitFactory.getSentenceData(payLoad).subscribe(data => {
            if (data && data.length > 0) {
                const offenderBookId = [];
                var numberOfOffenders = 0;

                data.forEach(e => {
                    const findOffenders = offenderBookId.find(ele => ele == e.offenderBookId)
                    if (!findOffenders) {
                        offenderBookId.push(e.offenderBookId);
                        numberOfOffenders += 1;
                    }
                });
                this.numberOfOffenders = numberOfOffenders;
                this.offenderSentenceData = data;
                this.selectedSentenceIndex = 0;
                this.searchDisabled = true;
            } else {
                this.show('common.querycaused');
                this.offenderSentenceData = [];
                this.conditionsData = [];
                this.offenderSentenceModel = new OffenderAllocationsSentences();
                this.conditionsModel = new OffenderSentConditions();
                this.searchDisabled = false;
                this.numberOfOffenders = undefined;
            }
        });
    }

    onOffSentencesRowClicked(event) {
        this.selectAll = false;
        this.assignedTeamId = undefined;
        this.teamMemberId = undefined;
        this.toAgyLocId = undefined;
        this.staffId = undefined;
        if (event) {
            this.offenderSentenceModel = event;
            this.offenderSentenceModel.caseLoadId = this.locationValue;
            if (this.searchTeamId) {
                this.offenderSentenceModel.teamId = Number(this.searchTeamId);
            }
            this.getAwaitingConditions();
        } else {
            this.offenderSentenceModel = new OffenderAllocationsSentences();
        }
    }

    getAwaitingConditions() {
        this.ocondawaitFactory.getAwaitingConditions(this.offenderSentenceModel).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(e => {

                    e['legalTextButton'] = '';
                    e['parentField'] = this.locationValue;
                    if (!e.parentCondTransferId) {
                        e['assignedTeamId'] = String(e.defaultAssignedTeam);
                    } else {
                        e['assignedTeamId'] = e.teamId ? String(e.teamId) : String(e.toTeamId);
                    }
                    e.teamId = undefined;
                    e.teamMemberId = undefined;
                    e.staffId = undefined;
                    e.agyLocId = undefined;
                    e.rcvdFromTeam = e.receivedFromTeam ? String(e.receivedFromTeam) : undefined;
                    e.rcvdFromLoc = e.receivedFromLocation;

                    if (e.assignedTeamId && e.assignedTeamId != 'null') {
                        e.teamId = String(e.assignedTeamId);
                    }

                });
                this.conditionsData = data;
                this.conditionsDataTemp = JSON.parse(JSON.stringify(data));
                this.selectedConditionIndex = 0;
                this.applyToAllDisable = false;
            } else {
                this.applyToAllDisable = true;
                this.conditionsData = [];
                this.conditionsModel = new OffenderSentConditions();
            }
        });
    }

    onConditonsRowClicked(event) {
        /*  this.staffId = undefined;
          this.assignedTeamId = undefined;
          this.teamMemberId = undefined;
          this.toAgyLocId = undefined;*/
        if (event) {
            this.conditionsModel = event;
        } else {
            this.conditionsModel = new OffenderSentConditions();
        }
    }

    onClear() {
        this.offenderSentenceData = [];
        this.offenderSentenceModel = new OffenderAllocationsSentences();
        this.conditionsData = [];
        this.conditionsModel = new OffenderSentConditions();
        this.searchDisabled = false;
        this.locationValue = undefined;
        this.teamCode = undefined;
        this.clearDisabled = true;
        this.selectAll = false;
        this.staffId = undefined;
        this.assignedTeamId = undefined;
        this.teamMemberId = undefined;
        this.toAgyLocId = undefined;
        this.numberOfOffenders = undefined;
        this.applyToAllDisable = true;
    }

    offenderCondTransferSaveForm(event) {
        this.offenderCondTransferInsertList = event.updated;
        this.offenderCondTransferCommitModel.insertList = [];
        this.offenderCondTransferCommitModel.updateList = [];
        this.offenderCondTransferCommitModel.deleteList = [];
        let selectedCondCount = this.conditionsData.filter(e => e.transferFlag).length;
        if (selectedCondCount === 0) {
            this.show(this.translateService.translate('ocondawait.selectonecondition'));
            return;
        }
        if (this.applyToAllDisable && this.searchTeamId && !this.teamMemberId && this.assignedTeamId === this.searchTeamId) {
            this.show('ocondawait.assignedtosameteam');
            return;
        }
        if (this.offenderCondTransferInsertList.length > 0) {
            for (let i = 0; i < this.offenderCondTransferInsertList.length; i++) {

                for (let j = 0; j < this.conditionsDataTemp.length; j++) {
                    if (this.offenderCondTransferInsertList[i].transferFlag && (this.conditionsDataTemp[j]['parentCondTransferId'] === this.offenderCondTransferInsertList[i].parentCondTransferId) &&
                        (this.conditionsDataTemp[j]['offenderSentConditionId'] === this.offenderCondTransferInsertList[i].offenderSentConditionId)) {
                        if (this.offenderCondTransferInsertList[i].transferFlag && (this.conditionsDataTemp[j].agyLocId === this.offenderCondTransferInsertList[i].agyLocId && !this.toAgyLocId) &&
                            (this.conditionsDataTemp[j]['teamMemberId'] === this.offenderCondTransferInsertList[i]['teamMemberId'] && !this.teamMemberId) &&
                            (this.conditionsDataTemp[j]['staffId'] === this.offenderCondTransferInsertList[i].staffId && !this.staffId) &&
                            (this.conditionsDataTemp[j]['teamId'] === this.offenderCondTransferInsertList[i].teamId && Number(this.assignedTeamId) === 0)) {
                            this.show(this.translateService.translate('ocondawait.nodataismodifiedtosave'));
                            return;
                        } else if (this.offenderCondTransferInsertList[i].transferFlag && (this.conditionsDataTemp[j].agyLocId === this.offenderCondTransferInsertList[i].agyLocId && this.offenderCondTransferInsertList[i].agyLocId === this.toAgyLocId) &&
                            (this.conditionsDataTemp[j]['teamMemberId'] === this.offenderCondTransferInsertList[i]['teamMemberId'] && this.offenderCondTransferInsertList[i]['teamMemberId'] === this.teamMemberId) &&
                            (this.conditionsDataTemp[j]['staffId'] === this.offenderCondTransferInsertList[i].staffId && this.offenderCondTransferInsertList[i].staffId === this.staffId) &&
                            (this.conditionsDataTemp[j]['teamId'] === this.offenderCondTransferInsertList[i].teamId && this.offenderCondTransferInsertList[i].teamId === this.assignedTeamId)) {
                            this.show(this.translateService.translate('ocondawait.nodataismodifiedtosave'))
                            return;
                        } else if (this.offenderCondTransferInsertList[i].transferFlag && this.toAgyLocId) {
                            if ((this.conditionsDataTemp[j].agyLocId === this.offenderCondTransferInsertList[i].agyLocId) && this.offenderCondTransferInsertList[i].agyLocId != this.toAgyLocId) {
                                this.show(this.translateService.translate('ocondawait.applytoallvalidation'));
                                return;
                            }
                        } else if (this.offenderCondTransferInsertList[i].transferFlag && this.teamMemberId) {
                            if ((this.conditionsDataTemp[j]['teamMemberId'] === this.offenderCondTransferInsertList[i]['teamMemberId']) && this.offenderCondTransferInsertList[i]['teamMemberId'] != this.teamMemberId) {
                                this.show(this.translateService.translate('ocondawait.applytoallvalidation'));
                                return;
                            }
                        } else if (this.offenderCondTransferInsertList[i].transferFlag && this.staffId) {
                            if ((this.conditionsDataTemp[j]['staffId'] === this.offenderCondTransferInsertList[i].staffId) && this.offenderCondTransferInsertList[i].staffId != this.staffId) {
                                this.show(this.translateService.translate('ocondawait.applytoallvalidation'));
                                return;
                            }
                        } else if (this.offenderCondTransferInsertList[i].transferFlag && Number(this.assignedTeamId) > 0) {
                            if ((Number(this.conditionsDataTemp[j]['teamId']) === Number(this.offenderCondTransferInsertList[i].teamId))) {
                                if (Number(this.offenderCondTransferInsertList[i].teamId) != Number(this.assignedTeamId)) {
                                    this.show(this.translateService.translate('ocondawait.applytoallvalidation'));
                                    return;
                                }
                            }
                        }
                    }
                }


                if (this.offenderCondTransferInsertList[i].transferFlag) {
                    if (!this.offenderCondTransferInsertList[i].staffId && !this.offenderCondTransferInsertList[i].agyLocId &&
                        (!this.offenderCondTransferInsertList[i].teamId || (this.offenderCondTransferInsertList[i].teamId && Number(this.offenderCondTransferInsertList[i].teamId)) == 0) && !this.offenderCondTransferInsertList[i].teamMemberId) {
                        if (this.staffId || this.assignedTeamId || this.teamMemberId || this.toAgyLocId) {
                            this.show(this.translateService.translate('ocondawait.applytoallvalidation'));
                            return;
                        } else {
                            this.show(this.translateService.translate('ocondawait.selectoneassignee'));
                            return;
                        }
                    }
                   /*  if (this.offenderCondTransferInsertList[i].parentCondTransferId && this.offenderCondTransferInsertList[i]['assignedTeamId'] && this.offenderCondTransferInsertList[i]['assignedTeamId'] != "null" && (this.offenderCondTransferInsertList[i].teamId && Number(this.offenderCondTransferInsertList[i].teamId) != 0)
                        && !this.offenderCondTransferInsertList[i].teamMemberId) {
                        this.show(this.translateService.translate('ocondawait.nodataismodifiedtosave'));
                        return;
                    }*/
 
                    if (this.offenderCondTransferInsertList[i].agyLocId === this.locationValue) {
                        this.show('ocondawait.assignedtosamelocation');
                        return;
                    }
                    // if (this.searchTeamId && !this.offenderCondTransferInsertList[i].parentCondTransferId && this.offenderCondTransferInsertList[i].assgnTeamCount > 1) {
                    //     this.show(this.translateService.translate('ocondawait.multipleteamsassignedtocond'));
                    //     return;
                    // }
                    if (this.searchTeamId && !this.offenderCondTransferInsertList[i].teamMemberId && this.offenderCondTransferInsertList[i].teamId === this.searchTeamId) {
                        this.show('ocondawait.assignedtosameteam');
                        return;
                    }
                    if (this.offenderCondTransferInsertList[i].staffId) {
                        if(this.offenderCondTransferInsertList[i]['assignedTeamId'] != '0' && this.offenderCondTransferInsertList[i]['assignedTeamId'] != 'null' && this.offenderCondTransferInsertList[i]['assignedTeamId'] != ''){
                            this.offenderCondTransferInsertList[i].rcvdFromTeam = Number(this.offenderCondTransferInsertList[i]['assignedTeamId']);
                        }
                        this.offenderCondTransferInsertList[i].staffId = Number(this.offenderCondTransferInsertList[i].staffId);
                        this.offenderCondTransferInsertList[i].teamId = undefined;
                        this.offenderCondTransferInsertList[i].teamMemberId = undefined;
                    } else if (this.offenderCondTransferInsertList[i].teamId) {
                        this.offenderCondTransferInsertList[i].staffId = undefined;
                        if(this.offenderCondTransferInsertList[i]['assignedTeamId'] != 'null' && this.offenderCondTransferInsertList[i]['assignedTeamId'] != '0' && this.offenderCondTransferInsertList[i]['assignedTeamId'] != '' && 
                                Number(this.offenderCondTransferInsertList[i]['assignedTeamId']) != Number(this.offenderCondTransferInsertList[i].teamId)){
                                this.offenderCondTransferInsertList[i].rcvdFromTeam = Number(this.offenderCondTransferInsertList[i]['assignedTeamId']);
                        }
                        this.offenderCondTransferInsertList[i].teamMemberId = this.offenderCondTransferInsertList[i].teamMemberId ? Number(this.offenderCondTransferInsertList[i].teamMemberId) : undefined;
                    } else {
                        this.offenderCondTransferInsertList[i].staffId = undefined;
                        this.offenderCondTransferInsertList[i].teamId = undefined;
                        this.offenderCondTransferInsertList[i].teamMemberId = undefined;
                    }
                    this.offenderCondTransferInsertList[i].toAgyLocId = undefined;
                    this.offenderCondTransferInsertList[i].toTeamId = undefined;
                    this.offenderCondTransferInsertList[i].toStaffId = undefined;
                    if (!this.offenderCondTransferInsertList[i].agyLocId) {
                        //this.offenderCondTransferInsertList[i].agyLocId = this.locationValue;
                        this.offenderCondTransferInsertList[i].agyLocId = !this.offenderCondTransferInsertList[i].toAgyLocId ? this.locationValue : this.offenderCondTransferInsertList[i].toAgyLocId;
                    }
                    if(this.offenderCondTransferInsertList[i].agyLocId != this.locationValue){
                        this.offenderCondTransferInsertList[i].rcvdFromLoc = this.locationValue;
                        if(this.offenderCondTransferInsertList[i]['assignedTeamId'] != 'null' && this.offenderCondTransferInsertList[i]['assignedTeamId'] != '0' && this.offenderCondTransferInsertList[i]['assignedTeamId'] != ''){
                            this.offenderCondTransferInsertList[i].rcvdFromTeam = Number(this.offenderCondTransferInsertList[i]['assignedTeamId']);
                        }
                    }
                    if (this.offenderCondTransferInsertList[i].conTransferId) {
                        this.offenderCondTransferInsertList[i].parentCondTransferId = this.offenderCondTransferInsertList[i].conTransferId;
                    } else {
                        this.offenderCondTransferInsertList[i].parentCondTransferId = undefined;
                    }

                    this.offenderCondTransferInsertList[i].offenderBookId = this.offenderSentenceModel.offenderBookId;
                    if ((this.offenderCondTransferInsertList[i].teamId && this.offenderCondTransferInsertList[i].teamMemberId) ||
                        this.offenderCondTransferInsertList[i].staffId) {
                        this.offenderCondTransferInsertList[i].condiStatus = 'ASSIGNED';
                    } else {
                        this.offenderCondTransferInsertList[i].condiStatus = 'UN-ASSIGNED';
                    }
                    this.offenderCondTransferInsertList[i].moduleId = 'OCONDAWAIT';
                    this.offenderCondTransferCommitModel.insertList.push(this.offenderCondTransferInsertList[i]);
                }
            }
        }
        const sencalcSaveData = this.ocondawaitFactory.offenderCondTransferSaveForm(this.offenderCondTransferCommitModel);
        sencalcSaveData.subscribe(data => {
            if (data[0] && data[0].listSeq === 1) {
                this.staffId = undefined;
                this.assignedTeamId = undefined;
                this.teamMemberId = undefined;
                this.toAgyLocId = undefined;
                this.selectAll = false;
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                if (this.offenderCondTransferCommitModel.insertList.length === this.conditionsData.length) {
                    this.getSentenceData();
                } else {
                    this.getAwaitingConditions();
                }
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }

    get locationReadOnly() {
        if (this.offenderSentenceData && this.offenderSentenceData.length > 0) {
            return true;
        }
        return false;
    }

    get teamReadOnly() {
        if (!this.locationValue || (this.offenderSentenceData && this.offenderSentenceData.length > 0)) {
            return true;
        }
        return false;
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
                this.condtionsGrid.setColumnData('staffId', event.rowIndex, undefined);
                if (!this.searchTeamId) {
                    this.condtionsGrid.setColumnData('teamId', event.rowIndex, undefined);
                }
                this.condtionsGrid.setColumnData('teamMemberId', event.rowIndex, undefined);
                this.condtionsGrid.setColumnData('agyLocId', event.rowIndex, undefined);
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
        if (event.field === 'staffId' && event.data.staffId) {
            this.condtionsGrid.setColumnData('teamId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('teamMemberId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('agyLocId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        } else if (event.field === 'teamId') {
            if (event.data.teamId) {
                this.condtionsGrid.setColumnData('staffId', event.rowIndex, undefined);
                this.condtionsGrid.setColumnData('teamMemberId', event.rowIndex, undefined);
                this.condtionsGrid.setColumnData('agyLocId', event.rowIndex, undefined);
            } else {
                this.condtionsGrid.setColumnData('teamMemberId', event.rowIndex, undefined);
            }
            rowdata.validated = true;
            return rowdata;
        } else if (event.field === 'teamMemberId' && event.data.teamMemberId) {
            this.condtionsGrid.setColumnData('staffId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('agyLocId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        } else if (event.field === 'agyLocId' && event.data.agyLocId) {
            this.condtionsGrid.setColumnData('staffId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('teamId', event.rowIndex, undefined);
            this.condtionsGrid.setColumnData('teamMemberId', event.rowIndex, undefined);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    onApplyToAllClick() {
        if (!this.staffId && !this.toAgyLocId &&
            !this.assignedTeamId && !this.teamMemberId) {
            this.show(this.translateService.translate('ocondawait.selectoneassignee'));
            return;
        }
        let selectedCondCount = 0;
        this.conditionsData.forEach((e, i) => {
            if (e.transferFlag) {
                selectedCondCount += 1;
                this.condtionsGrid.setColumnData('staffId', i, this.staffId);
                this.condtionsGrid.setColumnData('teamId', i, this.assignedTeamId);
                setTimeout(() => {
                    this.condtionsGrid.setColumnData('teamMemberId', i, this.teamMemberId);
                }, 1);
                this.condtionsGrid.setColumnData('agyLocId', i, this.toAgyLocId);
            }
        });
        if (selectedCondCount === 0) {
            this.show('ocondawait.selectonecondition', 'warn');
            return;
        }
        this.applyToAllDisable = true;
    }

    onGridClear = () => {
        this.selectAll = false;
        this.assignedTeamId = undefined;
        this.teamMemberId = undefined;
        this.toAgyLocId = undefined;
        this.staffId = undefined;
        this.applyToAllDisable = false;
        this.getAwaitingConditions();
        return true;
    }

    onAssignLocationCodeChange(event) {
        if (event && this.toAgyLocId === this.locationValue) {
            this.toAgyLocId = undefined;
            this.show('ocondawait.assignedtosamelocation');
            return;
        }
    }

    onLovChange(event, fieldName) {
        this.applyToAllDisable = false;
        if (fieldName == 'staffId' && event) {
            this.assignedTeamId = undefined;
            this.teamMemberId = undefined;
            this.toAgyLocId = undefined;
        } else if (fieldName == 'assignedTeamId' && event) {
            this.staffId = undefined;
            this.teamMemberId = undefined;
            this.toAgyLocId = undefined;
        } else if (fieldName == 'teamMemberId' && event) {
            this.staffId = undefined;
            this.toAgyLocId = undefined;
        } else if (fieldName == 'toAgyLocId' && event) {
            this.staffId = undefined;
            this.teamMemberId = undefined;
            this.assignedTeamId = undefined;
            if (event && this.toAgyLocId === this.locationValue) {
                this.toAgyLocId = undefined;
                this.toAgyLocId = null;
                this.show('ocondawait.assignedtosamelocation');
                return;
            }
        }
    }
}
