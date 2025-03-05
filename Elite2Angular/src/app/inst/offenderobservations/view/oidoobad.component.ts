import {
    Component, OnInit, ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogComponent } from '@ui-components/dialog/dialog.component';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffObsPeriodChecks } from '../../care-in-placement/beans/OffObsPeriodChecks';
import { OffObsPeriodCheckscommitBean } from '../../care-in-placement/beans/OffObsPeriodCheckscommitBean';
import { OffenderObservationTypes } from '../maintenance/beans/OffenderObservationTypes';
import { OffObsCharacteristics } from '../maintenance/beans/OffObsCharacteristics';
import { OffObsCharacteristicsCommitBean } from '../maintenance/beans/OffObsCharacteristicsCommitBean';
import { OidoffobService } from '../service/oidoffob.service';
// import required bean declarations

@Component({
    selector: 'app-oidoobad',
    templateUrl: './oidoobad.component.html',
})

export class OidoobadComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    observationTypesColumnDef: any[];
    obsTypeIndex = 0;
    msgs = [];
    msglist = [];
    message = 'Invalid.';
    type = 'error';

    cellConditionList: any[] = [];
    notInCellList: any[] = [];
    activityList: any[] = [];
    commonDetailsCatList: any[] = [];
    officerNotesList: any[] = [];
    mode: string;
    commentText: any;
    savedisable: boolean;
    public fields: Object = { text: 'description', value: 'code' };
    obserVationTypeDataModel: OffenderObservationTypes = new OffenderObservationTypes();
    obserVationTypeDbModel: OffenderObservationTypes = new OffenderObservationTypes();
    offObsCharacteristicsSearchModel: OffObsCharacteristics = new OffObsCharacteristics();
    offObsCharacteristicsList: OffObsCharacteristics[] = [];



    offObsCharacteristicsInsertList: OffObsCharacteristics[] = [];
    offObsCharacteristicsDeleteList: OffObsCharacteristics[] = [];
    offObsCharacteristics: OffObsCharacteristics = new OffObsCharacteristics();
    offObsCharacteristicsCommitBean: OffObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();


    observationPeriodCheckData: OffObsPeriodChecks[] = [];
    observationTypePeriodCheckSearchModel: OffObsPeriodChecks = new OffObsPeriodChecks();
    observationTypePeriodCheckModel: OffObsPeriodChecks = new OffObsPeriodChecks();


    cellCondiLinkDomain: any;
    activityLinkDomain: any;
    commDetailLinkDomain: any;
    notInLinkDomain: any;


    observationPeriodCheckUpdatetList: OffObsPeriodChecks[] = [];
    observationPeriodCheckModel: OffObsPeriodChecks = new OffObsPeriodChecks();
    checkId: any;
    offObsPeriodCheckscommitBean: OffObsPeriodCheckscommitBean = new OffObsPeriodCheckscommitBean();
    showSaveComment: boolean;
    cellConditionListTemp: any;
    activityListTemp: any;
    commonDetailsCatTemp: any;
    notInCellTemp: any;
    commonDetailsCatListTemp: any;
    notInCellListTemp: any;
    cellReadOnly: boolean = false;
    activityReadOnly: boolean = false;
    cmnDetReadOnly: boolean = false;
    notInCellReadOnly: boolean = false;
    performedStaffId: any;

    constructor(private oidoobadFactory: OidoffobService, public translateService: TranslateService,
        public dialogService: DialogService, private sessionManager: UserSessionManager) {
        this.mode = 'CheckBox';
    }
    ngOnInit() {
        this.obserVationTypeDbModel = new OffenderObservationTypes();
      
        this.offObsCharacteristicsSearchModel = new OffObsCharacteristics();
        this.obserVationTypeDataModel = new OffenderObservationTypes();
        this.savedisable = true;
        this.showSaveComment = false;

        this.cellConditionListTemp = JSON.parse(JSON.stringify(this.dialog.data.cellConditionList));
        this.activityListTemp = JSON.parse(JSON.stringify(this.dialog.data.activityList));
        this.commonDetailsCatListTemp = JSON.parse(JSON.stringify(this.dialog.data.commonDetailsCatList));
        this.notInCellListTemp = JSON.parse(JSON.stringify(this.dialog.data.notInCellList));

        this.commentText = this.dialog.data.commentText;
        if (this.commentText) {
            this.showSaveComment = true;
        } else {
            this.showSaveComment = false;
        }
        this.obserVationTypeDbModel = this.dialog.data.maintainanceData;
        if(this.dialog.data.status === 'EXPIRED'){
            this.cellReadOnly = true;
            this.activityReadOnly = true;
            this.cmnDetReadOnly = true;
            this.notInCellReadOnly = true;
        } else {
            this.cellReadOnly = false;
            this.activityReadOnly = false;
            this.cmnDetReadOnly = false;
            this.notInCellReadOnly = false;
        }
        if (this.dialog.data.obsTypeVersionId) {
            if (this.cellConditionListTemp && this.cellConditionListTemp.length > 0 && !this.obserVationTypeDbModel.cellConditionFlag) {
                this.cellReadOnly = true;
                this.cellCondiLinkDomain = 'oidoffob/cellCondiLinkDomainRecordGroup?observationType=' + 'USE_DOMAIN';
            } else {
                this.cellCondiLinkDomain = 'oidoffob/cellCondiLinkDomainRecordGroup?observationType=' + this.dialog.data.obsTypeVersionId;
            }
            if (this.activityListTemp && this.activityListTemp.length > 0 && !this.obserVationTypeDbModel.activityFlag) {
                this.activityReadOnly = true;
                this.activityLinkDomain = 'oidoffob/activityLinkDomainRecordGroup?observationType=' + 'USE_DOMAIN';
            } else {
                this.activityLinkDomain = 'oidoffob/activityLinkDomainRecordGroup?observationType=' + this.dialog.data.obsTypeVersionId;
            }
            if (this.commonDetailsCatListTemp && this.commonDetailsCatListTemp.length > 0 && !this.obserVationTypeDbModel.demeanorFlag) {
                this.cmnDetReadOnly = true;
                this.commDetailLinkDomain = 'oidoffob/commDetailLinkDomainRecordGroup?observationType=' + 'USE_DOMAIN';
            } else {
                this.commDetailLinkDomain = 'oidoffob/commDetailLinkDomainRecordGroup?observationType=' + this.dialog.data.obsTypeVersionId;
            }
            if (this.notInCellListTemp && this.notInCellListTemp.length > 0 && !this.obserVationTypeDbModel.notInCellFlag) {
                this.notInCellReadOnly = true;
                this.notInLinkDomain = 'oidoffob/notInLinkDomainRecordGroup?observationType=' + 'USE_DOMAIN';
            } else {
                this.notInLinkDomain = 'oidoffob/notInLinkDomainRecordGroup?observationType=' + this.dialog.data.obsTypeVersionId;
            }
        }

        setTimeout(() => {
            this.cellConditionList = this.dialog.data.cellConditionList;
            this.activityList = this.dialog.data.activityList;
            this.commonDetailsCatList = this.dialog.data.commonDetailsCatList;
            this.notInCellList = this.dialog.data.notInCellList;

        }, 500);

        this.getCurrentStaffId();
    }


    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    /**
    * To display the messages
    */


    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }


    bLaunchClick = () => {
        const dialogData = {
            comment: this.commentText,
            screenTitle: 'Offender Observation Comment',
            placeHolderName: 'Comment',
            existingCommentTextDetails: 'Existing Offender Observation Comment',
            ammendCommentText: 'Append Offender Observation Comment',
            gridName: 'DOOB',
            checkId: this.dialog.data.checkId
            //comment:
        };
        if(this.dialog.data.performingStaffId === null || this.dialog.data.performingStaffId === this.performedStaffId){
            this.dialogService.openLinkDialog('OSANVICOMMENT', dialogData).subscribe(resData => {
                if (resData) {
                    this.getCommentExecuteQuery();
                }
            });
        } else {
            this.show(this.translateService.translate('oidoobad.otheruserenteredcommentcannontappendedbythisuser'), 'warn');
            return;
        }
    }


    getCurrentStaffId(){
        const serviceObj = this.oidoobadFactory.getCurrentStaffId();
        serviceObj.subscribe(data => {
            if (data) {
                this.performedStaffId = data;
            }
        });  
    }


    getCommentExecuteQuery() {
        this.observationTypePeriodCheckSearchModel.checkId = this.dialog.data.checkId;
        const serviceObj = this.oidoobadFactory.getCommentExecuteQuery(this.observationTypePeriodCheckSearchModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.commentText = data[0].commentText;
                if (this.commentText) {
                    this.showSaveComment = true;
                } else {
                    this.showSaveComment = false;
                }
            }
        });

    }
    getObservationTypeDetails() {
        if (this.dialog.data.observationType) {
            this.obserVationTypeDataModel.observationType = this.dialog.data.observationType;
            const serviceObj = this.oidoobadFactory.getObservatioTypeData(this.obserVationTypeDataModel);
            serviceObj.subscribe(data => {
                if (data.length > 0) {
                    data.forEach(element => {
                        element.activeFlag = element.activeFlag === 'Y' ? true : false;
                        element.cellConditionFlag = element.cellConditionFlag === 'Y' ? true : false;
                        element.activityFlag = element.activityFlag === 'Y' ? true : false;
                        element.demeanorFlag = element.demeanorFlag === 'Y' ? true : false;
                        element.notInCellFlag = element.notInCellFlag === 'Y' ? true : false;
                        element.officerNotesFlag = element.officerNotesFlag === 'Y' ? true : false;
                    });
                    this.obserVationTypeDbModel = data[0];
                    this.additionalCheckCharxecuteQuery();
                }
            });
        }
    }

    additionalCheckCharxecuteQuery() {
        if (this.dialog.data.observationType && this.dialog.data.checkId) {
            this.offObsCharacteristicsSearchModel.observationType = this.dialog.data.observationType;
            this.offObsCharacteristicsSearchModel.checkId = this.dialog.data.checkId;
            const serviceObj = this.oidoobadFactory.additionalCheckCharxecuteQuery(this.offObsCharacteristicsSearchModel);
            serviceObj.subscribe(data => {
                if (data.length > 0) {
                    this.cellConditionList = data[0].cellConditionList;
                    this.cellConditionListTemp = JSON.parse(JSON.stringify(data[0].cellConditionList));
                    this.activityList = data[0].activityList;
                    this.activityListTemp = JSON.parse(JSON.stringify(data[0].activityList));
                    this.commonDetailsCatList = data[0].commonDetailsCatList;
                    this.commonDetailsCatListTemp = JSON.parse(JSON.stringify(data[0].commonDetailsCatList));
                    this.notInCellList = data[0].notInCellList;
                    this.notInCellListTemp = JSON.parse(JSON.stringify(data[0].notInCellList));

                }
            });
        }
    }
    exitButton() {
        this.dialog.close(false);
    }

    isInsertable() {
        if ((this.cellConditionList || this.activityList ||
            this.commonDetailsCatList || this.notInCellList) && this.dialog.data.status==='ACTIVE') {
            this.savedisable = false;
        } else {
            this.savedisable = true;
        }
    }

    saveAdditionalCharecterData() {
        this.offObsCharacteristicsInsertList = [];
        this.offObsCharacteristicsDeleteList = [];
        this.offObsCharacteristicsCommitBean.insertList = [];
        this.offObsCharacteristicsCommitBean.deleteList = [];
        this.offObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();
        if (this.cellConditionList && this.cellConditionList.length > 0) {
            this.cellConditionList.forEach(obj => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'CELL_CNDITNS';
                this.offObsCharacteristics.detailCode = obj;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }

        if (this.notInCellList && this.notInCellList.length > 0) {
            this.notInCellList.forEach(obj => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'NOT_IN_CELL';
                this.offObsCharacteristics.detailCode = obj;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }

        if (this.activityList && this.activityList.length > 0) {
            this.activityList.forEach(obj => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'ACTIVITY';
                this.offObsCharacteristics.detailCode = obj;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }

        if (this.commonDetailsCatList && this.commonDetailsCatList.length > 0) {
            this.commonDetailsCatList.forEach(obj => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'COM_DET_CAT';
                this.offObsCharacteristics.detailCode = obj;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }
        if (this.cellConditionListTemp && this.cellConditionListTemp.length > 0 && this.cellConditionList && this.cellConditionList.length === 0) {
            this.cellConditionListTemp.forEach(element => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'CELL_CNDITNS';
                this.offObsCharacteristics.detailCode = element;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsDeleteList.push(this.offObsCharacteristics);
            })
        }

        if (this.activityListTemp && this.activityListTemp.length > 0 && this.activityList && this.activityList.length === 0) {
            this.activityListTemp.forEach(element => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'ACTIVITY';
                this.offObsCharacteristics.detailCode = element;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsDeleteList.push(this.offObsCharacteristics);
            })
        }

        if (this.commonDetailsCatListTemp && this.commonDetailsCatListTemp.length > 0 && this.commonDetailsCatList && this.commonDetailsCatList.length === 0) {
            this.commonDetailsCatListTemp.forEach(element => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'COM_DET_CAT';
                this.offObsCharacteristics.detailCode = element;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsDeleteList.push(this.offObsCharacteristics);
            })
        }

        if (this.notInCellListTemp && this.notInCellListTemp.length > 0 && this.notInCellList && this.notInCellList.length === 0) {
            this.notInCellListTemp.forEach(element => {
                this.offObsCharacteristics = new OffObsCharacteristics();
                this.offObsCharacteristics.detailType = 'NOT_IN_CELL';
                this.offObsCharacteristics.detailCode = element;
                this.offObsCharacteristics.checkId = this.dialog.data.checkId;
                this.offObsCharacteristics.obsTypeVersionId = Number(this.dialog.data.obsTypeVersionId);
                this.offObsCharacteristicsDeleteList.push(this.offObsCharacteristics);
            })
        }
        this.offObsCharacteristicsCommitBean.deleteList = this.offObsCharacteristicsDeleteList;
        this.offObsCharacteristicsCommitBean.insertList = this.offObsCharacteristicsInsertList;
        const saveResult = this.oidoobadFactory.saveAdditionalCharecterData(this.offObsCharacteristicsCommitBean);
        saveResult.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.samedataexistsforobservationtype'), 'warn');
                this.additionalCheckCharxecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.additionalCheckCharxecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.additionalCheckCharxecuteQuery();
                return;
            }
        });
        this.savedisable = true;
    }


    saveComment() {
        this.observationPeriodCheckUpdatetList = [];
        this.offObsPeriodCheckscommitBean.updateList = [];
        if (!this.commentText || String(this.commentText).trim() === '') {
            this.message = 'Additional Offender Observation Check Comment must be entered';
            this.type = 'warn';
            this.show(this.message, this.type);
            return;
        }
        if (this.commentText) {
            this.observationPeriodCheckModel.commentText = this.commentText;
        }
        this.observationPeriodCheckModel.checkId = this.dialog.data.checkId;
        this.observationPeriodCheckUpdatetList.push(this.observationPeriodCheckModel);
        this.offObsPeriodCheckscommitBean.updateList = this.observationPeriodCheckUpdatetList;

        const crtEveSaveData = this.oidoobadFactory.saveOffenderObservationCheckComment(this.offObsPeriodCheckscommitBean);
        crtEveSaveData.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.getCommentExecuteQuery();
                return;
            }
            else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'success');
                this.getCommentExecuteQuery();
                return;

            }
        });

    }
get activeEnable(){
    if(this.dialog.data.status === 'ACTIVE'){
        return false;
    } else {
        return true;
    }
}
}
