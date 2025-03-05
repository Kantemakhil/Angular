import {
    Component, OnInit, ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OidmpconService } from '../service/oidmpcon.service';
import { OffenderPptyContainers } from '@instproperty/OffenderPptyContainers';
import { OffenderPptyContainersCommitBean } from '@instproperty/OffenderPptyContainersCommitBean';
import { OffenderSearchService } from '@common/offender-records/service/offender-search.service';
import { VPropertyHeaderBlock } from '@commonbeans/VPropertyHeaderBlock';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { OidtpritService } from '../service/oidtprit.service';
import { Router } from '@angular/router';
import { AgencyInternalLocations } from '@instoicbeans/AgencyInternalLocations';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { DialogService } from '@ui-components/dialog/dialog.service';

@Component({
    selector: 'app-oidmpcon',
    templateUrl: './oidmpcon.component.html'
})

export class OidmpconComponent implements OnInit {
    @ViewChild('grid', {static: true}) grid: any;
    actionName: string;
    lovModel: any[];
    type = 'error';
    msglist = [];
    message = ' Invalid.';
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    offconData: OffenderPptyContainers[] = [];
    offconDataTemp: OffenderPptyContainers[] = [];
    offconModel: OffenderPptyContainers = new OffenderPptyContainers();
    offconCommitModel: OffenderPptyContainersCommitBean = new OffenderPptyContainersCommitBean();
    offconIndex = 0;
    offconInsertList: OffenderPptyContainers[] = [];
    offconUpdateList: OffenderPptyContainers[] = [];
    offconDeleteList: OffenderPptyContainers[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable = true;
    offconColumnDefs: any[];
    offconActiveColumnDefs: any[];
    offConReadOnly = false;
    rgcontainercodeRg: any[] = [];
    rglocationallRg: any[] = [];
    rgstorelocationRg: any[] = [];
    rgdescription2Rg: any[] = [];
    caseLoadId: any;
    isshowing = false;
    flag: any;
    index: any;
    vHeaderBlockModel: VPropertyHeaderBlock;
    insertDate: any;
    propDate: any;
    butConInsert: boolean;
    exitflag: boolean;
    checkPptyItemLength: number;
    agencyInternalLocations: AgencyInternalLocations = new AgencyInternalLocations();
    agencyInternalLocTemp: AgencyInternalLocations = new AgencyInternalLocations();
    sealMarkValue: any;
    containerValue: any;
    enableUpdate: boolean;
    changedIndex: number;
    checkSealFlag: boolean;
    locationValueList: AgencyInternalLocations = new AgencyInternalLocations();
    checkProposalDate: boolean;
    checkExpiryDate: boolean;
    canNotBeDeactiveFlag: boolean;
    sealMarkValues: any[] = [];
    checkMultpleChangeSealVal: boolean;
    checkLocValue: boolean;
    checkLocValue1: boolean;
    checkLocValue2: boolean;
    locationMap: Map<string, string> = new Map<string, string>();
    constructor(private oidmpconFactory: OidmpconService, private offenderSearchService: OffenderSearchService,
        public translateService: TranslateService, private sessionManager: UserSessionManager,
        private oidtpritFactory: OidtpritService, private router: Router,  public dialogService: DialogService ) {
        this.vHeaderBlockModel = this.offenderSearchService.selectedOffender;
    }
    ngOnInit() {
        this.checkLocValue = false;
        this.checkLocValue2 = true;
        this.checkLocValue1 = false;
        this.checkMultpleChangeSealVal = true;
        this.checkSealFlag = false;
        this.enableUpdate = true;
        this.butConInsert = true;
        this.canNotBeDeactiveFlag = false;
        this.checkProposalDate = false;
        this.checkExpiryDate = false;
        this.caseLoadId = this.sessionManager.currentCaseLoad;
        this.offconColumnDefs = [
            {
                fieldName: this.translateService.translate('common.type1'), field: 'containerCode',
                datatype: 'lov', domain: 'PPTY_CNTNR', editable: true, width: 250, optionWidth: 300, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.proposeddisposal'), field: 'proposedDisposalDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.deactivationdate'), field: 'expiryDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canDeactiveDateEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.sealmark'), field: 'sealMark', editable: true,
                width: 200, datatype: 'text', maxlength: 20, cellEditable: this.canSealEdit
            },
            {
                fieldName: this.translateService.translate('common.location') + '*', field: 'description',
                datatype: 'lov', link: 'oidmpcon/getLocationValuesOfLov?parentField=', parentField: 'parentField',
                editable: true, width: 250, optionWidth: 500, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                datatype: 'checkbox', editable: true, width: 150, cellEditable: this.canLocationEdit
            }
        ];
        this.offconActiveColumnDefs = [
            {
                fieldName: this.translateService.translate('common.type1'), field: 'containerCode',
                datatype: 'lov', domain: 'PPTY_CNTNR', editable: true, width: 250, optionWidth: 200, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.proposeddisposal'), field: 'proposedDisposalDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.deactivationdate'), field: 'expiryDate',
                datatype: 'date', editable: true, width: 200, cellEditable: this.canDeactiveDateEdit
            },
            {
                fieldName: this.translateService.translate('oidmpcon.sealmark'), field: 'sealMark', editable: true,
                width: 200, datatype: 'text', maxlength: 20, cellEditable: this.canSealEdit
            },
            {
                fieldName: this.translateService.translate('common.location'), field: 'description',
                datatype: 'lov', link: 'oidmpcon/getLocationValuesOfLov?parentField=', parentField: 'parentField',
                editable: true, width: 250, optionWidth: 500, cellEditable: this.canLocationEdit
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                datatype: 'checkbox', editable: true, width: 150, cellEditable: this.canLocationEdit
            }
        ];
        const rglocationallServiceObj = this.oidmpconFactory.rgLocationAllRecordGroup(this.caseLoadId);
        rglocationallServiceObj.subscribe(rgLocationList => {
            if (rgLocationList.length === 0) {
                this.rglocationallRg = [];
            } else {
                for (let i = 0; i < rgLocationList.length; i++) {
                    this.rglocationallRg.push({
                        'text': rgLocationList[i].code, 'id': rgLocationList[i].internalLocationId,
                        'description': rgLocationList[i].description
                    });
                    this.locationMap.set(rgLocationList[i].code, rgLocationList[i].internalLocationId);
                }
            }
        });
        if (this.oidtpritFactory.flag && this.oidtpritFactory.checkExitFlag) {
            this.exitflag = true;
            this.oidtpritFactory.flag = false;
        } else {
            this.exitflag = false;
        }
        if (!this.vHeaderBlockModel || this.vHeaderBlockModel.offenderBookId === undefined) {
            this.type = 'warn';
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
        }
        this.offconExecuteQuery();
    }
    /*
    * Below method is used to get location from DB
    * param agyLocId of VPropertyHeaderBlock
    */
    toGetLocationValue() {
        const locationVal = this.oidmpconFactory.getLocationValue(this.vHeaderBlockModel.agyLocId);
        locationVal.subscribe(locationValue => {
           this.locationValueList = locationValue;
        });
    }
    onRowClickoffcon(event) {
        this.offconModel = new OffenderPptyContainers();
        this.changedIndex = this.offconData.indexOf(event);
        this.offconModel = event;
        for (let k = 0; k < this.rglocationallRg.length; k++) {
            if (this.rglocationallRg[k].text === this.offconModel.description) {
                this.agencyInternalLocations = new AgencyInternalLocations();
                this.agencyInternalLocations.internalLocationId = this.rglocationallRg[k].id;
            }
        }

        const checkPrimary = this.oidmpconFactory.checkPrimaryKeyOfInternalLocId(this.agencyInternalLocations);
        checkPrimary.subscribe(noprimayvalue => {
            this.agencyInternalLocTemp = new AgencyInternalLocations();
            this.agencyInternalLocTemp.description = noprimayvalue.description;
            this.agencyInternalLocTemp.internalLocationCode = noprimayvalue.internalLocationCode;

        });
        this.flag = this.offconModel.activeFlag;
        if (this.flag === false || this.offconModel.activeFlag === 'N') {
            this.isshowing = true;
        } else {
            this.isshowing = false;
        }
    }
    onOffenderChange(offender) {
        this.vHeaderBlockModel = offender;
        if (offender) {
            this.checkLocValue = false;
            this.checkLocValue2 = true;
            this.checkLocValue1 = false;
                this.enableUpdate = true;
                this.butConInsert = true;
            this.toGetLocationValue();

            this.offconExecuteQuery();
        } else {
            this.offconData = [];
            this.offconModel = new OffenderPptyContainers();
        }
    }
    /**
	 *  This function will be executed when offender is selected
	* fired
	*/
    offconExecuteQuery() {
        this.offconModel = new OffenderPptyContainers();
        if (!this.vHeaderBlockModel) {
            this.offconData = [];
            return;
        }
        this.offconModel.offenderBookId = this.vHeaderBlockModel.offenderBookId;
        this.offconModel.agyLocId = this.sessionManager.currentCaseLoad;
        const offconResult = this.oidmpconFactory.offConExecuteQuery(this.offconModel);
        offconResult.subscribe(data => {
            if (!data) {
                this.butConInsert = true;
                this.offconData = [];
            } else {
                for (let i = 0; i < data.length; i++) {
                    data[i]['parentField'] = undefined
                    + ',' + 'test'
                    + ',' + this.caseLoadId;
                    if (data[i].activeFlag === 'Y') {
                        data[i].activeFlag = true;
                    } else {
                        data[i].activeFlag = false;
                    }
                }
                this.butConInsert = true;
                this.offconData = data;
                this.offconModel = data[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is
     * fired
     */
    oidmpconSaveoffconForm(event) {
        this.offconInsertList = event.added;
        this.offconUpdateList = event.updated;
        this.offconDeleteList = event.removed;
        if (this.canNotBeDeactiveFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpcon.containermustbeempty');
            this.show();
            return;
        }
        this.offconCommitModel.insertList = [];
        this.offconCommitModel.updateList = [];
        this.offconCommitModel.deleteList = [];
        for (let i = 0; i < this.offconInsertList.length; i++) {
            if (!this.offconInsertList[i].containerCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return;
            }
            this.flag = this.offconInsertList[i].activeFlag;
            if (this.offconInsertList[i].activeFlag) {
                if (!this.offconInsertList[i].description || this.offconInsertList[i].description === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.locationmust');
                    this.show();
                    return;
                }
            }
            if (this.offconInsertList[i].activeFlag) {
                this.offconInsertList[i].activeFlag = 'Y';
            }
            if (!this.offconInsertList[i].activeFlag) {
                this.offconInsertList[i].activeFlag = 'N';
            }
            this.offconInsertList[i].caseLoadId = this.sessionManager.currentCaseLoad;
        }
        if (this.offconUpdateList.length > 0) {
            for (let i = 0; i < this.offconUpdateList.length; i++) {
                if (this.offconUpdateList[i].description) {
                this.offconUpdateList[i].internalLocationId = Number(this.locationMap.get(this.offconUpdateList[i].description));
                }
                if (this.offconUpdateList[i].proposedDisposalDate) {
                    if (this.checkProposalDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                        this.show();
                        return;
                    }
                }

                if (this.offconUpdateList[i].expiryDate) {
                        if (this.checkExpiryDate) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                        this.show();
                        return;
                    }
                }
                if (this.offconUpdateList[i].activeFlag) {
                    if (!this.offconUpdateList[i].description || this.offconUpdateList[i].description === '') {
                        this.type = 'warn';
                        this.message = this.translateService.translate('common.locationmust');
                        this.show();
                        return;
                    }
                }
                if (this.offconUpdateList[i].activeFlag) {
                    this.offconUpdateList[i].activeFlag = 'Y';
                } else {
                    this.offconUpdateList[i].activeFlag = 'N';
                    this.offconUpdateList[i].internalLocationId = undefined;
                }
                this.offconUpdateList[i].modifyDateTime = DateFormat.getDate();
                this.offconUpdateList[i].modifyUserId = this.sessionManager.getId();
            }
        }
        if (this.offconInsertList.length > 0) {
            for (let i = 0; i < this.offconInsertList.length; i++) {
                if (this.offconInsertList[i].description === this.locationValueList.description) {
                    this.offconInsertList[i].internalLocationId = this.locationValueList.internalLocationId;
                }
                if (this.offconInsertList[i].proposedDisposalDate) {
                    this.offconInsertList[i].proposedDisposalDate = DateFormat.getDate(this.offconInsertList[i].proposedDisposalDate);
                    if ((DateFormat.compareDate(DateFormat.getDate(), this.offconInsertList[i].proposedDisposalDate)) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                        this.show();
                        return;
                    }
                }

                if (this.offconInsertList[i].expiryDate) {
                    this.offconInsertList[i].expiryDate = DateFormat.getDate(this.offconInsertList[i].expiryDate);
                    if ((DateFormat.compareDate(DateFormat.getDate(), this.offconInsertList[i].expiryDate)) === 1) {
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                        this.show();
                        return;
                    }
                }

                this.offconInsertList[i].createDateTime = DateFormat.getDate();
                this.offconInsertList[i].createUserId = this.sessionManager.getId();
                this.offconInsertList[i].offenderBookId = this.vHeaderBlockModel.offenderBookId;
                this.offconInsertList[i].agyLocId = this.vHeaderBlockModel.agyLocId;
                this.offconInsertList[i].propertyOnlyFlag = 'N';
            }
        }
        if (this.offconInsertList.length > 0) {
            for (let i = 0; i < this.offconInsertList.length; i++) {
                if (this.offconInsertList[i].description) {
                this.offconInsertList[i].internalLocationId = Number(this.locationMap.get(this.offconInsertList[i].description));
                }
                        if (this.offconInsertList[i].activeFlag === 'Y') {
                            if (!this.offconInsertList[i].internalLocationId) {
                                this.type = 'info';
                                this.message = this.translateService.translate('oidmpcon.transactionroomproperty');
                                this.show();
                                return;
                            }
                        }
            }
        }
        this.offconCommitModel.insertList = this.offconInsertList;
        this.offconCommitModel.updateList = this.offconUpdateList;
        /*
        * dialogue will open when we changes the value of sealMark.
        * Condition is oldval not null and newval not null and old val not equals to new val then dialogue will open.
        * if click on save data will be save in DB.
        * if (2 line)condition fails doest open any dialogue directly goes to save saveThePptyConData() method
        */
        if (this.offconUpdateList.length > 0) {
            this.checkSealFlag = false;
            if (this.sealMarkValues.length > 0) {
                for (let l = 0; l < this.sealMarkValues.length; l++) {
                    if (this.checkMultpleChangeSealVal) {
                        if (this.sealMarkValues[l].oldVal) {
                            this.sealMarkValues[l].oldVal = this.sealMarkValues[l].oldVal.trim();
                        }
                        this.sealMarkValues[l].newVal = this.sealMarkValues[l].newVal.trim();
                        if (this.sealMarkValues[l].newVal.length > 0) {
                        if (this.sealMarkValues[l].oldVal != null && this.sealMarkValues[l].newVal != null &&
                            this.sealMarkValues[l].newVal !== this.sealMarkValues[l].oldVal) {
                            this.checkSealFlag = true;
                            this.checkMultpleChangeSealVal = false;
                            const data = {
                                label: this.translateService.translate('oidmpcon.changingthesealnumber'), yesBtn: true,
                                 yesLabel: 'OK', noBtn: false
                            };
                            this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
                                if (typeof result === 'boolean' && result) {
                                    this.sealMarkValues = [];
                                    this.saveThePptyConData();
                                } else {
                                    this.checkMultpleChangeSealVal = true;
                                }
                            });
                        }
                    }
                    }
                }
            }
        }
        if (!this.checkSealFlag) {
            this.saveThePptyConData();
            }
    }
    saveThePptyConData() {
        const offconInsertData = this.oidmpconFactory.offConCommit(this.offconCommitModel);
        offconInsertData.subscribe(insertdata => {
            if (insertdata === 1) {
                this.checkMultpleChangeSealVal = true;
                this.sealMarkValues = [];
                this.type = 'success';
                this.message = this.translateService.translate('common.addupdateremoverecordsuccess');
                this.show();
                this.offconExecuteQuery();
            } else if (insertdata === 5) {
                this.type = 'info';
                this.message = this.translateService.translate('oidmpcon.storagelocationreachedmax');
                this.show();
            } else if (insertdata === 10) {
                this.type = 'info';
                this.message = this.translateService.translate('oidmpcon.errormoduleomtocont');
                this.show();
                return;
            } else {
                this.offconData = insertdata;
                this.checkMultpleChangeSealVal = true;
                this.type = 'warn';
                this.message = this.translateService.translate('common.addupdateremoverecordfailed');
                this.show();
                this.offconExecuteQuery();
            }
        });
    }

    onConInsert = () => {
        if (!this.vHeaderBlockModel) {
            this.offconData = [];
            this.message = this.translateService.translate('common.pleasesearchforvalidoffender');
            this.show();
            return;
        }
        if (this.vHeaderBlockModel.inOutStatus === 'TRN') {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpcon.offendertransit');
            this.show();
            return;
        }
        for (let i = 0; i < this.offconData.length; i++) {
            if (!this.offconData[i].containerCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('common.typemustbeentered');
                this.show();
                return null;
            }
            this.flag = this.offconData[i].activeFlag;
            if (this.flag === true || this.offconData[i].activeFlag === 'Y') {
                if (!this.offconData[i].description || this.offconData[i].description === '') {
                    this.type = 'warn';
                    this.message = this.translateService.translate('common.locationmust');
                    this.show();
                    return null;
                }
            }
        }
        const descriptionTemp = { value: null };
        /*
        * this.locationValueList.internalLocationCode will be bind when
        * this.locationValueList.internalLocationId value is not null
        */
        if (this.locationValueList.internalLocationId) {
            descriptionTemp.value = this.locationValueList.internalLocationCode;
        } else {
            descriptionTemp.value = undefined;
        }

        return { activeFlag: true, description: descriptionTemp.value };
    }

    canLocationEdit = (data: any, index: number, field: string): boolean => {
        var internalLocationId;
        if (!data.description) {
           internalLocationId = null;
        } else {
            internalLocationId = Number(this.locationMap.get(data.description));
           // internalLocationId = data.internalLocationId;
        }
        this.offconData[index]['parentField'] = internalLocationId
        + ',' + this.vHeaderBlockModel.offenderBookId
        + ',' + this.caseLoadId;
        if (this.canNotBeDeactiveFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpcon.containermustbeempty');
            this.show();
            return false;
        }
        if (this.checkLocValue && this.checkLocValue1 && this.checkLocValue2) {
            if (data.activeFlag && !data.description) {
                return true;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return false;
            }
        }
        if (field === 'description' || field === 'sealMark') {
            if (data.activeFlag === 'Y' || data.activeFlag === true) {
                data.activeFlag = true;
                return true;
            }
            if (data.activeFlag === false || data.activeFlag === 'N') {
                data.description = '';
                data.internalLocationId = 0;
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.locationcannotupdated');
                this.show();
                return false;
            }
        } else {
            return true;
        }

    }
    /*
    * This event is fired when try to edit the deactivation date in grid
    */
    canDeactiveDateEdit = (data: any, index: number, field: string): boolean => {
        if (this.checkLocValue && this.checkLocValue1 && this.checkLocValue2) {
            if (data.activeFlag && !data.description) {
                return true;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return false;
            }
        }
        if (field === 'description' || field === 'sealMark') {
            if (data.activeFlag === 'Y' || data.activeFlag === true) {
                data.activeFlag = true;
                return true;
            }
            if (data.activeFlag === false || data.activeFlag === 'N') {
                data.description = '';
                data.internalLocationId = 0;
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.locationcannotupdated');
                this.show();
                return false;
            }
        } else {
            return true;
        }

    }

    canSealEdit = (data: any, index: number, field: string): boolean => {
        if (this.checkLocValue && this.checkLocValue1 && this.checkLocValue2) {
            if (data.activeFlag && !data.description) {
                return true;
            } else {
                this.type = 'warn';
                this.message = this.translateService.translate('common.locationmust');
                this.show();
                return false;
            }
        }
        if (this.canNotBeDeactiveFlag) {
            this.type = 'warn';
            this.message = this.translateService.translate('oidmpcon.containermustbeempty');
            this.show();
            return false;
        }
        if (field === 'sealMark' && this.changedIndex === index && data.pptyItemLength > 0) {
            return true;

        } else if (data) {
            this.type = 'info';
            this.message = this.translateService.translate('common.fieldisprotectedagainstupdated');
            this.show();
            return false;
        }
    }

    /**
     * This function auto generates the locationChange based on sealflag
     */
    locationChange = (event) => {
        // this.offconData[rowIndex]['parentField'] = event.data.internalLocationId
        // + ',' + this.vHeaderBlockModel.offenderBookId
        // + ',' + this.caseLoadId;
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        this.checkProposalDate = false;
        this.checkExpiryDate = false;
        if (this.agencyInternalLocations.internalLocationId) {
            if (!this.agencyInternalLocTemp.description && !this.agencyInternalLocTemp.internalLocationCode) {
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.noprimarykeyrowfound');
                this.show();
                rowdata.validated = true;
                rowdata.data = {
                    containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                    description: event.data.description,
                    proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                    expiryDate: event.data.expiryDate
                };
                return rowdata;
            }
        }
        if (event.field === 'expiryDate') {
            this.canNotBeDeactiveFlag = false;
            if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.data.expiryDate))) === 1) {
                this.checkExpiryDate = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                this.show();
            }
            if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.data.expiryDate))) === 0) {
                if (this.offconModel.propertyContainerId) {
                    if (event.data.containerValue > 0) {
                        this.canNotBeDeactiveFlag = true;
                        this.type = 'warn';
                        this.message = this.translateService.translate('oidmpcon.containermustbeempty');
                        this.show();
                        rowdata.validated = true;
                        return rowdata;
                    }
                }
                rowdata.validated = true;
                event.data.activeFlag = false;
                rowdata.data = { activeFlag: false };
            } else {
                rowdata.validated = true;
                event.data.activeFlag = true;
                rowdata.data = { activeFlag: true };
            }
            rowdata.data = {
                containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                description: event.data.description,
                proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                expiryDate: event.data.expiryDate
            };
            return rowdata;
        }
        if (event.field === 'proposedDisposalDate') {
            if ((DateFormat.compareDate(DateFormat.getDate(), DateFormat.getDate(event.data.proposedDisposalDate))) === 1) {
                this.checkProposalDate = true;
                this.type = 'warn';
                this.message = this.translateService.translate('oidmpcon.datemustbecurrentorfuture');
                this.show();
            }
            rowdata.validated = true;
            rowdata.data = {
                containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                description: event.data.description,
                proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                expiryDate: event.data.expiryDate
            };
            return rowdata;
        }
        if (event.field === 'description') {
            for (let i = 0 ; i < this.offconData.length; i++) {
                if (this.offconData[i].activeFlag && !this.offconData[i].description ) {
                    this.checkLocValue = true;
                    this.checkLocValue2 = true;
                } else {
                    this.checkLocValue2 = false;
                    this.checkLocValue1 = true;
                }
            }
            rowdata.validated = true;

            rowdata.data = {
                containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                description: event.data.description,
                proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                expiryDate: event.data.expiryDate
            };
            return rowdata;
        }
        if (event.field === 'sealMark') {
            this.sealMarkValues.push({'oldVal': event.oldValue, 'newVal': event.newValue, 'propId': event.data.propertyContainerId});
            rowdata.validated = true;

            rowdata.data = {
                containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                description: event.data.description,
                proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                expiryDate: event.data.expiryDate
            };
            return rowdata;
        }
        if (event.field === 'containerCode') {
            rowdata.validated = true;

            rowdata.data = {
                containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                description: event.data.description,
                proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                expiryDate: event.data.expiryDate
            };
            return rowdata;
        }
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.isshowing = false;
                if (this.locationValueList.internalLocationId) {
                    event.data.description = this.locationValueList.internalLocationCode;
                } else if (!event.data.description) {
                    event.data.description = undefined;
                }
                rowdata.validated = true;

                rowdata.data = {
                    containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                    description: event.data.description,
                    proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                    expiryDate: event.data.expiryDate
                };
                for (let i = 0 ; i < this.offconData.length; i++) {
                    if (this.offconData[i].activeFlag && !this.offconData[i].description ) {
                        this.checkLocValue = true;
                        this.checkLocValue2 = true;
                    } else {
                        this.checkLocValue1 = true;
                    }
                }
                return rowdata;
            } else {
                if (event.data.pptyItemLength > 0) {
                    this.type = 'warn';
                    this.message = this.translateService.translate('oidmpcon.cannotbedeactivated');
                    this.show();
                    setTimeout( () => {
                        this.grid.clearRecords(this.grid.gridOptions);
                    }, 10);
                    rowdata.validated = true;
                    event.data.activeFlag = true;
                    rowdata.data = {
                        containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                        description: event.data.description,
                        proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                        expiryDate: event.data.expiryDate
                    };
                    return rowdata;
                }
                event.data.activeFlag = false;
                event.data.description = undefined;
                rowdata.validated = true;
                rowdata.data = {
                    containerCode: event.data.containerCode, activeFlag: event.data.activeFlag,
                    description: event.data.description,
                    proposedDisposalDate: event.data.proposedDisposalDate, sealMark: event.data.sealMark,
                    expiryDate: event.data.expiryDate
                };
                for (let i = 0 ; i < this.offconData.length; i++) {
                    if (this.offconData[i].activeFlag && !this.offconData[i].description ) {
                        this.checkLocValue = true;
                        this.checkLocValue2 = true;
                    } else {
                        this.checkLocValue = false;
                    }
                }
                return rowdata;
            }
        }
    }
    exit() {
        this.oidtpritFactory.flag = false;
        this.oidtpritFactory.checkExitFlag = false;
        this.router.navigate(['/OIDTPRIT']);
    }
    /**
         * This function displays the messages
         */

    show() {
        this.msglist = [];
        this.msglist.push({ message: this.message, type: this.type });
        this.msgs = [...this.msglist];
    }


}

