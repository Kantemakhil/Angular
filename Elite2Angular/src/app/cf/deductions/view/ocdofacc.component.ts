
import { OffenderDeductionsCommitBean } from '@inmate/trust/deductions/beans/OffenderDeductionsCommitBean';
import {
    Component, OnInit, Injectable, Pipe, PipeTransform, Directive,
    ElementRef,
    ViewChild
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@common/translate/translate.service';
import { OtdocfeeService } from '../service/otdocfee.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { OcdofaccService } from '../service/ocdofacc.service';
import { FeeAccountProfiles } from '../beans/FeeAccountProfiles';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { OffenderFeeBenficieries } from '../beans/OffenderFeeBenficieries';
import { CaseloadDedBeneficiaries } from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiaries';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { CaseloadDeductionDetails } from '@inmate/trust/checks/beans/CaseloadDeductionDetails';
import { CaseloadDeductionDetailsCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean';
import { CaseloadDedBeneficiariesCommitBean } from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiariesCommitBean';
import { FeeAccountProfilesCommitBean } from '../beans/FeeAccountProfilesCommitBean';
import { OcmofaccCommitBean } from '../beans/OcmofaccCommitBean';
import { VTrustHeader } from '@inmate/beans/VTrustHeader';
import { SystemProfiles } from '@common/beans/SystemProfiles';
import { OffenderBookingAgyLocs } from '@cmintakeclosureaddremoveoffices/OffenderBookingAgyLocs';
import { OcdsupstService } from '@cm/intakeclosure/service/ocdsupst.service';


@Component({
    selector: 'app-ocdofacc',
    templateUrl: './ocdofacc.component.html'
})

export class OcdofaccComponent implements OnInit {
    @ViewChild('offdedGrid', { static: true }) offdedGrid: any;
    @ViewChild('cslddbenGrid', { static: true }) cslddbenGrid: any;
    @ViewChild('csldddGrid', { static: true }) csldddGrid: any;
    @ViewChild('cslddbenGridPrior', { static: true }) cslddbenGridPrior: any;
    
    csldddPrevGrid
    tableIndex: number;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offdedModel: FeeAccountProfiles = new FeeAccountProfiles();
    childPopulatingModel: FeeAccountProfiles = new FeeAccountProfiles();
    childPopulatingModelPrev: FeeAccountProfiles = new FeeAccountProfiles();
    offdedData: FeeAccountProfiles[] = [];
    offdedInsertList: FeeAccountProfiles[] = [];
    offdedUpdateList: FeeAccountProfiles[] = [];
    offdedDeleteList: FeeAccountProfiles[] = [];
    offdedCommitBean: FeeAccountProfilesCommitBean = new FeeAccountProfilesCommitBean();
    deductReceiptTypeData: CaseloadDeductionProfiles[] = [];
    cslddbenModel: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    cslddbenData: CaseloadDedBeneficiaries[] = [];
    cslddbenInsertList: CaseloadDedBeneficiaries[] = [];
    cslddbenInsertListTemp: CaseloadDedBeneficiaries[] = [];
    cslddbenDeleteList: CaseloadDedBeneficiaries[] = [];
    cslddbenUpdateList: CaseloadDedBeneficiaries[] = [];
    cslddbenCommitBean: CaseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
    cslddbenDataTemp: any = [];
    csldddData: CaseloadDeductionDetails[] = [];
    csldddInsertList: CaseloadDeductionDetails[] = [];
    csldddInsertListTemp: CaseloadDeductionDetails[] = [];
    csldddDeleteList: CaseloadDeductionDetails[] = [];
    csldddUpdateList: CaseloadDeductionDetails[] = [];
    csldddCommitBean: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
    cslddbenPriorData: CaseloadDedBeneficiaries[] = [];
    cslddbenPriorModel: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    ocmofaccCommitBean: OcmofaccCommitBean = new OcmofaccCommitBean();
    cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    currentFeeAccountProfiles: any[];
    offDedColumnDef: any[];
    offDedTempColumnDef: any[];
    cslddbenColumnDef: any[];
    cslddbenTempColumnDef: any[];
    csldddColumntDef: any[];
    csldddTempColumntDef: any[];
    currentBenficiariesColumnDef: any[];
    currentBenficiariesPriorColumnDef: any[];
    deductionType: any;
    offdedIndex = 0;
    caseloadId: string;
    caseloadtype: string;
    cslddpIndex: number;
    cslddpData: CaseloadDeductionProfiles[] = [];
    cslddpModelData: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpModelDup: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddbenSelect: number;
    csldddModel: CaseloadDeductionDetails = new CaseloadDeductionDetails();
    csldddSelect: number;
    offdedEnableDelete: boolean;
    cslddbenEnableInsert: boolean;
    cslddbenEnableDelete: boolean;
    csldddEnableDelete: boolean;
    csldddEnableInsert: boolean;
    offdedDeleteListTemp: FeeAccountProfiles[] = [];
    vHeaderBlockModel: VTrustHeader = new VTrustHeader();
    serviceDate: Date;
    comment: string;
    systemProfileDeduct: string;
    supvCount: number;
    longSupvDate: Date;
    supvPeriodStartDate: Date;
    offenderFeeId: number;
    insertFeeAccountGrid: boolean;
    offdedDataPrev: FeeAccountProfiles[] = [];
    tableIndexPrev: number;
    offdedModelTemp: FeeAccountProfiles = new FeeAccountProfiles();
    cslddbenModelPrev: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    cslddbenDataPrev: CaseloadDedBeneficiaries[] = [];
    csldddDataPrev: CaseloadDeductionDetails[] = [];
    tableIndexDed: number;
    csldddModelPrev: CaseloadDeductionDetails = new CaseloadDeductionDetails();
    tableIndexben: number;
    tableIndexBen: number;
    maxDay: number;
    bnDisable: boolean;
    systemProfModel: SystemProfiles = new SystemProfiles();
    systemProfAutoModel: SystemProfiles = new SystemProfiles();
    systemProfModelLongSupv: SystemProfiles = new SystemProfiles();
    agyLocIdLovData: string;
    longSupvDateTemp: Date;
    longSupvDatePrev: Date;

    globalCaseloadId: string;
    longestSupvReadOnly: boolean;
    longSupvModelRetrive: FeeAccountProfiles = new FeeAccountProfiles();
    longSupvModelUpdate: FeeAccountProfiles = new FeeAccountProfiles();
    systemProfileDeductAuto: string;
    offagyData: OffenderBookingAgyLocs[] = [];
    offagyModel: OffenderBookingAgyLocs = new OffenderBookingAgyLocs();
    caseloadCount: number;
    offenderEventDate: any;

    //supHtyModel: SupervisionStatusHsty = new SupervisionStatusHsty();
   
    constructor(public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService,
        private ocdofaccFactory: OcdofaccService, private ocdsupstFactory: OcdsupstService,
        ) {
        this.offDedColumnDef = [];
        this.offDedTempColumnDef = [];
        this.cslddbenColumnDef = [];
        this.cslddbenTempColumnDef = [];
        this.csldddColumntDef = [];
        this.csldddTempColumntDef = [];

        this.globalCaseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadtype = this.sessionManager.currentCaseLoadType;
    }
    ngOnInit() {
        this.getMaxDay();
        this.offdedEnableDelete = false;
        this.cslddbenEnableInsert = false;
        this.cslddbenEnableDelete = false;
        this.csldddEnableDelete = false;
        this.csldddEnableInsert = false;
        this.insertFeeAccountGrid = false;
        this.bnDisable = true;
         this.longestSupvReadOnly = true;       
        const receiptTxnType = `ocdofacc/reciptTypeRecordGroup?caseloadType=${this.caseloadtype}`;
        this.agyLocIdLovData = `ocdofacc/alAgyLocIdRgRecordGroup`;
        const feeActTypeLink = `ocdofacc/feeActTypeRecordGroup?caseloadId=${this.globalCaseloadId}`;
      
       
        this.offDedColumnDef = [
            // {
            //     fieldName: this.translateService.translate('ocdofacc.longestsupervisionexpirydate'), field: 'longestSupvExpiryDate',
            //     width: 150, datatype: 'date', editable: false,
            // },
            {
                fieldName: this.translateService.translate('Caseload'), field: 'caseloadId',
                cellEditable: this.canCellEdit, required: true,
                datatype: 'lov', width: 150, link: this.agyLocIdLovData
            },
            {
                fieldName: this.translateService.translate('ocdofacc.feeId'), field: 'offenderFeeId', editable: false, width: 150,
                datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('ocdofacc.odp'), field: 'odp', editable: true, width: 150,
                required: true, datatype: 'number', whole: true, cellEditable: this.canCellOdpEdit,
            },
            {
                fieldName: this.translateService.translate('ocdofacc.feeCode'), field: 'feeCode', required: true,
                cellEditable: this.canCellEdit,  link: 'ocdofacc/feeActTypeRecordGroup?caseloadId=', parentField: 'caseloadId',
                datatype: 'lov', width: 150,
            },
            {
                fieldName: this.translateService.translate('ocdofacc.docket'), field: 'infoNumber', width: 150,
                datatype: 'text',  uppercase: 'false', editable: true, whole: true, maxlength: '15', cellEditable: this.canCellOdpEdit,
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'amount', width: 150, whole: true,rightAlign: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, editable: true, required: true, cellEditable: this.canAmountEdit
            },
            {
                fieldName: this.translateService.translate('common.frequency'), field: 'nbtFrequency', editable: false, width: 150,
                 datatype: 'text', required: true
            },
            {
                fieldName: this.translateService.translate('common.code'), field: 'nbtCode', width: 150,
                 datatype: 'text', editable: false

            },
            {
                fieldName: this.translateService.translate('ocmfapro.billingday'), field: 'dayOfMonth', width: 150,
                datatype: 'number', cellEditable: this.dayOfMonthEdit, whole: true,  maxValue: this.maxDay, minValue: 1
            },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate',
                width: 150, datatype: 'date', required: true, cellEditable: this.canCellEditStartDate,
            },
            {
                fieldName: this.translateService.translate('common.effectivedate'), field: 'effectiveDate',
                editable: true, width: 150, datatype: 'date', cellEditable: this.canCellEditED,
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: true, width: 150, datatype: 'date', cellEditable: this.expiryDateEdit,
            },
            {
                fieldName: this.translateService.translate('common.status'), field: 'feeActStatus',
                editable: true, width: 150, required: true, datatype: 'lov', domain: 'DED_STATUS',cellEditable: this.canstatusEditED
            },
            {
                fieldName: this.translateService.translate('ocdofacc.statuseffectivedate'), field: 'statusEffectiveDate',
                width: 150, datatype: 'date', required: true, editable: false,
            },

            {
                fieldName: this.translateService.translate('ocdofacc.servicedate'), field: 'serviceDate',
                width: 150, datatype: 'date', editable: true, cellEditable: this.canCellOdpEdit,
            },
            {
                fieldName: this.translateService.translate('ocdofacc.comments'), field: 'commentText', width: 150,
                datatype: 'text',  uppercase: 'false', editable: true, maxlength: '240', cellEditable: this.canCellOdpEdit,
            },

            { fieldName: '', field: 'frequencyCode', hide: true },
            { fieldName: '', field: 'frequencyType', hide: true },
            { fieldName: '', field: 'foAlAllOffenderFlag', hide: true },
            { fieldName: '', field: 'nonBillableStatus', hide: true },
            { fieldName: '', field: 'isTriggerEnable', hide: true },
            { fieldName: '', field: 'backBill', hide: true }
            
        ];

        this.cslddbenColumnDef = [
            {
                fieldName: this.translateService.translate('common.personid'), field: 'personId', editable: true,
                datatype: 'number', maxValue: 99999999999,cellEditable: this.canCellEdit, minValue: 0, strictFP: true, whole: true
            },
            {
                fieldName: '', field: 'personId2', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'search', data: 'row', updateField: 'row',
                link: 'osipserdialog', onLaunchClick: this.onPersonClick,isDisable: this.personIdDisable, maxlength: '11'
            },
            { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocmfapro.corporateid'), field: 'corporateId', editable: true,
                datatype: 'number', maxValue: 99999999999,cellEditable: this.canCellEdit, minValue: 0, strictFP: true, whole: true
            },
            {
                fieldName: '', field: 'corporateId2', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'search', data: 'row', updateField: 'row',
                link: 'OTUCPAYE', onLaunchClick: this.onCorporateClick,isDisable: this.corporateIdDisable
            },
            {
                fieldName: this.translateService.translate('ocmfapro.corporatename'), field: 'dspCorporateName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocdofacc.priority'), field: 'priority', editable: true, whole: true,
                width: 150, required: true, datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('ocdofacc.percentage'), field: 'dspPercent', editable: false,
                width: 150, required: true
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'amount', editable: true, width: 150,rightAlign: true,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true, required: true
            },
            { fieldName: '', field: 'personFlag', hide: true },
            { fieldName: '', field: 'corporateFlag', hide: true },
        ];


        this.csldddColumntDef = [
            {
                fieldName: this.translateService.translate('ocdofacc.receipttype'), field: 'receiptTxnType',
                datatype: 'lov', width: 150, link: receiptTxnType, cellEditable: this.recieptGridEditable, required: true

            },
            {
                fieldName: this.translateService.translate('ocdofacc.percentage'), field: 'receiptPercent', editable: true, width: 150,
                datatype: 'number', whole: true, cellEditable: this.recieptGridEditable
            },
            {
                fieldName: this.translateService.translate('ocdofacc.flatrate'), field: 'flatRate', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, whole: true, cellEditable: this.recieptGridEditable
            },
        ];
        this.offDedTempColumnDef = [
            {
                fieldName: this.translateService.translate('ocdofacc.supervisionperiod'), field: 'supervisionPeriod',
                width: 150,  editable: false,
            },
            {
                fieldName: this.translateService.translate('Caseload'), field: 'caseloadId',
                editable: false, required: true,
                datatype: 'lov', width: 150, link: this.agyLocIdLovData
            },
            {
                fieldName: this.translateService.translate('ocdofacc.feeId'), field: 'offenderFeeId', editable: false, width: 150,
                datatype: 'number'
            },
            {
                fieldName: this.translateService.translate('ocdofacc.odp'), field: 'odp', editable: false, width: 150,
                required: true, datatype: 'number', whole: true
            },
            {
                fieldName: this.translateService.translate('ocdofacc.feeCode'), field: 'feeCode', required: true,
                editable: false,
                datatype: 'lov', width: 150,  link: 'ocdofacc/feeActTypeRecordGroup?caseloadId=', parentField: 'caseloadId',
            },
            {
                fieldName: this.translateService.translate('ocdofacc.docket'), field: 'infoNumber', width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, editable: false,
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'amount', width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, editable: false,rightAlign: true,
            },
            {
                fieldName: this.translateService.translate('common.frequency'), field: 'nbtFrequency', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.code'), field: 'nbtCode', width: 150,
                editable: false, datatype: 'text'

            },
            {
                fieldName: this.translateService.translate('ocdofacc.dayOfMonth'), field: 'dayOfMonth', width: 150,
                datatype: 'number', editable: false, whole: true
            },
            {
                fieldName: this.translateService.translate('common.startdate'), field: 'startDate',
                width: 150, datatype: 'date', required: true, editable: false
            },
            {
                fieldName: this.translateService.translate('common.effectivedate'), field: 'effectiveDate',
                width: 150, datatype: 'date', editable: false
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date', cellEditable: this.expriryEdit,
            },
            {
                fieldName: this.translateService.translate('common.status'), field: 'feeActStatus',
                editable: false, width: 150, required: true, datatype: 'lov', domain: 'DED_STATUS'
            },
            {
                fieldName: this.translateService.translate('ocdofacc.statuseffectivedate'), field: 'statusEffectiveDate',
                width: 150, datatype: 'date', required: true, editable: false,
            },

            {
                fieldName: this.translateService.translate('ocdofacc.servicedate'), field: 'serviceDate',
                width: 150, datatype: 'date', editable: false,
            },
            {
                fieldName: this.translateService.translate('ocdofacc.comments'), field: 'commentText', width: 150,
                datatype: 'text', editable: false, whole: true
            },
        ];

        this.cslddbenTempColumnDef = [
            {
                fieldName: this.translateService.translate('common.personid'), field: 'personId', editable: false,
                datatype: 'number',
            },

            { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocmfapro.corporateid'), field: 'corporateId', editable: false,
                datatype: 'number',
            },

            {
                fieldName: this.translateService.translate('ocmfapro.corporatename'), field: 'dspCorporateName', editable: false,
                width: 150
            },
            {
                fieldName: this.translateService.translate('ocdofacc.priority'), field: 'priority', editable: false,
                width: 150,
            },
            {
                fieldName: this.translateService.translate('ocdofacc.percentage'), field: 'dspPercent', editable: false,
                width: 150,
            },
            {
                fieldName: this.translateService.translate('common.amount'), field: 'amount', editable: false, width: 150,
                datatype: 'number', format: '1.2-2',rightAlign: true
            },
        ];

        this.csldddTempColumntDef = [
            {
                fieldName: this.translateService.translate('ocdofacc.receipttype'), field: 'receiptTxnType',
                datatype: 'lov', width: 150, link: receiptTxnType, editable: false, required: true

            },
            {
                fieldName: this.translateService.translate('ocdofacc.percentage'), field: 'receiptPercent', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocdofacc.flatrate'), field: 'flatRate', editable: false, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, whole: true
            },
        ];

        this.sysPflExecuteQuery();
        this.sysPflDedExecuteQuery();
    }


    get childButtonDisable() {
        if (this.offdedModel.createDatetime) {            
              return false;
        }
      
        return true;
  }
  get childButtonDisablePrev() {
    if (this.offdedModelTemp.createDatetime) {            
          return false;
    }
  
    return true;
}
  
    personIdDisable = (data: any, index: number, field: string): boolean => {
        if(data.corporateId ){
            return true;
        }else{
            return false;
        }
    }

    corporateIdDisable = (data: any, index: number, field: string): boolean => {
        if(data.personId ){
            return true;
        }else{
            return false;
        }
    }


    getLongSupvDate() {
        const serviceObj = this.ocdofaccFactory.getLongSupvDate(this.globalCaseloadId).subscribe(data => {
            if (data) {
                this.longSupvDate = data ? data.longSupvDate : undefined;
                this.supvPeriodStartDate = data ? data.supvPeriodStartDate : undefined;
            }
        });
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime && data.feeCode === 'SUPV') {
            return true;
        } else {
            return false;
        }
    }

    canCellOdpEdit = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime) {
            this.caseloadCount = 0;
            if ( this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    

    recieptGridEditable = (data: any, index: number, field: string): boolean => {    
            if (this.systemProfileDeductAuto === 'Y') {
                return true;
            } else {
                return false;
            }
    }

    onFodClear = () => {
        if(this.offdedData.length === 0){
            this.cslddbenData = []; 
            this.csldddData = [];
            this.cslddbenInsertListTemp = [];
            this.csldddInsertListTemp = [];
        } else {
            this.offdedData = [];
            this.cslddbenData = [];
            this.csldddData = [];
            this.cslddbenInsertListTemp = [];
            this.csldddInsertListTemp = [];
            this.offdedExecteQuery();
            this.offdedPrevExecteQuery();
        }
        return true;
    }

    onOffenderChange(offender) {
        if (offender) {
            this.offdedModel = new FeeAccountProfiles();
            this.vHeaderBlockModel = offender;
            this.longestSupvReadOnly = true;
            this.longSupvDate = undefined;
            this.longSupvDateTemp = undefined;
            this.offdedData = [];
            this.cslddbenData = [];
            this.csldddData = [];
            this.insertFeeAccountGrid = false;
            this.cslddbenEnableInsert = false;
            this.csldddEnableInsert = false;
            this.offdedModel = new FeeAccountProfiles();
            this.offdedDataPrev = [];
            this.cslddbenDataPrev = [];
            this.csldddDataPrev = [];
            this.offenderEventDate = undefined;
            this.offdedModelTemp = new FeeAccountProfiles();
            if (this.vHeaderBlockModel && this.vHeaderBlockModel.offenderBookId && this.vHeaderBlockModel.trustAccount) {
                this.offagyExecuteQuery();
                this.sysLongSupPflExecuteQuery();
                this.offdedExecteQuery();
                this.offdedPrevExecteQuery();
                this.getOffenderEventDate();
                this.insertFeeAccountGrid = true;
            }
        } else {
            this.longestSupvReadOnly = true;
            this.longSupvDate = undefined;
            this.longSupvDateTemp = undefined;
            this.offdedData = [];
            this.cslddbenData = [];
            this.csldddData = [];
            this.insertFeeAccountGrid = false;
            this.cslddbenEnableInsert = false;
            this.csldddEnableInsert = false;
            this.offdedModel =new FeeAccountProfiles();
            this.offdedDataPrev = [];
            this.cslddbenDataPrev = [];
            this.csldddDataPrev = [];
        }

    }
    expiryDateEdit = (data: any, index: number, field: string): boolean => {
        if (data.nonBillableStatus === 'Y') {
            return false;
        } else  if (data.createDatetime) {
                this.caseloadCount = 0;
                if ( this.globalCaseloadId === data.caseloadId) {
                    this.caseloadCount = this.caseloadCount + 1;
                } 
                if(this.caseloadCount > 0 && data.nonBillableStatus !== 'Y'){
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }       

    }

    canstatusEditED = (data: any, index: number, field: string): boolean => {
        if (data.nonBillableStatus === 'Y') {
            this.caseloadCount = 0;
            if ( this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
                return true;
            } else {
                return false;
            }
            
        } else if(data.createDatetime && data.feeActStatus === 'C'){
            this.caseloadCount = 0;
            if (this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }
    canAmountEdit = (data: any, index: number, field: string): boolean => {
        if (data.nonBillableStatus === 'Y' && (data.feeActStatus === 'A' || data.feeActStatus === 'P')) {
            return false;
        } else if(data.createDatetime) { 
                this.caseloadCount = 0;
                if (this.globalCaseloadId === data.caseloadId) {
                    this.caseloadCount = this.caseloadCount + 1;
                } 
                if(this.caseloadCount > 0){
                    return true;
                } else {
                    return false;
                }         
        } else{
            return true;
        } 
    }

    canCellEdit = (data: any, index: number, field: string): boolean => {
        if(field === 'startDate' && data.nonBillableStatus === 'Y'){
            return true;
        }
        if (data.createDatetime) {
            return false;
        } else {
            return true;
        }

    }

    canCellEditStartDate = (data: any, index: number, field: string): boolean => {
        if(this.globalCaseloadId === data.caseloadId && data.nonBillableStatus === 'Y' && data.createDatetime){
            return false;
        }
        if(data.createDatetime && data.feeActStatus === 'C'){
            this.caseloadCount = 0;
            if (this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
                return true;
            } else {
                return false;
            } 
        }
        if (data.createDatetime && data.feeActStatus !== 'C') {
            return false;
        } else {
            return true;
        }

    }
    canCellEditED = (data: any, index: number, field: string): boolean => {
        if (data.createDatetime && (data.backBill === 'Y')) {
            this.caseloadCount = 0;
            if (this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
               if(field === 'effectiveDate' && data.overrideCount > 0) {
                 if(data.billCount > 0) {
                    this.show('Update to Effective Date is not permitted as billing has started','warn');
                    return false;
                 } else {
                    this.show('Update to Effective Date is not permitted as active fee override exists','warn');
                    return false;
                 }
               } 
                return true;
            } else {
                
            } 
        } else if (!data.createDatetime && (data.nonBillableStatus == true || data.nonBillableStatus === 'Y') ) {
            this.caseloadCount = 0;
            if (this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
                return true;
            } else {
                return false;
            } 
        } else {
            return false;
        }

    }


    dayOfMonthEdit = (data: any, index: number, field: string) => {
        if (!data.createDatetime && data.frequencyCode === 'MONTHLY') {
            return true;
        } else if(data.createDatetime && data.frequencyCode === 'MONTHLY' && (!data.dayOfMonth || data.dayOfMonth === 0)){
            this.caseloadCount = 0;
            if (this.globalCaseloadId === data.caseloadId) {
                this.caseloadCount = this.caseloadCount + 1;
            } 
            if(this.caseloadCount > 0){
                return true;
            } else {
                return false;
            }                     
        }
        else {
            return false;
        }
    }

    expriryEdit = (data: any, index: number, field: string) => {
        if (!data.expiryDate) {
            return true;
        } else {
            return false;
        }
    }

    offdedInsert = () => {
        if(this.offdedGrid.addedMap.size > 0){
            if(this.cslddbenData.length !== 0 || this.csldddData.length !== 0){
                this.show('Save the fee Account and benficiary, receipt details');
                return;
            }
        }
        return {
            startDate: DateFormat.getDate(), feeActStatus: 'A',caseloadId: this.sessionManager.currentCaseLoad,
            longestSupvExpiryDate: DateFormat.getDate(this.longSupvDate),  statusEffectiveDate : DateFormat.getDate()
        };
    }



    csldddInsert = () => {
        if (!this.csldddvalidations()) {
            return;
        }
        return {};
    }

    cslddbenInsert = () => {
        if (!this.cslddbenValidations()) {
            return;
        }
        const data = {
            personId: null, personId2: '...', dspLastName: null, dspFirstName: null, corporateId: null, corporateId2: '...',
            dspCorporateName: null, priority: null, dspPercent: '100'
        };
        return data;
    }

    oncsldDbenClear = () => {
        if(this.offdedModel && this.offdedModel.offenderFeeId && this.offdedModel.createDatetime){
            this.caseloadFeeDedBenficExecuteQuery();
        } else {
            this.cslddbenExecuteQuery();
        }
        return true;
    }

    getMaxDay() {
        const monthsList: Array<String> = ['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'];
        const currDate = DateFormat.getDate().toString();
        const splitDate = currDate.split(' ');
        const month = splitDate[1];
        const year = Number(splitDate[3]);
        if (monthsList.includes(month)) {
            this.maxDay = 31;
        } else if (month === 'Feb') {
            if (this.isLeapYear(year)) {
                this.maxDay = 29;
            } else {
                this.maxDay = 28;
            }
        } else {
            this.maxDay = 30;
        }
    }

    isLeapYear(year) {
        if ((0 === year % 4) && (0 !== year % 100) || (0 === year % 400)) {
            return true;
        } else {
            return false;
        }
    }

    onPersonClick = (data) => {
        const index = this.cslddbenData.indexOf(data);
        this.perionDialog(data, index);
        return false;
    }


    perionDialog(data, index) {
        const reqData = data.personId || data.personId === 0 ?
            { forwardToDialog: true, person: { pPersonId: null, pSearchType: 'I' } } :
            { forwardToDialog: true, person: { pPersonId: null, pSearchType: 'N' } };

        this.dialogService.openLinkDialog('osipserdialog', reqData).subscribe(resData => {
            if (resData) {
                this.addPersonValue(resData, index);
            }
        });

    }

    addPersonValue(data, index) {
        if (data) {
            //this.cslddbenGrid.setColumnData('personFlag', index, true);
            this.cslddbenGrid.setColumnData('personId', index, data.personId);
            this.cslddbenGrid.setColumnData('dspLastName', index, data.lastName);
            this.cslddbenGrid.setColumnData('dspFirstName', index, data.firstName);
            this.cslddbenGrid.setColumnData('corporateId', index, null);
            this.cslddbenGrid.setColumnData('dspCorporateName', index, null);
        }
    }


    onCorporateClick = (data) => {
        const index = this.cslddbenData.indexOf(data);
        this.corporatDialog(data, index);
        return false;
    }

    corporatDialog(data, index) {
        const reqData = { corporateId: undefined };
        this.dialogService.openLinkDialog('OTUCPAYE', reqData).subscribe(resData => {
            if (resData) {
                this.addcorporatValue(resData, index);
            }
        });
    }

    addcorporatValue(data, index) {
        if (data) {
            if (data.corporateId) {
              //  this.cslddbenGrid.setColumnData('corporateFlag', index, true);
                this.cslddbenGrid.setColumnData('corporateId', index, data.corporateId);
                this.cslddbenGrid.setColumnData('personId', index, null);
                this.cslddbenGrid.setColumnData('dspLastName', index, null);
                this.cslddbenGrid.setColumnData('dspFirstName', index, null);
            }
            if (data.corporateName) {
                this.cslddbenGrid.setColumnData('dspCorporateName', index, data.corporateName);
            }
            if (data.corpName) {
                this.cslddbenGrid.setColumnData('dspCorporateName', index, data.corpName);
            }
        }
    }

    get saveDisable() {
        if ((this.offdedGrid && (this.offdedGrid.addedMap.size > 0 ||
            this.offdedGrid.updatedMap.size > 0 || this.offdedGrid.removedMap.size > 0)) ||
            (this.cslddbenGrid && (this.cslddbenGrid.addedMap.size > 0 ||
                this.cslddbenGrid.updatedMap.size > 0 || this.cslddbenGrid.removedMap.size > 0 || this.cslddbenInsertList.length > 0)) ||
            (this.csldddGrid && (this.csldddGrid.addedMap.size > 0 ||
                this.csldddGrid.updatedMap.size > 0 || this.csldddGrid.removedMap.size > 0 || this.csldddInsertList.length > 0 ||
                (this.longSupvDateTemp && this.longSupvDate && (DateFormat.compareDate(DateFormat.getDate(this.longSupvDateTemp),
                DateFormat.getDate(this.longSupvDate)) !== 0) || (!this.longSupvDateTemp && this.longSupvDate)) 
    ))) {
            return false;
        } else {
            return true;
        }
    }

    onOffdedDelete = () => {
        if (this.cslddbenData.length !== 0 || this.csldddData.length !== 0) {
            this.show('common.cannotdeletemaster');
            return;
        }
        if((this.cslddbenGrid.removedMap.size > 0 || this.csldddGrid.removedMap.size > 0) && this.offdedGrid.removedMap.size > 0){
                this.show('Delete the fee Account and benficiary, receipt details');
                return;
        }

        return true;

    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    offdedValidations = (event) => {
        this.supvCount = 0;
        let offdedTempOne = [];
        let offdedTempTwo = [];
        let offdedTempThree = [];
        this.offdedData.forEach(element => {
            if (element.nonBillableStatus === 'Y' && element.feeActStatus === 'A' && element.createDatetime) {
                this.supvCount = this.supvCount + 1;
                offdedTempOne.push(element);
            }
        });
        const is = { valid: true }
        event.forEach(data => {
            if(data.nonBillableStatus === 'Y' && data.feeActStatus === 'A' ){
                offdedTempThree.push(data);
            }
        });
        event.forEach(data => {
            const index = this.offdedData.indexOf(data);
            if (!data.caseloadId) {
                this.show(this.translateService.translate('common.caseloadmustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (data.odp === 0) {
                this.show(this.translateService.translate('ocdofacc.pleaserenterotherthanzeroinodp'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (!data.odp) {
                this.show(this.translateService.translate('ocdofacc.odpmustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }

            for (let i = 0; i < this.offdedData.length; i++) {
                if (index !== i && data.odp == this.offdedData[i].odp && data.feeCode === this.offdedData[i].feeCode && data.caseloadId === this.offdedData[i].caseloadId) {
                    this.show(this.translateService.translate('ocdofacc.odpmustBeunique'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            }


            if (!data.feeCode) {
                this.show(this.translateService.translate('ocdofacc.feeCodeMustBeEntered'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if(this.supvCount >= 1 && data.nonBillableStatus === 'Y' && data.feeActStatus === 'A' && data.modeOfTrans === 'INSERT'){
                this.show(this.translateService.translate('ocdofacc.supvfeeaccountprofilealreadyexist'), 'warn');
                is.valid = false;
                return is.valid;
            }
           
            if(data.modeOfTrans === 'UPDATE'){
                offdedTempOne.forEach(e =>{
                    if(e.offenderFeeId != data.offenderFeeId){
                        offdedTempTwo.push(e);
                    }
                });
                if(offdedTempThree.length > 0 && offdedTempTwo.length > 0){
                    this.show(this.translateService.translate('ocdofacc.supvfeeaccountprofilealreadyexist'), 'warn');
                    is.valid = false;
                    return is.valid;
                }
            }

            if (data.dayOfMonth === 0) {
                this.show(this.translateService.translate('ocdofacc.dayOfMonthZero'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if (data.dayOfMonth && data.dayOfMonth < 1 || data.dayOfMonth && data.dayOfMonth > 31) {
                this.show(this.translateService.translate('ocdofacc.dayOfMonthbetween'), 'warn');
                this.offdedGrid.setColumnData('dayOfMonth', index, null);
                is.valid = false;
                return is.valid;
            }

            if (!data.startDate) {
                this.show(this.translateService.translate('ocdofacc.startdateempty'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if(data.startDate && this.vHeaderBlockModel.bookingBeginDate && (data.nonBillableStatus !== 'Y')){
                if (DateFormat.compareDate(DateFormat.getDate(data.startDate),
                DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                this.show(this.translateService.translate('ocdofacc.feeacountstartdatecannotbeearlierthanthesupervisionperiodstartdate'), 'warn');
                is.valid = false;
                return is.valid;

            }
        }

            if(data.startDate && this.offenderEventDate){
                if (DateFormat.compareDate(DateFormat.getDate(data.startDate),
                DateFormat.getDate(this.offenderEventDate)) === 1) {
                this.show(this.translateService.translate('ocdofacc.saveisnotpermittedstartenddatenotinlastsupdate'), 'warn');
                is.valid = false;
                return is.valid;

            }
        }

            if(data.expiryDate && this.offenderEventDate){
                if (DateFormat.compareDate(DateFormat.getDate(data.expiryDate),
                DateFormat.getDate(this.offenderEventDate)) === 1) {
                this.show(this.translateService.translate('ocdofacc.saveisnotpermittedstartenddatenotinlastsupdate'), 'warn');
                is.valid = false;
                return is.valid;

            }
        }
            if (data.frequencyType === 'ONE' && !data.expiryDate) {
                this.show(this.translateService.translate('ocdofacc.expirydatemustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (data.expiryDate && DateFormat.compareDate(DateFormat.getDate(data.expiryDate), DateFormat.getDate(data.startDate)) === -1) {
                this.show(this.translateService.translate('ocdofacc.expirydatemustnotbearlierthanstartdate'), 'warn');
                this.offdedGrid.setColumnData('expiryDate', index, null);
                is.valid = false;
                return is.valid;
            }

            if (!data.feeActStatus) {
                this.show(this.translateService.translate('common.statusmustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }

            if (!data.statusEffectiveDate) {
                this.show(this.translateService.translate('ocdofacc.statuseffectivedatemustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }

        });
        return is.valid;
    }

    cslddbenValidations() {
        const isvalid = { valid: true };
        if (this.cslddbenData && Array.isArray(this.cslddbenData)) {
            this.cslddbenData.forEach(ele => {
                const index = this.cslddbenData.indexOf(ele);
                for (let i = 0; i < this.cslddbenData.length; i++) {
                    if (index !== i && ele.personId == this.cslddbenData[i].personId &&
                        ele.corporateId == this.cslddbenData[i].corporateId) {
                        this.show(this.translateService.translate('ocdofacc.persionIdandcorporateIdunique'), 'warn');
                        isvalid.valid = false;
                        return isvalid.valid;
                    }
                }

                if (!this.isNull(ele.personId) && !this.isNull(ele.corporateId)) {
                    this.show('otmfopro.onlypersonidorcorporateid');
                    isvalid.valid = false;
                    return isvalid.valid;
                }

                if (this.isNull(ele.personId) && this.isNull(ele.corporateId)) {
                    this.show('ocmfapro.personidorcorporateidmustbeselect');
                    isvalid.valid = false;
                    return;
                }

                if (this.isNull(ele.priority)) {
                    this.show('otmfopro.prioritymustbeenter');
                    isvalid.valid = false;
                    return isvalid.valid;
                }
                if (!(Number(ele.priority) >= 1 && Number(ele.priority) <= 999)) {
                    this.show('otmfopro.prioritymustbeinrange');
                    isvalid.valid = false;
                    return isvalid.valid;
                }
                if (!ele['dspPercent']) {
                    this.show('otmfopro.prioritymustbeenter');
                    isvalid.valid = false;
                    return isvalid.valid;
                }
                if (this.isNull(ele.amount)) {
                    this.show('otmfopro.amountmustbeenter');
                    isvalid.valid = false;
                    return isvalid.valid;
                }

            });

        }
        return isvalid.valid;
    }
    isNull(value) {
        return value === null || value === undefined || value === '';
    }

    validatePersonId(personId, index): boolean {
        let flag = true;
        this.ocdofaccFactory.ocmofaccPersons(personId).subscribe(data => {
            if (data && data.personId) {
                this.addPersonValue(data, index);
                flag = true;
            } else {
                this.show(`Person ID: ${personId} does not exist.`);
                this.cslddbenGrid.setColumnData('personId', index, null);
                this.cslddbenGrid.setColumnData('dspLastName', index, null);
                this.cslddbenGrid.setColumnData('dspFirstName', index, null);
                flag = false;
            }
        });
        return flag;
    }

    validateCorporateId(corporateId, index): boolean {
        let flag = true;
        this.ocdofaccFactory.ocmofaccCorporates(corporateId).subscribe(data => {
            if (data && data.corporateId) {
                this.addcorporatValue(data, index);
                flag = true;
            } else {
                this.show(`Corporate ID: ${corporateId} does not exist.`);
                this.cslddbenGrid.setColumnData('corporateId', index, null);
                this.cslddbenGrid.setColumnData('dspCorporateName', index, null);
                flag = false;
            }
        });
        return flag;
    }

    csldddvalidations() { 
        const is = { valid: true };
        this.csldddData.forEach(data => {
            if (!data.receiptTxnType) {
                this.show(this.translateService.translate('ocdofacc.receipttypemustbeentered'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if(!this.isNull(data.receiptPercent) && !this.isNull(data.flatRate)){
                this.show(this.translateService.translate('ocmfapro.onlypercentageorflat'), 'warn');
                is.valid = false;
                return is.valid;
            }
        });
        return is.valid;
    }

    onRowClickoffdedPrev(event) {
        if (event) {
            this.offdedModelTemp = event;           
            this.caseloadFeeDedPrevBenficExecuteQuery();
            this.caseloadFeeDetPrevExecuteQuery();
        }
    }
    onRowClickoffded(event) {
        //this.offenderFeeId = undefined;
        if (event) {
            this.offdedModel = event;
        
        if (event.frequencyType === 'ONE') {
            this.offdedGrid.requiredOn('expiryDate');
            // this.offdedGrid.gridColumnApi.columnModel.allDisplayedColumns.forEach( obj => {
            //     if ( ['expiryDate'].includes(obj.colId) ) {
            //         obj.colDef.headerClass = 'header-col';
            //         this.offdedGrid.gridApi.refreshHeader();
            //     }
            // });
        } else {
            this.offdedGrid.requiredOff('expiryDate');
            // this.offdedGrid.gridColumnApi.columnModel.allDisplayedColumns.forEach( obj => {
            //     if (['expiryDate'].includes(obj.colId)) {
            //         obj.colDef.headerClass = '';
            //         this.offdedGrid.gridApi.refreshHeader();
            //     }
            // });
        }
        if (event.frequencyCode && event.frequencyCode == 'MONTHLY') {
            this.offdedGrid.requiredOn('dayOfMonth');
        } else {
            this.offdedGrid.requiredOff('dayOfMonth');
        }
        if (event.nonBillableStatus === 'Y') {
            this.offdedGrid.requiredOn('effectiveDate');
            /* this.offdedGrid.gridColumnApi.columnController.allDisplayedColumns.forEach( obj => {
                if ( ['effectiveDate'].includes(obj.colId) ) {                  
                    obj.colDef.headerClass = 'header-col';
                    this.offdedGrid.gridApi.refreshHeader();
                }
            }); */
        } else {
            this.offdedGrid.requiredOff('effectiveDate');
           /*  this.offdedGrid.gridColumnApi.columnController.allDisplayedColumns.forEach( obj => {
                if ( ['effectiveDate'].includes(obj.colId) ) {                 
                    obj.colDef.headerClass = '';
                    this.offdedGrid.gridApi.refreshHeader();
                }
            }); */
        }

        
        if (event && event.feeCode && event.caseloadId && event.createDatetime) {
            this.offdedEnableDelete = true;
            this.cslddbenEnableInsert = true;
            if(this.systemProfileDeductAuto === 'Y') {
                this.csldddEnableInsert = true;
            } else  {
                this.csldddEnableInsert = false;
            }
            this.offdedModel = event;
            //this.offenderFeeId = this.offdedModel.offenderFeeId;
            this.cslddbenModel.caseloadId = event.caseloadId;
            this.cslddbenModel.deductionType = event.feeCode;
            this.csldddModel.caseloadId = event.caseloadId;
            this.csldddModel.deductionType = event.feeCode;
            this.bnDisable = false;

            if (this.offdedModel.frequencyType === 'RECUR') {
                this.offdedGrid.requiredOn('nbtCode');
            } else {
                this.offdedGrid.requiredOff('nbtCode');
            }



            //if (event.feeId) {
                if(this.cslddbenGrid.removedMap.size <= 0){
            this.caseloadFeeDedBenficExecuteQuery();
                }
            if(this.csldddGrid.removedMap.size <= 0){
                this.caseloadFeeDetExecuteQuery();
            }
            // } else {

            // }
        } else {
            if (!this.offdedModel.offenderFeeIdTemp) {
                this.getFeeIdForPreInsert();
                this.cslddbenData = [];
                this.csldddData = [];
            }
            this.offdedEnableDelete = false;
            this.cslddbenEnableInsert = false;
            this.csldddEnableInsert = false;
            this.bnDisable = true;
            if (this.offdedModel.frequencyType === 'RECUR') {
                this.offdedGrid.requiredOn('nbtCode');
            } else {
                this.offdedGrid.requiredOff('nbtCode');
            }

        }
    }
    }
    getFeeIdForPreInsert() {
        const result = this.ocdofaccFactory.getFeeIdForPreInsert();
        result.subscribe(data => {
            if (data) {
                if (!this.offdedModel.createDatetime) {
                    this.offdedModel.offenderFeeIdTemp = data;

                }

            }

        });
    }

    onRowClickcslddben(event) {
        if (event){
            this.cslddbenModel = event;
        }
        if (event && event.createDatetime && event.offenderFeeId) {
            this.cslddbenEnableDelete = true;
           // this.caseloadFeeDetExecuteQuery();
        } else {
            this.cslddbenEnableDelete = false;
            //this.csldddData = [];
            //this.csldddExecuteQuery();
        }
    }

    onRowClickcslddd(event) {
        if (event && event.createDatetime) {
            if(this.systemProfileDeductAuto === 'Y') {
                this.csldddEnableDelete = true;
            } else  {
                this.csldddEnableDelete = false;
            }
        } else {
            this.csldddEnableDelete = false;
        }
    }


    sysPflExecuteQuery() {
        this.ocdofaccFactory.sysPflExecuteQuery().subscribe(data => {
            if (data) {
                this.systemProfModel = data[0];
                this.systemProfileDeduct = this.systemProfModel.profileValue;
            } else {
                this.systemProfModel = new SystemProfiles();
                this.systemProfileDeduct = 'N';
            }
            
        });
    }

    sysPflDedExecuteQuery() {
        this.ocdofaccFactory.sysPflDedExecuteQuery().subscribe(data => {
            if (data.length > 0) {
                this.systemProfAutoModel = data[0];
                this.systemProfileDeductAuto = this.systemProfAutoModel.profileValue;
            } else {
                this.systemProfModel = new SystemProfiles();
                this.systemProfileDeductAuto = 'Y';
            }
            
        });
    }

    sysLongSupPflExecuteQuery() {
        if(this.vHeaderBlockModel.offenderBookId){
            this.longSupvModelRetrive = new FeeAccountProfiles();
            this.longSupvModelRetrive.offenderBookId = this.vHeaderBlockModel.offenderBookId;
            this.ocdofaccFactory.sysLongSupPflExecuteQuery(this.longSupvModelRetrive).subscribe(data => {
                if (data) {
                    this.longSupvModelRetrive = data[0];
                    if(this.longSupvModelRetrive && this.longSupvModelRetrive.longestSupvExpDate){
                        this.longSupvDateTemp = DateFormat.getDate(this.longSupvModelRetrive.longestSupvExpDate)
                         ? DateFormat.getDate(this.longSupvModelRetrive.longestSupvExpDate) : undefined;
                         this.longSupvDate = DateFormat.getDate(this.longSupvModelRetrive.longestSupvExpDate)
                         ? DateFormat.getDate(this.longSupvModelRetrive.longestSupvExpDate) : undefined;
                         this.longestSupvReadOnly = false;
                    } else {
                        this.longSupvDateTemp = undefined;
                        this.longSupvDate = undefined;
                    }
                   /*  this.supvPeriodStartDate = DateFormat.getDate(this.systemProfModelLongSupv.profileValue)
                    ? DateFormat.getDate(this.systemProfModelLongSupv.profileValue) : undefined; */
                }
            });
        }

    }


    validateRowDataOffded = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;


        if (event.field === 'caseloadId') {
            this.caseloadCount = 0;
                if (this.globalCaseloadId === event.data.caseloadId) {
                    this.caseloadCount = this.caseloadCount + 1;
                    rowdata.validated = true;
                    return rowdata;
                } 
            if( this.caseloadCount === 0) {
                this.show(this.translateService.translate('ocdofacc.feeaccountcannotbecreatedforacaseloadunderthecurrentsupervisionperiod'), 'warn');
                this.offdedGrid.setColumnData('caseloadId', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
            }
        

        if (event.field === 'odp') {
            if (this.systemProfileDeduct === 'Y') {
                this.paymentsUpdate();
                rowdata.validated = true;
                return rowdata;
            } else {
                rowdata.validated = true;
                return rowdata;
            }
        }


        if (event.field === 'feeCode') {
            if (event.data.feeCode) {
                this.supvCount = 0;
                this.offdedData.forEach(element => {
                    if (element.nonBillableStatus === 'Y') {
                        this.supvCount = this.supvCount + 1;
                    }
                });
           
                    if (event.data.nonBillableStatus === 'Y') {
                        //this.supHistoryExecuteQuery();
                    } else {
                        //this.offdedGrid.setColumnData('startDate', rowIndex, DateFormat.getDate());
                        //this.offdedGrid.setColumnData('effectiveDate', rowIndex, DateFormat.getDate());
                    }
                    this.cslddpModel = new CaseloadDeductionProfiles();
                    this.cslddpModel.deductionType = event.data.feeCode;
                    this.cslddpModel.caseloadId = event.data.caseloadId;
                    this.cslddpModel.caseloadType = this.caseloadtype;
                    const serviceObj = this.ocdofaccFactory.csldDpExecuteQuery(this.cslddpModel);
                    serviceObj.subscribe(data => {
                        if (data.length === 0) {
                          //  this.show('common.querycaused');
                            this.cslddbenData = [];
                            this.csldddData = [];
                            this.offdedGrid.setColumnData('amount', rowIndex, undefined);
                            this.offdedGrid.setColumnData('nbtFrequency', rowIndex, undefined);
                            this.offdedGrid.setColumnData('nbtCode', rowIndex, undefined);
                            this.offdedGrid.setColumnData('frequencyType', rowIndex, undefined);
                            this.offdedGrid.setColumnData('frequencyCode', rowIndex, undefined);
                            this.offdedGrid.setColumnData('dayOfMonth', rowIndex, undefined);
                            this.offdedGrid.setColumnData('nonBillableStatus', rowIndex, undefined);
                            rowdata.validated = true;
                            return rowdata;
                        } else if (data !== undefined && data.length > 0 && data[0].errorMessage) {
                         //   this.show('common.querycaused');
                            this.cslddbenData = [];
                            this.csldddData = [];
                            this.offdedGrid.setColumnData('amount', rowIndex, undefined);
                            this.offdedGrid.setColumnData('nbtFrequency', rowIndex, undefined);
                            this.offdedGrid.setColumnData('nbtCode', rowIndex, undefined);
                            this.offdedGrid.setColumnData('frequencyType', rowIndex, undefined);
                            this.offdedGrid.setColumnData('frequencyCode', rowIndex, undefined);
                            this.offdedGrid.setColumnData('dayOfMonth', rowIndex, undefined);
                            this.offdedGrid.setColumnData('nonBillableStatus', rowIndex, undefined);
                            rowdata.validated = true;
                            return rowdata;
                        } else {
                            data.forEach(ele => {

                                //ele.backBill = ele.backBill === 'Y' ? true : null;
                                //ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag === 'Y' ? true : null;
                                ele.activeFlag = ele.activeFlag === 'Y' ? true : null;
                                ele.accountCode = String(ele.accountCode);
                            });
                            this.cslddpData = data;
                            this.cslddpModelData = data[0];
                            this.cslddpIndex = 0;
                            this.offdedGrid.setColumnData('amount', rowIndex, this.cslddpModelData.amount);
                            this.offdedGrid.setColumnData('nbtFrequency', rowIndex, this.cslddpModelData.nbtFrequency);
                            this.offdedGrid.setColumnData('nbtCode', rowIndex, this.cslddpModelData.nbtCode);
                            this.offdedGrid.setColumnData('frequencyType', rowIndex, this.cslddpModelData.frequencyType);
                            this.offdedGrid.setColumnData('frequencyCode', rowIndex, this.cslddpModelData.frequencyCode);
                           if( this.cslddpModelData.dayOfMonth === 0){
                            this.offdedGrid.setColumnData('dayOfMonth', rowIndex, undefined);
                           } else {
                               this.offdedGrid.setColumnData('dayOfMonth', rowIndex, this.cslddpModelData.dayOfMonth);
                           }
                            this.offdedGrid.setColumnData('foAlAllOffenderFlag', rowIndex, this.cslddpModelData.foAlAllOffenderFlag);
                            this.offdedGrid.setColumnData('nonBillableStatus', rowIndex, this.cslddpModelData.nonBillableStatus);
                            this.offdedGrid.setColumnData('backBill', rowIndex, this.cslddpModelData.backBill);
                            this.cslddbenModel.deductionType = event.data.feeCode;
                            this.csldddModel.deductionType = event.data.feeCode;


                            if(this.cslddpModelData.nonBillableStatus === 'Y'){
                                this.offdedGrid.setColumnData('effectiveDate', rowIndex, DateFormat.getDate());
                                this.offdedGrid.requiredOn('effectiveDate');
                                /* this.offdedGrid.gridColumnApi.columnController.allDisplayedColumns.forEach( obj => {
                                    if ( ['effectiveDate'].includes(obj.colId) ) {
                                        obj.colDef.headerClass = 'header-col';
                                        this.offdedGrid.gridApi.refreshHeader();
                                    }
                                }); */
                            } else {
                                this.offdedGrid.requiredOff('effectiveDate');
                                /* this.offdedGrid.gridColumnApi.columnController.allDisplayedColumns.forEach( obj => {
                                    if ( ['effectiveDate'].includes(obj.colId) ) {
                                        obj.colDef.headerClass = '';
                                        this.offdedGrid.gridApi.refreshHeader();
                                    }
                                }); */
                                this.offdedGrid.setColumnData('effectiveDate', rowIndex, undefined);
                            }
                            if (this.cslddpModelData.frequencyType === 'ONE') {
                                this.offdedGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate());
                            }
                            if (this.cslddpModelData.frequencyType === 'ONE') {
                                this.offdedGrid.requiredOn('expiryDate');
                            } else {
                                this.offdedGrid.requiredOff('expiryDate');
                            }

                            if (this.cslddpModelData.frequencyType === 'RECUR') {
                                this.offdedGrid.requiredOn('nbtCode');
                            } else {
                                this.offdedGrid.requiredOff('nbtCode');

                            }

                            this.cslddbenExecuteQuery();
                            this.csldddExecuteQuery();
                            rowdata.validated = true;
                            return rowdata;
                        }
                    });
               // }
            }
        }
        if (event.data.frequencyCode && event.data.frequencyCode == 'MONTHLY') {
            this.offdedGrid.requiredOn('dayOfMonth');
        } else {
            this.offdedGrid.requiredOff('dayOfMonth');
        }
        if (event.field === 'startDate') {
            if(event.newValue != event.oldValue){
                this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, true);
            }else{
                this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, false);
            }
            if (event.data.startDate && this.supvPeriodStartDate) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.startDate),
                    DateFormat.getDate(this.supvPeriodStartDate)) === 1) {
                    this.show(this.translateService.translate('ocdofacc.feeacountnotearlierthatsupvstartdate'), 'warn');
                    rowdata.validated = true;
                    return rowdata;

                }
            }

            if (event.data.startDate && this.vHeaderBlockModel.bookingBeginDate && (event.data.backBill ==='Y' || event.data.backBill ==='N')) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.startDate),
                DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                this.show(this.translateService.translate('ocdofacc.feeaccountstartdatecannotbeearlierthantheoffendersadmissiondate'), 'warn');
                rowdata.validated = true;
                return rowdata;

            }
        }
            if((event.oldValue && event.newValue) && DateFormat.compareDate(DateFormat.getDate(event.oldValue),event.newValue) != 0 && event.data.nonBillableStatus === 'N' && event.data.feeActStatus === 'C'){
                this.offdedGrid.setColumnData('feeActStatus', rowIndex, 'A');
                this.offdedGrid.setColumnData('statusEffectiveDate', rowIndex, DateFormat.getDate());
                rowdata.validated = true;
                return rowdata;
            }

            if(!event.createDatetime){
                    this.offdedGrid.setColumnData('statusEffectiveDate', rowIndex, event.data.startDate);
                    rowdata.validated = true;
                    return rowdata;
            }

        }
        if (event.field === 'effectiveDate') {
            if(event.newValue != event.oldValue){
                this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, true);
            }else{
                this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, false);
            }
            if(event.data.effectiveDate && event.data.supvPeriodDate && (event.data.backBill ==='Y')){
                if (DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate),
                DateFormat.getDate(event.data.supvPeriodDate)) === -1) {
                this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatenotearlierthansupvstatuseffectivedate'), 'warn');
                rowdata.validated = true;
                return rowdata;

            }
        }
            if (event.data.effectiveDate && this.vHeaderBlockModel.bookingBeginDate && (event.data.backBill ==='Y' || event.data.backBill ==='N')) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.effectiveDate),
                DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatecannotbeearlierthantheoffendersadmissiondate'), 'warn');
                rowdata.validated = true;
                return rowdata;

            }
           
               
            }

            if((event.oldValue && event.newValue) && DateFormat.compareDate(DateFormat.getDate(event.oldValue),event.newValue) != 0 && event.data.nonBillableStatus === 'Y' && event.data.billableFlag=== 'Y' && (event.data.feeActStatus === 'C' || event.data.feeActStatus === 'S')){
                this.offdedGrid.setColumnData('feeActStatus', rowIndex, 'A');
                this.offdedGrid.setColumnData('statusEffectiveDate', rowIndex, DateFormat.getDate());
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'expiryDate') {
            if(event.newValue != event.oldValue){
                this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, true);
            }else{
                this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, false);
            }
            if (event.data.expiryDate && event.data.startDate) {
                if (DateFormat.compareDate(DateFormat.getDate(event.data.expiryDate),
                    DateFormat.getDate(event.data.startDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.expirydatecannotearlierstartdate'), 'warn');
                    rowdata.validated = true;
                    return rowdata;

                }
            }

            if (event.data.frequencyType === 'ONE' && event.data.startDate && event.data.expiryDate){
             if(DateFormat.compareDate(DateFormat.getDate(event.data.startDate),
                DateFormat.getDate(event.data.expiryDate)) !== 0) {
                this.show(this.translateService.translate('ocdofacc.feeacountexpiryssameassatrtdate'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
        
        }
    }

    if (event.field === 'amount' || event.field === 'dayOfMonth' || event.field === 'feeActStatus' || event.field === 'statusEffectiveDate') {
        if(event.newValue != event.oldValue){
            this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, true);
        }else{
            this.offdedGrid.setColumnData('isTriggerEnable', event.rowIndex, false);
        }
        rowdata.validated = true;
        return rowdata;
    }

        rowdata.validated = true;
        return rowdata;
    }

    validateRowCslddben = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;

        if (String(event.newValue) !== String(event.oldValue)) {
            if (event.field === 'personId') {
                if (event.newValue) {
                    this.validatePersonId(Number(event.newValue), rowIndex);
                } else {
                    this.show('Person ID:' + event.oldValue + ' does not exist.');
                    this.cslddbenGrid.setColumnData('personId', rowIndex, null);
                    this.cslddbenGrid.setColumnData('dspLastName', rowIndex, null);
                    this.cslddbenGrid.setColumnData('dspFirstName', rowIndex, null);
                }
            } if (event.field === 'corporateId') {
                if (event.newValue) {
                    this.validateCorporateId(Number(event.newValue), rowIndex);
                } else {
                    this.show('Corporate ID:' + event.oldValue + ' does not exist.');
                    this.cslddbenGrid.setColumnData('corporateId', rowIndex, null);
                    this.cslddbenGrid.setColumnData('dspCorporateName', rowIndex, null);
                }
            } if (event.field === 'priority') {
                if (event.newValue) {
                    if (!(Number(event.newValue) >= 1 && Number(event.newValue) <= 999)) {
                        this.show('otmfopro.prioritymustbeinrange');
                        this.cslddbenGrid.setColumnData('priority', rowIndex, null);
                    }
                }
            }
        }


        rowdata.validated = true;
        return rowdata;
    }

    onFeeOverdClick = () => {  
        this.offdedModel.isInsertEnable='Y'; 
        this.dialogService.openLinkDialog('/OCUFOVDT', this.offdedModel, 80).subscribe(result => {
            this.offdedExecteQuery();
        });
    }

    onFeeStatusHistoryClick = () => {
        this.childPopulatingModel=new FeeAccountProfiles();
        this.childPopulatingModel = this.offdedModel;
        if(this.childPopulatingModel.nonBillableStatus === 'Y') {
            this.childPopulatingModel.longestSupvExpDate =this.longSupvDate;
        }
        this.dialogService.openLinkDialog('/OCUACHIS', this.childPopulatingModel, 80).subscribe(result => {
        });
    }


    offdedExecteQuery() {
        this.offdedModel =new FeeAccountProfiles();
        this.offdedModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offdedModel.location = this.sessionManager.currentCaseLoad;
        const serviceObj = this.ocdofaccFactory.offDedExecuteQuery(this.offdedModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offdedData = [];
                this.offdedModel = new FeeAccountProfiles();
                this.cslddbenData = [];
                this.csldddData = [];
            } else {
                data.forEach(ele => {
                    if(ele.dayOfMonth === 0){
                        if( ele.dayOfMonth === 0 && ele.frequencyCode === 'MONTHLY'){
                            this.show(this.translateService.translate('ocdofacc.billingdaycannotnullpleaseenterbillingday'), 'warn');
                        }
                        ele.dayOfMonth = undefined;
                    }
                });
                this.offdedData = data;
                this.offdedModel = data[0];
                this.tableIndex = 0;
            }
        });
    }

    cslddbenExecuteQuery() {
        this.cslddbenModel.caseloadId = this.offdedModel.caseloadId;
        this.cslddbenModel.offenderFeeId = this.offdedModel.offenderFeeIdTemp;
        const cslddbenResult = this.ocdofaccFactory.csldDbenExecuteQuery(this.cslddbenModel);
        cslddbenResult.subscribe(cslddbenResultList => {
            if (cslddbenResultList.length === 0) {
                this.cslddbenData = [];
            } else {
                cslddbenResultList.forEach(ele => {
                    if (ele.corporateId) {
                        ele.corporateIdTemp = ele.corporateId;
                    }

                    if (ele.personId) {
                        ele.personIdTemp = ele.personId;
                    }
                    ele.personId2 = '...';
                    ele.corporateId2 = '...';
                    if (ele.percent) {
                        ele.dspPercent = Number(ele.percent);
                    } else {
                        ele.dspPercent = '0';
                    }
                });
                this.cslddbenData = cslddbenResultList;
                this.cslddbenInsertListTemp = cslddbenResultList;
                this.cslddbenModel= cslddbenResultList[0];
                this.tableIndexBen = 0;

            }
        });
    }

    csldddExecuteQuery() {
        this.csldddModel.caseloadId = this.offdedModel.caseloadId;
        this.csldddModel.offenderFeeId = this.offdedModel.offenderFeeIdTemp;
        const csldddResult = this.ocdofaccFactory.csldDdExecuteQuery(this.csldddModel);
        csldddResult.subscribe(csldddResultList => {
            if (csldddResultList.length === 0) {
                this.csldddData = [];
            } else {
                this.csldddData = csldddResultList;
                this.csldddModel = csldddResultList[0];
                this.csldddInsertListTemp = csldddResultList;
                this.tableIndexDed = 0;
            }
        });
    }

    saveFeeOverdDet(event) {
        this.offdedInsertList = event.added;
        this.offdedUpdateList = event.updated;
        this.offdedDeleteList = event.removed;
        this.offdedCommitBean.insertList = [];
        this.offdedCommitBean.updateList = [];
        this.offdedCommitBean.deleteList = [];


        if (this.offdedInsertList.length > 0 || this.offdedUpdateList.length > 0) {
            if (!this.offdedValidations(this.offdedInsertList)) {
                return;
            }
        }
        if (this.offdedInsertList.length > 0) {
            this.offdedInsertList.forEach(element => {
                element.offenderBookId = this.vHeaderBlockModel.offenderBookId;
               // element.caseloadId = this.caseloadId;
            });

            for (let i = 0; i < this.offdedInsertList.length; i++) {
                if (!this.offdedInsertList[i].amount) {
                    this.show(this.translateService.translate('ocdofacc.amountnotnullbillingprfileamount'), 'warn');
                    return;
                } else if (this.offdedInsertList[i].amount === 0) {
                    const lockFlagMessage = {
                        label: this.translateService.translate('ocdofacc.doyougeneratebillforzero'), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 55).subscribe(result => {
                        if (!result) {
                            return false;
                        } else {

                        }
                    });
                }

                if (this.offdedInsertList[i].expiryDate && this.offdedInsertList[i].startDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].expiryDate),
                        DateFormat.getDate(this.offdedInsertList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.expirydatecannotearlierstartdate'), 'warn');
                        return false;

                    }
                }

                if (this.offdedInsertList[i].frequencyType === 'ONE' && this.offdedInsertList[i].startDate && this.offdedInsertList[i].expiryDate){
                    if(DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].startDate),
                        DateFormat.getDate(this.offdedInsertList[i].expiryDate)) !== 0) {
                        this.show(this.translateService.translate('ocdofacc.feeacountexpiryssameassatrtdate'), 'warn');
                        return false;
                    }
                }

            }
            this.offdedCommitBean.insertList = this.offdedInsertList;
        }

        if (this.offdedUpdateList.length > 0) {
            this.offdedUpdateList.forEach(element => {
                element.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                //element.caseloadId = this.caseloadId;
            });

            for (let i = 0; i < this.offdedUpdateList.length; i++) {
                if (!this.offdedUpdateList[i].amount) {
                    this.show(this.translateService.translate('ocdofacc.amountnotnullbillingprfileamount'), 'warn');
                    return;
                } else if (this.offdedUpdateList[i].amount === 0) {
                    const lockFlagMessage = {
                        label: this.translateService.translate('ocdofacc.doyougeneratebillforzero'), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 55).subscribe(result => {
                        if (!result) {
                            return false;
                        } else {

                        }
                    });
                }

                if (this.offdedUpdateList[i].expiryDate && this.offdedUpdateList[i].startDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].expiryDate),
                        DateFormat.getDate(this.offdedUpdateList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.expirydatecannotearlierstartdate'), 'warn');
                        return false;

                    }
                }

                if (this.offdedUpdateList[i].frequencyType === 'ONE' && this.offdedUpdateList[i].startDate && this.offdedUpdateList[i].expiryDate){
                    if( DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].startDate),
                        DateFormat.getDate(this.offdedUpdateList[i].expiryDate)) !== 0) {
                        this.show(this.translateService.translate('ocdofacc.feeacountexpiryssameassatrtdate'), 'warn');
                        return false;
                    }
                }

            }

            this.offdedCommitBean.updateList = this.offdedUpdateList;
        }

        if (this.offdedDeleteList.length > 0) {
            this.offdedCommitBean.deleteList = this.offdedDeleteList;
        }

        this.offdedCommitBean.insertList = this.offdedInsertList;
        this.offdedCommitBean.updateList = this.offdedUpdateList;
        this.offdedCommitBean.deleteList = this.offdedDeleteList;
        const result = this.ocdofaccFactory.ocdofaccFeeAccountCommit(this.offdedCommitBean);
        result.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.offdedExecteQuery();

                return;
            } else if (data === 101) {
                this.show(this.translateService.translate('ocdofacc.benficiarytotalnotequaltoamount'), 'warn');
                return;
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.offdedExecteQuery();

                return;
            }
        });

    }

    paymentsUpdate() {
       // throw new Error('Method not implemented.');
    }



    caseloadFeeDedBenficExecuteQuery() {
        if(this.offdedModel.offenderFeeId){
            this.cslddbenModel.offenderFeeId = this.offdedModel.offenderFeeId;
            const cslddbenResult = this.ocdofaccFactory.caseloadFeeDedBenficExecuteQuery(this.cslddbenModel);
            cslddbenResult.subscribe(cslddbenResultList => {
                if (cslddbenResultList.length === 0) {
                    this.cslddbenData = [];
                } else {
                    cslddbenResultList.forEach(ele => {
                        if (ele.corporateId) {
                            ele.corporateIdTemp = ele.corporateId;
                        }
    
                        if (ele.personId) {
                            ele.personIdTemp = ele.personId;
                        }
                        ele.personId2 = '...';
                        ele.corporateId2 = '...';
                        if (ele.percent) {
                            ele.dspPercent = Number(ele.percent);
                        } else {
                            ele.dspPercent = '0';
                        }
                    });
                    this.cslddbenData = cslddbenResultList;
                    this.cslddbenModel= cslddbenResultList[0];
                    this.tableIndexBen = 0;
                }
            });
        }
    }

    caseloadFeeDetExecuteQuery() {
        this.csldddModel.offenderFeeId = this.offdedModel.offenderFeeId;
        const csldddResult = this.ocdofaccFactory.caseloadFeeDetExecuteQuery(this.csldddModel);
        csldddResult.subscribe(csldddResultList => {
            if (csldddResultList.length === 0) {
                this.csldddData = [];
            } else {
                this.csldddData = csldddResultList;
                this.csldddModel = csldddResultList[0];
                this.tableIndexDed = 0;
            }
        });
    }



    saveBenficDetails(event) {

        this.cslddbenInsertList = event.added;
        this.cslddbenUpdateList = event.updated;
        this.cslddbenDeleteList = event.removed;
        this.cslddbenCommitBean.insertList = [];
        this.cslddbenCommitBean.updateList = [];
        this.cslddbenCommitBean.deleteList = [];

        if (this.cslddbenInsertList.length > 0 || this.cslddbenUpdateList.length > 0) {
            if (!this.cslddbenValidations()) {
                return;
            }
        }
        if (this.cslddbenInsertList.length > 0) {
            this.cslddbenInsertList.forEach(data => {
                data.caseloadId = this.offdedModel.caseloadId;
                data.deductionType = this.offdedModel.feeCode;
                data.percent = Number(data['dspPercent']);
                data.maxTotalAmount = this.offdedModel.amount;
                data.offenderFeeId = this.offdedModel.offenderFeeId;
            });

        }
        this.cslddbenCommitBean.insertList = this.cslddbenInsertList;

        if (this.cslddbenUpdateList.length > 0) {
            this.cslddbenUpdateList.forEach(data => {
                data.percent = Number(data['dspPercent']);
                data.maxTotalAmount = this.offdedModel.amount;
                data.offenderFeeId = this.offdedModel.offenderFeeId;
            });

        }
        this.cslddbenCommitBean.updateList = this.cslddbenUpdateList;

        if (this.cslddbenDeleteList.length > 0) {
            this.cslddbenDeleteList.forEach(data => {
                data.maxTotalAmount = this.offdedModel.amount;
            });
        }
        this.cslddbenCommitBean.deleteList = this.cslddbenDeleteList;
        this.cslddbenCommitBean = this.cslddbenCommitBean;


        const result = this.ocdofaccFactory.ocdofaccBenficiaryCommit(this.cslddbenCommitBean);
        result.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.caseloadFeeDedBenficExecuteQuery();
                return;
            } else if (data === 101) {
                this.show(this.translateService.translate('ocdofacc.benficiarytotalnotequaltoamount'), 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.caseloadFeeDedBenficExecuteQuery();
                return;
            }
        });
    }



    saveDeductDetails(event) {
        this.csldddInsertList = event.added;
        this.csldddUpdateList = event.updated;
        this.csldddDeleteList = event.removed;

        this.csldddCommitBean.insertList = [];
        this.csldddCommitBean.updateList = [];
        this.csldddCommitBean.deleteList = [];

        if (this.csldddInsertList.length > 0 || this.csldddUpdateList.length > 0) {
            if (!this.csldddvalidations()) {
                return;
            }
        }
        if (this.csldddInsertList.length > 0) {
            this.csldddInsertList.forEach(data => {
                data.caseloadId = this.offdedModel.caseloadId;;
                data.deductionType = this.offdedModel.feeCode;
                data.offenderFeeId = this.offdedModel.offenderFeeId;
            });

        }
        this.csldddCommitBean.insertList = this.csldddInsertList;

        if (this.csldddUpdateList.length > 0) {
            this.csldddUpdateList.forEach(data => {
                data.caseloadId = this.offdedModel.caseloadId;;
                data.deductionType = this.offdedModel.feeCode;
                data.offenderFeeId = this.offdedModel.offenderFeeId;
            });
        }
        this.csldddCommitBean.updateList = this.csldddUpdateList;

        if (this.csldddDeleteList.length > 0) {
            this.csldddDeleteList.forEach(data => {
                data.caseloadId = this.offdedModel.caseloadId;
                data.deductionType = this.offdedModel.feeCode;
                data.offenderFeeId = this.offdedModel.offenderFeeId;
            });
        }
        this.csldddCommitBean.deleteList = this.csldddDeleteList;
        this.csldddCommitBean = this.csldddCommitBean;

        const result = this.ocdofaccFactory.ocdofaccDeductionCommit(this.csldddCommitBean);
        result.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.caseloadFeeDetExecuteQuery();
                return;
            } else if (data === 101) {
                this.show(this.translateService.translate('ocdofacc.benficiarytotalnotequaltoamount'), 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.caseloadFeeDetExecuteQuery();
                return;
            }
        });
    }


    firstTabSave() {

        const event = { added: [], removed: [], updated: [] };
        if (this.offdedGrid) {
            const added = [];
            if (this.offdedGrid.addedMap.size > 0) {
                this.offdedGrid.addedMap.forEach((value) => {
                    added.push(value);
                });
            }
            const removed = [];
            this.offdedGrid.removedMap.forEach((value) => {
                removed.push(value);
            });
            const updated = [];
            this.offdedGrid.updatedMap.forEach((value) => {
                updated.push(value);
            });
            event.added = added;
            event.removed = removed;
            event.updated = updated;

            if (!this.saveFeeActDet(event)) {
                return false;
            }
        }


        if (this.cslddbenGrid) {
            const added = [];
            if (this.cslddbenInsertListTemp.length > 0) {
                this.cslddbenInsertListTemp.forEach(val => {
                    added.push(val);
                });
            }

            this.cslddbenGrid.addedMap.forEach((value) => { added.push(value); });
            const removed = [];
            this.cslddbenGrid.removedMap.forEach((value) => { removed.push(value); });
            const updated = [];
            this.cslddbenGrid.updatedMap.forEach((value) => { updated.push(value); });
            this.cslddpModel.caseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
            if (!this.ocmfaproSavecslddbenForm({ added: added, updated: updated, removed: removed })) {
                return false;
            }
        }


        const csldDEvent = { added: [], updated: [], removed: [] };
        if (this.csldddGrid) {
            const added = [];
            if (this.csldddInsertListTemp.length > 0) {
                this.csldddInsertListTemp.forEach(val => {
                    added.push(val);
                });
            }
            this.csldddGrid.addedMap.forEach((value) => { added.push(value); });
            const removed = [];
            this.csldddGrid.removedMap.forEach((value) => { removed.push(value); });
            const updated = [];
            this.csldddGrid.updatedMap.forEach((value) => { updated.push(value); });
            csldDEvent.added = added;
            csldDEvent.removed = removed;
            csldDEvent.updated = updated;
            if (!this.ocmfaproSavecsldddForm(csldDEvent)) {
                 return false;
            }

        }
        this.longSupvModelUpdate =new FeeAccountProfiles();
        this.ocmofaccCommitBean.longSupvModelUpdate = this.longSupvModelUpdate;
        if (this.longSupvDateTemp && this.longSupvDate) {
            if (DateFormat.compareDate(DateFormat.getDate(this.longSupvDateTemp),
                DateFormat.getDate(this.longSupvDate)) !== 0) {
                /* this.show(this.translateService.translate('Effective Date cannot be earlier than startdate'), 'warn');
                return false; */
                if (this.longSupvDate && this.offdedModel.startDate && this.offdedModel.nonBillableStatus ==='Y' ) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.longSupvDate),
                        DateFormat.getDate(this.offdedModel.startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.longestsupervisionexpirydatecannotbeearlierthanstartdate'), 'warn');
                        return false;

                    }
                }
                this.longSupvModelUpdate.insertUpdateString ="UPDATE"
                this.longSupvModelUpdate.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.longSupvModelUpdate.longestSupvExpDate = DateFormat.getDate(this.longSupvDate);
                this.ocmofaccCommitBean.longSupvModelUpdate = this.longSupvModelUpdate;
            }
        } else {
            if(!this.longSupvDateTemp){
                if (this.longSupvDate && this.offdedModel.startDate && this.offdedModel.nonBillableStatus ==='Y' ) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.longSupvDate),
                        DateFormat.getDate(this.offdedModel.startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.longestsupervisionexpirydatecannotbeearlierthanstartdate'), 'warn');
                        return false;

                    }
                }
                if(this.longSupvDate){
                    this.longSupvModelUpdate.insertUpdateString ="INSERT";
                    this.longSupvModelUpdate.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                    this.longSupvModelUpdate.longestSupvExpDate = DateFormat.getDate(this.longSupvDate);
                    this.ocmofaccCommitBean.longSupvModelUpdate = this.longSupvModelUpdate;
                }
            }
        }

        if (this.ocmofaccCommitBean.offdedCommitBean.insertList.length > 0) {
            for (let i = 0; i < this.ocmofaccCommitBean.offdedCommitBean.insertList.length; i++) {
	           this.ocmofaccCommitBean.offdedCommitBean.insertList[i].userId = this.sessionManager.getId();
                if (this.ocmofaccCommitBean.offdedCommitBean.insertList[i].amount === 0) {
                    const lockFlagMessage = {
                        label: this.translateService.translate('ocdofacc.doyougeneratebillforzero'), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 55).subscribe(result => {
                        if (!result) {
                            const rowIndex = this.offdedData.indexOf(this.ocmofaccCommitBean.offdedCommitBean.insertList[i]);
                            this.show(this.translateService.translate('ocdofacc.pleaseupdatetheamountandsavethetransactionagain'),'warn');
                           // this.offdedGrid.gridApi.setFocusedCell(rowIndex, 'amount');
                            return;
                        } else {
                            this.finallSave();
                        }
                    });
                }else{
                    this.finallSave();
                }
            }
        } else if (this.ocmofaccCommitBean.offdedCommitBean.updateList.length > 0){
            for (let i = 0; i < this.ocmofaccCommitBean.offdedCommitBean.updateList.length; i++) {
                if (this.ocmofaccCommitBean.offdedCommitBean.updateList[i].amount === 0) {
                    const lockFlagMessage = {
                        label: this.translateService.translate('ocdofacc.doyougeneratebillforzero'), yesBtn: true, noBtn: true
                    };
                    this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 55).subscribe(result => {
                        if (!result) {
                            const rowIndex = this.offdedData.indexOf(this.ocmofaccCommitBean.offdedCommitBean.insertList[i]);
                            this.show(this.translateService.translate('ocdofacc.pleaseupdatetheamountandsavethetransactionagain'),'warn');
                            //this.offdedGrid.gridApi.setFocusedCell(rowIndex, 'amount');
                            return;
                        } else {
                            this.finallSave();
                        }
                    });
                }else{
                    this.finallSave();
                }
            }
        } else {
            this.finallSave();
        }

    }


    finallSave(){

        const result = this.ocdofaccFactory.ocmofaccCommit(this.ocmofaccCommitBean);
        result.subscribe(data => {
            if (data === 1) {
                this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
                this.cslddbenInsertListTemp = [];
                this.csldddInsertListTemp = [];
                this.offenderFeeId = undefined;
                this.sysLongSupPflExecuteQuery();
                this.offdedExecteQuery();
                this.caseloadFeeDedBenficExecuteQuery();
                this.caseloadFeeDetExecuteQuery();
                this.offdedPrevExecteQuery();
                return;
            } else if (data === 2) {
                this.show(this.translateService.translate('ocdofacc.supvfeeaccountprofilealreadyexist'), 'warn');
                this.cslddbenInsertListTemp = [];
                this.csldddInsertListTemp = [];
                this.offenderFeeId = undefined;
                this.sysLongSupPflExecuteQuery();
                this.offdedExecteQuery();
                this.caseloadFeeDedBenficExecuteQuery();
                this.caseloadFeeDetExecuteQuery();
            }  else if (data === 101) {
                this.show(this.translateService.translate('ocdofacc.benficiarytotalnotequaltoamount'), 'warn');
                // this.cslddbenInsertListTemp = [];
                // this.csldddInsertListTemp = [];
            } else if (data === 222) {
                this.show('ocmfapro.rowexistsalreadywithsamerecepipttxntype', 'warn');
            } 
            else if (data === 223) {
                this.show('ocdofacc.feeoverridedetailsexistspleasedeletethosefirst', 'warn');
                this.sysLongSupPflExecuteQuery();
                this.offdedExecteQuery();
                this.caseloadFeeDedBenficExecuteQuery();
                this.caseloadFeeDetExecuteQuery();
            } 
            else if (data === 224) {
                this.show('ocdofacc.feeaccountwillnotbedeletedalreadybillwasgenerated', 'warn');
                this.sysLongSupPflExecuteQuery();
                this.offdedExecteQuery();
                this.caseloadFeeDedBenficExecuteQuery();
                this.caseloadFeeDetExecuteQuery();
            } 
            
            else if (data === 22) {
                this.show('ocdofacc.rowalreadyexistwithsamebeneficiarydetails', 'warn');
            } else {
                this.show(this.translateService.translate('common.addupdateremoverecordfailed'), 'warn');
                this.cslddbenInsertListTemp = [];
                this.csldddInsertListTemp = [];
                this.offenderFeeId = undefined;
                this.sysLongSupPflExecuteQuery();
                this.offdedExecteQuery();
                this.caseloadFeeDedBenficExecuteQuery();
                this.caseloadFeeDetExecuteQuery();
                return;
            }
        });
    }

    saveFeeActDet(event) {
        

        this.offdedInsertList = event.added;
        this.offdedUpdateList = event.updated;
        this.offdedDeleteList = event.removed;
        this.offdedCommitBean.insertList = [];
        this.offdedCommitBean.updateList = [];
        this.offdedCommitBean.deleteList = [];

        if (this.offdedInsertList.length > 0) {
            this.offdedInsertList.forEach(element => {
                element.modeOfTrans = 'INSERT';
                element.isTriggerEnable =  element.isTriggerEnable ? 'Y' : 'N';
                if(element.nonBillableStatus ==='Y' && this.longSupvDate){
                    element.expiryDate=this.longSupvDate;
                }
                    element.statusEffectiveDate = element.startDate;
            });
            if (!this.offdedValidations(this.offdedInsertList)) {
                return;
            }
            this.offdedInsertList.forEach(element => {
                element.offenderBookId = this.vHeaderBlockModel.offenderBookId;
                //element.caseloadId = this.caseloadId;
                element.offenderFeeId = element.offenderFeeIdTemp;
                //element.staffId = this.sessionManager.getStaffDetail.
            });
            
            for (let i = 0; i < this.offdedInsertList.length; i++) {
                if (this.offdedInsertList[i].amount === undefined || this.offdedInsertList[i].amount === null) {
                    this.show(this.translateService.translate('ocdofacc.amountnotnullbillingprfileamount'), 'warn');
                    return;
                }
                if (this.offdedInsertList[i].frequencyCode === 'MONTHLY' && !this.offdedInsertList[i].dayOfMonth) {
                    this.show(this.translateService.translate('ocdofacc.billingdaymustbentered'), 'warn');
                    return;
                }

                if(this.offdedInsertList[i].backBill && this.offdedInsertList[i].backBill === 'Y'){
                    this.offdedInsertList[i].effectiveDate = this.offdedInsertList[i].startDate;
                    this.offdedInsertList[i].statusEffectiveDate = this.offdedInsertList[i].startDate;
                }
   if (this.offdedInsertList[i].startDate && this.vHeaderBlockModel.bookingBeginDate && (this.offdedInsertList[i].backBill ==='Y' || this.offdedInsertList[i].backBill ==='N')) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].startDate),
                    DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.feeaccountstartdatecannotbeearlierthantheoffendersadmissiondate'), 'warn');
                    return false;
    
                }
            }

                if(this.offdedInsertList[i].effectiveDate && this.offdedInsertList[i].statusEffectiveDate && (this.offdedInsertList[i].backBill ==='N')){
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].effectiveDate),
                    DateFormat.getDate(this.offdedInsertList[i].statusEffectiveDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatenotearlierthansupvstatuseffectivedate'), 'warn');
                    return false;

                } 

                if(this.offdedInsertList[i].effectiveDate && this.vHeaderBlockModel.bookingBeginDate && (this.offdedInsertList[i].backBill ==='N' || this.offdedInsertList[i].backBill ==='Y')){
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].effectiveDate),
                    DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatecannotbeearlierthantheoffendersadmissiondate'), 'warn');
                    return false;
                    }
    
                }

                 
    
                }

                if (this.offdedInsertList[i].expiryDate && this.offdedInsertList[i].startDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].expiryDate),
                        DateFormat.getDate(this.offdedInsertList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.expirydatecannotearlierstartdate'), 'warn');
                        return false;

                    }
                }

                if (this.longSupvDate && this.offdedInsertList[i].startDate && this.offdedInsertList[i].nonBillableStatus ==='Y' ) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.longSupvDate),
                        DateFormat.getDate(this.offdedInsertList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.longestsupervisionexpirydatecannotbeearlierthanstartdate'), 'warn');
                        return false;

                    }
                }

                if (this.offdedInsertList[i].frequencyType === 'ONE' && this.offdedInsertList[i].startDate && this.offdedInsertList[i].expiryDate){
                    if( DateFormat.compareDate(DateFormat.getDate(this.offdedInsertList[i].startDate),
                        DateFormat.getDate(this.offdedInsertList[i].expiryDate)) !== 0) {
                        this.show(this.translateService.translate('ocdofacc.feeacountexpiryssameassatrtdate'), 'warn');
                        return false;
                    }
                }

                if (( this.offdedInsertList[i].nonBillableStatus === 'Y'  && !this.offdedInsertList[i].effectiveDate)) {
                    this.show(this.translateService.translate('ocdofacc.effectivedatemustbeentered'), 'warn');
                    return false;
                }
                if(this.offdedInsertList[i].startDate){
                    this.offdedInsertList[i].startDate = DateFormat.getDate(this.offdedInsertList[i].startDate);
                }
                if(this.offdedInsertList[i].effectiveDate){
                    this.offdedInsertList[i].effectiveDate = DateFormat.getDate(this.offdedInsertList[i].effectiveDate);
                }
                if(this.offdedInsertList[i].expiryDate){
                    this.offdedInsertList[i].expiryDate = DateFormat.getDate(this.offdedInsertList[i].expiryDate);
                }
                if(this.offdedInsertList[i].statusEffectiveDate){
                    this.offdedInsertList[i].statusEffectiveDate = DateFormat.getDate(this.offdedInsertList[i].statusEffectiveDate);
                }
                if(this.offdedInsertList[i].serviceDate){
                    this.offdedInsertList[i].serviceDate = DateFormat.getDate(this.offdedInsertList[i].serviceDate);
                }

            }
            this.offdedCommitBean.insertList = this.offdedInsertList;
        }

        if (this.offdedUpdateList.length > 0) {
            this.offdedUpdateList.forEach(element => {
                element.modeOfTrans = 'UPDATE';
                element.isTriggerEnable =  element.isTriggerEnable ? 'Y' : 'N';
            });
            if (!this.offdedValidations(this.offdedUpdateList)) {
                return;
            }
            this.offdedUpdateList.forEach(element => {
                element.offenderBookId = this.vHeaderBlockModel.offenderBookId;
               // element.caseloadId = this.caseloadId;
            });
            
            for (let i = 0; i < this.offdedUpdateList.length; i++) {
                if (this.offdedUpdateList[i].amount === undefined || this.offdedUpdateList[i].amount === null) {
                    this.show(this.translateService.translate('ocdofacc.amountnotnullbillingprfileamount'), 'warn');
                    return;
                } 
                // else if (this.offdedUpdateList[i].amount === 0) {
                //     const lockFlagMessage = {
                //         label: this.translateService.translate('ocdofacc.doyougeneratebillforzero'), yesBtn: true, noBtn: true
                //     };
                //     this.dialogService.openLinkDialog('/oidshlogconfirmationpopup', lockFlagMessage, 55).subscribe(result => {
                //         if (!result) {
                //             return false;
                //         } else {

                //         }
                //     });
                // }
                if (this.offdedUpdateList[i].frequencyCode === 'MONTHLY' && !this.offdedUpdateList[i].dayOfMonth) {
                    this.show(this.translateService.translate('ocdofacc.billingdaymustbentered'), 'warn');
                    return;
                }
                if (this.offdedUpdateList[i].startDate && this.vHeaderBlockModel.bookingBeginDate && (this.offdedUpdateList[i].backBill ==='Y' || this.offdedUpdateList[i].backBill ==='N')) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].startDate),
                    DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.feeaccountstartdatecannotbeearlierthantheoffendersadmissiondate'), 'warn');
                    return false;
    
                }
            }

                if(this.offdedUpdateList[i].effectiveDate &&  (this.offdedUpdateList[i].backBill ==='Y')){
                    if(this.offdedUpdateList[i].supvPeriodDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].effectiveDate),
                        DateFormat.getDate(this.offdedUpdateList[i].supvPeriodDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatenotearlierthansupvstatuseffectivedate'), 'warn');
                        return false;
    
                    }
                }
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].effectiveDate),
                    DateFormat.getDate(this.offdedUpdateList[i].statusEffectiveDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatenotearlierthanstatuseffectivedate'), 'warn');
                    return false;

                } 
                }
                
                if(this.offdedUpdateList[i].effectiveDate && this.vHeaderBlockModel.bookingBeginDate && (this.offdedUpdateList[i].backBill ==='N' || this.offdedUpdateList[i].backBill ==='Y')){
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].effectiveDate),
                    DateFormat.getDate(this.vHeaderBlockModel.bookingBeginDate)) === -1) {
                    this.show(this.translateService.translate('ocdofacc.feeaccounteffectivedatecannotbeearlierthantheoffendersadmissiondate'), 'warn');
                    return false;
                    }
    
                }

                
                if (this.offdedUpdateList[i].expiryDate && this.offdedUpdateList[i].startDate) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].expiryDate),
                        DateFormat.getDate(this.offdedUpdateList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.expirydatecannotearlierstartdate'), 'warn');
                        return false;

                    }
                }

                if (this.longSupvDate && this.offdedUpdateList[i].startDate && this.offdedUpdateList[i].nonBillableStatus ==='Y' ) {
                    if (DateFormat.compareDate(DateFormat.getDate(this.longSupvDate),
                        DateFormat.getDate(this.offdedUpdateList[i].startDate)) === -1) {
                        this.show(this.translateService.translate('ocdofacc.longestsupervisionexpirydatecannotbeearlierthanstartdate'), 'warn');
                        return false;

                    }
                }
                // if (this.offdedUpdateList[i].expiryDate && this.offdedUpdateList[i].feeCode !== 'SUPV') {
                //     if ((DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].expiryDate),DateFormat.getDate(DateFormat.getDate())) === -1) || 
                //     (DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].expiryDate), DateFormat.getDate(DateFormat.getDate())) === 0)) {
                //         this.offdedUpdateList[i].feeActStatus = 'C'
                // }else{
                //     this.offdedUpdateList[i].feeActStatus = 'A'
                // }
                // }

                if (this.offdedUpdateList[i].frequencyType === 'ONE' && this.offdedUpdateList[i].startDate && this.offdedUpdateList[i].expiryDate){
                    if( DateFormat.compareDate(DateFormat.getDate(this.offdedUpdateList[i].startDate),
                         DateFormat.getDate(this.offdedUpdateList[i].expiryDate)) !== 0) {
                         this.show(this.translateService.translate('ocdofacc.feeacountexpiryssameassatrtdate'), 'warn');
                         return false;
                     }
                }

                if ((this.offdedUpdateList[i].nonBillableStatus === 'Y' && !this.offdedUpdateList[i].effectiveDate)) {
                    this.show(this.translateService.translate('ocdofacc.effectivedatemustbeentered'), 'warn');
                    return false;
                }
                if(this.offdedUpdateList[i].startDate){
                    this.offdedUpdateList[i].startDate = DateFormat.getDate(this.offdedUpdateList[i].startDate);
                }
                if(this.offdedUpdateList[i].effectiveDate){
                    this.offdedUpdateList[i].effectiveDate = DateFormat.getDate(this.offdedUpdateList[i].effectiveDate);
                }
                if(this.offdedUpdateList[i].expiryDate){
                    this.offdedUpdateList[i].expiryDate = DateFormat.getDate(this.offdedUpdateList[i].expiryDate);
                }
                if(this.offdedUpdateList[i].statusEffectiveDate){
                    this.offdedUpdateList[i].statusEffectiveDate = DateFormat.getDate(this.offdedUpdateList[i].statusEffectiveDate);
                }
                if(this.offdedUpdateList[i].serviceDate){
                    this.offdedUpdateList[i].serviceDate = DateFormat.getDate(this.offdedUpdateList[i].serviceDate);
                }
            }

            
            this.offdedCommitBean.updateList = this.offdedUpdateList;
        }

        if (this.offdedDeleteList.length > 0) {
            for (let i = 0; i < this.offdedDeleteList.length; i++) {
                if(this.offdedDeleteList[i].startDate){
                    this.offdedDeleteList[i].startDate = DateFormat.getDate(this.offdedDeleteList[i].startDate);
                }
                if(this.offdedDeleteList[i].effectiveDate){
                    this.offdedDeleteList[i].effectiveDate = DateFormat.getDate(this.offdedDeleteList[i].effectiveDate);
                }
                if(this.offdedDeleteList[i].expiryDate){
                    this.offdedDeleteList[i].expiryDate = DateFormat.getDate(this.offdedDeleteList[i].expiryDate);
                }
                if(this.offdedDeleteList[i].statusEffectiveDate){
                    this.offdedDeleteList[i].statusEffectiveDate = DateFormat.getDate(this.offdedDeleteList[i].statusEffectiveDate);
                }
                if(this.offdedDeleteList[i].serviceDate){
                    this.offdedDeleteList[i].serviceDate = DateFormat.getDate(this.offdedDeleteList[i].serviceDate);
                }
            }
            this.offdedCommitBean.deleteList = this.offdedDeleteList;
        }
        this.ocmofaccCommitBean.offdedCommitBean = this.offdedCommitBean;
        return true;
    }

    ocmfaproSavecslddbenForm(event) {
        if (!this.cslddbenValidations()) {
            return;
        }
        this.cslddbenInsertList = event.added;
        this.cslddbenUpdateList = event.updated;
        this.cslddbenDeleteList = event.removed;
        this.cslddbenCommitBean.insertList = [];
        this.cslddbenCommitBean.updateList = [];
        this.cslddbenCommitBean.deleteList = [];

        this.cslddbenInsertList.forEach(data => {
            data.caseloadId = this.offdedModel.caseloadId;
            data.deductionType = this.offdedModel.feeCode;
            data.percent = Number(data['dspPercent']);
            data.maxTotalAmount = this.offdedModel.amount;
            data.maxTotalAmount = this.offdedModel.amount;
            if(this.offdedModel.createDatetime &&  (this.offenderFeeId === 0 || this.offenderFeeId === undefined)){
                data.offenderFeeId =  this.offdedModel.offenderFeeId;
            } else {
                data.offenderFeeId = this.offdedModel.offenderFeeIdTemp;
            }
         //   data.offenderFeeId = this.offenderFeeId ? this.offenderFeeId : this.offdedModel.offenderFeeId;
        });
        this.cslddbenUpdateList.forEach(data => {
            data.percent = Number(data['dspPercent']);
            data.maxTotalAmount = this.offdedModel.amount;
        });
        this.cslddbenDeleteList.forEach(data => {
            data.caseloadId = this.offdedModel.caseloadId;
                data.deductionType = this.offdedModel.feeCode;
        });
        this.cslddbenCommitBean.insertList = this.cslddbenInsertList;
        this.cslddbenCommitBean.updateList = this.cslddbenUpdateList;
        this.cslddbenCommitBean.deleteList = this.cslddbenDeleteList;
        this.ocmofaccCommitBean.cslddbenCommitBean = this.cslddbenCommitBean;
        return true;
    }

    ocmfaproSavecsldddForm(event) {
        if (!this.csldddvalidations()) {
            return false;
        }
        this.csldddInsertList = event.added;
        this.csldddUpdateList = event.updated;
        this.csldddDeleteList = event.removed;
        this.csldddCommitBean.insertList = [];
        this.csldddCommitBean.updateList = [];
        this.csldddCommitBean.deleteList = [];

        this.csldddInsertList.forEach(data => {
            data.caseloadId = this.offdedModel.caseloadId;
            data.deductionType = this.offdedModel.feeCode;
            if (this.offdedModel.createDatetime && (this.offenderFeeId === 0 || this.offenderFeeId === undefined)) {
                data.offenderFeeId =  this.offdedModel.offenderFeeId;
            } else {
                data.offenderFeeId = this.offdedModel.offenderFeeIdTemp;
            }
        });
        this.csldddUpdateList.forEach(data => {
            data.caseloadId = this.offdedModel.caseloadId;
            data.deductionType = this.offdedModel.feeCode;
        });
        this.csldddDeleteList.forEach(ele => {
            ele.caseloadId = this.offdedModel.caseloadId;
            ele.caseloadType = this.caseloadtype;
            ele.deductionType = this.cslddpModelDup.deductionType;
        });

        this.csldddCommitBean.insertList = this.csldddInsertList;
        this.csldddCommitBean.updateList = this.csldddUpdateList;
        this.csldddCommitBean.deleteList = this.csldddDeleteList;
        this.ocmofaccCommitBean.csldddCommitBean = this.csldddCommitBean;

        return true;
    }



    offdedPrevExecteQuery() {
        this.offdedModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdofaccFactory.offdedPrevExecteQuery(this.offdedModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.offdedDataPrev = [];
                this.cslddbenDataPrev = [];
                this.csldddData = [];
            } else {
                this.offdedDataPrev = data;
                this.offdedModelTemp = data[0];
                this.tableIndexPrev = 0;
            }
        });
    }
    caseloadFeeDedPrevBenficExecuteQuery() {
        this.cslddbenModelPrev.offenderFeeId = this.offdedModelTemp.offenderFeeId;
        const cslddbenResult = this.ocdofaccFactory.caseloadFeeDedBenficExecuteQuery(this.cslddbenModelPrev);
        cslddbenResult.subscribe(cslddbenResultList => {
            if (cslddbenResultList.length === 0) {
                this.cslddbenDataPrev = [];
            } else {
                cslddbenResultList.forEach(ele => {
                    if (ele.corporateId) {
                        ele.corporateIdTemp = ele.corporateId;
                    }

                    if (ele.personId) {
                        ele.personIdTemp = ele.personId;
                    }
                    ele.personId2 = '...';
                    ele.corporateId2 = '...';
                    if (ele.percent) {
                        ele.dspPercent = Number(ele.percent);
                    } else {
                        ele.dspPercent = '0';
                    }
                });
                this.cslddbenDataPrev = cslddbenResultList;
                this.cslddbenModelPrev = cslddbenResultList[0];
                this.tableIndexben = 0;
            }
        });
    }



    caseloadFeeDetPrevExecuteQuery() {
        this.csldddModelPrev.offenderFeeId = this.offdedModelTemp.offenderFeeId;
        const csldddResult = this.ocdofaccFactory.caseloadFeeDetPrevExecuteQuery(this.csldddModelPrev);
        csldddResult.subscribe(csldddResultList => {
            if (csldddResultList.length === 0) {
                this.csldddDataPrev = [];
            } else {
                this.csldddDataPrev = csldddResultList;
                this.csldddModelPrev = csldddResultList[0];
                this.tableIndexDed = 0;
            }
        });
    }

    supHistoryExecuteQuery() {
      /*   this.supHtyModel = new SupervisionStatusHsty();
        const rowIndex = this.offdedData.indexOf(this.offdedModel);
         this.supHtyModel.caseloadId = this.sessionManager.currentCaseLoad;
        this.supHtyModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        const serviceObj = this.ocdsupstFactory.supHistoryExecuteQuery(this.supHtyModel);
        serviceObj.subscribe(data => {
          if (data.length === 0) {
            this.offdedGrid.setColumnData('startDate', rowIndex, DateFormat.getDate());
            this.offdedGrid.setColumnData('effectiveDate', rowIndex, DateFormat.getDate());
          } else {
            this.offdedGrid.setColumnData('startDate', rowIndex, DateFormat.getDate(data[0].startDate));
            this.offdedGrid.setColumnData('effectiveDate', rowIndex, DateFormat.getDate(data[0].startDate));
          }
        }); */
      }

      get longSupvShowPrev() {
        if (this.offdedModelTemp.longestSupvExpDate) {
            return true;
        } else {
            return false;
        }
    }
      
      get longSupvShow() {
          if (this.offdedModel.nonBillableStatus === 'Y') {
           // this.longestSupvReadOnly = false;
              return false;
          } else {
              return true;
          }
      }


      supvDateValidate() {
        if (this.offdedModel.nonBillableStatus === 'Y') {
            return;
        } else {
            if (this.offdedModel.nonBillableStatus === 'N'){
                this.show(this.translateService.translate('ocdofacc.youcanaddorupdateonlyforsupervisionfeeaccountrecords'), 'warn');
                return;
            } else {
                return;
            }
        }
  }


  offagyExecuteQuery() {
    this.offagyModel = new OffenderBookingAgyLocs();
    this.offagyModel.caseloadId = this.sessionManager.currentCaseLoad;
    this.offagyModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
    const serviceObj = this.ocdsupstFactory.offagyExecuteQuery(this.offagyModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.offagyData = [];
       
      } else {
        this.offagyData = data;
      }
    });
  }

 onTransDetailsClick = () => { 
     if(this.vHeaderBlockModel.offenderBookId){
         this.offdedModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;   
     }
     if(this.vHeaderBlockModel.rootOffenderId){
        this.offdedModel.rootOffenderId = this.vHeaderBlockModel.rootOffenderId;   
    }
   this.dialogService.openLinkDialog('/OCUTRDET', this.offdedModel, 80).subscribe(result => {
   });
}

onFeeOverdPrevClick = () => {  
    this.offdedModelTemp.isInsertEnable ='N';
        this.dialogService.openLinkDialog('/OCUFOVDT', this.offdedModelTemp, 80).subscribe(result => {
        });
    }

    onTransDetailsPrevClick = () => {    
        this.dialogService.openLinkDialog('/OCUTRDET', this.offdedModelTemp, 80).subscribe(result => {
        });
     }

     onFeeStatusHistoryPrevClick = () => {
        this.childPopulatingModelPrev=new FeeAccountProfiles();
        this.childPopulatingModelPrev = this.offdedModelTemp;
        if(this.childPopulatingModelPrev.nonBillableStatus === 'Y') {
            this.childPopulatingModelPrev.longestSupvExpDate =this.offdedModelTemp.longestSupvExpDate;
        }
        this.dialogService.openLinkDialog('/OCUACHIS', this.childPopulatingModelPrev, 80).subscribe(result => {
        });
    }

    getOffenderEventDate(){
        const eventDateServObj = this.ocdofaccFactory.getOffenderEventDate(this.vHeaderBlockModel.offenderBookId);
        eventDateServObj.subscribe(data =>{
            if(data){
                this.offenderEventDate = data;
            }else{
                this.offenderEventDate = undefined;
            }
        });
    }
}
