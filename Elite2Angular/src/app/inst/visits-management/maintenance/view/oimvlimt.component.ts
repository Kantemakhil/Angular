import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { OimvlimtService } from '@inst/visits-management/maintenance/service/oimvlimt.service';
import { VisitCycleLimits } from '@inst/visits-management/maintenance/beans/VisitCycleLimits';
import { VisitTypeLimits } from '@inst/visits-management/maintenance/beans/VisitTypeLimits';
import { VisitCycleLimitsCommitBean } from '@inst/visits-management/maintenance/beans/VisitCycleLimitsCommitBean';
import { VisitTypeLimitsCommitBean } from '@inst/visits-management/maintenance/beans/VisitTypeLimitsCommitBean';
import { DialogService } from '@core/ui-components/dialog/dialog.service';

@Component({
    selector: 'app-oimvlimt',
    templateUrl: './oimvlimt.component.html'
})

export class OimvlimtComponent implements OnInit {
    actionName: string;
    lovModel: any[];
    msgs: any[] = [];
    nameOfLovPage: string;
    listToCompare: any[] = [];
    viscycData: VisitCycleLimits[] = [];
    viscycDataTemp: VisitCycleLimits[] = [];
    viscycModel: VisitCycleLimits = new VisitCycleLimits();
    iepLevelModel: VisitCycleLimits = new VisitCycleLimits();
    viscycIndex: number;
    viscycInsertList: VisitCycleLimits[] = [];
    viscycUpdatetList: VisitCycleLimits[] = [];
    viscycDeleteList: VisitCycleLimits[] = [];
    vistypData: VisitTypeLimits[] = [];
    iepLevelVistypData: VisitTypeLimits[] = [];

    vistypDataTemp: VisitTypeLimits[] = [];
    vistypModel: VisitTypeLimits = new VisitTypeLimits();
    vistypIndex: number;
    vistypInsertList: VisitTypeLimits[] = [];
    vistypUpdatetList: VisitTypeLimits[] = [];
    vistypDeleteList: VisitTypeLimits[] = [];
    display: boolean;
    errorMessage: string;
    headerMessage: string;
    facilitylink: string;
    disabled: boolean;
    editable: boolean;
    visTypColumnDef: any[];
    visCycColumnDef: any[];
    agyBlkReadOnly: boolean;
    visCycReadOnly: boolean;
    visTypReadOnly: boolean;
    rgseclvlRg: any[] = [];
    rgcyctypRg: any[] = [];
    rgvistypRg: any[] = [];
    rgstrdayRg: any[] = [];
    rgagyintlocRg: any[] = [];
    viscycCommitModel: VisitCycleLimitsCommitBean = new VisitCycleLimitsCommitBean();
    vistypCommitModel: VisitTypeLimitsCommitBean = new VisitTypeLimitsCommitBean();
    caseLoadId: string;
    @ViewChild('grid') grid: any;
    @ViewChild('typegrid') typegrid: any;
    @ViewChild('iepgrid') iepgrid: any;
    @ViewChild('ieptypegrid') ieptypegrid: any;
    agyLocLink: string;
    agyLocId: string;
    index: any;
    tableIndex = -1;
    ieptableIndex = -1;
    tableIndexLoc = -1;
    iepVisitTableIndex = -1;
    agyLocIdTitles = { description: this.translateService.translate('common.description'), code: this.translateService.translate('common.code') };
    iepSecLvlTitles = { description: this.translateService.translate('common.description'), code: this.translateService.translate('common.code') };

    clearDisable: boolean;
    enableInsertFirstGrid: boolean;
    enableInsertSecondGrid: boolean;
    readonlyFlag: boolean;
    iepLevelCheck: boolean;
    securityLevelCheck: boolean;
    iepLevelColumnDef: any[];
    iepLevelData: VisitCycleLimits[] = [];
    enableInsertiepLevel: boolean;
    enableInsertIEPVisitType: boolean;
    iepLevelVistypColumnDef: any[];
    iepLevelnsertList: VisitCycleLimits[] = [];
    iepLevelUpdatetList: VisitCycleLimits[] = [];
    iepLevelDeleteList: VisitCycleLimits[] = [];
    iepLevelCommitModel: VisitCycleLimitsCommitBean = new VisitCycleLimitsCommitBean();
    iepvisitTypeCommitModel: VisitTypeLimitsCommitBean = new VisitTypeLimitsCommitBean();
    iepvisitInsertList: VisitTypeLimits[] = [];
    iepvisitUpdatetList: VisitTypeLimits[] = [];
    iepvisitDeleteList: VisitTypeLimits[] = [];
    iepVistypModel: VisitTypeLimits = new VisitTypeLimits();
    enableInsertIepvisit: boolean;
    iepLevelConfig: boolean;
    securityLevelConfig: boolean;
    selectedTabIndex = 0;
    iepSecLevels: any;
    iepseclevelFlag: boolean;
    msg: string;
    ieplevelrequired: boolean;
    iepSecLevelsTemp: any;
    viscycModel1: VisitCycleLimits;
    viscycModel2: VisitCycleLimits;
    constructor(private oimvlimtFactory: OimvlimtService,
        public translateService: TranslateService,
        public sessionManager: UserSessionManager, public dialogService: DialogService) {
        this.visTypColumnDef = [];
        this.visCycColumnDef = [];
    }

    ngOnInit() {
        this.ieplevelrequired = false;
        this.selectedTabIndex = 0;
        this.readonlyFlag = false;
        this.iepseclevelFlag = false;
        this.clearDisable = true;
        this.enableInsertFirstGrid = false;
        this.enableInsertSecondGrid = false;
        this.agyLocLink = 'oimvlimt/rgAgyIntLocRecordGroup';
        this.visCycColumnDef = [
            {
                fieldName: this.translateService.translate('oimvlimt.securitylevel') + '*', field: 'visitConfigTypeValue', editable: true, width: 150,
                datatype: 'lov', domain: 'SUP_LVL_TYPE', cellEditable: this.canCellEdit,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.cycletype') + '*', field: 'cycleType', editable: true,
                width: 150, datatype: 'lov', domain: 'VIS_CYC_TYP', cellEditable: this.canCellEdit,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.hours'), field: 'totHrs', editable: true, whole: true,
                width: 150, datatype: 'number', minValue: 0, maxValue: '99', cellEditable: this.cellEditHrs,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.min'), field: 'tmin', editable: !this.iepLevelCheck, whole: true,
                width: 150, datatype: 'number', minValue: 0, maxValue: '59', cellEditable: this.cellEditHrs,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.totalvisits'), field: 'totVisits', whole: true,
                editable: true, width: 150, datatype: 'number', maxValue: '999999', cellEditable: this.cellEditTotVisits,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.startday') + '*', field: 'startDay',
                editable: true, width: 150,
                datatype: 'lov', domain: 'VIS_START', cellEditable: this.canCellEdit, parentField: 'cycleType'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag',
                width: 150, datatype: 'checkbox', editable: true,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.expiry'), field: 'expiryDate',
                width: 150, datatype: 'date', editable: false,
            },
            {
                fieldName: '', field: 'totHrsTemp', width: 150, hide: true
            },
        ];
        this.visTypColumnDef = [
            {
                fieldName: this.translateService.translate('oimvlimt.visittype') + '*', field: 'visitType',
                editable: true, width: 150, datatype: 'lov', domain: 'VISIT_TYPE', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oimvlimt.hours'), field: 'maxHrsType', editable: true,
                width: 150, datatype: 'number', minValue: 0, maxValue: '99', cellEditable: this.maxHrsTypeEdit, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.min'), field: 'mmin', editable: true, width: 150,
                datatype: 'number', minValue: 0, maxValue: '59', cellEditable: this.maxHrsTypeEdit, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.maxvisitstype'), field: 'maxVisitsType',
                editable: true, width: 150, datatype: 'number', cellEditable: this.maxVisitsTypeEdit, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.maxvisitorstype'), field: 'maxVisitorsType',
                editable: true, width: 150, datatype: 'number', maxValue: 999999, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.reinstate'), field: 'reinstateFlag', editable: true, width: 150,
                datatype: 'checkbox', cellEditable: this.maxVisitsTypeEdit
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: '', field: 'maxHrsTypeTemp', width: 150, hide: true
            },
        ];

        this.iepLevelColumnDef = [
            {
                fieldName: this.translateService.translate('oimvlimt.iepLevel') + '*', field: 'visitConfigTypeValue', editable: true, width: 150,
                datatype: 'lov', link: '/oimvlimt/rgIepLevelRecordGroup', cellEditable: this.canCellEdit, source: 'OIMIEPLV'
            },
            {
                fieldName: this.translateService.translate('oimvlimt.cycletype') + '*', field: 'cycleType', editable: true,
                width: 150, datatype: 'lov', domain: 'VIS_CYC_TYP', cellEditable: this.canCellEdit,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.hours'), field: 'totHrs', editable: true, whole: true,
                width: 150, datatype: 'number', minValue: 0, maxValue: '99', cellEditable: this.cellEditIepHrs,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.min'), field: 'tmin', editable: true, whole: true,
                width: 150, datatype: 'number', minValue: 0, maxValue: '59', cellEditable: this.cellEditIepHrs,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.totalvisits'), field: 'totVisits', whole: true,
                editable: true, width: 150, datatype: 'number', maxValue: '999999', cellEditable: this.cellEditIepTotVisits,
            },
            {
                fieldName: this.translateService.translate('oimvlimt.startday') + '*', field: 'startDay',
                editable: true, width: 150,
                datatype: 'lov', domain: 'VIS_START', cellEditable: this.canCellEdit, parentField: 'cycleType'
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimvlimt.expiry'), field: 'expiryDate',
                editable: false, width: 150, datatype: 'date'
            },
            {
                fieldName: '', field: 'totHrsTemp', width: 150, hide: true
            },

        ]
        this.iepLevelVistypColumnDef = [
            {
                fieldName: this.translateService.translate('oimvlimt.visittype') + '*', field: 'visitType',
                editable: true, width: 150, datatype: 'lov', domain: 'VISIT_TYPE', cellEditable: this.canCellEdit
            },
            {
                fieldName: this.translateService.translate('oimvlimt.hours'), field: 'maxHrsType', editable: true,
                width: 150, datatype: 'number', minValue: 0, maxValue: '99', cellEditable: this.maxHrsIepTypeEdit, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.min'), field: 'mmin', editable: true, width: 150,
                datatype: 'number', minValue: 0, maxValue: '59', cellEditable: this.maxHrsIepTypeEdit, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.maxvisitstype'), field: 'maxVisitsType',
                editable: true, width: 150, datatype: 'number', cellEditable: this.maxIepVisitsTypeEdit, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.maxvisitorstype'), field: 'maxVisitorsType',
                editable: true, width: 150, datatype: 'number', maxValue: 999999, whole: true
            },
            {
                fieldName: this.translateService.translate('oimvlimt.reinstate'), field: 'reinstateFlag', editable: true, width: 150,
                datatype: 'checkbox',
            },
            {
                fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true,
                width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false,
                width: 150, datatype: 'date'
            },
            {
                fieldName: '', field: 'maxHrsTypeTemp', width: 150, hide: true
            },

        ]

        this.iepSecLevels = undefined;
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
    onRowClickviscyc(event) {
        if (event) {
            this.viscycModel = event;
            if (this.viscycModel.totHrs || this.viscycModel.tmin) {
                this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['totHrs'].includes(obj.colId)) {
                        this.visCycColumnDef[2].required = false;
                        obj.colDef.headerClass = 'header-col';
                        this.grid.gridApi.refreshHeader();
                    }
                    if (['tmin'].includes(obj.colId)) {
                        this.visCycColumnDef[3].required = false;
                        obj.colDef.headerClass = 'header-col';
                        this.grid.gridApi.refreshHeader();
                    }
                    if (['totVisits'].includes(obj.colId)) {
                        this.visCycColumnDef[4].required = false;
                        obj.colDef.headerClass = '';
                        this.grid.gridApi.refreshHeader();
                    }

                });
                this.typegrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['maxHrsType'].includes(obj.colId)) {
                        this.visTypColumnDef[1].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.typegrid.gridApi.refreshHeader();
                    }
                    if (['mmin'].includes(obj.colId)) {
                        this.visTypColumnDef[2].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.typegrid.gridApi.refreshHeader();
                    }
                    if (['maxVisitsType'].includes(obj.colId)) {
                        this.visTypColumnDef[3].required = true;
                        obj.colDef.headerClass = '';
                        this.typegrid.gridApi.refreshHeader();
                    }
                });
            } else if (this.viscycModel.totVisits) {
                this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['totHrs'].includes(obj.colId)) {
                        this.visCycColumnDef[2].required = false;
                        obj.colDef.headerClass = '';
                        this.grid.gridApi.refreshHeader();
                    }
                    if (['tmin'].includes(obj.colId)) {
                        this.visCycColumnDef[3].required = false;
                        obj.colDef.headerClass = '';
                        this.grid.gridApi.refreshHeader();
                    }
                    if (['totVisits'].includes(obj.colId)) {
                        this.visCycColumnDef[4].required = false;
                        obj.colDef.headerClass = 'header-col';
                        this.grid.gridApi.refreshHeader();
                    }

                });

                this.typegrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['maxHrsType'].includes(obj.colId)) {
                        this.visTypColumnDef[1].required = true;
                        obj.colDef.headerClass = '';
                        this.typegrid.gridApi.refreshHeader();
                    }
                    if (['mmin'].includes(obj.colId)) {
                        this.visTypColumnDef[2].required = true;
                        obj.colDef.headerClass = '';
                        this.typegrid.gridApi.refreshHeader();
                    }
                    if (['maxVisitsType'].includes(obj.colId)) {
                        this.visTypColumnDef[3].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.typegrid.gridApi.refreshHeader();
                    }
                });
            } else {
                this.grid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['totHrs'].includes(obj.colId)) {
                        this.visCycColumnDef[2].required = false;
                        obj.colDef.headerClass = '';
                        this.grid.gridApi.refreshHeader();
                    }
                    if (['tmin'].includes(obj.colId)) {
                        this.visCycColumnDef[3].required = false;
                        obj.colDef.headerClass = '';
                        this.grid.gridApi.refreshHeader();
                    }
                    if (['totVisits'].includes(obj.colId)) {
                        this.visCycColumnDef[4].required = false;
                        obj.colDef.headerClass = '';
                        this.grid.gridApi.refreshHeader();
                    }

                });

                this.typegrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['maxHrsType'].includes(obj.colId)) {
                        this.visTypColumnDef[1].required = true;
                        obj.colDef.headerClass = '';
                        this.typegrid.gridApi.refreshHeader();
                    }
                    if (['mmin'].includes(obj.colId)) {
                        this.visTypColumnDef[2].required = true;
                        obj.colDef.headerClass = '';
                        this.typegrid.gridApi.refreshHeader();
                    }
                    if (['maxVisitsType'].includes(obj.colId)) {
                        this.visTypColumnDef[3].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.typegrid.gridApi.refreshHeader();
                    }
                });
            }
            this.vistypModel = new VisitTypeLimits();
            if (this.viscycModel.visitCycleLimitId) {
                this.vistypModel.visitCycleLimitId = this.viscycModel.visitCycleLimitId;
                this.vistypExecuteQuery();
                this.enableInsertSecondGrid = true;

            } else {
                this.vistypData = [];
                this.enableInsertSecondGrid = false;
            }

        }
    }
    agyLocChangeEvent(event) {
        if (event) {
            this.ieplevelrequired = true;
        } else {
            this.ieplevelrequired = false;
        }
        this.oimvlimtFactory.getIepVisitLimis(event.code).subscribe(data => {
            if (data) {
                this.iepSecLevels = data.visitConfigType;
                this.iepSecLevelsTemp = this.iepSecLevels;
                if (this.iepSecLevelsTemp === 'IEP_LEVEL') {
                    this.iepLevelexecuteQuery();
                } else {
                    this.oimvlimtexecuteQuery();
                }
            }
        });
        if (this.iepSecLevelsTemp === null || this.iepSecLevelsTemp === undefined || this.iepSecLevelsTemp === '') {
            this.iepSecLevelsTemp = this.iepSecLevels;
        }
        if (event) {

            if (event) {
                this.agyLocId = event.code;
                this.clearDisable = false;
                this.oimvlimtexecuteQuery();
                this.iepLevelexecuteQuery();


            } else if (event) {
                this.agyLocId = event.code;
                this.clearDisable = false;
            }
        }
        else {
            this.clearDisable = true;
        }
    }
    onStatusBlur() {
        if (!this.agyLocId) {
            this.agyLocId = this.agyLocId === '' ? undefined : '';
        }
    }
    clearQuery() {
        this.agyLocId = undefined;
        this.viscycData = [];
        this.vistypData = [];
        this.viscycModel = new VisitCycleLimits();
        this.vistypModel = new VisitTypeLimits();
        this.clearDisable = true;
        this.enableInsertFirstGrid = false;
        this.enableInsertSecondGrid = false;
        this.readonlyFlag = false;
        this.iepseclevelFlag = false;
        this.enableInsertiepLevel = false;
        this.securityLevelCheck = false;
        this.iepLevelCheck = false;
        this.iepLevelData = []
        this.iepLevelVistypData = [];
        this.enableInsertIEPVisitType = false;
        this.iepSecLevels = undefined;
        this.viscycInsertList = [];
        this.viscycUpdatetList = [];
        this.viscycDeleteList = [];



    }
    onGridClear = () => {
        this.oimvlimtexecuteQuery();
        return true;
    }
    typeGridClear = () => {
        this.vistypExecuteQuery();
        return true;
    }
    onIepGridClear = () => {
        this.iepLevelexecuteQuery();
        return true;
    }
    iepTypeGridClear = () => {
        this.vistypExecuteQuery();
        this.iepVistypExecuteQuery();
        return true;
    }

    onGridInsert = () => {
        if (!this.agyLocId) {
            this.show('common.Facilitymustbeenteredfirst');
            return false;
        }
        if (!this.oimvlimtValidations()) {
            return false;
        }
        return { activeFlag: true };
    }
    onGridInsertOne = () => {
        if (!this.agyLocId) {
            this.show('common.Facilitymustbeenteredfirst');
            return false;
        }
        if (!this.viscycModel.createDatetime) {
            this.show('common.youcannotcreatethisrecord');
            return false;
        }
        if (!this.vistypValidations()) {
            return false;
        }
        return { activeFlag: true, reinstateFlag: true };
    }
    oimvlimtValidations() {
        const is = { valid: true };
        this.viscycData.forEach(data => {
            if (!data.cycleType) {
                this.show('oimvlimt.cycletypemustbeentered');
                is.valid = false;
                return;
            }
            if (!data.startDay) {
                this.show('oimvlimt.startdaymustbeentered');
                is.valid = false;
                return;
            }
        });
        for (let i = 0; i < this.viscycData.length - 1; i++) {
            for (let j = i + 1; j < this.viscycData.length; j++) {
                if (i !== j && this.viscycData[i].visitConfigTypeValue === this.viscycData[j].visitConfigTypeValue &&
                    this.viscycData[i].activeFlag && this.viscycData[j].activeFlag) {
                    this.show('oimvlimt.thisseclevelisalreadyactive');
                    is.valid = false;
                    return is.valid;
                }
            }
        }
        return is.valid;
    }

    /**
    *  This function will be executed when commit event is fired
    */
    oimvlimtSaveviscycForm(event) {

        if (this.iepSecLevels === 'IEP_LEVEL') {
            if(event.updated[0]){
                var totalVisitIp = 0;
                this.iepLevelVistypData.forEach(data => {
                    if (data.activeFlag) {
                        totalVisitIp = totalVisitIp + Number(data.maxVisitsType)
                    }
                });
            if (Number(event.updated[0].totVisits) < Number(totalVisitIp)) {
                this.show('oimvlimt.totalvisitcannotbelessthanmaxvisittype');
                return;
            }
            var totalTimeForIep = 0;
            this.iepLevelVistypData.forEach(data => {
                if (data.activeFlag) {
                    totalTimeForIep = totalTimeForIep + Number(data.maxHrsTypeTemp)
                }
            });
            if ((Number(event.updated[0].totHrsTemp) < Number(totalTimeForIep)) ) {
                this.show('oimvlimt.totaltimecannotbelessthanmaxtime');
                return;

            }
            
        }
            if (!this.iepLevelValidations())
                return;

        }

        if (this.iepSecLevels === 'SEC_LEVEL') {
            if(event.updated[0]){
                var totalTime = 0;
                this.vistypData.forEach(data => {
                    if (data.activeFlag) {
                        totalTime = totalTime + Number(data.maxHrsTypeTemp)
                    }
                });
    
                var totalVisit = 0;
                this.vistypData.forEach(data => {
                    if (data.activeFlag) {
                        totalVisit = totalVisit + Number(data.maxVisitsType)
                    }
                });
            if (Number(event.updated[0].totHrsTemp) < Number(totalTime)) {
                this.show('oimvlimt.totaltimecannotbelessthanmaxtime');
                return;
            }
            if (Number(event.updated[0].totVisits) < Number(totalVisit)) {
                this.show('oimvlimt.totalvisitcannotbelessthanmaxvisittype');
                return;
            }
            
            }
            
            if (!this.oimvlimtValidations()){
                return;
            }
            
                

        }
        this.viscycInsertList = event.added;
        this.viscycUpdatetList = event.updated;
        this.viscycDeleteList = event.removed;
        this.viscycCommitModel.insertList = [];
        this.viscycCommitModel.updateList = [];
        this.viscycCommitModel.deleteList = [];
        if (this.viscycInsertList.length > 0 || this.viscycUpdatetList.length > 0) {
            for (let i = 0; i < this.viscycInsertList.length; i++) {

                if( !this.viscycInsertList[i].totHrs && !this.viscycInsertList[i].tmin && !this.viscycInsertList[i].totVisits ){
                    this.show('oimvlimt.hoursmintotalvisitmustbeenter');
                    return;
                }
                if((this.viscycInsertList[i].totHrs && this.viscycInsertList[i].tmin===undefined) || (this.viscycInsertList[i].totHrs===undefined && this.viscycInsertList[i].tmin) ){
                    this.show('oimvlimt.hoursmintotalvisitmustbeenter');
                    return;
                }

                const visCycLtdId = this.viscycModel.visitCycleLimitId;
                this.viscycInsertList[i].visitCycleLimitId = this.viscycModel.visitCycleLimitId;
                this.viscycInsertList[i].agyLocId = this.agyLocId;
                // this.viscycInsertList[i].visitConfigTypeValue = this.viscycModel.iepLevel;
                // if (this.iepSecLevels === 'SEC_LEVEL') {
                //      this.viscycInsertList[i].visitConfigTypeValue = this.viscycModel.secLevel;
                // }

                this.viscycInsertList[i].cycleType = this.viscycModel.cycleType;
                this.viscycInsertList[i].activeFlag = this.viscycInsertList[i].activeFlag ? 'Y' : 'N';
                this.viscycInsertList[i].createDatetime = DateFormat.getDate();
                this.viscycInsertList[i].createUserId = this.sessionManager.getId();
                this.viscycInsertList[i].totHrs = this.viscycInsertList[i].totHrsTemp != undefined || null ? Number(this.viscycInsertList[i].totHrsTemp) : this.viscycInsertList[i].totHrs;
                this.viscycInsertList[i].visitConfigType = this.iepSecLevels;
                this.oimvlimtFactory.saveIepSecData(this.agyLocId, this.iepSecLevels, "INSERT").subscribe(val => {

                })
                this.viscycCommitModel.insertList = this.viscycInsertList;
            }

            for (let i = 0; i < this.viscycUpdatetList.length; i++) {
                if( !this.viscycUpdatetList[i].totHrs && !this.viscycUpdatetList[i].tmin && !this.viscycUpdatetList[i].totVisits ){
                    this.show('oimvlimt.hoursmintotalvisitmustbeenter');
                    return;
                }
            
                this.viscycUpdatetList[i].totHrs = this.viscycUpdatetList[i].totHrsTemp != undefined || null ? Number(this.viscycUpdatetList[i].totHrsTemp) : this.viscycUpdatetList[i].totHrs;
                this.viscycUpdatetList[i].activeFlag = this.viscycUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.viscycCommitModel.updateList = this.viscycUpdatetList;
            }
            if (this.viscycDeleteList.length > 0) {
                for (let i = 0; i < this.viscycDeleteList.length; i++) {
                    this.viscycCommitModel.deleteList = this.viscycDeleteList;
                }
            }
            const viscycSaveData = this.oimvlimtFactory.visCycCommit(this.viscycCommitModel);
            viscycSaveData.subscribe(data => {
                if (data === 1) {
                    this.show('common.addupdateremoverecordsuccess', 'success');
                    this.iepLevelexecuteQuery();

                    this.oimvlimtexecuteQuery();

                    return;
                } else {
                    this.show('common.addupdateremoverecordfailed');
                    this.iepLevelexecuteQuery();

                    this.oimvlimtexecuteQuery();

                    return;
                }
            });
        }



    }

    validateRowData = (event) => {
        const rowIndex = this.viscycData.indexOf(event.data);
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.grid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'totVisits') {
            if (event.data.totVisits === 0) {
                this.grid.setColumnData('totVisits', rowIndex, undefined);
            }
            if (event.data.totVisits) {
                if (event.data.totHrs>=0 || event.data.tmin>=0) {
                    this.grid.setColumnData('totHrs', rowIndex, undefined);
                    this.grid.setColumnData('tmin', rowIndex, undefined);
                    this.grid.setColumnData('totHrsTemp', rowIndex,undefined );
                }
            }
         

            var totalVisit = 0;
            this.vistypData.forEach(data => {
                if (data.activeFlag) {
                    totalVisit = totalVisit + Number(data.maxVisitsType)
                }
            });

            if ((event.data.totVisits && totalVisit) ||
                (event.data.totVisits === 0 || totalVisit === 0)) {
                if (Number(event.data.totVisits) < Number(totalVisit)) {
                    this.show('oimvlimt.totalvisitcannotbelessthanmaxvisittype');
                    this.grid.setColumnData('totVisits', rowIndex, event.data.totVisits);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            rowdata.validated = true;
            return rowdata;
        }
        if (event.data.totHrs  || event.data.tmin ) {
            if (event.data.totHrs || event.data.tmin) {
                this.grid.setColumnData('totVisits', rowIndex, undefined);
            }
            event.data.totHrs=event.data.totHrs===null?0:event.data.totHrs
            event.data.tmin= event.data.tmin===null?0: event.data.tmin;
            if ((event.data.totHrs || event.data.totHrs === 0) &&
                (event.data.tmin || event.data.tmin === 0)) {
                const maxHrs = (Number(event.data.totHrs) + (Number(event.data.tmin)) / 60);
                this.grid.setColumnData('totHrsTemp', rowIndex, String(maxHrs.toFixed(2)));
            }
    
         //   if (event.data.totHrs && this.vistypModel.maxHrsType ||
         //   event.data.totHrs === 0 && this.vistypModel.maxHrsType >= 0) {
            var totalTime = 0;
            this.vistypData.forEach(data => {
                if (data.activeFlag) {
                    totalTime = totalTime + Number(data.maxHrsTypeTemp)
                }
            });
                if (Number(event.data.totHrsTemp) < Number(totalTime)) {
                    this.show('oimvlimt.totaltimecannotbelessthanmaxtime');
                    this.grid.setColumnData('totHrs', rowIndex, event.data.totHrs);
                    this.grid.setColumnData('tmin', rowIndex, event.data.tmin);
                    rowdata.validated = true;
                    return rowdata;
                }
          //  }
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;

    }

    validateRowDataTwo = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.typegrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.typegrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'maxVisitsType') {
            if (event.data.maxVisitsType === 0) {
                this.typegrid.setColumnData('maxVisitsType', rowIndex, undefined);
            }
            if (event.data.maxVisitsType) {
                this.typegrid.setColumnData('maxHrsType', rowIndex, undefined);
                this.typegrid.setColumnData('mmin', rowIndex, undefined);
            }
            if (event.data.maxVisitsType && this.viscycModel.totVisits ||
                event.data.maxVisitsType === 0 && this.viscycModel.totVisits === 0) {
                if (Number(event.data.maxVisitsType) > Number(this.viscycModel.totVisits)) {
                    this.show('oimvlimt.maxvisitspertypecannotbegreaterthantotalvisits');
                    this.typegrid.setColumnData('maxVisitsType', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
        if (event.field === 'mmin') {
            if ((event.data.maxHrsType || event.data.maxHrsType === 0) &&
                (event.data.mmin || event.data.mmin === 0)) {
                const maxHrs = (Number(event.data.maxHrsType) + (Number(event.data.mmin)) / 60);
                this.typegrid.setColumnData('maxHrsTypeTemp', rowIndex, maxHrs);
            }
            if ((Number(event.data.maxHrsType) + (Number(event.data.mmin)) / 60) > (Number(this.viscycModel.totHrs) + (Number(this.viscycModel.tmin)) / 60)) {
                this.show('oimvlimt.maxtimecannotbegreaterthantotaltime');
                this.typegrid.setColumnData('mmin', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'maxHrsType') {
            if (event.data.maxHrsType && this.viscycModel.totHrs ||
                event.data.maxHrsType === 0 && this.viscycModel.totHrs === 0) {
                if (Number(event.data.maxHrsType) > Number(this.viscycModel.totHrs)) {
                    this.show('oimvlimt.maxtimecannotbegreaterthantotaltime');
                    this.typegrid.setColumnData('maxHrsType', rowIndex, undefined);
                    this.typegrid.setColumnData('mmin', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    const maxHrsType = (Number(event.data.maxHrsType) + (Number(event.data.mmin)) / 60);
                    this.typegrid.setColumnData('maxHrsTypeTemp', rowIndex, maxHrsType);
                }
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    canCellEdit = (data: any, index: number, field: string) => {
        if (data.createDatetime) {
            return false;
        }
        return true;
    }
    canCellEditActiveFlag = (data: any, index: number, field: string) => {
        if (data.securityLevelCheck) {
            return false;
        }
        return true;
    }
    cellEditHrs = (data: any, index: number, field: string) => {
        if (data.createDatetime && data.totVisits) {
            return false;
        } else {
            return true;
        }
    }
    cellEditIepHrs = (data: any, index: number, field: string) => {
        if(data.createDatetime && data.visitCount==1){
            this.show("oimvlimt.visitlimitconfigurationforsec");
            return false;
        }
        if (data.createDatetime && data.totVisits && data.visitCount==1) {
            return false;
        } else {
            return true;
        }
    }
    cellEditTotVisits = (data: any, index: number, field: string) => {


        if (data.createDatetime && (data.totHrs || data.tmin)) {
            return false;
        } else {
            return true;

        }
    }
    cellEditIepTotVisits = (data: any, index: number, field: string) => {
        if(data.createDatetime && data.visitCount==2){
            this.show("oimvlimt.visitlimitconfigurationforsec");
            return false;
        }
        if (data.createDatetime && (data.totHrs || data.tmin)) {
            return false;
        } else {
            return true;
        }

    }
    canCellEditIepExpiry = (data: any, index: number, field: string) => {
        if (this.iepLevelCheck) {
            return false;
        }
        else {
            return true;
        }

    }
    maxHrsTypeEdit = (data: any, index: number, field: string) => {
        if (this.viscycModel.totHrs || this.viscycModel.tmin) {
            return true;
        } else {
            return false;
        }
    }
    maxHrsIepTypeEdit = (data: any, index: number, field: string) => {
        if (this.viscycModel.totHrs || this.viscycModel.tmin) {
            return true;
        } else {
            return false;
        }
    }
    maxVisitsTypeEdit = (data: any, index: number, field: string) => {
        if (this.viscycModel.totVisits ||
            (!this.viscycModel.totHrs && !this.viscycModel.tmin && !this.viscycModel.totVisits)) {
            return true;
        } else {
            return false;
        }
    }
    maxIepVisitsTypeEdit = (data: any, index: number, field: string) => {
        if (this.viscycModel.totVisits ||
            (!this.viscycModel.totHrs && !this.viscycModel.tmin && !this.viscycModel.totVisits)) {
            return true;
        } else {
            return false;
        }
    }
    oimvlimtexecuteQuery() {
        if (this.agyLocId) {
            this.viscycModel2 = new VisitCycleLimits();
            this.viscycModel2.agyLocId = this.agyLocId;
            this.viscycModel2.securityLevelConfig = 'Y';
            this.viscycModel2.visitConfigType = this.iepSecLevels;
        }
        const serviceObj = this.oimvlimtFactory.visCycExecuteQuery(this.viscycModel2);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.viscycData = [];
                this.readonlyFlag = false;
                this.iepseclevelFlag = false;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.viscycData = data;
                this.viscycModel = this.viscycData[0];
                this.tableIndex = 0;
                this.readonlyFlag = true;
                this.iepseclevelFlag = false;
            }
        });
    }
    vistypExecuteQuery() {
        this.vistypModel.visitCycleLimitId = this.viscycModel.visitCycleLimitId;

        const vistypResult = this.oimvlimtFactory.visTypExecuteQuery(this.vistypModel);
        vistypResult.subscribe(vistypResultList => {
            if (vistypResultList.length === 0) {
                this.vistypData = [];
            } else {
                vistypResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.reinstateFlag = element.reinstateFlag === 'Y' ? true : false;
                });
                this.vistypData = vistypResultList;
                this.vistypModel = vistypResultList[0];
                this.tableIndexLoc = 0;
            }
        });
    }
    onGridDelete = () => {
        if (this.viscycData.length > 0) {
            this.show('common.youcannotdeletethisrecord');
            return false;
        }
        return true;
    }
    vistypValidations(event?) {
        const is = { valid: true };
        this.vistypData.forEach(data => {
            if (!data.visitType) {
                this.show('oimvlimt.visittypemustbeentered');
                is.valid = false;
                return;
            }
            if (data.maxHrsType && (data.maxHrsType > this.viscycModel.totHrs)) {
                this.show('oimvlimt.maxtimecannotbegreaterthantotaltime');
                is.valid = false;
                return;
            }
        });
        for (let i = 0; i < this.vistypData.length; i++) {
            for (let j = 0; j < this.vistypData.length; j++) {
                if (i !== j && this.vistypData[i].visitType === this.vistypData[j].visitType) {
                    this.show('oimvlimt.rowalredyexist');
                    is.valid = false;
                    return;
                }
            }
        }
        return is.valid;
    }

    /**
    *  This function will be executed when commit event is fired
     */
    oimvlimtSavevistypForm(event) {
        if (!this.iepVistypValidations()) {
            return;
        }
        if (!this.vistypValidations()) {
            return;
        }

        this.vistypInsertList = event.added;
        this.vistypUpdatetList = event.updated;
        this.vistypDeleteList = event.removed;
        this.vistypCommitModel.insertList = [];
        this.vistypCommitModel.updateList = [];
        this.vistypCommitModel.deleteList = [];
        if (this.vistypInsertList.length > 0) {
            for (let i = 0; i < this.vistypInsertList.length; i++) {

                if (this.viscycModel.totHrs || this.viscycModel.tmin) {
                    if (this.vistypInsertList[i].maxHrsType===undefined) {
                        this.show(this.translateService.translate('Hours must be entered'));
                        return;
                    } else if (this.vistypInsertList[i].mmin===undefined) {
                        this.show(this.translateService.translate('Min must be entered'));
                        return;
                    }
                } else if (this.viscycModel.totVisits) {
                    if (!this.vistypInsertList[i].maxVisitsType) {
                        this.show(this.translateService.translate('Max Visits/Type must be entered'));
                        return;
                    }
                }

                if (this.iepSecLevels === "SEC_LEVEL") {
                    var totalTime = 0;
                    this.vistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalTime = totalTime + Number(data.maxHrsTypeTemp)
                        }
                    });

                    var totalVisit = 0;
                    this.vistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalVisit = totalVisit + Number(data.maxVisitsType)
                        }
                    });
                    if (totalTime) {
                        if ((Number(this.viscycModel.totHrs) + (Number(this.viscycModel.tmin)) / 59).toFixed(2) < Number(totalTime).toFixed(2)) {
                            this.show(this.translateService.translate('oimvlimt.totaltimeforsecurityexceeded'));
                            return;
                        }
                    }
                    if (totalVisit) {
                        if ((Number(this.viscycModel.totVisits)) < Number(totalVisit)) {
                            this.show(this.translateService.translate('oimvlimt.totalvisitforsecurityexceeded'));
                            return;
                        }
                    }
                }
                if (this.iepSecLevels === "IEP_LEVEL") {
                    var totalVisitIp = 0;
                    this.iepLevelVistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalVisitIp = totalVisitIp + Number(data.maxVisitsType)
                        }
                    });
                    if (totalVisitIp) {
                        if (Number(this.viscycModel.totVisits) < totalVisitIp) {
                            this.show(this.translateService.translate('oimvlimt.totalvisforiepexceeded'));
                            return;
                        }
                    }
                    var totalTimeForIep = 0;
                    this.iepLevelVistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalTimeForIep = totalTimeForIep + Number(data.maxHrsTypeTemp)
                        }
                    });
                    if (totalTimeForIep) {
                        if (Number((Number(this.viscycModel.totHrs) + (Number(this.viscycModel.tmin)) / 59).toFixed(2)) < Number(Number(totalTimeForIep).toFixed(2))) {
                            this.show(this.translateService.translate('oimvlimt.totaltimeforiepexceeded'));
                            return;
                        }
                    }

                }
                this.vistypInsertList[i].visitCycleLimitId = this.viscycModel.visitCycleLimitId;
                this.vistypInsertList[i].activeFlag = this.vistypInsertList[i].activeFlag ? 'Y' : 'N';
                this.vistypInsertList[i].reinstateFlag = this.vistypInsertList[i].reinstateFlag ? 'Y' : 'N';
                this.vistypInsertList[i].maxHrsType = this.vistypInsertList[i].maxHrsTypeTemp;
            }
            this.vistypCommitModel.insertList = this.vistypInsertList;
        }
        if (this.vistypUpdatetList.length > 0) {
            for (let i = 0; i < this.vistypUpdatetList.length; i++) {
                if (this.viscycModel.totHrs || this.viscycModel.tmin) {
                    if (this.vistypUpdatetList[i].maxHrsType===undefined || this.vistypUpdatetList[i].maxHrsType===null) {
                        this.show(this.translateService.translate('Hours must be entered'));
                        return;
                    } else if (this.vistypUpdatetList[i].mmin===undefined || this.vistypUpdatetList[i].mmin===null) {
                        this.show(this.translateService.translate('Min must be entered'));
                        return;
                    }
                } else if (this.viscycModel.totVisits) {
                    if (!this.vistypUpdatetList[i].maxVisitsType) {
                        this.show(this.translateService.translate('Max Visits/Type must be entered'));
                        return;
                    }
                }
                if (this.iepSecLevels === "IEP_LEVEL") {
                    var totalVisitIp = 0;
                    this.iepLevelVistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalVisitIp = totalVisitIp + Number(data.maxVisitsType)
                        }
                    });
                    if (Number(this.viscycModel.totVisits) < totalVisitIp) {
                        this.show(this.translateService.translate('oimvlimt.totalvisforiepexceeded'));
                        return;
                    }
                    var totalTimeForIep = 0;
                    this.iepLevelVistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalTimeForIep = totalTimeForIep + Number(data.maxHrsTypeTemp)
                        }
                    });

                    if (Number((Number(this.viscycModel.totHrs) + (Number(this.viscycModel.tmin)) / 59).toFixed(2)) < Number(Number(totalTimeForIep).toFixed(2))) {
                        this.show(this.translateService.translate('oimvlimt.totaltimeforiepexceeded'));
                        return;
                    }

                }
                if (this.iepSecLevels === "SEC_LEVEL") {
                    var totalTime = 0;
                    this.vistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalTime = totalTime + Number(data.maxHrsTypeTemp)
                        }
                    });

                    var totalVisit = 0;
                    this.vistypData.forEach(data => {
                        if (data.activeFlag) {
                            totalVisit = totalVisit + Number(data.maxVisitsType)
                        }
                    });
        
                    if (Number((Number(this.viscycModel.totHrs) + (Number(this.viscycModel.tmin)) / 59).toFixed(2)) < Number(Number(totalTime).toFixed(2))) {
                        this.show(this.translateService.translate('oimvlimt.totaltimeforsecurityexceeded'));
                        return;
                    }
                    if ((Number(this.viscycModel.totVisits)) < Number(totalVisit)) {
                        this.show(this.translateService.translate('oimvlimt.totalvisitforsecurityexceeded'));
                        return;
                    }
                }

                this.vistypUpdatetList[i].activeFlag = this.vistypUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.vistypUpdatetList[i].reinstateFlag = this.vistypUpdatetList[i].reinstateFlag ? 'Y' : 'N';
                this.vistypUpdatetList[i].maxHrsType = this.vistypUpdatetList[i].maxHrsTypeTemp;
            }
            this.vistypCommitModel.updateList = this.vistypUpdatetList;
        }
        const vistypSaveData = this.oimvlimtFactory.visTypCommit(this.vistypCommitModel);
        vistypSaveData.subscribe(data => {
            if (data === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.vistypExecuteQuery();
                this.iepVistypExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed');
                this.vistypExecuteQuery();
                this.iepVistypExecuteQuery();
                return;
            }
        });
    }



    onRowClickiepLevel(event) {
        if (event) {
            this.viscycModel = event;
            if (this.viscycModel.totHrs || this.viscycModel.tmin) {
                this.iepgrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['totHrs'].includes(obj.colId)) {
                        this.iepLevelColumnDef[2].required = false;
                        obj.colDef.headerClass = 'header-col';
                        this.iepgrid.gridApi.refreshHeader();
                    }
                    if (['tmin'].includes(obj.colId)) {
                        this.iepLevelColumnDef[3].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.iepgrid.gridApi.refreshHeader();
                    }
                    if (['totVisits'].includes(obj.colId)) {
                        this.iepLevelColumnDef[4].required = true;
                        obj.colDef.headerClass = '';
                        this.iepgrid.gridApi.refreshHeader();
                    }

                });
                this.ieptypegrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['maxHrsType'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[1].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                    if (['mmin'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[2].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                    if (['maxVisitsType'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[3].required = true;
                        obj.colDef.headerClass = '';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                });

            } else if (this.viscycModel.totVisits) {
                this.iepgrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['totHrs'].includes(obj.colId)) {
                        this.iepLevelColumnDef[2].required = false;
                        obj.colDef.headerClass = '';
                        this.iepgrid.gridApi.refreshHeader();
                    }
                    if (['tmin'].includes(obj.colId)) {
                        this.iepLevelColumnDef[3].required = true;
                        obj.colDef.headerClass = '';
                        this.iepgrid.gridApi.refreshHeader();
                    }
                    if (['totVisits'].includes(obj.colId)) {
                        this.iepLevelColumnDef[4].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.iepgrid.gridApi.refreshHeader();
                    }

                });

                this.ieptypegrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['maxHrsType'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[1].required = true;
                        obj.colDef.headerClass = '';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                    if (['mmin'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[2].required = true;
                        obj.colDef.headerClass = '';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                    if (['maxVisitsType'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[3].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                });
            } else {
                this.iepgrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['totHrs'].includes(obj.colId)) {
                        this.iepLevelColumnDef[2].required = true;
                        obj.colDef.headerClass = '';
                        this.iepgrid.gridApi.refreshHeader();
                    }
                    if (['tmin'].includes(obj.colId)) {
                        this.iepLevelColumnDef[3].required = true;
                        obj.colDef.headerClass = '';
                        this.iepgrid.gridApi.refreshHeader();
                    }
                    if (['totVisits'].includes(obj.colId)) {
                        this.iepLevelColumnDef[4].required = true;
                        obj.colDef.headerClass = '';
                        this.iepgrid.gridApi.refreshHeader();
                    }

                });

                this.ieptypegrid.gridColumnApi.getAllDisplayedColumns().forEach(obj => {
                    if (['maxHrsType'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[1].required = true;
                        obj.colDef.headerClass = '';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                    if (['mmin'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[2].required = true;
                        obj.colDef.headerClass = '';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                    if (['maxVisitsType'].includes(obj.colId)) {
                        this.iepLevelVistypColumnDef[3].required = true;
                        obj.colDef.headerClass = 'header-col';
                        this.ieptypegrid.gridApi.refreshHeader();
                    }
                });

            }
            this.iepVistypModel = new VisitTypeLimits();
            if (this.viscycModel.visitCycleLimitId) {
                this.iepVistypModel.visitCycleLimitId = this.viscycModel.visitCycleLimitId;
                this.iepvistypExecuteQuery();
                this.enableInsertSecondGrid = true;
            } else {
                this.iepLevelVistypData = [];
                this.enableInsertSecondGrid = false;
            }
        }



    }


    iepLevelexecuteQuery() {
        if (this.agyLocId) {
            this.viscycModel1 = new VisitCycleLimits();
            this.viscycModel1.agyLocId = this.agyLocId;
            this.viscycModel1.visitConfigTypeValue = this.viscycModel.visitConfigTypeValue;
            this.viscycModel1.visitConfigType = this.iepSecLevels;
        }
        const serviceObj = this.oimvlimtFactory.iepLevelExecuteQuery(this.viscycModel1);
        serviceObj.subscribe(data => {
            if (data.length === 0) {
                this.iepLevelData = [];
                this.readonlyFlag = false;
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.iepLevelData = data;
                this.viscycModel = this.iepLevelData[0];
                this.ieptableIndex = 0;
                this.readonlyFlag = true;
            }
        });
    }
    iepVistypExecuteQuery() {
        this.vistypModel.visitCycleLimitId = this.viscycModel.visitCycleLimitId;
        const vistypResult = this.oimvlimtFactory.visTypExecuteQuery(this.vistypModel);
        vistypResult.subscribe(vistypResultList => {
            if (vistypResultList.length === 0) {
                this.iepLevelVistypData = [];
            } else {
                vistypResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.reinstateFlag = element.reinstateFlag === 'Y' ? true : false;
                });
                this.iepLevelVistypData = vistypResultList;
                this.iepVistypModel = vistypResultList[0];
                this.tableIndexLoc = 0;
            }
        });
    }

    IEPvalidateRowData = (event) => {
        const rowIndex = this.iepLevelData.indexOf(event.data);;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.iepgrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.iepgrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'totVisits') {
            if (event.data.totVisits === 0) {
                this.iepgrid.setColumnData('totVisits', rowIndex, undefined);
            }
            if (event.data.totVisits) {
                if (event.data.totHrs>=0 || event.data.tmin>=0) {
                    this.iepgrid.setColumnData('totHrs', rowIndex, undefined);
                    this.iepgrid.setColumnData('tmin', rowIndex, undefined);
                    this.iepgrid.setColumnData('totHrsTemp', rowIndex, undefined);
                }
            }
            var totalVisitIp = 0;
            this.iepLevelVistypData.forEach(data => {
                if (data.activeFlag) {
                    totalVisitIp = totalVisitIp + Number(data.maxVisitsType)
                }
            });
           if ((event.data.totVisits && totalVisitIp) ||
                (event.data.totVisits === 0 || totalVisitIp === 0)) {
                if (Number(event.data.totVisits) < Number(totalVisitIp)) {
                    this.show('oimvlimt.totalvisitcannotbelessthanmaxvisittype');
                    this.iepgrid.setColumnData('totVisits', rowIndex, event.data.totVisits);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
            rowdata.validated = true;
            return rowdata;
        }
        if (event.data.totHrs || event.data.tmin) {
            if (event.data.totHrs || event.data.tmin) {
                this.iepgrid.setColumnData('totVisits', rowIndex, undefined);
            }
            event.data.totHrs=event.data.totHrs===null?0:event.data.totHrs
            event.data.tmin= event.data.tmin===null?0: event.data.tmin;
            if ((event.data.totHrs || event.data.totHrs === 0) &&
                (event.data.tmin || event.data.tmin === 0)) {
                const maxHrs = (Number(event.data.totHrs) + (Number(event.data.tmin)) / 60);
                this.iepgrid.setColumnData('totHrsTemp', rowIndex, String(maxHrs.toFixed(2)));
            }
          //  if (event.data.totHrs && this.vistypModel.maxHrsType ||
            //    event.data.totHrs === 0 && this.vistypModel.maxHrsType >= 0) {
                var totalTimeForIep = 0;
                this.iepLevelVistypData.forEach(data => {
                    if (data.activeFlag) {
                        totalTimeForIep = totalTimeForIep + Number(data.maxHrsTypeTemp)
                    }
                });
                if (Number(event.data.totHrsTemp) < Number(totalTimeForIep)) {
                    this.show('oimvlimt.totaltimecannotbelessthanmaxtime');
                    this.iepgrid.setColumnData('totHrs', rowIndex, event.data.totHrs);
                    this.iepgrid.setColumnData('tmin', rowIndex, event.data.tmin);
                    rowdata.validated = true;
                    return rowdata;
                }
          //  }
            rowdata.validated = true;
            return rowdata;
        }
        rowdata.validated = true;
        return rowdata;

    }

    IEPVisistvalidateRow = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();
        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.ieptypegrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.ieptypegrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'maxVisitsType') {
            if (event.data.maxVisitsType === 0) {
                this.ieptypegrid.setColumnData('maxVisitsType', rowIndex, undefined);
            }
            if (event.data.maxVisitsType) {
                this.ieptypegrid.setColumnData('maxHrsType', rowIndex, undefined);
                this.ieptypegrid.setColumnData('mmin', rowIndex, undefined);
            }
            if (event.data.maxVisitsType && this.viscycModel.totVisits ||
                event.data.maxVisitsType === 0 && this.viscycModel.totVisits === 0) {
                if (Number(event.data.maxVisitsType) > Number(this.viscycModel.totVisits)) {
                    this.show('oimvlimt.maxvisitspertypecannotbegreaterthantotalvisits');
                    this.ieptypegrid.setColumnData('maxVisitsType', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                }
            }
        }
        if (event.field === 'mmin') {
            if ((event.data.maxHrsType || event.data.maxHrsType === 0) &&
                (event.data.mmin || event.data.mmin === 0)) {
                const maxHrs = (Number(event.data.maxHrsType) + (Number(event.data.mmin)) / 60);
                this.ieptypegrid.setColumnData('maxHrsTypeTemp', rowIndex, maxHrs);
            }
            if ((Number(event.data.maxHrsType) + (Number(event.data.mmin)) / 60) > (Number(this.viscycModel.totHrs) + (Number(this.viscycModel.tmin)) / 60)) {
                this.show('oimvlimt.maxtimecannotbegreaterthantotaltime');
                this.ieptypegrid.setColumnData('mmin', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            }
        }
        if (event.field === 'maxHrsType') {
            if (event.data.maxHrsType && this.viscycModel.totHrs ||
                event.data.maxHrsType === 0 && this.viscycModel.totHrs === 0) {
                if (Number(event.data.maxHrsType) > Number(this.viscycModel.totHrs)) {
                    this.show('oimvlimt.maxtimecannotbegreaterthantotaltime');
                    this.ieptypegrid.setColumnData('maxHrsType', rowIndex, undefined);
                    this.ieptypegrid.setColumnData('mmin', rowIndex, undefined);
                    rowdata.validated = true;
                    return rowdata;
                } else {
                    const maxHrsType = (Number(event.data.maxHrsType) + (Number(event.data.mmin)) / 60);
                    this.ieptypegrid.setColumnData('maxHrsTypeTemp', rowIndex, maxHrsType);
                }
            }
        }
        rowdata.validated = true;
        return rowdata;

    }

    iepLevelValidations() {
        const is = { valid: true };
        this.iepLevelData.forEach(data => {

            if (!data.cycleType) {
                this.show('oimvlimt.cycletypemustbeentered');
                is.valid = false;
                return;
            }
            if (!data.startDay) {
                this.show('oimvlimt.startdaymustbeentered');
                is.valid = false;
                return;
            }
        });

        for (let i = 0; i < this.iepLevelData.length - 1; i++) {
            for (let j = i + 1; j < this.iepLevelData.length; j++) {
                if (i !== j && this.iepLevelData[i].visitConfigTypeValue === this.iepLevelData[j].visitConfigTypeValue &&
                    this.iepLevelData[i].activeFlag && this.iepLevelData[j].activeFlag) {
                    this.show('oimvlimt.theiplevelisalreadyactive');
                    is.valid = false;
                    return is.valid;
                }
            }
        }


        return is.valid;

    }



    iepVistypValidations(event?) {
        const is = { valid: true };
        this.iepLevelVistypData.forEach(data => {
            if (!data.visitType) {
                this.show('oimvlimt.visittypemustbeentered');
                is.valid = false;
                return;
            }
            if (data.maxHrsType && (data.maxHrsType > this.iepLevelModel.totHrs)) {
                this.show('oimvlimt.maxtimecannotbegreaterthantotaltime');
                is.valid = false;
                return;
            }
        });
        for (let i = 0; i < this.iepLevelVistypData.length; i++) {
            for (let j = 0; j < this.iepLevelVistypData.length; j++) {
                if (i !== j && this.iepLevelVistypData[i].visitType === this.iepLevelVistypData[j].visitType) {
                    this.show('oimvlimt.rowalredyexist');
                    is.valid = false;
                    return;
                }
            }
        }
        return is.valid;
    }
    onIEPGridInsert = () => {
        if (!this.agyLocId) {
            this.show('common.Facilitymustbeenteredfirst');
            return false;
        }
        if (!this.iepLevelValidations())
            return false;
        return { activeFlag: true };
    }
    onIepVisitInsert = () => {
        if (!this.agyLocId) {
            this.show('common.Facilitymustbeenteredfirst');
            return false;
        }
        if (!this.viscycModel.createDatetime) {
            this.show('common.youcannotcreatethisrecord');
            return false;
        }
        if (!this.iepVistypValidations()) {
            return false;
        }
        return { activeFlag: true, reinstateFlag: true };
    }
    expiryDisable = (data, index) => {
        if (!this.securityLevelCheck) {
            return true;
        }
        else {
            return false;
        }
    }

    iepvistypExecuteQuery() {
        this.vistypModel.visitCycleLimitId = this.viscycModel.visitCycleLimitId;

        const vistypResult = this.oimvlimtFactory.visTypExecuteQuery(this.vistypModel);
        vistypResult.subscribe(vistypResultList => {
            if (vistypResultList.length === 0) {
                this.iepLevelVistypData = [];
            } else {
                vistypResultList.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.reinstateFlag = element.reinstateFlag === 'Y' ? true : false;
                });
                this.iepLevelVistypData = vistypResultList;
                this.vistypModel = vistypResultList[0];
                this.iepVisitTableIndex = 0;
            }
        });
    }
    canCellEditexpiryFlag = (data: any, index: number, field: string): boolean => {
        if (this.iepLevelCheck) {
            return false;
        } else {
            return true;
        }
    }

    iepSecLevelsEvent(event) {
        if (this.iepSecLevelsTemp === null || this.iepSecLevelsTemp === undefined || this.iepSecLevelsTemp === '') {
            this.iepSecLevelsTemp = this.iepSecLevels;
        }
        if (event.code === 'SEC_LEVEL') {
            this.msg = this.translateService.translate('oimvlimt.changingieplevel');
        } else {
            this.msg = this.translateService.translate('oimvlimt.changingseclevel');
        }
        this.oimvlimtFactory.getIepVisitLimis(this.agyLocId).subscribe(data => {
            if (data.agencyVisitConfig === 'EMPTYDATA') {
                this.iepSecLevelsTemp = this.iepSecLevels;
            }
            else if (data.agyLocId === this.agyLocId && data.visitConfigType !== event.code) {
                this.loadPopUp(this.msg, data.agyLocId, this.iepSecLevels, "UPDATE");
            }

        })

    }

    loadPopUp(msg, agylocid, iepSecLevel, operation) {

        const data = {
            label: msg, yesBtn: true, noBtn: true
        };

        this.dialogService.openLinkDialog('/ocucoffeconfirmbox', data, 50).subscribe(result => {
            if (result) {
                this.iepSecLevelsTemp = this.iepSecLevels;
                this.oimvlimtFactory.saveIepSecData(agylocid, iepSecLevel, operation).subscribe(val => {
                    if (this.iepSecLevels === 'IEP_LEVEL') {
                        this.iepLevelexecuteQuery();
                    } else {
                        this.oimvlimtexecuteQuery();
                    }
                });
            } else {
                this.iepSecLevels = this.iepSecLevelsTemp;
                return;
            }
        });
    }

}

