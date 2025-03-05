import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OcicbeneService } from '../service/ocicbene.service';
import { OffenderBeneficiaries } from '@inmate/trust/trustaccounts/beans/OffenderBeneficiaries';
import { SystemProfiles } from '@commonbeans/SystemProfiles';
import { CorporateAddressV } from '@inmatetrustdeductions/beneficiaryinquiry/beans/CorporateAddressV';
import { Corporates } from '@inmate/trust/trustaccounts/beans/Corporates';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { UserSessionManager } from '@core/classes/userSessionManager';

@Component({
    selector: 'app-ocicbene',
    templateUrl: './ocicbene.component.html'
})

export class OcicbeneComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    vcorpData: CorporateAddressV[] = [];
    vcorpDataPinnedData: any[] = [];
    vcorpDataTemp: CorporateAddressV[] = [];
    corpModel: Corporates = new Corporates();
    vcorpModel: CorporateAddressV = new CorporateAddressV();
    offbncData: OffenderBeneficiaries[] = [];
    offbncDataTemp: OffenderBeneficiaries[] = [];
    offbncModel: OffenderBeneficiaries = new OffenderBeneficiaries();
    syspflData: SystemProfiles[] = [];
    syspflDataTemp: SystemProfiles[] = [];
    syspflModel: SystemProfiles = new SystemProfiles();
    minDate: any;
    display: boolean;
    errorMessage: string;
    offBncColumnDef: any[];
    vCorpColumnDef: any[];
    totalAmountTemp: any;
    totalAmountTempFlag: boolean;
    totalCollectTemp: any;
    totalCollectTempFlag: boolean;
    totalWrtAmountTemp: any;
    totalWrtAmountTempFlag: boolean;
    totalOwingTemp: any;
    totalOwingTempFlag: boolean;
    checkPaidAmount: any;
    checkUnPaidAmount: any;
    selectedRow: number;
    corporateId: any;
    suiteNumber: any;
    retriveDisable: boolean;
    clearDisable: boolean;
    fieldsReadOnly: boolean;
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    corporateName: any;
    transHistoryDisable: boolean;
    selectedLine = -1;
    constructor(private ocicbeneFactory: OcicbeneService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager) {
        this.offBncColumnDef = [];
        this.vCorpColumnDef = [];
    }
    ngOnInit() {
        this.selectedRow = 0;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.fieldsReadOnly = false;
        this.transHistoryDisable = true;
        this.offBncColumnDef = [
            { fieldName: this.translateService.translate('common.offendername'), field: 'lastName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.Orca2'), field: 'offenderIdDisplay', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.obligationid'), field: 'offenderDeductionId', editable: false,
                width: 150
            },
            { fieldName: this.translateService.translate('common.type'), field: 'moduleName', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.totalamount'), field: 'totalDescription', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.totalcollected'), field: 'totalCollected', editable: false, width: 150 },
            { fieldName: this.translateService.translate('ocicbene.writeoffamt'), field: 'writeOfAmount', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.totalowing'), field: 'totalOwing', editable: false, width: 150 },
        ];
        this.vCorpColumnDef = [
            {
                fieldName: this.translateService.translate('common.name'), field: 'corporateName', editable: false, datatype: 'text',
                width: 150
            },
            { fieldName: this.translateService.translate('ocipbene.id'), field: 'corporateId', editable: false, width: 150 },
            { fieldName: this.translateService.translate('common.suite'), field: 'suiteNumber', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('common.streetinformation'), field: 'street', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.city'), field: 'cityDesc', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.state'), field: 'provStateDesc', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.zipcode'), field: 'zipPostalCode', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('common.country'), field: 'countryDesc', editable: false, width: 150,
                datatype: 'text'
            },
            {
                fieldName: this.translateService.translate('ocicbene.suspenddate'), field: 'suspendedDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: '', field: 'button', editable: true, width: 150, datatype: 'launchbutton', onLaunchClick: this.SusLaunchClick,
                data: 'row', updateField: 'row', modal: true
            },
        ];
        this.ocicbeneexecuteQuery();
    }
    /**
    *  This function will be executed when we click on Sus button in grid
    *
    */
    SusLaunchClick = (event) => {
        this.corpModel = new Corporates();
        if (event.suspendedDate) {
            this.corpModel.suspendedDate = undefined;
            this.corpModel.suspendedFlag = 'N';
            this.corpModel.corporateId = event.corporateId;
        } else {
            this.corpModel.suspendedDate = DateFormat.getDate();
            this.corpModel.suspendedFlag = 'Y';
            this.corpModel.corporateId = event.corporateId;
        }
        const serviceObj = this.ocicbeneFactory.
            vCorpCommit(this.corpModel);
        serviceObj.subscribe(data => {
            if (data === 0) {
            } else {
                this.grid.setColumnData('suspendedDate', this.vcorpData.indexOf(event), this.corpModel.suspendedDate);
                this.offbncData = data;
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                return;
            }
        });
    }
    /**
   *  This function will be executed when we select a record in the grid
   *
   */
    onRowClickvcorp(event) {
        if (event) {
            this.vcorpModel = new CorporateAddressV();
            this.vcorpModel = event;
            if (this.vcorpModel.corporateId) {
                this.transHistoryDisable = false;
                this.offbncModel = new OffenderBeneficiaries();
                this.offbncModel.corporateId = this.vcorpModel.corporateId;
                this.offbncExecuteQuery();
            } else {
                this.transHistoryDisable = true;
            }
        }
    }
    onRowClickoffbnc(event) {
        if (event) {
            this.offbncModel = new OffenderBeneficiaries();
            this.offbncModel = event;
        }
    }
    cancel() {
        this.offbncData = [];
        this.vcorpData = [];
        this.vcorpDataPinnedData = [];
        this.offbncModel = new OffenderBeneficiaries();
        this.vcorpModel = new CorporateAddressV();
        this.checkPaidAmount = null;
        this.checkUnPaidAmount = null;
        this.corporateId = null;
        this.retriveDisable = false;
        this.clearDisable = true;
        this.fieldsReadOnly = false;
        this.suiteNumber = null;
        this.corporateName = null;
        this.transHistoryDisable = true;
    }
    isInsertable() {
        if (this.corporateName || this.corporateId || this.suiteNumber) {
            this.clearDisable = false;
        } else {
            this.clearDisable = true;
        }
    }
    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    ocicbenePopulateDetails() {
        const serviceObj = this.ocicbeneFactory.
            offBncExecuteQuery(this.vcorpModel);
        serviceObj.subscribe(data => {
            if (data !== undefined && data.errorMessage.length > 0) {
            } else {
                this.offbncData = data;
            }
        });
    }

    /**
   *  This function will be executed To retrive grid data in Payment status block
   *
   */
    ocicbeneexecuteQuery() {
        // if (this.corporateName) {
        //     this.vcorpModel.corporateName = this.corporateName;
        // }
        // if (this.corporateId) {
        //     this.vcorpModel.corporateId = this.corporateId;
        // }
        // if (this.suiteNumber) {
        //     this.vcorpModel.suiteNumber = this.suiteNumber;
        // }
        this.vcorpModel.caseloadId = this.sessionManager.currentCaseLoad;
        const serviceObj = this.ocicbeneFactory.
            vCorpExecuteQuery(this.vcorpModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
                return;
            } else {
                data.forEach(element => {
                    element.corporateName = element.corporateName ? String(element.corporateName).toUpperCase() : element.corporateName;
                    element.street = element.street ? String(element.street).toUpperCase() : element.street;
                    element.cityDesc = element.cityDesc ? String(element.cityDesc).toUpperCase() : element.cityDesc;
                    element.provStateDesc = element.provStateDesc ? String(element.provStateDesc).toUpperCase() : element.provStateDesc;
                    element.zipPostalCode = element.zipPostalCode ? String(element.zipPostalCode).toUpperCase() : element.zipPostalCode;
                    element.countryDesc = element.countryDesc ? String(element.countryDesc).toUpperCase() : element.countryDesc;
                });
                this.vcorpData = data;
                for (let i = 0; i < this.vcorpData.length; i++) {
                    this.vcorpData[i].button = 'Sus';
                }
                this.retriveDisable = true;
                this.clearDisable = false;
                this.fieldsReadOnly = true;
            }
        });
    }
    /**
       *  This function will be executed To retrive grid data in Payment status block
       *
       */
    offbncExecuteQuery() {
        const offbncResult = this.ocicbeneFactory.
            offBncExecuteQuery(this.offbncModel);
        offbncResult.subscribe(offbncResultList => {
            if (offbncResultList.length === 0) {
                this.offbncData = [];
            } else {
                this.selectedRow = 0;
                this.totalAmountTemp = 0;
                this.totalCollectTemp = 0;
                this.totalWrtAmountTemp = 0;
                this.totalOwingTemp = 0;
                this.checkPaidAmount = 0;
                this.checkUnPaidAmount = 0;
                this.totalAmountTempFlag = false;
                this.totalCollectTempFlag = false;
                this.totalWrtAmountTempFlag = false;
                this.totalOwingTempFlag = false;
                for (let i = 0; i < offbncResultList.length; i++) {
                    if (offbncResultList[i].totalDescription === 'Monthly') {
                        offbncResultList[i].totalDescription = Number(offbncResultList[i].totalDescription).toFixed(2) !== String(NaN) ?
                            Number(offbncResultList[i].totalDescription).toFixed(2) : 'Monthly';
                    } else {
                        offbncResultList[i].totalDescription = Number(offbncResultList[i].totalDescription).toFixed(2) !== String(NaN) ?
                            Number(offbncResultList[i].totalDescription).toFixed(2) : 'Unlimited';
                    }
                    offbncResultList[i].totalCollected = Number(offbncResultList[i].totalCollected).toFixed(2) !== String(NaN) ?
                        Number(offbncResultList[i].totalCollected).toFixed(2) : 'Unlimited';
                    offbncResultList[i].writeOfAmount = Number(offbncResultList[i].writeOfAmount).toFixed(2) !== String(NaN) ?
                        Number(offbncResultList[i].writeOfAmount).toFixed(2) : 'Unlimited';
                    if (offbncResultList[i].totalOwing === 'Monthly') {
                        offbncResultList[i].totalOwing = Number(offbncResultList[i].totalOwing).toFixed(2) !== String(NaN) ?
                            Number(offbncResultList[i].totalOwing).toFixed(2) : 'Monthly';
                    } else {
                        offbncResultList[i].totalOwing = Number(offbncResultList[i].totalOwing).toFixed(2) !== String(NaN) ?
                            Number(offbncResultList[i].totalOwing).toFixed(2) : 'Unlimited';
                    }
                    if (offbncResultList[i].totalDescription === 'Unlimited') {
                        this.totalAmountTempFlag = true;
                        this.totalAmountTemp = 'Unlimited';
                    } else {
                        if (!this.totalAmountTempFlag) {
                            this.totalAmountTemp = this.totalAmountTemp + Number(offbncResultList[i].totalDescription);
                        }
                    }
                    if (offbncResultList[i].totalCollected === 'Unlimited') {
                        this.totalCollectTempFlag = true;
                        this.totalCollectTemp = 'Unlimited';
                    } else {
                        if (!this.totalCollectTempFlag) {
                            this.totalCollectTemp = this.totalCollectTemp + Number(offbncResultList[i].totalCollected);
                        }
                    }
                    if (offbncResultList[i].writeOfAmount === 'Unlimited') {
                        this.totalWrtAmountTempFlag = true;
                        this.totalWrtAmountTemp = 'Unlimited';
                    } else {
                        if (!this.totalWrtAmountTempFlag) {
                            this.totalWrtAmountTemp = this.totalWrtAmountTemp + Number(offbncResultList[i].writeOfAmount);
                        }
                    }
                    if (offbncResultList[i].totalOwing === 'Unlimited') {
                        this.totalOwingTempFlag = true;
                        this.totalOwingTemp = 'Unlimited';
                        offbncResultList[i].writeOfAmount = '';
                    } else {
                        if (!this.totalOwingTempFlag) {
                            this.totalOwingTemp = this.totalOwingTemp + Number(offbncResultList[i].totalOwing);
                        }
                    }

                }
                this.offbncData = offbncResultList;
                this.selectedLine = 0;
                const alltot = {
                    moduleName: this.translateService.translate('common.total'),
                    totalDescription: Number(this.totalAmountTemp).toFixed(2) !== String(NaN) ?
                        Number(this.totalAmountTemp).toFixed(2) : 'Unlimited',
                    totalCollected: Number(this.totalCollectTemp).toFixed(2) !== String(NaN) ?
                        Number(this.totalCollectTemp).toFixed(2) : 'Unlimited',
                    writeOfAmount: Number(this.totalWrtAmountTemp).toFixed(2) !== String(NaN) ?
                        Number(this.totalWrtAmountTemp).toFixed(2) : 'Unlimited',
                    totalOwing: Number(this.totalOwingTemp).toFixed(2) !== String(NaN) ?
                        Number(this.totalOwingTemp).toFixed(2) : 'Unlimited'
                };
                this.checkUnPaidAmount = Number(this.totalAmountTemp).toFixed(2) !== String(NaN) ?
                    Number(this.totalAmountTemp).toFixed(2) : 'Unlimited';
                this.checkPaidAmount = Number(this.offbncModel.drvAmount).toFixed(2) !== String(NaN) ?
                    Number(this.offbncModel.drvAmount).toFixed(2) : '0.00';
                if (!this.totalOwingTempFlag) {
                    this.checkUnPaidAmount = Number(this.totalAmountTemp).toFixed(2) !== String(NaN) ?
                    Number(this.totalAmountTemp).toFixed(2) : 'Unlimited';
                } else {
                    this.checkUnPaidAmount = 'Unlimited';
                }
                const totbal = [];
                totbal.push(alltot);
                this.vcorpDataPinnedData = totbal;
            }
        });
    }
    syspflExecuteQuery() {
        const syspflResult = this.ocicbeneFactory.
            sysPflExecuteQuery(this.syspflModel);
        syspflResult.subscribe(syspflResultList => {
            if (syspflResultList.length === 0) {
                this.syspflData = [];
            } else {
                this.syspflData = syspflResultList;
                this.syspflModel = syspflResultList[0];
            }
        });
    }
}
