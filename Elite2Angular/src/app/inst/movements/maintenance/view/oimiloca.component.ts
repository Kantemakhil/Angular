import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimilocaService } from '../service/oimiloca.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { ValidateRowReturn } from '@core/ui-components/grid/grid.component';
import { AgencyInternalLocations } from '../../../incidents-oic/beans/AgencyInternalLocations';
import { AgencyInternalLocationsCommitBean } from '../../../incidents-oic/beans/AgencyInternalLocationsCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';

@Component({
  selector: 'app-oimiloca',
  templateUrl: './oimiloca.component.html'
})

export class OimilocaComponent implements OnInit {
  @ViewChild('grid') grid: any;
  @ViewChild('intlocl2grid') intlocl2grid: any;
  @ViewChild('intlocl3grid') intlocl3grid: any;
  @ViewChild('intlocl4grid') intlocl4grid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];
  intlocl1Data: AgencyInternalLocations[] = [];
  intlocl1DataTemp: AgencyInternalLocations[] = [];
  intlocl1Model: AgencyInternalLocations = new AgencyInternalLocations();
  intlocl1CommitModel: AgencyInternalLocationsCommitBean = new AgencyInternalLocationsCommitBean();
  intlocl2CommitModel: AgencyInternalLocationsCommitBean = new AgencyInternalLocationsCommitBean();
  intlocl3CommitModel: AgencyInternalLocationsCommitBean = new AgencyInternalLocationsCommitBean();
  intlocl4CommitModel: AgencyInternalLocationsCommitBean = new AgencyInternalLocationsCommitBean();
  intlocl1Index: number;
  intlocl1InsertList: AgencyInternalLocations[] = [];
  intlocl1UpdateList: AgencyInternalLocations[] = [];
  intlocl1DeleteList: AgencyInternalLocations[] = [];
  intlocl2Data: AgencyInternalLocations[] = [];
  intlocl2DataTemp: AgencyInternalLocations[] = [];
  intlocl2Model: AgencyInternalLocations = new AgencyInternalLocations();
  intlocl2Index: number;
  intlocl2InsertList: AgencyInternalLocations[] = [];
  intlocl2UpdateList: AgencyInternalLocations[] = [];
  intlocl2DeleteList: AgencyInternalLocations[] = [];
  intlocl3Data: AgencyInternalLocations[] = [];
  intlocl3DataTemp: AgencyInternalLocations[] = [];
  intlocl3Model: AgencyInternalLocations = new AgencyInternalLocations();
  intlocl3Index: number;
  intlocl3InsertList: AgencyInternalLocations[] = [];
  intlocl3UpdateList: AgencyInternalLocations[] = [];
  intlocl3DeleteList: AgencyInternalLocations[] = [];
  intlocl4Data: AgencyInternalLocations[] = [];
  intlocl4DataTemp: AgencyInternalLocations[] = [];
  intlocl4Model: AgencyInternalLocations = new AgencyInternalLocations();
  intlocl4Index: number;
  intlocl4InsertList: AgencyInternalLocations[] = [];
  intlocl4UpdateList: AgencyInternalLocations[] = [];
  intlocl4DeleteList: AgencyInternalLocations[] = [];
  minDate: Date;
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  editable: boolean;
  intLocL4ColumnDef: any[];
  intLocL3ColumnDef: any[];
  intLocL2ColumnDef: any[];
  intLocL1ColumnDef: any[];
  agyLocReadOnly: boolean;
  intLocL1ReadOnly: boolean;
  intLocL2ReadOnly: boolean;
  intLocL3ReadOnly: boolean;
  intLocL4ReadOnly: boolean;
  rgagylocRg: any[] = [];
  rgleveltypeRg: any[] = [];
  verifiedCheck: any;
  tableIndex = -1;
  intlocl2TableIndex = -1;
  intLocL3TableIndex = -1;
  intLocL4TableIndex = -1;
  agyLocId: string;
  alertInsert: boolean;
  alertDelete: boolean;
  message = ' Invalid.';
  type = 'error';
  msglist = [];
  gridTitles = {
    code: this.translateService.translate('common.type'),
    description: this.translateService.translate('common.description')
  };
  intlocl1Insert: boolean;
  intlocl2Insert: boolean;
  intlocl3Insert: boolean;
  intlocl4Insert: boolean;
  checkboxDisabled: boolean;
  clearDisable: boolean;
  agyLocIdCode: any;
  intlocl3ModelTemp: any;
  constructor(private oimilocaFactory: OimilocaService,
    public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.intLocL4ColumnDef = [];
    this.intLocL3ColumnDef = [];
    this.intLocL2ColumnDef = [];
    this.intLocL1ColumnDef = [];
  }
  ngOnInit() {
    this.alertInsert = true;
    this.alertDelete = true;
    this.intlocl1Insert = false;
    this.intlocl2Insert = false;
    this.intlocl3Insert = false;
    this.intlocl4Insert = false;
    this.checkboxDisabled = true;
    this.clearDisable = true;
    this.intLocL4ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationcode') + '*', field: 'internalLocationCode', editable: true, width: 150,
        datatype: 'text', maxlength: 40, cellEditable: this.allowEdit
      },
      { fieldName: this.translateService.translate('common.locationdescription'), field: 'description', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('common.location') + '*', field: 'userDesc', editable: true,
        width: 150, datatype: 'text', maxlength: 40, cellEditable: this.allowEdit
      },
      { fieldName: '', field: 'unitType', editable: false, width: 10, hide: true },
      {
        fieldName: this.translateService.translate('common.locationtype') + '*', field: 'internalLocationType', editable: true, width: 150,
        datatype: 'lov', link: 'oimiloca/locationTypeLOVRecordGroup?unitType=', parentField: 'unitType', titles: this.gridTitles,
        source:'OUMRCODE', sourceDomain:'ILOC_TYPE', cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.sequencename') + '*', field: 'listSeq', editable: true, width: 150,
        datatype: 'number', maxValue: '999999', strictFP: true, whole: true, cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
        datatype: 'checkbox', cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'deactivateDate', editable: false, width: 150,
        datatype: 'date'
      },
      {
        fieldName: '', field: 'goButtonFour', datatype: 'launchbutton', link: '/OIUNONAS', modal: true,
        data: 'calaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width: 200, cellEditable: this.allowEdit
      },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true }
    ];
    this.intLocL3ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationcode') + '*', field: 'internalLocationCode', editable: true, width: 150,
        datatype: 'text', maxlength: 40, cellEditable: this.allowEdit
      },
      { fieldName: this.translateService.translate('common.locationdescription'), field: 'description', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('common.location') + '*', field: 'userDesc', editable: true,
        width: 150, datatype: 'text', maxlength: 40, cellEditable: this.allowEdit
      },
      { fieldName: '', field: 'unitType', editable: false, width: 10, hide: true },
      {
        fieldName: this.translateService.translate('common.locationtype') + '*', field: 'internalLocationType', editable: true, width: 150,
        datatype: 'lov', link: 'oimiloca/locationTypeLOVRecordGroup?unitType=', parentField: 'unitType', titles: this.gridTitles, 
        source:'OUMRCODE', sourceDomain:'ILOC_TYPE', cellEditable: this.allowEdit,
      },
      {
        fieldName: this.translateService.translate('common.sequencename') + '*', field: 'listSeq', editable: true, width: 150,
        datatype: 'number', maxValue: '999999', strictFP: true, whole: true, cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
        datatype: 'checkbox', cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'deactivateDate', editable: false,
        width: 150, datatype: 'date'
      },
      {
        fieldName: '', field: 'goButtonThree', datatype: 'launchbutton', link: '/OIUNONAS', modal: true,
        data: 'calaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width: 200, cellEditable: this.allowEdit
      },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true }
    ];
    this.intLocL2ColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationcode') + '*', field: 'internalLocationCode', editable: true, width: 150,
        datatype: 'text', maxlength: 40, cellEditable: this.allowEdit
      },
      { fieldName: this.translateService.translate('common.locationdescription'), field: 'description', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('common.location') + '*', field: 'userDesc', editable: true,
        width: 150, datatype: 'text', maxlength: 40, cellEditable: this.allowEdit
      },
      { fieldName: '', field: 'unitType', editable: false, width: 10, hide: true },
      {
        fieldName: this.translateService.translate('common.locationtype') + '*', field: 'internalLocationType', editable: true, width: 150,
        datatype: 'lov',link: 'oimiloca/locationTypeLOVRecordGroup?unitType=', parentField: 'unitType', titles: this.gridTitles,
        source:'OUMRCODE', sourceDomain:'ILOC_TYPE', cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.sequencename') + '*', field: 'listSeq', editable: true, width: 150,
        datatype: 'number', maxValue: '999999', strictFP: true, whole: true, cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', editable: true, width: 150,
        datatype: 'checkbox', cellEditable: this.allowEdit
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'deactivateDate', editable: false,
        width: 150, datatype: 'date'
      },
      {
        fieldName: '', field: 'goButtonTwo', datatype: 'launchbutton', link: '/OIUNONAS', modal: true,
        data: 'calaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width: 200, cellEditable: this.allowEdit
      },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true }
    ];
    this.intLocL1ColumnDef = [
      {
        fieldName: this.translateService.translate('oimiloca.locationcode') + '*', field: 'internalLocationCode', editable: true, width: 150,
        cellEditable: this.allowEdit, datatype: 'text', maxlength: 40
      },
      { fieldName: this.translateService.translate('oimiloca.locationdescription'), field: 'description', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('oimiloca.userDesc') + '*', field: 'userDesc', editable: true,
        cellEditable: this.allowEdit, width: 150, datatype: 'text', maxlength: 40
      },
      { fieldName: '', field: 'unitType', editable: false, width: 10, hide: true },
      {
        fieldName: this.translateService.translate('common.locationtype') + '*', field: 'internalLocationType', editable: true, width: 150,
        datatype: 'lov',  link: 'oimiloca/locationTypeLOVRecordGroup?unitType=', parentField: 'unitType', titles: this.gridTitles,
        source:'OUMRCODE', sourceDomain:'ILOC_TYPE', cellEditable: this.allowEdit,
      },
      {
        fieldName: this.translateService.translate('common.sequencename') + '*', field: 'listSeq', editable: true, width: 150,
        datatype: 'number', maxValue: '999999', strictFP: true, whole: true, cellEditable: this.allowEdit,
      },
      {
        fieldName: this.translateService.translate('oimiloca.internallocation'), field: 'trackingFlag', editable: false, width: 150,
        datatype: 'checkbox'
      },
      {
        fieldName: this.translateService.translate('common.active'), field: 'activeFlag', width: 150,  
        datatype: 'checkbox', cellEditable: this.allowEdit, editable: false
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'deactivateDate', editable: false,
        width: 150, datatype: 'date'
      },
      {
        fieldName: '', field: 'goButtonOne', datatype: 'launchbutton', link: '/OIUNONAS', modal: true,
        data: 'calaunchbutton', editable: true, dialogWidth: 70, onLaunchClick: this.caGoBtnClick, width: 200, cellEditable: this.allowEdit,
      },
      { fieldName: '', field: 'agyLocId', editable: false, width: 10, hide: true }
    ];
  }

  caGoBtnClick = (event) => {
    if (event.internalLocationId) {
      return true;
    }
    this.show('oimiloca.youcannotqueryrecordswithoutsavedparentrecord');
    return false;
  }

  onStatusBlur() {
    if (!this.agyLocId) {
      this.agyLocId = this.agyLocId === '' ? undefined : '';
    }
  }
  clearQuery() {
    this.alertInsert = true;
    this.alertDelete = true;
    this.checkboxDisabled = true;
    this.intlocl1Data = [];
    this.intlocl1Model = new AgencyInternalLocations();
    this.intlocl2Data = [];
    this.intlocl1Model = new AgencyInternalLocations();
    this.intlocl3Data = [];
    this.intlocl1Model = new AgencyInternalLocations();
    this.intlocl4Data = [];
    this.intlocl1Model = new AgencyInternalLocations();
    this.agyLocId = undefined;
    this.verifiedCheck = undefined;
    this.clearDisable = true;
  }
  validateRowData = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.grid.setColumnData('deactivateDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.grid.setColumnData('deactivateDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    if (event && event.field === 'internalLocationCode' && event.data) {
      if (event.data.internalLocationCode == '') {
        this.grid.setColumnData('description', rowIndex, '');
      }
      else if (event.data.internalLocationCode !== '') {
        let appendedData = this.agyLocIdCode + '-' + event.data.internalLocationCode;
        this.grid.setColumnData('description', rowIndex, appendedData);
      }
    }
    rowdata.validated = true;
    return rowdata;
  }
  validateRowDataOne = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.intlocl2grid.setColumnData('deactivateDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.intlocl2grid.setColumnData('deactivateDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;

      }
    }
    if (event.field === 'internalLocationCode') {
      this.intlocl2Model.agyLocId = this.agyLocIdCode;
      this.intlocl2Model.parentInternalLocationId = this.intlocl1Model.internalLocationId;
      this.intlocl2grid.setColumnData('description', rowIndex, event.data.internalLocationCode ? this.intlocl1Model.description + '-' + event.data.internalLocationCode : undefined);
      //this.intlocl2grid.setColumnData('description', rowIndex, this.intlocl1Model.internalLocationCode + '-' + event.data.internalLocationCode);

    }
    rowdata.validated = true;
    return rowdata;
  }
  validateRowDataTwo = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.intlocl3grid.setColumnData('deactivateDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.intlocl3grid.setColumnData('deactivateDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    if (event.field === 'internalLocationCode') {
      this.intlocl3Model.agyLocId = this.agyLocIdCode;
      this.intlocl3Model.parentInternalLocationId = this.intlocl2Model.internalLocationId;
      this.intlocl3grid.setColumnData('description', rowIndex, event.data.internalLocationCode ? this.intlocl2Model.description + '-' + event.data.internalLocationCode : undefined);
      //this.intlocl3grid.setColumnData('description', rowIndex, this.intlocl2Model.description + '-' + event.data.internalLocationCode);
    }
    rowdata.validated = true;
    return rowdata;
  }
  validateRowDataThree = (event) => {
    const rowIndex = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    rowdata.validated = true;
    if (event.field === 'activeFlag') {
      if (event.data.activeFlag) {
        this.intlocl4grid.setColumnData('deactivateDate', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag) {
        this.intlocl4grid.setColumnData('deactivateDate', rowIndex, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      }
    }
    if (event.field === 'internalLocationCode') {
      this.intlocl4Model.agyLocId = this.agyLocIdCode;
      this.intlocl4Model.parentInternalLocationId = this.intlocl3Model.internalLocationId;
      this.intlocl4grid.setColumnData('description', rowIndex, event.data.internalLocationCode ? this.intlocl3Model.description + '-' + event.data.internalLocationCode : undefined);
      //this.intlocl4grid.setColumnData('description', rowIndex, this.intlocl3Model.description + '-' + event.data.internalLocationCode);
    }
    rowdata.validated = true;
    return rowdata;
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
  allowEdit = (data: any, index: number, field: string): boolean => {
    if (data.unitType && data.unitType != null && data.unitType != '' && data.unitType != undefined) {
      return false;
    } else {
      return true;
    }
}
  onRowClickintlocl1(event) {
    if (event) {
      if(event.unitType && event.unitType != null && event.unitType != '' && event.unitType != undefined){
        this.alertDelete=false;
      }
      else{
        this.alertDelete=true;
      }
      this.intlocl1Model = event;
      if (this.intlocl1Model.internalLocationId) {
        this.intlocl2Model = new AgencyInternalLocations();
        this.intlocl2Model.agyLocId = this.agyLocIdCode;
        this.intlocl2Model.parentInternalLocationId = this.intlocl1Model.internalLocationId;
        this.intLocL2ExecuteQuery();
      }
      this.intlocl2Insert = true;
      if (!this.intlocl1Model.createDateTime) {
        this.intlocl2Data = [];
        this.intlocl3Data = [];
        this.intlocl4Data = [];
        this.intlocl2Model = new AgencyInternalLocations();
        this.intlocl3Model = new AgencyInternalLocations();
        this.intlocl4Model = new AgencyInternalLocations();
        this.intlocl2Insert = false;
        this.intlocl3Insert = false;
        this.intlocl4Insert = false;
      }
    } else {
      this.intlocl2Data = [];
      this.intlocl3Data = [];
      this.intlocl4Data = [];
      this.intlocl2Model = new AgencyInternalLocations();
      this.intlocl3Model = new AgencyInternalLocations();
      this.intlocl4Model = new AgencyInternalLocations();
      this.intlocl2Insert = false;
      this.intlocl3Insert = false;
      this.intlocl4Insert = false;
    }
  }
  onRowClickintlocl2(event) {
    if (event) {
      this.intlocl2Model = event;
      if (this.intlocl2Model.internalLocationId) {
        this.intlocl3Model.agyLocId = this.agyLocIdCode;
        this.intlocl3Model.parentInternalLocationId = this.intlocl2Model.internalLocationId;
        this.intLocL3ExecuteQuery();
      }
      this.intlocl3Insert = true;
      this.intlocl4Insert = false;
      if (!this.intlocl1Model.createDateTime) {
        this.intlocl3Data = [];
        this.intlocl4Data = [];
        this.intlocl3Model = new AgencyInternalLocations();
        this.intlocl4Model = new AgencyInternalLocations();
        this.intlocl3Insert = false;
        this.intlocl4Insert = false;
      }
    } else {
      this.intlocl3Data = [];
      this.intlocl4Data = [];
      this.intlocl3Model = new AgencyInternalLocations();
      this.intlocl4Model = new AgencyInternalLocations();
      this.intlocl3Insert = false;
      this.intlocl4Insert = false;
    }
  }
  onRowClickintlocl3(event) {
    if (event) {
      this.intlocl3Model = event;
      if (this.intlocl3Model.internalLocationId) {
        this.intlocl4Model.agyLocId = this.agyLocIdCode;
        this.intlocl4Model.parentInternalLocationId = this.intlocl3Model.internalLocationId;
        this.intlocl4ExecuteQuery();
      }
      this.intlocl4Insert = true;
      if (!this.intlocl1Model.createDateTime) {
        this.intlocl4Data = [];
        this.intlocl4Model = new AgencyInternalLocations();
        this.intlocl4Insert = false;
      }
    } else {
      this.intlocl4Data = [];
      this.intlocl4Model = new AgencyInternalLocations();
      this.intlocl4Insert = false;
    }
  }
  onRowClickintlocl4(event) {
    if (event) {
      this.intlocl4Model = event;
    }
  }
  onGridInsert = () => {
    if (!this.oimilocaValidations()) {
      return false;
    }
    return { activeFlag: true, trackingFlag: true, goButtonOne: this.translateService.translate('common.nonassociations') };
  }
  intlocl2OnGridInsert = () => {
    if (!this.intlocl1Model.createDateTime || this.intlocl1Data.length === 0) {
      this.show('oimiloca.youcannotqueryrecordswithoutsavedparentrecord');
      return false;
    }
    if (!this.intlocl2Validations()) {
      return false;
    }
    return { activeFlag: true, trackingFlag: true, goButtonTwo: this.translateService.translate('common.nonassociations') };
  }
  intlocl3OnGridInsert = () => {
    if (!this.intlocl2Model.createDateTime || this.intlocl2Data.length === 0) {
      this.show('oimiloca.youcannotqueryrecordswithoutsavedparentrecord');
      return false;
    }
    if (!this.intlocl3Validations()) {
      return false;
    }
    return { activeFlag: true, trackingFlag: true, goButtonThree: this.translateService.translate('common.nonassociations') };
  }
  intlocl4OnGridInsert = () => {
    if (!this.intlocl3Model.createDateTime || this.intlocl3Data.length === 0) {
      this.show('oimiloca.youcannotqueryrecordswithoutsavedparentrecord');
      return false;
    }
    if (!this.intlocl4Validations()) {
      return false;
    }
    return { activeFlag: true, trackingFlag: true, goButtonFour: this.translateService.translate('common.nonassociations') };
  }
  onGridDelete = () => {
    if (this.intlocl2Data.length > 0) {
      this.show('common.recordcannotbedeletedasthechildrecordexists');
      return false;
    }
    return true;
  }
  intlocl2OnGridDelete = () => {
    if (this.intlocl3Data.length > 0) {
      this.show('common.recordcannotbedeletedasthechildrecordexists');
      return false;
    }
    return true;
  }
  intlocl3OnGridDelete = () => {
    if (this.intlocl4Data.length > 0) {
      this.show('common.recordcannotbedeletedasthechildrecordexists');
      return false;
    }
    return true;
  }
  onCheckBoxChange(event) {
    if (event && event.checked) {
      this.intlocl1Model.sealFlag = 'Y';
    } else {
      this.intlocl1Model.sealFlag = 'N';
    }
    this.oimilocaexecuteQuery();
  }
  agyLocChangeEvent(event) {
    if (event && event.code) {
      this.intlocl1Insert = true;
      this.agyLocIdCode = event.code;
      this.checkboxDisabled = false;
      this.clearDisable = false;
      this.oimilocaexecuteQuery();
    } else {
      this.agyLocIdCode = undefined;
      this.intlocl1Insert = false;
      this.alertInsert = true;
      this.alertDelete = true;
      this.intlocl1Data = [];
      this.intlocl1Model = new AgencyInternalLocations();
      this.intlocl2Data = [];
      this.intlocl1Model = new AgencyInternalLocations();
      this.intlocl3Data = [];
      this.intlocl1Model = new AgencyInternalLocations();
      this.intlocl4Data = [];
      this.intlocl1Model = new AgencyInternalLocations();
      this.agyLocId = undefined;
      this.verifiedCheck = undefined;
      this.clearDisable = true;
    }
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimilocaSaveintlocl1Form(event) {
    if (!this.oimilocaValidations()) {
      return;
    }
    this.intlocl1InsertList = event.added;
    this.intlocl1UpdateList = event.updated;
    this.intlocl1DeleteList = event.removed;
    this.intlocl1CommitModel.insertList = [];
    this.intlocl1CommitModel.updateList = [];
    this.intlocl1CommitModel.deleteList = [];
    if (this.intlocl1InsertList.length > 0 || this.intlocl1UpdateList.length > 0) {
      for (let i = 0; i < this.intlocl1InsertList.length; i++) {
        this.intlocl1InsertList[i].activeFlag = this.intlocl1InsertList[i].activeFlag ? 'Y' : 'N';
        this.intlocl1InsertList[i].trackingFlag = this.intlocl1InsertList[i].trackingFlag ? 'Y' : 'N';
        this.intlocl1InsertList[i].certifiedFlag = 'N';
        this.intlocl1InsertList[i].agyLocId = this.agyLocId;
        this.intlocl1InsertList[i].createUserId = undefined;
        this.intlocl1InsertList[i].modifyUserId = undefined;
        this.intlocl1CommitModel.insertList = this.intlocl1InsertList;
        
      }
      for (let i = 0; i < this.intlocl1UpdateList.length; i++) {
        this.intlocl1UpdateList[i].activeFlag = this.intlocl1UpdateList[i].activeFlag ? 'Y' : 'N';
        this.intlocl1UpdateList[i].trackingFlag = this.intlocl1UpdateList[i].trackingFlag ? 'Y' : 'N';
        this.intlocl1UpdateList[i]['activeFlagTemp'] = this.intlocl1UpdateList[i]['activeFlagTemp'] ? 'Y' : 'N';
        this.intlocl1UpdateList[i].createUserId = undefined;
        this.intlocl1UpdateList[i].modifyUserId = undefined;
        if(this.intlocl1UpdateList[i].activeFlag ){
            if ((this.intlocl1UpdateList[i]['activeFlagTemp'] != this.intlocl1UpdateList[i].activeFlag) && this.intlocl1UpdateList[i].activeFlag === 'N' && (this.intlocl1UpdateList[i].linkedOffenderCount > 0 || this.intlocl1UpdateList[i].linkedOffenderCount1>0)) {
                this.show('oimiloca.linkedoffendervalidation');
              return;
            }  
      }
        this.intlocl1CommitModel.updateList = this.intlocl1UpdateList;
        
      }
    }
    if (this.intlocl1DeleteList.length > 0) {
      for (let i = 0; i < this.intlocl1DeleteList.length; i++) {
        this.intlocl1DeleteList[i].activeFlag = this.intlocl1DeleteList[i].activeFlag ? 'Y' : 'N';
        this.intlocl1DeleteList[i].trackingFlag = this.intlocl1DeleteList[i].trackingFlag ? 'Y' : 'N';
        this.intlocl1CommitModel.deleteList = this.intlocl1DeleteList;
      }
    }
    const intlocl1SaveData = this.oimilocaFactory.intLocL1Commit(this.intlocl1CommitModel);
    intlocl1SaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.oimilocaexecuteQuery();
        return;
      } else if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed');
        this.oimilocaexecuteQuery();
        return;
      } else {
        this.show('The row already exists with Housing Location  table  ', 'warn');
        this.oimilocaexecuteQuery();
        return;
      }
    });
  }
  oimilocaexecuteQuery() {
    if (!this.verifiedCheck) {
      this.intlocl1Model.sealFlag = 'N';
    } else {
      this.intlocl1Model.sealFlag = 'Y';
    }
    if (this.agyLocIdCode) {
      this.intlocl1Model.agyLocId = this.agyLocIdCode;
      const serviceObj = this.oimilocaFactory.intLocL1ExecuteQuery(this.intlocl1Model);
      serviceObj.subscribe(data => {
        if (data.length === 0) {
          this.intlocl1Data = [];
        } else {
          data.forEach(element => {
            element.trackingFlagData = element.trackingFlag;
            element.activeFlagData = element.activeFlag;
            element.trackingFlag = element.trackingFlag === 'Y' ? true : false;
            element.activeFlag = element.activeFlag === 'Y' ? true : false;
            element['activeFlagTemp'] = element.activeFlag;
            element['goButtonOne'] = this.translateService.translate('common.nonassociations');
            element['calaunchbutton'] = { internalLocationId: element.internalLocationId, unitType: element.unitType };
          });
          this.intlocl1Data = data;
          this.tableIndex = 0;
          this.clearDisable = false;
          //Update 2nd tab for first row
          this.intlocl2Model = new AgencyInternalLocations();
          this.intlocl2Model.agyLocId = this.agyLocIdCode;
          this.intlocl2Model.parentInternalLocationId = this.intlocl1Data[0].internalLocationId;
          this.intLocL2ExecuteQuery();
        }
      });
    } else {
      this.show('oimiloca.facilitymust');
      return;
    }
  }

  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimilocaSaveintlocl2Form(event) {
    if (!this.intlocl2Validations()) {
      return;
    }
    this.intlocl2InsertList = event.added;
    this.intlocl2UpdateList = event.updated;
    this.intlocl2DeleteList = event.removed;
    this.intlocl2CommitModel.insertList = [];
    this.intlocl2CommitModel.updateList = [];
    this.intlocl2CommitModel.deleteList = [];
    if (this.intlocl2InsertList.length > 0 || this.intlocl2UpdateList.length > 0) {
      for (let i = 0; i < this.intlocl2InsertList.length; i++) {
        this.intlocl2InsertList[i].activeFlag = this.intlocl2InsertList[i].activeFlag ? 'Y' : 'N';
        this.intlocl2InsertList[i].trackingFlag = 'Y';
        this.intlocl2InsertList[i].certifiedFlag = 'N';
        this.intlocl2InsertList[i].agyLocId = this.agyLocId;
        this.intlocl2InsertList[i].parentInternalLocationId= this.intlocl1Model.internalLocationId;
        this.intlocl2CommitModel.insertList = this.intlocl2InsertList;
      }
      for (let i = 0; i < this.intlocl2UpdateList.length; i++) {
        this.intlocl2UpdateList[i].activeFlag = this.intlocl2UpdateList[i].activeFlag ? 'Y' : 'N';
        this.intlocl2UpdateList[i]['activeFlagTemp'] = this.intlocl2UpdateList[i]['activeFlagTemp'] ? 'Y' : 'N';

        if(this.intlocl2UpdateList[i].activeFlag ){
          if ((this.intlocl2UpdateList[i]['activeFlagTemp'] != this.intlocl2UpdateList[i].activeFlag) && this.intlocl2UpdateList[i].activeFlag === 'N' && (this.intlocl2UpdateList[i].linkedOffenderCount > 0 || this.intlocl2UpdateList[i].linkedOffenderCount1>0)) {
              this.show('oimiloca.linkedoffendervalidation');
            return;
          }  
    }
        this.intlocl2CommitModel.updateList = this.intlocl2UpdateList;
      }
    }
    if (this.intlocl2DeleteList.length > 0) {
      for (let i = 0; i < this.intlocl2DeleteList.length; i++) {
        this.intlocl2DeleteList[i].activeFlag = this.intlocl2DeleteList[i].activeFlag ? 'Y' : 'N';
        this.intlocl2CommitModel.deleteList = this.intlocl2DeleteList;
      }
    }
    const intlocl2SaveData = this.oimilocaFactory.intLocL1Commit(this.intlocl2CommitModel);
    intlocl2SaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.intLocL2ExecuteQuery();
        return;
      } else if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed');
        return;
      }else if (data && data.sealFlag === '3') {
        this.show(this.translateService.translate('oimiloca.rowExists'), 'warn');
        return;
      } else {
        this.message = this.translateService.translate('common.recordcannotbedeleted');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        return;
      }
    });
  }
  intLocL2ExecuteQuery() {
    const payLoad = {'agyLocId' : this.agyLocId ,'parentInternalLocationId' : this.intlocl1Model.internalLocationId };
    const serviceObj = this.oimilocaFactory.intLocL2ExecuteQuery(payLoad);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.intlocl2Data = [];
        this.intlocl3Data = [];
        this.intlocl4Data = [];
      } else {
        data.forEach(element => {
          element.trackingFlagData = element.trackingFlag;
          element.activeFlagData = element.activeFlag;
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element['activeFlagTemp'] = element.activeFlag;
          element['goButtonTwo'] = this.translateService.translate('common.nonassociations');
          element['calaunchbutton'] = { internalLocationId: element.internalLocationId, unitType: element.unitType };
        });
        this.intlocl2Data = data;
        this.intlocl2TableIndex = 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimilocaSaveintlocl3Form(event) {
    if (!this.intlocl3Validations()) {
      return;
    }
    this.intlocl3InsertList = event.added;
    this.intlocl3UpdateList = event.updated;
    this.intlocl3DeleteList = event.removed;
    this.intlocl3CommitModel.insertList = [];
    this.intlocl3CommitModel.updateList = [];
    this.intlocl3CommitModel.deleteList = [];
    if (this.intlocl3InsertList.length > 0 || this.intlocl3UpdateList.length > 0) {
      for (let i = 0; i < this.intlocl3InsertList.length; i++) {
        this.intlocl3InsertList[i].activeFlag = this.intlocl3InsertList[i].activeFlag ? 'Y' : 'N';
        this.intlocl3InsertList[i].trackingFlag = 'Y';
        this.intlocl3InsertList[i].certifiedFlag = 'N';
        this.intlocl3InsertList[i].agyLocId = this.agyLocId;
        this.intlocl3InsertList[i].parentInternalLocationId = this.intlocl2Model.internalLocationId;
        this.intlocl3CommitModel.insertList = this.intlocl3InsertList;
      }
      for (let i = 0; i < this.intlocl3UpdateList.length; i++) {
        this.intlocl3UpdateList[i].activeFlag = this.intlocl3UpdateList[i].activeFlag ? 'Y' : 'N';
        this.intlocl3UpdateList[i]['activeFlagTemp'] = this.intlocl3UpdateList[i]['activeFlagTemp'] ? 'Y' : 'N';
        if(this.intlocl3UpdateList[i].activeFlag ){
          if ((this.intlocl3UpdateList[i]['activeFlagTemp'] != this.intlocl3UpdateList[i].activeFlag) && this.intlocl3UpdateList[i].activeFlag === 'N' && (this.intlocl3UpdateList[i].linkedOffenderCount > 0 || this.intlocl3UpdateList[i].linkedOffenderCount1>0)) {
              this.show('oimiloca.linkedoffendervalidation');
            return;
          }  
    }
        
        this.intlocl3CommitModel.updateList = this.intlocl3UpdateList;
      }
    }
    if (this.intlocl3DeleteList.length > 0) {
      for (let i = 0; i < this.intlocl3DeleteList.length; i++) {
        this.intlocl3DeleteList[i].activeFlag = this.intlocl3DeleteList[i].activeFlag ? 'Y' : 'N';
        this.intlocl3CommitModel.deleteList = this.intlocl3DeleteList;
      }
    }
    const intlocl3SaveData = this.oimilocaFactory.intLocL1Commit(this.intlocl3CommitModel);
    intlocl3SaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.intLocL3ExecuteQuery();
        return;
      } else if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed');
        this.intLocL3ExecuteQuery();
        return;
      } else {
        this.message = this.translateService.translate('common.recordcannotbedeleted');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.intLocL3ExecuteQuery();
        return;
      }
    });
  }
  intLocL3ExecuteQuery() {
    const payLoad = {'agyLocId' : this.agyLocId ,'parentInternalLocationId' : this.intlocl2Model.internalLocationId };
    const serviceObj = this.oimilocaFactory.intLocL2ExecuteQuery(payLoad);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.intlocl3Data = [];
        this.intlocl4Data = [];
      } else {
        data.forEach(element => {
          element.trackingFlagData = element.trackingFlag;
          element.activeFlagData = element.activeFlag;
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element['activeFlagTemp'] = element.activeFlag;
          element['goButtonThree'] = this.translateService.translate('common.nonassociations');
          element['calaunchbutton'] = { internalLocationId: element.internalLocationId, unitType: element.unitType };
        });
        this.intlocl3Data = data;
        this.intLocL3TableIndex = 0;
      }
    });
  }
  intlocl4ExecuteQuery() {
    const payLoad = {'agyLocId' : this.agyLocId ,'parentInternalLocationId' : this.intlocl3Model.internalLocationId };
    const intlocl4Result = this.oimilocaFactory.intLocL2ExecuteQuery(payLoad);
    intlocl4Result.subscribe(data => {
      if (data.length === 0) {
        this.intlocl4Data = [];
      } else {
        data.forEach(element => {
          element.trackingFlagData = element.trackingFlag;
          element.activeFlagData = element.activeFlag;
          element.activeFlag = element.activeFlag === 'Y' ? true : false;
          element['activeFlagTemp'] = element.activeFlag;
          element['goButtonFour'] = this.translateService.translate('common.nonassociations');
          element['calaunchbutton'] = { internalLocationId: element.internalLocationId, unitType: element.unitType };
        });
        this.intlocl4Data = data;
        this.intLocL4TableIndex = 0;
      }
    });
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimilocaSaveintlocl4Form(event) {
    if (!this.intlocl4Validations()) {
      return;
    }
    this.intlocl4InsertList = event.added;
    this.intlocl4UpdateList = event.updated;
    this.intlocl4DeleteList = event.removed;
    this.intlocl4CommitModel.insertList = [];
    this.intlocl4CommitModel.updateList = [];
    this.intlocl4CommitModel.deleteList = [];
    if (this.intlocl4InsertList.length > 0 || this.intlocl4UpdateList.length > 0) {
      for (let i = 0; i < this.intlocl4InsertList.length; i++) {
        this.intlocl4InsertList[i].activeFlag = this.intlocl4InsertList[i].activeFlag ? 'Y' : 'N';
        this.intlocl4InsertList[i].trackingFlag = 'Y';
        this.intlocl4InsertList[i].certifiedFlag = 'N';
        this.intlocl4InsertList[i].agyLocId = this.agyLocId;
        this.intlocl4InsertList[i].parentInternalLocationId = this.intlocl3Model.internalLocationId;
        this.intlocl4CommitModel.insertList = this.intlocl4InsertList;
      }
      for (let i = 0; i < this.intlocl4UpdateList.length; i++) {
        this.intlocl4UpdateList[i].activeFlag = this.intlocl4UpdateList[i].activeFlag ? 'Y' : 'N';
        this.intlocl3UpdateList[i]['activeFlagTemp'] = this.intlocl3UpdateList[i]['activeFlagTemp'] ? 'Y' : 'N';

        if(this.intlocl4UpdateList[i].activeFlag ){
          if ((this.intlocl4UpdateList[i]['activeFlagTemp'] != this.intlocl4UpdateList[i].activeFlag) && this.intlocl4UpdateList[i].activeFlag === 'N' && (this.intlocl4UpdateList[i].linkedOffenderCount > 0 || this.intlocl4UpdateList[i].linkedOffenderCount1>0)) {
              this.show('oimiloca.linkedoffendervalidation');
            return;
          }  
    }
        this.intlocl4CommitModel.updateList = this.intlocl4UpdateList;
      }
    }
    if (this.intlocl4DeleteList.length > 0) {
      for (let i = 0; i < this.intlocl4DeleteList.length; i++) {
        this.intlocl4DeleteList[i].activeFlag = this.intlocl4DeleteList[i].activeFlag ? 'Y' : 'N';
        this.intlocl4CommitModel.deleteList = this.intlocl4DeleteList;
      }
    }
    const intlocl4SaveData = this.oimilocaFactory.intLocL1Commit(this.intlocl4CommitModel);
    intlocl4SaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.intlocl4ExecuteQuery();
        return;
      } else if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed');
        this.intlocl4ExecuteQuery();
        return;
      } else {
        this.message = this.translateService.translate('common.recordcannotbedeleted');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.intlocl4ExecuteQuery();
        return;
      }
    });
  }
  oimilocaValidations() {
    const is = { valid: true };
    this.intlocl1Data.forEach(element => {
      if (!element.internalLocationCode) {
        this.show('common.locationcodemustbe');
        is.valid = false;
        return is.valid;
      }
      for (let x = 0; x < this.intlocl1Data.length; x++) {
        for (let y = 0; y < this.intlocl1Data.length; y++) {
          if (x !== y) {
            if (this.intlocl1Data[x].internalLocationCode === this.intlocl1Data[y].internalLocationCode &&
              this.intlocl1Data[x].description === this.intlocl1Data[y].description) {
              this.show('oimiloca.therowalreadyexistswiththesamelocationdescription');
              is.valid = false;
              return;
            }
          }
        }
      }
      if (!this.verifiedCheck) {
        if (!element.userDesc) {
          this.show('common.locationmustbeentered');
          is.valid = false;
          return is.valid;
        }
      }
      if (!element.internalLocationType) {
        this.show('oimiloca.locationtypemustbeentered');
        is.valid = false;
        return is.valid;
      }
      if (!element.listSeq && element.listSeq !== 0) {
        this.show('common.sequencemustbeentered');
        is.valid = false;
        return is.valid;
      }
    });
    return is.valid;
  }
  intlocl2Validations() {
    const is = { valid: true };
    this.intlocl2Data.forEach(element => {
      if (!element.internalLocationCode) {
        this.show('common.locationcodemustbe');
        is.valid = false;
        return is.valid;
      }
      for (let x = 0; x < this.intlocl2Data.length; x++) {
        for (let y = 0; y < this.intlocl2Data.length; y++) {
          if (x !== y) {
            if (this.intlocl2Data[x].internalLocationCode === this.intlocl2Data[y].internalLocationCode &&
              this.intlocl2Data[x].description === this.intlocl2Data[y].description) {
              this.show('oimiloca.therowalreadyexistswiththesamelocationdescription');
              is.valid = false;
              return;
            }
          }
        }
      }
      if (!this.verifiedCheck) {
        if (!element.userDesc) {
          this.show('common.locationmustbeentered');
          is.valid = false;
          return is.valid;
        }
      }
      if (!element.internalLocationType) {
        this.show('oimiloca.locationtypemustbeentered');
        is.valid = false;
        return is.valid;
      }
      if (!element.listSeq && element.listSeq !== 0) {
        this.show('common.sequencemustbeentered');
        is.valid = false;
        return is.valid;
      }
    });
    return is.valid;
  }
  intlocl3Validations() {
    const is = { valid: true };
    this.intlocl3Data.forEach(element => {
      if (!element.internalLocationCode) {
        this.show('common.locationcodemustbe');
        is.valid = false;
        return is.valid;
      }
      for (let x = 0; x < this.intlocl3Data.length; x++) {
        for (let y = 0; y < this.intlocl3Data.length; y++) {
          if (x !== y) {
            if (this.intlocl3Data[x].internalLocationCode === this.intlocl3Data[y].internalLocationCode &&
              this.intlocl3Data[x].description === this.intlocl3Data[y].description) {
              this.show('oimiloca.therowalreadyexistswiththesamelocationdescription');
              is.valid = false;
              return;
            }
          }
        }
      }
      if (!this.verifiedCheck) {
        if (!element.userDesc) {
          this.show('common.locationmustbeentered');
          is.valid = false;
          return is.valid;
        }
      }
      if (!element.internalLocationType) {
        this.show('oimiloca.locationtypemustbeentered');
        is.valid = false;
        return is.valid;
      }
      if (!element.listSeq && element.listSeq !== 0) {
        this.show('common.sequencemustbeentered');
        is.valid = false;
        return is.valid;
      }
    });
    return is.valid;
  }
  intlocl4Validations() {
    const is = { valid: true };
    this.intlocl4Data.forEach(element => {
      if (!element.internalLocationCode) {
        this.show('common.locationcodemustbe');
        is.valid = false;
        return is.valid;
      }
      for (let x = 0; x < this.intlocl4Data.length; x++) {
        for (let y = 0; y < this.intlocl4Data.length; y++) {
          if (x !== y) {
            if (this.intlocl4Data[x].internalLocationCode === this.intlocl4Data[y].internalLocationCode &&
              this.intlocl4Data[x].description === this.intlocl4Data[y].description) {
              this.show('oimiloca.therowalreadyexistswiththesamelocationdescription');
              is.valid = false;
              return;
            }
          }
        }
      }
      if (!this.verifiedCheck) {
        if (!element.userDesc) {
          this.show('common.locationmustbeentered');
          is.valid = false;
          return is.valid;
        }
      }
      if (!element.internalLocationType) {
        this.show('oimiloca.locationtypemustbeentered');
        is.valid = false;
        return is.valid;
      }
      if (!element.listSeq && element.listSeq !== 0) {
        this.show('common.sequencemustbeentered');
        is.valid = false;
        return is.valid;
      }
    });
    return is.valid;
  }
  onGridClear = () => {
    this.oimilocaexecuteQuery();
    return true;
  }
  onGridClearOne = () => {
    this.intLocL2ExecuteQuery();
    return true;
  }
  onGridClearTwo = () => {
    this.intLocL3ExecuteQuery();
    return true;
  }
  onGridClearThree = () => {
    this.intlocl4ExecuteQuery();
    return true;
  }
  get readeOnlyFields() {
    if (this.agyLocId === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
