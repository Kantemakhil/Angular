import {
    Component, OnInit
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtdopctaService } from '../service/otdopcta.service';
import { OffenderTrustAccounts } from '@inmatetrustaccountsbeans/OffenderTrustAccounts';
import { OffenderTrustAccountsCommitBean } from '@inmatetrustaccountsbeans/OffenderTrustAccountsCommitBean';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { VHeaderBlock } from '@commonbeans/VHeaderBlock';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { Offenders } from '@commonbeans/Offenders';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { OtinamesService } from '@inmate/service/otinames.service';
import { OffenderSubAccounts } from '@inmate/trust/trustaccounts/beans/OffenderSubAccounts';

@Component({
    selector: 'app-otdopcta',
    templateUrl: './otdopcta.component.html'
})

export class OtdopctaComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offtaData: OffenderTrustAccounts[] = [];
    offtaDataTemp: OffenderTrustAccounts[] = [];
    offtaModel: OffenderTrustAccounts = new OffenderTrustAccounts();
    offtaIndex = 0;
    offtaInsertList: OffenderTrustAccounts[] = [];
    offtaUpdateList: OffenderTrustAccounts[] = [];
    offtaDeleteList: OffenderTrustAccounts[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex = 0;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdateList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    glTxnReadOnly = false;
    glTxn1ReadOnly = false;
    sysPflReadOnly = false;
    offTxnReadOnly = false;
    offBncReadOnly = false;
    vCorpReadOnly = false;
    perReadOnly = false;
    offOblHtyReadOnly = false;
    benTxnReadOnly = false;
    vBcBenReadOnly = false;
    cg$ctrlReadOnly = false;
    csldAlReadOnly = false;
    vOffBkgReadOnly = false;
    livUnitReadOnly = false;
    securityThreatGroupsReadOnly = false;
    cmAcCodeReadOnly = false;
    ctrlBlockReadOnly = false;
    reconsBlockReadOnly = false;
    statusBlockReadOnly = false;
    reconTxnReadOnly = false;
    bcrTmpReadOnly = false;
    glTxn2ReadOnly = false;
    glTxn3ReadOnly = false;
    bankRcReadOnly = false;
    offTracReadOnly = false;
    offxnTxnReadOnly = false;
    offTReadOnly = false;
    offDedReadOnly = false;
    offDrReadOnly = false;
    offTaReadOnly = false;
    offtaCommitModel: OffenderTrustAccountsCommitBean = new OffenderTrustAccountsCommitBean();
    nbtModifyUserId: any;
    uncheckFlag: boolean;
    nbtAccountStatus: any;
    verifyUnCheckFlag: boolean;
    uncheckFlagReadOnly: boolean;
    vHeaderBlockModel: VHeaderBlock = new VHeaderBlock();
    offenderObj: Offenders = new Offenders();
    vHeaderBlockOffender: VHeaderBlock = new VHeaderBlock();
    vthaModel: VTrustHeader = new VTrustHeader();
    caseLoadId: any;
    saveFlag: boolean;
    clearFlag: boolean;
    deleteFlag: boolean;
    caseloadType: any;
    newlyCreatedTxnId: any;
    offsubaModel: OffenderSubAccounts = new OffenderSubAccounts();
    numberDisable: boolean;
    constructor(private otdopctaFactory: OtdopctaService, public translateService: TranslateService,
        private offenderSearchService: OffenderSearchService, private sessionManager: UserSessionManager,
        private otinamesFactory: OtinamesService) {
    }
    ngOnInit() {
        this.verifyUnCheckFlag = true;
        this.saveFlag = true;
        this.clearFlag = true;
        this.deleteFlag = true;
        this.uncheckFlagReadOnly = true;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.caseloadType = this.sessionManager.currentCaseLoadType;
        this.vHeaderBlockModel = new VHeaderBlock();
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'), 'warn');
        }
    }
    onGridReady(event) {
    }
    allowNumbers(event) {
    }
    ok() {
    }
    no() {
    }
    cancel() {
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.offtaExecuteQuery();
            this.numberDisable = true;
        } else {
            this.offtaModel = new OffenderTrustAccounts();
            this.nbtAccountStatus = undefined;
            this.nbtModifyUserId = undefined;
            this.verifyUnCheckFlag = true;
            this.uncheckFlagReadOnly = true;
            this.saveFlag = true;
            this.clearFlag = true;
            this.deleteFlag = true;
            this.numberDisable = false;
        }
    }
    isInsertable() {
        if (this.numberDisable) {
            this.show(this.translateService.translate('common.fieldisprotectedagainstupdate'), 'warn');
            return false;
        }
    }
    isFlagClick() {
        if (!this.uncheckFlagReadOnly) {
            this.deleteFlag = false;
            this.saveFlag = false;
        }
    }
    show(vldmsg, type) {
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    offtaExecuteQuery() {
        this.offtaModel = new OffenderTrustAccounts();
        this.offtaModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        this.offtaModel.caseloadId = this.caseLoadId;
        const offtaResult = this.otdopctaFactory.offTaExecuteQuery(this.offtaModel);
        offtaResult.subscribe(offtaResultList => {
            if (offtaResultList.length === 0) {
                this.offtaData = [];
                this.nbtAccountStatus = undefined;
                this.verifyUnCheckFlag = true;
                this.uncheckFlagReadOnly = true;
                this.clearFlag = true;
                this.deleteFlag = true;
                this.saveFlag = true;
            } else {
                for (let i = 0; i < offtaResultList.length; i++) {
                    this.verifyUnCheckFlag = offtaResultList[i].accountClosedFlag === 'Y' ? true : false;
                    this.nbtAccountStatus = offtaResultList[i].accountClosedFlag === 'Y' ? 'CLOSED' : 'OPEN';
                }
                this.offtaData = offtaResultList;
                this.offtaModel = offtaResultList[0];
                if (this.verifyUnCheckFlag) {
                    this.uncheckFlagReadOnly = false;
                } else {
                    this.uncheckFlagReadOnly = true;
                }
                this.clearFlag = false;
                this.deleteFlag = false;
                this.saveFlag = false;
            }
        });
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    otdopctaSaveofftaForm() {
        this.offtaInsertList = [];
        this.offtaUpdateList = [];
        this.offtaDeleteList = [];
        this.offtaCommitModel.insertList = [];
        this.offtaCommitModel.updateList = [];
        this.offtaCommitModel.deleteList = [];
        this.newlyCreatedTxnId = undefined;

        if (!this.verifyUnCheckFlag && this.nbtAccountStatus === 'OPEN') {
            this.show(this.translateService.translate('otdopcta.trustaccountisopen'), 'warn');
            return;
        } if (this.verifyUnCheckFlag && this.nbtAccountStatus === 'CLOSED') {
            this.show(this.translateService.translate('otdopcta.pleaseunchecktoreopenaccount'), 'warn');
            return;
        }
        if (this.offtaModel != null) {
            this.offtaModel.accountClosedFlag = this.uncheckFlagReadOnly ? 'Y' : 'N';
            this.offtaModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
            this.offtaModel.caseloadId = this.caseLoadId;
            this.offtaModel.caseloadType = this.caseloadType;
            this.offtaUpdateList.push(this.offtaModel);
        } else {
            return;
        }
        if (this.offtaDeleteList.length > 0) {
            for (let i = 0; i < this.offtaDeleteList.length; i++) {
            }
            this.offtaCommitModel.deleteList = this.offtaDeleteList;
        }
        const offtaTxnIdData = this.otdopctaFactory.preInsert();
        offtaTxnIdData.subscribe(offtaTxnId => {
            if (offtaTxnId > 0) {
                this.newlyCreatedTxnId = undefined;

                if (this.offtaUpdateList.length > 0) {
                    for (let j = 0; j < this.offtaUpdateList.length; j++) {
                        this.offtaUpdateList[j].nbtTxnId = offtaTxnId;
                        this.newlyCreatedTxnId = offtaTxnId;
                    }
                    this.offtaCommitModel.updateList = this.offtaUpdateList;
                }
                const offtaSaveData = this.otdopctaFactory.offTaCommit(this.offtaCommitModel);
                offtaSaveData.subscribe(data => {
                    if (data === 1) {
                        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                    } else if (data > 1) {
                        if (data === 100) {
                            this.show(this.translateService.translate('otdopcta.pleasesetuptrans'), 'warn');
                        } else if (data === 101) {
                            this.show(this.translateService.translate('otdopcta.unabletogetsubacc'), 'warn');
                        } else {
                            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                            this.offtaExecuteQuery();
                        }
                    } else {
                        this.show(this.translateService.translate('otdopcta.errormessagecode'), 'warn');
                    }
                    this.nbtModifyUserId = this.newlyCreatedTxnId;
                    this.nbtAccountStatus = 'OPEN';
                    this.verifyUnCheckFlag = false;
                    this.uncheckFlagReadOnly = true;
                });
            }
        });
    }

    syspflExecuteQuery() {
        const syspflResult = this.otdopctaFactory.sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }

    offTaDeleteTrigger() {
        this.offtaInsertList = [];
        this.offtaUpdateList = [];
        this.offtaDeleteList = [];
        this.offtaCommitModel.insertList = [];
        this.offtaCommitModel.updateList = [];
        this.offtaCommitModel.deleteList = [];
        if (this.offtaModel && this.offtaModel.offenderId) {
            this.offsubaModel = new OffenderSubAccounts();
            this.offsubaModel.caseloadId = this.offtaModel.caseloadId;
            this.offsubaModel.offenderId = this.offtaModel.offenderId;
            const offsubAccountResult = this.otdopctaFactory.cgrichkOffenderTrustAccoun(this.offsubaModel);
            offsubAccountResult.subscribe(offsubAccountList => {
                if (offsubAccountList.length > 0) {
                    this.show(this.translateService.translate('otdopcta.deletesubaccount'), 'warn');
                } else {
                    this.offtaDeleteList.push(this.offtaModel);
                    this.offtaCommitModel.deleteList = this.offtaDeleteList;
                    const offaDeleteData = this.otdopctaFactory.offTaCommit(this.offtaCommitModel);
                    offaDeleteData.subscribe(deleteRecord => {
                        if (deleteRecord === 1) {
                            this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                            this.nbtAccountStatus = undefined;
                            this.verifyUnCheckFlag = true;
                            this.uncheckFlagReadOnly = true;
                            this.nbtModifyUserId = undefined;
                            this.offtaModel = new OffenderTrustAccounts();
                        } else {
                            this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                        }
                    });
                }

            });
        }
    }
}
