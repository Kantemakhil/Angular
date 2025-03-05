import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderAllocationsSentences } from '../beans/OffenderAllocationsSentences';
import { OffenderCondTransfer } from '../beans/OffenderCondTransfer';
import { OcondawaitService } from '../service/ocondawait.service';
import { ValidateRowReturn } from '@core/ui-components/alpine-grid/alpine-grid.component';
import { OffenderCondTransferCommitBean } from '../beans/OffenderCondTransferCommitBean';

@Component({
    selector: 'S4-otkcondtrf',
    templateUrl: './otkcondtrf.component.html'
})
export class OtkcondtrfComponent implements OnInit {
    @ViewChild('conditionsDataGrid', { static: true }) conditionsDataGrid: any;
    msgs: any[] = [];
    locationLink: String;
    locationLovLink: String;
    offendersColDef: any[];
    sentencesColDef: any[];
    conditonsColDef: any[];
    locationValue: any;
    offendersData: any[] = [];
    sentencesData: any[] = [];
    conditionsData: OffenderCondTransfer[] = [];
    teamLink: any;
    offenderSentenceData: OffenderAllocationsSentences[] = [];
    searchDisabled: boolean = false;
    clearDisabled: boolean = true;
    selectedSentenceIndex: number;
    lovTitles = { description: this.translateService.translate('otkcondtrf.description'),teamCode: this.translateService.translate('otkcondtrf.teamcode') };
    searchTeamId: any;
    offenderSentenceModel: OffenderAllocationsSentences = new OffenderAllocationsSentences();
    selectedCondtionIndex: number
    cancelAll: boolean;
    offenderCondTransferCancInsertList: OffenderCondTransfer[] = [];
    offenderCondTransferCancUpdatetList: OffenderCondTransfer[] = [];
    offenderCondTransferCancDeleteList: OffenderCondTransfer[] = [];
    offenderCondTransferCancCommitModel: OffenderCondTransferCommitBean = new OffenderCondTransferCommitBean();
    numberOfOffenders: number;
    constructor(public sessionManager: UserSessionManager, public translateService: TranslateService,
        private ocondawaitFactory: OcondawaitService) {
    }

    ngOnInit(): void {
        this.offenderSentenceData = [];
        this.locationLovLink = '/ocondawait/rgLocationRecGroup?caseLoadId=' + this.sessionManager.currentCaseLoad;
        this.offendersColDef = [
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
                fieldName: this.translateService.translate('otkcondtrf.sentencetype'), field: 'commenceType', editable: false, width: 150,datatype: 'lov', link: 'ocmpconf/populateSentType?sentCategory=',
                parentField: 'orderType'
            },
            {
                fieldName: this.translateService.translate('otkcondtrf.matter'), field: 'matter', editable: false, width: 150, datatype: 'text'
            },

        ];
        this.conditonsColDef = [
            {
                fieldName: this.translateService.translate('otkcondtrf.cancel'), field: 'transferFlag', editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('otkcondtrf.conditiondescription'), field: 'description', editable: false, width: 150
            },
            {
                fieldName: this.translateService.translate('otkcondtrf.previouslyallocatedto'), field: 'previousAllocatedOfficer', editable: false, width: 150,
                datatype: 'text', //link: '/ocondawait/getStaffDetails?caseLoadId=' + this.sessionManager.currentCaseLoad
            },
            {
                fieldName: this.translateService.translate('otkcondtrf.transfertoteam'), field: 'toTeamId', editable: false, width: 150,
                datatype: 'lov', link: '/ocondawait/rgTeamRecGroup?caseLoadId=', parentField: 'parentField'
            },
            {
                fieldName: this.translateService.translate('otkcondtrf.transfertoloc'), field: 'toAgyLocIdTemp', editable: false, width: 150,
                datatype: 'lov', link: this.locationLovLink
            },
            {
                fieldName: '', field: 'parentField', hide: true
            },
            {
                fieldName: '', field: 'prvsAllocTeamId', hide: true
            },
            {
                fieldName: '', field: 'prvsAllocAgyLocId', hide: true
            }
        ];
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
            this.clearDisabled = true;
        }
    }

    onLocationBlur() {
        if (!this.locationValue || this.locationValue === '') {
            this.locationValue = undefined;
        }
    }

    get locationReadOnly() {
        if (this.offenderSentenceData && this.offenderSentenceData.length > 0) {
            return true;
        }
        return false;
    }

    getTransferredCondOffenders() {
        if (!this.locationValue) {
            this.show(this.translateService.translate('common.locationmust'), 'warn');
            return
        }
        const payLoad = {};
        payLoad['caseLoadId'] = this.locationValue;
        if (this.searchTeamId) {
            payLoad['teamId'] = Number(this.searchTeamId);
        } 
        // else {
        //     payLoad['teamId'] = undefined; 
        // }
        this.ocondawaitFactory.getTransferredCondOffenders(payLoad).subscribe(data => {
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
                this.searchDisabled = false;
                this.numberOfOffenders = undefined;
            }
        });
    }

    onClear() {
        this.offenderSentenceData = [];
        this.conditionsData = [];
        this.searchDisabled = false;
        this.clearDisabled = true;
        this.cancelAll = false;
        this.locationValue = undefined;
        this.searchTeamId = undefined;
        this.numberOfOffenders = undefined;
    }

    onOffSentencesRowClicked(event) {
        if (event) {
            this.offenderSentenceModel = event;
            this.offenderSentenceModel.caseLoadId = this.locationValue;
            if (this.searchTeamId) {
                this.offenderSentenceModel.teamId = Number(this.searchTeamId);
            }
            this.getTransferredConditons();
        } else {
            this.offenderSentenceModel = new OffenderAllocationsSentences();
        }
    }

    getTransferredConditons() {
         if (this.searchTeamId) {
            this.offenderSentenceModel.teamId =Number(this.searchTeamId);
        } else {
            this.offenderSentenceModel.teamId = undefined;
        } 
        this.ocondawaitFactory.getTransferredConditons(this.offenderSentenceModel).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(e => {
                    e['parentField'] = this.locationValue;
                    e.toTeamId = String(e.toTeamId);
                    e['previousAllocatedOfficer'] = e.officersName;
                    if(e.prvsAllocAgyLocId === e.toAgyLocId){
                        e['toAgyLocIdTemp'] = undefined;
                    }else{
                        e['toAgyLocIdTemp'] = e.toAgyLocId;
                    }
                });
                this.conditionsData = data;
                this.selectedCondtionIndex = 0;
            } else {
                this.conditionsData = [];
            }
        });
    }


    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event && event.field === 'transferFlag') {
            let transferFlagCount = this.conditionsData.filter(e => e.transferFlag).length;
            if (transferFlagCount === this.conditionsData.length) {
                this.cancelAll = true;
            } else {
                this.cancelAll = false;
            }
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }


    cancelAllChkboxChange(event) {
        if (event.checked) {
            this.conditionsData.forEach((e, i) => {
                this.conditionsDataGrid.setColumnData('transferFlag', i, event.checked);
            });
        } else {
            this.conditionsData.forEach((e, i) => {
                this.conditionsDataGrid.setColumnData('transferFlag', i, event.checked);
            });
        }
    }


    offenderCondTransCancSaveForm(event) {
        this.offenderCondTransferCancInsertList = event.updated;
        this.offenderCondTransferCancDeleteList = event.removed;
        this.offenderCondTransferCancCommitModel.insertList = [];
        this.offenderCondTransferCancCommitModel.updateList = [];
        this.offenderCondTransferCancCommitModel.deleteList = [];
        let selectedCondCount = this.conditionsData.filter(e => e.transferFlag).length;
        if (selectedCondCount === 0) {
            this.show(this.translateService.translate('otkcondtrf.selectcondition'), 'warn');
            return;
        }
        if (this.offenderCondTransferCancInsertList.length > 0) {
            for (let i = 0; i < this.offenderCondTransferCancInsertList.length; i++) {
                if (this.offenderCondTransferCancInsertList[i].transferFlag) {

                    this.offenderCondTransferCancInsertList[i].agyLocId = !this.offenderCondTransferCancInsertList[i].toAgyLocId ? this.offenderCondTransferCancInsertList[i].agyLocId : undefined;
                    this.offenderCondTransferCancInsertList[i].parentCondTransferId = this.offenderCondTransferCancInsertList[i].conTransferId;

                    this.offenderCondTransferCancInsertList[i].staffId = this.offenderCondTransferCancInsertList[i].prvsAllocOfficer;
                    this.offenderCondTransferCancInsertList[i].toStaffId = this.offenderCondTransferCancInsertList[i].prvsAllocToOfficer;

                    this.offenderCondTransferCancInsertList[i].teamId = this.offenderCondTransferCancInsertList[i].prvsAllocTeamId;
                    this.offenderCondTransferCancInsertList[i].toTeamId = this.offenderCondTransferCancInsertList[i].prvsAllocToTeamId;

                    this.offenderCondTransferCancInsertList[i].teamMemberId = this.offenderCondTransferCancInsertList[i].prvsAllocTeamMemberId;
                    this.offenderCondTransferCancInsertList[i].toTeamMemberId = this.offenderCondTransferCancInsertList[i].prvsAllocToTeamMemberId;

                    this.offenderCondTransferCancInsertList[i].agyLocId = this.offenderCondTransferCancInsertList[i].prvsAllocAgyLocId;
                    this.offenderCondTransferCancInsertList[i].toAgyLocId = this.offenderCondTransferCancInsertList[i].prvsAllocToAgyLocId;

                    this.offenderCondTransferCancInsertList[i].offenderBookId = this.offenderSentenceModel.offenderBookId;
                    this.offenderCondTransferCancInsertList[i].condiStatus = 'ASSIGNED';
                    this.offenderCondTransferCancInsertList[i].moduleId = 'OTKCONDTRF';
                    this.offenderCondTransferCancCommitModel.insertList.push(this.offenderCondTransferCancInsertList[i]);
                }
            }
        }
        const sencalcSaveData = this.ocondawaitFactory.offenderCondTransferSaveForm(this.offenderCondTransferCancCommitModel);
        sencalcSaveData.subscribe(data => {
            if (data[0] && data[0].listSeq === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.cancelAll = false;
                if (this.offenderCondTransferCancCommitModel.insertList.length === this.conditionsData.length) {
                    this.getTransferredCondOffenders();
                } else {
                    this.getTransferredConditons();
                }
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }

    onGridClear = () => {
        this.getTransferredConditons();
        this.cancelAll = false;
        return true;
    }

    get teamReadOnly() {
        if (!this.locationValue || (this.offenderSentenceData && this.offenderSentenceData.length > 0)) {
            return true;
        }
        return false;
    }
}
