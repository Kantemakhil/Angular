import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OtmcfeesService } from '../service/otmcfees.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OcmfaproService } from '../service/ocmfapro.service';
import { CaseloadDeductionProfiles } from '@inmate/trust/checks/beans/CaseloadDeductionProfiles';
import { CaseloadDeductionProfilesCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionProfilesCommitBean';
import { CaseloadDedBeneficiaries } from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiaries';
import { CaseloadDeductionDetails } from '@inmate/trust/checks/beans/CaseloadDeductionDetails';
import { CaseloadDedBeneficiariesCommitBean } from '@inmate/trust/deductions/deductionsmaintenance/beans/CaseloadDedBeneficiariesCommitBean';
import { CaseloadDeductionDetailsCommitBean } from '@inmate/trust/checks/beans/CaseloadDeductionDetailsCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OcmfaproCommitBean } from '../../beans/OcmfaproCommitBean';
import { SystemProfiles } from '@common/beans/SystemProfiles';

@Component({
    selector: 'app-ocmfapro',
    templateUrl: './ocmfapro.component.html'
})

export class OcmfaproComponent implements OnInit {
    @ViewChild('cdpgrid', {static: true}) cdpgrid: any;
    @ViewChild('csldDbenGrid', {static: true}) csldDbenGrid: any;
    @ViewChild('csldDdGrid', {static: true}) csldDdGrid: any;
    msgs: any[] = [];
    nameOfLovPage: string;
    caseDedProfColumnDef: any[] = [];
    caseDedBenfColumnDef: any[] = [];
    caseDedDetColumnDef: any[] = [];
    cslddpData: CaseloadDeductionProfiles[] = [];
    cslddpDataTemp: CaseloadDeductionProfiles[] = [];
    cslddpModelDup: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpModel: CaseloadDeductionProfiles = new CaseloadDeductionProfiles();
    cslddpIndex: number;
    cslddpInsertList: CaseloadDeductionProfiles[] = [];
    cslddpUpdatetList: CaseloadDeductionProfiles[] = [];
    cslddpDeleteList: CaseloadDeductionProfiles[] = [];
    cslddpCommitModel: CaseloadDeductionProfilesCommitBean = new CaseloadDeductionProfilesCommitBean();
    cslddbenData: CaseloadDedBeneficiaries[] = [];
    cslddbenDataTemp: any = [];
    cslddbenModel: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    cslddbenSelect: number;
    cslddbenModelSelected: CaseloadDedBeneficiaries = new CaseloadDedBeneficiaries();
    cslddbenInsertList: CaseloadDedBeneficiaries[] = [];
    cslddbenUpdatetList: CaseloadDedBeneficiaries[] = [];
    cslddbenDeleteList: CaseloadDedBeneficiaries[] = [];
    csldddData: CaseloadDeductionDetails[] = [];
    csldddDataTemp: CaseloadDeductionDetails[] = [];
    cslddbenCommitModel: CaseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
    csldddModel: CaseloadDeductionDetails = new CaseloadDeductionDetails();
    csldddModelSelected: CaseloadDeductionDetails = new CaseloadDeductionDetails();
    csldddSelect: number;
    csldddInsertList: CaseloadDeductionDetails[] = [];
    csldddUpdatetList: CaseloadDeductionDetails[] = [];
    csldddDeleteList: CaseloadDeductionDetails[] = [];
    csldddCommitModel: CaseloadDeductionDetailsCommitBean = new CaseloadDeductionDetailsCommitBean();
    ocmfaproCommitBean: OcmfaproCommitBean = new OcmfaproCommitBean();
    caseloadId: string;
    caseloadtype: string;
    deductionType: string;
    agyLocType: string;
    benDedFlag: boolean;
    profileFlag: boolean;
    deleteFlag: boolean;
    systemProfModel: SystemProfiles = new SystemProfiles();
    maxDay: number;
    receiptEnable: boolean;
    forAllOffenderFlag: boolean;

    constructor(private otmcfeesFactory: OtmcfeesService, public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService,
        private ocmfaproFactory: OcmfaproService) {
        this.caseloadId = this.sessionManager.currentCaseLoad;
        this.caseloadtype = this.sessionManager.currentCaseLoadType;

    }
    ngOnInit() {

        this.getMaxDay();
        this.caseDedProfColumnDef = [];
        this.caseDedBenfColumnDef = [];
        this.caseDedDetColumnDef = [];

        const creditDedToLink = `ocmfapro/creditDedToRecordGroup?caseloadType=${this.caseloadtype}`;

        this.caseDedProfColumnDef = [
            // {
            //     fieldName: this.translateService.translate('common.locationmandatory'), field: 'location', editable: true,
            //     width: 150, datatype: 'lov', link: 'ocmfapro/locationRecordGroup?agyLocType=', parentField: 'agyLocType'
            // },
            {
                fieldName: this.translateService.translate('ocmfapro.feeaccounttype'), field: 'deductionType', required: true,
                editable: true, width: 150, datatype: 'lov', link: 'ocmfapro/freeActTypeRecordGroup', cellEditable: this.canCellEditFee
            },
            {
                fieldName: this.translateService.translate('ocmfapro.creditdeductionto'), field: 'accountCode',
                editable: true, width: 150, datatype: 'lov', link: creditDedToLink
            },
            {
                fieldName: this.translateService.translate('common.amountmandatory'), field: 'amount',
                editable: true, width: 150, datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('ocmfapro.frequency'), field: 'frequencyType',
                editable: true, width: 150, datatype: 'lov', domain: 'FEE_ACT_FREQ', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.code'), field: 'frequencyCode', editable: true, width: 150,
                datatype: 'lov', domain: 'RECUR_FREQ', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('ocmfapro.billingday'), field: 'dayOfMonth', editable: true, width: 150,
                datatype: 'number', whole: true, maxValue: this.maxDay, minValue: 1, cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('common.effectivedatemandatory'), field: 'effectiveDate', editable: true,
                width: 150, datatype: 'date', cellEditable: this.canCellEditEffDate
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('ocmfapro.calculateon'), field: 'nbtModifyUserId',
                editable: false, width: 150, datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocmfapro.foralloffenders'), field: 'foAlAllOffenderFlag',
                 width: 150, datatype: 'checkbox',cellEditable: this.canForAllOffenerFlagNew
            },
            {
                fieldName: this.translateService.translate('ocmfapro.nonbillablestatus'), field: 'nonBillableStatus',
                 width: 150, datatype: 'checkbox',cellEditable: this.canForAllOffenerFlag
            },
            {
                fieldName: this.translateService.translate('ocmfapro.backbill'), field: 'backBill',
                width: 150, datatype: 'checkbox',cellEditable: this.canBackBillFlag
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
        ];

        this.caseDedBenfColumnDef = [
            {
                fieldName: this.translateService.translate('common.personid'), field: 'personId', editable: true,
                datatype: 'number', maxValue: 99999999999, maxlength: '11'
            },
            {
                fieldName: '', field: 'personId2', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'search', data: 'row', updateField: 'row',
                link: 'osipserdialog', onLaunchClick: this.onPersonClick
            },
            { fieldName: this.translateService.translate('common.lastname'), field: 'dspLastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.firstname'), field: 'dspFirstName', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('ocmfapro.corporateid'), field: 'corporateId', editable: true,
                datatype: 'number', maxValue: 99999999999, maxlength: '11'
            },
            {
                fieldName: '', field: 'corporateId2', datatype: 'hyperlink', editable: true, displayas: 'href',
                modal: true, dialogWidth: '80%', styleClass: 'search', data: 'row', updateField: 'row',
                link: 'OTUCPAYE', onLaunchClick: this.onCorporateClick
            },
            {
                fieldName: this.translateService.translate('ocmfapro.corporatename'), field: 'dspCorporateName', editable: false,
                width: 150
            },
            { fieldName: this.translateService.translate('ocmfapro.priority'), field: 'priority', editable: true, width: 150, whole: true, datatype: 'number', maxValue: 999 },
            { fieldName: this.translateService.translate('ocmfapro.percentagecommon'), required:true, field: 'dspPercent', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.amountmandatory'), field: 'amount', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, strictFP: true, whole: true
            },
        ];

        const receiptTxnType = `ocmfapro/reciptTypeRecordGroup?caseloadType=${this.caseloadtype}`;
        this.caseDedDetColumnDef = [
            {
                fieldName: this.translateService.translate('ocmfapro.recipttype'), field: 'receiptTxnType', editable: true, width: 150,
                datatype: 'lov', link: receiptTxnType, maxlength: '25', required:true, cellEditable: this.recieptGridEditable
            },
            {
                fieldName: this.translateService.translate('ocmfapro.percentagecommon'), field: 'percentage',
                editable: true, width: 150,  datatype: 'number', whole: true, maxValue: 100, cellEditable: this.recieptGridEditable
            },
            {
                fieldName: this.translateService.translate('ocmfapro.flatrate'), field: 'flatRate', editable: true, width: 150,
                datatype: 'number', format: '1.2-2', maxValue: 999999999.99, whole: true, cellEditable: this.recieptGridEditable
            }
        ];
        this.benDedFlag = false;
        this.profileFlag = false;
        this.deleteFlag = false;
        this.sysPflExecuteQuery();
      //  this.sysPf2ExecuteQuery();
        this.csldDpExecuteQuery();
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

    sysPflExecuteQuery() {
        this.ocmfaproFactory.sysPflExecuteQuery().subscribe(data => {
            if (data.length > 0) {
                this.systemProfModel = data[0];
                if (this.systemProfModel.profileValue === 'Y' || this.systemProfModel.profileValue === 'y') {
                    this.receiptEnable = true;
                } else {
                    this.receiptEnable = false;
                }
            } else {
                this.systemProfModel = new SystemProfiles();
                this.systemProfModel.profileValue = 'Y';
                this.receiptEnable = true;
            }
        });
    }

    sysPf2ExecuteQuery() {
        this.ocmfaproFactory.sysPfl2ExecuteQuery().subscribe(data => {
            if (data.length > 0) {
                this.systemProfModel = data[0];
                if (this.systemProfModel.profileValue === 'Y' || this.systemProfModel.profileValue === 'y') {
                    this.forAllOffenderFlag = true;
                } else {
                    this.forAllOffenderFlag = false;
                }
            } else {
                this.systemProfModel = new SystemProfiles();
                this.systemProfModel.profileValue = 'N';
                this.forAllOffenderFlag = false;
            }
        });
    }

    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }

    recieptGridEditable = (data: any, index: number, field: string): boolean => {
        if (this.systemProfModel.profileValue === 'Y' || this.systemProfModel.profileValue === 'y') {
            return true;
        } else {
            return false;
        }
    }

    canForAllOffenerFlag = (data: any, index: number, field: string): boolean => {
        /* if(this.systemProfModel && (this.systemProfModel.profileValue === 'N' || this.systemProfModel.profileValue === 'n')){
            return false;
        } */
		// if(data.deductionType === 'SUPV'){
		// 	return true;
		// }else{
		// 	return false;
		// }
        return true;
	}

    canBackBillFlag = (data: any, index: number, field: string): boolean => {
        if(data.nonBillableStatus){
            return true;
        }
        return false;
	}

    canForAllOffenerFlagNew = (data: any, index: number, field: string): boolean => {
        
		// if(data.activeFlag === true){
		// 	return true;
		// }else{
		// 	return false;
		// }
        return true;
	}

    canCellEdit = (data: any, index: number, field: string) => {
        if (field === 'frequencyCode' && data.frequencyType === 'RECUR' && !data.createDateTime) {
            return true;
        }
        if (field === 'frequencyType' && !data.createDateTime) {
            return true;
        }
        if (field === 'dayOfMonth' && data.frequencyCode === 'MONTHLY') {
            return true;
        }
        return false;
    }
    canCellEditFee = (data: any, index: number, field: string) => {
        if (!data.createDateTime) {
            return true;
        } else {
            return false;
        }

    }

    canCellEditEffDate = (data: any, index: number, field: string) => {
        if (!data.createDateTime) {
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
            { forwardToDialog: true, person: { pPersonId: null, pSearchType: 'N' } } :
            { forwardToDialog: true, person: { pPersonId: null, pSearchType: 'N' } };

        this.dialogService.openLinkDialog('osipserdialog', reqData).subscribe(resData => {
            if (resData) {
                this.addPersonValue(resData, index);
            }
        });

    }

    addPersonValue(data, index) {
        if (data) {
            this.csldDbenGrid.setColumnData('personId', index, data.personId);
            this.csldDbenGrid.setColumnData('dspLastName', index, data.lastName);
            this.csldDbenGrid.setColumnData('dspFirstName', index, data.firstName);
            this.csldDbenGrid.setColumnData('corporateId', index, null);
            this.csldDbenGrid.setColumnData('dspCorporateName', index, null);
        }
    }

    validatePersonId(personId, index) {
        this.ocmfaproFactory.cgfkchkCsldDbenCsldDben(personId).subscribe(data => {
            if (data && data.personId) {
                this.addPersonValue(data, index);
            } else {
                this.show(`Person ID: ${personId} does not exist.`);
                this.csldDbenGrid.setColumnData('personId', index, null);
                this.csldDbenGrid.setColumnData('dspLastName', index, null);
                this.csldDbenGrid.setColumnData('dspFirstName', index, null);
            }
        });
    }

    validateCorporateId(corporateId, index) {
        this.ocmfaproFactory.cgfkchkCsldDbenCsldDbenC(corporateId).subscribe(data => {
            if (data && data.corporateId) {
                this.addcorporatValue(data, index);
            } else {
                this.show(`Corporate ID: ${corporateId} does not exist.`);
               // this.show('ocmfapro.invalidvalueforfieldcorporateid');
                this.csldDbenGrid.setColumnData('corporateId', index, null);
                this.csldDbenGrid.setColumnData('dspCorporateName', index, null);
            }
        });
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
                this.csldDbenGrid.setColumnData('corporateId', index, data.corporateId);
                this.csldDbenGrid.setColumnData('personId', index, null);
                this.csldDbenGrid.setColumnData('dspLastName', index, null);
                this.csldDbenGrid.setColumnData('dspFirstName', index, null);
            }
            if (data.corporateName) {
                this.csldDbenGrid.setColumnData('dspCorporateName', index, data.corporateName);
            }
            if (data.corpName) {
                this.csldDbenGrid.setColumnData('dspCorporateName', index, data.corpName);
            }
        }
    }

    deductionTypeChange(event) {
        if (event) {
            this.deductionType = event.code;
            this.cslddpModel.deductionType = this.deductionType;
            this.csldDpExecuteQuery();
        }
    }

    oncsldDproInsert = () => {
        if (!this.validateCdpro()) {
            return;
        }
        this.cslddbenData = [];
        this.csldddData = [];
        return { effectiveDate: DateFormat.getDate(), activeFlag: true, agyLocType: this.sessionManager.currentCaseLoadType };
    }

    oncsldDbenInsert = () => {
        if (!this.validateCdben()) {
            return;
        }
        const data = {
            personId: null, personId2: '', dspLastName: null, dspFirstName: null, corporateId: null, corporateId2: '',
            dspCorporateName: null, priority: null, dspPercent: '100'
        };
        return data;
    }

    oncsldDdedInsert = () => {
        if (!this.validateCdDet()) {
            return;
        }
        return {};
    }

    oncsldDproDelete = () => {
        if (this.cslddbenData.length !== 0) {
            this.show('ocmfapro.cannotdeletecaseloadwhiledependentcdbexists');
            return;
        }
        this.deleteFlag = true;
        return true;
    }
    oncsldDbenDelete = () => {
        return true;
    }
    oncsldDdetDelete = () => {
        return true;
    }

    oncsldDproClear = () => {
        this.csldDpExecuteQuery();
        return true;
    }
    oncsldDbenClear = () => {
        return true;
    }
    oncsldDdetClear = () => {
        return true;
    }

    validateRowDataCdp = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;

        rowdata.validated = true;

        if (event.field === 'deductionType') {
            this.cslddpModelDup.deductionType = event.data.deductionType;
            this.cslddpModelDup.amount = event.data.amount;

            this.ocmfaproFactory.calculateOn(this.cslddpModelDup.deductionType).subscribe(data => {
                if (data) {
                    this.cdpgrid.setColumnData('nbtModifyUserId', rowIndex, data);
                }
            })

            // if (this.forAllOffenderFlag) {
            //     this.cdpgrid.setColumnData('foAlAllOffenderFlag', rowIndex, true);
            // } else {
            //     this.cdpgrid.setColumnData('foAlAllOffenderFlag', rowIndex, false);
            // }

            rowdata.validated = true;
            return rowdata;
        }

        if (event.field === 'amount') {
            this.cslddpModelDup.amount = event.data.amount;
            rowdata.validated = true;
            return rowdata;
        }

        if (event.field === 'frequencyType') {
            if (event.data.frequencyType === 'ONE') {
                this.cdpgrid.setColumnData('frequencyCode', rowIndex, undefined);
                this.cdpgrid.setColumnData('dayOfMonth', rowIndex, undefined);

                this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['frequencyCode'].includes(obj.colId) ) {
						this.caseDedProfColumnDef[5].required = false;
						obj.colDef.headerClass = '';
						this.cdpgrid.gridApi.refreshHeader();
					}
                    if ( ['dayOfMonth'].includes(obj.colId) ) {
						this.caseDedProfColumnDef[6].required = false;
						obj.colDef.headerClass = '';
						this.cdpgrid.gridApi.refreshHeader();
					}
				});

                rowdata.validated = true;
                return rowdata;
            }  else if (event.data.frequencyType === 'RECUR') {

             this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['frequencyCode'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[5].required = true;
                    obj.colDef.headerClass = 'header-col';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });

                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'frequencyCode') {
            if (event.data.frequencyCode === 'DAILY') {
                this.cdpgrid.setColumnData('dayOfMonth', rowIndex, undefined);

            this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['dayOfMonth'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[6].required = false;
                    obj.colDef.headerClass = '';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });

                rowdata.validated = true;
                return rowdata;
            } else if (event.data.frequencyCode === 'MONTHLY') {

            this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['dayOfMonth'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[6].required = true;
                    obj.colDef.headerClass = 'header-col';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });
                rowdata.validated = true;
                return rowdata;
            }
        }
        // if (event.field === 'foAlAllOffenderFlag') {
        //     if (this.systemProfModel && this.systemProfModel.profileValue === 'Y') {
        //         rowdata.validated = true;
        //         return rowdata;
        //     } else {
        //         this.cdpgrid.setColumnData('foAlAllOffenderFlag', rowIndex, undefined);
        //         rowdata.validated = true;
        //         return rowdata;
        //     }
        // }

        // let countForAll = 0;
        // if (event.field === 'foAlAllOffenderFlag' && event.data.foAlAllOffenderFlag === true) {
        //     for (let i = 0; i < this.cslddpData.length; i++) {
        //         if (this.cslddpData[i].foAlAllOffenderFlag) {
        //             countForAll = countForAll + 1;
        //         }
        //     }
        //     if (countForAll > 1) {
        //         this.cdpgrid.setColumnData('foAlAllOffenderFlag', this.cslddpData.indexOf(event.data), false);
        //         this.show('ocmfapro.pleasemodifiytheexistingsupervisionaccount');
        //         rowdata.validated = false;
        //         return rowdata;
        //     }
        // }

        let count = 0;
        if (event.field === 'nonBillableStatus') {
            for (let i = 0; i < this.cslddpData.length; i++) {
                if (this.cslddpData[i].nonBillableStatus) {
                    count = count + 1;
                }
            }
            if (count > 1) {
                this.cdpgrid.setColumnData('nonBillableStatus', event.rowIndex, false);
                this.show('ocmfapro.pleasemodifiytheexistingsupervisionaccount');
                rowdata.validated = true;
                return rowdata;
            }
            if(!event.data.nonBillableStatus){
                this.cdpgrid.setColumnData('backBill', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }

        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.cdpgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.cdpgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        return rowdata;
    }

    csldDbenValidate = (event) => {
        const rowdata = new ValidateRowReturn();
        const index = event.rowIndex;
        rowdata.validated = true;
        if (String(event.newValue) !== String(event.oldValue)) {
            if (event.field === 'personId') {
                if (event.newValue) {
                    this.validatePersonId(Number(event.newValue), index);
                } else {
                    this.csldDbenGrid.setColumnData('dspLastName', index, null);
                    this.csldDbenGrid.setColumnData('dspFirstName', index, null);
                }
            } if (event.field === 'corporateId') {
                if (event.newValue) {
                    this.validateCorporateId(Number(event.newValue), index);
                } else {
                    this.csldDbenGrid.setColumnData('dspCorporateName', index, null);
                }
            } if (event.field === 'priority') {
                if (event.newValue) {
                    if (!(Number(event.newValue) >= 1 && Number(event.newValue) <= 999)) {
                        this.show('ocmfapro.prioritymustbeinrange');
                        this.csldDbenGrid.setColumnData('priority', index, null);
                    }
                }
            }
        }
        return rowdata;
    }

    onRowClickcdp(event) {
        if (event && event.deductionType && !this.deleteFlag) {
            this.cslddpModelDup = event;

            this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['frequencyCode'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[5].required = false;
                    obj.colDef.headerClass = '';
                    this.cdpgrid.gridApi.refreshHeader();
                }
                if ( ['dayOfMonth'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[6].required = false;
                    obj.colDef.headerClass = '';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });

            if (this.cslddpModelDup.frequencyType === 'ONE') {

                this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['frequencyCode'].includes(obj.colId) ) {
						this.caseDedProfColumnDef[5].required = false;
						obj.colDef.headerClass = '';
						this.cdpgrid.gridApi.refreshHeader();
					}
                    if ( ['dayOfMonth'].includes(obj.colId) ) {
						this.caseDedProfColumnDef[6].required = false;
						obj.colDef.headerClass = '';
						this.cdpgrid.gridApi.refreshHeader();
					}
				});

            }  else if (this.cslddpModelDup.frequencyType === 'RECUR') {

              this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['frequencyCode'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[5].required = true;
                    obj.colDef.headerClass = 'header-col';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });

            }

            if (this.cslddpModelDup.frequencyCode === 'DAILY') {

              this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['dayOfMonth'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[6].required = false;
                    obj.colDef.headerClass = '';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });

            } else if (this.cslddpModelDup.frequencyCode === 'MONTHLY') {

              this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['dayOfMonth'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[6].required = true;
                    obj.colDef.headerClass = 'header-col';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });

            }

            this.cslddbenExecuteQuery();
            this.csldddExecuteQuery();
        } else {
            this.cslddpModelDup = new CaseloadDeductionProfiles();

            this.cdpgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
                if ( ['frequencyCode'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[5].required = false;
                    obj.colDef.headerClass = '';
                    this.cdpgrid.gridApi.refreshHeader();
                }
                if ( ['dayOfMonth'].includes(obj.colId) ) {
                    this.caseDedProfColumnDef[6].required = false;
                    obj.colDef.headerClass = '';
                    this.cdpgrid.gridApi.refreshHeader();
                }
            });
        }
        // this.cslddbenData = [];
        // this.csldddData = [];

    }
    onRowClickcdb(event) {
        if (event) {
            this.cslddbenModelSelected = event;
            } else {
                this.cslddbenModelSelected = new CaseloadDedBeneficiaries();
            }
    }
    onRowClickcdd(event) {
        if (event) {
            this.csldddModelSelected = event;
            } else {
                this.csldddModelSelected = new CaseloadDeductionDetails();
            }
    }

    csldDpExecuteQuery() {
        this.cslddpModel.caseloadId = this.caseloadId;
        this.cslddpModel.caseloadType = this.caseloadtype;
        const serviceObj = this.ocmfaproFactory.csldDpExecuteQuery(this.cslddpModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.cslddpData = [];
                this.cslddbenData = [];
                this.csldddData = [];
                this.deleteFlag = false;
            }  else {
                data.forEach(ele => {
                    ele.agyLocType = this.sessionManager.currentCaseLoadType;
                    ele.backBill = ele.backBill === 'Y' ? true : null;
                    ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag === 'Y' ? true : null;
                    ele.nonBillableStatus = ele.nonBillableStatus === 'Y' ? true : null;
                    ele.activeFlag = ele.activeFlag === 'Y' ? true : null;
                    ele.accountCode = String(ele.accountCode);
                });
                this.deleteFlag = false;
                this.cslddpData = data;
                this.cslddpIndex = 0;
            }
        });
    }

    cslddbenExecuteQuery() {
        this.cslddbenModel.caseloadId = this.caseloadId;
        this.cslddbenModel.deductionType = this.cslddpModelDup.deductionType;
        const cslddbenResult = this.ocmfaproFactory.csldDbenExecuteQuery(this.cslddbenModel);
        cslddbenResult.subscribe(cslddbenResultList => {
            if (cslddbenResultList.length === 0) {
                this.cslddbenData = [];
            } else {
                cslddbenResultList.forEach(ele => {
                    ele.personId2 = '';
                    ele.corporateId2 = '';
                    if (ele.percent) {
                        ele.dspPercent = Number(ele.percent);
                    } else {
                        ele.dspPercent = '0';
                    }
                });
                this.cslddbenData = cslddbenResultList;
                this.cslddbenSelect = 0;
            }
        });
    }

    csldddExecuteQuery() {
        this.csldddModel.caseloadId = this.caseloadId;
        this.csldddModel.deductionType = this.cslddpModelDup.deductionType;
        const csldddResult = this.ocmfaproFactory.csldDdExecuteQuery(this.csldddModel);
        csldddResult.subscribe(csldddResultList => {
            if (csldddResultList.length === 0) {
                this.csldddData = [];
            } else {
                this.csldddData = csldddResultList;
                this.csldddSelect = 0;
            }
        });
    }

    isNull(value) {
        return value === null || value === undefined || value === '';
    }

    validateCdpro() {
        this.cslddpDataTemp = [];
        this.cdpgrid.addedMap.forEach(
            (v: any, k: number) => {
                this.cslddpDataTemp.push(v);
            }
        );
        this.cdpgrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.cslddpDataTemp.push(v);
            }
        );
        const isvalid = { valid: true };
        if (this.cslddpDataTemp && Array.isArray(this.cslddpDataTemp)) {
            this.cslddpDataTemp.forEach(ele => {
                if (this.isNull(ele.deductionType)) {
                    this.show('ocmfapro.feeaccounttypemustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.accountCode)) {
                    this.show('ocmfapro.creditdeductiontomustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.amount)) {
                    this.show('ocmfapro.amountmustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.frequencyType)) {
                    this.show('ocmfapro.frequencymustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.effectiveDate)) {
                    this.show('ocmfapro.effectivedatemustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (ele.frequencyType === 'RECUR') {
                    if (this.isNull(ele.frequencyCode)) {
                        this.show('ocmfapro.codemustbeentered');
                        isvalid.valid = false;
                        return;
                    }
                }
                if (ele.frequencyCode === 'MONTHLY') {
                    if (this.isNull(ele.dayOfMonth)) {
                        this.show('ocmfapro.billingdaymustbeentered');
                        isvalid.valid = false;
                        return;
                    }
                }
            });

        }
        return isvalid.valid;
    }

    validateCdben() {
        this.cslddbenDataTemp = [];
        this.csldDbenGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.cslddbenDataTemp.push(v);
            }
        );
        this.csldDbenGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.cslddbenDataTemp.push(v);
            }
        );
        const isvalid = { valid: true };

        if (this.cslddbenDataTemp && Array.isArray(this.cslddbenDataTemp)) {
            this.cslddbenDataTemp.forEach(ele => {
                if (this.isNull(ele.priority)) {
                    this.show('ocmfapro.prioritymustbeenter');
                    isvalid.valid = false;
                    return;
                }
                if (!(Number(ele.priority) >= 1 && Number(ele.priority) <= 999)) {
                    this.show('ocmfapro.prioritymustbeinrange');
                    isvalid.valid = false;
                    return;
                }
                if (!ele.dspPercent) {
                    this.show('ocmfapro.percentagemustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (this.isNull(ele.amount)) {
                    this.show('ocmfapro.amountmustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (!this.isNull(ele.personId) && !this.isNull(ele.corporateId)) {
                    this.show('ocmfapro.onlypersonidorcorporateid');
                    isvalid.valid = false;
                    return;
                }

                if (this.isNull(ele.personId) && this.isNull(ele.corporateId)) {
                    this.show('ocmfapro.personidorcorporateidmustbeselect');
                    isvalid.valid = false;
                    return;
                }
            });

        }
        return isvalid.valid;
    }

    validateCdDet() {
        this.csldddDataTemp = [];
        this.csldDdGrid.addedMap.forEach(
            (v: any, k: number) => {
                this.csldddDataTemp.push(v);
            }
        );
        this.csldDdGrid.updatedMap.forEach(
            (v: any, k: number) => {
                this.csldddDataTemp.push(v);
            }
        );
        const isvalid = { valid: true };
        if (this.csldddDataTemp && Array.isArray(this.csldddDataTemp)) {
            this.csldddDataTemp.forEach(ele => {
                if (this.isNull(ele.receiptTxnType)) {
                    this.show('ocmfapro.recepttypemustbeentered');
                    isvalid.valid = false;
                    return;
                }
                if (!this.isNull(ele.percentage) && !this.isNull(ele.flatRate)) {
                    this.show('ocmfapro.onlypercentageorflat');
                    isvalid.valid = false;
                    return;
                }
            });

        }

        return isvalid.valid;
    }


    Save() {

        if (this.csldDbenGrid) {
            const added = [];
            this.csldDbenGrid.addedMap.forEach((value) => { added.push(value); });
            const removed = [];
            this.csldDbenGrid.removedMap.forEach((value) => { removed.push(value); });
            const updated = [];
            this.csldDbenGrid.updatedMap.forEach((value) => { updated.push(value); });
            this.cslddpModel.caseloadDedBeneficiariesCommitBean = new CaseloadDedBeneficiariesCommitBean();
            if (!this.ocmfaproSavecslddbenForm({ added: added, updated: updated, removed: removed })) {
                return false;
            }
        }
        const csldDEvent = { added: [], updated: [], removed: [] };
        if (this.csldDdGrid) {
            const added = [];
            this.csldDdGrid.addedMap.forEach((value) => { added.push(value); });
            const removed = [];
            this.csldDdGrid.removedMap.forEach((value) => { removed.push(value); });
            const updated = [];
            this.csldDdGrid.updatedMap.forEach((value) => { updated.push(value); });
            csldDEvent.added = added;
            csldDEvent.removed = removed;
            csldDEvent.updated = updated;
            if (csldDEvent.added.length > 0 || csldDEvent.removed.length > 0 || csldDEvent.removed.length > 0) {
                this.afterPreCommit(csldDEvent);
                return;
            }

        }
        this.afterPreCommit(csldDEvent);

    }

    afterPreCommit(csldddevent) {
        if (!this.ocmfaproSavecsldddForm(csldddevent)) {
            return false;
        }
        const event = { added: [], removed: [], updated: [] };
        if (this.cdpgrid) {
            const added = [];
            if (this.cdpgrid.addedMap.size > 0) {
                this.cdpgrid.addedMap.forEach((value) => {
                    added.push(value);
                });
            }
            const removed = [];
            this.cdpgrid.removedMap.forEach((value) => {
                removed.push(value);
            });
            const updated = [];
            this.cdpgrid.updatedMap.forEach((value) => {
                updated.push(value);
            });
            event.added = added;
            event.removed = removed;
            event.updated = updated;
        }

        this.ocmfaproSavecslddpForm(event);
    }

    ocmfaproSavecslddpForm(event) {

        if (!this.validateCdpro()) {
            return;
        }

        this.cslddpInsertList = event.added;
        this.cslddpUpdatetList = event.updated;
        this.cslddpDeleteList = event.removed;
        this.cslddpCommitModel.insertList = [];
        this.cslddpCommitModel.updateList = [];
        this.cslddpCommitModel.deleteList = [];

        if (this.cslddbenDataTemp.length === 0 && this.cslddbenData.length === 0 && this.cdpgrid.removedMap.size === 0) {
            this.show('ocmfapro.saveisnotpermittedpleaseassignbeneficiary');
            return;
        }

        if (this.cslddpInsertList.length > 0) {
            this.cslddpInsertList.forEach(ele => {
               ele.caseloadId = this.caseloadId;
               ele.caseloadType = this.caseloadtype;
               ele.backBill = ele.backBill ? 'Y' : 'N';
               ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag ? 'Y' : 'N';
               ele.nonBillableStatus = ele.nonBillableStatus ? 'Y' : 'N';
               ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
               ele.createDatetime = DateFormat.getDate();
               ele.createUserId = this.sessionManager.getId();
               ele.modifyDate = DateFormat.getDate();
               ele.accountCode = Number(ele.accountCode);
               ele.amount = Number(ele.amount);
               ele.maxTotalAmount = this.cslddpModelDup.amount;
               if (ele.dayOfMonth === 0) {
                ele.dayOfMonth = 0;
               } else if (ele.dayOfMonth === undefined) {
                ele.dayOfMonth = undefined;
               } else {
                ele.dayOfMonth = Number(ele.dayOfMonth);
               }
            //   ele.dayOfMonth = ele.dayOfMonth ? Number(ele.dayOfMonth) : undefined;
               this.profileFlag = true;
           });
        }
        if (this.cslddpUpdatetList.length > 0) {
                 this.cslddpUpdatetList.forEach(ele => {
                    ele.backBill = ele.backBill ? 'Y' : 'N';
                    ele.foAlAllOffenderFlag = ele.foAlAllOffenderFlag ? 'Y' : 'N';
                     ele.nonBillableStatus = ele.nonBillableStatus ? 'Y' : 'N';
                    ele.activeFlag = ele.activeFlag ? 'Y' : 'N';
                    ele.createDatetime = DateFormat.getDate();
                    ele.createUserId = this.sessionManager.getId();
                    ele.modifyDate = DateFormat.getDate();
                     ele.accountCode = Number(ele.accountCode);
                     ele.amount = Number(ele.amount);
                     ele.maxTotalAmount = this.cslddpModelDup.amount;
                     if (ele.dayOfMonth === 0) {
                        ele.dayOfMonth = 0;
                       } else if (ele.dayOfMonth === undefined) {
                        ele.dayOfMonth = undefined;
                       } else {
                        ele.dayOfMonth = Number(ele.dayOfMonth);
                    }
                    // ele.dayOfMonth = ele.dayOfMonth ? Number(ele.dayOfMonth) : undefined;
                     this.profileFlag = true;
                });
            }

            if (this.cslddpDeleteList.length > 0) {
                this.profileFlag = true;
            }
        this.cslddpCommitModel.insertList = this.cslddpInsertList;
        this.cslddpCommitModel.updateList = this.cslddpUpdatetList;
        this.cslddpCommitModel.deleteList = this.cslddpDeleteList;
        this.ocmfaproCommitBean.cslddpCommitModel = this.cslddpCommitModel;
        const cslddpSaveData = this.ocmfaproFactory.singleCommit(this.ocmfaproCommitBean);
        cslddpSaveData.subscribe(data => {
            if (String(data) === '1' && !this.benDedFlag) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.csldDpExecuteQuery();
            } else if (String(data) === '1' && this.profileFlag && this.benDedFlag) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.benDedFlag = false;
                this.profileFlag = false;
                this.csldDpExecuteQuery();
                this.cslddbenExecuteQuery();
                this.csldddExecuteQuery();
            } else if (String(data) === '1' && !this.profileFlag && this.benDedFlag) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.benDedFlag = false;
                this.profileFlag = false;
               // this.csldDpExecuteQuery();
                this.cslddbenExecuteQuery();
                this.csldddExecuteQuery();
            } else if (String(data) === '2') {
                this.show('ocmfapro.feeaccountprofilealreadyexistforthesamecaseload', 'warn');
            } else if (String(data) === '22') {
                this.show('ocmfapro.rowexistsalreadywithsamecaseloadded', 'warn');
                this.cslddbenExecuteQuery();
            } else if (String(data) === '101') {
                this.show('ocmfapro.beneficiarytotalisnotequaltodefaultdeductionamount', 'warn');
            } else if (String(data) === '102') {
                this.show('ocmfapro.deleteisnotpermittedasfeeaccounthasalredybeenassignedtoanoffender', 'warn');
            } else if (String(data) === '222') {
                this.show('ocmfapro.rowexistsalreadywithsamerecepipttxntype', 'warn');
                this.csldddExecuteQuery();
            }  else {
                this.show('common.addupdateremoverecordfailed', 'error');
                this.csldDpExecuteQuery();
            }
        });
    }

    ocmfaproSavecslddbenForm(event) {
        if (!this.validateCdben()) {
            return;
        }
        this.cslddbenInsertList = event.added;
        this.cslddbenUpdatetList = event.updated;
        this.cslddbenDeleteList = event.removed;
        this.cslddbenCommitModel.insertList = [];
        this.cslddbenCommitModel.updateList = [];
        this.cslddbenCommitModel.deleteList = [];

        this.cslddbenInsertList.forEach(ele => {
            ele.caseloadId = this.caseloadId;
            ele.deductionType = this.cslddpModelDup.deductionType;
            ele.percent = Number(ele['dspPercent']);
            ele.maxTotalAmount = this.cslddpModelDup.amount;
            this.benDedFlag = true;
        });
        this.cslddbenUpdatetList.forEach(ele => {
            ele.maxTotalAmount = this.cslddpModelDup.amount;
            this.benDedFlag = true;
        });
        this.cslddbenDeleteList.forEach(ele => {
            ele.maxTotalAmount = this.cslddpModelDup.amount;
            this.benDedFlag = true;
        });
        this.cslddbenCommitModel.insertList = this.cslddbenInsertList;
        this.cslddbenCommitModel.updateList = this.cslddbenUpdatetList;
        this.cslddbenCommitModel.deleteList = this.cslddbenDeleteList;
        this.cslddpModel.caseloadDedBeneficiariesCommitBean = this.cslddbenCommitModel;
        this.ocmfaproCommitBean.cslddbenCommitModel = this.cslddbenCommitModel;
        return true;
    }

    ocmfaproSavecsldddForm(event) {
        if (!this.validateCdDet()) {
            return false;
        }
        this.csldddInsertList = event.added;
        this.csldddUpdatetList = event.updated;
        this.csldddDeleteList = event.removed;
        this.csldddCommitModel.insertList = [];
        this.csldddCommitModel.updateList = [];
        this.csldddCommitModel.deleteList = [];

        this.csldddInsertList.forEach(ele => {
            ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag ? 'Y' : 'N';
            ele.caseloadId = this.caseloadId;
            ele.caseloadType = this.caseloadtype;
            ele.deductionType = this.cslddpModelDup.deductionType;
            this.benDedFlag = true;
        });
        this.csldddUpdatetList.forEach(ele => {
            ele.minimumTrustBalanceFlag = ele.minimumTrustBalanceFlag ? 'Y' : 'N';
            ele.caseloadId = this.caseloadId;
            ele.caseloadType = this.caseloadtype;
            ele.deductionType = this.cslddpModelDup.deductionType;
            this.benDedFlag = true;
        });
        this.csldddDeleteList.forEach(ele => {
            ele.caseloadId = this.caseloadId;
            ele.caseloadType = this.caseloadtype;
            ele.deductionType = this.cslddpModelDup.deductionType;
            this.benDedFlag = true;
        });

        this.csldddCommitModel.insertList = this.csldddInsertList;
        this.csldddCommitModel.updateList = this.csldddUpdatetList;
        this.csldddCommitModel.deleteList = this.csldddDeleteList;
        this.cslddpModel.caseloadDeductionDetailsCommitBean = this.csldddCommitModel;
        this.ocmfaproCommitBean.csldddCommitModel = this.csldddCommitModel;

        return true;
    }

    get savBtnflag() {
        if (this.cdpgrid.addedMap.size > 0 || this.cdpgrid.updatedMap.size > 0 ||
          this.cdpgrid.removedMap.size > 0 || this.csldDbenGrid.addedMap.size > 0 || this.csldDbenGrid.updatedMap.size > 0 ||
          this.csldDbenGrid.removedMap.size > 0 || this.csldDdGrid.addedMap.size > 0 || this.csldDdGrid.updatedMap.size > 0 ||
          this.csldDdGrid.removedMap.size > 0 ) {
          return false;
        } else {
                return true;

        }

      }

}
