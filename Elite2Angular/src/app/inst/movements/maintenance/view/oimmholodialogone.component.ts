import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { LivingUnits } from '@inst/demographics-biometrics/beans/LivingUnits';
import { AgyIntLocProfiles } from '../beans/AgyIntLocProfiles';
import { LivingUnitProfiles } from '../beans/LivingUnitProfiles';
import { OimmholoService } from '../service/oimmholo.service';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { LivingUnitsCommitBean } from '@inst/demographics-biometrics/beans/LivingUnitsCommitBean';
import { AgyIntLocProfilesCommitBean } from '../beans/AgyIntLocProfilesCommitBean';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { Router } from '@angular/router';
import { AppConstants } from '@core/classes/appConstants';

@Component({
    selector: 'app-oimmholodialogone',
    templateUrl: './oimmholodialogone.component.html'
})

export class OimmholoDialogOneComponent implements OnInit {
    @ViewChild('dialog', { static: true }) dialog: DialogComponent;
    @ViewChild('grid') grid: any;
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    livunitsData: LivingUnits[] = [];
    livunitsDataTemp: LivingUnits[] = [];
    livunitsModel: LivingUnits = new LivingUnits();
    livunitsModelData: LivingUnits = new LivingUnits();
    livunitsCommitModel: LivingUnitsCommitBean = new LivingUnitsCommitBean();
    livunitsIndex: number;
    livunitsInsertList: LivingUnits[] = [];
    livunitsUpdateList: LivingUnits[] = [];
    livunitsDeleteList: LivingUnits[] = [];
    usedforData: AgyIntLocProfiles[] = [];
    usedforDataTemp: AgyIntLocProfiles[] = [];
    usedforModel: AgyIntLocProfiles = new AgyIntLocProfiles();
    usedforCommitModel: AgyIntLocProfilesCommitBean = new AgyIntLocProfilesCommitBean();
    usedforIndex: number;
    usedforInsertList: AgyIntLocProfiles[] = [];
    usedforUpdateList: AgyIntLocProfiles[] = [];
    usedforDeleteList: AgyIntLocProfiles[] = [];
    unitattrData: AgyIntLocProfiles[] = [];
    unitattrDataTemp: AgyIntLocProfiles[] = [];
    unitattrModel: AgyIntLocProfiles = new AgyIntLocProfiles();
    unitattrIndex: number;
    unitattrInsertList: AgyIntLocProfiles[] = [];
    unitattrUpdatetList: AgyIntLocProfiles[] = [];
    unitattrDeleteList: AgyIntLocProfiles[] = [];
    luprofData: LivingUnitProfiles[] = [];
    luprofDataTemp: LivingUnitProfiles[] = [];
    luprofModel: LivingUnitProfiles = new LivingUnitProfiles();
    luprofIndex: number;
    luprofInsertList: LivingUnitProfiles[] = [];
    luprofUpdatetList: LivingUnitProfiles[] = [];
    luprofDeleteList: LivingUnitProfiles[] = [];
    nonassocData: AgyIntLocProfiles[] = [];
    nonassocDataTemp: AgyIntLocProfiles[] = [];
    nonassocModel: AgyIntLocProfiles = new AgyIntLocProfiles();
    nonassocIndex: number;
    nonassocInsertList: AgyIntLocProfiles[] = [];
    nonassocUpdatetList: AgyIntLocProfiles[] = [];
    nonassocDeleteList: AgyIntLocProfiles[] = [];
    seclvlData: AgyIntLocProfiles[] = [];
    seclvlDataTemp: AgyIntLocProfiles[] = [];
    seclvlModel: AgyIntLocProfiles = new AgyIntLocProfiles();
    seclvlIndex: number;
    seclvlInsertList: AgyIntLocProfiles[] = [];
    seclvlUpdatetList: AgyIntLocProfiles[] = [];
    seclvlDeleteList: AgyIntLocProfiles[] = [];
    minDate: Date;
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    disabled: boolean;
    editable: boolean;
    unitAttrColumnDef: any[];
    lglUpdUsagesColumnDef: any[];
    usedForColumnDef: any[];
    secLvlColumnDef: any[];
    livUnitsColumnDef: any[];
    nonAssocColumnDef: any[];
    lglUpdUsagesReadOnly: boolean;
    ctlBlkReadOnly: boolean;
    livUnitsReadOnly: boolean;
    usedForReadOnly: boolean;
    unitAttrReadOnly: boolean;
    buttonsReadOnly: boolean;
    nonAssocReadOnly: boolean;
    secLvlReadOnly: boolean;
    buttons2ReadOnly: boolean;
    listAttrReadOnly: boolean;
    rgagyloclovRg: any[] = [];
    rgdeactlursnRg: any[] = [];
    rgusedforRg: any[] = [];
    rghouunitattRg: any[] = [];
    rgnonassotypeRg: any[] = [];
    rgsuplvltypeRg: any[] = [];
    rghouuntypeRg: any[] = [];
    message = ' Invalid.';
    type = 'error';
    msglist = [];
    tableIndex = -1;
    pageNumber: string;
    callBlock: string;
    alertInsert: boolean;
    agyLocId: any;
    activeFlagValid: boolean;
    commentReadOnly: boolean;
    nextButDisabled: boolean;
    historyButDisabled: boolean;
    alertInsertOne: boolean;
    enableDeleteOne: boolean;
    enableDeleteTwo: boolean;
    enableDeleteThree: boolean;
    enableDeleteFour: boolean;
    housingReadOnly: boolean;
    selectedTabIndex: number;
    attributsData: any;
    nonAssociationData: any;
    commentText: any;
    clearDisabled: boolean;
    savedisabled: boolean;
    deactivateFlag: boolean;
    agyLocIdTemp: string;
    isLoading: boolean;
    facilityIepLevel: string;
    ieplevelColumnDef: any[];
    ieplevelData: AgyIntLocProfiles[] = [];
    iepLevelInsertList: AgyIntLocProfiles[] = [];
    iepLevelUpdateList: AgyIntLocProfiles[] = [];
    iepLevelDeleteList: AgyIntLocProfiles[] = [];
    iepLevelCommitModel: AgyIntLocProfilesCommitBean = new AgyIntLocProfilesCommitBean();
    parentIepLevel: string;
    enableIepInsert: boolean = true;
    activeFlag: boolean;
    lvlOneActiveFlag: boolean;
    constructor(private oimmholoFactory: OimmholoService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager,
        public dialogService: DialogService, private router: Router) {
        this.unitAttrColumnDef = [];
        this.lglUpdUsagesColumnDef = [];
        this.usedForColumnDef = [];
        this.secLvlColumnDef = [];
        this.livUnitsColumnDef = [];
        this.nonAssocColumnDef = [];
    }
    ngOnInit() {
        this.agyLocId = this.dialog.data.level2Code;
        this.agyLocIdTemp = this.dialog.data.agyLocId;
        this.activeFlag=this.dialog.data.activeFlag  
        this.lvlOneActiveFlag =this.dialog.data.levelOneActiveFlag
        this.alertInsert = true;
        this.pageNumber = 'Page 3 of 4';
        this.commentReadOnly = true;
        this.nextButDisabled = true;
        this.historyButDisabled = false;
        this.alertInsertOne = false;
        this.enableDeleteOne = false;
        this.enableDeleteTwo = false;
        this.enableDeleteThree = false;
        this.enableDeleteFour = false;
        this.housingReadOnly = true;
        this.selectedTabIndex = 0;
        this.savedisabled = true;
        this.enableIepInsert = false;
        if (this.commentText) {
            this.clearDisabled = false;
        } else {
            this.clearDisabled = true;
        }
        this.livUnitsColumnDef = [
            {
                fieldName: this.translateService.translate('oimmholo.livingunitid') + '*', field: 'livingUnitCode', editable: true,
                width: 150, datatype: 'text', cellEditable: this.canFieldsEditField, maxlength: 40, restrictCharacters : ['-']
            },
            { fieldName: this.translateService.translate('common.description'), field: 'description', editable: false, width: 150 },
            {
                fieldName: this.translateService.translate('oimmholo.maximumcapacity') + '*', field: 'capacity', editable: true, width: 150,
                cellEditable: this.canCapacityEdit, datatype: 'number', maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oimmholo.operationalcapacity'), field: 'operationCapacity', editable: true,
                width: 150, cellEditable: this.canFieldsEdit, datatype: 'number', maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oimmholo.unittype') + '*', field: 'housingUnitType', editable: true,
                width: 150, datatype: 'lov', domain: 'HOU_UN_TYPE',
                cellEditable: this.canFieldsEdit
            },
            {
                fieldName: this.translateService.translate('common.sequencename') + '*', field: 'listSeq', editable: true, width: 150,
                cellEditable: this.canFieldsEdit, datatype: 'number', maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', width: 150,
                datatype: 'checkbox',editable: this.activeFlag && this.lvlOneActiveFlag
            },
            {
                fieldName: this.translateService.translate('oimmholo.deactivatedate'), field: 'deactivateDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: this.translateService.translate('oimmholo.deactivatereason'), field: 'deactivateReasonCode', editable: true,
                width: 150, datatype: 'lov', domain: 'LIV_UN_RSN', cellEditable: this.canAlertEdit
            },
        ];
        this.unitAttrColumnDef = [
            {
                fieldName: this.translateService.translate('oimmholo.unitattributes'), field: 'intLocProfileCode',
                editable: true, width: 150, datatype: 'lov', domain: 'HOU_UNIT_ATT', cellEditable: this.canFieldsEditOne
            },
        ];
        this.usedForColumnDef = [
            {
                fieldName: this.translateService.translate('common.usedfor'), field: 'intLocProfileCode', editable: true,
                width: 150, datatype: 'lov', domain: 'HOU_USED_FOR', cellEditable: this.canFieldsEditOne
            },
        ];
        this.secLvlColumnDef = [
            {
                fieldName: this.translateService.translate('oimmholo.securitylevel'), field: 'intLocProfileCode', editable: true,
                width: 150, datatype: 'lov', link: 'oimmholo/rgSupLvlTypeRecordGroup', cellEditable: this.canFieldsEditOne
            },
        ];
        this.nonAssocColumnDef = [
            {
                fieldName: this.translateService.translate('oimmholo.nonassociationtypes'), field: 'intLocProfileCode', editable: true,
                width: 150, datatype: 'lov', domain: 'NON_ASSO_TYP', cellEditable: this.canFieldsEditOne
            },
        ];
        this.ieplevelColumnDef = [
            {
                fieldName: this.translateService.translate('oimmholo.ieplevel'), field: 'iepLevelCode',
                editable: true, width: 150, datatype: 'lov', link: '/oidieplv/getIEPLOvs'
            },
        ];
        this.livunitsModel.parentLivingUnitId = this.dialog.data.livingUnitId;
        this.livunitsModel.agyLocId = this.dialog.data.agyLocId;
        this.livunitsModel.capacity = 3;
        this.alertInsert = true;
        this.oimmholoexecuteQuery();
        this.cellBlockData();
        this.activeYFlag();
        this.getIEPCodeExecuteQuery();
    }
    /**
     * This function displays the messages
     */
    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    click() {
        if ((this.grid.addedMap && this.grid.addedMap.size > 0) ||
            (this.grid.updatedMap && this.grid.updatedMap.size > 0) ||
            (this.grid.deletedMap && this.grid.deletedMap.size > 0)) {
            this.show(this.translateService.translate('ocdenfor.savebeforevalidation'), 'warn');
            return;
        } else {
            this.dialog.close(null);
        }
    }
    onRowClickusedfor(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableDeleteOne = true;
            } else {
                this.enableDeleteOne = false;
            }
        }
    }
    onRowClickunitattr(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableDeleteTwo = true;
            } else {
                this.enableDeleteTwo = false;
            }
        }
    }
    onRowClicknonassoc(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableDeleteThree = true;
            } else {
                this.enableDeleteThree = false;
            }
        }
    }
    onRowClickseclvl(event) {
        if (event) {
            if (event.createDatetime) {
                this.enableDeleteFour = true;
            } else {
                this.enableDeleteFour = false;
            }
        }
    }
    activeYFlag() {
        const serviceObj = this.oimmholoFactory.getFlagValidation(this.dialog.data.livingUnitId);
        serviceObj.subscribe(data => {
            if (data > 0 || !this.dialog.data.activeFlag) {
                this.alertInsert = false;
            } else {
                this.alertInsert = true;
            }
        });
    }
    cellBlockData() {
        const serviceObj = this.oimmholoFactory.cellBlockData(this.livunitsModel);
        serviceObj.subscribe(data => {
            if (data !== null) {
                this.callBlock = data;
            } else {
                this.callBlock = null;
            }
        });
    }
    onTeamLaunchClick = () => {
        if (this.selectedTabIndex === 0) {
            const serviceObj = this.oimmholoFactory.attributsData(this.livunitsModel.livingUnitId);
            serviceObj.subscribe(data => {
                if (data) {
                    this.attributsData = data;
                    this.livunitsModel['data'] = this.attributsData;
                    this.livunitsModelData['bata'] = undefined;
                    this.dialogService.openLinkDialog('/OIMMHOLOPOPUP', this.livunitsModel, 50).subscribe(result => {
                    });
                }
            });
        } else if (this.selectedTabIndex === 1) {
            const serviceObj = this.oimmholoFactory.nonAssociationData(this.livunitsModel.livingUnitId);
            serviceObj.subscribe(data => {
                if (data) {
                    this.nonAssociationData = data;
                    this.livunitsModel['data'] = undefined;
                    this.livunitsModelData['bata'] = this.nonAssociationData;
                    this.dialogService.openLinkDialog('/OIMMHOLOPOPUP', this.livunitsModelData, 50).subscribe(result => {
                    });
                }
            });
        }
    }
    onRowClicklivunits(event) {
        if (event) {
            this.enableIepInsert = true;
            this.usedforData = [];
            this.unitattrData = [];
            this.unitattrModel = new AgyIntLocProfiles();
            this.nonassocData = [];
            this.nonassocModel = new AgyIntLocProfiles();
            this.seclvlData = [];
            this.seclvlModel = new AgyIntLocProfiles();
            this.livunitsModel = event;
            this.livunitsModelData = event;
            this.usedforModel = new AgyIntLocProfiles();
            this.commentText = this.livunitsModel.commentText;
            if (this.livunitsModel.livingUnitId) {
                this.nextButDisabled = false;
                if (!this.livunitsModel.activeFlag) {
                    this.alertInsertOne = false;
                } else {
                    this.alertInsertOne = true;
                }
                this.usedforModel.internalLocationId = this.livunitsModel.livingUnitId;
                this.usedforExecuteQuery();
                this.unitattrModel.internalLocationId = this.livunitsModel.livingUnitId;
                this.unitattrExecuteQuery();
                this.nonassocModel.internalLocationId = this.livunitsModel.livingUnitId;
                this.nonassocExecuteQuery();
                this.seclvlModel.internalLocationId = this.livunitsModel.livingUnitId;
                this.seclvlExecuteQuery();
                this.activeFlagValidation();
                this.housingReadOnly = false;
            } else {
                this.nextButDisabled = true;
                this.alertInsertOne = false;
                this.housingReadOnly = true;
            }
            this.commentReadOnly = false;
            this.getIEPCodeExecuteQuery();
        } else {
            this.commentReadOnly = true;
            this.nextButDisabled = true;
            this.alertInsertOne = false;
            this.housingReadOnly = true;
            this.usedforData = [];
            this.unitattrData = [];
            this.unitattrModel = new AgyIntLocProfiles();
            this.nonassocData = [];
            this.nonassocModel = new AgyIntLocProfiles();
            this.seclvlData = [];
            this.seclvlModel = new AgyIntLocProfiles();
        }
    }
    setDescription() {
        this.usedforExecuteQuery();
        this.unitattrExecuteQuery();
    }
    setDescriptionOne() {
        this.nonassocExecuteQuery();
        this.seclvlExecuteQuery();
    }
    activeFlagValidation() {
        const serviceObj = this.oimmholoFactory.getActiveFlagValidation(this.livunitsModel.livingUnitId);
        serviceObj.subscribe(data => {
            if (data > 0) {
                this.activeFlagValid = true;
            } else {
                this.activeFlagValid = false;
            }
        });
    }
    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (this.deactivateFlag) {
            return true;
        } else {
            return false;
        }
    }
    canCapacityEdit = (data: any, index: number, field: string): boolean => {
        if (data.lowestLevelFlag && data.lowestLevelFlag !== 'Y') {
            return false;
        } else {
            return true;
        }
    }
    canFieldsEdit = (data: any, index: number, field: string): boolean => {
        if (data.activeFlag) {
            return true;
        } else {
            return false;
        }
    }
    canFieldsEditField = (data: any, index: number, field: string): boolean => {
        if (!data.level1Code) {
            return true;
        } else {
            return false;
        }
    }
    canFieldsEditOne = (data: any, index: number, field: string): boolean => {
        if (this.livunitsModel.activeFlag) {
            return true;
        } else {
            return false;
        }
    }
    onGridInsert = () => {
        return { activeFlag: true };
    }
    onGridInsertOne = () => {
        if (!this.aveusedforFormValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    onGridInsertTwo = () => {
        if (!this.unitattrFormValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    onGridInsertThree = () => {
        if (!this.nonassocFormValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    onGridInsertFour = () => {
        if (!this.seclvlFormValidations()) {
            return;
        }
        return { activeFlag: true };
    }
    onGridClear = () => {
        if (this.livunitsData.length === 0) {
            this.commentReadOnly = true;
        }
        this.oimmholoexecuteQuery();
        return true;
    }
    cancel() {
        this.agyLocId = undefined;
    }
    exitButton() {
        this.dialog.close('BACKBUTTON');
        //this.router.navigate(["/OIMMHOLO"]);
    }
    validateRowData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        rowdata.validated = true;
        if (event.field === 'activeFlag') {
            if (this.activeFlagValid && !event.data.activeFlag) {
                this.grid.setColumnData('activeFlag', rowIndex, true);
                this.show('oimmholo.deactivationnotpermitted');
                rowdata.validated = true;
                return rowdata;
            }
            if (event.data.activeFlag) {
                this.grid.setColumnData('deactivateDate', rowIndex, undefined);
                this.grid.setColumnData('deactivateReasonCode', rowIndex, undefined);
                this.deactivateFlag = false;
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('deactivateDate', rowIndex, DateFormat.getDate());
                this.deactivateFlag = true;
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'operationCapacity' || event.field === 'capacity') {
            if (event.data.capacity === 0) {
                event.data.capacity = '0';
            }
            if (event.data.capacity && event.data.noOfOccupant && (event.data.noOfOccupant > Number(event.data.capacity))) {
                this.show(event.data.noOfOccupant+' '+this.translateService.translate('oimmholo.noofoccupantcannotbegreatherthancapacity'), 'warn');
                rowdata.validated = true;
                return rowdata;
            }
            if (event.data.operationCapacity && event.data.capacity
                && (Number(event.data.capacity) < Number(event.data.operationCapacity))) {
                this.show('oimmholo.operationalcapacitycannotbegreaterthanmax');
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'livingUnitCode') {
            if (event.data.livingUnitCode && event.data.livingUnitCode.trim()) {
                this.livunitsModel = new LivingUnits();
                this.livunitsModel.agyLocId = this.agyLocId;
                this.livunitsModel.livingUnitId = this.dialog.data.livingUnitId;
                this.livunitsModel.livingUnitCode = event.data.livingUnitCode;
                const serviceObj = this.oimmholoFactory.getResDescValues(this.livunitsModel);
                serviceObj.subscribe(data => {
                    if (data && data.description !== null) {
                        this.grid.setColumnData('description', rowIndex, data.description);
                        rowdata.validated = true;
                        return rowdata;
                    }
                });
            } else {
                this.grid.setColumnData('livingUnitCode', rowIndex, undefined);
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimmholoSavelivunitsForm(event) {
        
        this.livunitsInsertList = event.added;
        this.livunitsUpdateList = event.updated;
        this.livunitsDeleteList = event.removed;
        this.livunitsCommitModel.insertList = [];
        this.livunitsCommitModel.updateList = [];
        this.livunitsCommitModel.deleteList = [];
        if (this.livunitsInsertList.length > 0 || this.livunitsUpdateList.length > 0) {
            for (let i = 0; i < this.livunitsInsertList.length; i++) {
                this.livunitsInsertList[i].activeFlag = this.livunitsInsertList[i].activeFlag ? 'Y' : 'N';
                this.livunitsInsertList[i].controlActiveFlag = 'Y';
                this.livunitsInsertList[i].certifiedFlag = 'N';
                this.livunitsInsertList[i].lowestLevelFlag = 'Y';
                this.livunitsInsertList[i].reachOperCapacityFlag = 'N';
                this.livunitsInsertList[i].level1Code = this.livunitsInsertList[i].livingUnitCode;
                this.livunitsInsertList[i].luType = this.callBlock;
                this.livunitsInsertList[i].agyLocId = this.agyLocIdTemp;
                this.livunitsInsertList[i].parentLivingUnitId = this.dialog.data.livingUnitId;
                this.livunitsInsertList[i].commentText = this.commentText;
                this.livunitsCommitModel.insertList = this.livunitsInsertList;
                if (!this.oimilocaValidations(this.livunitsInsertList)) {
                    return;
                }
            }
            for (let i = 0; i < this.livunitsUpdateList.length; i++) {
                this.livunitsUpdateList[i].activeFlag = this.livunitsUpdateList[i].activeFlag ? 'Y' : 'N';
                this.livunitsCommitModel.updateList = this.livunitsUpdateList;
                if (!this.oimilocaValidations(this.livunitsUpdateList)) {
                    return;
                }
            }
        }
        if (this.livunitsDeleteList.length > 0) {
            for (let i = 0; i < this.livunitsDeleteList.length; i++) {
                this.livunitsDeleteList[i].activeFlag = this.livunitsDeleteList[i].activeFlag ? 'Y' : 'N';
                this.livunitsCommitModel.deleteList = this.livunitsDeleteList;
            }
        }
        this.livunitsCommitModel.housingLevel = 3;
        const livunitsSaveData = this.oimmholoFactory.livUnitsCommit(this.livunitsCommitModel);
        livunitsSaveData.subscribe(data => {
            if (data !== null && data.length > 2) {
                this.show(this.translateService.translate('oimmholo.rowalreadyexists').replace('%table%', data));
                this.oimmholoexecuteQuery();
                return;
            } else if (data === 2) {
                this.show('oimmholo.thereshouldbeatleastonelevel');
                return;
            } else if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.oimmholoexecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.oimmholoexecuteQuery();
                return;
            }
        });
    }
    onButSave() {
        this.livunitsUpdateList = [];
        this.livunitsCommitModel.insertList = [];
        this.livunitsCommitModel.updateList = [];
        this.livunitsModel.commentText = this.commentText;
        this.livunitsModel.code = 'UPDATE';
        this.livunitsModel.activeFlag = this.livunitsModel.activeFlag ? 'Y' : 'N';
        this.livunitsUpdateList.push(this.livunitsModel);
        this.livunitsCommitModel.updateList = this.livunitsUpdateList;
        if (!this.livunitsData[this.livunitsData.length - 1].livingUnitId) {
            this.type = 'warn';
            this.show('ocdalert.pleasesavetheaboverecords');
            this.savedisabled = true;
            return;
        }
        if (!this.savedisabled) {
            const alertSaveData = this.oimmholoFactory.livUnitsCommit(this.livunitsCommitModel);
            alertSaveData.subscribe(alertSaveResult => {
                if (alertSaveResult === 1) {
                    this.savedisabled = true;
                    this.livunitsModel.code = undefined;
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    return;
                }
            });
        }
    }
    clear() {
        this.commentText = undefined;
        this.clearDisabled = true;
        this.savedisabled = false;
    }
    isInsertable() {
        if (this.commentText) {
            this.savedisabled = false;
            this.clearDisabled = false;
        } else {
            this.savedisabled = false;
            this.clearDisabled = true;
        }
    }
    oimmholoexecuteQuery() {
        this.livunitsModel = new LivingUnits();
        this.livunitsModel.parentLivingUnitId = this.dialog.data.livingUnitId;
        this.livunitsModel.agyLocId = this.dialog.data.agyLocId;
        this.livunitsModel.capacity = 3;
        const serviceObj = this.oimmholoFactory.livUnitsDialogExecuteQuery(this.livunitsModel);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.deactivateReasonCodeTemp = element.deactivateReasonCode;
                });
                this.livunitsData = data;
                this.tableIndex = 0;
                this.deactivateFlag = false;
            }
        });
    }
    usedforExecuteQuery() {
        this.usedforModel.sealFlag = 'UNITFOR';
        const usedforResult = this.oimmholoFactory.usedForExecuteQuery(this.usedforModel);
        usedforResult.subscribe(data => {
            if (data.length === 0) {
                this.usedforData = [];
            } else {
                this.usedforData = data;
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimmholoSaveusedforForm(event) {
        if (!this.aveusedforFormValidations()) {
            return;
        }
        this.usedforInsertList = event.added;
        this.usedforUpdateList = event.updated;
        this.usedforDeleteList = event.removed;
        this.usedforCommitModel.insertList = [];
        this.usedforCommitModel.updateList = [];
        this.usedforCommitModel.deleteList = [];
        if (this.usedforInsertList.length > 0 || this.usedforUpdateList.length > 0) {
            for (let i = 0; i < this.usedforInsertList.length; i++) {
                this.usedforInsertList[i].internalLocationId = this.livunitsModel.livingUnitId;
                this.usedforInsertList[i].intLocProfileType = 'HOU_USED_FOR';
                this.usedforCommitModel.insertList = this.usedforInsertList;
            }
            for (let i = 0; i < this.usedforUpdateList.length; i++) {
                this.usedforCommitModel.updateList = this.usedforUpdateList;
            }
        }
        if (this.usedforDeleteList.length > 0) {
            for (let i = 0; i < this.usedforDeleteList.length; i++) {
                this.usedforCommitModel.deleteList = this.usedforDeleteList;
            }
        }
        const usedforSaveData = this.oimmholoFactory.usedForCommit(this.usedforCommitModel);
        usedforSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.usedforExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.usedforExecuteQuery();
                return;
            }
        });
    }
    unitattrExecuteQuery() {
        this.unitattrModel.sealFlag = 'UNITATTR';
        const unitattrResult = this.oimmholoFactory.usedForExecuteQuery(this.unitattrModel);
        unitattrResult.subscribe(data => {
            if (data.length === 0) {
                this.unitattrData = [];
            } else {
                this.unitattrData = data;
                this.unitattrModel = data[0];
            }
        });
    }
    oimilocaValidations(saveData) {
        const is = { valid: true };
        saveData.forEach(element => {
            if (!element.livingUnitCode || !element.livingUnitCode.trim()) {
                this.show('oimmholo.livingunitidmustbeentered');
                is.valid = false;
                return is.valid;
            }
            if (!element.capacity && element.capacity !== 0) {
                this.show('oimmholo.maximumcapacitymustbeentered');
                is.valid = false;
                return is.valid;
            }
            if (!element.housingUnitType) {
                this.show('oimmholo.unittypemustbeentered');
                is.valid = false;
                return is.valid;
            }
            if (!element.listSeq && element.listSeq !== 0) {
                this.show('common.sequencemustbeentered');
                is.valid = false;
                return is.valid;
            }
            if (element.capacity && element.noOfOccupant && (element.noOfOccupant > Number(element.capacity))) {
                this.show(element.noOfOccupant +' '+this.translateService.translate('oimmholo.noofoccupantcannotbegreatherthancapacity'), 'warn');
                is.valid = false;
                return is.valid;
            }
            if (element.capacity && element.operationCapacity && (Number(element.capacity) < Number(element.operationCapacity))) {
                this.show('oimmholo.operationalcapacitycannotbegreaterthanmax');
                is.valid = false;
                return is.valid;
            }
            if (!element.activeFlag && !element.deactivateReasonCode) {
                this.show('oimmholo.deactivatereasonmustbeentered');
                is.valid = false;
                return is.valid;
            }
        });
        return is.valid;
    }
    aveusedforFormValidations() {
        const is = { valid: true };
        const usedFor = 'HOU_USED_FOR';
        this.usedforData.forEach(element => {
            if (!element.intLocProfileCode) {
                this.show('oimmholo.recordcannotbesavedwithnovaluepleasecleartherecord');
                is.valid = false;
                return is.valid;
            }
            for (let x = 0; x < this.usedforData.length; x++) {
                for (let y = 0; y < this.usedforData.length; y++) {
                    if (x !== y) {
                        if (this.usedforData[x].intLocProfileCode === this.usedforData[y].intLocProfileCode &&
                            usedFor === usedFor) {
                            this.show('oimmholo.rowexistsalreadywiththesameliving');
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    unitattrFormValidations() {
        const is = { valid: true };
        const usedFor = 'HOU_UNIT_ATT';
        this.unitattrData.forEach(element => {
            if (!element.intLocProfileCode) {
                this.show('oimmholo.recordcannotbesavedwithnovaluepleasecleartherecord');
                is.valid = false;
                return is.valid;
            }
            for (let x = 0; x < this.unitattrData.length; x++) {
                for (let y = 0; y < this.unitattrData.length; y++) {
                    if (x !== y) {
                        if (this.unitattrData[x].intLocProfileCode === this.unitattrData[y].intLocProfileCode &&
                            usedFor === usedFor) {
                            this.show('oimmholo.rowexistsalreadywiththesameliving');
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    nonassocFormValidations() {
        const is = { valid: true };
        const usedFor = 'NON_ASSO_TYP';
        this.nonassocData.forEach(element => {
            if (!element.intLocProfileCode) {
                this.show('oimmholo.recordcannotbesavedwithnovaluepleasecleartherecord');
                is.valid = false;
                return is.valid;
            }
            for (let x = 0; x < this.nonassocData.length; x++) {
                for (let y = 0; y < this.nonassocData.length; y++) {
                    if (x !== y) {
                        if (this.nonassocData[x].intLocProfileCode === this.nonassocData[y].intLocProfileCode &&
                            usedFor === usedFor) {
                            this.show('oimmholo.rowexistsalreadywiththesameliving');
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    seclvlFormValidations() {
        const is = { valid: true };
        const usedFor = 'SUP_LVL_TYPE';
        this.seclvlData.forEach(element => {
            if (!element.intLocProfileCode) {
                this.show('oimmholo.recordcannotbesavedwithnovaluepleasecleartherecord');
                is.valid = false;
                return is.valid;
            }
            for (let x = 0; x < this.seclvlData.length; x++) {
                for (let y = 0; y < this.seclvlData.length; y++) {
                    if (x !== y) {
                        if (this.seclvlData[x].intLocProfileCode === this.seclvlData[y].intLocProfileCode &&
                            usedFor === usedFor) {
                            this.show('oimmholo.rowexistsalreadywiththesameliving');
                            is.valid = false;
                            return;
                        }
                    }
                }
            }
        });
        return is.valid;
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimmholoSaveunitattrForm(event) {
        if (!this.unitattrFormValidations()) {
            return;
        }
        this.usedforInsertList = event.added;
        this.usedforUpdateList = event.updated;
        this.usedforDeleteList = event.removed;
        this.usedforCommitModel.insertList = [];
        this.usedforCommitModel.updateList = [];
        this.usedforCommitModel.deleteList = [];
        if (this.usedforInsertList.length > 0 || this.usedforUpdateList.length > 0) {
            for (let i = 0; i < this.usedforInsertList.length; i++) {
                this.usedforInsertList[i].internalLocationId = this.livunitsModel.livingUnitId;
                this.usedforInsertList[i].intLocProfileType = 'HOU_UNIT_ATT';
                this.usedforCommitModel.insertList = this.usedforInsertList;
            }
            for (let i = 0; i < this.usedforUpdateList.length; i++) {
                this.usedforCommitModel.updateList = this.usedforUpdateList;
            }
        }
        if (this.usedforDeleteList.length > 0) {
            for (let i = 0; i < this.usedforDeleteList.length; i++) {
                this.usedforCommitModel.deleteList = this.usedforDeleteList;
            }
        }
        const usedforSaveData = this.oimmholoFactory.usedForCommit(this.usedforCommitModel);
        usedforSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.unitattrExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.unitattrExecuteQuery();
                return;
            }
        });
    }
    luprofExecuteQuery() {
        const luprofResult = this.oimmholoFactory.luProfExecuteQuery(this.luprofModel);
        luprofResult.subscribe(data => {
            if (data.length === 0) {
                this.luprofData = [];
            } else {
                this.luprofData = data;
                this.luprofModel = data[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimmholoSavenonassocForm(event) {
        if (!this.nonassocFormValidations()) {
            return;
        }
        this.usedforInsertList = event.added;
        this.usedforUpdateList = event.updated;
        this.usedforDeleteList = event.removed;
        this.usedforCommitModel.insertList = [];
        this.usedforCommitModel.updateList = [];
        this.usedforCommitModel.deleteList = [];
        if (this.usedforInsertList.length > 0 || this.usedforUpdateList.length > 0) {
            for (let i = 0; i < this.usedforInsertList.length; i++) {
                this.usedforInsertList[i].internalLocationId = this.livunitsModel.livingUnitId;
                this.usedforInsertList[i].intLocProfileType = 'NON_ASSO_TYP';
                this.usedforCommitModel.insertList = this.usedforInsertList;
            }
            for (let i = 0; i < this.usedforUpdateList.length; i++) {
                this.usedforCommitModel.updateList = this.usedforUpdateList;
            }
        }
        if (this.usedforDeleteList.length > 0) {
            for (let i = 0; i < this.usedforDeleteList.length; i++) {
                this.usedforCommitModel.deleteList = this.usedforDeleteList;
            }
        }
        const usedforSaveData = this.oimmholoFactory.usedForCommit(this.usedforCommitModel);
        usedforSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.nonassocExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.nonassocExecuteQuery();
                return;
            }
        });
    }
    nonassocExecuteQuery() {
        this.nonassocModel.sealFlag = 'NONASSOTYP';
        const nonassocResult = this.oimmholoFactory.usedForExecuteQuery(this.nonassocModel);
        nonassocResult.subscribe(data => {
            if (data.length === 0) {
                this.nonassocData = [];
            } else {
                this.nonassocData = data;
                this.nonassocModel = data[0];
            }
        });
    }
    /**
     *  This function will be executed when commit event is fired
    */
    oimmholoSaveseclvlForm(event) {
        if (!this.seclvlFormValidations()) {
            return;
        }
        this.usedforInsertList = event.added;
        this.usedforUpdateList = event.updated;
        this.usedforDeleteList = event.removed;
        this.usedforCommitModel.insertList = [];
        this.usedforCommitModel.updateList = [];
        this.usedforCommitModel.deleteList = [];
        if (this.usedforInsertList.length > 0 || this.usedforUpdateList.length > 0) {
            for (let i = 0; i < this.usedforInsertList.length; i++) {
                this.usedforInsertList[i].internalLocationId = this.livunitsModel.livingUnitId;
                this.usedforInsertList[i].intLocProfileType = 'SUP_LVL_TYPE';
                this.usedforCommitModel.insertList = this.usedforInsertList;
            }
            for (let i = 0; i < this.usedforUpdateList.length; i++) {
                this.usedforCommitModel.updateList = this.usedforUpdateList;
            }
        }
        if (this.usedforDeleteList.length > 0) {
            for (let i = 0; i < this.usedforDeleteList.length; i++) {
                this.usedforCommitModel.deleteList = this.usedforDeleteList;
            }
        }
        const usedforSaveData = this.oimmholoFactory.usedForCommit(this.usedforCommitModel);
        usedforSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.seclvlExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.seclvlExecuteQuery();
                return;
            }
        });
    }
    seclvlExecuteQuery() {
        this.seclvlModel.sealFlag = 'SUPLVLTYPE';
        const seclvlResult = this.oimmholoFactory.usedForExecuteQuery(this.seclvlModel);
        seclvlResult.subscribe(data => {
            if (data.length === 0) {
                this.seclvlData = [];
            } else {
                this.seclvlData = data;
                this.seclvlModel = data[0];
            }
        });
    }

    nextButtonClick = (data) => {
        if ((this.grid.addedMap && this.grid.addedMap.size > 0) ||
            (this.grid.updatedMap && this.grid.updatedMap.size > 0) ||
            (this.grid.deletedMap && this.grid.deletedMap.size > 0)) {
            this.show(this.translateService.translate('ocdenfor.savebeforevalidation'), 'warn');
            return;
        } else {
            this.isLoading = true;
            this.livunitsModel['levelOneActiveFlag']=this.lvlOneActiveFlag; 
            this.dialogService.openLinkDialog('/OIMMHOLODIALOGTWO', this.livunitsModel, 90).subscribe(res => {
                this.oimmholoexecuteQuery();
            });
        }
    }

    onIEPGridInsert = () => {
        if (this.ieplevelData.length === 1) {
            this.show('oimmholo.ieplevelInsert', 'warn');
            return;
        }
        return { iepLevelCode: null };
    }

    getIEPCodeExecuteQuery() {
        if (this.livunitsModel.livingUnitId) {
            const unitattrResult = this.oimmholoFactory.getIEPCodeExecuteQueryOne(this.livunitsModel.livingUnitId);
            unitattrResult.subscribe(data => {
                this.ieplevelData = [];
                if (data !== AppConstants.EMPTYDATA) {
                    var agyProf = new AgyIntLocProfiles();
                    const lovs = data.split(",");
                    agyProf.iepLeveldescription=lovs[0];
                    agyProf.iepLevelCode = lovs[1];
                    this.ieplevelData.push(agyProf);
                }
            });
        }
                if (this.dialog.data.livingUnitId) {
                    this.oimmholoFactory.getIEPCodeExecuteQuery(this.dialog.data.livingUnitId, this.agyLocIdTemp).subscribe(parentIepData => {
                        if (parentIepData !== AppConstants.EMPTYDATA) {
                            this.facilityIepLevel = parentIepData.split(",")[0];
                        }
                    })
                }

            }



    iepLevelCommit(event) {
                this.iepLevelInsertList = event.added;
                this.iepLevelUpdateList = event.updated;
                this.iepLevelDeleteList = event.removed;
                this.iepLevelCommitModel.insertList = [];
                this.iepLevelCommitModel.updateList = [];
                this.iepLevelCommitModel.deleteList = [];
                if(this.iepLevelInsertList.length > 0 || this.iepLevelUpdateList.length > 0) {
                for (let i = 0; i < this.iepLevelInsertList.length; i++) {
                    this.iepLevelInsertList[i].internalLocationId = this.livunitsModel.livingUnitId;
                    this.iepLevelCommitModel.insertList = this.iepLevelInsertList;
                }
                for (let i = 0; i < this.iepLevelUpdateList.length; i++) {
                    this.iepLevelUpdateList[i].internalLocationId = this.livunitsModel.livingUnitId;
                    this.iepLevelCommitModel.updateList = this.iepLevelUpdateList;
                }
            }
            if (this.iepLevelDeleteList.length > 0) {
                for (let i = 0; i < this.iepLevelDeleteList.length; i++) {
                    this.iepLevelDeleteList[i].internalLocationId = this.livunitsModel.livingUnitId;
                    this.iepLevelCommitModel.deleteList = this.iepLevelDeleteList;
                }
            }
            const usedforSaveData = this.oimmholoFactory.ieplevelCommit(this.iepLevelCommitModel);
            usedforSaveData.subscribe(data => {
                if (data === 1) {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.getIEPCodeExecuteQuery();
                    return;
                } else {
                    this.show('common.addupdateremoverecordfailed');
                    this.getIEPCodeExecuteQuery();
                    return;
                }
            });
        }
    }
