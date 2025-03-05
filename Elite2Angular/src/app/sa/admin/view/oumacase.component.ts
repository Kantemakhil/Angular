import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@common/translate/translate.service';
import { OumacaseService } from '@sa/admin/service/oumacase.service';
import { CaseLoads } from '@commonbeans/CaseLoads';
import { CaseLoadAgencyLocations } from '@saadminbeans/CaseLoadAgencyLocations';
import { CaseLoadsCommitBean } from '@saadminbeans/CaseLoadsCommitBean';
import { CaseLoadAgencyLocationsCommitBean } from '@saadminbeans/CaseLoadAgencyLocationsCommitBean';
import { AgencyLocations } from '@saadminbeans/AgencyLocations';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';

@Component({
    selector: 'app-oumacase',
    templateUrl: './oumacase.component.html'
})

export class OumacaseComponent implements OnInit {
	accAgyLocEnableInsert: boolean;
    gridOptions: GridOptions;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    csldData: CaseLoads[] = [];
    csldDataTemp: CaseLoads[] = [];
    csldModel: CaseLoads = new CaseLoads();
    csldIndex = 0;
    csldInsertList: CaseLoads[] = [];
    csldUpdateList: CaseLoads[] = [];
    csldDeleteList: CaseLoads[] = [];
    csldalData: CaseLoadAgencyLocations[] = [];
    csldalDataTemp: CaseLoadAgencyLocations[] = [];
    csldalModel: CaseLoadAgencyLocations = new CaseLoadAgencyLocations();
    csldalNew: CaseLoadAgencyLocations = new CaseLoadAgencyLocations();
    csldalIndex = 0;
    csldAlInsertList: CaseLoadAgencyLocations[] = [];
    csldAlUpdateList: CaseLoadAgencyLocations[] = [];
    csldAlDeleteList: CaseLoadAgencyLocations[] = [];
    csldAlCheckAgyInsert: CaseLoadAgencyLocations[] = [];
    minDate: any;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    activeFlag: boolean;
    csldAlColumnDef: any[] = [];
    csldReadOnly: boolean;
    csldAlReadOnly: boolean;
    payrollTrustRgRg: any[] = [];
    commissaryTrustRgRg: any[] = [];
    trustCommissaryRgRg: any[] = [];
    communityTrustRgRg: any[] = [];
    caseloadTypeRgRg: any[] = [];
    alAgyLocIdRgRg: any[] = [];
    index = 0;
    msglist = [];
    message = ' Invalid.';
    type = 'error';
    csldCommitModel: CaseLoadsCommitBean = new CaseLoadsCommitBean();
    csldAlCommitModel: CaseLoadAgencyLocationsCommitBean = new CaseLoadAgencyLocationsCommitBean();
    vCaseLoadTemp: CaseLoads = new CaseLoads();
    vCaseLoadAgLocList: CaseLoadAgencyLocations[] = [];
    agyLocModel: AgencyLocations = new AgencyLocations();
    lstOfCaseLoads: CaseLoads[];
    deactivationDate: string;
    deactivationFlag: boolean;
    oumaAgyLocIndex = 0;
    agyLocId: any;
    updateAllowed: boolean;
    channelArray: string[];
    retCreateFlag: boolean;
    updateClFields: boolean;
    caseloadId: any;
    vCaseLoadExistsTemp = new CaseLoads();
    nextFlag: boolean;
    prevFlag: boolean;
    saveFlag: boolean;
    verifySave: boolean;
    statusOption: any[] = [];
    caseLoadsColumnDef: any[] = [];
    caseLoadIndex: number;
    gridDelete: boolean;
    LocationIndex: number;
    @ViewChild('caseLoadGrid', {static: true}) caseLoadGrid: any;
    constructor(private oumacaseFactory: OumacaseService, private router: Router, public translateService: TranslateService) {
        this.lstOfCaseLoads = [];

    }

    ngOnInit() {
        this.disabled = true;
        this.nextFlag = true;
        this.prevFlag = true;
        this.saveFlag = false;
        this.display = true;
        this.retCreateFlag = false;
        this.csldModel.listSeq = 99;
        this.deactivationFlag = true;
		this.accAgyLocEnableInsert = false;
        this.csldAlColumnDef = [
            {
                fieldName: this.translateService.translate('oumacase.location'), field: 'agyLocId', cellEditable: this.agyLocIdEdit,
                codeTitle: this.translateService.translate('oumacase.caseloadtype'), editable: true, width: 300, datatype: 'lov',
                link: 'oumacase/alAgyLocIdRgRecordGroup', required: true, optionWidth: 360
            },
            {
                fieldName: this.translateService.translate('oumacase.updatedallowed'), field: 'updateAllowedFlag',
                datatype: 'checkbox', editable: true, width: 200
            },
        ];

        this.caseLoadsColumnDef = [
            {
                fieldName: this.translateService.translate('oumacase.caseloadid'), field: 'caseloadId',
            editable: true, width: 150, datatype: 'text', maxlength: '6', uppercase: 'true', cellEditable: this.caseloadIdEditable,
            },
            {
                fieldName: this.translateService.translate('oumacase.descriptionMand'), field: 'description',
            editable: true, width: 150, datatype: 'text', maxlength: '40', uppercase: 'false'
            },
            {
                fieldName: this.translateService.translate('oumacase.locationtype'), field: 'caseloadType',
            editable: true, width: 150, datatype: 'lov', maxlength: '40', domain: 'CLOAD_TYPE'
            },
            {
                fieldName: this.translateService.translate('oumacase.casesequence'), field: 'listSeq',
            editable: true, width: 150, datatype: 'number', maxValue: 999, whole: true
            },
            {
                fieldName: this.translateService.translate('oumacase.active'), field: 'activeFlag',
            editable: true, width: 150, datatype: 'checkbox', maxlength: '40'
            },
            {
                fieldName: this.translateService.translate('oumacase.deactivationdt'), field: 'deactivationDate',
            cellEditable: this.deactivationDateEditable, width: 150, datatype: 'date', maxlength: '40'
            },
            {
                fieldName: this.translateService.translate('oumacase.trustclforpayroll'), field: 'payrollTrustCaseload',
            editable: true, width: 150, datatype: 'lov', maxlength: '40', link: 'oumacase/payrollTrustRgRecordGroup'
            },
            {
                fieldName: this.translateService.translate('oumacase.trustclforcomm'), field: 'trustCommissaryCaseload',
            editable: true, width: 150, datatype: 'lov', maxlength: '40', link: 'oumacase/trustCommissaryRgRecordGroup'
            },
            {
                fieldName: this.translateService.translate('oumacase.commclfortrust'), field: 'commissaryTrustCaseload',
            editable: true, width: 150, datatype: 'lov', maxlength: '40', link: 'oumacase/commissaryTrustRgRecordGroup'
            },
            {
                fieldName: this.translateService.translate('oumacase.trustclforcommu'), field: 'communityTrustCaseload',
            editable: true, width: 150, datatype: 'lov', maxlength: '40', link: 'oumacase/communityTrustRgRecordGroup'
            },
            {
                fieldName: this.translateService.translate('oumacase.trust'), field: 'trustAccountsFlag',
            editable: true, width: 150, datatype: 'checkbox', maxlength: '40'
            },
            {
                fieldName: this.translateService.translate('oumacase.commissary'), field: 'commissaryFlag',
            editable: true, width: 150, datatype: 'checkbox', maxlength: '40'
            },
            {
                fieldName: this.translateService.translate('oumacase.payroll'), field: 'payrollFlag',
            editable: true, width: 150, datatype: 'checkbox', maxlength: '40'
            },
            {
                fieldName: this.translateService.translate('oumacase.billing'), field: 'billingFlag',
            editable: true, width: 150, datatype: 'checkbox', maxlength: '40'
            }
        ];

        this.executeQuery();

        const payrollrustrgServiceObj = this.oumacaseFactory.payrollTrustRgRecordGroup();
        payrollrustrgServiceObj.subscribe(payrollTrustRgList => {
            if (payrollTrustRgList.length === 0) {
                this.payrollTrustRgRg = [];
            } else {
                for (let i = 0; i < payrollTrustRgList.length; i++) {

                    this.payrollTrustRgRg.push({
                        'text': payrollTrustRgList[i].code + ' - ' +
                            payrollTrustRgList[i].description, 'id': payrollTrustRgList[i].code
                    });
                }
            }
        });


        const commissaryTrustRgServiceObj = this.oumacaseFactory.commissaryTrustRgRecordGroup();
        commissaryTrustRgServiceObj.subscribe(commissarytrustRgList => {
            if (commissarytrustRgList.length === 0) {
                this.commissaryTrustRgRg = [];
            } else {
                for (let i = 0; i < commissarytrustRgList.length; i++) {
                    this.commissaryTrustRgRg.push({
                        'text': commissarytrustRgList[i].code + ' - ' +
                            commissarytrustRgList[i].description, 'id': commissarytrustRgList[i].code
                    });
                }
            }
        });

        const trustCommissaryRgServiceObj = this.oumacaseFactory.trustCommissaryRgRecordGroup();
        trustCommissaryRgServiceObj.subscribe(trustCommissaryRgList => {
            if (trustCommissaryRgList.length === 0) {
                this.trustCommissaryRgRg = [];
            } else {
                for (let i = 0; i < trustCommissaryRgList.length; i++) {
                    this.trustCommissaryRgRg.push({
                        'text': trustCommissaryRgList[i].code + ' - ' +
                            trustCommissaryRgList[i].description, 'id': trustCommissaryRgList[i].code
                    });
                }
            }
        });

        const communityTrustRgServiceObj = this.oumacaseFactory.communityTrustRgRecordGroup();
        communityTrustRgServiceObj.subscribe(communityTrustRgList => {
            if (communityTrustRgList.length === 0) {
                this.communityTrustRgRg = [];
            } else {
                for (let i = 0; i < communityTrustRgList.length; i++) {
                    this.communityTrustRgRg.push({
                        'text': communityTrustRgList[i].code + ' - ' +
                            communityTrustRgList[i].description, 'id': communityTrustRgList[i].code
                    });
                }
            }
        });

        const caseloadTypeRgServiceObj = this.oumacaseFactory.typeRgRecordGroup();
        caseloadTypeRgServiceObj.subscribe(caseloadTypeRgList => {
            if (caseloadTypeRgList.length === 0) {
                this.caseloadTypeRgRg = [];
            } else {
                for (let i = 0; i < caseloadTypeRgList.length; i++) {
                    this.caseloadTypeRgRg.push({
                        'text': caseloadTypeRgList[i].code + ' - ' +
                            caseloadTypeRgList[i].description, 'id': caseloadTypeRgList[i].code
                    });
                }
            }
        });
        // const serviceObj = this.oumacaseFactory.executeQuery(this.csldModel);
        // serviceObj.subscribe(data => {
        //     this.csldDataTemp = data;
        // });
    }
    agyLocIdEdit = (data: any, index: number, field: string): boolean => {
        if (data.caseloadId) {
            return false;
        }
        return true;
    }

    onClearDetailsTrigger() {
        const caseloadType = this.csldModel.caseloadType === undefined ? '' : undefined;
        this.csldalModel = new CaseLoadAgencyLocations();
        this.index = 0;
        this.csldModel = new CaseLoads();
        this.csldModel.caseloadType = caseloadType;
        this.csldModel.listSeq = 99;
        this.lstOfCaseLoads = [];
        this.listToCompare = [];
        this.vCaseLoadTemp = new CaseLoads();
        this.csldIndex = 0;
        this.activeFlag = false;
        this.vCaseLoadAgLocList = [];
        this.deactivationFlag = false;
        this.csldalData = [];
        this.oumaAgyLocIndex = 0;
        this.retCreateFlag = false;
        this.updateClFields = false;
        this.disabled = true;
        this.csldReadOnly = false;
        this.vCaseLoadExistsTemp = new CaseLoads();
        this.nextFlag = true;
        this.prevFlag = true;
        this.saveFlag = false;
        this.display = true;
        this.verifySave = false;
    }

    cancel() {
        this.csldalModel = new CaseLoadAgencyLocations();
        this.index = 0;
        this.csldModel = new CaseLoads();
        this.csldModel.listSeq = 99;
        this.lstOfCaseLoads = [];
        this.listToCompare = [];
        this.vCaseLoadTemp = new CaseLoads();
        this.csldIndex = 0;
        this.activeFlag = false;
        this.vCaseLoadAgLocList = [];
        this.deactivationFlag = true;
        this.csldalData = [];
        this.oumaAgyLocIndex = 0;
        this.retCreateFlag = false;
        this.updateClFields = false;
        this.disabled = true;
        this.csldReadOnly = false;
        this.vCaseLoadExistsTemp = new CaseLoads();
        this.nextFlag = true;
        this.prevFlag = true;
        this.saveFlag = false;
        this.display = true;
        this.verifySave = false;
    }
    executeQuery() {
        this.csldReadOnly = false;
        this.verifySave = false;
        this.csldalData = [];
        this.csldData = [];
        this.vCaseLoadTemp = new CaseLoads();

        if (this.csldModel !== undefined && this.csldModel !== null) {
            if (this.csldModel.activeFlag !== undefined && this.csldModel.activeFlag !== null) {
                if (this.csldModel.activeFlag) {
                    this.csldModel.activeFlag = 'Y';
                } else {
                    this.csldModel.activeFlag = 'N';
                }
            }
        }
        const serviceObj = this.oumacaseFactory.executeQuery(this.csldModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.lstOfCaseLoads = [];
                this.csldModel = new CaseLoads();
                this.retCreateFlag = false;
                this.saveFlag = false;
                this.display = true;
                this.deactivationFlag = true;
                this.csldModel.listSeq = 99;
				this.accAgyLocEnableInsert = false;
                this.type = 'info';
                this.message = this.translateService.translate('common.querycaused');
                this.show();
            } else {
                this.retCreateFlag = true;
                this.csldReadOnly = true;
                this.saveFlag = true;
                for (let i = 0; i < data.length; i++) {
                    data[i].trustAccountsFlag = data[i].trustAccountsFlag === 'Y' ? true : false;
                    data[i].commissaryFlag = data[i].commissaryFlag === 'Y' ? true : false;
                    data[i].billingFlag = data[i].billingFlag === 'Y' ? true : false;
                    data[i].payrollFlag = data[i].payrollFlag === 'Y' ? true : false;
                    data[i].activeFlag = data[i].activeFlag === 'Y' ? true : false;
                    if (data[i].activeFlag) {
                        if (data[i].deactivationDate !== null) {
                            data[i].deactivationDate = DateFormat.getDate(data[i].deactivationDate);
                        }
                    } else {
                        data[i].deactivationDate = DateFormat.getDate(data[i].deactivationDate);
                    }
                }
                this.csldData = data;
                this.lstOfCaseLoads = data;
                this.caseLoadIndex = 0;
                this.csldModel = new CaseLoads();
                this.vCaseLoadTemp = this.csldData[0];
                this.csldModel = this.csldData[0];
                this.listToCompare = [];
                if (this.csldModel.deactivationDate !== null) {
                    this.csldModel.deactivationDate = DateFormat.getDate(this.csldModel.deactivationDate);
                }
                this.deactivationFlag = true;
                this.activeFlag = true;
                this.nextFlag = false;
                this.prevFlag = true;
                this.display = false;
				this.accAgyLocEnableInsert = true;
               // this.csldalExecuteQuery();
            }
        });
    }

    onRowClickCaseLoad(event) {
        if (event && event.caseloadId) {
            this.accAgyLocEnableInsert = true; 
            this.csldModel = event;
            this.csldalExecuteQuery();
        } else {
            this.csldalData = [];
        }
    }

    onGridInsert = () => {
		this.accAgyLocEnableInsert = false;	
        if (!this.caseLoadValidations()) {
            return;
        }
        return { activeFlag: true };
    }

    onGridClear = () => {
        this.csldModel = new CaseLoads();
        this.csldModel.listSeq = 99;
        this.executeQuery();
        return true;
    }

    validateRowData = (event) => {
        const rowdata = new ValidateRowReturn();
        const rowIndex = event.rowIndex;
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.caseLoadGrid.setColumnData('deactivationDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.caseLoadGrid.setColumnData('deactivationDate', rowIndex, 
                   DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    caseLoadValidations() {
        const is = { valid: true };
        this.lstOfCaseLoads.forEach(data => {
            if (is.valid) {
                if (data.caseloadId === undefined || data.caseloadId === null || data.caseloadId.trim() === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumacase.caseloadenter');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (data.description === undefined || data.description === null || data.description.trim() === "") {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumacase.cldescription');
                    this.show();
                    is.valid = false;
                    return;
                }
                if (data.caseloadType === null || data.caseloadType === undefined) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumacase.cllocationtype');
                    this.show();
                    is.valid = false;
                    return;
                }
            }
        });
        for (let x = 0; x < this.lstOfCaseLoads.length; x++) {
            for (let y = 0; y < this.lstOfCaseLoads.length; y++) {
                if (x !== y) {
                    if (this.lstOfCaseLoads[x].caseloadId === this.lstOfCaseLoads[y].caseloadId ) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oumacase.caseloadalreadyexists');
                        this.show();
                        is.valid = false;
                       return is.valid;
                    }
                }
            }
        }
        return is.valid;
    }

    csldalExecuteQuery() {
        this.verifySave = false;
        this.retCreateFlag = true;
        this.csldalModel = new CaseLoadAgencyLocations();
        this.csldalModel.caseloadId = this.csldModel.caseloadId;
        this.listToCompare = [];
        const csldAlResult = this.oumacaseFactory.alExecuteQuery(this.csldalModel);
        csldAlResult.subscribe(csldalList => {
            if (csldalList.length === 0) {
                this.csldalData = [];
            } else {
                for (let i = 0; i < csldalList.length; i++) {
                    csldalList[i].updateAllowedFlag = (csldalList[i].updateAllowedFlag === 'N') ? false : true;
                    this.listToCompare.push(csldalList[i].agyLocId);
                }
                this.csldalData = csldalList;
                this.csldalModel = csldalList[0];
                this.oumaAgyLocIndex = this.csldalData.length;
                this.vCaseLoadAgLocList = [];
                this.vCaseLoadAgLocList = this.csldalData;
                this.LocationIndex = 0;
            }
        });
    }
    /**
    * This function loads the data into the Master Record and its child records
    */
    populateDetails() {
        this.updateClFields = false;
        this.executeQuery();
    }

    /**
      *  This function will be executed when commit event is
      * fired
      */
    saveCsldForm(event) {
        if (!this.caseLoadValidations()) {
            return;
        }

        this.csldInsertList = [];
        this.csldUpdateList = [];
        this.csldCommitModel.insertList = [];
        this.csldCommitModel.updateList = [];
        this.csldInsertList = event.added;
        this.csldUpdateList = event.updated;

        if (this.csldInsertList.length > 0) {
            for (let i = 0; i < this.csldInsertList.length; i++) {
                this.csldInsertList[i].activeFlag = this.csldInsertList[i].activeFlag ? 'Y' : 'N';
                this.csldInsertList[i].trustAccountsFlag = this.csldInsertList[i].trustAccountsFlag ? 'Y' : 'N';
                this.csldInsertList[i].payrollFlag = this.csldInsertList[i].payrollFlag ? 'Y' : 'N';
                this.csldInsertList[i].billingFlag = this.csldInsertList[i].billingFlag ? 'Y' : 'N';
                this.csldInsertList[i].commissaryFlag = this.csldInsertList[i].commissaryFlag ? 'Y' : 'N';
                this.csldInsertList[i].mdtFlag = this.csldInsertList[i].mdtFlag ? 'Y' : 'N';

                this.csldCommitModel.insertList = this.csldInsertList;
            }
        }
        if (this.csldUpdateList.length > 0) {
            for (let i = 0; i < this.csldUpdateList.length; i++) {
                this.csldUpdateList[i].activeFlag = this.csldUpdateList[i].activeFlag ? 'Y' : 'N';
                this.csldUpdateList[i].trustAccountsFlag = this.csldUpdateList[i].trustAccountsFlag ? 'Y' : 'N';
                this.csldUpdateList[i].payrollFlag = this.csldUpdateList[i].payrollFlag ? 'Y' : 'N';
                this.csldUpdateList[i].billingFlag = this.csldUpdateList[i].billingFlag ? 'Y' : 'N';
                this.csldUpdateList[i].commissaryFlag = this.csldUpdateList[i].commissaryFlag ? 'Y' : 'N';
                this.csldUpdateList[i].mdtFlag = this.csldUpdateList[i].mdtFlag ? 'Y' : 'N';
            }
            this.csldCommitModel.updateList = this.csldUpdateList;
        }

        // for (let x = 0; x < this.csldDataTemp.length; x++) {
        //     for (let y = 0; y < this.csldDataTemp.length; y++) {
        //         if (x !== y) {
        //             if (this.csldDataTemp[x].caseloadId === this.csldModel.caseloadId) {
        //                 this.type = 'warn';
        //                 this.message = this.translateService.translate('oumacase.caseloadalreadyexists');
        //                 this.show();
        //                 return;
        //             }
        //         }
        //     }
        // }

        // if (this.csldModel.caseloadId === undefined || this.csldModel.caseloadId === null || this.csldModel.caseloadId === '') {
        //     this.type = 'info';
        //     this.message = this.translateService.translate('oumacase.caseloadenter');
        //     this.show();
        //     return;
        // }
        // if (this.csldModel.description === undefined || this.csldModel.description === null) {
        //     this.type = 'info';
        //     this.message = this.translateService.translate('oumacase.cldescription');
        //     this.show();
        //     return;
        // }

        // if (this.csldModel.caseloadType === null || this.csldModel.caseloadType === undefined) {
        //     this.type = 'info';
        //     this.message = this.translateService.translate('oumacase.cllocationtype');
        //     this.show();
        //     return;
        // }
        // this.vCaseLoadTemp = new CaseLoads();
        // this.vCaseLoadTemp = this.csldModel;
        // const csldId = this.csldModel.caseloadId;
        // if (this.csldModel.activeFlag) {
        //     this.vCaseLoadTemp.activeFlag = 'Y';
        // } else {
        //     this.vCaseLoadTemp.activeFlag = 'N';
        // }

        // if (this.csldModel.trustAccountsFlag) {
        //     this.vCaseLoadTemp.trustAccountsFlag = 'Y';
        // } else {
        //     this.vCaseLoadTemp.trustAccountsFlag = 'N';
        // }
        // if (this.csldModel.payrollFlag) {
        //     this.vCaseLoadTemp.payrollFlag = 'Y';
        // } else {
        //     this.vCaseLoadTemp.payrollFlag = 'N';
        // }
        // if (this.csldModel.billingFlag) {
        //     this.vCaseLoadTemp.billingFlag = 'Y';
        // } else {
        //     this.vCaseLoadTemp.billingFlag = 'N';
        // }
        // if (this.csldModel.commissaryFlag) {
        //     this.vCaseLoadTemp.commissaryFlag = 'Y';
        // } else {
        //     this.vCaseLoadTemp.commissaryFlag = 'N';
        // }
        // if (this.csldModel.mdtFlag) {
        //     this.vCaseLoadTemp.mdtFlag = 'Y';
        // } else {
        //     this.vCaseLoadTemp.mdtFlag = 'N';
        // }
        // this.csldUpdateList.push(this.vCaseLoadTemp);
        // this.csldCommitModel.updateList = this.csldUpdateList;

        const csldSaveData = this.oumacaseFactory.csldCommit(this.csldCommitModel);
        csldSaveData.subscribe(inResult => {
            if (inResult === 1) {
                this.type = 'success';
                this.csldModel = new CaseLoads();
                this.csldModel.listSeq = 99;
                this.executeQuery();
                this.saveFlag = true;
                this.verifySave = false;
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                return;
            } else {
                this.type = 'error';
                this.csldModel = new CaseLoads();
                this.csldModel.listSeq = 99;
                this.executeQuery();
                this.saveFlag = true;
                this.verifySave = false;
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                return;
            }
        });
    }


    /**
     *  This function will be executed when commit event is
    * fired
    */
    saveCsldalForm(event) {
        this.csldAlInsertList = [];
        this.csldAlUpdateList = [];
        this.csldAlDeleteList = [];
        this.csldAlCheckAgyInsert = [];
        this.csldAlCommitModel.insertList = [];
        this.csldAlCommitModel.updateList = [];
        this.csldAlCommitModel.deleteList = [];
        this.csldInsertList = [];
        this.csldCommitModel.insertList = [];

        this.csldAlInsertList = event.added;
        this.csldAlUpdateList = event.updated;
        this.csldAlDeleteList = event.removed;
        if (this.csldAlInsertList.length === 0 && this.csldAlUpdateList.length === 0
            && this.csldAlDeleteList.length === 0) {
            return;
        }
        if (this.csldModel.caseloadId === undefined || this.csldModel.caseloadId === null) {
            this.type = 'info';
            this.message = this.translateService.translate('oumacase.caseloadenter');
            this.show();
            return;
        }
        if (this.csldModel.description === undefined || this.csldModel.description === null || this.csldModel.description === '') {
            this.type = 'info';
            this.message = this.translateService.translate('oumacase.cldescription');
            this.show();
            return;
        }

        if (this.csldModel.caseloadType === null || this.csldModel.caseloadType === undefined) {
            this.type = 'info';
            this.message = this.translateService.translate('oumacase.cllocationtype');
            this.show();
            return;
        }

        this.vCaseLoadTemp = new CaseLoads();
        this.vCaseLoadTemp = this.csldModel;

        if (this.csldModel.activeFlag) {
            this.vCaseLoadTemp.activeFlag = 'Y';
        } else {
            this.vCaseLoadTemp.activeFlag = 'N';
        }

        if (this.csldModel.trustAccountsFlag) {
            this.vCaseLoadTemp.trustAccountsFlag = 'Y';
        } else {
            this.vCaseLoadTemp.trustAccountsFlag = 'N';
        }
        if (this.csldModel.payrollFlag) {
            this.vCaseLoadTemp.payrollFlag = 'Y';
        } else {
            this.vCaseLoadTemp.payrollFlag = 'N';
        }
        if (this.csldModel.billingFlag) {
            this.vCaseLoadTemp.billingFlag = 'Y';
        } else {
            this.vCaseLoadTemp.billingFlag = 'N';
        }
        if (this.csldModel.commissaryFlag) {
            this.vCaseLoadTemp.commissaryFlag = 'Y';
        } else {
            this.vCaseLoadTemp.commissaryFlag = 'N';
        }
        if (this.csldModel.mdtFlag) {
            this.vCaseLoadTemp.mdtFlag = 'Y';
        } else {
            this.vCaseLoadTemp.mdtFlag = 'N';
        }

        this.vCaseLoadExistsTemp.caseloadId = this.csldModel.caseloadId;

        if (this.csldAlDeleteList.length > 0) {
            for (let i = 0; i < this.csldAlDeleteList.length; i++) {
                this.csldAlDeleteList[i].caseloadId = this.csldModel.caseloadId;
            }
            this.csldAlCommitModel.deleteList = this.csldAlDeleteList;
        }

        if (this.csldAlUpdateList.length > 0) {
            for (let i = 0; i < this.csldAlUpdateList.length; i++) {
                if (this.csldAlUpdateList[i].updateAllowedFlag) {
                    this.csldAlUpdateList[i].updateAllowedFlag = 'Y';
                } else {
                    this.csldAlUpdateList[i].updateAllowedFlag = 'N';
                }
            }
            this.csldAlCommitModel.updateList = this.csldAlUpdateList;
        }


        if (this.csldAlInsertList.length > 0) {

            this.channelArray = [];
            for (let i = 0; i < this.listToCompare.length; i++) {
                this.channelArray.push(this.listToCompare[i]);
            }
            for (let i = 0; i < this.csldAlInsertList.length; i++) {
                if (this.csldAlInsertList[i].agyLocId === undefined ||
                    this.csldAlInsertList[i].agyLocId === null) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumacase.selectlocation');
                    this.show();
                    return;
                }
                if (this.channelArray.includes(this.csldAlInsertList[i].agyLocId)) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumacase.agencylocationalreadyexists');
                    this.show();
                    return;
                } else {
                    this.channelArray.push(this.csldAlInsertList[i].agyLocId);
                    if (this.csldAlInsertList[i].updateAllowedFlag) {
                        this.csldAlInsertList[i].updateAllowedFlag = 'Y';
                    } else {
                        this.csldAlInsertList[i].updateAllowedFlag = 'N';
                    }
                    this.csldAlInsertList[i].caseloadId = this.csldModel.caseloadId;
                }
            }

            this.csldAlCommitModel.insertList = this.csldAlInsertList;
        }

        if (this.csldAlCommitModel.insertList.length === 0 && this.csldAlCommitModel.updateList.length === 0
            && this.csldAlCommitModel.deleteList.length === 0) {
            return;
        }

        if (!this.retCreateFlag) {
            const csldCheckAgency = this.oumacaseFactory.executeQuery(this.vCaseLoadExistsTemp);
            csldCheckAgency.subscribe(data => {
                if (data.length >= 1) {
                    this.csldModel = new CaseLoads();
                    this.csldModel.caseloadId = this.vCaseLoadExistsTemp.caseloadId;
                    this.type = 'warn';
                    this.message = this.translateService.translate('oumacase.caseloadalreadyexists');
                    this.populateDetails();
                    this.show();
                    return;
                } else {
                    this.csldInsertList.push(this.vCaseLoadTemp);
                    this.csldCommitModel.insertList = this.csldInsertList;
                    const csldSaveData = this.oumacaseFactory.csldCommit(this.csldCommitModel);
                    const csldalSaveData = this.oumacaseFactory.alCommit(this.csldAlCommitModel);
                    csldSaveData.subscribe(inResult => {
                        if (inResult === 1) {
                            this.retCreateFlag = false;
                            csldalSaveData.subscribe(csldAgency => {
                                if (csldAgency === 1) {
                                    this.type = 'success';
                                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                                    this.csldModel = new CaseLoads();
                                    this.csldModel.caseloadId = this.vCaseLoadExistsTemp.caseloadId;
                                    this.populateDetails();
                                    this.saveFlag = true;
                                    this.verifySave = false;
                                    this.show();
                                    return;
                                } else {
                                    this.type = 'error';
                                    this.saveFlag = true;
                                    this.verifySave = false;
                                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                                    this.show();
                                    return;
                                }
                            });
                        } else {
                            this.type = 'error';
                            this.saveFlag = true;
                            this.verifySave = false;
                            this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                            this.show();
                            return;
                        }
                    });
                }

            });

        } else {

            if (this.updateClFields) {
                this.csldUpdateList.push(this.vCaseLoadTemp);
                this.csldCommitModel.updateList = this.csldUpdateList;
                const csldSaveData = this.oumacaseFactory.csldCommit(this.csldCommitModel);
                csldSaveData.subscribe(inResult => {
                    if (inResult === 1) {
                        this.saveFlag = true;
                        this.verifySave = false;
                        this.type = 'success';
                        this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                        return;
                    } else {
                        this.type = 'error';
                        this.saveFlag = true;
                        this.verifySave = false;
                        return;

                    }
                });
            }
            const csldalSaveData = this.oumacaseFactory.alCommit(this.csldAlCommitModel);
            csldalSaveData.subscribe(inResult => {
                if (inResult === 1) {
                    this.type = 'success';
                    this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                    this.saveFlag = true;
                    this.verifySave = false;
                    this.csldModel = new CaseLoads();
                    this.csldModel.listSeq = 99;
                    this.executeQuery();
                    this.show();
                    return;
                } else {
                    this.type = 'error';
                    this.saveFlag = true;
                    this.verifySave = false;
                    this.csldModel = new CaseLoads();
                    this.csldModel.listSeq = 99;
                    this.executeQuery();
                    this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                    this.show();
                    return;
                }
            });
        }
    }

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }
    updateFlagValidator = (event) => {
        const rowdata = new ValidateRowReturn();
        if (event.field === 'updateAllowedFlag') {
            if (event.oldValue !== event.newValue) {
                rowdata.validated = true;
                rowdata.data = { updateAllowedFlag: event.newValue, updateAllowedFlagTemp: event.oldValue };
                this.saveFlag = true;
                this.verifySave = true;
            } else {
                this.saveFlag = false;
                this.verifySave = false;
            }
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;
    }

    butOffendersKeyNextItemTrigger() {
        if (this.lstOfCaseLoads.length === 0) {
            return;
        }
        if ((this.csldIndex) < this.lstOfCaseLoads.length - 1) {
            this.csldIndex = this.index + 1;
            this.csldModel = this.lstOfCaseLoads[this.csldIndex];
            this.vCaseLoadTemp = this.lstOfCaseLoads[this.csldIndex];
            this.activeFlag = true;
            this.saveFlag = true;
            this.deactivationFlag = true;
            this.csldReadOnly = true;
            this.prevFlag = false;
            this.verifySave = false;
            if (!this.csldModel.caseloadType) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumacase.caseloadtypeshouldbeentered');
                this.show();
                return;
            }
            this.csldalExecuteQuery();
            this.index = this.index + 1;
        } else {
            this.nextFlag = true;
            this.prevFlag = false;
            this.type = 'warning';
            this.message = this.translateService.translate('common.lastrecordof');
            this.show();
        }

    }

    butOffendersKeyPrevItemTrigger() {
        if (this.lstOfCaseLoads.length === 0) {
            return;
        }
        if (this.csldIndex >= 1) {
            this.csldIndex = this.csldIndex - 1;
            this.index = this.csldIndex;
            this.csldModel = this.lstOfCaseLoads[this.csldIndex];
            this.vCaseLoadTemp = this.lstOfCaseLoads[this.csldIndex];
            this.deactivationFlag = true;
            this.activeFlag = true;
            this.saveFlag = true;
            this.disabled = true;
            this.nextFlag = false;
            this.verifySave = false;
            this.csldalExecuteQuery();
        } else {
            this.prevFlag = true;
            this.nextFlag = false;
        }
    }
    /*
     * This is event is fired and do the validations when click on Remove button in Grid in Accesssible Agency Block.
     */
    onGridAgyLocDelete = () => {
        let inCount = 0;
        for (let i = 0; i < this.csldalData.length; i++) {
            if (!this.csldalData[i].agyLocId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumacase.selectlocation');
                this.show();
                return false;
            }
            if (this.csldalData.length === 1 && this.csldalData[i].caseloadId) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumacase.cannotdeletemasterrecord');
                this.show();
                return false;
            }
            if (!this.csldalData[i].caseloadId) {
                inCount = inCount + 1;
            }
        }
        if (inCount === 1) {
            this.saveFlag = false;
            this.verifySave = false;
        } else {
            this.saveFlag = true;
            this.verifySave = true;
        }
        if (this.oumaAgyLocIndex >= 1) {
            this.oumaAgyLocIndex = this.oumaAgyLocIndex - 1;
        }
        return true;
    }
    onGridReady = () => {
        if (!this.csldModel.caseloadId) {
            this.type = 'warn';
            this.message = this.translateService.translate('oumacase.youcannotcreatearecordwithoutaparentrecord');
            this.show();
            return;
        }
        if (!this.csldModel.description) {
            this.type = 'info';
            this.message = this.translateService.translate('oumacase.cldescription');
            this.show();
            return;
        }

        if (!this.csldModel.caseloadType) {
            this.type = 'info';
            this.message = this.translateService.translate('oumacase.cllocationtype');
            this.show();
            return;
        }
        for (let i = 0; i < this.csldalData.length; i++) {
            if (this.csldalData[i].agyLocId === null || this.csldalData[i].agyLocId === undefined) {
                this.type = 'warn';
                this.message = this.translateService.translate('oumacase.selectlocation');
                this.show();
                return false;
            }
            this.saveFlag = true;
            this.verifySave = true;
        }
        this.oumaAgyLocIndex = 0;
        return { agyLocId: this.agyLocId };
    }
    onRowClickcsldal(event) {

        if(event && event.createDateTime){
            this.gridDelete = true;
        }else{
            this.gridDelete = false;
        }

        if (!event.agyLocId) {

            return { agyLocId: event.agyLocId };
        }

    }
    activeFlagWhenCheckboxChangedTrigger(event) {
        this.display = false;
        if (event.checked) {
            this.csldModel.deactivationDate = null;
        } else {
            this.csldModel.deactivationDate = DateFormat.getDate(this.csldModel.deactivationDate);
        }
        this.deactivationFlag = true;
        if (this.vCaseLoadTemp.caseloadId !== null && this.vCaseLoadTemp.caseloadId !== undefined) {
            this.updateClFields = true;
            if (this.verifySave) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }

        }
    }
    isInsertable() {

        if (!this.vCaseLoadTemp.caseloadId) {
            this.retCreateFlag = false;
            this.display = false;
        } else {
            this.updateClFields = true;
            if (this.verifySave) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
            this.display = true;
        }
    }
    setType() {
        if (!this.vCaseLoadTemp.caseloadType) {
            this.updateClFields = true;
        }

        if (!this.csldModel.caseloadType) {
            if (this.verifySave) {
                this.saveFlag = true;
            } else {
                this.saveFlag = false;
            }
        }
    }
	caseloadIdEditable = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }
    deactivationDateEditable = (data: any, index: number, field: string): boolean => {
        if (data.activeFlag) {
            return false;
        } else {
            return true;
        }
    }
}
