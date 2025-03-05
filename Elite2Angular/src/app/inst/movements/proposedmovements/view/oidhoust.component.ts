import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { VHousingMoves } from '../beans/VHousingMoves';
import { OidhoustService } from '../service/oidhoust.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { OffenderExternalMovements } from '@commonbeans/OffenderExternalMovements';
import { OffenderLocChngDtls } from '../beans/OffenderLocChngDtls';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { VOffSchOverview } from '../beans/VOffSchOverview';
import { OffenderNaDetails } from '@common/beans/OffenderNaDetails';

@Component({
    selector: 'app-oidhoust',
    templateUrl: './oidhoust.component.html',
})

export class OidhoustComponent implements OnInit {
    // Variable declaration
    msglist: any[];
    message: any;
    type: any;
    actionName: string;
    lovModel: any[];
    Scheduled: boolean;
    readonly: boolean = false;
    inmaDetReadOnly: boolean;
    msgs: any[] = [];
    index: any;
    nameOfLovPage: string;
    listToCompare: any[] = [];
    houseMoveData: VHousingMoves[] = [];
    housemoveDataTemp: VHousingMoves[] = [];
    minDate: Date;
    display: boolean;
    LocationagyId: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean = true;
    houseMoveColumnDef: any[];
    public mode: string;
    statRevModel: OffenderExternalMovements = new OffenderExternalMovements();
    vHouseMoveModel: VHousingMoves = new VHousingMoves();
    frmAgyLocUrl: string;
    toAgyLocUrl: string;
    moveReasonUrl: string;
    tableIndex = -1;
    inmaDetModel: VHousingMoves = new VHousingMoves();
    inmaDetModelTemp: VHousingMoves = new VHousingMoves();
    alert: string;
    locationLink: any;
    houseMoveBean: VHousingMoves = new VHousingMoves();
    statDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
    statDetData: OffenderLocChngDtls[] = [];
    cancReqStaff: string;
    cancReqDate: Date;
    cancReqReason: string;
    locChngDetInsrtBean: OffenderLocChngDtls = new OffenderLocChngDtls();
    appStatDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
    creqStatDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
    cancStatDetModel: OffenderLocChngDtls = new OffenderLocChngDtls();
    cancRequest: any;
    readOnlyMode: boolean;
    disabledBtn: boolean;
    disablegenratebtn = false;
    vOffSchOvervModel: VOffSchOverview = new VOffSchOverview();
    vOffSchdoverwrowData: VOffSchOverview[] = [];
    alertDisable: boolean;
    pschldconflicts: boolean = false;
    offnonassoModel: OffenderNaDetails = new OffenderNaDetails();
    nonsanReadOnly: boolean;
	readonlyTemp: boolean = false;
    offnonassoData: OffenderNaDetails[] = [];
    appStatDetModelTemp: OffenderLocChngDtls = new OffenderLocChngDtls();
    creqStatDetModelTemp: OffenderLocChngDtls = new OffenderLocChngDtls();
    cancStatDetModelTemp: OffenderLocChngDtls = new OffenderLocChngDtls();
    constructor(private oidhoustFactory: OidhoustService, public translateService: TranslateService, public sessionManager: UserSessionManager
        , public dialogService: DialogService) {
        // TODO initilize data members here..!

    }
    onGridReady(event) {
    }
    ngOnInit() {

        this.locationLink = 'oidhoust/rgAgyIdRecordGroup?caseloadId=' + this.sessionManager.currentCaseLoad;
        this.houseMoveColumnDef = [

            { fieldName: this.translateService.translate('oidhoust.offenderidDisplay'), field: 'offenderIdDisplay', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.offenderName'), field: 'offName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.currentlocation'), field: 'currAgyDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.from'), field: 'fromAgyDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.to'), field: 'toAgyDesc', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.type'), field: 'movementType', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.reason'), field: 'movementReason', editable: false, width: 150 },
            { fieldName: this.translateService.translate('oidhoust.approved'), field: 'approvalDate', editable: false, width: 150, datatype: 'date' },
        ];

    }
    /*
   * This method is used to show popup messages.
   */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    facilityChange() {
        this.frmAgyLocUrl = 'oidhoust/rgLocFromRecordGroup?agyLocId=' + this.vHouseMoveModel.currAgyId;
    }
    fromAgyLocChange() {
        this.toAgyLocUrl = 'oidhoust/rgLocToRecordGroup?fromAgyLocId=' + this.vHouseMoveModel.currAgyId;
    }

    moveTypeChange() {
        this.moveReasonUrl = 'oidhoust/rgMoveReasonRecordGroup?movementType=' + this.vHouseMoveModel.movementType;
    }

    onButRetrieveclick() {

        if (!this.vHouseMoveModel || !this.vHouseMoveModel.currAgyId) {
            this.type = 'info';
            this.show(this.translateService.translate('oidhoust.fromAgyLocIdmustbeentered'));
            return;
        }

        this.vHousMoveExecuteQuery();
        this.disablegenratebtn = true;



    }
    onButClearclick() {
        this.houseMoveData = [];
        this.vHouseMoveModel = new VHousingMoves();
        this.houseMoveBean = new VHousingMoves();
        this.inmaDetModel = new VHousingMoves();
        this.statDetModel = new OffenderLocChngDtls();
        this.appStatDetModel = new OffenderLocChngDtls();
        this.creqStatDetModel = new OffenderLocChngDtls();
        this.cancStatDetModel = new OffenderLocChngDtls();
        this.disablegenratebtn = false;
        this.readOnlyMode = false;
        this.disabledBtn = false;
        this.cancRequest = false;


    }
    vOffSchOverviewExecQuery(event) {
        this.pschldconflicts;
        this.vOffSchOvervModel = new VOffSchOverview();
        this.vOffSchOvervModel.offenderBookId = event.offenderBookId;
        const serviceObj = this.oidhoustFactory.
            vOffSchOverviewExecuteQuery(this.vOffSchOvervModel);
        serviceObj.subscribe(data => {
            if (data.length > 0) {
                this.vOffSchdoverwrowData = data;
                this.vOffSchOvervModel = data[0];
                this.inmaDetModel.potSchFlag === 'Y' ? this.pschldconflicts = true : this.pschldconflicts = false;
            } else {
                this.pschldconflicts = false;
            }
        });
    }
    offnonassoExecuteQuery(event) {
		this.readonlyTemp;
		this.offnonassoModel = new OffenderNaDetails();
		this.offnonassoModel.scheduledTripId = event.scheduledTripId;
		this.offnonassoModel.offenderBookId = event.offenderBookId;
		this.offnonassoModel.offenderId = event.offenderId;
		this.offnonassoModel.livingUnitDescription = event.livingUnitDescription;
		const offnonassoResult = this.oidhoustFactory.
			offnonassoExecuteQuery(this.offnonassoModel);
		offnonassoResult.subscribe(data => {
			if (data.length > 0) {
				this.offnonassoData = data;
				this.offnonassoModel = data[0];
				this.inmaDetModel.nonAssoFlag === 'Y' ? this.readonlyTemp = true : this.readonlyTemp = false;
			} else {
				this.readonlyTemp = false;
			}
		});
	}

    onNonAssClick = () => {
		this.dialogService.openLinkDialog('/OIUONONA', this.inmaDetModel, 80).subscribe(result => {
		});


	}
    onPotentionalClick = () => {
        const modelData = {};
        modelData['pCallingForm'] = 'OIDHOUST';
        modelData['offenderBookId'] = this.houseMoveBean.offenderBookId;
        this.dialogService.openLinkDialog('/OIUSCHOV', this.houseMoveBean, 80).subscribe(result => {
        });
    }
    vHousMoveExecuteQuery() {

        this.vHouseMoveModel.statusObj = [];
        this.vHouseMoveModel.txnObj = [];
        if (this.vHouseMoveModel.newFlag) {
            this.vHouseMoveModel.statusObj.push('NEW');
        }
        if (this.vHouseMoveModel.appFlag) {
            this.vHouseMoveModel.statusObj.push('APP');
        }
        if (this.vHouseMoveModel.appPenFlag) {
            this.vHouseMoveModel.statusObj.push('PEN');
        }
        if (this.vHouseMoveModel.denFlag) {
            this.vHouseMoveModel.statusObj.push('DEN');
        }
        if (this.vHouseMoveModel.txnPen) {
            this.vHouseMoveModel.txnObj.push('PEN');
        }
        if (this.vHouseMoveModel.txnComp) {
            this.vHouseMoveModel.txnObj.push('COMP');
        }
        if (this.vHouseMoveModel.txnCanc) {
            this.vHouseMoveModel.txnObj.push('CANC');
        }
        if (this.cancRequest) {
            this.vHouseMoveModel.cancReq = 'Y';
        }

        this.vHouseMoveModel.createUserId = this.sessionManager.getId();
        const serviceObj = this.oidhoustFactory.
            housMoveExecuteQuery(this.vHouseMoveModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.houseMoveData = [];
                this.vHouseMoveModel = new VHousingMoves();
                this.houseMoveBean = new VHousingMoves();
                this.inmaDetModel = new VHousingMoves();
                this.cancRequest = undefined;
                this.tableIndex = -1;
                if (this.houseMoveData.length == 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.querycaused');
                    this.show(this.message, this.type);
                    this.disablegenratebtn = false;

                }
            } else {
                data.forEach(element => {
                    element.sancCode = element.sancCode === 'Y' ? true : false;
                    element.nonAssoFlag = element.nonAssoFlag === 'Y' ? true : false;
                    element.modifyDatetime = DateFormat.getDate();
                    element.modifyUserId = this.sessionManager.getId();
                });
                this.houseMoveData = data;
                this.tableIndex = 0;
                this.readOnlyMode = true;
                this.disabledBtn = true;
            }
        });
    }
    onAlertclick = () => {

        this.dialogService.openLinkDialog('/ocualert', this.houseMoveBean, 80).subscribe(result => {

        });
    }

    onRowClickEvent(event) {
        if (event) {
            this.houseMoveBean = new VHousingMoves();
            this.houseMoveBean = event;
            if (this.houseMoveBean.offenderBookId && this.houseMoveBean.locationSeq) {
                this.inmateDetExecuteQuery(this.houseMoveBean);
                this.populatestatDetDetails(this.houseMoveBean);


            }
        } else {
            this.houseMoveBean = new VHousingMoves();
            this.inmaDetModel = new VHousingMoves();
        }
        this.vOffSchOverviewExecQuery(event);
        this. offnonassoExecuteQuery(event) 
    }
    inmateDetExecuteQuery(event) {
        this.inmaDetModel = new VHousingMoves();
        this.inmaDetModel = event;
        this.inmaDetModelTemp = JSON.parse(JSON.stringify(event));
    }
    inmDetCommitEvent() {
        const result = this.oidhoustFactory.inmateCommit(this.inmaDetModel);
        result.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.inmateDetExecuteQuery(this.houseMoveBean);
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }
    populatestatDetDetails(event) {
        this.statDetModel = new OffenderLocChngDtls();
        this.appStatDetModel = new OffenderLocChngDtls();
        this.creqStatDetModel = new OffenderLocChngDtls();
        this.cancStatDetModel = new OffenderLocChngDtls();
        event.createUserId = this.sessionManager.getId();
        const serviceObj = this.oidhoustFactory.
            populatestatDetDetails(event);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.statDetData = [];
                this.statDetModel = new OffenderLocChngDtls();
                this.appStatDetModel = new OffenderLocChngDtls();
                this.creqStatDetModel = new OffenderLocChngDtls();
                this.cancStatDetModel = new OffenderLocChngDtls();
            } else {
                this.appStatDetModelTemp = new OffenderLocChngDtls();
                data.forEach(element => {
                    element.offenderBookId = this.houseMoveBean.offenderBookId;
                    element.locationSeq = this.houseMoveBean.locationSeq;
                    element.createDatetime = DateFormat.getDate();
                    element.createUserId = this.sessionManager.getId();
                    element.modifyDatetime = undefined;
                    element.modifyUserId = undefined;
                    element.checkFlag = false;
                    if (element.choice === 'APP' && element.statusCode !== 'NEW') {
                        this.appStatDetModel = element;
                        this.appStatDetModelTemp = JSON.parse(JSON.stringify(element));

                    }
                    if (element.choice === 'CREQ') {
                        element.checkFlag = true;
                        this.creqStatDetModel = element;
                        this.creqStatDetModelTemp = JSON.parse(JSON.stringify(element));
                    }
                    if (element.choice === 'CANC') {
                        element.checkFlag = true;
                        this.cancStatDetModel = element;
                        this.cancStatDetModelTemp = JSON.parse(JSON.stringify(element));
                    }
                    if (element.choice === 'NEW') {
                        this.statDetModel = element;
                    }
                    if (element.appRsn === '.') {
                        element.appRsn = null;
                    }
                    if (element.txnRsn === '.') {
                        element.txnRsn = null;
                    }

                });
                this.statDetData = data;
            }
        });
    }
    save() {
        const creqIndex = this.statDetData.indexOf(this.creqStatDetModel);
        if ((!this.creqStatDetModel.offenderBookId && this.creqStatDetModel.checkFlag) || (this.creqStatDetModel.offenderBookId && this.creqStatDetModel.checkFlag !== this.statDetData[creqIndex].checkFlag)) {
            this.creqStatDetModel.offenderBookId = this.houseMoveBean.offenderBookId;
            this.creqStatDetModel.locationSeq = this.houseMoveBean.locationSeq;
            this.creqStatDetModel.statusCode = 'APP';
            this.creqStatDetModel.txnStatus = 'CREQ';
            this.appStatDetModel.txnRsn = this.appStatDetModel.txnRsn === undefined ? '.' : this.appStatDetModel.txnRsn;
            this.creqStatDetModel.createDatetime = DateFormat.getDate();
            this.creqStatDetModel.createUserId = this.sessionManager.getId();
            this.statDetCommitEvent(this.creqStatDetModel);
            this.populatestatDetDetails(this.houseMoveBean);


        }
        const cancIndex = this.statDetData.indexOf(this.cancStatDetModel);
        if ((!this.cancStatDetModel.offenderBookId && this.cancStatDetModel.checkFlag) || (this.cancStatDetModel.offenderBookId && this.cancStatDetModel.checkFlag !== this.statDetData[cancIndex].checkFlag)) {
            const serviceObj = this.oidhoustFactory.
                getCurInmAppStatus(this.houseMoveBean);
            serviceObj.subscribe(data => {
                if (data !== undefined || data !== null) {
                    this.cancStatDetModel.statusCode = data;
                    this.cancStatDetModel.offenderBookId = this.houseMoveBean.offenderBookId;
                    this.cancStatDetModel.locationSeq = this.houseMoveBean.locationSeq;
                    this.cancStatDetModel.txnStatus = 'CANC';
                    this.cancStatDetModel.txnRsn = this.cancStatDetModel.txnRsn === undefined ? '.' : this.cancStatDetModel.txnRsn;
                    this.cancStatDetModel.createDatetime = DateFormat.getDate();
                    this.cancStatDetModel.createUserId = this.sessionManager.getId();
                    this.statDetCommitEvent(this.cancStatDetModel);
                    return;
                }
            });
        }
        const appIndex = this.statDetData.indexOf(this.appStatDetModel);
        if ((!this.appStatDetModel.offenderBookId && this.appStatDetModel.statusCode) || (this.appStatDetModel.offenderBookId && this.appStatDetModel.statusCode !== this.statDetData[appIndex].statusCode)
            || (this.appStatDetModel.offenderBookId && this.appStatDetModel.statusCode !== 'PEN')) {
            this.appStatDetModel.offenderBookId = this.houseMoveBean.offenderBookId;
            this.appStatDetModel.locationSeq = this.houseMoveBean.locationSeq;
            this.appStatDetModel.appRsn = this.appStatDetModel.appRsn === undefined ? '.' : this.appStatDetModel.appRsn;
            this.appStatDetModel.txnStatus = 'PEN';
            this.appStatDetModel.createDatetime = DateFormat.getDate();
            this.appStatDetModel.createUserId = this.sessionManager.getId();
            if (this.appStatDetModel.nonAssoFlag === 'Y') {
                const message = {
                    label: this.translateService.translate('oidhoust.nonassociations'), yesBtn: true, noBtn: true
                };
                this.dialogService.openLinkDialog('/ocucoffeconfirmbox', message, 55).subscribe(result => {
                    if (result) {
                        this.statDetCommitEvent(this.appStatDetModel);
                        this.populatestatDetDetails(this.houseMoveBean);

                    }
                });
            } else {
                this.statDetCommitEvent(this.appStatDetModel);

            }
        }
    }
    statDetCommitEvent(event) {
        const result = this.oidhoustFactory.statDetCommit(event);
        result.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.populatestatDetDetails(this.houseMoveBean);
                this.vHousMoveExecuteQuery();
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                return;
            }
        });
    }
    changeEvent(event) {
        if (event) {
            if (event === 'CREQ') {
                if (this.creqStatDetModel.checkFlag) {
                    this.creqStatDetModel.recordedDate = DateFormat.getDate();
                    this.creqStatDetModel.recordedBy = this.sessionManager.getId();
                } else {
                    this.creqStatDetModel.recordedDate = undefined;
                    this.creqStatDetModel.recordedBy = undefined;
                    this.creqStatDetModel.txnRsn = undefined;
                }
            }
            if ((event === 'APP' || event === 'PEN' || event === 'DEN')) {
                if (this.appStatDetModel.statusCode) {
                    this.appStatDetModel.recordedDate = DateFormat.getDate(this.appStatDetModel.recordedDate);
                    this.appStatDetModel.recordedBy = this.sessionManager.getId();
                } else {
                    this.appStatDetModel.recordedDate = undefined;
                    this.appStatDetModel.recordedBy = undefined;
                    this.appStatDetModel.txnRsn = undefined;
                }
            }
            if (event === 'CANC') {
                if (this.cancStatDetModel.checkFlag) {
                    this.cancStatDetModel.recordedDate = DateFormat.getDate();
                    this.cancStatDetModel.recordedBy = this.sessionManager.getId();
                } else {
                    this.cancStatDetModel.recordedDate = undefined;
                    this.cancStatDetModel.recordedBy = undefined;
                    this.cancStatDetModel.txnRsn = undefined;
                }
            }
        }
    }
    get creqCheckDisble() {
        if ((this.cancStatDetModel && this.cancStatDetModel.offenderBookId) || this.houseMoveBean.statusCode === 'APP' || this.houseMoveBean.statusCode === 'DEN') {
            return true;
        }
        return false;
    }
    get appCheckDisble() {
        if ((this.appStatDetModelTemp.statusCode !== 'PEN' && this.appStatDetModel && this.appStatDetModel.offenderBookId) || this.houseMoveBean.statusCode === 'COMP' ||
            (this.cancStatDetModel && this.cancStatDetModel.offenderBookId) || (this.creqStatDetModel && this.creqStatDetModel.offenderBookId)) {
            return true;

        }
        return false;
    }
    get cancCheckDisble() {
        if ((this.cancStatDetModel && this.cancStatDetModel.offenderBookId) || this.houseMoveBean.statusCode === 'APP' || this.houseMoveBean.statusCode === 'DEN') {
            return true;
        }
        return false;
    }
    get disableLanchBtn() {
        if (this.houseMoveData.length > 0 && this.inmaDetModel && this.inmaDetModel.offenderBookId) {
            return false;
        }
        return true;
    }
    get disabledClrBtn() {
        if (this.vHouseMoveModel.currAgyId || this.vHouseMoveModel.fromLivingUnitId || this.vHouseMoveModel.toLivingUnitId || this.vHouseMoveModel.movementType ||
            this.vHouseMoveModel.movementReason || this.vHouseMoveModel.statusCode || this.vHouseMoveModel.cancReq) {
            return false;
        }
        return true;
    }
    get disabledRetBtn() {
        if (this.houseMoveData.length > 0) {
            return true;
        }
        return false;
    }
    get inmSaveDisable() {
        if (this.houseMoveData.length > 0 && this.inmaDetModelTemp.commentText !== this.inmaDetModel.commentText) {
            return false;
        }
        return true;
    }
    get statDtlSaveDisable() {
        if (this.houseMoveData.length > 0 && this.cancStatDetModel !== null && (this.cancStatDetModel.checkFlag && this.cancStatDetModel.txnStatus !== 'CANC') ||
            this.creqStatDetModel !== null && (this.creqStatDetModel.checkFlag && this.creqStatDetModel.txnStatus !== 'CREQ') ||
            this.appStatDetModel !== null && (this.appStatDetModel.statusCode && this.appStatDetModel.statusCode !== this.appStatDetModelTemp.statusCode)) {
            return false;
        }
        return true;
    }


    get commentReadonly() {
        if (this.inmaDetModel && this.inmaDetModel.commentRole === 'Y') {
            return false;
        }
        return true;
    }

}
