import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcdoobliService } from '../service/ocdoobli.service';
import { OffenderDeductions } from '@inmate/trust/trustaccounts/beans/OffenderDeductions';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { OffenderBeneficiaries } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiaries';
import { OffenderDeductionReceipts } from '@inmate/trust/deductions/beans/OffenderDeductionReceipts';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderDeductionsCommitBean } from '../beans/OffenderDeductionsCommitBean';
import { OffenderBeneficiariesCommitBean } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiariesCommitBean';
import { OffenderDeductionReceiptsCommitBean } from '../beans/OffenderDeductionReceiptsCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { OtmfoproService } from '../deductionsmaintenance/service/otmfopro.service';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { MenuSecurities } from '@sa/admin/beans/MenuSecurities';
import { MenuService } from '../../../../app-home/menu-components/main-menu/menu.service';
// import { MenuService } from './app-home/menu-components/main-menu/menu.service';


@Component({
    selector: 'app-ocdoobli',
    templateUrl: './ocdoobli.component.html'
})

export class OcdoobliComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    @ViewChild('bncGrid', {static: true}) bncGrid: any;
    @ViewChild('drGrid', {static: true}) drGrid: any;
    both: boolean;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offdedData: OffenderDeductions[] = [];
    offdedDataTemp: OffenderDeductions[] = [];
    offdedModel: OffenderDeductions = new OffenderDeductions();
    offdedSelected: OffenderDeductions = new OffenderDeductions();
    offdedIndex: number;
    offdedCommitModel: OffenderDeductionsCommitBean = new OffenderDeductionsCommitBean();
    offdedInsertList: OffenderDeductions[] = [];
    offdedUpdateList: OffenderDeductions[] = [];
    offdedDeleteList: OffenderDeductions[] = [];
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    menuSecurities: MenuSecurities = new MenuSecurities();
    offbncData: OffenderBeneficiaries[] = [];
    offbncDataTemp: OffenderBeneficiaries[] = [];
    offbncModel: OffenderBeneficiaries = new OffenderBeneficiaries();
    offbncSelected: OffenderBeneficiaries = new OffenderBeneficiaries();
    offbenTemModel: OffenderBeneficiaries = new OffenderBeneficiaries();
    offbncIndex: number;
    offbncInsertList: OffenderBeneficiaries[] = [];
    offbncUpdatetList: OffenderBeneficiaries[] = [];
    offbncDeleteList: OffenderBeneficiaries[] = [];
    offbncCommitModel: OffenderBeneficiariesCommitBean = new OffenderBeneficiariesCommitBean();
    offdrData: OffenderDeductionReceipts[] = [];
    offdrDataTemp: OffenderDeductionReceipts[] = [];
    offdrModel: OffenderDeductionReceipts = new OffenderDeductionReceipts();
    offdrselect: OffenderDeductionReceipts = new OffenderDeductionReceipts();
    offdedreceptsTempModel: OffenderDeductionReceipts = new OffenderDeductionReceipts();
    offdrIndex: number;
    offdrInsertList: OffenderDeductionReceipts[] = [];
    offdrUpdatetList: OffenderDeductionReceipts[] = [];
    offdrDeleteList: OffenderDeductionReceipts[] = [];
    offDrCommitModel: OffenderDeductionReceiptsCommitBean = new OffenderDeductionReceiptsCommitBean();
    offded1Data: OffenderDeductions[] = [];
    offded1DataTemp: OffenderDeductions[] = [];
    offded1Model: OffenderDeductions = new OffenderDeductions();
    offded1Index: number;
    offded1InsertList: OffenderDeductions[] = [];
    offded1UpdatetList: OffenderDeductions[] = [];
    offded1DeleteList: OffenderDeductions[] = [];
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    syspflIndex: number;
    syspflInsertList: SystemProfiles[] = [];
    syspflUpdatetList: SystemProfiles[] = [];
    syspflDeleteList: SystemProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    offDrColumnDef: any[];
    offDedColumnDef: any[];
    offBncColumnDef: any[];
    offDedReadOnly: boolean;
    offBncReadOnly: boolean;
    offDrReadOnly: boolean;
    sysPflReadOnly: boolean;
    offDed1ReadOnly: boolean;
    cgfkOffdeddeductiontypeRg: any[] = [];
    cgfkGroupoblgroupidRg: any[] = [];
    cgfkOffdeddspdescriptionRg: any[] = [];
    cgfkOffded1adjustmentreasoRg: any[] = [];
    cgfkOffdrreceipttxntypeRg: any[] = [];
    cgfkOffdedcaseinfonumberRg: any[] = [];
    cgfkOffbncpersonidRg: any[] = [];
    cgfkOffbnccorporateidRg: any[] = [];
    index: any;
    percent: number;
    launchDots = '...';

    codeTitle = {
        'code': this.translateService.translate('common.code'),
        'description': this.translateService.translate('common.description'),
        'fromBalanceType': this.translateService.translate('common.calcon'),
        'deductionCategory': this.translateService.translate('common.category')
    };
    transactionTile = {
        'code': this.translateService.translate('common.type'),
        'description': this.translateService.translate('common.description')
    };
    statusTitle = {
        'description': this.translateService.translate('common.status'),
        'code': this.translateService.translate('common.s')
    };
    tableIndex = -1;
    tablebncIndex = -1;
    tablededucIndex = -1;
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    offdedInsertFlag: boolean;
    offbenInsertFlag: boolean;
    offdrInsertFlag: boolean;
    caseId: number;
    dspEffectiveDate: Date;
    vpayPlanFlg: string;
    vMaxTotalAmnt: number;
    vdeductionAmnt: number;
    globalSuccessFlag: string;
    vOldrecAmnt: number;
    vEffDate: Date;
    vTotalPaid: number;
    monBetween: number;
    vmaxMonthlyAmnt: number;
    total: number;
    informationNumb: string;
    globalUnknownBenficiaryTransfer: string;
    fifoFlag: string;
    oblFlg: string;
    deductionType: string;
    flag: string;
    msgsShow: string;
    dspIncrementPayableFlag: string;
    dilogOpenFlg: boolean;
    uniqueFlg: boolean;
    rowExistsFlg: boolean;
    tCount = 0;
    corporateidExists: boolean;
    btnSave: boolean;
    lastSave: number;
    obligationIndex: number;
    value: string;
    effectiveDate: string;
    dspDate: string;
    vdedamnt: any;
    isDeleteProgress: boolean;
    buttonDisable: boolean;
    groupId: any;
    writeOffDisable: boolean;
    constructor(private ocdoobliFactory: OcdoobliService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        public dialogService: DialogService, private offenderSearchService: OffenderSearchService,
        private otmfoproFactory: OtmfoproService, private menuService: MenuService) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        this.offDrColumnDef = [];
        this.offDedColumnDef = [];
        this.offBncColumnDef = [];
    }
    ngOnInit() {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
        if (this.menuService.selectedMenuLink) {
            this.menuSecurities = this.menuService.selectedMenuLink;
        }
        
        // if (this.offenderSearchService.selectedOffender.data && this.offenderSearchService.selectedOffender.data.parentId &&
        //     this.offenderSearchService.selectedOffender.data.parentId === 6254) {
        //        this.writeOffDisable = true;
        // } else {
        //     this.writeOffDisable = false;
        // }
        this.btnSave = true;
        this.uniqueFlg = true;
        this.getProfilePayplnFlg();
        this.offdedInsertFlag = false;
        this.offbenInsertFlag = false;
        this.offdrInsertFlag = false;
        this.buttonDisable = true;
        this.writeOffDisable = true;
        this.getDisabledButton();
        this.offDedColumnDef = [
            {
                fieldName: this.translateService.translate('ocdoobli.obligationid'), field: 'offenderDeductionId',
                editable: false, width: 100
            },
            {
                fieldName: this.translateService.translate('ocdoobli.odp'), field: 'deductionPriority', editable: true, width: 80,
                datatype: 'number', maxValue: 99, cellEditable: this.canCellEdit, whole : true
            },
            { fieldName: '', field: 'cgnbtAdjustmentStatus', editable: false, width: 40 },
            {
                fieldName: this.translateService.translate('common.codemandatory'), field: 'deductionType', editable: true, width: 120,
                link: 'ocdoobli/cgfkOffDedDeductionTypeRecordGroup',source: 'OCMDEDUT', titles: this.codeTitle, datatype: 'lov', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('ocdoobli.infomandatory'), field: 'informationNumber',
                editable: true, width: 150, datatype: 'text', maxlength: 32, cellEditable: this.canMaxMonthlyAmount
            },
            { fieldName: this.translateService.translate('ocdoobli.groupid'), field: 'groupId', editable: false, width: 40
            },
            {
                fieldName: this.translateService.translate('common.statusmandatory'), field: 'deductionStatus', datatype: 'lov',
                domain:'DED_STATUS' /*link: 'ocdoobli/cgfkchkOffDedOffDedRef'*/, editable: true, width: 100, titles: this.statusTitle
            },
            {
                fieldName: this.translateService.translate('common.effectivedatemandatory'), field: 'effectiveDate', datatype: 'date',
                editable: true, width: 120, cellEditable: this.canMaxMonthlyAmount
            },
            {
                fieldName: this.translateService.translate('common.totalamount'), field: 'maxTotalAmount', editable: true, width: 120,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true, cellEditable: this.canMaxMonthlyAmount
            },
            {
                fieldName: this.translateService.translate('ocdoobli.monthlyamount'), field: 'maxMonthlyAmount', editable: true, width: 80,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true, cellEditable: this.canMaxMonthlyAmount, hide: true
            },
            {
                fieldName: this.translateService.translate('ocdoobli.unl'), field: 'cgnbtMaxMonthlyAmount', editable: false, width: 40,
                datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('ocdoobli.c'), field: 'commentText', datatype: 'text', maxlength: 225,
                uppercase: 'false', editable: true, width: 40
            },
            { fieldName: '', field: 'originalAmount', hide: true },
        ];

        this.offBncColumnDef = [
            {
                fieldName: this.translateService.translate('ocdoobli.id'), field: 'personId', editable: true, width: 150,
                cellEditable: this.launchButtonEnabled, datatype: 'number', maxValue: 99999999999
            },
            {
                fieldName: '', field: 'personId2', editable: false, width: 150, datatype: 'launchbutton', data: 'row',
                onLaunchClick: this.personBtnLaunchClick, isDisable: this.displaybtn
            },
            { fieldName: this.translateService.translate('common.person'), field: 'cgnbtPersonId', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocdoobli.id'), field: 'corporateId', editable: true, width: 150,
                cellEditable: this.launchButtonEnabled, datatype: 'number', maxValue: 99999999999
            },
            {
                fieldName: '', field: 'corporateId2', editable: false, width: 150, datatype: 'launchbutton', data: 'row',
                onLaunchClick: this.corporateBtnLaunchClick, cellEditable: this.canMaxMonthlyAmount,
                isDisable: this.displaybtn
            },
            {
                fieldName: this.translateService.translate('common.corporate'), field: 'corporateName', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocdoobli.unk'), field: 'cgnbtUnknownBenId', editable: true, width: 150,
                datatype: 'checkbox'
            },
            { fieldName: this.translateService.translate('ocdoobli.pri'), field: 'priority', editable: true, width: 150 },
            {
                fieldName: this.translateService.translate('common.amountmandatory'), field: 'amount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true
            },
            { fieldName: this.translateService.translate('common.percentage'), field: 'dspPercent', editable: false,
            datatype: 'text', width: 150 },
            {
                fieldName: this.translateService.translate('ocdoobli.sus'), field: 'cgnbtPercent', editable: false, width: 40,
                datatype: 'checkbox'
            },
            { fieldName: this.translateService.translate('ocdoobli.c'), field: 'commentText', editable: true, width: 40 },
            { fieldName: '', field: 'updated', hide: true},
        ];


        this.offDrColumnDef = [
            {
                fieldName: this.translateService.translate('common.type1'), field: 'receiptTxnType', editable: true, width: 150,
                link: 'ocdoobli/cgfkOffDrReceiptTxnTypeRecordGroup', datatype: 'lov', titles: this.transactionTile,
                cellEditable: this.canReciptTypeEditable
            },
            {
                fieldName: this.translateService.translate('common.percentage'), field: 'receiptPercentage', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true, cellEditable: this.canReciptTypeEditable
            },
            {
                fieldName: this.translateService.translate('ocdoobli.flatrate'), field: 'flatRate', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99,
                strictFP: true, whole: true, cellEditable: this.canReciptTypeEditable
            },
        ];
        if (!this.vHeaderBlockModel) {
            this.show(this.translateService.translate('common.pleasesearchforvalidoffender'));
        }
        if (this.sessionManager.currentCaseLoadType === 'INST') {
            this.offDedColumnDef[9].hide = false;
            this.grid.prepareAgColumnDef();
        } else {
            this.offDedColumnDef[9].hide = true;
            this.grid.prepareAgColumnDef();
        }
    }
    getDisabledButton() {
        if (this.menuSecurities.parentId) {
            const caseId = this.ocdoobliFactory.getDisabledButton(this.menuSecurities.parentId);
            caseId.subscribe(caseIdNuber => {
                if (caseIdNuber && caseIdNuber.includes('C')) {
                    this.writeOffDisable = true;
                } else {
                    this.writeOffDisable = false;
                }

            });
        }

    }
    onOffenderChange(offender) {
         this.offdedData = [];
         this.offbncData=[];
         this.offdrData=[];
        if (offender) {
            this.uniqueFlg = false;
            this.vHeaderBlockModel = offender;
            this.offdedInsertFlag = true;
            this.offbenInsertFlag = true;
            this.offdrInsertFlag = true;
            this.buttonDisable = true;
            this.ocdoobliexecuteQuery();
        } else {
            this.offdedData = [];
            this.offbncData = [];
            this.offdrData = [];
            this.offdedInsertFlag = false;
            this.offbenInsertFlag = false;
            this.offdrInsertFlag = false;
            this.offdedModel.uniqueobligationprofile = null;
            this.uniqueFlg = true;
            this.btnSave = true;
            this.vHeaderBlockModel = null;
            this.buttonDisable = true;
            this.writeOffDisable = true;
        }
    }
    canReciptTypeEditable = (data, index, field) => {
        // if (data.maintenanceFlag === 'Y') {
        //     return null;
        // }
        if (field === 'receiptTxnType' && data.createDateTime) {
            return false;
        }
        return true;
    }
    getCaseId() {
        if (this.vHeaderBlockModel.rootOffenderId && this.informationNumb) {

            const caseId = this.ocdoobliFactory.getCaseId(this.vHeaderBlockModel.rootOffenderId, this.informationNumb);
            caseId.subscribe(caseIdNuber => {
                if (caseIdNuber === 0) {
                    this.caseId = null;
                } else {
                    this.caseId = caseIdNuber;
                }

            });
        }

    }
    whenDeleteButtonClicked() {
        if (!this.isDeleteProgress) {
            this.isDeleteProgress = true;
            setTimeout(ele => this.isDeleteProgress = false, 4000);
        const removedata = JSON.parse(JSON.stringify(this.offdedSelected));
        const checkPrvDedTxn = this.ocdoobliFactory.checkprevDedTxnAndCheckpreviousBenrcvied(this.offdedModel);
        checkPrvDedTxn.subscribe(data => {
            if (data.length > 0) {
                if (data[0].txnExistFlg === 'Y') {
                    this.show(this.translateService.translate('ocdoobli.dontallow') + this.offdedModel.deductionType
                        + this.translateService.translate('ocdoobli.which'));
                    return false;

                } else if (data[0].vprevBncFlg === 'Y') {
                    this.show(this.translateService.translate('ocdoobli.cannot'));
                    return false;
                }/* else if (data[0].profileVal === 'N' || data[0].vprevBncFlg === 'N') {
                        this.show(this.translateService.translate('common.cannotdeletemaster'));
                        return false;
                }  else if (removedata && removedata.parentDeductionType && removedata.parentDeductionType.deductionCategory === 'CROB') {
                    this.show('Credit Obligation`s Deduction Type cannot be Deleted.');
                }*/
                else {
                    this.grid.removeRecord(this.grid.gridOptions);
                }

            }

        });
    }
    }
    preDelete = (event) => {
        const offDetail = ` ${this.vHeaderBlockModel.offenderId} ${this.vHeaderBlockModel.lastName}  ${this.vHeaderBlockModel.firstName} `;
        const data = {
            label: `Do you wish to delete the Obligation ${event[0].offenderDeductionId} for Offender ${offDetail}`,
            yesBtn: true, noBtn: true
        };
        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
            if (result) {
                const csldDEvent = { added: [], updated: [], removed: [] };
                const removed = [] = event;
               //  this.grid.removedMap.forEach((value, keys) => { removed.push(value); });
                csldDEvent.removed = JSON.parse(JSON.stringify(removed));
                this.offdedModel.commitBean = new OffenderDeductions();
                if (csldDEvent.added.length > 0 || csldDEvent.updated.length > 0 || csldDEvent.removed.length > 0) {
                    this.lastSave++;
                    this.ocdoobliSaveoffDedForm(csldDEvent);
                }

            }
        });
        return false;
    }
    get isRemoveDisable() {
        if (this.offdedSelected.createDateTime &&
            (this.offdedSelected['parentDeductionType'] && this.offdedSelected['parentDeductionType'].deductionCategory !== 'CROB')) {
                return true;
            } else {
                return false;
            }
    }
    whenCheckBoxChanged(event) {
        if (event === true) {
            this.oblFlg = 'Y';
        } else {
            this.oblFlg = 'N';
        }
        if (this.vHeaderBlockModel.rootOffenderId) {
            const updateserv = this.ocdoobliFactory.updateOffenders(this.oblFlg, this.vHeaderBlockModel.rootOffenderId);
            updateserv.subscribe(update => {

            });
        }


    }
    onGridDelete = (rowdata) => {
        const data = rowdata && rowdata.length > 0 ? rowdata[0] : null;
        if (!data) {
            return false;
        }
        if (data.transactionDetails.txnExistFlg === 'Y') {
            this.show(this.translateService.translate('ocdoobli.dontallow') + this.offdedModel.deductionType
                + this.translateService.translate('ocdoobli.which'));
            return false;

        } else if (data.transactionDetails.vprevBncFlg === 'Y') {
            this.show(this.translateService.translate('ocdoobli.cannot'));
            return false;
        } else if (this.offbncData.length > 0 || this.offdrData.length > 0) {
            this.show(this.translateService.translate('common.cannotdeletemaster'));
            return false;
        } else if (this.offdedSelected.maxMonthlyAmount || this.offdedSelected.maxTotalAmount) {
            this.show(this.translateService.translate('common.cannotdeletemaster'));
            return false;
        }
        return true;
    }
        onGridBncDel = (event) => {
            const data = event && event.length > 0 ?  event[0] : null;
            if (!data) {
                return false;
            } else {
                if (data.receivedAmount > 0) {
                    this.show(this.translateService.translate('ocdoobli.thisbeneficiaryhasbegun'));
                        return false;
                }
            }
            return true;
            // if (this.offbncData.length > 0) {
            //     this.offbncData.forEach(ele => {
            //         if (ele.receivedAmount > 0) {
            //             this.show(this.translateService.translate('ocdoobli.thisbeneficiaryhasbegun'));
            //             return false;
            //         }

            //     });
            //     return true;
            // }
        }
        // if (this.offbncData.length > 0 || this.offdrData.length > 0) {
        //     const checkPrvDedTxn = this.ocdoobliFactory.checkprevDedTxnAndCheckpreviousBenrcvied(this.offdedModel);
        //     checkPrvDedTxn.subscribe(data => {
        //         if (data.length > 0) {
        //             if (data[0].txnExistFlg === 'Y') {
        //                 this.show(this.translateService.translate('ocdoobli.dontallow') + this.offdedModel.deductionType
        //                     + this.translateService.translate('ocdoobli.which'));
        //                 return false;

        //             } else if (data[0].vprevBncFlg === 'Y') {
        //                 this.show(this.translateService.translate('ocdoobli.cannot'));
        //                 return false;
        //             } else {
        //                 if (data[0].profileVal === 'N' || data[0].vprevBncFlg === 'N') {
        //                     this.show(this.translateService.translate('common.cannotdeletemaster'));
        //                     return false;
        //                 }

        //             }

        //         }

        //     });
        // } else {
        //     return true;
        // }
    getProfilePayplnFlg() {
        const profilePayplnFlg = this.ocdoobliFactory.profilePlanFlag();
        profilePayplnFlg.subscribe(planFlg => {
            if (planFlg) {
                this.vpayPlanFlg = planFlg;

            }

        });
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    canCellEdit = (data: any, index: number, field: string) => {
        if (this.offdedModel.offenderDeductionId) {
            return false;
        }
        return true;

    }
    canMaxTotalAmount(data: any, index: number, field: string) {
        if (!data.createDateTime) {
            return false;
        }
        return true;

    }
    canMaxMonthlyAmount(data: any, index: number, field: string) {
        if (data && data.parentDeductionType && data.parentDeductionType.deductionCategory === 'CROB') {
            return false;
        }
        return true;

    }

    onGridInsert = () => {
        if (!this.ocdoobliRecordValidation(this.offdedData, 'I')) {
            return null;
        }

        return { effectiveDate: DateFormat.getDate(), cgnbtMaxMonthlyAmount: 'Y' };
    }
    onGridBncInsert = () => {
        // if (!this.offdedModel.offenderDeductionId) {
        //     this.show(this.translateService.translate('common.youcannotcreatethisrecord'), 'warn');
        //     return null;
        // }
        if (!this.ocdoobliRecordBncValidation(this.offbncData, 'I', true)) {
            return null;
        }
        const data = { personId2: this.launchDots, corporateId2: this.launchDots, cgnbtUnknownBenId: null };
        data['cgnbtMaxMonthlyAmount'] = this.offdedSelected.cgnbtMaxMonthlyAmount;
        data['maxTotalAmount'] = this.offdedSelected.maxTotalAmount;
        data['maxMonthlyAmount'] = this.offdedSelected.maxMonthlyAmount;
        return data;
    }
    get offBenInsertFlag(): boolean {
        if (this.offdedData && this.offdedData.length > 0 && (this.offdedSelected.createDateTime
            || (this.offbncData && this.offbncData.length > 0 && !this.offbncData[0]['isEmpty']))) {
            return true;
        }
        return false;
    }
    get offDrInsertFlag(): boolean {
        if (this.offdedData && this.offdedData.length > 0 && (this.offdedSelected.createDateTime
            || (this.offdrData && this.offdrData.length > 0 && !this.offdrData[0]['isEmpty']))) {
            return true;
        }
        return false;
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        this.globalSuccessFlag = 'Y';
        this.vpayPlanFlg = 'N';

        if (event.field === 'informationNumber' && event.data.informationNumber) {
            this.informationNumb = event.data.informationNumber;
            this.getCaseId();
            const raisetoomany = this.ocdoobliFactory.checkinformationandDeductionType(this.vHeaderBlockModel.rootOffenderId,
                event.data.deductionType, event.data.informationNumber);
            raisetoomany.subscribe(checkOne => {
                if (checkOne === 1) {
                    this.show('ocdoobli.samededucton');
                    this.grid.setColumnData('deductionType', rowIndex,
                        null);
                    this.grid.setColumnData('informationNumber', rowIndex,
                        null);
                    this.grid.setColumnData('deductionPriority', rowIndex,
                        null);
                    this.grid.setColumnData('maxTotalAmount', rowIndex, null);
                    event.data.maxTotalAmount = null;
                    this.grid.setColumnData('maxMonthlyAmount', rowIndex, null);
                    this.grid.setColumnData('deductionStatus', rowIndex,
                        null);
                    this.grid.setColumnData('effectiveDate', rowIndex,
                        null);

                }
            });
            this.grid.setColumnData('groupId', rowIndex,
                        this.groupId);

        }
        if (this.sessionManager.currentCaseLoadType === 'COMM' && this.vpayPlanFlg === 'Y') {
            event.data.groupId = event.data.deductionType;
            event.data.profilePayplnFlg = this.vpayPlanFlg;
        }
        if (event.field === 'deductionType') {
            if (event.data.deductionType && event.data.deductionPriority) {
                this.deductionType = event.data.deductionType;
                if (event.data.deductionPriority && (event.newValue !== event.oldValue)) {

                    const tcountservice = this.ocdoobliFactory.gettCount(this.vHeaderBlockModel.offenderId,
                        this.sessionManager.currentCaseLoad,
                        event.data.deductionType, event.data.deductionPriority);
                    tcountservice.subscribe(tCount => {
                        if (tCount > 0) {
                            this.tCount = tCount;
                            this.show(this.translateService.translate('ocdoobli.rowexists') + this.sessionManager.currentCaseLoad +
                                this.translateService.translate('ocdoobli.offender')
                                + this.vHeaderBlockModel.offenderId + this.translateService.translate('ocdoobli.code')
                                + event.data.deductionType
                                + this.translateService.translate('ocdoobli.andodp') +
                                event.data.deductionPriority + this.translateService.translate('ocdoobli.pleaseremove'));
                            this.grid.setColumnData('deductionType', rowIndex,
                                null);
                            this.grid.setColumnData('deductionPriority', rowIndex,
                                null);
                            this.grid.setColumnData('maxTotalAmount', rowIndex, null);
                            event.data.maxTotalAmount = null;
                            this.grid.setColumnData('maxMonthlyAmount', rowIndex, null);
                            this.grid.setColumnData('deductionStatus', rowIndex,
                                null);
                            this.grid.setColumnData('effectiveDate', rowIndex,
                                null);
                            rowdata.validated = true;
                            return rowdata;

                        } else {
                            this.tCount = 0;
                        }

                    });

                }
            }
        }
        if (event.field === 'deductionType' && event.data.deductionType && (event.newValue !== event.oldValue)) {
            this.groupId = null;
            const serviceObj = this.ocdoobliFactory.checkCrTpe(event.data.deductionType);
            serviceObj.subscribe(data => {
                if (data === 'EMPTY') {
                    return;
                } else {
                    this.show(this.translateService.translate('ocdoobli.youcannot'));
                    this.grid.setColumnData('deductionType', rowIndex,
                        null);
                    this.grid.setColumnData('deductionStatus', rowIndex,
                        null);
                    this.grid.setColumnData('effectiveDate', rowIndex,
                        null);
                    return;
                }
            });

            const serviceObjCsld = this.ocdoobliFactory.cgfkchkOffDedOffDedCsld(event.data.deductionType);
            serviceObjCsld.subscribe(data => {
                if (data && data.length > 0) {
                    if (data.maxRecursiveAmount) { }
                    event.data.maxRecursiveAmount = data.maxRecursiveAmount;
                }
                this.dspEffectiveDate = data.effectiveDate;
                this.fifoFlag = data.fifoFlag;
                if (data.maxMonthlyAmount) {
                    event.data.maxMonthlyAmount = data.maxMonthlyAmount;
                    event.data.originalAmount = data.maxMonthlyAmount;
                    event.data.amountStatus = 'Y';
                    this.grid.setColumnData('maxTotalAmount', rowIndex,
                        event.data.maxMonthlyAmount);
                } else {
                    if (data.maxTotalAmount) {
                        event.data.amountStatus = 'Y';
                        event.data.maxTotalAmount = data.maxTotalAmount;
                        event.data.originalAmount = data.maxTotalAmount;

                        this.grid.setColumnData('maxTotalAmount', rowIndex,
                            event.data.maxTotalAmount);
                        this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex,
                            null);
                    } else {
                        this.grid.setColumnData('maxTotalAmount', rowIndex,
                            null);
                        this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex,
                            'Y');
                    }
                }
                this.tablebncIndex = -1;
                this.tablededucIndex = -1;
                this.offbenInsertFlag = false;
                this.offdrInsertFlag = false;
                setTimeout(ele => {
                    const emptyDataSet = [];
                    emptyDataSet.push({isEmpty: true});
                    this.offbncData = emptyDataSet;
                    this.offdrData = emptyDataSet;
                }, 100);

            });
            if (event.data.deductionType && this.caseId !== null && this.caseId !== undefined) {
                if (event.data.deductionType === 'REST') {
                    const setJs = this.ocdoobliFactory.setJsCondition(this.caseId);
                    setJs.subscribe(data => {
                        if (data > 0) {
                            this.offdedModel.jsStatus = 'Y';

                        } else {
                            this.offdedModel.jsStatus = 'N';
                        }

                    });
                }
            }
            event.data.deductionStatus = 'A';
            const serviceObjOne = this.ocdoobliFactory.cgfkGroupoblgroupidRecordGroup(event.data.deductionType);
            serviceObjOne.subscribe(data => {
                if (data.length > 0) {
                    this.groupId = data[0].code;
                }

            });
            // this.link = 'cgfkGroupOblGroupIdRecordGroup?deductionType=' + event.data.deductionType;
            // this.offDedColumnDef[5].link = this.link;
            // this.grid.prepareAgColumnDef();
        }
        if (event.field === 'effectiveDate' && event.data.effectiveDate && (event.newValue !== event.oldValue)) {
            const serviceObjCsld = this.ocdoobliFactory.cgfkchkOffDedOffDedCsld(event.data.deductionType);
            serviceObjCsld.subscribe(data => {
                this.dspEffectiveDate = data.effectiveDate ? DateFormat.getDate(DateFormat.getDate(data.effectiveDate).setHours(0, 0, 0, 0))
                    : null;
                this.dspDate = DateFormat.format(this.dspEffectiveDate);
                this.effectiveDate = DateFormat.format(event.data.effectiveDate);
                const comapreDateTime = this.ocdoobliFactory.omsUtilcomareDateTime(this.effectiveDate, this.dspDate);
                comapreDateTime.subscribe(value => {
                    if (value === -1) {
                        const errorMsg = this.ocdoobliFactory.displayErrorMessage();
                        errorMsg.subscribe(messageText => {
                            if (messageText) {
                                this.show(messageText, 'warn');
                                this.grid.setColumnData('effectiveDate', rowIndex,
                                    null);
                                return;
                            }

                        });
                    }
                });
            });

        }


        if (event.field === 'maxTotalAmount' && event.newValue !== event.oldValue) {
            const bData = JSON.parse(JSON.stringify(this.offbncData));
            bData.forEach((SData, index) => {
                this.bncGrid.setColumnData('updated', index, 'Y');
            });

            if (event.data.maxTotalAmount && event.data.maxRecursiveAmount || event.data.maxMonthlyAmount) {
                event.data.maxRecursiveAmount = null;
                if (event.data.maxTotalAmount) {
                    if (this.tCount > 0) {
                        this.grid.setColumnData('maxTotalAmount', rowIndex, null);
                    }
                    this.grid.setColumnData('maxMonthlyAmount', rowIndex, null);
                }
                this.bncGrid.setColumnData('amount', rowIndex, event.data.maxTotalAmount);
            }
            if (!event.data.maxTotalAmount && !event.data.maxMonthlyAmount && !event.data.maxRecursiveAmount) {
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, 'Y');

            } else {
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, null);
            }
            if (event.data.offenderDeductionId && event.data.maxTotalAmount) {
                if (event.data.maxRecursiveAmount && event.data.maxTotalAmount && this.sessionManager.currentCaseLoadType === 'COMM') {
                    if (this.vpayPlanFlg === 'Y') {
                        if (Number(event.data.maxRecursiveAmount) > Number(event.data.maxTotalAmount)) {
                            const validation = this.ocdoobliFactory.getCheckOne(this.vHeaderBlockModel.rootOffenderId,
                                event.data.informationNumber, event.data.groupId);
                            validation.subscribe(checkOne => {
                                if (checkOne === 1) {
                                    this.show(this.translateService.translate('ocdoobli.pleasegotopayment'));
                                    event.data.maxTotalAmount = event.data.maxRecursiveAmount;
                                    return;
                                } else {
                                    return;
                                }

                            });

                        }

                    }


                }
                if (event.data.maxTotalAmount || event.data.deductionAmount) {
                    this.vMaxTotalAmnt = event.data.maxTotalAmount;
                    this.vdedamnt = event.data.deductionAmount;
                } else {
                    this.vMaxTotalAmnt = 0;
                    this.vdeductionAmnt = 0;
                }
                if (this.vMaxTotalAmnt < this.vdedamnt) {
                    this.show(this.translateService.translate('ocdoobli.totalamount') + this.vdedamnt
                    );
                    return;


                }

            }
        }
        if (event.data.maxRecursiveAmount) {
            if ((event.data.maxTotalAmount || event.data.maxMonthlyAmount) && event.data.maxRecursiveAmount) {
                this.grid.setColumnData('maxTotalAmount', rowIndex, null);
                this.grid.setColumnData('maxMonthlyAmount', rowIndex, null);

            }
            if (!event.data.maxTotalAmount && !event.data.maxMonthlyAmount && !event.data.maxRecursiveAmount) {
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, 'Y');
            } else {
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, null);
            }
            if (event.data.offenderDeductionId && event.data.maxRecursiveAmount) {
                if (event.data.maxTotalAmount && event.data.maxRecursiveAmount && this.sessionManager.currentCaseLoadType === 'COMM') {
                    if (this.vpayPlanFlg === 'Y') {
                        if (Number(event.data.maxTotalAmount) > Number(event.data.maxRecursiveAmount)) {
                            const validation = this.ocdoobliFactory.getCheckOne(this.vHeaderBlockModel.rootOffenderId,
                                event.data.informationNumber, event.data.groupId);
                            validation.subscribe(checkOne => {
                                if (checkOne === 1) {
                                    this.show(this.translateService.translate('ocdoobli.pleasegotopayment'));
                                    event.data.maxTotalAmount = event.data.maxRecursiveAmount;
                                    return;
                                } else {
                                    return;
                                }

                            });

                        }

                    }


                }
                const vsDamtCur = this.ocdoobliFactory.getvsDamtCur(event.data.offenderDeductionId);
                vsDamtCur.subscribe(data => {
                    if (data) {
                        if (data.vsDamtCurVal) {
                            event.data.deductionAmount = data.vsDamtCurVal;
                        } else {
                            event.data.deductionAmount = 0;
                        }
                        this.vOldrecAmnt = data.maxRecursiveAmount;
                        this.vEffDate = data.effectiveDate;
                        this.vTotalPaid = data.maxRecursiveAmount;

                        if (event.data.maxRecursiveAmount) {
                            event.data.maxRecursiveAmount = event.data.maxRecursiveAmount;
                        } else {
                            event.data.maxRecursiveAmount = 0;
                        }
                        const monthsBetw = this.ocdoobliFactory.getMonths(this.vEffDate);
                        monthsBetw.subscribe(months => {
                            if (months) {
                                this.monBetween = months;
                            }

                        });

                        if (event.data.maxRecursiveAmount < event.data.deductionAmount - (this.monBetween * this.vOldrecAmnt)
                            - this.vTotalPaid) {
                            this.total = event.data.deductionAmount - (this.monBetween * this.vOldrecAmnt) - this.vTotalPaid;
                            this.show(this.translateService.translate('ocdoobli.recursiveamount') +
                                this.total + this.translateService.translate('ocdoobli.ninenine'));
                            return;

                        }

                    }

                });


            }
            this.globalSuccessFlag = 'Y';


        }
        if (event.field === 'maxMonthlyAmount' && event.newValue !== event.oldValue) {
            const bData = JSON.parse(JSON.stringify(this.offbncData));
            bData.forEach((SData, index) => {
                this.bncGrid.setColumnData('updated', index, 'Y');
            });
            if (event.data.maxMonthlyAmount && event.data.maxTotalAmount || event.data.maxRecursiveAmount) {
                this.grid.setColumnData('maxTotalAmount', rowIndex, null);
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, null);
                this.bncGrid.setColumnData('amount', rowIndex, event.data.maxTotalAmount);
            }
            if (!event.data.maxTotalAmount && !event.data.maxMonthlyAmount && !event.data.maxRecursiveAmount) {
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, 'Y');

            } else {
                this.grid.setColumnData('cgnbtMaxMonthlyAmount', rowIndex, null);
            }

            if (event.data.offenderDeductionId && event.data.maxMonthlyAmount) {

                const serviceObj = this.ocdoobliFactory.getDeductionAmnt(event.data.offenderDeductionId);
                serviceObj.subscribe(dedAmnt => {
                    if (dedAmnt === null) {
                        dedAmnt = 0;

                    }
                    if (dedAmnt) {
                        if (event.data.maxMonthlyAmount === null) {
                            event.data.maxMonthlyAmount = 0;
                        }
                        if (event.data.maxMonthlyAmount || dedAmnt) {
                            this.vmaxMonthlyAmnt = event.data.maxMonthlyAmount;
                            this.vdeductionAmnt = dedAmnt;
                        } else {
                            this.vmaxMonthlyAmnt = 0;
                            this.vdeductionAmnt = 0;
                        }
                        if (this.vmaxMonthlyAmnt < this.vdeductionAmnt) {
                            this.show(this.translateService.translate('ocdoobli.monthlyamountshouldnotless')
                                + this.vdeductionAmnt);
                            this.grid.setColumnData('maxMonthlyAmount', rowIndex, null);
                            rowdata.validated = true;
                            return rowdata;
                        }
                    }

                });


                this.globalSuccessFlag = 'Y';
            }
        }
        if (event.field === 'cgnbtMaxMonthlyAmount' && event.newValue) {
            for (let ind = 0; ind < this.offbncData.length; ind++) {
                this.bncGrid.setColumnData('amount', ind, 999999999.99);
            }
        }
        this.offbncData.forEach(ele => {
            ele['cgnbtMaxMonthlyAmount'] = event.data.cgnbtMaxMonthlyAmount;
            ele['maxTotalAmount'] = event.data.maxTotalAmount;
            ele['maxMonthlyAmount'] = event.data.maxMonthlyAmount;
        });
        rowdata.validated = true;
        return rowdata;
    }
    validateBncRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'personId') {
            if (!event.data.personId) {
                this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, null);
                this.bncGrid.setColumnData('cgnbtPercent', rowIndex, null);
            } else if (event.data.corporateId && event.data.personId) {
                this.show(this.translateService.translate('ocdoobli.onlyperson'));
                return;
            } else {
                if (event.data.personId) {
                    const serviceObj = this.ocdoobliFactory.getLastFirstNames(event.data.personId);
                    serviceObj.subscribe(data => {
                        if (data && !data.errorMessage) {
                            data.lastFirstName = data.lastNameKey;
                            this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, data.lastFirstName);
                            if (data.suspendedFlag === 'Y') {
                            this.bncGrid.setColumnData('cgnbtPercent', rowIndex, true);
                            } else {
                                this.bncGrid.setColumnData('cgnbtPercent', rowIndex, null);
                            }
                            const perExist = this.ocdoobliFactory.getPerExists(this.offdedModel.offenderDeductionId, event.data.personId);
                            perExist.subscribe(perExists => {
                                if (perExists > 0) {
                                    this.show(this.translateService.translate('ocdoobli.thispersonalready'));
                                    this.bncGrid.setColumnData('personId', rowIndex, null);
                                    this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, null);
                                    return;
                                } else if (perExists === 0) {
                                    this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, data.lastFirstName);
                                    this.bncGrid.setColumnData('cgnbtPercent', rowIndex, data.suspendedFlag);
                                    return;
                                }

                            });

                        } else {
                            this.show(this.translateService.translate('ocdoobli.personnamenotfound'));
                            this.bncGrid.setColumnData('personId', rowIndex, null);
                            this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, null);
                        }



                    });
                }
                this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, null);
                if (event.data.unknownBenId) {
                    if (event.data.receivedAmount) {
                        event.data.receivedAmount = event.data.receivedAmount;
                    } else {
                        event.data.receivedAmount = 0;
                    }

                    if (event.data.receivedAmount !== 0) {

                        const data = {
                            label: this.translateService.translate(this.translateService.translate('ocdoobli.apersonoracorporate')),
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                            if (result) {
                                if (event.data.personId || event.data.corporateId) {
                                    this.offbenTemModel.personId = event.data.personId;
                                    this.offbenTemModel.corporateId = event.data.corporateId;
                                    this.offbenTemModel.offenderDeductionId = event.offenderDeductionId;
                                    this.offbenTemModel.unknownBenId = event.data.unknownBenId;
                                    const updatebenficiiaryTrans = this.ocdoobliFactory.updateBenficiaryTransactions(this.offbenTemModel);
                                    updatebenficiiaryTrans.subscribe(update => {
                                        if (update) {
                                            return;

                                        }

                                    });
                                    this.bncGrid.setColumnData('unknownBenId', rowIndex, null);

                                }

                            } else {
                                this.bncGrid.setColumnData('personId', rowIndex, null);
                                this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, null);
                                this.bncGrid.setColumnData('corporateId', rowIndex, null);
                                this.bncGrid.setColumnData('corporateName', rowIndex, null);
                                this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, 'true');
                            }
                        });


                    }
                    this.globalUnknownBenficiaryTransfer = 'Y';

                } else {
                    this.globalUnknownBenficiaryTransfer = 'N';

                }
                this.globalSuccessFlag = 'Y';

            }
        }
        if (event.field === 'corporateId' && Number(event.newValue) !== Number(event.oldValue)) {
            if (!event.data.corporateId) {
                this.bncGrid.setColumnData('corporateName', rowIndex,
                    null);
                this.bncGrid.setColumnData('cgnbtPercent', rowIndex,
                    'false');
            } else if (event.data.corporateId && event.data.personId) {
                this.show(this.translateService.translate('ocdoobli.onlyperson'));
                return;

            } else if (event.data.corporateId && event.data.unknownBenId) {
                this.bncGrid.setColumnData('corporateId', rowIndex, event.data.corporateId);
                this.bncGrid.setColumnData('corporateName', rowIndex, event.data.corporateName);
                this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, null);
                const corpName = this.ocdoobliFactory.getcorpName(event.data.corporateId);
                corpName.subscribe(data => {
                    if (data.corporateName) {
                        this.bncGrid.setColumnData('corporateName', rowIndex, data.corporateName);
                        if (data.suspendedFlag === 'Y') {
                            this.bncGrid.setColumnData('cgnbtPercent', rowIndex, true);
                        } else {
                            this.bncGrid.setColumnData('cgnbtPercent', rowIndex, null);
                        }
                    } else {
                        this.show('otmcopro.invalidvalueforfieldcorporateid');
                        this.bncGrid.setColumnData('corporateId', rowIndex, null);
                        this.bncGrid.setColumnData('corporateName', rowIndex, null);
                    }

                });

            } else {
                this.corporateidExists = false;
                const corpName = this.ocdoobliFactory.getcorpName(event.data.corporateId);
                corpName.subscribe(data => {
                    if (data.corporateName) {
                        this.bncGrid.setColumnData('corporateName', rowIndex, data.corporateName);
                        if (data.suspendedFlag === 'Y') {
                            this.bncGrid.setColumnData('cgnbtPercent', rowIndex, true);
                        } else {
                            this.bncGrid.setColumnData('cgnbtPercent', rowIndex, null);
                        }
                    } else {
                        this.show('otmcopro.invalidvalueforfieldcorporateid');
                        this.bncGrid.setColumnData('corporateId', rowIndex, null);
                        this.bncGrid.setColumnData('corporateName', rowIndex, null);
                    }

                });
                const corpExist = this.ocdoobliFactory.getCorpExists(this.offdedModel.offenderDeductionId, event.data.corporateId);
                corpExist.subscribe(corpExists => {
                    if (corpExists > 0) {
                        this.corporateidExists = true;
                        this.show(this.translateService.translate('ocdoobli.thiscorporatealready'));
                        this.bncGrid.setColumnData('corporateId', rowIndex, null);
                        this.bncGrid.setColumnData('corporateName', rowIndex, null);
                        return;
                    } if (corpExists === null) {
                        this.show(this.translateService.translate('ocdoobli.corporatedoes'));
                        return;
                    }

                });
                this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, null);
                if (event.data.unknownBenId) {
                    if (event.data.receivedAmount) {
                        event.data.receivedAmount = event.data.receivedAmount;
                    } else {
                        event.data.receivedAmount = 0;
                    }

                    if (event.data.receivedAmount !== 0) {

                        const data = {
                            label: this.translateService.translate(this.translateService.translate('ocdoobli.apersonoracorporate')),
                            yesBtn: true, noBtn: true
                        };
                        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                            if (result) {
                                if (event.data.personId || event.data.corporateId) {
                                    this.offbenTemModel.personId = event.data.personId;
                                    this.offbenTemModel.corporateId = event.data.corporateId;
                                    this.offbenTemModel.offenderDeductionId = event.offenderDeductionId;
                                    this.offbenTemModel.unknownBenId = event.data.unknownBenId;
                                    const updatebenficiiaryTrans = this.ocdoobliFactory.updateBenficiaryTransactions(this.offbenTemModel);
                                    updatebenficiiaryTrans.subscribe(update => {
                                        if (update) {
                                            return;

                                        }

                                    });
                                    this.bncGrid.setColumnData('unknownBenId', rowIndex, null);

                                }

                            } else {
                                this.bncGrid.setColumnData('personId', rowIndex, null);
                                this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, null);
                                this.bncGrid.setColumnData('corporateId', rowIndex, null);
                                this.bncGrid.setColumnData('corporateName', rowIndex, null);
                                this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, null);
                            }
                        });


                    }
                    this.globalUnknownBenficiaryTransfer = 'Y';

                } else {
                    this.globalUnknownBenficiaryTransfer = 'N';

                }
                this.globalSuccessFlag = 'Y';
            }

        }
        if (event.field === 'cgnbtUnknownBenId' && Number(event.newValue) !== Number(event.oldValue)) {
            if (event.newValue) {
                const num = this.findOccurence(this.offbncData, event.field);
                if (num > 1) {
                    this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, null);
                    this.show('ocdoobli.rowalreadyforbeneuk');
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            if (event.data.cgnbtUnknownBenId) {
                if (event.data.personId || event.data.corporateId) {

                    const data = {
                        label: this.translateService.translate('ocdoobli.alreayselected'),
                        yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 30).subscribe(result => {
                        if (result) {
                            this.bncGrid.setColumnData('personId', rowIndex, null);
                            this.bncGrid.setColumnData('cgnbtPersonId', rowIndex, null);
                            this.bncGrid.setColumnData('corporateId', rowIndex, null);
                            this.bncGrid.setColumnData('corporateName', rowIndex, null);

                        } else {
                            this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, null);
                        }
                    });
                }
            }
            if (this.offbncSelected.unknownBenId && !this.offbncSelected.personId && !this.offbncSelected.corporateId) {
                this.show(this.translateService.translate('ocdoobli.thebeneficiary'));
                this.bncGrid.setColumnData('cgnbtUnknownBenId', rowIndex, true);
                rowdata.validated = true;
                return rowdata;

            }
        }

        if (event.field === 'amount' && Number(event.newValue) !== Number(event.oldValue)) {
            this.bncGrid.setColumnData('amount', rowIndex,
                event.data.amount);
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        this.offdedData[this.obligationIndex]['child'] = this.offbncData;
        return rowdata;

    }
    findOccurence(data: any[], key) {
        if (data && data.length > 0) {
           const num = data.filter(ele => ele[key] ? ele[key] : null);
           return num.length;
        }
        return 0;
    }
    isDublicateOffender(receiptTxnType): string {
        const gridData = JSON.parse(JSON.stringify(this.offdrData));
        const flag = gridData.filter(ele => {
            return ele.receiptTxnType === receiptTxnType;
        });
        if (flag.length > 1) {
            this.flag = 'Y';
        } else {
            this.flag = 'N';
        }
        return this.flag;

    }

    validateDrRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'receiptTxnType' && Number(event.newValue) !== Number(event.oldValue)) {
            this.isDublicateOffender(event.data.receiptTxnType);
            if (this.flag === 'Y') {
                const msgOne = 'Receipt type';
                const msgTwo = event.data.receiptTxnType;
                const msgThree = ' already exist for ';
                const msgFour = this.offdedModel.deductionType;
                const msgFive = ' on ';
                const msgSix = this.sessionManager.currentCaseLoad;
                const msgSeven = '.';
                this.msgsShow = `${msgOne} ${msgTwo} ${msgThree} ${msgFour} ${msgFive} ${msgSix} ${msgSeven}`;
                this.show(this.msgsShow);
                this.drGrid.setColumnData(event.field, rowIndex, null);
                rowdata.validated = true;
                return rowdata;
            }
            this.offdedreceptsTempModel.offenderDeductionId = event.data.offenderDeductionId;
            this.offdedreceptsTempModel.receiptTxnType = event.data.receiptTxnType;
            this.offdedreceptsTempModel.caseloadType = this.sessionManager.currentCaseLoadType;
            this.offdedreceptsTempModel.caseloadId = this.sessionManager.currentCaseLoad;
            this.offdedreceptsTempModel.deductionType = this.deductionType;


        }
        if ((event.data.flatRate || event.data.flatRate === 0) && (event.data.receiptPercentage || event.data.receiptPercentage === 0)) {
            this.both = true;
            this.show(this.translateService.translate('ocdoobli.onlypercentageorflat'));
            this.drGrid.setColumnData(event.field, rowIndex, null);
            rowdata.validated = true;
            return rowdata;
        }





        if (event.data.receiptPercentage) {
            if (event.field === 'receiptPercentage' && Number(event.newValue) !== Number(event.oldValue)) {
                if (event.newValue) {
                    this.drGrid.setColumnData('receiptPercentage', rowIndex,
                        Number(event.newValue).toFixed(2));
                }
                if (event.newValue && (Number(event.newValue) < 0 || Number(event.newValue) > 100)) {
                    this.show('otmalpro.mstbeofform');
                    this.drGrid.setColumnData('receiptPercentage', rowIndex, null);
                }
            }
        }
        if (event.data.flatRate) {
            if (event.field === 'flatRate' && Number(event.newValue) !== Number(event.oldValue)) {
                if (event.newValue) {
                    this.drGrid.setColumnData('flatRate', rowIndex,
                        Number(event.newValue).toFixed(2));
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    onRowClickoffded(event) {
        this.obligationIndex = -1;
        if (event) {
            const index = this.offdedData.indexOf(event);
            this.offdedSelected = event;
            this.offdedModel = event;
            this.offdedModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            if (!this.offdedModel.offenderDeductionId) {
                this.offbncData = [];
                this.offdrData = [];

            }
            if (this.offdedModel.offenderDeductionId) {
                this.offbncModel = new OffenderBeneficiaries();
                this.offbncModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
                this.offbncExecuteQuery(index);
                this.offdrModel = new OffenderDeductionReceipts();
                this.offdrModel.offenderDeductionId = this.offdedModel.offenderDeductionId;
                this.offdrExecuteQuery();
            } else {
                this.getDefaultDeductions();
            }
            if (this.offdedModel.createDateTime && this.sessionManager.currentCaseLoadType === 'COMM') {
                this.buttonDisable = false;
            } else {
                this.buttonDisable = true;
            }
            this.obligationIndex = index;
        } else {
            this.offdedSelected = new OffenderDeductions();
        }
    }
    onWiteOffLaunchClick = () => {
        if (this.offdedModel.deductionCategory === 'CROB') {
            this.dilogOpenFlg = true;
            const chkOffeded = this.ocdoobliFactory.cgfkchkOffDedOffDedT(this.offdedModel.deductionType, this.offdedModel.caseloadId);
            chkOffeded.subscribe(data => {
                if (data.length > 0) {
                    this.dspIncrementPayableFlag = data[0].incrementPayablesFlag;
                }
                if (this.dspIncrementPayableFlag === 'Y') {
                    if (this.offdedModel.caseloadId !== this.sessionManager.currentCaseLoad) {
                        this.dilogOpenFlg = false;
                        this.show(this.translateService.translate('ocdoobli.cannotwriteoff'));
                        return;
                    }
                } else {
                    this.dilogOpenFlg = false;
                    this.show(this.translateService.translate('ocdoobli.indicatorincrement') + this.offdedModel.deductionType);
                    return;
                }
                if (this.offdedModel.maxTotalAmount === null) {
                    this.offdedModel.maxTotalAmount = 0;
                }
                if (this.offdedModel.deductionAmount === null) {
                    this.offdedModel.deductionAmount = 0;
                }
                if (this.offdedModel.adjustmentAmount === null) {
                    this.offdedModel.adjustmentAmount = 0;
                }
                if (this.offdedModel.maxTotalAmount - this.offdedModel.deductionAmount - this.offdedModel.adjustmentAmount <= 0) {
                    this.dilogOpenFlg = false;
                    this.show(this.translateService.translate('ocdoobli.offenderhasnoamount') + this.offdedModel.deductionType);
                    return;

                }
                if (this.dilogOpenFlg) {
                    this.dialogService.openLinkDialog('/otucobwodialog', this.offdedModel, 80).subscribe(result => {

                    });
                }
            });

        } else {
            this.show(this.translateService.translate('ocdoobli.adjustmentscanbemade'));
            return;
        }

    }
    onWiteOffHistoryLaunchClick = () => {
        if (this.offdedModel.deductionCategory === 'CROB') {
            this.dialogService.openLinkDialog('/OTUCOBWH', this.offdedModel, 80).subscribe(result => {

            });
        } else {
            this.show(this.translateService.translate('ocdoobli.adjustmentshistory'));
            return;
        }
    }

      onGeneratePayplnClick = () => {

        if (this.offdedModel.deductionType) {
            this.dialogService.openLinkDialog('/OCUPAYPL', this.offdedModel, 80).subscribe(result => {

            });
        } else {
            this.show(this.translateService.translate('generate paypln fail'));
            return;
        }

    }

    ocdoobliexecuteQuery() {
        this.offdedModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        const serviceObj = this.ocdoobliFactory.offDedExecuteQuery(this.offdedModel);
        serviceObj.subscribe(data => {
            if (data === 0) {
                this.offdedData = [];
                this.offbncData = [];
                this.offdrData=[];
                this.writeOffDisable = true;
                this.offbenInsertFlag = false;
                this.offdrInsertFlag = false;
            } else {
                this.writeOffDisable = false;
                data.forEach(element => {
                    if (element.maxTotalAmount && Number(element.maxTotalAmount) !== 0) {
                        element.maxTotalAmount = Number(element.maxTotalAmount).toFixed(2);
                    } else {
                        element.maxTotalAmount = null;
                    }
                    if (element.maxMonthlyAmount && Number(element.maxMonthlyAmount) != null) {
                        element.maxMonthlyAmount = Number(element.maxMonthlyAmount).toFixed(2);
                    } else {
                        element.maxMonthlyAmount = null;
                    }
                    if (element.uniqueobligationprofile === 'Y') {
                        element.uniqueobligationprofile = true;
                    } else {
                        element.uniqueobligationprofile = false;
                    }
                    if (element.cgnbtMaxMonthlyAmount === 'Y') {
                        element.cgnbtMaxMonthlyAmount = true;
                    } else {
                        element.cgnbtMaxMonthlyAmount = false;
                    }
                });
                this.offdedData = data;
                this.offbenInsertFlag = true;
                this.offdrInsertFlag = true;
                this.tableIndex = 0;
                this.btnSave = false;
            }
        });
    }
    offbncExecuteQuery(index?) {
        const offbncResult = this.ocdoobliFactory.offBncExecuteQuery(this.offbncModel);
        offbncResult.subscribe(offbncResultList => {
            if (offbncResultList === 0) {
                this.offbncData = [];
            } else {
                offbncResultList.forEach(element => {
                    element['cgnbtMaxMonthlyAmount'] = this.offdedModel.cgnbtMaxMonthlyAmount;
                    element['maxTotalAmount'] = this.offdedModel.maxTotalAmount;
                    element['maxMonthlyAmount'] = this.offdedModel.maxMonthlyAmount;
                    element['personId2'] = this.launchDots;
                    element['corporateId2'] = this.launchDots;
                    if (element.amount != null) {
                        element.amount = Number(element.amount).toFixed(2);
                    }
                    if (element.dspPercent != null) {
                        element.dspPercent = Number(element.dspPercent).toFixed(2);
                    }
                    if (this.offdedModel.maxMonthlyAmount) {
                        element.monthlyamount = element.amount;

                    } else if (this.offdedModel.maxTotalAmount) {
                        element.amount = element.amount;

                    }
                    if (this.offdedModel.cgnbtMaxMonthlyAmount) {
                        element.amount = element.amount;
                    } else {
                        if (!element.monthlyAmount) {
                            element.monthlyAmount = element.amount;
                        }
                        element.amount = element.monthlyAmount;
                    }
                    if (element.unknownBenId) {
                        element.cgnbtUnknownBenId = 'Y';
                    } else {
                        element.cgnbtUnknownBenId = null;
                    }
                    if (element.cgnbtPercent === 'Y') {
                        element.cgnbtPercent = true;
                    } else {
                        element.cgnbtPercent = false;
                    }
                });
                this.offbncData = offbncResultList;
                this.offbncModel = offbncResultList[0];
                if (index || index === 0) {
                    this.offdedData[index]['child'] = this.offbncData;
                }
                this.tablebncIndex = 0;
            }
        });
    }
    personBtnLaunchClick = (event) => {
        const index = this.offbncData.indexOf(event);
        this.dialogService.openLinkDialog('/osipserdialog', null, 70).subscribe(result => {
            this.bncGrid.setColumnData('personId', index, result.personId);
            this.bncGrid.setColumnData('cgnbtPersonId', index, result.lastName + ',  ' + result.firstName);
            this.bncGrid.setColumnData('corporateId', index, null);
            this.bncGrid.setColumnData('corporateId', index, null);


        });

    }

    corporateBtnLaunchClick = (event) => {
        const index = this.offbncData.indexOf(event);
        this.dialogService.openLinkDialog('/OTUCPAYE', null, 70).subscribe(result => {
            this.bncGrid.setColumnData('corporateId', index, result.corporateId);
            this.bncGrid.setColumnData('corporateName', index, result.corpName);
            this.bncGrid.setColumnData('personId', index, null);
            this.bncGrid.setColumnData('cgnbtPersonId', index, null);


        });

    }
    isCountEqual(list: any[]) {
        const is = { valid: true };
        if (this.offdedModel.cgnbtMaxMonthlyAmount === 'Y') {
            is.valid = true;
        } else if (list && Array.isArray(list)) {
            list.forEach(ele => {
                if (is.valid === true) {
                    if (ele.maxTotalAmount || ele.maxMonthlyAmount) {
                        if (ele.maxMonthlyAmount) {
                            const maxMonthlyAmount = ele.maxMonthlyAmount;
                            if (ele.child && Array.isArray(ele.child) && ele.child.length > 0) {
                                const totAmt = ele.child.map(mval => mval.amount).reduce((pre, post) => {
                                    pre = pre ? pre : 0;
                                    post = post ? post : 0;
                                    return Number(pre) + Number(post);
                                });

                                if (Number(maxMonthlyAmount) !== Number(totAmt)) {
                                    is.valid = false;
                                    return;
                                }
                            } else if (maxMonthlyAmount && !ele.child) {
                                is.valid = false;
                                return;
                            }
                            return is.valid;
                        }
                        const maxTotalAmount = ele.maxTotalAmount;
                        if (ele.child && Array.isArray(ele.child) && ele.child.length > 0) {
                            const totAmt = ele.child.map(mval => mval.amount).reduce((pre, post) => {
                                pre = pre ? pre : 0;
                                post = post ? post : 0;
                                return Number(pre) + Number(post);
                            });

                            if (Number(maxTotalAmount) !== Number(totAmt)) {
                                is.valid = false;
                                return;
                            }
                        } else if (maxTotalAmount && !ele.child) {
                            is.valid = false;
                            return;
                        }
                    }
                }
            });
        }
        return is.valid;
    }

    Save() {
        this.lastSave = 0;
        const csldDEvent = { added: [], updated: [], removed: [] };
        if (this.grid) {
            const added = [];
            this.grid.addedMap.forEach((value, keys) => { added.push(value); });
            const removed = [];
            this.grid.removedMap.forEach((value, keys) => { removed.push(value); });
            const updated = [];
            this.grid.updatedMap.forEach((value, keys) => { updated.push(value); });
            if (!this.ocdoobliRecordValidation(added, 'I') || !this.ocdoobliRecordValidation(updated, 'U')) {
                return;
            }
            csldDEvent.added = JSON.parse(JSON.stringify(added));
            csldDEvent.updated = JSON.parse(JSON.stringify(updated));
            csldDEvent.removed = JSON.parse(JSON.stringify(removed));
            this.offdedModel.commitBean = new OffenderDeductions();


        }
        const csldDEventBen = { added: [], updated: [], removed: [] };
        if (this.bncGrid) {
            const added = [];
            this.bncGrid.addedMap.forEach((value, keys) => { added.push(value); });
            const removed = [];
            this.bncGrid.removedMap.forEach((value, keys) => { removed.push(value); });
            const updated = [];
            this.bncGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
            if (!this.offdedSelected.offenderDeductionId) {
                if (!this.ocdoobliRecordBncValidation(this.offbncData, 'U')) {
                    return;
                }
                // csldDEventBen.added = JSON.parse(JSON.stringify(this.offbncData));
            } else {
                if (!this.ocdoobliRecordBncValidation(added, 'I') || !this.ocdoobliRecordBncValidation(updated, 'U')) {
                    return;
                }
               if (!this.ocdoobliRecordBncValidation(this.offbncData, 'R')) {
                    return;
                }
                csldDEventBen.added = JSON.parse(JSON.stringify(added));
                csldDEventBen.updated = JSON.parse(JSON.stringify(updated));
                csldDEventBen.removed = JSON.parse(JSON.stringify(removed));
            }
            if (this.offbncModel && this.offbncModel.commitBean) {
                this.offbncModel.commitBean = new OffenderBeneficiaries();
            }

        }
        const csldDEventDr = { added: [], updated: [], removed: [] };
        if (this.drGrid) {
            const added = [];
            this.drGrid.addedMap.forEach((value, keys) => { added.push(value); });
            const removed = [];
            this.drGrid.removedMap.forEach((value, keys) => { removed.push(value); });
            const updated = [];
            this.drGrid.updatedMap.forEach((value, keys) => { updated.push(value); });
            if (!this.offdedSelected.offenderDeductionId) {
                if (!this.ocdoobliRecordDrValidation(this.offdrData, 'U')) {
                    return;
                }
                // csldDEventDr.added = JSON.parse(JSON.stringify(this.offdrData));
            } else {
            if (!this.ocdoobliRecordDrValidation(added, 'I') || !this.ocdoobliRecordDrValidation(updated, 'U')) {
                return;
            }

            csldDEventDr.added = JSON.parse(JSON.stringify(added));
            csldDEventDr.updated = JSON.parse(JSON.stringify(updated));
            csldDEventDr.removed = JSON.parse(JSON.stringify(removed));
        }
            if (this.offdrModel && this.offdrModel.commitBean) {
                this.offdrModel.commitBean = new OffenderDeductionReceipts();
            }
        }
        if (csldDEvent.added.length > 0 || csldDEvent.updated.length > 0 || csldDEvent.removed.length > 0) {
            this.lastSave++;
            this.ocdoobliSaveoffDedForm(csldDEvent);
        }

        if (csldDEventBen.added.length > 0 || csldDEventBen.updated.length > 0 || csldDEventBen.removed.length > 0) {
            this.lastSave++;
            this.ocdoobliSaveoffbncForm(csldDEventBen);
        }

        if (csldDEventDr.added.length > 0 || csldDEventDr.updated.length > 0 || csldDEventDr.removed.length > 0) {
            this.lastSave++;
            this.ocdoobliSaveoffDrForm(csldDEventDr);
        }

    }
    ocdoobliRecordValidation(list: any[], from?) {
        const is = { valid: true, totError: false };
        if (list && Array.isArray(list)) {
            if (list.length > 0) {
                is.totError = !this.isCountEqual(list);
            }
            list.forEach(data => {
                if (is.valid) {
                    if (!data.deductionPriority) {
                        this.show(this.translateService.translate('ocdoobli.odpmustbe'));
                        is.valid = false;
                        return;
                    }
                    if (!data.deductionType) {
                        this.show(this.translateService.translate('ocdoobli.codemustbe'));
                        is.valid = false;
                        return;
                    }
                    if (!data.informationNumber) {
                        this.show(this.translateService.translate('ocdoobli.infomustbe'));
                        is.valid = false;
                        return;
                    }
                    if (!data.deductionStatus) {
                        this.show(this.translateService.translate('common.statusmustbeentered'));
                        is.valid = false;
                        return;

                    }
                    if (!data.effectiveDate) {
                        this.show('common.effdatemstbeentr');
                        is.valid = false;
                        return;
                    }
                    if (!(Number(data.deductionPriority) >= -99 &&
                        Number(data.deductionPriority) <= 99)) {
                        this.show('otdoallo.oaprange');
                        is.valid = false;
                        return;
                    }
                    if (is.totError && from === 'U') {
                        this.show(this.translateService.translate('ocdoobli.pleaserequerythededuction'));
                        is.valid = false;
                        return;
                    }
                }
            });
        }
        return is.valid;
    }
    ocdoobliRecordBncValidation(list: any[], from?, isInsert?) {
        const is = { validBnc: true, totError: false };

        if (list && Array.isArray(list)) {
            if (this.offdedModel.cgnbtMaxMonthlyAmount === 'Y' || this.offdedModel.cgnbtMaxMonthlyAmount) {
                is.totError = false;
            } else
                if (this.offbncData.length > 0) {
                    const totalAmt = this.offbncData[0]['maxTotalAmount'] ?
                        this.offbncData[0]['maxTotalAmount'] : this.offbncData[0]['maxMonthlyAmount'];
                    const totAmt = this.offbncData.map(mval => mval.amount).reduce((pre, post) => {
                        pre = pre ? pre : 0;
                        post = post ? post : 0;
                        return Number(pre) + Number(post);
                    });
                    if (Number(totalAmt) !== Number(totAmt)) {
                        is.totError = true;
                    }
                } else if (!this.offdedSelected.cgnbtMaxMonthlyAmount && from === 'R') {
                    is.totError = true;
                }
            list.forEach(data => {
                if (!data.priority && from !== 'R') {
                    this.show(this.translateService.translate('ocdoobli.primustbe'));
                    is.validBnc = false;
                    return;
                }
                if (!data.amount && from !== 'R') {
                    this.show(this.translateService.translate('ocdoobli.amountmust'));
                    is.validBnc = false;
                    return;
                }
                if (!data.personId && !data.corporateId &&
                    !data.cgnbtUnknownBenId && from !== 'R') {
                    this.show(this.translateService.translate('ocdoobli.eitherperson'), 'warn');
                    is.validBnc = false;
                    return;
                }
                if (is.totError && !data.cgnbtMaxMonthlyAmount && !isInsert) {
                    this.show('ocdoobli.pleaserequerythededuction');
                    is.validBnc = false;
                    return;
                }

            });
            if (is.totError  && from === 'R') {
                this.show('ocdoobli.pleaserequerythededuction');
                is.validBnc = false;
            }

        }
        return is.validBnc;
    }

    ocdoobliRecordDrValidation(list: any[], from?) {
        const is = { validDr: true };
        if (list && Array.isArray(list)) {
            list.forEach(data => {
                if (data.isEmpty) {
                    is.validDr = false;
                    return;
                }
                if (!data.receiptTxnType) {
                    this.show(this.translateService.translate('ocdoobli.typemustbe'));
                    is.validDr = false;
                    return;

                }
                if (this.isNull(data.flatRate) && this.isNull(data.receiptPercentage) && data.minimumTrustBalanceFlag !== 'Y') {
                    this.show(this.translateService.translate('ocdoobli.eitherreceipt'));
                    is.validDr = false;
                    return;

                }
                if (this.isNull(data.receiptPercentage) && this.isNull(data.flatRate) && data.minimumTrustBalanceFlag !== 'Y')  {
                    this.show('ocdoobli.onlypercentageorflat');
                    is.validDr = false;
                    return;
                }
            });
        }
        return is.validDr;
    }
    /**
    *  This function will be executed when commit event is
    * fired
    */
    ocdoobliSaveoffDedForm(event) {
        // TODOdeclare commit bean and add insert list to that object.

        this.offdedInsertList = event.added;
        this.offdedUpdateList = event.updated;
        this.offdedDeleteList = event.removed;
        const is = { totError: false };
        if (event.updated && event.updated.length > 0) {
            is.totError = !this.isCountEqual(event.updated);
        }
        this.offdedCommitModel.insertList = [];
        this.offdedCommitModel.updateList = [];
        this.offdedCommitModel.deleteList = [];
        if (this.offdedInsertList.length > 0) {
            for (let i = 0; i < this.offdedInsertList.length; i++) {
                this.offdedInsertList[i].modifyDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                this.offdedInsertList[i].effectiveDate = DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0));
                this.offdedInsertList[i].deductionPercentage = null;
                this.offdedInsertList[i].processPriorityNumber = 99;
                if (this.fifoFlag) {
                    this.offdedInsertList[i].fifoFlag = this.fifoFlag;
                } else {
                    this.offdedInsertList[i].fifoFlag = '0';
                }
                this.offdedInsertList[i].deductionAmount = 0;
                this.offdedInsertList[i].caseloadId = this.sessionManager.currentCaseLoad;
                this.offdedInsertList[i].caseloadType = this.sessionManager.currentCaseLoadType;
                this.offdedInsertList[i].offenderId = this.vHeaderBlockModel.rootOffenderId;
                this.offdedInsertList[i].createDateTime = DateFormat.getDate();
            }
            this.offdedCommitModel.insertList = this.offdedInsertList;
        }
        if (this.offdedUpdateList.length > 0) {
            this.offdedCommitModel.updateList = this.offdedUpdateList;
        }
        if (this.offdedDeleteList.length > 0) {
            this.offdedDeleteList.forEach(element => {
                element.caseloadType = this.sessionManager.currentCaseLoadType;
            });
            this.offdedCommitModel.deleteList = this.offdedDeleteList;
        }
        const offbncSaveData = this.ocdoobliFactory.offDedCommit(this.offdedCommitModel);
        offbncSaveData.subscribe(data => {
            if (data === 1) {
                this.lastSave--;
                if (this.lastSave === 0) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                }
                this.offdrExecuteQuery();
                this.ocdoobliexecuteQuery();
                this.offbncExecuteQuery();
                return;
            }
            if(data===10){
                this.show('ocdoobli.rowalreadyexists');
                return;
            }

            if (data === 5) {
                this.show(this.translateService.translate('ocdoobli.totalmaxpayment'));
                return;
            }
            if (data === 5) {
                this.show(this.translateService.translate('ocdoobli.recursivecannot'));
                return;
            }
            if (data === 101) {
                this.show(this.translateService.translate('ocdoobli.onlyoneoftotal'));
                return;
            }
            if (data === 102) {
                this.show(this.translateService.translate('ocdoobli.othererrorin'));
                return;
            }
            if (data === 111) {
                this.show(this.translateService.translate('ocdoobli.pleasegotoplan'));
                return;
            }
            if (data === 555) {
                this.show(this.translateService.translate('ocdoobli.pleaserequerythededuction'));
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
                return;
            }
        });
    }

    /**
     *  This function will be executed when commit event is
    * fired
    */
    ocdoobliSaveoffbncForm(event) {
        // TODOdeclare commit bean and add insert list to that object.
        this.offbncInsertList = event.added;
        this.offbncUpdatetList = event.updated;
        this.offbncDeleteList = event.removed;
        this.offbncCommitModel.insertList = [];
        this.offbncCommitModel.updateList = [];
        this.offbncCommitModel.deleteList = [];

        // if (this.corporateidExists) {
        //     this.corporateidExists = false;
        //     this.show(this.translateService.translate('ocdoobli.thiscorporatealready'));
        //     return;
        // }
        if (this.offbncInsertList.length > 0) {

            for (let i = 0; i < this.offbncInsertList.length; i++) {
                if (!this.offbncInsertList[i].cgnbtUnknownBenId) {
                    this.offbncInsertList[i].cgnbtUnknownBenId = 'N';

                }
                this.offbncInsertList[i].offenderId = this.vHeaderBlockModel.rootOffenderId;
                this.offbncInsertList[i].offenderDeductionId = this.offdedModel.offenderDeductionId;
            }

            this.offbncCommitModel.insertList = this.offbncInsertList;
        }
        if (this.offbncUpdatetList.length > 0) {

            this.offbncCommitModel.updateList = this.offbncUpdatetList;
        }
        if (this.offbncDeleteList.length > 0) {
            for (let i = 0; i < this.offbncDeleteList.length; i++) {
            }
            this.offbncCommitModel.deleteList = this.offbncDeleteList;
        }
        const offbncSaveData = this.ocdoobliFactory.offBncCommit(this.offbncCommitModel);
        offbncSaveData.subscribe(data => {
            if (String(data) === '1') {
                this.lastSave--;
                if (this.lastSave === 0) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                }
                this.offbncExecuteQuery();
            } else if (String(data).includes('OFF_BENE_UK1')) {
                this.show('ocdoobli.rowalreadyforbeneuk');
            } else if (String(data).includes('?')) {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }

    onGridDrInsert = () => {
        // if (!this.offdedModel.offenderDeductionId) {
        //     this.show(this.translateService.translate('common.youcannotcreatethisrecord'));
        //     return null;

        // }
        const added = [];
        const updated = [];
        this.drGrid.addedMap.forEach(ele => {
            added.push(ele);
        });
        this.drGrid.updatedMap.forEach(ele => {
            updated.push(ele);
        });
        const mData = JSON.parse(JSON.stringify(updated));
        mData.push(...added);
        if (!this.ocdoobliRecordDrValidation(mData, 'I')) {
            return null;
        }
        return { receiptTxnType: '', receiptPercentage: '', flatRate: '' };

    }
    isNull = (value) => {
        return !(!!value || String(value) === '0');
    }

    ocdoobliSaveoffDrForm(event) {
        this.offdrInsertList = event.added;
        this.offdrUpdatetList = event.updated;
        this.offdrDeleteList = event.removed;
        this.offDrCommitModel.insertList = [];
        this.offDrCommitModel.updateList = [];
        this.offDrCommitModel.deleteList = [];
        if (this.flag === 'Y') {
            this.show(this.msgsShow);
            return;

        }
        if (this.offdrInsertList.length > 0) {
            for (let i = 0; i < this.offdrInsertList.length; i++) {

                this.offdrInsertList[i].offenderId = this.vHeaderBlockModel.rootOffenderId;
                this.offdrInsertList[i].offenderDeductionId = this.offdedModel.offenderDeductionId;
            }

            this.offDrCommitModel.insertList = this.offdrInsertList;
        }
        if (this.offdrUpdatetList.length > 0) {

            this.offDrCommitModel.updateList = this.offdrUpdatetList;
        }
        if (this.offdrDeleteList.length > 0) {
            this.offDrCommitModel.deleteList = this.offdrDeleteList;
        }
        const offbncSaveData = this.ocdoobliFactory.offDrCommit(this.offDrCommitModel);
        offbncSaveData.subscribe(data => {
            if (String(data) === '1') {
                this.lastSave--;
                if (this.lastSave === 0) {
                    this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                }
                this.offdrExecuteQuery();
            } else if (String(data).includes('OFFENDER_DEDUCTION_RECEIPTS_PK')) {
                this.show('ocdoobli.rowalreadyforreceiptspk');
            } else if (String(data).includes('?')) {
                this.show('common.addupdateremoverecordfailed', 'error');
            }
        });
    }
    offdrExecuteQuery() {
        this.offdrModel.offenderId = this.vHeaderBlockModel.rootOffenderId;
        const offdrResult = this.ocdoobliFactory.offDrExecuteQuery(this.offdrModel);
        offdrResult.subscribe(offdrResultList => {
            if (offdrResultList.length === 0) {
                this.offdrData = [];
            } else {
                this.offdrData = offdrResultList;
                this.offdrModel = offdrResultList[0];
                this.tablededucIndex = 0;
            }
        });
    }
    getDefaultDeductions() {
        const bean = {
            'caseloadId': this.sessionManager.currentCaseLoad,
            'deductionType': this.offdedSelected.deductionType
          };
          let totalAmt = 0;
          if(this.offdedSelected.createDateTime){
              totalAmt = (this.offdedSelected.maxTotalAmount ? this.offdedSelected.maxTotalAmount : 0) +  
              (this.offdedSelected.maxMonthlyAmount ? this.offdedSelected.maxMonthlyAmount : 0) +
               (this.offdedSelected.maxRecursiveAmount ? this.offdedSelected.maxRecursiveAmount : 0);
          } else {
            totalAmt =this.offdedSelected.originalAmount;
          }
        this.otmfoproFactory.csldDbenExecuteQuery(bean).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(ele => {
                    ele.receiptPercentage = ele.percentage;
                    ele.cgnbtPersonId = ele.personId;
                    ele.personId=ele.personId;
                    ele.launchbutton = this.launchDots;
                    ele.cgnbtPersonId=ele.dspLastName+ele.dspFirstName;
                    ele.corporateName = ele.dspCorporateName;
                    ele.dspPercent = ele.percent;
                    ele.personId2 = this.launchDots;
                    ele.corporateId2 = this.launchDots;
                    if (totalAmt !== 0 && ele.coCreditWhenIndigentFlag === 'Y') {
                        ele.amount = totalAmt / data.length;
                    } else {
                        if (ele.coCreditWhenIndigentFlag !== 'Y') {
                            if (totalAmt === 0) {
                                ele.amount = 999999999.99;
                            } else {
                                if (ele.percent === 100) {
                                    ele.amount = ele.amount;
                                } else {
                                    ele.amount = totalAmt * (ele.percent / 100);
                                }
                            }
                        }
                    }
                    ele.amount = ele.amount.toFixed(2);
                    ele.dspPercent = ele.dspPercent.toFixed(2);
                    ele['cgnbtMaxMonthlyAmount'] = this.offdedSelected.cgnbtMaxMonthlyAmount;
                    ele['maxTotalAmount'] = this.offdedSelected.maxTotalAmount;
                    ele['maxMonthlyAmount'] = this.offdedSelected.maxMonthlyAmount;
                });
                this.offbncData = data;
                this.tablebncIndex = 0;
            }   else {
                this.percent = 100;
                // this.offbncData = [];
                this.bncGrid.setColumnData('cgnbtUnknownBenId', 0, true);
                this.bncGrid.setColumnData('priority', 0, 1);
                if (this.offdedSelected.maxTotalAmount && !this.offdedSelected.maxMonthlyAmount) {
                    this.bncGrid.setColumnData('amount', 0, this.offdedSelected.maxTotalAmount);
                } else if (this.offdedSelected.maxMonthlyAmount && !this.offdedSelected.maxTotalAmount) {
                    this.bncGrid.setColumnData('amount', 0, this.offdedSelected.maxMonthlyAmount);
                } else {
                    this.bncGrid.setColumnData('amount', 0, 999999000.99);
                }
                this.bncGrid.setColumnData('dspPercent', 0, this.percent.toFixed(2));
                this.bncGrid.setColumnData('personId2', 0, this.launchDots);
                this.bncGrid.setColumnData('corporateId2', 0, this.launchDots);
            }


            this.offdedData[this.obligationIndex]['child'] = this.offbncData;
            this.offdedData[this.obligationIndex].offenderBeneficiaries = this.offbncData;
            this.offbenInsertFlag = true;
        });
        this.otmfoproFactory.csldDdExecuteQuery(bean).subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(ele => {
                    ele.receiptPercentage = ele.percentage;
                });
                this.offdrData = data;
                this.tablededucIndex = 0;
            } else {
                this.offdrData = [];
            }
            this.offdedData[this.obligationIndex].offenderDeductionReceipts = this.offdrData;
            this.offdrInsertFlag = true;
        });
    }
    onbenefiClick(event) {
        if (event) {
            if (event.isEmpty) {
                this.getDefaultDeductions();
                return;
            }
            this.offbncSelected = event;
        } else {
            this.offbncSelected = new OffenderBeneficiaries();
        }
    }
    onddrClick(event) {
        if (event) {
            if (event.isEmpty) {
                this.getDefaultDeductions();
                return;
            }
            this.offdrselect = event;
        } else {
            this.offdrselect = new OffenderDeductionReceipts();
        }
    }
    get affDisableFlag() {
        if (this.vHeaderBlockModel && (this.grid.addedMap.size > 0 || this.grid.updatedMap.size > 0 || this.grid.removedMap.size > 0 ||
            this.bncGrid.addedMap.size > 0 || this.bncGrid.updatedMap.size > 0 || this.bncGrid.removedMap.size > 0 ||
            this.drGrid.addedMap.size > 0 || this.drGrid.updatedMap.size > 0 || this.drGrid.removedMap.size > 0)) {
            return false;
        }
        return true;
    }
    displaybtn = (data, index) => {
        // if (data.maintainceFlag === 'Y') {
        //     return true;
        // }
        return false;
    }
    launchButtonEnabled = (data: any, index: number, field: string) => {
        // if (data.maintainceFlag === 'Y') {
        //     return false;
        // }
        return true;
    }
    dedClear = () => {
        const updatedData = this.offbncData.filter(ele => ele['updated'] === 'Y', []);
        if (updatedData && updatedData.length > 0) {
            this.bncGrid.clearRecords(this.bncGrid.gridOptions);
        }
        return true;

    }
}
