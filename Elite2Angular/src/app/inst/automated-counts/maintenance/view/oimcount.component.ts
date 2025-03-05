import {
  Component, OnInit, ViewChild, Output, EventEmitter
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { OimcountService } from '../service/oimcount.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { AgencyLocations } from '@saadminbeans/AgencyLocations';
import { AgencyCountTypes } from '@inst/automated-counts/beans/AgencyCountTypes';
import { AgencyCountTypesCommitBean } from '@inst/automated-counts/maintenance/beans/AgencyCountTypesCommitBean';
import { AgencyReportingLocs } from '@inst/automated-counts/maintenance/beans/AgencyReportingLocs';
import { AgencyReportingLocsCommitBean } from '@inst/automated-counts/maintenance/beans/AgencyReportingLocsCommitBean';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { DateFormat } from '@ui-components/datepicker/dateFormat';
import { TimeFormat } from '@ui-components/time/timeFormat';
@Component({
  selector: 'app-oimcount',
  templateUrl: './oimcount.component.html'
})

export class OimcountComponent implements OnInit {
  agyLocId: string;
  checkCopyFlag = false;
  @ViewChild('grid', {static: true}) grid: any;
  @ViewChild('accgrid') accgrid: any;
  @ViewChild('initgrid') initgrid: any;
  @ViewChild('housegrid') housegrid: any;
  @Output() addRecord: EventEmitter<any> = new EventEmitter<any>();
  msgs: any[] = [];
  agencylocationsData: AgencyLocations[] = [];
  agencylocationsModel: AgencyLocations = new AgencyLocations();
  agencylocationsIndex = -1;
  agencylocationsInsertList: AgencyLocations[] = [];
  agencylocationsUpdatetList: AgencyLocations[] = [];
  agencylocationsDeleteList: AgencyLocations[] = [];
  agencycounttypesData: AgencyCountTypes[] = [];
  agencycounttypesRowData: AgencyCountTypes[] = [];
  agencycounttypesModel: AgencyCountTypes = new AgencyCountTypes();
  agencycounttypesIndex = -1;
  agencycounttypesInsertList: AgencyCountTypes[] = [];
  agencycounttypesUpdateList: AgencyCountTypes[] = [];
  agencycounttypesDeleteList: AgencyCountTypes[] = [];
  agencyreportinglocshousData: AgencyReportingLocs[] = [];
  agencyreportinglocsInsertData: AgencyReportingLocs[] = [];
  agencyreportinglocshousModel: AgencyReportingLocs = new AgencyReportingLocs();
  agencyreportinglocshousBean: AgencyReportingLocs = new AgencyReportingLocs();
  agencyreportinglocshousIndex = 0;
  agencyreportinglocshousInsertList: AgencyReportingLocs[] = [];
  agencyreportinglocshousUpdateList: AgencyReportingLocs[] = [];
  agencyreportinglocshousDeleteList: AgencyReportingLocs[] = [];
  agencyreportinglocsinitData: AgencyReportingLocs[] = [];
  agencyreportinglocsinitModel: AgencyReportingLocs = new AgencyReportingLocs();
  agencyreportinglocsinitBean: AgencyReportingLocs = new AgencyReportingLocs();
  agencyreportinglocsinitIndex = 0;
  agencyreportinglocsinitInsertList: AgencyReportingLocs[] = [];
  agencyreportinglocsinitUpdateList: AgencyReportingLocs[] = [];
  agencyreportinglocsinitDeleteList: AgencyReportingLocs[] = [];
  agencyReportingLocsHousColumnDef: any[];
  agencyCountTypesColumnDef: any[];
  agencyLocationsColumnDef: any[];
  agencyReportingLocsInitColumnDef: any[];
  agencycounttypesCommitModel: AgencyCountTypesCommitBean = new AgencyCountTypesCommitBean();
  agencyreportinglocshousCommitModel: AgencyReportingLocsCommitBean = new AgencyReportingLocsCommitBean();
  agencyreportinglocsinitCommitModel: AgencyReportingLocsCommitBean = new AgencyReportingLocsCommitBean();
  // intLocIdMap: Map<string, string> = new Map<string, string>();
  initLocMap: Map<string, string> = new Map<string, string>();
  initIndex = -1;
  housIndex = -1;
  lovTitles = { 'code': this.translateService.translate('oimcount.agencylocationcode'), 'description': this.translateService.translate('common.description') };
  agencyreportinglocsData: AgencyReportingLocs[] = [];
  constructor(private oimcountFactory: OimcountService, public translateService: TranslateService,
    public sessionManager: UserSessionManager) {
    this.agencyReportingLocsHousColumnDef = [];
    this.agencyCountTypesColumnDef = [];
    this.agencyLocationsColumnDef = [];
    this.agencyReportingLocsInitColumnDef = [];
  }
  ngOnInit() {
    this.agencylocationsIndex = -1;
    this.agencycounttypesIndex = -1;
    this.initIndex = -1;
    this.housIndex = -1;
    const locationLink = `oimcount/cgfkAgyLocIdRecordGroup?caseLoadid=${this.sessionManager.currentCaseLoad}`;
    const location1Link1 = 'oimcount/cgfkHousingLevel1RecordGroup?agyLocId=' + this.agencylocationsModel.agyLocId;
    this.agencyReportingLocsHousColumnDef = [
      { fieldName: '', field: 'hideValue', hide: true },
      {
        fieldName: this.translateService.translate('oimcount.building'), field: 'location1Id', editable: true, width: 150,
        datatype: 'lov', link: 'oimcount/cgfkHousingLevel1RecordGroup?agyLocId=',
        parentField: 'agyLocId', cellEditable: this.canHouseEdit, titles: {
          livingUnitCode: this.translateService.translate('common.housinglevelone')
          , description: this.translateService.translate('common.description')
        },source:'OIMLOCM'
      },
      {
        fieldName: this.translateService.translate('oimcount.unitorwing'), field: 'location2Id', editable: true, width: 150,
        datatype: 'lov', link: 'oimcount/cgfkHousingLevel2RecordGroup?parentField1=', parentField: 'parentField1',
        cellEditable: this.canHouseEdit, titles: {
          livingUnitCode: this.translateService.translate('oimcount.livingunitid')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('oimcount.cell'), field: 'location3Id', editable: true, width: 150,
        datatype: 'lov', link: 'oimcount/cgfkHousingLevel3RecordGroup?parentField2=', parentField: 'parentField2',
        cellEditable: this.canHouseEdit, titles: {
          livingUnitCode: this.translateService.translate('common.housinglevethree')
          , description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('common.sequence'), field: 'listSeq', editable: true, width: 150, datatype: 'number',
        cellEditable: this.canHouseEdit, maxValue: '9999', whole: true, strictFP: true
      },
      {
        fieldName: this.translateService.translate('oimcount.act'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
        , cellEditable: this.canHouseEdit
      },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
        datatype: 'date'
      },
      { fieldName: '', field: 'parentField1', hide: true },
      { fieldName: '', field: 'parentField2', hide: true },
      { fieldName: '', field: 'agyLocId', hide: true },
      { fieldName: '', field: 'hideValue', hide: true },
    ];
    this.agencyCountTypesColumnDef = [
      {
        fieldName: this.translateService.translate('common.counttypemandatory'), field: 'countTypeCode',
        editable: true, width: 150, datatype: 'lov', domain:'COUNT_TYPES',
        // link: 'oimcount/cgfkCountTypesRecordGroup',
        titles: {
          description: this.translateService.translate('common.description'),
          code: this.translateService.translate('oimcount.countcode')
        }
      },
      {
        fieldName: this.translateService.translate('common.time'), field: 'scheduledDateTime', datatype: 'time',
        cellEditable: this.canCellEdit, width: 150
      },
      { fieldName: this.translateService.translate('oimcount.act'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox' },
      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
        datatype: 'date'
      },
      {
        fieldName: '', field: 'copyButton', editable: true, width: 150, onLaunchClick: this.onCopyClick, datatype: 'launchbutton',
        data: 'row', updateField: 'row', modal: true
      },
      {
        fieldName: '', field: 'countTypeId', hide: true
      },
      {
        fieldName: '', field: 'copyFlag', hide: true
      },
      { fieldName: '', field: 'hideValue', hide: true },
    ];
    this.agencyLocationsColumnDef = [
      { fieldName: '', field: 'hideValue', hide: true },
      {
        fieldName: this.translateService.translate('common.locationmandatory'), field: 'agyLocId', editable: false, width: 150,
        datatype: 'text', titles: {
          code: this.translateService.translate('oimcount.agencylocationcode')
          , description: this.translateService.translate('common.description')
        }
      },
      { fieldName: this.translateService.translate('common.description'), field: 'description', editable: false, width: 150 },
    ];
    this.agencyReportingLocsInitColumnDef = [
      {
        fieldName: this.translateService.translate('common.locationmandatory'), field: 'location1Id', editable: true, width: 150,
        datatype: 'lov', link: 'oimcount/cgfkInitLocCodeRecordGroup?agyLocId=', cellEditable: this.canInitEdit,source:'OIMILOCA',
        parentField: 'agyLocId', titles: {
          description: this.translateService.translate('common.description'),
          internalLocationCode: this.translateService.translate('common.locationcode')
        }
      },
      {
        fieldName: this.translateService.translate('common.sequence'), field: 'listSeq', editable: true, width: 150, datatype: 'number'
        , cellEditable: this.canInitEdit, maxValue: '9999', whole: true, strictFP: true
      },
      {
        fieldName: this.translateService.translate('oimcount.act'), field: 'activeFlag', editable: true, width: 150, datatype: 'checkbox'
        , cellEditable: this.canInitEdit
      },

      {
        fieldName: this.translateService.translate('common.expirydate'), field: 'expiryDate', editable: false, width: 150,
        datatype: 'date'
      },
      { fieldName: '', field: 'agyLocId', hide: true },
      { fieldName: '', field: 'hideValue', hide: true },
    ];
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

  canCellEdit = (data: any, index: number, field: string) => {
    if (data.countTypeCode === 'UNS' || data.countTypeCode === 'EMR' || data.countTypeCode === 'SYS') {
        return false;
    }
    return true;
  }
  /*
   *  This event is used to do the validations in the Grid in Schedules Block.
   */
  canHouseEdit = (data: any, index: number, field: string): boolean => {
    if (this.agencycounttypesModel.countTypeId && !this.agencycounttypesModel.activeFlag) {
      return false;
    }
    if (data.countTypeId && data.agySeq && !this.checkCopyFlag) {
      if (field === 'location1Id' || field === 'location2Id' || field === 'location3Id') {
        return false;
      }
    } else if (data.countTypeId && data.agySeq && !data.activeFlag && !this.checkCopyFlag && field === 'listSeq') {
      return false;
    }
    if (field === 'activeFlag') {
      if (this.checkCopyFlag && !data.location1Id) {
        return false;
      } else if (!data.agySeq && !data.location1Id) {
        return false;
      }
    }
    if (!data.location1Id) {
      if (field === 'location2Code' || field === 'location3Code') {
        return false;
      }
    }
    if (!data.location2Id && field === 'location3Code') {
      return false;
    }
    return true;
  }
  /*
  *  This event is used to do the validations in the Grid in Schedules Block.
  */
  canInitEdit = (data: any, index: number, field: string): boolean => {
    if (this.agencycounttypesModel.countTypeId && !this.agencycounttypesModel.activeFlag) {
      return false;
    }
    if (data.countTypeId && data.agySeq && !this.checkCopyFlag && field === 'location1Id') {
      return false;
    } else if (data.countTypeId && data.agySeq && !data.activeFlag && !this.checkCopyFlag && field === 'listSeq') {
      return false;
    }
    if (field === 'activeFlag') {
      if (this.checkCopyFlag && !data.location1Id) {
        return false;
      } else if (!data.agySeq && !data.location1Id) {
        return false;
      }
    }
    return true;
  }
  onAgyLocChange() {
    if (!this.agyLocId) {
      this.agyLocId = this.agyLocId === '' ? undefined : '';
    }
  }
  agyLocChangeEvent(event) {
    if (event) {
      this.agyLocId = event.code;
    }
  }
  /**
 *  This function is used when we click on Non Association button button
 */
  onCopyClick = (event) => {
    if (this.housegrid.addedMap.size > 0 || this.initgrid.addedMap.size > 0) {
      return;
    }
    if (event.countTypeCode && event.activeFlag) {
      if (!event.countTypeId) {
        this.show(this.translateService.translate('oimcount.recordneedstobesavedbeforeyoucancopyitslocations'));
        return false;
      } else if (event.countTypeId) {
        this.agencycounttypesModel = new AgencyCountTypes();
        this.agencycounttypesModel.caseLoadId = this.agencylocationsModel.agyLocId;
        const serviceObj = this.oimcountFactory.
          agencyCountTypesExecuteQuery(this.agencycounttypesModel);
        serviceObj.subscribe(data => {
          if (data.length > 0) {
            data.forEach(elements => {
              if (elements.countTypeId === event.countTypeId && event.houseLoc === 0 && event.intLoc === 0) {
                this.show(this.translateService.translate('oimcount.noreportinglocationstocopyorlocationsnotyetsavedtodatabase'));
                this.checkCopyFlag = false;
                return false;
              } else if (elements.countTypeId === event.countTypeId) {
                if (event.scheduledDateTime) {
                  event.scheduledDateTime = DateFormat.getDate(event.scheduledDateTime);
                }
                this.checkCopyFlag = true;
                this.accgrid.addRecord();
                this.accgrid.setColumnData('hideValue', this.agencycounttypesData.length - 1, true);
                this.accgrid.setColumnData('countTypeCode', this.agencycounttypesData.length - 1, event.countTypeCode);
                this.accgrid.setColumnData('scheduledDateTime', this.agencycounttypesData.length - 1, event.scheduledDateTime);
                this.accgrid.setColumnData('activeFlag', this.agencycounttypesData.length - 1, event.activeFlag);
                this.accgrid.setColumnData('expiryDate', this.agencycounttypesData.length - 1, event.expiryDate);
                this.accgrid.setColumnData('countTypeId', this.agencycounttypesData.length - 1, event.countTypeId);
                this.accgrid.setColumnData('copyButton', this.agencycounttypesData.length - 1, 'Copy');
                this.accgrid.setColumnData('copyFlag', this.agencycounttypesData.length - 1, true);
                return ;
              }
            });
            this.agencycounttypesModel = new AgencyCountTypes();
          }
        });
      }
    } else {
      return false;
    }
  }
  /**
   *  This function is used when we click on Clear button
   */
  onButClear() {
    this.agencylocationsData = [];
    this.agencylocationsModel = new AgencyLocations();
    this.agencycounttypesData = [];
    this.agencycounttypesModel = new AgencyCountTypes();
    this.agencyreportinglocshousData = [];
    this.agencyreportinglocshousModel = new AgencyReportingLocs();
    this.agencyreportinglocsinitData = [];
    this.agencyreportinglocsinitModel = new AgencyReportingLocs();
    this.checkCopyFlag = false;
    this.housegrid.setColumnHeader('location1Id', '');
    this.housegrid.setColumnHeader('location2Id', '');
    this.housegrid.setColumnHeader('location3Id', '');
    this.agyLocId = undefined;
  }
  get readeOnlyFields() {
    if (this.agencylocationsData.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  /**
   *  This function is used to enable/disable Retrive button
   */
  get rettBtnFlg() {
    if (this.agencylocationsData.length > 0) {
      return true;
    } else {
      return false;
    } 
  }
  /**
   *  This function is used to enable/disable clesr button
   */
  get clrBtnFlag() {
    if (this.agyLocId) {
      return false;
    } else if (this.agencylocationsData.length !== 0) {
      return false;
    } else {
      return true;
    }
  }
  /**
  *  This function is used to enable/disable clesr button
  */
  get saveBtnFlg() {
    if (this.checkCopyFlag) {
      return false;
    } else {
      return true;
    }
  }
  /**
  *  This function is used to enable/disable grid save button
  */
  get housSaveBtn() {
    if (this.agencycounttypesData.length === 0) {
      return false;
    } else if (!this.agencycounttypesModel.countTypeId) {
      return false;
    } else {
      return true;
    }
  }
  /**
   *  This function is used to enable/disable grid save button
   */
  get initSaveBtn() {
    if (this.agencycounttypesData.length === 0) {
      return false;
    } else if (!this.agencycounttypesModel.countTypeId) {
      return false;
    } else {
      return true;
    }
  }
  /**
   *  This function is used to enable/disable grid save button
   */
  get actSaveBtn() {
    if (this.checkCopyFlag) {
      return false;
    } else if (this.agencylocationsData.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  /**
   *  This function is used to enable/disable grid save button
   */
  get actUpdateBtn() {
    if (this.checkCopyFlag) {
      return false;
    } else {
      return true;
    }
  }
  get allowGridColEdit() {
    return false;
  }
  /**
   *  This function is used to enable/disable grid Delete button
   */
  get actDelBtn() {
    if (this.agencylocationsData.length === 0 || this.checkCopyFlag) {
      return false;
    } else if (!this.agencycounttypesModel.countTypeId) {
      return false;
    } else {
      return true;
    }
  }
  /**
  *  This function is used to enable/disable grid Delete button
  */
  get housDelBtn() {
    if (this.agencyreportinglocshousData.length === 0 || this.checkCopyFlag) {
      return false;
    } else if (!this.agencyreportinglocshousModel.countTypeId) {
      return false;
    } else {
      return true;
    }
  }
  get extSave() {
    if (this.checkCopyFlag) {
      return true;
    } else {
      return false;
    }
  }
  /**
  *  This function is used to enable/disable grid Delete button
  */
  get initDelBtn() {
    if (this.agencyreportinglocsinitData.length === 0 || this.checkCopyFlag) {
      return false;
    } else if (!this.agencyreportinglocsinitModel.countTypeId) {
      return false;
    } else {
      return true;
    }
  }
  /**
   *  This function will be executed when we select a record under Maintain Counts Block
   */
  onRowClickagencylocations(event) {
    if (event) {
      this.agencylocationsModel = event;
      this.setGridColumnHeaders();
      // const serviceObj = this.oimcountFactory.
      //   livingUnitsQuery(this.agencylocationsModel.agyLocId);
      // serviceObj.subscribe(data => {
      //   if (data.length === 0) {
      //   } else {
      //     data.forEach(ele => {
      //       this.intLocIdMap.set(ele.livingUnitCode, ele.livingUnitId);
      //     });
      //   }
      // });
      const serviceObject = this.oimcountFactory.
        cgfkInitLocCodeRecordGroup(this.agencylocationsModel.agyLocId);
      serviceObject.subscribe(data => {
        if (data.length === 0) {
        } else {
          data.forEach(ele => {
            this.initLocMap.set(ele.code, ele.internalLocationId);
          });
        }
      });
      this.initgrid.prepareAgColumnDef();
      this.agencyCountTypesExecuteQuery();
    }
  }
  setGridColumnHeaders() {
    const serviceObjects = this.oimcountFactory.
      agencyLocationsWhenNewRecordInstance(this.agencylocationsModel);
    serviceObjects.subscribe(data => {
      if (data.length === 0) {
      } else {
        this.housegrid.setColumnHeader('location1Id', data.housingLev1Code);
        this.housegrid.setColumnHeader('location2Id', data.housingLev2Code);
        this.housegrid.setColumnHeader('location3Id', data.housingLev3Code);
      }
    });
  }
  /**
    *  This function will be executed when we select a record under Counts Block
    */
  onRowClickagencycounttypes(event) {
    if (event) {
      if(event.countTypeCode === 'SCH'){
        this.accgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['scheduledDateTime'].includes(obj.colId) ) {
						obj.colDef.headerClass = 'header-col';
						this.accgrid.gridApi.refreshHeader();
					}
				});
      } else {
        this.accgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['scheduledDateTime'].includes(obj.colId) ) {
						obj.colDef.headerClass = '';
						this.accgrid.gridApi.refreshHeader();
					}
				});
      }
      this.agencycounttypesModel = event;
      this.agencyreportinglocshousExecuteQuery();
      this.agencyreportinglocsinitExecuteQuery();
    }
  }
  /**
    *  This function will be executed when we select a record under Housing Locations Block
    */
  onRowClickagencyreportinglocshous(event) {
    if (event) {
      this.agencyreportinglocshousModel = event;
    }
  }
  /**
    *  This function will be executed when we select a record under Internal Locations Block
    */
  onRowClickagencyreportinglocsinit(event) {
    if (event) {
      this.agencyreportinglocsinitModel = event;
    }
  }
  /**
    * This function loads the data into the Master Record and its child records
    */
  agencyLocationsExecuteQuery() {
    this.agencylocationsModel = new AgencyLocations();
    if (this.agyLocId) {
      this.agencylocationsModel.agyLocId = this.agyLocId;
    } else {
      this.agencylocationsModel.caseloadId = this.sessionManager.currentCaseLoad;
    }
    const serviceObj = this.oimcountFactory.
      agencyLocationsExecuteQuery(this.agencylocationsModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.agencylocationsData = [];
        this.agencylocationsModel = new AgencyLocations();
        this.agencylocationsIndex = -1;
      } else {
        this.agencylocationsData = data;
        this.agencylocationsModel = this.agencylocationsData[0];
        this.agencylocationsIndex = 0;
      }
    });

  }

  /**
   * @method agencyCountTypesCommit
   * @param event
   */
  agencyCountTypesCommit(event) {
    this.agencycounttypesInsertList = [];
    this.agencycounttypesUpdateList = [];
    this.agencycounttypesDeleteList = [];
    this.agencycounttypesInsertList = event.added;
    this.agencycounttypesUpdateList = event.updated;
    this.agencycounttypesDeleteList = event.removed;
    this.agencycounttypesCommitModel.insertList = [];
    this.agencycounttypesCommitModel.updateList = [];
    this.agencycounttypesCommitModel.deleteList = [];
    for (let i = 0; i < this.agencycounttypesData.length; i++) {
      for(let j = i+1; j < this.agencycounttypesData.length; j++) {
        if(this.agencycounttypesData[i].countTypeCode === this.agencycounttypesData[j].countTypeCode
          && (this.agencycounttypesData[i].countTypeCode === 'UNS' || this.agencycounttypesData[i].countTypeCode === 'EMR' || this.agencycounttypesData[i].countTypeCode === 'SYS')) {
            if(this.agencycounttypesInsertList.length > 0) {
              this.show(this.translateService.translate('oimcount.counttypeDuplicateCannotInsert'));
              return;
            } else if(this.agencycounttypesUpdateList.length > 0) {
              this.show(this.translateService.translate('oimcount.counttypeDuplicateCannotUpdate'));
              return;
            }
        }
      }
    }
    if (this.agencycounttypesInsertList.length > 0) {
      for (let i = 0; i < this.agencycounttypesInsertList.length; i++) {
        if (!this.agencycounttypesInsertList[i].countTypeCode) {
          this.show(this.translateService.translate('oimcount.counttypemustbeeneterd'));
          return;
        }
        if (this.agencycounttypesInsertList[i].activeFlag) {
          this.agencycounttypesInsertList[i].activeFlag = 'Y';
        } else {
          this.agencycounttypesInsertList[i].activeFlag = 'N';
        }
        if (!this.agencycounttypesInsertList[i].scheduledDateTime) {
          this.agencycounttypesInsertList[i].scheduledTime = 'NA';
        } else {
          this.agencycounttypesInsertList[i].scheduledDateTime = DateFormat.getDate(this.agencycounttypesInsertList[i].scheduledDateTime);
          this.agencycounttypesInsertList[i].scheduledTime = TimeFormat.format(this.agencycounttypesInsertList[i].scheduledDateTime);
        }
        this.agencycounttypesInsertList[i].agyLocId = this.agencylocationsModel.agyLocId;
      }
      this.agencycounttypesCommitModel.insertList = this.agencycounttypesInsertList;
    }
    if (this.agencycounttypesUpdateList.length > 0) {
      for (let i = 0; i < this.agencycounttypesUpdateList.length; i++) {
        if (!this.agencycounttypesUpdateList[i].countTypeCode) {
          this.show(this.translateService.translate('oimcount.counttypemustbeeneterd'));
          return;
        }
        if (this.agencycounttypesUpdateList[i].activeFlag) {
          this.agencycounttypesUpdateList[i].activeFlag = 'Y';
        } else {
          this.agencycounttypesUpdateList[i].activeFlag = 'N';
        }
        if (!this.agencycounttypesUpdateList[i].scheduledDateTime) {
          this.agencycounttypesUpdateList[i].scheduledTime = 'NA';
        } else {
          this.agencycounttypesUpdateList[i].scheduledDateTime = DateFormat.getDate(this.agencycounttypesUpdateList[i].scheduledDateTime);
          this.agencycounttypesUpdateList[i].scheduledTime = TimeFormat.format(this.agencycounttypesUpdateList[i].scheduledDateTime);
        }
      }
      this.agencycounttypesCommitModel.updateList = this.agencycounttypesUpdateList;

    }
    if (this.agencycounttypesDeleteList.length > 0) {
      for (let i = 0; i < this.agencycounttypesDeleteList.length; i++) {
      }
      this.agencycounttypesCommitModel.deleteList = this.agencycounttypesDeleteList;
    }
    const agencycounttypesSaveData = this.oimcountFactory.agencyCountTypesCommit(this.agencycounttypesCommitModel);
    agencycounttypesSaveData.subscribe(data => {
      if (data === 1) {
        this.checkCopyFlag = false;
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.agencyCountTypesExecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oimcount.cannotinsertbecausedupticateexistspleasemodifyscheduledtime'));
      } else if (data === 3) {
        this.show(this.translateService.translate('oimcount.cannotupdatebecausedupticateexistspleasemodifyscheduledtime'));
      } else if (data === 4) {
        this.show(this.translateService.translate('oimcount.cannotdeletemasterrecordwhenmatchingdetailrecordsexist'));
        this.checkCopyFlag = false;
        this.agencyCountTypesExecuteQuery();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  onGridAccClear = () => {
    this.checkCopyFlag = false;
    this.agencyCountTypesExecuteQuery();
    return true;
  }
  /**
  * This function loads the data into the Master Record and its child records
  */
  agencyCountTypesExecuteQuery() {
    this.agencycounttypesModel = new AgencyCountTypes();
    this.agencycounttypesModel.caseLoadId = this.agencylocationsModel.agyLocId;
    const serviceObj = this.oimcountFactory.
      agencyCountTypesExecuteQuery(this.agencycounttypesModel);
    serviceObj.subscribe(data => {
      if (data.length === 0) {
        this.agencycounttypesData = [];
        this.agencycounttypesModel = new AgencyCountTypes();
        this.agencycounttypesIndex = -1;
      } else {
        this.agencycounttypesData = [];
        data.forEach(elements => {
          if (elements.scheduledTime === 'NA') {
            elements.scheduledTime = undefined;
          } else {
            if (elements.scheduledTime) {
              elements['scheduledDateTime'] = DateFormat.getDate().setHours(elements.scheduledTime.substring(0, 2),
                elements.scheduledTime.substring(3, 6));
            }
          }
          elements.activeFlag = elements.activeFlag === 'Y' ? true : false;
          elements.copyButton = 'Copy';
        });
        this.agencycounttypesData = data;
        this.agencycounttypesModel = this.agencycounttypesData[0];
        this.agencycounttypesIndex = 0;
      }
    });
  }
  /*
    *  This event is used to insert the data in HousingLocations Block.
    */
  onGridAccInsert = () => {
    this.agencycounttypesRowData = [];
    this.accgrid.addedMap.forEach(
      (v: any, k: number) => {
        this.agencycounttypesRowData.push(v);
      }
    );
    this.accgrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.agencycounttypesRowData.push(v);
      }
    );
    for (let i = 0; i < this.agencycounttypesRowData.length; i++) {
      if (!this.agencycounttypesRowData[i].countTypeCode) {
        this.show(this.translateService.translate('oimcount.counttypemustbeeneterd'));
        return;
      }
    }
    return { copyButton: 'Copy', activeFlag: true };
  }
  onGridHousClear = () => {
    this.agencyreportinglocshousData = [];
    this.agencyreportinglocshousExecuteQuery();
    return true;
  }
  /**
    * This function loads the data into the Master Record and its child records
    */
  agencyreportinglocshousExecuteQuery() {
    this.agencyreportinglocshousModel = new AgencyReportingLocs();
    this.agencyreportinglocshousModel.countTypeId = this.agencycounttypesModel.countTypeId;
    const agencyreportinglocshousResult = this.oimcountFactory.
      agencyReportingLocsHousExecuteQuery(this.agencyreportinglocshousModel);
    agencyreportinglocshousResult.subscribe(data => {
      if (data.length === 0) {
        this.agencyreportinglocshousData = [];
        this.housIndex = -1;
      } else {
        data.forEach(elemnt => {
          elemnt.agyLocId = this.agencylocationsModel.agyLocId;
          elemnt.activeFlag = elemnt.activeFlag === 'Y' ? true : false;
          elemnt.location1Id = String(elemnt.location1Id);
          elemnt.location2Id = String(elemnt.location2Id);
          elemnt.location3Id = String(elemnt.location3Id);
          elemnt.parentField1 = elemnt.location1Id + '-' + this.agencylocationsModel.agyLocId;
          elemnt.parentField2 = elemnt.location2Id + '-' + this.agencylocationsModel.agyLocId;
        });
        if (this.checkCopyFlag) {
          this.housegrid.setColumnData('hideValue', 0, 'test');
        }
        this.agencyreportinglocshousData = data;
        this.agencyreportinglocshousModel = data[0];
        this.housIndex = 0;
        // this.housegrid.prepareAgColumnDef();
      }
    });
  }
  /*
    *  This event is used to insert the data in HousingLocations Block.
    */
  onGridHouseInsert = () => {
    if (this.agencycounttypesModel.countTypeId && !this.agencycounttypesModel.activeFlag) {
      this.show(this.translateService.translate('oimcount.youcannotcreatedetailrecordswhenmatchingmasterdeactivaterecordsexist'));
      return;
    }
    this.agencyreportinglocsInsertData = [];
    this.housegrid.addedMap.forEach(
      (v: any, k: number) => {
        this.agencyreportinglocsInsertData.push(v);
      }
    );
    this.housegrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.agencyreportinglocsInsertData.push(v);
      }
    );
    for (let i = 0; i < this.agencyreportinglocsInsertData.length; i++) {
      if (!this.agencyreportinglocsInsertData[i].location1Id) {
        this.show(this.translateService.translate('oimcount.housinglevecodecannotbeempty'));
        return;
      }
    }
    return { agyLocId: this.agencylocationsModel.agyLocId, activeFlag: true };
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimcountSaveagencyreportinglocshousForm(event) {
    if (this.checkCopyFlag) {
      return;
    }
    this.agencyreportinglocshousInsertList = event.added;
    this.agencyreportinglocshousUpdateList = event.updated;
    this.agencyreportinglocshousDeleteList = event.removed;
    this.agencyreportinglocshousCommitModel.insertList = [];
    this.agencyreportinglocshousCommitModel.updateList = [];
    this.agencyreportinglocshousCommitModel.deleteList = [];
    if (this.agencyreportinglocshousInsertList.length > 0 || this.agencyreportinglocshousUpdateList.length > 0) {
      for (let i = 0; i < this.agencyreportinglocshousInsertList.length; i++) {
        this.agencyreportinglocshousInsertList[i].countTypeId = this.agencycounttypesModel.countTypeId;
        this.agencyreportinglocshousInsertList[i].locationType = 'HOUS';
        if (!this.agencyreportinglocshousInsertList[i].location1Id) {
          this.show(this.translateService.translate('oimcount.housinglevecodecannotbeempty'));
          return;
        } else {
          // this.agencyreportinglocshousInsertList[i].location1Id = Number(this.intLocIdOneMap.get
          //   (this.agencyreportinglocshousInsertList[i].location1Code));
        }
        // if (this.agencyreportinglocshousInsertList[i].location2Code) {
        //   this.agencyreportinglocshousInsertList[i].location2Id = Number(this.intLocIdMap.get
        //     (this.agencyreportinglocshousInsertList[i].location2Code));
        // }
        // if (this.agencyreportinglocshousInsertList[i].location3Code) {
        //   this.agencyreportinglocshousInsertList[i].location3Id = Number(this.intLocIdMap.get
        //     (this.agencyreportinglocshousInsertList[i].location3Code));
        // }
        if (this.agencyreportinglocshousInsertList[i].activeFlag) {
          this.agencyreportinglocshousInsertList[i].activeFlag = 'Y';
        } else {
          this.agencyreportinglocshousInsertList[i].activeFlag = 'N';
        }
      }
      for (let i = 0; i < this.agencyreportinglocshousUpdateList.length; i++) {
        if (!this.agencyreportinglocshousUpdateList[i].location1Id) {
          this.show(this.translateService.translate('oimcount.housinglevecodecannotbeempty'));
          return;
        } else {
          // this.agencyreportinglocshousUpdateList[i].location1Id = Number(this.intLocIdOneMap.get
          //   (this.agencyreportinglocshousUpdateList[i].location1Code));
        }
        // if (this.agencyreportinglocshousUpdateList[i].location2Code) {
        //   this.agencyreportinglocshousUpdateList[i].location2Id = Number(this.intLocIdMap.get
        //     (this.agencyreportinglocshousUpdateList[i].location2Code));
        // }
        // if (this.agencyreportinglocshousUpdateList[i].location3Code) {
        //   this.agencyreportinglocshousUpdateList[i].location3Id = Number(this.intLocIdMap.get
        //     (this.agencyreportinglocshousUpdateList[i].location3Code));
        // }
        if (this.agencyreportinglocshousUpdateList[i].activeFlag) {
          this.agencyreportinglocshousUpdateList[i].activeFlag = 'Y';
        } else {
          this.agencyreportinglocshousUpdateList[i].activeFlag = 'N';
        }
      }
      this.agencyreportinglocshousCommitModel.insertList = this.agencyreportinglocshousInsertList;
      this.agencyreportinglocshousCommitModel.updateList = this.agencyreportinglocshousUpdateList;
    }
    if (this.agencyreportinglocshousDeleteList.length > 0) {
      for (let i = 0; i < this.agencyreportinglocshousDeleteList.length; i++) {
      }
      this.agencyreportinglocshousCommitModel.deleteList = this.agencyreportinglocshousDeleteList;
    }
    const agencyreportinglocshousSaveData = this.oimcountFactory.
      agencyReportingLocsHousCommit(this.agencyreportinglocshousCommitModel);
    agencyreportinglocshousSaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.agencyreportinglocshousExecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oimcount.recordalreadyexistsfortheselectedagencylocation'));
      } else if (data === 3) {
        this.show(this.translateService.translate('oimcount.countiscurrentlyunderwayforthisagencylocation'));
        this.agencyreportinglocshousExecuteQuery();
      } else if (data === 4) {
        this.show(this.translateService.translate('oimcount.thisrecordisnotpermittedfordeletionwithchildrecords'));
        this.agencyreportinglocshousExecuteQuery();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  /**
  *  This function will be executed when we edit grid row data under Housing Locations Block
  */
  validateRowHouseEvent = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'location1Id' && event.data.location1Id) {
      this.housegrid.setColumnData('parentField1', index, event.data.location1Id + '-' + this.agencylocationsModel.agyLocId);
      this.housegrid.setColumnData('parentField2', index, event.data.location2Id + '-' + this.agencylocationsModel.agyLocId);
    }
    // if (event.data.location2Code) {
    //   const twoObj = this.oimcountFactory.
    //   livingUnitsQueryTwo(event.data.location1Code + '-' + this.agencylocationsModel.agyLocId);
    //   twoObj.subscribe(result => {
    //   if (result.length === 0) {
    //   } else {
    //     result.forEach(ele => {
    //       if (ele.livingUnitCode === event.data.location2Code) {
    //         event.data.location2Id = ele.livingUnitId;
    //       }
    //     });
    //   }
    // });
    // }
    // if (event.data.location3Code) {
    //   const twoObj = this.oimcountFactory.
    //   livingUnitsQueryTwo(event.data.location2Code + '-' + this.agencylocationsModel.agyLocId);
    //   twoObj.subscribe(result => {
    //   if (result.length === 0) {
    //   } else {
    //     result.forEach(ele => {
    //       if (ele.livingUnitCode === event.data.location3Code) {
    //         event.data.location3Id = ele.livingUnitId;
    //       }
    //     });
    //   }
    // });
    // }
    if (event.field === 'location2Id' && event.data.location2Id) {
      this.housegrid.setColumnData('parentField2', index, event.data.location2Id + '-' + this.agencylocationsModel.agyLocId);
    }
    if (event.field === 'activeFlag') {
      if (!event.data.location1Id) {
        this.housegrid.setColumnData('activeFlag', index, true);
        this.housegrid.setColumnData('expiryDate', index, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag && event.data.createDatetime) {
          if (event.data.activeCount === 0) {
            this.housegrid.setColumnData('activeFlag', index, event.data.activeFlag);
            this.housegrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
          } else {
            this.show(this.translateService.translate('oimcount.cannotactivatedetailrecordwhenmatchingmasterdeactivaterecordsexist'));
            this.housegrid.setColumnData('activeFlag', index, true);
            this.housegrid.setColumnData('expiryDate', index, undefined);
            rowdata.validated = true;
            return rowdata;
          }
      } else if (!event.data.activeFlag && !event.data.createDatetime) {
        this.housegrid.setColumnData('activeFlag', index, event.data.activeFlag);
        this.housegrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      } else {
        this.housegrid.setColumnData('activeFlag', index, event.data.activeFlag);
        this.housegrid.setColumnData('expiryDate', index, undefined);
        rowdata.validated = true;
        return rowdata;
      }
    }

    rowdata.validated = true;
    return rowdata;
  }
  /**
   *  This function will be executed when we edit grid row data under Counts Block
   */
  validateRowAccType = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (!event.data.countTypeCode) {
        this.accgrid.setColumnData('activeFlag', index, true);
        this.accgrid.setColumnData('expiryDate', index, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag && event.data.countTypeId) {

        const resultCount = this.oimcountFactory.
          acctypeCheckboxChenged(this.agencycounttypesModel);
        resultCount.subscribe(data => {
          if (data === 0) {
            this.accgrid.setColumnData('activeFlag', index, event.data.activeFlag);
            this.accgrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
          } else {
            this.show(this.translateService.translate('oimcount.cannotdeactivatemasterrecordwhenmatchingdetailactivaterecordsexist'));
            this.accgrid.setColumnData('activeFlag', index, true);
            this.accgrid.setColumnData('expiryDate', index, undefined);
            rowdata.validated = true;
            return rowdata;
          }
        });
      } else if (!event.data.activeFlag && !event.data.countTypeId) {
        this.accgrid.setColumnData('activeFlag', index, event.data.activeFlag);
        this.accgrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      } else {
        this.accgrid.setColumnData('activeFlag', index, event.data.activeFlag);
        this.accgrid.setColumnData('expiryDate', index, undefined);
        rowdata.validated = true;
        return rowdata;
      }
    }
    if(event.field === 'countTypeCode') {
      if (event.data.countTypeCode === 'UNS' || event.data.countTypeCode === 'EMR' || event.data.countTypeCode === 'SYS') {
        this.accgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['scheduledDateTime'].includes(obj.colId) ) {
						obj.colDef.headerClass = '';
						this.accgrid.gridApi.refreshHeader();
					}
				});
        this.accgrid.setColumnData('scheduledDateTime', index, '');
        rowdata.validated = true;
        return rowdata;
      } else if(event.data.countTypeCode === 'SCH'){
        this.accgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['scheduledDateTime'].includes(obj.colId) ) {
						obj.colDef.headerClass = 'header-col';
						this.accgrid.gridApi.refreshHeader();
					}
				});
      } else {
        this.accgrid.gridColumnApi.getAllDisplayedColumns().forEach( obj => {
					if ( ['scheduledDateTime'].includes(obj.colId) ) {
						obj.colDef.headerClass = '';
						this.accgrid.gridApi.refreshHeader();
					}
				});
      }
    }

    rowdata.validated = true;
    return rowdata;
  }
  /**
     * This function loads the data into the Master Record and its child records
     */
  agencyreportinglocsinitExecuteQuery() {
    this.agencyreportinglocsinitModel = new AgencyReportingLocs();
    this.agencyreportinglocsinitModel.countTypeId = this.agencycounttypesModel.countTypeId;
    const agencyreportinglocsinitResult = this.oimcountFactory.
      agencyReportingLocsInitExecuteQuery(this.agencyreportinglocsinitModel);
    agencyreportinglocsinitResult.subscribe(data => {
      if (data.length === 0) {
        this.initIndex = -1;
        this.agencyreportinglocsinitData = [];
      } else {
        data.forEach(elem => {
          elem.location1Id = String(elem.location1Id);
          elem.agyLocId = this.agencylocationsModel.agyLocId;
          elem.activeFlag = elem.activeFlag === 'Y' ? true : false;
        });
        if (this.checkCopyFlag) {
          this.initgrid.setColumnData('hideValue', 0, 'test');
        }
        this.agencyreportinglocsinitData = data;
        this.agencyreportinglocsinitModel = data[0];
        this.initIndex = 0;
      }
    });
  }
  onGridInitClear = () => {
    this.agencyreportinglocsinitData = [];
    this.agencyreportinglocsinitExecuteQuery();
    return true;
  }
  /*
    *  This event is used to insert the data in Internal Locations Block.
    */
  onGridInitInsert = () => {
    if (this.agencycounttypesModel.countTypeId && !this.agencycounttypesModel.activeFlag) {
      this.show(this.translateService.translate('oimcount.youcannotcreatedetailrecordswhenmatchingmasterdeactivaterecordsexist'));
      return;
    }
    this.agencyreportinglocsInsertData = [];
    this.initgrid.addedMap.forEach(
      (v: any, k: number) => {
        this.agencyreportinglocsInsertData.push(v);
      }
    );
    this.initgrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.agencyreportinglocsInsertData.push(v);
      }
    );
    for (let i = 0; i < this.agencyreportinglocsInsertData.length; i++) {
      if (!this.agencyreportinglocsInsertData[i].location1Id) {
        this.show(this.translateService.translate('oimcount.internallocationcannotbeempty'));
        return;
      }
    }
    // this.initgrid.prepareAgColumnDef();
    return { activeFlag: true, agyLocId: this.agencylocationsModel.agyLocId };
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  oimcountSaveagencyreportinglocsinitForm(event) {
    if (this.checkCopyFlag) {
      return;
    }
    this.agencyreportinglocsinitInsertList = event.added;
    this.agencyreportinglocsinitUpdateList = event.updated;
    this.agencyreportinglocsinitDeleteList = event.removed;
    this.agencyreportinglocsinitCommitModel.insertList = [];
    this.agencyreportinglocsinitCommitModel.updateList = [];
    this.agencyreportinglocsinitCommitModel.deleteList = [];
    if (this.agencyreportinglocsinitInsertList.length > 0 || this.agencyreportinglocsinitUpdateList.length > 0) {
      for (let i = 0; i < this.agencyreportinglocsinitInsertList.length; i++) {
        this.agencyreportinglocsinitInsertList[i].countTypeId = this.agencycounttypesModel.countTypeId;
        this.agencyreportinglocsinitInsertList[i].locationType = 'INIT';
        if (!this.agencyreportinglocsinitInsertList[i].location1Id) {
          this.show(this.translateService.translate('oimcount.internallocationcannotbeempty'));
          return;
        } else {
          // this.agencyreportinglocsinitInsertList[i].location1Id = Number(this.initLocMap.get
          //   (this.agencyreportinglocsinitInsertList[i].location1Code));
        }
        if (this.agencyreportinglocsinitInsertList[i].activeFlag) {
          this.agencyreportinglocsinitInsertList[i].activeFlag = 'Y';
        } else {
          this.agencyreportinglocsinitInsertList[i].activeFlag = 'N';
        }
      }
      for (let i = 0; i < this.agencyreportinglocsinitUpdateList.length; i++) {
        if (!this.agencyreportinglocsinitUpdateList[i].location1Id) {
          this.show(this.translateService.translate('oimcount.internallocationcannotbeempty'));
          return;
        } else {
          // this.agencyreportinglocsinitUpdateList[i].location1Id = Number(this.initLocMap.get
          //   (this.agencyreportinglocsinitUpdateList[i].location1Code));
        }
        if (this.agencyreportinglocsinitUpdateList[i].activeFlag) {
          this.agencyreportinglocsinitUpdateList[i].activeFlag = 'Y';
        } else {
          this.agencyreportinglocsinitUpdateList[i].activeFlag = 'N';
        }
      }
      this.agencyreportinglocsinitCommitModel.insertList = this.agencyreportinglocsinitInsertList;
      this.agencyreportinglocsinitCommitModel.updateList = this.agencyreportinglocsinitUpdateList;
    }
    if (this.agencyreportinglocsinitDeleteList.length > 0) {
      for (let i = 0; i < this.agencyreportinglocsinitDeleteList.length; i++) {
      }
      this.agencyreportinglocsinitCommitModel.deleteList = this.agencyreportinglocsinitDeleteList;
    }
    const agencyreportinglocsinitSaveData = this.oimcountFactory.agencyReportingLocsInitCommit
      (this.agencyreportinglocsinitCommitModel);
    agencyreportinglocsinitSaveData.subscribe(data => {
      if (data === 1) {
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.agencyreportinglocsinitExecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oimcount.recordalreadyexistsfortheselectedagencylocation'));
      } else if (data === 3) {
        this.show(this.translateService.translate('oimcount.countiscurrentlyunderwayforthisagencylocation'));
        this.agencyreportinglocsinitExecuteQuery();
      } else if (data === 4) {
        this.show(this.translateService.translate('oimcount.thisrecordisnotpermittedfordeletionwithchildrecords'));
        this.agencyreportinglocsinitExecuteQuery();
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });
  }
  /**
   *  This function will be executed when we edit grid row data under Internal Locations Block
   */
  validateRowInitEvent = (event) => {
    const index = event.rowIndex;
    const rowdata = new ValidateRowReturn();
    if (event.field === 'activeFlag') {
      if (!event.data.location1Id) {
        this.initgrid.setColumnData('activeFlag', index, true);
        this.initgrid.setColumnData('expiryDate', index, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (!event.data.activeFlag && event.data.createDatetime) {
          if (event.data.activeCount === 0) {
            this.initgrid.setColumnData('activeFlag', index, event.data.activeFlag);
            this.initgrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
            rowdata.validated = true;
            return rowdata;
          } else {
            this.show(this.translateService.translate('oimcount.cannotactivatedetailrecordwhenmatchingmasterdeactivaterecordsexist'));
            this.initgrid.setColumnData('activeFlag', index, true);
            this.initgrid.setColumnData('expiryDate', index, undefined);
            rowdata.validated = true;
            return rowdata;
          }
      } else if (!event.data.activeFlag && !event.data.createDatetime) {
        this.initgrid.setColumnData('activeFlag', index, event.data.activeFlag);
        this.initgrid.setColumnData('expiryDate', index, DateFormat.getDate(DateFormat.getDate().setHours(0, 0, 0, 0)));
        rowdata.validated = true;
        return rowdata;
      } else {
        this.initgrid.setColumnData('activeFlag', index, event.data.activeFlag);
        this.initgrid.setColumnData('expiryDate', index, undefined);
        rowdata.validated = true;
        return rowdata;
      }
    }

    rowdata.validated = true;
    return rowdata;
  }
  save() {
    this.agencycounttypesCommitModel = new AgencyCountTypesCommitBean();
    this.agencycounttypesInsertList = [];
    this.agencycounttypesUpdateList = [];
    this.accgrid.addedMap.forEach(
      (v: any, k: number) => {
        this.agencycounttypesInsertList.push(v);
      }
    );
    this.accgrid.updatedMap.forEach(
      (v: any, k: number) => {
        this.agencycounttypesUpdateList.push(v);
      }
    );
    if (this.agencycounttypesInsertList.length > 0) {
      for (let i = 0; i < this.agencycounttypesInsertList.length; i++) {
        if (this.agencycounttypesInsertList[i].activeFlag) {
          this.agencycounttypesInsertList[i].activeFlag = 'Y';
        } else {
          this.agencycounttypesInsertList[i].activeFlag = 'N';
        }
        if (!this.agencycounttypesInsertList[i].scheduledDateTime) {
          this.agencycounttypesInsertList[i].scheduledTime = 'NA';
        } else {
          this.agencycounttypesInsertList[i].scheduledTime = TimeFormat.format(this.agencycounttypesInsertList[i].scheduledDateTime);
        }
        this.agencycounttypesInsertList[i].agyLocId = this.agencylocationsModel.agyLocId;
      }
      this.agencycounttypesCommitModel.insertList = this.agencycounttypesInsertList;
    }
    if (this.agencycounttypesUpdateList.length > 0) {
      for (let i = 0; i < this.agencycounttypesUpdateList.length; i++) {
        if (this.agencycounttypesUpdateList[i].activeFlag) {
          this.agencycounttypesUpdateList[i].activeFlag = 'Y';
        } else {
          this.agencycounttypesUpdateList[i].activeFlag = 'N';
        }
        if (!this.agencycounttypesUpdateList[i].scheduledDateTime) {
          this.agencycounttypesUpdateList[i].scheduledTime = 'NA';
        } else {
          this.agencycounttypesUpdateList[i].scheduledDateTime = DateFormat.getDate(this.agencycounttypesUpdateList[i].scheduledDateTime);
          this.agencycounttypesUpdateList[i].scheduledTime = TimeFormat.format(this.agencycounttypesUpdateList[i].scheduledDateTime);
        }
        this.agencycounttypesUpdateList[i].agyLocId = this.agencylocationsModel.agyLocId;
      }
      this.agencycounttypesCommitModel.updateList = this.agencycounttypesUpdateList;
    }
    this.agencyreportinglocsData = [];
    if (this.checkCopyFlag && this.agencyreportinglocshousData.length > 0 || this.agencyreportinglocsinitData.length > 0) {
      for (let i = 0; i < this.agencyreportinglocshousData.length; i++) {
        this.agencyreportinglocshousData[i].locationType = 'HOUS';
        if (!this.agencyreportinglocshousData[i].location1Id) {
          this.show(this.translateService.translate('oimcount.housinglevecodecannotbeempty'));
          return;
        } else {
          // this.agencyreportinglocshousData[i].location1Id = Number(this.intLocIdOneMap.get
          //   (this.agencyreportinglocshousData[i].location1Code));
        }
        // if (this.agencyreportinglocshousData[i].location2Code) {
        //   this.agencyreportinglocshousData[i].location2Id = Number(this.intLocIdMap.get
        //     (this.agencyreportinglocshousData[i].location2Code));
        // }
        // if (this.agencyreportinglocshousData[i].location3Code) {
        //   this.agencyreportinglocshousData[i].location3Id = Number(this.intLocIdMap.get
        //     (this.agencyreportinglocshousData[i].location3Code));
        // }
        if (this.agencyreportinglocshousData[i].activeFlag) {
          this.agencyreportinglocshousData[i].activeFlag = 'Y';
        } else {
          this.agencyreportinglocshousData[i].activeFlag = 'N';
        }
        this.agencyreportinglocsData.push(this.agencyreportinglocshousData[i]);
      }
      for (let i = 0; i < this.agencyreportinglocsinitData.length; i++) {
        this.agencyreportinglocsinitData[i].locationType = 'INIT';
        if (!this.agencyreportinglocsinitData[i].location1Id) {
          this.show(this.translateService.translate('oimcount.internallocationcannotbeempty'));
          return;
        } else {
          // this.agencyreportinglocsinitData[i].location1Id = Number(this.initLocMap.get
          //   (this.agencyreportinglocsinitData[i].location1Code));
        }
        if (this.agencyreportinglocsinitData[i].activeFlag) {
          this.agencyreportinglocsinitData[i].activeFlag = 'Y';
        } else {
          this.agencyreportinglocsinitData[i].activeFlag = 'N';
        }
        this.agencyreportinglocsData.push(this.agencyreportinglocsinitData[i]);
      }
    }
    this.agencycounttypesCommitModel.reportInsertList = this.agencyreportinglocsData;
    const agencycounttypesSaveData = this.oimcountFactory.agencyCountReportsCommit(this.agencycounttypesCommitModel);
    agencycounttypesSaveData.subscribe(data => {
      if (data === 1) {
        this.checkCopyFlag = false;
        this.show(this.translateService.translate('common.addupdateremoverecordsuccess'), 'success');
        this.agencyCountTypesExecuteQuery();
      } else if (data === 2) {
        this.show(this.translateService.translate('oimcount.cannotinsertbecausedupticateexistspleasemodifyscheduledtime'));
      } else if (data === 3) {
        this.show(this.translateService.translate('oimcount.cannotupdatebecausedupticateexistspleasemodifyscheduledtime'));
      } else if (data === 4) {
        this.checkCopyFlag = false;
        this.show(this.translateService.translate('oimcount.cannotdeletemasterrecordwhenmatchingdetailrecordsexist'));
        this.agencyCountTypesExecuteQuery();
      } else if (data === 5) {
        this.show(this.translateService.translate('oimcount.recordalreadyexistsfortheselectedagencylocation'));
      } else {
        this.show(this.translateService.translate('common.addupdateremoverecordfailed'));
      }
    });

  }
  houseGridvalidations(event) {

  }
}
