import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@common/translate/translate.service';
import { UserSessionManager } from '@core/classes/userSessionManager';
import { CourseActivities } from '@inst/programs-without-schedules/beans/CourseActivities';
import { OcmsuwpjService } from '../service/ocmsuwpj.service';
import { CourseActivitiesCommitBean } from '@inst/institutional-activities/maintenance/beans/CourseActivitiesCommitBean';
import { DateFormat } from '@core/ui-components/datepicker/dateFormat';
import { DialogService } from '@core/ui-components/dialog/dialog.service';
import { DialogComponent } from '@core/ui-components/dialog/dialog.component';
import { ValidateRowReturn } from '@ui-components/grid/grid.component';
import { VProgramProviders } from '@inst/accredited-programs/beans/VProgramProviders';

@Component({
  selector: 'app-ocmsuwpj',
  templateUrl: './ocmsuwpj.component.html'
})

export class OcmsuwpjComponent implements OnInit {
  codCellEdit: any;
  alertDelete: boolean;
  enableDeleteCms: boolean;
  targetOffenderBtDisabled: boolean;
  areasServedBtDisabled: boolean;
  contactsBtBtDisabled: boolean;
  scheduleBtDisabled: boolean;
  launchBtDisabled: boolean;
  enableInsertCms: boolean;
  allowEdit: boolean;
  @ViewChild('dialog', { static: true }) dialog: DialogComponent;
  placementColumnDef: any[];
  commentText: any;
  teamData: any;
  providerPartyId: any;
  country: any;
  postalCode: any;
  areaInformation: any;
  streetInformation: any;
  houseInformation: any;
  teamId: any;
  @ViewChild('gridcrs', { static: true }) gridcrs: any;
  @ViewChild('placegrid', { static: false }) placegrid: any;
  actionName: string;
  lovModel: any[];
  msgs: any[] = [];
  nameOfLovPage: string;
  listToCompare: any[] = [];

  courseactData: CourseActivities[] = [];
  placementData: CourseActivities[] = [];
  courseactDataTemp: CourseActivities[] = [];
  namesReadOnly: boolean;
  ctlblkModel: CourseActivities = new CourseActivities();
  courseactModel: CourseActivities = new CourseActivities();
  courseActModelTemp:CourseActivities = new CourseActivities();
  placementModel: CourseActivities = new CourseActivities();
  placementTempModel: CourseActivities = new CourseActivities();
  courseactCommitModel: CourseActivitiesCommitBean = new CourseActivitiesCommitBean();
  courseactInsertList: CourseActivities[] = [];
  courseactUpdatetList: CourseActivities[] = [];
  courseactDeleteList: CourseActivities[] = [];
  display: boolean;
  errorMessage: string;
  headerMessage: string;
  disabled: boolean;
  courseActColumnDef: any[];
  rgteamRg: any[] = [];
  rgbeneficiarytypeRg: any[] = [];
  rgplacementnameRg: any[] = [];
  rgplacementaddressesRg: any[] = [];
  teamLov: string;
  placLov: string;
  houseLov: string;
  select = -1;
  selectOne = -1;
  teamLovReadOnly: boolean;
  clearDisabled: boolean;
  searchDisabled: boolean;
  name: string;
  message: any;
  nameSource:string;
  calAgyLocId = { 'description': this.translateService.translate('common.description') };
  teamTitle = {
    'description': this.translateService.translate('common.description'),
    'code': this.translateService.translate('teamCode')
  };
  houseTitle = {
    'description': 'House',
    'street': 'Street',
    'area': 'Area',
    'code': 'PostalCode',
    'country': 'Country',
  };

  benfTitle = {
    'description': this.translateService.translate('common.description'),
    'code': this.translateService.translate('common.code')
  };
  isSaveDisable: boolean;
  codeValue: any;
  saveFlag: boolean;
  codevalueTitles = {
    'description': this.translateService.translate('common.description')
  }
  caseLoadType: string;
  provideDescLink: string;
  caseLoadId: any;
  providerIdMap: Map<string, string> = new Map<string, string>();
  intLocationLink: string;
  tempCode: any;
  programTypeMap: Map<string, string> = new Map<string, string>();
  description: string;
  providerId: any;
  placementLovLink:string;
  teamsListData : VProgramProviders []=[];
  namesReadOnlyForProgramCode:boolean;
  placementTempModelTemp:CourseActivities =new CourseActivities();
  codeValueTemp : string = undefined;
  constructor(private ocmsuwpjFactory: OcmsuwpjService,
    public translateService: TranslateService, public sessionManager: UserSessionManager, private dialogService: DialogService, ) {
    this.courseActColumnDef = [];
    this.placementColumnDef = [];
  }
  ngOnInit() {
    this.ctlblkModel.providerType = this.ctlblkModel.providerType === '' ? undefined : '';
    this.namesReadOnly = true;
    this.teamLovReadOnly = false;
    this.clearDisabled = true;
    this.searchDisabled = false;
    this.enableInsertCms = false;
    this.scheduleBtDisabled = true;
    this.contactsBtBtDisabled = true;
    this.areasServedBtDisabled = true;
    this.targetOffenderBtDisabled = true;
    this.namesReadOnlyForProgramCode=false;

    this.teamLov = 'ocmsuwpj/rgTeamRecordGroup';
    this.saveFlag =  true;
    this.courseActColumnDef = [
      {
        fieldName: this.translateService.translate('common.code'), required: 'true', field: 'code', editable: true, width: 150,
        datatype: 'text', maxlength: 12, uppercase: 'true', cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('common.descriptionMandatory'), field: 'description', editable: true, width: 150,
        datatype: 'text', maxlength: 40, uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('common.capacity'), field: 'capacity', editable: true, width: 150,
        datatype: 'number', minValue: '0', maxValue: '999', whole: true
      },
      {
        fieldName: this.translateService.translate('ocmsuwpj.beneficiarytype'), field: 'beneficiaryType', editable: true, width: 150,
        domain: 'PS_BENEF', datatype: 'lov', titles: this.benfTitle,
      },
      {
        fieldName: this.translateService.translate('common.startdatemandatory'), field: 'scheduleStartDate', editable: true, width: 150,
        datatype: 'date', cellEditable: this.canCellEdit
      },
      {
        fieldName: this.translateService.translate('common.enddate'), field: 'scheduleEndDate', editable: true,
        width: 150, datatype: 'date'
      },
      {
        fieldName: this.translateService.translate('ocmsuwpj.schedulenotes'), field: 'scheduleNotes', editable: true, width: 150, datatype: 'text',
        maxlength: 240, uppercase: 'false'
      },
      {
        fieldName: this.translateService.translate('common.comment'), field: 'commentText', editable: true, width: 150, datatype: 'text',
        maxlength: 240, uppercase: 'false'
      },
    ];

    this.placementColumnDef = [
      {
        fieldName: this.translateService.translate('common.name'), field: 'codeValue', editable: true, width: 150, datatype: 'lov', link: 'ocmsuwpj/rgPlacementNameRecordGroup',
        titles: {
          description: this.translateService.translate('common.description')
        }
      },
      {
        fieldName: this.translateService.translate('ocmsuwpj.houseinformation'), field: 'houseInformation', editable: false, width: 150,
        datatype: 'text'
      },
      {
        fieldName: '...', field: 'button', editable: true, width: 150, data: 'row', updateField: 'row',
        modal: true, dialogWidth: 70, height: 90,
        datatype: 'launchbutton', onLaunchClick: this.ocmsuwpjDlglClick
      },

      { fieldName: this.translateService.translate('ocmsuwpj.streetinfo'), field: 'streetInformation', editable: false, width: 150 },
      {
        fieldName: this.translateService.translate('ocmsuwpj.areainfoinformation'), field: 'areaInformation',
        editable: false, width: 150,
      },
      { fieldName: this.translateService.translate('ocmsuwpj.postalcode'), field: 'postalCode', editable: false, width: 150, },
      { fieldName: this.translateService.translate('common.country'), field: 'country', editable: false, width: 150, },
      { fieldName: '', field: 'servicesAddressId', hide: true, width: 150, },
    ];

    this.caseLoadId = this.sessionManager.currentCaseLoad;
    this.description = this.sessionManager.currentCaseLoadName;
    this.caseLoadType = this.sessionManager.currentCaseLoadType;
   this.provideDescLink= 'ocmsuwpj/rgProviderRecordGroupTeam?caseLoadId=' + this.caseLoadId
          + '&caseLoadType=' + this.caseLoadType + '&providerType=' + this.ctlblkModel.providerType;
          this.rgProviderRecordGroupTeam();
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
  rgProviderRecordGroupTeam() {
    const teamsList = this.ocmsuwpjFactory.rgProviderRecordGroupTeam(this.caseLoadId, this.caseLoadType, null);
    teamsList.subscribe(data => {
      if (data.length >= 0) {
        this.teamsListData = data;
      }
    });
  }
  providerNameChange(event) {
    this.ctlblkModel.programCode=event.code;
    
    this.providerId = this.teamsListData.filter(ele => ele.code===event.code)[0].partyId;
  } 

  disableCell = (data: any, index: number): boolean => {
    if (!data.codeValue) {
      return true;
    }
    return false;
  }
  /**
   *  This function will be executed when  event is fired
  */
  ocmsuwpjDlglClick = (event) => {
    const data = {placementCorporateId : Number(this.placementTempModel.codeValue),type: this.placementTempModelTemp.name,agyLocId:this.placementTempModelTemp.agyLocId}
    this.dialogService.openLinkDialog('/OCMSUWPJDLGL', data, 80).subscribe(result => {
      this.isSaveDisable = true;
      this.saveFlag = false;
      if (result) {
        this.placementTempModel.streetAddress = result.streetAddress;
        this.placementTempModel.suiteNumber = result.suiteNumber;
        this.placementTempModel.cityName = result.cityName;
        this.placementTempModel.provStateDesc = result.provStateDesc;
        this.placementTempModel.country = result.country;
        this.placementTempModel.postalCode = result.zipPostalCode;
        this.placementTempModel.servicesAddressId = result.addressId;
      } 
    });
  }
  /**
   *  This function will be executed when  event is fired
  *
  */
  onRowClickcourseact(event) {
      this.ctlblkModel.providerType = undefined;
      this.placementTempModel.codeValue = undefined;
      this.placementTempModel.suiteNumber = undefined;
      this.placementTempModel.streetAddress = undefined;
      this.placementTempModel.postalCode = undefined;
      this.placementTempModel.country = undefined;
      this.placementTempModel.provStateDesc = undefined;
      this.placementTempModel.cityName = undefined; 
    if (event.createDatetime) {
      this.courseactModel = event;
      this.courseActModelTemp=this.courseactModel;
      this.courseactModel.providerPartyCode = this.ctlblkModel.programCode;
      this.courseactModel.providerPartyId = Number(this.ctlblkModel.providerPartyId);
      if (this.courseactModel.crsActyId) {
        this.allowEdit = false;
        this.scheduleBtDisabled = false;
        this.contactsBtBtDisabled = false;
        this.areasServedBtDisabled = false;
        this.targetOffenderBtDisabled = false;
        this.enableDeleteCms = true;
        this.namesReadOnly = false;
        this.placementExecuteQuery();
      }
    }
    else {
      this.allowEdit = true;
      this.placementData = [];
      this.placementModel = new CourseActivities();
      this.scheduleBtDisabled = true;
      this.contactsBtBtDisabled = true;
      this.areasServedBtDisabled = true;
      this.targetOffenderBtDisabled = true;
      this.enableDeleteCms = false;
      this.namesReadOnly = true;
      this.placementTempModel = new CourseActivities();
    }

  }
  /**
   *  This function will be executed when  event is fired
  *
  */
  placeOptionChange(event) {
    if (event && event.corporateId) {
      this.houseLov = 'ocmsuwpj/rgPlacementAddressesRecordGroup?corporateId=' + event.corporateId;
    }
  }
  /**
   *  This function will be executed when  event is fired
  *
  */
  canCellEdit = (data: any, index: number, field: string): boolean => {
    if (data.crsActyId) {
      return false;
    }
    return true;
  }
  /**
   *  This function will be executed when  event is fired
  *
  */
  onClear() {
   
    this.courseactData = [];
    this.clearDisabled = true;
    this.searchDisabled = false;
    this.courseactModel.commentText = undefined;
    this.name = undefined;
    this.houseInformation = undefined;
    this.areaInformation = undefined;
    this.country = undefined;
    this.postalCode = undefined;
    this.streetInformation = undefined;
    this.enableInsertCms = false;
    this.scheduleBtDisabled = true;
    this.contactsBtBtDisabled = true;
    this.areasServedBtDisabled = true;
    this.targetOffenderBtDisabled = true;
    this.codeValue =  undefined;
    this.saveFlag = true;
    this.namesReadOnly = true;
    this.clearDisabled = true;
    this.namesReadOnlyForProgramCode=false;
    this.courseactModel = new CourseActivities();
    this.ctlblkModel = new CourseActivities();
    this.placementTempModel  = new CourseActivities();


  }
  /**
   *  This function will be executed when  event is fired
  *
  */
  teamCodeChange(event) {
    if (event) {
      this.providerPartyId = event.teamId;
      this.clearDisabled = false;
    }
  }
  /**
     *  This function will be executed when  event is fired
    */
   retriveBeforevlidations() {
    const is = { valid: true };
    if (!this.ctlblkModel.programCode || this.ctlblkModel.programCode === undefined) {
      this.message = this.translateService.translate('ocmsuwpj.providermandatory');
      this.show(this.message);
      is.valid = false;
      return is.valid;
    }
    return is.valid;
  }
  courseactExecuteQuery(date?) {
    if (!this.retriveBeforevlidations()) {
      return;
    }
    
    this.ctlblkModel.providerPartyCode = this.ctlblkModel.programCode;
    this.ctlblkModel.providerPartyId = Number(this.providerId);

    const courseactResult = this.ocmsuwpjFactory.
      courseActExecuteQuery(this.ctlblkModel);
    courseactResult.subscribe(data => {
      if (data.length === 0) {
        this.courseactData = [];
        this.placementData = [];
        this.enableInsertCms = true;
        this.namesReadOnlyForProgramCode=false;
        this.show(this.translateService.translate('common.querycaused'));
        this.placementModel = new CourseActivities();
      } else {
        
        this.courseactData = data;
        this.courseactModel = data[0];
       this.namesReadOnlyForProgramCode=true;
        this.courseactData.forEach(e =>{
          e.programCodeTemp = this.tempCode;
        });
        this.selectOne = 0;
        this.searchDisabled = true;
        this.clearDisabled = false;
        this.namesReadOnly = false;
        this.enableInsertCms = true;
        this.enableDeleteCms = true;
      }
    });
  }

  onGridClear = () => {
    this.courseactExecuteQuery();
    return true;
  }
  onOffdedDelete = () => {
    // this.courseactExecuteQuery();
    return true;
  }
  /**
     *  This function will be executed when  event is fired
    */
  placementExecuteQuery() {
    // it doesnt get number every time 
    this.courseactModel.providerPartyId = this.providerId;
    const placementResult = this.ocmsuwpjFactory.placementExecuteQuery(this.courseactModel);
    placementResult.subscribe(data => {
      if (data.length === 0) {
        this.placementData = [];
        this.placementModel = new CourseActivities();
        this.placementTempModel = new CourseActivities();
        this.saveFlag = true;
        this.codeValueTemp = undefined;
      } else {
        this.select = 0;
        data.forEach(element => {
          element['button'] = '..';
          if (element.placementCorporateId) {
            element.codeValue = String(element.placementCorporateId);
          } else {
            element.codeValue = undefined;
          }
        });
        this.placementData = data;
        this.placementModel = data[0];
        this.codeValue = this.placementModel.codeValue;
        
        this.ctlblkModel.providerType = this.placementModel.providerType;
        setTimeout(() => {
          this.placementTempModel = data[0];
          if (this.placementTempModel.providerType === 'INT'){
            this.placementTempModel.codeValue = this.placementTempModel.agyLocId;
            this.codeValueTemp = this.placementTempModel.agyLocId;
          }
          else if (this.placementTempModel.providerType === 'EXT'){
            this.placementTempModel.codeValue = String(this.placementTempModel.placementCorporateId);
            this.codeValueTemp = String(this.placementTempModel.placementCorporateId);
          }else{
            this.placementTempModel.codeValue=undefined;
            this.codeValueTemp = undefined;
          }
        }, 500);
        this.saveFlag = true;
      }
    });
  }
  /**
     *  This function will be executed when  event is fired
    *
    */
  onRowClickplacementData(event) {
    if (event) {
      this.placementModel = event;
    }
  }
  /**
   *  This function will be executed when commit event is fired
  */
  ocmsuwpjSavePlacementForm(event) {
    this.courseactInsertList = [];
    this.courseactUpdatetList = [];
    this.courseactUpdatetList = event.updated;
    this.courseactDeleteList = event.removed;
    this.courseactCommitModel.insertList = [];
    this.courseactCommitModel.updateList = [];
    this.courseactCommitModel.deleteList = [];
    if (this.courseactInsertList.length > 0 || this.courseactUpdatetList.length > 0) {
      for (let i = 0; i < this.courseactUpdatetList.length; i++) {
        this.courseactUpdatetList[i].rowId = '';
        this.courseactUpdatetList[i].placementCorporateId = Number(this.courseactUpdatetList[i].codeValue);
         if (event.updated[0].providerType === 'INT') {
          this.courseactUpdatetList[i].agyLocId = this.courseactUpdatetList[i].codeValue;
        }

        this.courseactCommitModel.updateList = this.courseactUpdatetList;
      }
    }
    const courseactSaveData = this.ocmsuwpjFactory.courseActCommit(this.courseactCommitModel);
    courseactSaveData.subscribe(data => {
      if (data && data.sealFlag === '0') {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.placementExecuteQuery();
        return;
      } else if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.placementExecuteQuery();
        return;
      } else if (data && data.sealFlag === '2') {
        this.show('ocmsuwpj.pleaseselectateam');
        this.placementExecuteQuery();
        return;
      } else if (data && data.sealFlag === '3') {
        this.show('ocmsuwpj.codealredyexistsfortheteam');
        this.placementExecuteQuery();
        return;
      } else if (data && data.sealFlag === '4') {
        this.show('ocmsuwpj.anyoffendersallocatedtothisprojectatthenewprojectenddatewillbede-allocated');
        this.placementExecuteQuery();
        return;
      }
    });
  }
  Validations= () => {
      
    const is = { valid: true };
    this.courseactData.forEach(data => {
      if (is.valid) {
        if (!data.code) {
          this.show('common.codemustbeentereddot');
          is.valid = false;
          return;
        }
        const index=this.courseactData.indexOf(data);
        for (let i = 0; i < this.courseactData.length; i++) {
          if (index != i && this.courseactData[i].code === data.code) {
            this.show('ocmsuwpj.codealredyexistsfortheteam');
            is.valid = false;
            return;
          }

        }

        if (!data.description) {
          this.show('common.descriptionmustbeentereddot');
          is.valid = false;
          return;
        }
        if (!data.scheduleStartDate) {
          this.show('common.startdatemustbeentered');
          is.valid = false;
          return;
        }
      }
    });
    return is.valid;
  }
  /**
   *  This function will be executed when commit event is
  * fired
  */
  ocmsuwpjSavecourseactForm(event) {
    if (!this.Validations()) {
      return;
    }
    this.courseactInsertList = event.added;
    this.courseactUpdatetList = event.updated;
    this.courseactDeleteList = event.removed;
    this.courseactCommitModel.insertList = [];
    this.courseactCommitModel.updateList = [];
    this.courseactCommitModel.deleteList = [];
    if (this.courseactInsertList.length > 0 || this.courseactUpdatetList.length > 0) {
      for (let i = 0; i < this.courseactInsertList.length; i++) {
        if (this.courseactInsertList[i].scheduleEndDate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.courseactInsertList[i].scheduleEndDate),
            DateFormat.getDate()) === -1) {
            this.show('ocmsuwpj.enddatecannotbelessthancurrentdate');
            return;
          }
        }
        if (this.courseactInsertList[i].scheduleStartDate && this.courseactInsertList[i].scheduleEndDate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.courseactInsertList[i].scheduleStartDate),
            DateFormat.getDate(this.courseactInsertList[i].scheduleEndDate)) > 0) {
            this.show('ocmsuwpj.enddatecannotbelessthanstartdate');
            return;
          }
        }
        this.courseactInsertList[i].createUserId = this.sessionManager.getId();
        this.courseactInsertList[i].createDatetime = DateFormat.getDate();
        this.courseactInsertList[i].programId = Number(this.courseactInsertList[i].programIdVal);

        this.courseactInsertList[i].activeFlag = 'Y';
        this.courseactInsertList[i].courseClass = 'COURSE';
        this.courseactInsertList[i].providerType = this.ctlblkModel.providerType;
  
        this.courseactInsertList[i].providerPartyCode = this.ctlblkModel.programCode;
        this.courseactInsertList[i].providerPartyId = Number(this.providerId);
            this.courseactInsertList[i].providerPartyClass = 'TEAM';

        this.courseactCommitModel.insertList = this.courseactInsertList;
      }
      for (let i = 0; i < this.courseactUpdatetList.length; i++) {
        if (this.courseactUpdatetList[i].scheduleEndDate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.courseactUpdatetList[i].scheduleEndDate),
            DateFormat.getDate()) === -1) {
            this.show('ocmsuwpj.enddatecannotbelessthancurrentdate');
            return;
          }
        }
        if (this.courseactUpdatetList[i].scheduleStartDate && this.courseactUpdatetList[i].scheduleEndDate) {
          if (DateFormat.compareDate(DateFormat.getDate(this.courseactUpdatetList[i].scheduleStartDate),
            DateFormat.getDate(this.courseactUpdatetList[i].scheduleEndDate)) > 0) {
            this.show('ocmsuwpj.enddatecannotbelessthanstartdate');
            return;
          }
        }

        this.courseactUpdatetList[i].rowId = 'UPDATE';
        this.courseactUpdatetList[i].placementCorporateId = this.placementModel.placementCorporateId;
        this.courseactCommitModel.updateList = this.courseactUpdatetList;
      }
    }
    if (this.courseactDeleteList.length > 0) {
      for (let i = 0; i < this.courseactDeleteList.length; i++) {
        this.courseactCommitModel.deleteList = this.courseactDeleteList;
      }
    }
    const courseactSaveData = this.ocmsuwpjFactory.courseActCommit(this.courseactCommitModel);
    courseactSaveData.subscribe(data => {
      if (data && data.sealFlag === '1') {
        this.show('common.addupdateremoverecordsuccess', 'success');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag === '2') {
        this.show('ocmsuwpj.pleaseselectateam');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag === '3') {
        this.show('ocmsuwpj.codealredyexistsfortheteam');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag === '4') {
        this.show('ocmsuwpj.anyoffendersallocatedtothisprojectatthenewprojectenddatewillbede-allocated');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag === '5') {
        this.show('ocmsuwpj.childrecordfound', 'warn');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.seqOne === 2292) {
        this.message = this.translateService.translate
          ('common.recordcannotbedeletedmodified');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag && data.seqOne === 2291) {
        this.message = this.translateService.translate('common.recordcannotbedeletedparent');
        this.message = String(this.message).replace('%tablename%', data.sealFlag);
        this.show(this.message, 'warn');
        this.courseactExecuteQuery();
        return;
      } else if (data && data.sealFlag === '6') {
        this.show('ocmsuwpj.noactiverecordswithacategoryofcommunityservice', 'warn');
        this.courseactExecuteQuery();
        return;
      } else {
        this.show('common.addupdateremoverecordfailed', 'warn');
        this.courseactExecuteQuery();
        return;
      }
    });
  }

  /**
  *   This function will be executed  event is fired
 */
  isInsertable(date?) {
    if (this.ctlblkModel.providerType || this.ctlblkModel.programCode || this.ctlblkModel.description
      || this.ctlblkModel.code || this.ctlblkModel.expiryDate || this.ctlblkModel.programIdVal
    ) {
      this.clearDisabled = false;
    } else {
      this.clearDisabled = true;
    }
  }
  /**
    *   This function will be executed  event is fired
   */
  houseOptionChange(event) {
    if (event) {
      this.country = event.country;
      this.areaInformation = event.area;
      this.streetInformation = event.street;
      this.postalCode = event.postalCode;
    }
  }

  validateRowData = (event) => {
    const rowIndex = this.placementData.indexOf(event.data);
    const rowdata = new ValidateRowReturn();
    if (event.field === 'codeValue') {
      if (!event.data.codeValue) {
        this.placegrid.setColumnData('houseInformation', rowIndex, undefined);
        this.placegrid.setColumnData('streetInformation', rowIndex, undefined);
        this.placegrid.setColumnData('areaInformation', rowIndex, undefined);
        this.placegrid.setColumnData('postalCode', rowIndex, undefined);
        this.placegrid.setColumnData('country', rowIndex, undefined);
        rowdata.validated = true;
        return rowdata;
      } else if (event.data.codeValue) {
        this.placegrid.setColumnData('houseInformation', rowIndex, event.houseInformation);
        this.placegrid.setColumnData('streetInformation', rowIndex, event.streetInformation);
        this.placegrid.setColumnData('areaInformation', rowIndex, event.areainfoinformation);
        this.placegrid.setColumnData('postalCode', rowIndex, event.postalcode);
        this.placegrid.setColumnData('country', rowIndex, event.country);
        rowdata.validated = true;
        return rowdata;
      }
    }
    rowdata.validated = true;
    return rowdata;

  }
  /**
    *  This function will be executed  event is fired
   */
  getSchedule = () => {
    this.dialogService.openLinkDialog('/OCUMPVAV', this.courseactModel, 80).subscribe(result => {
      if (result) {
      }
    });
  }
  /**
    *  This function will be executed  event is fired
   */
  getContacts = () => {
    this.courseactModel.pQueryOnly = 'N';
    this.dialogService.openLinkDialog('/OCMSSVCT', this.courseactModel, 80).subscribe(result => {
      if (result) {
      }
    });
  }
  /**
    *  This function will be executed  event is fired
   */
  getAreasServed = () => {
    this.dialogService.openLinkDialog('/OCMSSVAS', this.courseactModel, 50).subscribe(result => {
      if (result) {
      }
    });
  }
  /**
    *  This function will be executed  event is fired
   */
  getTargetOffenders = () => {
    if (this.courseactModel.crsActyId) {
      this.dialogService.openLinkDialog('/OCMCTOFF', this.courseactModel, 80).subscribe(result => {
        if (result) {
        }
      });
    }
  }
  /**
    *   This function will be executed  event is fired
   */
  onGridInsert = () => {
    this.enableDeleteCms = false;
    this.placementTempModel  = new CourseActivities();
    this.placementTempModel.codeValue= undefined;
    this.ctlblkModel.providerType=undefined;
    return {};
  }
  /**
    *  This function will be executed  event is fired
   *
   */
  teamDataBlurOne() {
    if (!this.teamData) {
      this.teamData = this.teamData === '' ? undefined : '';
      this.clearDisabled = true;
    }

  }
  ScreenBtn = () => {

    this.dialogService.openLinkDialog('/OCMPHMOD', this.courseactModel, 80).subscribe(result => {

    });
  }


  Save(){
    const commitEvent = { added: [], updated: [], removed: [] };
            const updated = [];
            updated.push(this.placementTempModel);
            commitEvent.updated = updated;
            this.ocmsuwpjSavePlacementForm(commitEvent);
  }

  codeValueChange(event) {
    if (event) {
      if (this.placementTempModelTemp.name === 'INT') {
        this.placementTempModelTemp.agyLocId = event.code;
        this.placementTempModel.agyLocId = event.code;
      }
      else {
        this.placementTempModel.placementCorporateId = Number(event.code);
      }
      if (event && event.code != this.codeValueTemp) {
        this.isSaveDisable = true;
        this.saveFlag = true;
        this.placementTempModel.suiteNumber = undefined;
        this.placementTempModel.streetAddress = undefined;
        this.placementTempModel.country = undefined;
        this.placementTempModel.postalCode = undefined;
        this.placementTempModel.provStateDesc = undefined;
        this.placementTempModel.cityName = undefined;
      }
    }else{
      this.placementTempModel.suiteNumber = undefined;
      this.placementTempModel.streetAddress = undefined;
      this.placementTempModel.country = undefined;
      this.placementTempModel.postalCode = undefined;
      this.placementTempModel.provStateDesc = undefined;
      this.placementTempModel.cityName = undefined;
  }
  }

  get launchBtnFlag(){
    if(this.gridcrs.addedMap.size > 0 || this.gridcrs.removedMap.size > 0 || this.gridcrs.updatedMap.size > 0){
      return true;
    }else if(this.placementTempModel.codeValue){
      return false;
    }else{
      return true;
    }
  }
  get codeValueFlag(){
    if(this.gridcrs.addedMap.size > 0 || this.gridcrs.removedMap.size > 0 || this.gridcrs.updatedMap.size > 0){
      return true;
    }else if(this.courseactData.length === 0){
      return true;
    }else if(!this.ctlblkModel.providerType){
      return true;
    }
    else{
      return false;
    }
  }
  providerLovChange() {
    if (this.ctlblkModel.providerType === 'INT') {
      this.nameSource = 'OUMACASE';
      this.placementLovLink = 'ocmsuwpj/getPlacementLocations?caseLoadId=' + this.caseLoadId;
      this.placementTempModel.providerType = 'INT';
      this.placementTempModelTemp.name = 'INT';
    } else {
      this.placementLovLink = 'ocmsuwpj/rgPlacementNameRecordGroup';
      this.ctlblkModel.providerPartyClass = 'CORP';
      this.nameSource = 'OUMAGENC';
      this.placementTempModelTemp.name = 'EXT';
      this.placementTempModel.providerType = 'EXT';
    }
  }
  onProviderTypeBlur() {
    if (!this.ctlblkModel.providerType) {
      this.saveFlag=true;
      this.ctlblkModel.providerType = this.ctlblkModel.providerType === '' ? undefined : '';
      this.placementTempModel.codeValue = undefined;
      this.placementTempModel.suiteNumber = undefined;
      this.placementTempModel.streetAddress = undefined;
      this.placementTempModel.postalCode = undefined;
      this.placementTempModel.country = undefined;
      this.placementTempModel.provStateDesc = undefined;
      this.placementTempModel.cityName = undefined; 
    }
  }
  onNameBlur(){
    if(!this.placementTempModel.codeValue || this.placementTempModel.codeValue === ''){
      this.saveFlag=false;
      this.placementTempModel.suiteNumber = undefined;
      this.placementTempModel.streetAddress = undefined;
      this.placementTempModel.postalCode = undefined;
      this.placementTempModel.country = undefined;
      this.placementTempModel.provStateDesc = undefined;
      this.placementTempModel.cityName = undefined; 
    }
    else{
    this.saveFlag=false;
    }
  }
  
  onProviderBlur() {
    if (!this.ctlblkModel.programCode) {
      this.ctlblkModel.programCode = this.ctlblkModel.programCode === '' ? undefined : '';
    }
  }
  
  
}
