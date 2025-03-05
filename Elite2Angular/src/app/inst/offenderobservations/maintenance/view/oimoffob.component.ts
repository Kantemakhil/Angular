import {
    AfterViewInit,
    Component, OnInit, ViewChild
} from '@angular/core';

import { TranslateService } from '@common/translate/translate.service';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { ReferenceDomainService } from '@core/ui-components/lov/reference-domain.service';
import { OcmstoffService } from '@inst/institutional-activities/maintenance/service/ocmstoff.service';
import { OffenderObservationTypes } from '../beans/OffenderObservationTypes';
import { OffenderObservationTypesCommitBean } from '../beans/OffenderObservationTypesCommitBean';
import { OffenderObservationZones } from '../beans/OffenderObservationZones';
import { OffenderObservationZonesCommitBean } from '../beans/OffenderObservationZonesCommitBean';
import { OffObsCharacteristics } from '../beans/OffObsCharacteristics';
import { OffObsCharacteristicsCommitBean } from '../beans/OffObsCharacteristicsCommitBean';
import { OffObsZoneDetails } from '../beans/OffObsZoneDetails';
import { OffObsZoneDetailsCommitBean } from '../beans/OffObsZoneDetailsCommitBean';
import { OimoffobService } from '../service/oimoffob.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OffenderObservationTypesSaveCommitBean } from '../beans/OffenderObservationTypesSaveCommitBean';
// import required bean declarations

@Component({
    selector: 'app-oimoffob',
    templateUrl: './oimoffob.component.html',
    styleUrls: ['./oimoffob.component.scss']
})

export class OimoffobComponent implements OnInit,AfterViewInit {
   @ViewChild('observationTypegrid', { static: true }) observationTypegrid: any;
   @ViewChild('zoneHousingGrid', {static: true}) zoneHousingGrid: any;
   @ViewChild('zoneGrid', {static: true}) zoneGrid: any;
   
    observationTypesColumnDef: any[];
    obsTypeIndex = 0;
    msgs = [];
    msglist = [];
    message = 'Invalid.';
    type = 'error';
    observationTypeCommitBean: OffenderObservationTypesCommitBean = new OffenderObservationTypesCommitBean();
    obserVationTypeData: OffenderObservationTypes[] = [];
    obserVationTypeDataTemp: OffenderObservationTypes[] = [];
    obserVationTypeDataModel: OffenderObservationTypes = new OffenderObservationTypes();
    obserVationTypeDataModelTemp: OffenderObservationTypes = new OffenderObservationTypes();

    observationTypesInsertList: OffenderObservationTypes[] = [];
    observationTypesUpdatetList: OffenderObservationTypes[] = [];
    observationTypesDeleteList: OffenderObservationTypes[] = [];

    zoneData: OffenderObservationZones[] = [];
    offenderObservationZoneModel: OffenderObservationZones = new OffenderObservationZones();
    offenderObservationSearchZoneModel: OffenderObservationZones = new OffenderObservationZones();
    offObservZoneDataColumnDef: any[];



    zonesInsertList: OffenderObservationZones[] = [];
    zonesUpdatetList: OffenderObservationZones[] = [];
    zonesDeleteList: OffenderObservationZones[] = [];
    zoneDetailsCommitBean: OffenderObservationZonesCommitBean = new OffenderObservationZonesCommitBean();


    zoneHousingData: OffObsZoneDetails[] = [];
    offObsZoneDetailsSearchModel: OffObsZoneDetails = new OffObsZoneDetails();
    offObsZoneDetailsModel: OffObsZoneDetails = new OffObsZoneDetails();



    zonesHousingInsertList: OffObsZoneDetails[] = [];
    zonesHousingUpdatetList: OffObsZoneDetails[] = [];
    zonesHousingDeleteList: OffObsZoneDetails[] = [];
    offObsZoneDetailsCommitBean: OffObsZoneDetailsCommitBean = new OffObsZoneDetailsCommitBean();


    zoneHousingDataColumnDef: any[];
    agyLocId: string;
    zoneDataIndex: number;



    actionName: string;
    lovModel: any[];
    nameOfLovPage: string;
    listToCompare: any[] = [];

    cellConditionList: any[] = [];
    notInCellList: any[] = [];
    activityList: any[] = [];
    commonDetailsCatList : any[] = [];
    officerNotesList : any[] = [];
    mode: string;
    public fields: Object = { text: 'description', value: 'code' };

    isDis : boolean = true;

    offObsCharacteristicsInsertList: OffObsCharacteristics[] = [];
    offObsCharacteristicsUpdatetList: OffObsCharacteristics[] = [];
    offObsCharacteristicsDeleteList: OffObsCharacteristics[] = [];
    offObsCharacteristicsCommitBean: OffObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();
    offObsCharacteristics: OffObsCharacteristics;
    offObsCharacteristicsModel: OffObsCharacteristics = new OffObsCharacteristics();
    obserVationTypeDataModelTemp1: OffenderObservationTypes = new OffenderObservationTypes();
    offenderObservationTypesSaveCommitBean: OffenderObservationTypesSaveCommitBean=new OffenderObservationTypesSaveCommitBean();
    saveDisable: boolean = true;
    constructor(private oimoffobFactory: OimoffobService, public translateService: TranslateService, private refCodeService: ReferenceDomainService,
        private ocmstoffFactory: OcmstoffService, public dialogService: DialogService) {
        this.observationTypesColumnDef = [];
        this.offObservZoneDataColumnDef = [];
        this.zoneHousingDataColumnDef = [];




        this.mode = 'CheckBox';
    }
    ngAfterViewInit(): void {
        this.isDis = false;
    }
    ngOnInit() {
        this.obserVationTypeData = [];
        this.zoneData = [];




        this.observationTypesColumnDef = [
            {
                fieldName: this.translateService.translate('oimoffob.observationtype'), field: 'observationType', editable: true, width: 150,
                datatype: 'lov', domain: 'OBSRVATN_TYP', required: true, cellEditable: this.canAlertEdit
            },
            {
                fieldName: this.translateService.translate('oimoffob.checkfreqency'), field: 'frequency', editable: true, width: 150,
                datatype: 'number', required: true, minValue: '0', maxValue: '9999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oimoffob.notify'), field: 'notificationFlag', datatype: 'checkbox',
                editable: true, width: 150
            },

            { fieldName: this.translateService.translate('oimoffob.notificationbuffer'), field: 'notificationTiming', editable: true, width: 150, 
            datatype: 'number', minValue: '0', maxValue: '99', strictFP: true, whole: true, cellEditable: this.canEditNotificationBuffer },
            {
                fieldName: this.translateService.translate('oimoffob.Seq'), field: 'listSeq', editable: true, width: 150,
                datatype: 'number', minValue: '0', maxValue: '999999', strictFP: true, whole: true
            },
            {
                fieldName: this.translateService.translate('oimoffob.activeflag'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimoffob.expirydate'),
                field: 'expiryDate', datatype: 'date', editable: false, width: 150
            },
            {
                fieldName: '',
                field: 'isUpdated', hide:true
            },
        ];
        this.offObservZoneDataColumnDef = [
            {
                fieldName: this.translateService.translate('oimoffob.zone'), field: 'zoneCode', editable: true, width: 150,
                datatype: 'lov', domain: 'OBSRVTN_ZONE', required: true
            },
            {
                fieldName: this.translateService.translate('oimoffob.Seq'), field: 'listSeq', editable: true, width: 150,
                datatype: 'number', minValue: '0', maxValue: '999999', strictFP: true, whole: true, required: true
            },
            {
                fieldName: this.translateService.translate('oimoffob.activeflag'), field: 'activeFlag',
                editable: true, width: 150, datatype: 'checkbox'
            },
            {
                fieldName: this.translateService.translate('oimoffob.expirydate'),
                field: 'expiryDate', datatype: 'date', editable: false, width: 150
            },

        ]

        this.zoneHousingDataColumnDef = [
            {
                fieldName: this.translateService.translate('oimoffob.locationcode'), field: 'locationCode', editable: false, width: 150, required: true

            },
            {
                fieldName: ' ', field: 'idbutton', datatype: 'launchbutton', editable: true, width: 100,
                 data: 'row', updateField: 'row', modal: true, onLaunchClick: this.onZoneHousingLocationLaunchEdit, isDisable : this.disableCell
            },
            {
                fieldName: this.translateService.translate('oimoffob.locationdescription'), field: 'locationDescription', editable: false, width: 150,
                
            },
            
            {
                fieldName: this.translateService.translate('oimoffob.sensorid'), field: 'sensorId', editable: true,
                 width: 150, cellEditable: this.canInActiveEdit, required: true, datatype: 'text', uppercase: 'false', maxlength: 100
                
            },
            {
                fieldName: this.translateService.translate('oimoffob.Seq'), field: 'listSeq', editable: true, width: 150,
                datatype: 'number', minValue: '0', maxValue: '999999', strictFP: true, whole: true, required: true, cellEditable: this.canInActiveEdit
            },
            {
                fieldName: this.translateService.translate('oimoffob.activeflag'), field: 'activeFlag',
                width: 150, datatype: 'checkbox', cellEditable: this.canInActiveEdit
            },
            {
                fieldName: this.translateService.translate('oimoffob.expirydate'),
                field: 'expiryDate', datatype: 'date', editable: false, width: 150
            },

            { field: 'internalLocationId', hide: true},
        ]




        this.observationTypesExecuteQuery();
    }

    canAlertEdit = (data: any, index: number, field: string): boolean => {
        if (!data.createDatetime) {
            return true;
        } else {
            return false;
        }
    }

    canInActiveEdit = (data: any, index: number, field: string): boolean => {
        if (this.offenderObservationZoneModel.activeFlag || this.offenderObservationZoneModel.activeFlag === 'Y') {
            return true;
        } else {
            return false;
        }
    }
    
    disableCell = (data: any, index: number): boolean => {
        if (data.createDatetime) {
          return true;
        } else {
          return false;
        }
      }

    canEditNotificationBuffer = (data: any, index: number, field: string): boolean => {
        if (data.notificationFlag || data.notificationFlag==='Y') {
            return true;
        } else {
            return false;
        }
    }
    onRowClickObserVationType(event) {
        if(event){
            this.obserVationTypeDataModel = event;
            this.obserVationTypeDataModelTemp1 = JSON.parse(JSON.stringify(this.obserVationTypeDataModel));
            if(this.obserVationTypeDataModel.observationType && this.obserVationTypeDataModel.createDatetime){
                this.observationCharecterExecuteQuery();
            } else {
                this.cellConditionList =[];
                this.notInCellList = [];
                this.activityList = [];
                this.commonDetailsCatList = [];
                this.officerNotesList = [];
            }
        }
    }
    clear() {
        this.saveDisable = true;
        this.observationTypesExecuteQuery();
    }
    no() {
    }
    cancel() {
    }

    /**
    * To display the messages
    */


    show(vldmsg, type?) {
        type = type ? type : 'warn';
        vldmsg = this.translateService.translate(vldmsg);
        const msgval = [{ message: vldmsg, type: type }];
        this.msgs = [...msgval];
    }
    /**
     *  This function will be executed when commit event is
    * fired
    */
    obserVationTypeForm(event) {


        this.observationTypesInsertList = event.added;
        this.observationTypesUpdatetList = event.updated;
        this.observationTypesDeleteList = event.removed;
        this.observationTypeCommitBean.insertList = [];
        this.observationTypeCommitBean.updateList = [];
        this.observationTypeCommitBean.deleteList = [];
        if (this.observationTypesInsertList.length > 0 || this.observationTypesUpdatetList.length > 0) {
            for (let i = 0; i < this.observationTypesInsertList.length; i++) {
                this.observationTypesInsertList[i].notificationFlag = this.observationTypesInsertList[i].notificationFlag ? 'Y' : 'N';
                this.observationTypesInsertList[i].activeFlag = this.observationTypesInsertList[i].activeFlag ? 'Y' : 'N';
                this.observationTypeCommitBean.insertList = this.observationTypesInsertList;
            }
            for (let i = 0; i < this.observationTypesUpdatetList.length; i++) {
                this.observationTypesUpdatetList[i].activeFlag = this.observationTypesUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.observationTypesUpdatetList[i].notificationFlag = this.observationTypesUpdatetList[i].notificationFlag ? 'Y' : 'N';
                this.observationTypeCommitBean.updateList = this.observationTypesUpdatetList;

            }
        }
        if (this.observationTypesDeleteList.length > 0) {
            for (let i = 0; i < this.observationTypesDeleteList.length; i++) {
                this.observationTypeCommitBean.deleteList = this.observationTypesDeleteList;
            }
        }
        
        const omsroleSaveData = this.oimoffobFactory.obserVationTypeCommit(this.observationTypeCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.rowalreadyexistswithsamedata'), 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 4) {
                this.show(this.translateService.translate('oimoffob.cannotdeleterecodchildincharecteristics'), 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 3) {
                this.show(this.translateService.translate('oimoffob.cannotdeleterecordexistinoffenderobservationperiod'), 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.observationTypesExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
        });
    }
    /**
     * This function auto generates empty record to insert a new record
     */
    onGridInsert = () => {
        this.obserVationTypeDataModel =new OffenderObservationTypes();
        return { activeFlag: true };
    }


    observationTypesExecuteQuery() {
        const sentermsResult = this.oimoffobFactory.observationTypesExecuteQuery();
        sentermsResult.subscribe(data => {
            if (data.length === 0) {
                this.obserVationTypeData = [];
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.cellConditionFlag = element.cellConditionFlag === 'Y' ? true : false;
                    element.activityFlag = element.activityFlag === 'Y' ? true : false;
                    element.demeanorFlag = element.demeanorFlag === 'Y' ? true : false;
                    element.notInCellFlag = element.notInCellFlag === 'Y' ? true : false;
                    element.officerNotesFlag = element.officerNotesFlag === 'Y' ? true : false;
                    element.notificationFlag = element.notificationFlag === 'Y' ? true : false;
                });
                this.obserVationTypeData = data;
                this.obserVationTypeDataTemp = JSON.parse(JSON.stringify(data));
                //this.obserVationTypeDataModel = data[0];
                this.obsTypeIndex = 0;
            }
        });
    }

    validateObservationTypesData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.observationTypegrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.observationTypegrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateZoneData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.zoneGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.zoneGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }

    validateZoneHousingData = (event) => {
        const rowIndex = event.rowIndex;
        const rowdata = new ValidateRowReturn();

        if (event.field === 'activeFlag') {
            if (event.data.activeFlag) {
                this.zoneHousingGrid.setColumnData('expiryDate', rowIndex, undefined);
                rowdata.validated = true;
                return rowdata;
            } else if (!event.data.activeFlag) {
                this.zoneHousingGrid.setColumnData('expiryDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
                rowdata.validated = true;
                return rowdata;
            }
        }
        rowdata.validated = true;
        return rowdata;
    }
    
    agyLocChangeEvent = (event) => {
        this.getZoneDetailsExecuteQuery();
    }

    getZoneDetailsExecuteQuery() {
        this.offObsZoneDetailsSearchModel.agyLocId = this.agyLocId;
        const sentermsResult = this.oimoffobFactory.getZoneDetailsExecuteQuery(this.offObsZoneDetailsSearchModel);
        sentermsResult.subscribe(data => {
            if (data.length === 0) {
                this.zoneData = [];
                this.zoneHousingData = [];
            } else {
                data.forEach(element => {
                    element.activeFlagTemp = element.activeFlag === 'Y' ? true : false;
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                });
                this.zoneData = data;
                this.offenderObservationZoneModel = data[0];
                this.zoneDataIndex = 0;
            }
        });
    }


    getZoneDetailsHousingExecuteQuery() {

        this.offObsZoneDetailsSearchModel.agyLocId = this.agyLocId;
        this.offObsZoneDetailsSearchModel.zoneCode = this.offenderObservationZoneModel.zoneCode;

        const sentermsResult = this.oimoffobFactory.getZoneDetailsHousingExecuteQuery(this.offObsZoneDetailsSearchModel);
        sentermsResult.subscribe(data => {
            if (data.length === 0) {
                this.zoneHousingData = [];
            } else {
                data.forEach(element => {
                    element.activeFlag = element.activeFlag === 'Y' ? true : false;
                    element.idbutton = '...';
                });
                this.zoneHousingData = data;
                this.offObsZoneDetailsModel = data[0];
                this.zoneDataIndex = 0;
            }
        });

    }

    zoneDataSaveForm(event) {
        this.zonesInsertList = event.added;
        this.zonesUpdatetList = event.updated;
        this.zonesDeleteList = event.removed;
        this.zoneDetailsCommitBean.insertList = [];
        this.zoneDetailsCommitBean.updateList = [];
        this.zoneDetailsCommitBean.deleteList = [];
        if (this.zonesInsertList.length > 0 || this.zonesUpdatetList.length > 0) {
            for (let i = 0; i < this.zonesInsertList.length; i++) {
                this.zonesInsertList[i].activeFlag = this.zonesInsertList[i].activeFlag ? 'Y' : 'N';
                this.zonesInsertList[i].agyLocId = this.agyLocId;
                this.zoneDetailsCommitBean.insertList = this.zonesInsertList;
            }
            for (let i = 0; i < this.zonesUpdatetList.length; i++) {
                this.zonesUpdatetList[i].activeFlag = this.zonesUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.zonesUpdatetList[i].agyLocId = this.agyLocId;
                this.zoneDetailsCommitBean.updateList = this.zonesUpdatetList;

            }
        }
        if (this.zonesDeleteList.length > 0) {
            for (let i = 0; i < this.zonesDeleteList.length; i++) {
                this.zoneDetailsCommitBean.deleteList = this.zonesDeleteList;
            }
        }

        const omsroleSaveData = this.oimoffobFactory.zoneDataSaveForm(this.zoneDetailsCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.rowalreadyexistswithsamedata'), 'warn');
                this.getZoneDetailsExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getZoneDetailsExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getZoneDetailsExecuteQuery();
                return;
            }
        });
    }


    onRowClickzoneData(event) {
        if (event) {
            this.offenderObservationZoneModel = event;
            this.getZoneDetailsHousingExecuteQuery();
        }
    }

    onGridZoneInsert = () => {
        this.offenderObservationZoneModel =new OffenderObservationZones();
        this.zoneHousingData=[];
        this.offObsZoneDetailsModel =new OffObsZoneDetails();
        return { activeFlag: true };
    }


    onRowClickZoneHousing(event) {
        if (event) {
            if(event.locationDescription){
                this.zoneHousingGrid.requiredOn('listSeq');
            }
            this.offObsZoneDetailsModel = event;
        }
    }

    onGridZoneHousInsert = () => {
        return { activeFlag: true, idbutton: '...', locationCode:undefined, otherLocExist:'N' };
    }


    zoneHousingSubmitForm(event) {
        this.zonesHousingInsertList = event.added;
        this.zonesHousingUpdatetList = event.updated;
        this.zonesHousingDeleteList = event.removed;
        this.offObsZoneDetailsCommitBean.insertList = [];
        this.offObsZoneDetailsCommitBean.updateList = [];
        this.offObsZoneDetailsCommitBean.deleteList = [];

        if (this.zonesHousingInsertList.length > 0 || this.zonesHousingUpdatetList.length > 0) {
            for (let i = 0; i < this.zonesHousingInsertList.length; i++) {
                if(!this.zonesHousingInsertList[i].internalLocationId){
                    this.show(this.translateService.translate('oimoffob.locationmustbeentered'), 'warn');
                    return;
                }
                if(!this.zonesHousingInsertList[i].sensorId){
                    this.show(this.translateService.translate('oimoffob.sensoridmustbenetered'), 'warn');
                    return;
                }
                if(!this.zonesHousingInsertList[i].listSeq){
                    this.show(this.translateService.translate('oimoffob.seqmustbeentered'), 'warn');
                    return;
                }
                this.zonesHousingInsertList[i].agyLocId = this.agyLocId;
                this.zonesHousingInsertList[i].zoneCode = this.offenderObservationZoneModel.zoneCode;
                this.zonesHousingInsertList[i].activeFlag = this.zonesHousingInsertList[i].activeFlag ? 'Y' : 'N';
                this.offObsZoneDetailsCommitBean.insertList = this.zonesHousingInsertList;
            }
            for (let i = 0; i < this.zonesHousingUpdatetList.length; i++) {
                if(!this.zonesHousingUpdatetList[i].internalLocationId){
                    this.show(this.translateService.translate('oimoffob.locationmustbeentered'), 'warn');
                    return;
                }
                if(!this.zonesHousingUpdatetList[i].sensorId){
                    this.show(this.translateService.translate('oimoffob.sensoridmustbenetered'), 'warn');
                    return;
                }
                if(!this.zonesHousingUpdatetList[i].listSeq){
                    this.show(this.translateService.translate('oimoffob.seqmustbeentered'), 'warn');
                    return;
                }
                

                this.zonesHousingUpdatetList[i].activeFlag = this.zonesHousingUpdatetList[i].activeFlag ? 'Y' : 'N';
                if(this.zonesHousingUpdatetList[i].otherLocExist === 'Y' && this.zonesHousingUpdatetList[i].activeFlag === 'Y'){
                    this.show(this.translateService.translate('oimoffob.thedelectedhousinglocationisalreadyassignedtoanotherzone'), 'warn');
                    return;
                }
                this.zonesHousingUpdatetList[i].agyLocId = this.agyLocId;
                this.zonesHousingUpdatetList[i].zoneCode = this.offenderObservationZoneModel.zoneCode;
                this.offObsZoneDetailsCommitBean.updateList = this.zonesHousingUpdatetList;

            }
        }
        if (this.zonesHousingDeleteList.length > 0) {
            for (let i = 0; i < this.zonesHousingDeleteList.length; i++) {
                this.offObsZoneDetailsCommitBean.deleteList = this.zonesHousingDeleteList;
            }
        }

        const omsroleSaveData = this.oimoffobFactory.zoneHousingDataCommitForm(this.offObsZoneDetailsCommitBean);
        omsroleSaveData.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.rowalreadyexistswithsamedata'), 'warn');
                this.getZoneDetailsHousingExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.getZoneDetailsHousingExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.getZoneDetailsHousingExecuteQuery();
                return;
            }
        });
    }





    saveCharecterDetails() {  
        this.offObsCharacteristicsInsertList = [];  
        this.offObsCharacteristicsCommitBean.insertList = [];
        this.offObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();
        //if(this.obserVationTypeDataModel.cellConditionFlag)
        if(this.obserVationTypeDataModel.cellConditionFlag &&  (!this.obserVationTypeDataModel.cellConditionList || this.obserVationTypeDataModel.cellConditionList.length === 0)){
            this.show('oimoffob.pleaseselectatleasetonecellcondition', 'warn');
            return;
        } else{
            if(this.obserVationTypeDataModel.cellConditionList && this.obserVationTypeDataModel.cellConditionList.length>0 && this.obserVationTypeDataModel.cellConditionFlag){
                this.obserVationTypeDataModel.cellConditionList.forEach(obj=>{
                    this.offObsCharacteristics=new OffObsCharacteristics();
                    this.offObsCharacteristics.characteristicsType = 'CELL_CNDITNS';
                    this.offObsCharacteristics.observationType = this.obserVationTypeDataModel.observationType;
                    this.offObsCharacteristics.characteristicsCode = obj;
                    this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
                })
            }
        }
        if(this.obserVationTypeDataModel.notInCellFlag &&  (!this.obserVationTypeDataModel.notInCellList || this.obserVationTypeDataModel.notInCellList.length === 0)){
            this.show('oimoffob.pleaseselectatleasetonenotincelldata', 'warn');
            return;
        } else{
        if(this.obserVationTypeDataModel.notInCellList && this.obserVationTypeDataModel.notInCellList.length>0  && this.obserVationTypeDataModel.notInCellFlag){
            this.obserVationTypeDataModel.notInCellList.forEach(obj=>{
                this.offObsCharacteristics=new OffObsCharacteristics();
                this.offObsCharacteristics.characteristicsType = 'NOT_IN_CELL';
                this.offObsCharacteristics.observationType = this.obserVationTypeDataModel.observationType;
                this.offObsCharacteristics.characteristicsCode = obj;
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }
    }
    if(this.obserVationTypeDataModel.activityFlag &&  (!this.obserVationTypeDataModel.activityList || this.obserVationTypeDataModel.activityList.length === 0)){
        this.show('oimoffob.pleaseselectatleasetoneactivitydata', 'warn');
        return;
    } else{
        if(this.obserVationTypeDataModel.activityList && this.obserVationTypeDataModel.activityList.length>0 && this.obserVationTypeDataModel.activityFlag){
            this.obserVationTypeDataModel.activityList.forEach(obj=>{
                this.offObsCharacteristics=new OffObsCharacteristics();
                this.offObsCharacteristics.characteristicsType = 'ACTIVITY';
                this.offObsCharacteristics.observationType = this.obserVationTypeDataModel.observationType;
                this.offObsCharacteristics.characteristicsCode = obj;
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }
    }
    if(this.obserVationTypeDataModel.demeanorFlag &&  (!this.obserVationTypeDataModel.commonDetailsCatList || this.obserVationTypeDataModel.commonDetailsCatList.length === 0)){
        this.show('oimoffob.pleaseselectatleasetonedemeanordata', 'warn');
        return;
    } else{
        if(this.obserVationTypeDataModel.commonDetailsCatList && this.obserVationTypeDataModel.commonDetailsCatList.length>0  && this.obserVationTypeDataModel.demeanorFlag){
            this.obserVationTypeDataModel.commonDetailsCatList.forEach(obj=>{
                this.offObsCharacteristics=new OffObsCharacteristics();
                this.offObsCharacteristics.characteristicsType = 'COM_DET_CAT';
                this.offObsCharacteristics.observationType = this.obserVationTypeDataModel.observationType;
                this.offObsCharacteristics.characteristicsCode = obj;
                this.offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
            })
        }
    }
        this.offObsCharacteristicsCommitBean.insertList=this.offObsCharacteristicsInsertList;
        if(this.obserVationTypeDataModel){
            this.obserVationTypeDataModelTemp=this.obserVationTypeDataModel;
            this.obserVationTypeDataModelTemp.activeFlag = this.obserVationTypeDataModel.activeFlag ? 'Y':'N'
            this.obserVationTypeDataModelTemp.activityFlag = this.obserVationTypeDataModel.activityFlag ? 'Y':'N'
            this.obserVationTypeDataModelTemp.cellConditionFlag = this.obserVationTypeDataModel.cellConditionFlag ? 'Y':'N'
            this.obserVationTypeDataModelTemp.demeanorFlag = this.obserVationTypeDataModel.demeanorFlag ? 'Y':'N'
            this.obserVationTypeDataModelTemp.notInCellFlag = this.obserVationTypeDataModel.notInCellFlag ? 'Y':'N'
            this.obserVationTypeDataModelTemp.officerNotesFlag = this.obserVationTypeDataModel.officerNotesFlag ? 'Y':'N'

        }
        this.offObsCharacteristicsCommitBean.observationCheckDetailTypeBean = this.obserVationTypeDataModelTemp;
        const saveResult = this.oimoffobFactory.saveCharecterDetails(this.offObsCharacteristicsCommitBean);
        saveResult.subscribe(data => {
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.samedataexistsforobservationtype'), 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.observationTypesExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
        });
    }


    observationCharecterExecuteQuery() {
        this.offObsCharacteristicsModel.observationType = this.obserVationTypeDataModel.observationType;
        this.offObsCharacteristicsModel.obsTypeVersionId = this.obserVationTypeDataModel.obsTypeVersionId;
        const sentermsResult = this.oimoffobFactory.observationCharecterExecuteQuery(this.offObsCharacteristicsModel);
        sentermsResult.subscribe(data => {
            if (data.length === 0) {
                this.cellConditionList =[];
                this.notInCellList = [];
                this.activityList = [];
                this.commonDetailsCatList = [];
                this.officerNotesList = [];
            } else {
                data.forEach(element => {
                    this.cellConditionList = element.cellConditionList;
                    this.notInCellList = element.notInCellList;
                    this.activityList = element.activityList;
                    this.commonDetailsCatList = element.commonDetailsCatList;
                    this.officerNotesList = element.officerNotesList;
                });  
                    if(this.obserVationTypeDataModel.cellConditionFlag){
                        this.obserVationTypeDataModel.cellConditionList = this.cellConditionList;
                    } else {
                        this.obserVationTypeDataModel.cellConditionList =[];
                    }
    
                    if(this.obserVationTypeDataModel.activityFlag){
                        this.obserVationTypeDataModel.activityList = this.activityList;
                    }else {
                        this.obserVationTypeDataModel.activityList = [];
                    }
    
                    if(this.obserVationTypeDataModel.notInCellFlag){
                        this.obserVationTypeDataModel.notInCellList = this.notInCellList;
                    }else {
                        this.obserVationTypeDataModel.notInCellList = [];
                    }
    
    
                    if(this.obserVationTypeDataModel.demeanorFlag){
                        this.obserVationTypeDataModel.commonDetailsCatList = this.commonDetailsCatList;
                    }else {
                        this.obserVationTypeDataModel.commonDetailsCatList = [];
                    }
                    
                
            }
        });
    }
    onZoneHousingLocationLaunchEdit = (event) => {
        event.agyLocId = this.agyLocId;
        event.zoneCode = this.offenderObservationZoneModel.zoneCode;
        this.dialogService.openLinkDialog('/OIUZOHOS', event, 80).subscribe(res => {
            let i = 0;
            if (res) {
                res.forEach(e => {
                    const index = this.zoneHousingData.indexOf(event);
                    this.zoneHousingGrid.setColumnData('locationCode', index + i, e.code);
                    this.zoneHousingGrid.setColumnData('locationDescription', index + i, e.description);
                    this.zoneHousingGrid.setColumnData('internalLocationId', index + i, e.livingUnitId);
                    if (i < res.length - 1) {
                        this.zoneHousingGrid.addRecord();
                    }
                    i++;
                });
            }
        });
    }

    get affDisableFlag(){
        if(JSON.stringify(this.obserVationTypeDataModel) == JSON.stringify(this.obserVationTypeDataModelTemp1)){
            return true;
        }
        return false;
    }

    get affClearDisableFlag(){
        if(JSON.stringify(this.obserVationTypeDataModel) != JSON.stringify(this.obserVationTypeDataModelTemp1)){
            return false;
        }
        return true;
    }

    get gridDeleteType(){
        if(this.obserVationTypeDataModel.createDatetime){
            return true;
        } else {
            return false;
        }
    }

    get insertZousingGrid(){
        if(this.offenderObservationZoneModel && this.offenderObservationZoneModel.createDatetime && 
            ((this.offenderObservationZoneModel.activeFlagTemp)
              )){
                return true;
            } else {
                return false;
            }
    }

    /* || this.offenderObservationZoneModel.activeFlag === 'Y' */
    saveCommonDetails (){
        this.offenderObservationTypesSaveCommitBean = new OffenderObservationTypesSaveCommitBean();
        const observationTypeGridData = { added: [], updated: [], removed: [], offNadAdded: [], offNadUpdated: [] };
        let isChanged = false;
        if (this.observationTypegrid) {
            const added = [];
            this.observationTypegrid.addedMap.forEach((value, keys) => { isChanged = true; added.push(value); });
            const removed = [];
            this.observationTypegrid.removedMap.forEach((value, keys) => { isChanged = true; removed.push(value); });
            const updated = [];
            this.observationTypegrid.updatedMap.forEach((value, keys) => { isChanged = true; updated.push(value); });
            observationTypeGridData.added = added;
            observationTypeGridData.updated = updated;
            observationTypeGridData.removed = removed;       
        }
        this.observationTypesInsertList = observationTypeGridData.added;
        this.observationTypesUpdatetList = observationTypeGridData.updated;
        this.observationTypesDeleteList = observationTypeGridData.removed;
        this.observationTypeCommitBean.insertList = [];
        this.observationTypeCommitBean.updateList = [];
        this.observationTypeCommitBean.deleteList = [];
        if (this.observationTypesInsertList.length > 0 || this.observationTypesUpdatetList.length > 0) {
            for (let i = 0; i < this.observationTypesInsertList.length; i++) {

                this.offObsCharacteristicsInsertList = [];  
                this.offObsCharacteristicsCommitBean.insertList = [];
                this.observationTypesInsertList[i].offObsCharacteristicsInsertList = [];
                this.offObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();
                this.observationTypesInsertList[i].offObsCharacteristicsInsertList=[];
                if(!this.observationTypesInsertList[i].observationType){
                    this.show('oimoffob.observationtypemustbeenterd', 'warn');
                    return;
                }

                if(!this.observationTypesInsertList[i].frequency){
                    this.show('oimoffob.frequencymustbeentered', 'warn');
                    return;
                }

                if(this.observationTypesInsertList[i].cellConditionFlag &&  (!this.observationTypesInsertList[i].cellConditionList || this.observationTypesInsertList[i].cellConditionList.length === 0)){
                    this.show('oimoffob.pleaseselectatleasetonecellcondition', 'warn');
                    return;
                } else{
                    if(this.observationTypesInsertList[i].cellConditionList && this.observationTypesInsertList[i].cellConditionList.length>0 && this.observationTypesInsertList[i].cellConditionFlag){
                        this.observationTypesInsertList[i].cellConditionList.forEach(obj=>{
                            this.offObsCharacteristics=new OffObsCharacteristics();
                            this.offObsCharacteristics.detailType = 'CELL_CNDITNS';
                            this.offObsCharacteristics.observationType = this.observationTypesInsertList[i].observationType;
                            this.offObsCharacteristics.detailCode = obj;
                            if(!this.observationTypesInsertList[i].offObsCharacteristicsInsertList){
                                this.observationTypesInsertList[i].offObsCharacteristicsInsertList = [];                               
                            }
                            this.observationTypesInsertList[i].offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
                        })
                    }
                }
                if(this.observationTypesInsertList[i].notInCellFlag &&  (!this.observationTypesInsertList[i].notInCellList || this.observationTypesInsertList[i].notInCellList.length === 0)){
                    this.show('oimoffob.pleaseselectatleasetonenotincelldata', 'warn');
                    return;
                } else{
                if(this.observationTypesInsertList[i].notInCellList && this.observationTypesInsertList[i].notInCellList.length>0  && this.obserVationTypeDataModel.notInCellFlag){
                    this.observationTypesInsertList[i].notInCellList.forEach(obj=>{
                        this.offObsCharacteristics=new OffObsCharacteristics();
                        this.offObsCharacteristics.detailType = 'NOT_IN_CELL';
                        this.offObsCharacteristics.observationType = this.observationTypesInsertList[i].observationType;
                        this.offObsCharacteristics.detailCode = obj;
                        if(!this.observationTypesInsertList[i].offObsCharacteristicsInsertList){
                            this.observationTypesInsertList[i].offObsCharacteristicsInsertList = [];                               
                        }
                        this.observationTypesInsertList[i].offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
                    })
                }
            }
            if(this.observationTypesInsertList[i].activityFlag &&  (!this.observationTypesInsertList[i].activityList || this.observationTypesInsertList[i].activityList.length === 0)){
                this.show('oimoffob.pleaseselectatleasetoneactivitydata', 'warn');
                return;
            } else{
                if(this.observationTypesInsertList[i].activityList && this.observationTypesInsertList[i].activityList.length>0 && this.observationTypesInsertList[i].activityFlag){
                    this.observationTypesInsertList[i].activityList.forEach(obj=>{
                        this.offObsCharacteristics=new OffObsCharacteristics();
                        this.offObsCharacteristics.detailType = 'ACTIVITY';
                        this.offObsCharacteristics.observationType = this.observationTypesInsertList[i].observationType;
                        this.offObsCharacteristics.detailCode = obj;
                        if(!this.observationTypesInsertList[i].offObsCharacteristicsInsertList){
                            this.observationTypesInsertList[i].offObsCharacteristicsInsertList = [];                               
                        }
                        this.observationTypesInsertList[i].offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
                    })
                }
            }
            if(this.observationTypesInsertList[i].demeanorFlag &&  (!this.observationTypesInsertList[i].commonDetailsCatList || this.observationTypesInsertList[i].commonDetailsCatList.length === 0)){
                this.show('oimoffob.pleaseselectatleasetonedemeanordata', 'warn');
                return;
            } else{
                if(this.observationTypesInsertList[i].commonDetailsCatList && this.observationTypesInsertList[i].commonDetailsCatList.length>0  && this.observationTypesInsertList[i].demeanorFlag){
                    this.observationTypesInsertList[i].commonDetailsCatList.forEach(obj=>{
                        this.offObsCharacteristics=new OffObsCharacteristics();
                        this.offObsCharacteristics.detailType = 'COM_DET_CAT';
                        this.offObsCharacteristics.observationType = this.obserVationTypeDataModel.observationType;
                        this.offObsCharacteristics.detailCode = obj;
                        if(!this.observationTypesInsertList[i].offObsCharacteristicsInsertList){
                            this.observationTypesInsertList[i].offObsCharacteristicsInsertList = [];                               
                        }
                        this.observationTypesInsertList[i].offObsCharacteristicsInsertList.push(this.offObsCharacteristics);
                    })
                }
            }
                this.observationTypesInsertList[i].notificationFlag = this.observationTypesInsertList[i].notificationFlag ? 'Y' : 'N';
                this.observationTypesInsertList[i].officerNotesFlag = this.obserVationTypeDataModel.officerNotesFlag ? 'Y' : 'N';
                this.observationTypesInsertList[i].activeFlag = this.observationTypesInsertList[i].activeFlag ? 'Y' : 'N';
                this.observationTypeCommitBean.insertList = this.observationTypesInsertList;
            }
            for (let i = 0; i < this.observationTypesUpdatetList.length; i++) {

                this.offObsCharacteristicsUpdatetList = [];  
                this.offObsCharacteristicsCommitBean.updateList = [];
                this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList = [];
                this.offObsCharacteristicsCommitBean = new OffObsCharacteristicsCommitBean();

                if(!this.observationTypesUpdatetList[i].observationType){
                    this.show('oimoffob.observationtypemustbeenterd', 'warn');
                    return;
                }

                if(!this.observationTypesUpdatetList[i].frequency){
                    this.show('oimoffob.frequencymustbeentered', 'warn');
                    return;
                }
                if(this.observationTypesUpdatetList[i].cellConditionFlag &&  (!this.observationTypesUpdatetList[i].cellConditionList || this.observationTypesUpdatetList[i].cellConditionList.length === 0)){
                    this.show('oimoffob.pleaseselectatleasetonecellcondition', 'warn');
                    return;
                } else{
                    if(this.observationTypesUpdatetList[i].cellConditionList && this.observationTypesUpdatetList[i].cellConditionList.length>0 && this.observationTypesUpdatetList[i].cellConditionFlag){
                        this.observationTypesUpdatetList[i].cellConditionList.forEach(obj=>{
                            this.offObsCharacteristics=new OffObsCharacteristics();
                            this.offObsCharacteristics.detailType = 'CELL_CNDITNS';
                            this.offObsCharacteristics.observationType = this.observationTypesUpdatetList[i].observationType;
                            this.offObsCharacteristics.detailCode = obj;
                            if(!this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList){
                                this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList = [];                               
                            }
                            this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList.push(this.offObsCharacteristics);
                        })
                    }
                }
                if(this.observationTypesUpdatetList[i].notInCellFlag &&  (!this.observationTypesUpdatetList[i].notInCellList || this.observationTypesUpdatetList[i].notInCellList.length === 0)){
                    this.show('oimoffob.pleaseselectatleasetonenotincelldata', 'warn');
                    return;
                } else{
                if(this.observationTypesUpdatetList[i].notInCellList && this.observationTypesUpdatetList[i].notInCellList.length>0  && this.obserVationTypeDataModel.notInCellFlag){
                    this.observationTypesUpdatetList[i].notInCellList.forEach(obj=>{
                        this.offObsCharacteristics=new OffObsCharacteristics();
                        this.offObsCharacteristics.detailType = 'NOT_IN_CELL';
                        this.offObsCharacteristics.observationType = this.observationTypesUpdatetList[i].observationType;
                        this.offObsCharacteristics.detailCode = obj;
                        if(!this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList){
                            this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList = [];                               
                        }
                        this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList.push(this.offObsCharacteristics);
                    })
                }
            }
            if(this.observationTypesUpdatetList[i].activityFlag &&  (!this.observationTypesUpdatetList[i].activityList || this.observationTypesUpdatetList[i].activityList.length === 0)){
                this.show('oimoffob.pleaseselectatleasetoneactivitydata', 'warn');
                return;
            } else{
                if(this.observationTypesUpdatetList[i].activityList && this.observationTypesUpdatetList[i].activityList.length>0 && this.observationTypesUpdatetList[i].activityFlag){
                    this.observationTypesUpdatetList[i].activityList.forEach(obj=>{
                        this.offObsCharacteristics=new OffObsCharacteristics();
                        this.offObsCharacteristics.detailType = 'ACTIVITY';
                        this.offObsCharacteristics.observationType = this.observationTypesUpdatetList[i].observationType;
                        this.offObsCharacteristics.detailCode = obj;
                        if(!this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList){
                            this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList = [];                               
                        }
                        this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList.push(this.offObsCharacteristics);
                    })
                }
            }
            if(this.observationTypesUpdatetList[i].demeanorFlag &&  (!this.observationTypesUpdatetList[i].commonDetailsCatList || this.observationTypesUpdatetList[i].commonDetailsCatList.length === 0)){
                this.show('oimoffob.pleaseselectatleasetonedemeanordata', 'warn');
                return;
            } else{
                if(this.observationTypesUpdatetList[i].commonDetailsCatList && this.observationTypesUpdatetList[i].commonDetailsCatList.length>0  && this.observationTypesUpdatetList[i].demeanorFlag){
                    this.observationTypesUpdatetList[i].commonDetailsCatList.forEach(obj=>{
                        this.offObsCharacteristics=new OffObsCharacteristics();
                        this.offObsCharacteristics.detailType = 'COM_DET_CAT';
                        this.offObsCharacteristics.observationType = this.obserVationTypeDataModel.observationType;
                        this.offObsCharacteristics.detailCode = obj;
                        if(!this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList){
                            this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList = [];                               
                        }
                        this.observationTypesUpdatetList[i].offObsCharacteristicsUpdateList.push(this.offObsCharacteristics);
                    })
                }
            }
                this.observationTypesUpdatetList[i].activeFlag = this.observationTypesUpdatetList[i].activeFlag ? 'Y' : 'N';
                this.observationTypesUpdatetList[i].officerNotesFlag = this.obserVationTypeDataModel.officerNotesFlag ? 'Y' : 'N';
                this.observationTypesUpdatetList[i].notificationFlag = this.observationTypesUpdatetList[i].notificationFlag ? 'Y' : 'N';
                this.observationTypeCommitBean.updateList = this.observationTypesUpdatetList;

            }
        }
        if (this.observationTypesDeleteList.length > 0) {
            for (let i = 0; i < this.observationTypesDeleteList.length; i++) {
                this.observationTypeCommitBean.deleteList = this.observationTypesDeleteList;
            }
        }

        this.offObsCharacteristicsCommitBean.observationCheckDetailTypeBean = this.obserVationTypeDataModelTemp;

        this.offenderObservationTypesSaveCommitBean.offednerObservationCommitList =this.observationTypeCommitBean;

        const saveResult = this.oimoffobFactory.saveCommonDetails(this.offenderObservationTypesSaveCommitBean);
        saveResult.subscribe(data => {
            this.saveDisable = true;
            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 2) {
                this.show(this.translateService.translate('oimoffob.samedataexistsforobservationtype'), 'warn');
                this.observationTypesExecuteQuery();
                return;
            }

            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 3) {
                this.show(this.translateService.translate('oimoffob.cannotdeleterecordobservationperiodconfiguredforthistype'), 'warn');
                this.observationTypesExecuteQuery();
                return;
            }

            if (data && data[0] && data[0].returnedOutput && data[0].returnedOutput === 1) {
                this.show('common.addupdateremoverecordsuccess', 'success');
                this.observationTypesExecuteQuery();
                return;
            } else {
                this.show('common.addupdateremoverecordfailed', 'warn');
                this.observationTypesExecuteQuery();
                return;
            }
        });

    }

    get singleSaveDisable(){
        if(this.observationTypegrid.addedMap.size > 0 || this.observationTypegrid.removedMap.size > 0 || 
            this.observationTypegrid.updatedMap.size > 0 || !this.saveDisable){
                return false
        }
        return true;
    }

    onCellCndChange(event){
        this.saveDisable = false;
        if(this.obserVationTypeData && this.obserVationTypeData.length > 0){
            let index= this.obserVationTypeData.findIndex(e => e.obsTypeVersionId === this.obserVationTypeDataModel.obsTypeVersionId);
            this.observationTypegrid.setColumnData('isUpdated',index,true);
        }
    }

    onCheckBoxChange(event){
        this.saveDisable = false;
        if(this.obserVationTypeData && this.obserVationTypeData.length > 0){
            let index= this.obserVationTypeData.findIndex(e => e.obsTypeVersionId === this.obserVationTypeDataModel.obsTypeVersionId);
            this.observationTypegrid.setColumnData('isUpdated',index,true);
        }
    }

    onGridClear = () => {
        this.saveDisable = true;
        return true;
    }
    
    get enableAyExists(){
        if(this.agyLocId){
            return true;
        } else {
            return false;  
        }
    }

    onStatusBlur() {
        if (!this.agyLocId) {
            this.agyLocId = this.agyLocId === '' ? undefined : '';
            this.zoneData = [];
            this.offenderObservationZoneModel = new OffenderObservationZones();
        }
    }
}
