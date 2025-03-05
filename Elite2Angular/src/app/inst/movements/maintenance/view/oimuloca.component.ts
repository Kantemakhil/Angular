import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { InternalLocationUsages } from '@inst/movements/maintenance/beans/InternalLocationUsages';
import { IntLocUsageLocations } from '@inst/schedules/beans/IntLocUsageLocations';
import { IntLocUsageLocationsCommitBean } from '@inst/schedules/beans/IntLocUsageLocationsCommitBean';
import { InternalLocationUsagesCommitBean } from '@inst/movements/maintenance/beans/InternalLocationUsagesCommitBean';
import { OciscataService } from '@inst/institutional-activities/service/ociscata.service';
import { DialogService } from '@ui-components/dialog/dialog.service';
import { OimulocaService } from '@inst/movements/maintenance/service/oimuloca.service';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
@Component({
  selector: 'app-oimuloca',
  templateUrl: './oimuloca.component.html'
})

export class OimulocaComponent implements OnInit {
  intlocUsageModel: IntLocUsageLocations = new IntLocUsageLocations();
  intLocIdVal: any;
  @ViewChild('loc1grid') loc1grid: any;
  @ViewChild('loc2grid') loc2grid: any;
  @ViewChild('loc3grid') loc3grid: any;
  @ViewChild('loc4grid') loc4grid: any;
  @Output() addRecord: EventEmitter<any> = new EventEmitter<any>();
  usagesData: InternalLocationUsages[] = [];
  usagesModel: InternalLocationUsages = new InternalLocationUsages();
  usagesIndex = 0;
  usagesInsertList: InternalLocationUsages[] = [];
  usagesUpdateList: InternalLocationUsages[] = [];
  usagesDeleteList: InternalLocationUsages[] = [];
  intlocData: IntLocUsageLocations[] = [];
  intlocl1Data: IntLocUsageLocations[] = [];
  intloclModel: IntLocUsageLocations = new IntLocUsageLocations();
  intlocl1Index = 0;
  intlocl1Model: IntLocUsageLocations = new IntLocUsageLocations();
  intlocl1ModelBean: IntLocUsageLocations = new IntLocUsageLocations();
  intloclInsertList: IntLocUsageLocations[] = [];
  intloclUpdateList: IntLocUsageLocations[] = [];
  intloclDeleteList: IntLocUsageLocations[] = [];
  intlocl2Data: IntLocUsageLocations[] = [];
  intlocl2Model: IntLocUsageLocations = new IntLocUsageLocations();
  intlocl2Index = 0;
  intlocl3Data: IntLocUsageLocations[] = [];
  intlocl3Model: IntLocUsageLocations = new IntLocUsageLocations();
  intlocl3Index = 0;
  intlocl4Data: IntLocUsageLocations[] = [];
  intlocl4Model: IntLocUsageLocations = new IntLocUsageLocations();
  intlocl4Index = 0;
  intLocL4ColumnDef: any[];
  intLocL3ColumnDef: any[];
  intLocL2ColumnDef: any[];
  intLocL1ColumnDef: any[];
  usagesColumnDef: any[];
  usagesCommitModel: InternalLocationUsagesCommitBean = new InternalLocationUsagesCommitBean();
  intloclCommitModel: IntLocUsageLocationsCommitBean = new IntLocUsageLocationsCommitBean();
  usageRowIndex: number;
  agyLocId: string;
  selectedTabIndex: number;
  defaultAgyLocId: any;
  loc1Index: number;
  loc2Index: number;
  loc3Index: number;
  loc4Index: number;
  level2UsageId: number;
  gridFlag = false;
  msgs: any[] = [];
  constructor(private oimulocaFactory: OimulocaService, public translateService: TranslateService,
    public sessionManager: UserSessionManager, public ociscataFactory: OciscataService, private dialogService: DialogService) {
    this.intLocL4ColumnDef = [];
    this.intLocL3ColumnDef = [];
    this.intLocL2ColumnDef = [];
    this.intLocL1ColumnDef = [];
    this.usagesColumnDef = [];
  }
  ngOnInit() {
    this.gridFlag = false;
    this.selectedTabIndex = 0;
    this.usageRowIndex = -1;
    this.loc1Index = -1;
    this.loc2Index = -1;
    this.loc3Index = -1;
    this.loc4Index = -1;
    this.intLocL4ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationdescription') , required : true, field: 'internalLocationId', cellEditable: this.canLocEdit ,
        editable: false, width: 80, datatype: 'lov', link: 'oimuloca/intLocTwoLov?agyIntLocId=', parentField: 'agyIntLocId',
        titles: {
          internalLocationCode: this.translateService.translate('common.locationcode')
          , description: this.translateService.translate('common.description')
        }
        },
      // {
      //   fieldName: '', field: 'agylocButton', editable: false, width: 50, datatype: 'launchbutton', link: '/OCUINTLC',
      //   data: 'row', updateField: 'row', modal: true, dialogWidth: 50, height: 90, isDisable: this.disableLocBtn,
      //   onLaunchClick: this.ocuintlcClick
      // },
      // {
      //   fieldName: this.translateService.translate('common.locationdescription'), field: 'locDescription',
      //   editable: false, width: 100
      // },
      {
        fieldName: this.translateService.translate('common.location'), field: 'userDescription', editable: false, width: 100
      },
      {
        fieldName: this.translateService.translate('oimuloca.usagetype') , required : true, field: 'usageLocationType', editable: true,
        width: 100, link: 'oimuloca/rgLevelTypeRecordGroup', datatype: 'lov', maxlength: 12, titles: {
          code: this.translateService.translate('common.type')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('common.capacity') , required : true, field: 'capacity', editable: true, width: 80,
        datatype: 'number', maxValue: '99999', whole: true, strictFP: true
      },
      {
        fieldName: this.translateService.translate('common.sequencename') , required : true, field: 'listSeq', editable: true, width: 80,
        datatype: 'number', maxValue: '999999', whole: true, strictFP: true
      },
      {
        fieldName: '', field: 'nonasButton', editable: false, width: 200, link: '/OIUNONAS', datatype: 'launchbutton',
        data: 'row', updateField: 'row', modal: true, dialogWidth: 30, height: 70,
        onLaunchClick: this.oiunonasLaunchClick
      },
      { fieldName: '', field: 'internalLocationId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyIntLocId', editable: false, width: 10, hide: true },
      
    ];
    this.intLocL3ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationdescription') , required : true, field: 'internalLocationId', cellEditable: this.canLocEdit ,
        editable: false, width: 80, datatype: 'lov', link: 'oimuloca/intLocTwoLov?agyIntLocId=', parentField: 'agyIntLocId',
        titles: {
          internalLocationCode: this.translateService.translate('common.locationcode')
          , description: this.translateService.translate('common.description')
        }
        },
      // {
      //   fieldName: '', field: 'agylocButton', editable: false, width: 50, datatype: 'launchbutton', link: '/OCUINTLC',
      //   data: 'row', updateField: 'row', modal: true, dialogWidth: 50, height: 90, isDisable: this.disableLocBtn,
      //   onLaunchClick: this.ocuintlcClick
      // },
      // {
      //   fieldName: this.translateService.translate('common.locationdescription'), field: 'locDescription',
      //   editable: false, width: 100
      // },
      {
        fieldName: this.translateService.translate('common.location'), field: 'userDescription', editable: false, width: 100,
      },
      {
        fieldName: this.translateService.translate('oimuloca.usagetype') , required : true, field: 'usageLocationType', editable: true,
        width: 100, domain:'ILOC_TYPE', datatype: 'lov', maxlength: 12,//link: 'oimuloca/rgLevelTypeRecordGroup' 
      },
      {
        fieldName: this.translateService.translate('common.capacity') , required : true, field: 'capacity', editable: true, width: 80,
        datatype: 'number', maxValue: '99999', whole: true, strictFP: true
      },
      {
        fieldName: this.translateService.translate('common.sequencename') , required : true, field: 'listSeq', editable: true, width: 80,
        datatype: 'number', maxValue: '999999', whole: true, strictFP: true
      },
      {
        fieldName: '', field: 'nonasButton', editable: false, width: 200, link: '/OIUNONAS', datatype: 'launchbutton',
        data: 'row', updateField: 'row', modal: true, dialogWidth: 30, height: 70,
        onLaunchClick: this.oiunonasLaunchClick
      },
      { fieldName: '', field: 'internalLocationId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyIntLocId', editable: false, width: 10, hide: true },
    ];
    this.intLocL2ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationdescription') ,required : true, field: 'internalLocationId', cellEditable: this.canLocEdit ,
        editable: false, width: 80, datatype: 'lov', link: 'oimuloca/intLocTwoLov?agyIntLocId=', parentField: 'agyIntLocId',
        titles: {
          internalLocationCode: this.translateService.translate('common.locationcode')
          , description: this.translateService.translate('common.description')
        }
        },
      // {
      //   fieldName: '', field: 'agylocButton', editable: false, width: 50, datatype: 'launchbutton', link: '/OCUINTLC',
      //   data: 'row', updateField: 'row', modal: true, dialogWidth: 50, height: 90, isDisable: this.disableLocBtn,
      //   onLaunchClick: this.ocuintlcClick
      // },
      // {
      //   fieldName: this.translateService.translate('common.locationdescription'), field: 'locDescription',
      //   editable: false, width: 100
      // },
      {
        fieldName: this.translateService.translate('common.location'), field: 'userDescription', editable: false, width: 100,
      },
      {
        fieldName: this.translateService.translate('oimuloca.usagetype') , required : true, field: 'usageLocationType', editable: true,
        width: 100, domain:'ILOC_TYPE', datatype: 'lov', maxlength: 12, 
      },
      {
        fieldName: this.translateService.translate('common.capacity'), required : true, field: 'capacity', editable: true, width: 80,
        datatype: 'number', maxValue: '99999', whole: true, strictFP: true
      },
      {
        fieldName: this.translateService.translate('common.sequencename') , required : true, field: 'listSeq', editable: true, width: 80,
        datatype: 'number', maxValue: '999999', whole: true, strictFP: true
      },
      {
        fieldName: '', field: 'nonasButton', editable: false, width: 200, link: '/OIUNONAS', datatype: 'launchbutton',
        data: 'row', updateField: 'row', modal: true, dialogWidth: 30, height: 70,
        onLaunchClick: this.oiunonasLaunchClick
      },
      { fieldName: '', field: 'internalLocationId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyIntLocId', editable: false, width: 10, hide: true },
      

    ];
    this.intLocL1ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationdescription') , required: true, field: 'internalLocationId', cellEditable: this.canLocEdit ,
        editable: false, width: 80, datatype: 'lov', link: 'oimuloca/intLocOneLov?agyLocId=', parentField: 'agyLocId',
        titles: {
          internalLocationCode: this.translateService.translate('common.locationcode')
          , description: this.translateService.translate('common.description')
        }
        },
      // {
      //   fieldName: '', field: 'agylocButton', editable: false, width: 40, datatype: 'launchbutton', link: '/OCUINTLC',
      //   data: 'row', updateField: 'row', modal: true, dialogWidth: 50, height: 90, isDisable: this.disableLocBtn,
      //   onLaunchClick: this.ocuintlcClick
      // },
      // {
      //   fieldName: this.translateService.translate('common.locationdescription'), field: 'locDescription',
      //   editable: false, width: 100
      // },
      {
        fieldName: this.translateService.translate('common.location'), field: 'userDescription', editable: false, width: 100
      },
      {
        fieldName: this.translateService.translate('oimuloca.usagetype') , required: true, field: 'usageLocationType', editable: true,
        width: 100, domain:'ILOC_TYPE', datatype: 'lov', maxlength: 12
      },
      {
        fieldName: this.translateService.translate('common.capacity'), field: 'capacity', editable: true, width: 70,
        datatype: 'number', maxValue: '99999', whole: true, strictFP: true, required: true,
      },
      {
        fieldName: this.translateService.translate('common.sequencename'), field: 'listSeq', editable: true, width: 70,
        datatype: 'number', maxValue: '999999', whole: true, strictFP: true, required: true,
      },
      {
        fieldName: '', field: 'nonasButton', editable: false, width: 230, link: '/OIUNONAS', datatype: 'launchbutton',
        data: 'row', updateField: 'row', modal: true, dialogWidth: 30, height: 70, onLaunchClick: this.oiunonasLaunchClick
      },
      { fieldName: '', field: 'internalLocationId', editable: false, width: 10, hide: true },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true },
    ];
    this.usagesColumnDef = [
      {
        fieldName: this.translateService.translate('common.usage') , required : true, domain:'ILOC_USG'/* link: 'oimuloca/rgLocationUsageRecordGroup'*/,
        field: 'internalLocationUsage', editable: true, width: 150, datatype: 'lov', cellEditable: this.canUsageEdit
      },
      {
        fieldName: this.translateService.translate('oimuloca.permitmovement'), field: 'chkPermMov',
        editable: true, width: 150, datatype: 'checkbox'
      },
    ];
    const serviceObjAgy = this.ociscataFactory.getDefaultAgency(this.sessionManager.currentCaseLoad);
    serviceObjAgy.subscribe(data => {
      if (data != null && data !== 'NONE') {
        this.defaultAgyLocId = data;
      }
    });
  }

  ocuintlcClick = (event) => {
    this.gridFlag = false;
    if (event.usageLocationId || event.locCode) {
      return;
    }
    this.dialogService.openLinkDialog('/OCUINTLC', event, 50).subscribe(result => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          this.gridFlag = false;
          if (i === 0) {
            if (this.selectedTabIndex === 0) {
              this.loc1grid.setColumnData('locCode', this.intlocl1Data.indexOf(event), result[i].internalLocationCode);
              this.loc1grid.setColumnData('locDescription', this.intlocl1Data.indexOf(event), result[i].description);
              this.loc1grid.setColumnData('internalLocationId', this.intlocl1Data.indexOf(event), result[i].internalLocationId);
              this.loc1grid.setColumnData('userDescription', this.intlocl1Data.indexOf(event), result[i].userDesc);
              this.loc1grid.setColumnData('usageLocationType', this.intlocl1Data.indexOf(event), result[i].internalLocationType);
            } else if (this.selectedTabIndex === 1) {
              this.loc2grid.setColumnData('locCode', this.intlocl2Data.indexOf(event), result[i].internalLocationCode);
              this.loc2grid.setColumnData('locDescription', this.intlocl2Data.indexOf(event), result[i].description);
              this.loc2grid.setColumnData('internalLocationId', this.intlocl2Data.indexOf(event), result[i].internalLocationId);
              this.loc2grid.setColumnData('userDescription', this.intlocl2Data.indexOf(event), result[i].userDesc);
              this.loc2grid.setColumnData('usageLocationType', this.intlocl2Data.indexOf(event), result[i].internalLocationType);
            } else if (this.selectedTabIndex === 2) {
              this.loc3grid.setColumnData('locCode', this.intlocl3Data.indexOf(event), result[i].internalLocationCode);
              this.loc3grid.setColumnData('locDescription', this.intlocl3Data.indexOf(event), result[i].description);
              this.loc3grid.setColumnData('internalLocationId', this.intlocl3Data.indexOf(event), result[i].internalLocationId);
              this.loc3grid.setColumnData('userDescription', this.intlocl3Data.indexOf(event), result[i].userDesc);
              this.loc3grid.setColumnData('usageLocationType', this.intlocl3Data.indexOf(event), result[i].internalLocationType);
            } else if (this.selectedTabIndex === 3) {
              this.loc4grid.setColumnData('locCode', this.intlocl4Data.indexOf(event), result[i].internalLocationCode);
              this.loc4grid.setColumnData('locDescription', this.intlocl4Data.indexOf(event), result[i].description);
              this.loc4grid.setColumnData('internalLocationId', this.intlocl4Data.indexOf(event), result[i].internalLocationId);
              this.loc4grid.setColumnData('userDescription', this.intlocl4Data.indexOf(event), result[i].userDesc);
              this.loc4grid.setColumnData('usageLocationType', this.intlocl4Data.indexOf(event), result[i].internalLocationType);
            }
          } else {
            this.gridFlag = true;
            if (this.selectedTabIndex === 0) {
              this.loc1grid.addRecord();
              this.loc1grid.setColumnData('locCode', this.intlocl1Data.length - 1, result[i].internalLocationCode);
              this.loc1grid.setColumnData('locDescription', this.intlocl1Data.length - 1, result[i].description);
              this.loc1grid.setColumnData('internalLocationId', this.intlocl1Data.length - 1, result[i].internalLocationId);
              this.loc1grid.setColumnData('userDescription', this.intlocl1Data.length - 1, result[i].userDesc);
              this.loc1grid.setColumnData('usageLocationType', this.intlocl1Data.length - 1, result[i].internalLocationType);
              this.loc1grid.setColumnData('agylocId', this.intlocl1Data.length - 1, this.agyLocId);
            } else if (this.selectedTabIndex === 1) {
              this.loc2grid.addRecord();
              this.loc2grid.setColumnData('locCode', this.intlocl2Data.length - 1, result[i].internalLocationCode);
              this.loc2grid.setColumnData('locDescription', this.intlocl2Data.length - 1, result[i].description);
              this.loc2grid.setColumnData('internalLocationId', this.intlocl2Data.length - 1, result[i].internalLocationId);
              this.loc2grid.setColumnData('userDescription', this.intlocl2Data.length - 1, result[i].userDesc);
              this.loc2grid.setColumnData('usageLocationTypes', this.intlocl2Data.length - 1, result[i].internalLocationType);
              this.loc2grid.setColumnData('agylocId', this.intlocl2Data.length - 1, this.agyLocId);
            } else if (this.selectedTabIndex === 2) {
              this.loc3grid.addRecord();
              this.loc3grid.setColumnData('locCode', this.intlocl3Data.length - 1, result[i].internalLocationCode);
              this.loc3grid.setColumnData('locDescription', this.intlocl3Data.length - 1, result[i].description);
              this.loc3grid.setColumnData('internalLocationId', this.intlocl3Data.length - 1, result[i].internalLocationId);
              this.loc3grid.setColumnData('userDescription', this.intlocl3Data.length - 1, result[i].userDesc);
              this.loc3grid.setColumnData('usageLocationTypes', this.intlocl3Data.length - 1, result[i].c);
              this.loc3grid.setColumnData('agylocId', this.intlocl3Data.length - 1, this.agyLocId);
            } else if (this.selectedTabIndex === 3) {
              this.loc4grid.addRecord();
              this.loc4grid.setColumnData('locCode', this.intlocl4Data.length - 1, result[i].internalLocationCode);
              this.loc4grid.setColumnData('locDescription', this.intlocl4Data.length - 1, result[i].description);
              this.loc4grid.setColumnData('internalLocationId', this.intlocl4Data.length - 1, result[i].internalLocationId);
              this.loc4grid.setColumnData('userDescription', this.intlocl4Data.length - 1, result[i].userDesc);
              this.loc4grid.setColumnData('usageLocationTypes', this.intlocl4Data.length - 1, result[i].usageLocationTypes);
              this.loc4grid.setColumnData('agylocId', this.intlocl4Data.length - 1, this.agyLocId);
            }
          }

        }
        this.gridFlag = false;
      } else {
        this.gridFlag = false;
      }
    });
  }


  onButClear() {
    this.agyLocId = undefined;
    this.usagesData = [];
    this.usagesModel = new InternalLocationUsages();
    this.intlocl1Data = [];
    this.intlocl1Model = new IntLocUsageLocations();
    this.intlocl2Data = [];
    this.intlocl2Model = new IntLocUsageLocations();
    this.intlocl3Data = [];
    this.intlocl3Model = new IntLocUsageLocations();
    this.intlocl4Data = [];
    this.intlocl4Model = new IntLocUsageLocations();
  }
  disableLocBtn = (data, index) => {
    if (data.usageLocationId) {
      return true;
    }
    return false;
  }
  disableNonasBtn = (data, index) => {
    if (data.usageLocationId) {
      return false;
    }
    return false;
  }
  /**
   *  This function is used to enable/disable Assessment button
   */
  get clrBtnFlag() {
    if (this.agyLocId === undefined || this.agyLocId === '') {
      return true;
    } else {
      return false;
    }
  }
  get readeOnlyFields() {
    if (this.agyLocId === undefined || this.agyLocId === '') {
      return false;
    } else {
      return true;
    }
  }
  /**
   *  This function is used when we click on Non Association button button
   */
  oiunonasLaunchClick = (event) => {
    if(this.loc1grid.addedMap.size > 0 || this.loc1grid.updatedMap.size > 0 || this.loc1grid.removedMap.size > 0 ||
      this.loc2grid.addedMap.size > 0 || this.loc2grid.updatedMap.size > 0 || this.loc2grid.removedMap.size > 0 ||
      this.loc3grid.addedMap.size > 0 || this.loc3grid.updatedMap.size > 0 || this.loc3grid.removedMap.size > 0 ||
      this.loc4grid.addedMap.size > 0 || this.loc4grid.updatedMap.size > 0 || this.loc4grid.removedMap.size > 0 ){
      this.show(this.translateService.translate('oimuloca.commitrecordfirst'));
      return;
    }
    if (!event.usageLocationId) {
      this.show(this.translateService.translate('oimuloca.oiunonaswarning'));
      return;
    }
    if (this.loc1grid.updatedMap.size > 0 || this.loc2grid.updatedMap.size > 0 || this.loc3grid.updatedMap.size > 0 ||
       this.loc4grid.updatedMap.size > 0) {
      return;
    }
    event.modulename = 'OIMULOCA';
    this.dialogService.openLinkDialog('/OIUNONAS', event, 50).subscribe(resData => {
      if (resData) {
      }
    });
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
  onRowClickintlocl1(event) {
    if (event) {
      //this.loc1Index = this.intlocl1Data.indexOf(event);
      this.intlocl1Model = event;
      if (event.usageLocationId) {
        this.oimulocaIntLoc1ExecuteQuery(this.intlocl1Model);
      }
    }
  }
  onRowClickintlocl2(event) {
    if (event) {
     // this.loc2Index = this.intlocl2Data.indexOf(event);
      this.intlocl2Model = event;
      this.level2UsageId = undefined;
      this.level2UsageId = event.usageLocationId;
      /* if (event.usageLocationId) {
        this.oimulocaIntLoc2ExecuteQuery(this.intlocl2Model);
      } */
    }
  }
  onRowClickintlocl3(event) {
    if (event) {
      //this.loc3Index = this.intlocl3Data.indexOf(event);
      this.intlocl3Model = event;
      /* if (event.usageLocationId) {
        this.oimulocaIntLoc3ExecuteQuery(this.intlocl3Model);
      } */
    }
  }
  onRowClickintlocl4(event) {
    if (event) {
     // this.loc4Index = this.intlocl4Data.indexOf(event);
      this.intlocl4Model = event;
    }
  }
  onAgyLocChange() {
    if (!this.agyLocId) {
      this.agyLocId = this.agyLocId === '' ? undefined : '';
    }
  }

  agyLocChangeEvent(event) {
    if (event) {
      this.agyLocId = event.code;
      this.usagesData = [];
      this.usagesModel = new InternalLocationUsages();
      this.intlocl1Data = [];
      this.intlocl2Data = [];
      this.intlocl3Data = [];
      this.intlocl4Data = [];
      this.intlocl1Model = new IntLocUsageLocations();
      this.intlocl2Model = new IntLocUsageLocations();
      this.intlocl3Model = new IntLocUsageLocations();
      this.intlocl4Model = new IntLocUsageLocations();
      this.usagesModel.agyLocId = event.code;
      this.oimulocaUsageexecuteQuery();
    } else {
      this.usagesData = [];
      this.usagesModel = new InternalLocationUsages();
      this.intlocl1Data = [];
      this.intlocl2Data = [];
      this.intlocl3Data = [];
      this.intlocl4Data = [];
      this.intlocl1Model = new IntLocUsageLocations();
      this.intlocl2Model = new IntLocUsageLocations();
      this.intlocl3Model = new IntLocUsageLocations();
      this.intlocl4Model = new IntLocUsageLocations();
    }
  }

  /*
    *  This event is used to do the validations in the Grid in Schedules Block.
    */
  canUsageEdit = (data: any, index: number, field: string): boolean => {
    if (data.internalLocationUsageId && field === 'internalLocationUsage') {
      return false;
    }
    return true;
  }
  /*
    *  This event is used to do the validations in the Grid in Schedules Block.
    */
    canLocEdit = (data: any, index: number, field: string): boolean => {
      if (data.usageLocationId && field === 'internalLocationId') {
        return false;
      }
      return true;
    }
  // execute query
  oimulocaUsageexecuteQuery() {
    const serviceObj = this.oimulocaFactory.
      usagesExecuteQuery(this.usagesModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.usageRowIndex = -1;
        this.usagesData = [];
        this.usagesModel = new InternalLocationUsages();
      } else {
        data.forEach(element => {
          element.chkPermMov = element.chkPermMov === 'Y' ? true : false;
        });
        this.usagesData = data;
        this.usagesModel = this.usagesData[0];
        this.usageRowIndex = 0;
        this.selectedTabIndex = 0;
      }
    });
  }
  onRowClickusages(event) {
    this.intlocl1Data = [];
    this.intlocl2Data = [];
    this.intlocl3Data = [];
    this.intlocl4Data = [];
    this.intlocl1Model = new IntLocUsageLocations();
    this.intlocl2Model = new IntLocUsageLocations();
    this.intlocl3Model = new IntLocUsageLocations();
    this.intlocl4Model = new IntLocUsageLocations();
    if (event) {
      this.usagesModel = event;
      if (this.usagesModel.internalLocationUsageId) {
        this.intloclModel = new IntLocUsageLocations();
        this.intloclModel.internalLocationUsageId = this.usagesModel.internalLocationUsageId;
        this.oimulocaIntLocExecuteQuery();
      }
    }
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimulocaSaveusagesForm(event) {
    this.usagesInsertList = [];
    this.usagesUpdateList = [];
    this.usagesDeleteList = [];
    this.usagesInsertList = event.added;
    this.usagesUpdateList = event.updated;
    this.usagesDeleteList = event.removed;
    this.usagesCommitModel.insertList = [];
    this.usagesCommitModel.updateList = [];
    this.usagesCommitModel.deleteList = [];
    if (this.usagesInsertList.length > 0 || this.usagesUpdateList.length > 0) {
      for (let i = 0; i < this.usagesInsertList.length; i++) {
        this.usagesInsertList[i].agyLocId = this.agyLocId;
        if (!this.usagesInsertList[i].internalLocationUsage) {
          this.show('oimuloca.usagemustbeentered');
          return;
        }
        if (this.usagesInsertList[i].chkPermMov) {
          this.usagesInsertList[i].chkPermMov = 'Y';
        } else {
          this.usagesInsertList[i].chkPermMov = 'N';
        }
      }
      for (let i = 0; i < this.usagesUpdateList.length; i++) {
        if (this.usagesUpdateList[i].chkPermMov) {
          this.usagesUpdateList[i].chkPermMov = 'Y';
        } else {
          this.usagesUpdateList[i].chkPermMov = 'N';
        }
      }
      this.usagesCommitModel.insertList = this.usagesInsertList;
      this.usagesCommitModel.updateList = this.usagesUpdateList;
    }
    if (this.usagesDeleteList.length > 0) {
      for (let i = 0; i < this.usagesDeleteList.length; i++) {
      }
      this.usagesCommitModel.deleteList = this.usagesDeleteList;
    }
    const usagesSaveData = this.oimulocaFactory.usagesCommit(this.usagesCommitModel);
    usagesSaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.usagesModel = new InternalLocationUsages();
        this.usagesModel.agyLocId = this.agyLocId;
        this.oimulocaUsageexecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oimuloca.validationtwo'));
      } else if (data === 3) {
        this.show(this.translateService.translate('oimuloca.validationthree'));
      } else if (data === 4) {
        this.show(this.translateService.translate('oimuloca.validationfour'));
      } else if (data === 5) {
        this.show(this.translateService.translate('oimuloca.validationfive'));
      } else if (data === 6) {
        this.show(this.translateService.translate('oimuloca.recordcannotbedeletedasthechildrecordexists'));
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  onGridInsert = () => {
    if (!this.agyLocId) {
      this.show(this.translateService.translate('common.facilityentered'));
      return;
    }
    if (this.usagesData.length > 0) {
      for (let i = 0; i < this.usagesData.length; i++) {
        if (!this.usagesData[i].internalLocationUsageId && !this.usagesData[i].internalLocationUsage) {
          this.show('oimuloca.usagemustbeentered');
          return;
        }
      }
    }
    return { internalLocationUsage: '' };
  }
  whenTabChangedTrigger(event) {
    this.selectedTabIndex = event.index;
    if (this.selectedTabIndex === 1 && this.intlocl1Model.usageLocationId) {
      this.level2UsageId = undefined;
      this.oimulocaIntLoc1ExecuteQuery(this.intlocl1Model);
    }
    if (this.selectedTabIndex === 2 && this.intlocl2Model.usageLocationId) {
      this.oimulocaIntLoc2ExecuteQuery(this.intlocl2Model);
    }
    if (this.selectedTabIndex === 3 && this.intlocl3Model.usageLocationId) {
      this.oimulocaIntLoc3ExecuteQuery(this.intlocl3Model);
    }
  }

  /**
    * This function loads the data into the Master Record and its child records
    */
  oimulocaIntLocExecuteQuery() {
    const serviceObj = this.oimulocaFactory.
      intLocL1ExecuteQuery(this.intloclModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.intlocl1Data = [];
        this.intlocl1Model = new IntLocUsageLocations();
      } else {
        data.forEach(element => {
          element.nonasButton = this.translateService.translate('common.nonassociations');
          element.agylocButton = '..';
          element.agyLocId = this.agyLocId;
          element.internalLocationId = String(element.internalLocationId);
        });
        this.intlocl1Data = data;
        this.intlocl1Model = this.intlocl1Data[0];
        this.loc1Index = 0;
      }
    });
  }
  /**
     * This function loads the data into the Master Record and its child records
     */
  oimulocaIntLoc1ExecuteQuery(event) {
    this.intlocl2Data = [];
    this.intlocl2Model = new IntLocUsageLocations();
    this.intlocl2Model.parentUsageLocationId = event.usageLocationId;
    this.intlocl2Model.usageLocationId = event.usageLocationId;
    const serviceObj = this.oimulocaFactory.
      intLocL1ExecuteQuery(this.intlocl2Model);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.intlocl2Data = [];
        this.intlocl2Model = new IntLocUsageLocations();
      } else {
        data.forEach(element => {
          element.nonasButton = this.translateService.translate('common.nonassociations');
          element.agylocButton = '..';
          element.agyLocId = this.agyLocId;
          element.internalLocationId = String(element.internalLocationId);
          element.agyIntLocId= event.internalLocationId + '-' + this.agyLocId;
        });
        this.intlocl2Model = new IntLocUsageLocations();
        this.intlocl2Data = data;
        this.intlocl2Model = this.intlocl2Data[0];
        this.loc2Index = 0;
      }
    });
  }
  /**
   * This function loads the data into the Master Record and its child records
   */
  oimulocaIntLoc2ExecuteQuery(event) {
    this.intlocl3Data = [];
    this.intlocl3Model = new IntLocUsageLocations();
    this.intlocl3Model.parentUsageLocationId = event.usageLocationId;
    const serviceObj = this.oimulocaFactory.
      intLocL1ExecuteQuery(this.intlocl3Model);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.intlocl3Data = [];
        this.intlocl3Model = new IntLocUsageLocations();
      } else {
        data.forEach(element => {
          element.nonasButton = this.translateService.translate('common.nonassociations');
          element.agylocButton = '..';
          element.agylocId = this.agyLocId;
          element.internalLocationId = String(element.internalLocationId);
          element.agyIntLocId= event.internalLocationId + '-' + this.agyLocId;
        });
        this.intlocl3Model = new IntLocUsageLocations();
        this.intlocl3Data = data;
        this.intlocl3Model = this.intlocl3Data[0];
        this.loc3Index = 0;
      }
    });
  }

  /**
   * This function loads the data into the Master Record and its child records
   */
  oimulocaIntLoc3ExecuteQuery(event) {
    this.intlocl4Data = [];
    this.intlocl4Model = new IntLocUsageLocations();
    this.intlocl4Model.parentUsageLocationId = event.usageLocationId;
    const serviceObj = this.oimulocaFactory.
      intLocL1ExecuteQuery(this.intlocl4Model);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.intlocl4Data = [];
        this.intlocl4Model = new IntLocUsageLocations();
      } else {
        data.forEach(element => {
          element.nonasButton = this.translateService.translate('common.nonassociations');
          element.agylocButton = '..';
          element.agylocId = this.agyLocId;
          element.internalLocationId = String(element.internalLocationId);
          element.agyIntLocId= event.internalLocationId + '-' + this.agyLocId;
        });
        this.intlocl4Model = new IntLocUsageLocations();
        this.intlocl4Data = data;
        this.intlocl4Model = this.intlocl4Data[0];
        this.loc4Index = 0;
      }
    });
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimulocaSaveintloclForm(event) {
    this.intloclInsertList = [];
    this.intloclUpdateList = [];
    this.intloclDeleteList = [];
    this.intloclInsertList = event.added;
    this.intloclUpdateList = event.updated;
    this.intloclDeleteList = event.removed;
    this.intloclCommitModel.insertList = [];
    this.intloclCommitModel.updateList = [];
    this.intloclCommitModel.deleteList = [];
    if (this.intloclInsertList.length > 0 || this.intloclUpdateList.length > 0) {
      for (let i = 0; i < this.intloclInsertList.length; i++) {
        this.intloclInsertList[i].tabIndex = this.selectedTabIndex;
        if (this.intLocValidations(this.intloclInsertList[i])) {
          return;
        }
        this.intloclInsertList[i].internalLocationId = Number(this.intloclInsertList[i].internalLocationId);
        this.intloclInsertList[i].internalLocationUsageId = this.usagesModel.internalLocationUsageId;
        if (this.intloclInsertList[i].tabIndex === 0) {
          this.intloclInsertList[i].parentUsageLocationId = undefined;
        } else if (this.intloclInsertList[i].tabIndex === 1) {
          this.intloclInsertList[i].parentUsageLocationId = this.intlocl1Model.usageLocationId;
        } else if (this.intloclInsertList[i].tabIndex === 2) {
          this.intloclInsertList[i].parentUsageLocationId = this.intlocl2Model.usageLocationId;
        } else if (this.intloclInsertList[i].tabIndex === 3) {
          this.intloclInsertList[i].parentUsageLocationId = this.intlocl3Model.usageLocationId;
        }
      }
      for (let i = 0; i < this.intloclUpdateList.length; i++) {
        if (this.intLocValidations(this.intloclUpdateList[i])) {
          return;
        }
        this.intloclUpdateList[i].internalLocationId = Number(this.intloclUpdateList[i].internalLocationId);
      }
      this.intloclCommitModel.insertList = this.intloclInsertList;
      this.intloclCommitModel.updateList = this.intloclUpdateList;
    }
    if (this.intloclDeleteList.length > 0) {
      this.intloclCommitModel.deleteList = this.intloclDeleteList;
    }
    const intlocl1SaveData = this.oimulocaFactory.intLocL1Commit(this.intloclCommitModel);
    intlocl1SaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
      } else if (data === 2) {
        this.show(this.translateService.translate('oimuloca.validationtwo'));
      } else if (data === 3) {
        this.show(this.translateService.translate('oimuloca.validationthree'));
      } else if (data === 4) {
        this.show(this.translateService.translate('oimuloca.validationfour'));
      } else if (data === 5) {
        this.show(this.translateService.translate('oimuloca.validationfive'));
      } else if (data === 6) {
        this.show(this.translateService.translate('oimuloca.recordcannotbedeletedasthechildrecordexists'));
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
      if (this.selectedTabIndex === 0 && this.usagesModel.internalLocationUsageId) {
        this.intloclModel = new IntLocUsageLocations();
        this.intloclModel.internalLocationUsageId = this.usagesModel.internalLocationUsageId;
        this.oimulocaIntLocExecuteQuery();
      } else if (this.selectedTabIndex === 1 && this.intlocl1Model.usageLocationId) {
        this.oimulocaIntLoc1ExecuteQuery(this.intlocl1Model);
      } else if (this.selectedTabIndex === 2 && this.intlocl2Model.usageLocationId) {
        this.oimulocaIntLoc2ExecuteQuery(this.intlocl2Model);
      } else if (this.selectedTabIndex === 3 && this.intlocl3Model.usageLocationId) {
        this.oimulocaIntLoc3ExecuteQuery(this.intlocl3Model);
      }
    });
  }
  onGridLocInsert = () => {
    if (!this.agyLocId) {
      this.show(this.translateService.translate('common.facilityentered'));
      return;
    }
    if (!this.usagesModel.internalLocationUsageId) {
      this.show(this.translateService.translate('common.youcannotcreatethisrecord'), 'warn');
      return;
    }
    this.intlocData = [];
    this.intLocIdVal = undefined;
    if (this.selectedTabIndex === 0) {
      this.loc1grid.addedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
      this.loc1grid.updatedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
    } else if (this.selectedTabIndex === 1) {
      if (!this.intlocl1Model.usageLocationId) {
        this.show(this.translateService.translate('oimuloca.pleaseselectthelocationinthelevelone'));
        return;
      }
      if (this.intlocl1Model.internalLocationId) {
        this.intLocIdVal = this.intlocl1Model.internalLocationId;
      }
      this.loc2grid.addedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
      this.loc2grid.updatedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
    } else if (this.selectedTabIndex === 2) {
      if (!this.intlocl2Model.usageLocationId) {
        this.show(this.translateService.translate('oimuloca.pleaseselectthelocationintheleveltwo'));
        return;
      }
      if (this.intlocl2Model.internalLocationId) {
        this.intLocIdVal = this.intlocl2Model.internalLocationId;
      }
      this.loc3grid.addedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
      this.loc3grid.updatedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
    } else if (this.selectedTabIndex === 3) {
      if (!this.intlocl3Model.usageLocationId) {
        this.show(this.translateService.translate('oimuloca.youmustselectthelocationinthelevel3'));
        return;
      }
      if (this.intlocl3Model.internalLocationId) {
        this.intLocIdVal = this.intlocl3Model.internalLocationId;
      }
      this.loc4grid.addedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
      this.loc4grid.updatedMap.forEach(
        (v: any, k: number) => {
          this.intlocData.push(v);
        }
      );
    }
    if (this.intlocData.length > 0 && !this.gridFlag) {
      for (let i = 0; i < this.intlocData.length; i++) {
        if (!this.intlocData[i].createDateTime && !this.intlocData[i].internalLocationId) {
          this.show(this.translateService.translate('Location Description must be entered'), 'warn');
          return;
        }
        if (!this.intlocData[i].createDateTime && !this.intlocData[i].usageLocationType) {
          this.show(this.translateService.translate('oimuloca.usagetypemustbe'), 'warn');
          return;
        }
        if (!this.intlocData[i].createDateTime && !this.intlocData[i].capacity && this.intlocData[i].capacity !== 0) {
          this.show(this.translateService.translate('oimuloca.capacitymustbe'), 'warn');
          return;
        }
        if (!this.intlocData[i].createDateTime && !this.intlocData[i].listSeq && this.intlocData[i].listSeq !== 0) {
          this.show(this.translateService.translate('common.sequencemustbeentered'), 'warn');
          return;
        }
      }
    }
    if (this.selectedTabIndex === 0) {
      return {
        internalLocationUsage: '', agylocButton: '..', agyLocId: this.agyLocId,
        internalLocationUsageId: this.usagesModel.internalLocationUsageId,
        locCode: '', locDescription: '', userDescription: '', internalLocationId: undefined,
        tabIndex: this.selectedTabIndex, nonasButton: this.translateService.translate('common.nonassociations')
      };
    }
    return {
      internalLocationUsage: '', agylocButton: '..', agyLocId: this.agyLocId,
      internalLocationUsageId: this.usagesModel.internalLocationUsageId,
      locCode: '', locDescription: '', userDescription: '',
      tabIndex: this.selectedTabIndex, nonasButton: this.translateService.translate('common.nonassociations'),
      agyIntLocId: this.intLocIdVal +'-' + this.agyLocId
    };
  }
    /**
   *  This function is used to enable/disable grid Delete button
   */
  get locDelBtn() {
    if (this.selectedTabIndex === 0 && !this.intlocl1Model.usageLocationId) {
      return false;
    } else if (this.selectedTabIndex === 1 && !this.intlocl2Model.usageLocationId) {
      return false;
    } else if (this.selectedTabIndex === 2 && !this.intlocl3Model.usageLocationId) {
      return false;
    } else if (this.selectedTabIndex === 3 && !this.intlocl4Model.usageLocationId) {
      return false;
    } else {
      return true;
    }
  }
  intLocValidations(event) {
    if (!event.internalLocationId) {
      this.show(this.translateService.translate('Location Description must be entered'), 'warn');
      return true;
    }
    if (!event.usageLocationType) {
      this.show(this.translateService.translate('oimuloca.usagetypemustbe'), 'warn');
      return true;
    }
    if (!event.capacity && event.capacity !== 0) {
      this.show(this.translateService.translate('oimuloca.capacitymustbe'), 'warn');
      return true;
    }
    if (!event.listSeq && event.listSeq !== 0) {
      this.show(this.translateService.translate('common.sequencemustbeentered'), 'warn');
      return true;
    }
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'internalLocationId' && !event.data.usageLocationId) {
      if(event.data.internalLocationId) {
        this.getInternalLocationRecords(event.data.internalLocationId,rowIndex);
      } else {
        if (this.selectedTabIndex === 0) {
          this.loc1grid.setColumnData('userDescription', rowIndex, undefined);
          this.loc1grid.setColumnData('usageLocationType', rowIndex, undefined);
        } else if (this.selectedTabIndex === 1) {
          this.loc2grid.setColumnData('userDescription', rowIndex, undefined);
          this.loc2grid.setColumnData('usageLocationTypes', rowIndex, undefined);
        } else if (this.selectedTabIndex === 2) {
          this.loc3grid.setColumnData('userDescription', rowIndex, undefined);
          this.loc3grid.setColumnData('usageLocationTypes', rowIndex, undefined);
        } else if (this.selectedTabIndex === 3) {
          this.loc4grid.setColumnData('userDescription', rowIndex, undefined);
          this.loc4grid.setColumnData('usageLocationTypes', rowIndex, undefined);
        } 
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  getInternalLocationRecords(event, index) {
    const serviceObj = this.oimulocaFactory.
    getInternalLocationRecords(event);
    serviceObj.subscribe(data => {
      if (data !== undefined) {
        if (this.selectedTabIndex === 0) {
          this.loc1grid.setColumnData('userDescription', index, data.userDesc);
          this.loc1grid.setColumnData('usageLocationType', index, data.internalLocationType);
        } else if (this.selectedTabIndex === 1) {
          this.loc2grid.setColumnData('userDescription', index, data.userDesc);
          this.loc2grid.setColumnData('usageLocationTypes', index, data.internalLocationType);
        } else if (this.selectedTabIndex === 2) {
          this.loc3grid.setColumnData('userDescription', index, data.userDesc);
          this.loc3grid.setColumnData('usageLocationTypes', index, data.usageLocationType);
        } else if (this.selectedTabIndex === 3) {
          this.loc4grid.setColumnData('userDescription', index, data.userDesc);
          this.loc4grid.setColumnData('usageLocationTypes', index, data.usageLocationType);
        }
      } else {
      }
    });
  }
  onGridClear = () => {
    this.oimulocaIntLocExecuteQuery();
    return true;
  }
  onGridClearOne = () => {
    if (this.intlocl1Model.usageLocationId) {
    this.oimulocaIntLoc1ExecuteQuery(this.intlocl1Model);
    }
    return true;
  }
  onGridClearTwo = () => {
    if (this.intlocl2Model.usageLocationId) {
    this.oimulocaIntLoc2ExecuteQuery(this.intlocl2Model);
    return true;
    }
  }
  onGridClearThree = () => {
    if (this.intlocl3Model.usageLocationId) {
      this.oimulocaIntLoc3ExecuteQuery(this.intlocl3Model);
    }
    return true;
  }
 
}
